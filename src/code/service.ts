import { reactive, ref } from 'vue';
import { skapi } from './admin';
import { Countries } from './countries';

const regions = JSON.parse(import.meta.env.VITE_REG);

export type ServiceObj = {
    active: number; // 0 = disabled / -1 = suspended
    api_key: string;
    cors: string; // "url, url"
    created_locale: string; // country code ex) KR
    email: string;
    group: number; // 1 = trial / 2 = standard / 3 = premium
    host: string;
    lmt: string; // #users_exceed / #cloud_exceed / #db_exceed / #mail_exceed / #host_exceed ex) "#cloud_exceed#db_exceed#.."
    name: string;
    newsletter_subscribers: number;
    owner: string;
    region: string; // network region ex) ap-northeast-1
    service: string;
    timestamp: number; // service created time in 13 digit timestamp
    users: number;
    subdomain?: string,
    subs_id?: string,
    suspended?: boolean; // the service is canceled and suspended, if false, the service can be canceled but still running until the end of period
    email_triggers?: {
        template_setters: {
            welcome: string,
            confirmation: string,
            newsletter_subscription: string,
            verification: string,
            invitation: string
        }
    };
    prevent_signup?: boolean;
    client_secret?: { [key: string]: string };
    auth_client_secret?: string[];
    plan: '-' | 'Trial' | 'Standard' | 'Premium' | 'Unlimited' | 'Free Standard' | 'Canceled' | 'Suspended' | string;
    template_welcome: {
        subject: string,
        url: string
    };
    template_verification: {
        subject: string,
        url: string
    };
    template_confirmation: {
        subject: string,
        url: string
    };
    template_invitation: {
        subject: string,
        url: string
    };
};

type SubscriptionObj = {
    id: string;
    object: string;
    application: string | null;
    application_fee_percent: number | null;
    automatic_tax: {
        enabled: boolean;
        liability: string | null;
    };
    billing_cycle_anchor: number;
    billing_cycle_anchor_config: object | null;
    billing_thresholds: object | null;
    cancel_at: number | null; // actually cancelled at (10 digit timestamp)
    cancel_at_period_end: boolean;
    canceled_at: number | null; // requested cancel at (10 digit timestamp)
    cancellation_details: {
        comment: string | null;
        feedback: string | null;
        reason: string | null;
    };
    collection_method: string;
    created: number;
    currency: string;
    current_period_end: number;
    current_period_start: number;
    customer: string;
    days_until_due: number | null;
    default_payment_method: string | null;
    default_source: string | null;
    default_tax_rates: string[];
    description: string | null;
    discount: object | null;
    discounts: object[];
    ended_at: number | null;
    invoice_settings: {
        account_tax_ids: string | null;
        issuer: {
            type: string;
        };
    };
    items: object;
    latest_invoice: string;
    livemode: boolean;
    metadata: object;
    next_pending_invoice_item_invoice: string | null;
    on_behalf_of: string | null;
    pause_collection: object | null;
    payment_settings: object;
    pending_invoice_item_interval: object | null;
    pending_setup_intent: string | null;
    pending_update: object | null;
    plan: object;
    quantity: number;
    schedule: object | null;
    start_date: number;
    status: string;
    test_clock: object | null;
    transfer_data: object | null;
    trial_end: number | null;
    trial_settings: object;
    trial_start: number | null;
};


export default class Service {
    id: string;
    owner: string;
    admin_private_endpoint: string;
    record_private_endpoint: string;
    admin_public_endpoint: string;
    service: ServiceObj;
    dateCreated: string;
    plan: string;
    planCode: { [key: number]: string } = {
        1: 'Trial',
        2: 'Standard',
        3: 'Premium',
        50: 'Unlimited',
        51: 'Free Standard'
    };
    subscription: SubscriptionObj;
    storageInfo: {
        cloud: number,
        database: number,
        email: number,
        host: number
    } = reactive({
        cloud: null,
        database: null,
        email: null,
        host: null
    });

    subscriptionFetched = ref(false);
    _orgPlan = '';
    _subsPromise;
    newsletterSender: Promise<string>[] = [];
    constructor(id: string, service: ServiceObj, endpoints: string[]) {
        this.id = id;
        this.admin_private_endpoint = endpoints[0];
        this.record_private_endpoint = endpoints[1];
        this.admin_public_endpoint = endpoints[2];
        this.owner = service.owner;
        this.dateCreated = typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString();
        this.plan = this.planCode[service.group];
        service.plan = this.plan;
        this.service = reactive(service);
        this._subsPromise = this.getSubscription();
        this.getStorageInfo();
        if (service.group > 1) {
            this.requestNewsletterSender({ group_numb: 0 });
            this.requestNewsletterSender({ group_numb: 1 });
        }
    }

    // get newsletter mail address
    async requestNewsletterSender(params: { group_numb: number }): Promise<string> {
        if (this.newsletterSender[params.group_numb]) {
            return await this.newsletterSender[params.group_numb];
        }

        let sndr = skapi.util.request(this.admin_private_endpoint + 'request-newsletter-sender', Object.assign({ service: this.id, owner: this.owner }, skapi.util.extractFormData(params).data || {}), { auth: true });
        this.newsletterSender[params.group_numb] = sndr;
        return await sndr;
    }

    async deleteNewsletter(
        params: {
            message_id: string;
            group: number;
        }
    ) {
        return skapi.util.request(this.admin_private_endpoint + 'delete-newsletter', Object.assign({ service: this.id, owner: this.owner }, skapi.util.extractFormData(params).data || {}), { auth: true });
    }

    checkCancel = () => {
        this._orgPlan = this.planCode[this.service.group];
        let currTime = new Date().getTime();
        this.service.suspended = this.subscription?.cancel_at && currTime >= this.subscription?.cancel_at * 1000;

        if (this.subscription?.canceled_at && currTime >= this.subscription.canceled_at * 1000) {
            this.service.plan = 'Canceled';
        }
        else {
            this.service.plan = this.plan;
        }
        this.subscriptionFetched.value = true;
    }

    async blockAccount(
        userId: string
    ): Promise<'SUCCESS'> {
        await skapi.util.request(this.admin_private_endpoint + 'block-account', { owner: this.owner, service: this.id, block: userId }, { auth: true });
        return 'SUCCESS';
    }

    async unblockAccount(
        userId: string
    ): Promise<'SUCCESS'> {
        await skapi.util.request(this.admin_private_endpoint + 'block-account', { owner: this.owner, service: this.id, unblock: userId }, { auth: true });
        return 'SUCCESS';
    }

    async deleteAccount(
        userId: string
    ): Promise<'SUCCESS'> {
        await skapi.util.request('remove-account', { owner: this.owner, service: this.id, delete: userId }, { auth: true });
        return 'SUCCESS';
    }

    //send invitation email, when accepted, user will have their account created, and be redirected
    async resendInvitation(
        params: {
            email: string,
            redirect: string;
        }
    ): Promise<'SUCCESS: Invitation E-Mail has been sent.'> {
        let p: any = skapi.util.extractFormData(params).data;
        let resend = await skapi.util.request("confirm-signup", {
            service: this.id,
            owner: this.owner,
            is_invitation: p.email,
            redirect: p.redirect
        }, { auth: true });

        return resend; // 'SUCCESS: Invitation E-Mail has been sent.'
    }

    async getSubscription(refresh = false): Promise<SubscriptionObj> {
        if (this.subscription && !refresh) {
            return this.subscription;
        }

        if (this.service?.subs_id) {
            let subs_id = this.service?.subs_id.split('#');

            if (subs_id.length < 2) {
                return;
            }

            let SUBSCRIPTION_ID = subs_id[0];

            this.subscription = reactive(await skapi.clientSecretRequest({
                clientSecretName: 'stripe_test',
                url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer $CLIENT_SECRET',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }));
        }

        this.checkCancel();
        return this.subscription;
    }

    async cancelSubscription(): Promise<SubscriptionObj> {
        await this._subsPromise;

        if (!this.subscription) {
            return null;
        }

        if (this.service?.subs_id) {
            let subs_id = this.service?.subs_id.split('#');

            if (subs_id.length < 2) {
                return;
            }

            let SUBSCRIPTION_ID = subs_id[0];

            this.subscription = reactive(await skapi.clientSecretRequest({
                clientSecretName: 'stripe_test',
                url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer $CLIENT_SECRET'
                },
                data: {
                    cancel_at_period_end: true
                }
            }));
        }

        this.checkCancel();
        return this.subscription;
    }

    async setServiceOption(opt: {
        prevent_signup?: boolean;
        client_secret?: { [key: string]: string };
        auth_client_secret?: string[]; // client_secret key to be auth required
    }): Promise<ServiceObj> {
        let toUpload = {
            prevent_signup: this.service.prevent_signup || false,
            client_secret: this.service.client_secret || {},
            auth_client_secret: this.service.auth_client_secret || []
        }

        Object.assign(toUpload, opt);

        let updated = await skapi.util.request(this.admin_private_endpoint + 'service-opt', { service: this.id, owner: this.owner, opt }, { auth: true });
        Object.assign(this.service, updated);
        return updated;
    }

    async getStorageInfo(): Promise<{
        cloud: number; // cloud storage used
        database: number; // database size
        email: number; // email storage used
        host: number; // host storage used
    }> {
        let wait = [];

        if (this.service.subdomain) {
            let subdomain = this.service.subdomain;
            if (this.service?.subdomain[0] === '*' || this.service?.subdomain[0] === '+') {
                subdomain = subdomain.slice(1);
            }

            wait.push(
                skapi.util.request(this.admin_private_endpoint + 'host-directory', { service: this.id, owner: this.owner, info: true, dir: subdomain }, { auth: true })
                    .then((r: any) => { this.storageInfo.host = r?.size || 0; }));
        }

        wait.push(skapi.util.request(this.record_private_endpoint + 'storage-info', { service: this.id, owner: this.owner }, { auth: true }).then(r => {
            this.storageInfo.cloud = r.cloud;
            this.storageInfo.database = r.database;
            this.storageInfo.email = r.email;
        }));

        await Promise.all(wait);

        return this.storageInfo;
    }

    async enableService(): Promise<ServiceObj> {
        if (this.service.active === 0) {
            this.service.active = 1;
            try {
                await skapi.util.request(this.admin_private_endpoint + 'register-service', {
                    service: this.id,
                    owner: this.owner,
                    execute: 'enable'
                }, { auth: true });
            }
            catch (err: any) {
                this.service.active = 0;
                alert(err.message);
            }
        }

        return this.service;
    }

    async disableService(): Promise<ServiceObj> {
        if (this.service.active > 0) {
            let orgActive = this.service.active;
            this.service.active = 0;

            try {
                await skapi.util.request(this.admin_private_endpoint + 'register-service', {
                    service: this.id,
                    owner: this.owner,
                    execute: 'disable'
                }, { auth: true });
            } catch (err: any) {
                this.service.active = orgActive;
                alert(err.message);
            }
        }

        return this.service;
    }

    async deleteService(): Promise<void> {
        try {
            await skapi.util.request(this.admin_private_endpoint + 'register-service', {
                service: this.id,
                owner: this.owner,
                execute: 'delete'
            }, { auth: true });
        } catch (err: any) {
            alert(err.message);
        }
        // need servicelist removal from outside
    }

    async updateService(
        params: {
            name?: string;
            cors?: string;
            api_key?: string;
        }
    ): Promise<ServiceObj> {
        let to_update: { [key: string]: any; } = {};

        if ('cors' in params) {
            params.cors = params.cors.trim();
            // if cors have , at the end, remove it
            while (params.cors[params.cors.length - 1] === ',') {
                if (params.cors[params.cors.length - 1] === ',') {
                    params.cors = params.cors.slice(0, -1);
                    params.cors = params.cors.trim();
                }
            }

            let cors = params.cors.split(',').map((c) => c.trim());
            let service_cors = (this.service.cors || '').split(',').map((c) => c.trim());
            if (cors.length === service_cors.length && cors.every((v, i) => v === service_cors[i])) {
                return this.service
            }

            to_update.cors = cors;
        }

        if ('name' in params && params.name !== this.service.name) {
            to_update.name = params.name;
        }

        if ('api_key' in params && params.api_key !== this.service.api_key) {
            to_update.api_key = params.api_key;
        }

        if (Object.keys(to_update).length) {
            this.service = reactive(await skapi.util.request(this.admin_private_endpoint + 'register-service', Object.assign({ execute: 'update', service: this.id, owner: this.owner }, to_update), { auth: true }));
        }

        return this.service;
    }

    getSubdomainInfo(): Promise<{
        srvc: string;
        subd: string;
        ownr: string;
        stat: 'remove' | 'change:(subdomain to be changed to)' | 'active' | string;
        ["404"]?: string;
    }> {
        return skapi.util.request(this.admin_private_endpoint + 'subdomain-info', { service: this.id, owner: this.owner }, { auth: true });
    }

    pendingSubdomain(cb: (service: ServiceObj) => void, time = 1000) {
        if (this.service?.subdomain && (this.service.subdomain?.[0] === '+' || this.service.subdomain?.[0] === '*')) {
            this.refresh().then(() => {
                if (!this.service?.subdomain || this.service?.subdomain && this.service.subdomain[0] !== '+' && this.service.subdomain[0] !== '*') {
                    return cb(this.service);
                }
                else {
                    time *= 1.2;
                    setTimeout(() => this.pendingSubdomain(cb, time), time);
                }
            });
        }
        else {
            return cb(this.service);
        }
    }

    async registerSubdomain(
        params: {
            subdomain?: string,
            cb?: (service: ServiceObj) => void; // callback runs when the subdomain process is complete
        }
    ): Promise<ServiceObj> {
        let invalid = [
            'baksa',
            'desktop',
            'mobile',
            'skapi',
            'broadwayinc',
            'broadway',
            'documentation'
        ];

        let { subdomain = '' } = params;
        if (subdomain && (subdomain.length < 4 || invalid.includes(subdomain))) {
            throw 'The subdomain has been taken.';
        }

        if (this.service?.subdomain === subdomain) {
            return this.service;
        }

        if (this.service?.subdomain) {
            if (subdomain && this.service?.subdomain[0] === '*') {
                throw 'Previous subdomain is in removal process.';
            }
            else if (subdomain && this.service?.subdomain[0] === '+') {
                throw `Previous subdomain is in transit to "${this.service.subdomain.slice(1)}".`;
            }
        }

        let resp = await skapi.util.request(this.admin_private_endpoint + 'register-subdomain', { service: this.id, owner: this.owner, subdomain }, {
            auth: true,
            method: 'post'
        });

        if (typeof resp !== 'string') {
            Object.assign(this.service, resp);
        }

        if (typeof params.cb === 'function') {
            this.pendingSubdomain(params.cb);
        }

        return this.service;
    }

    async getMailTemplates(
        params?: {
            searchFor: 'message_id' | 'timestamp' | 'read' | 'complaint' | 'subject';
            value: string | number;
            range?: string | number;
            condition?: '>' | '>=' | '=' | '<' | '<=' | 'gt' | 'gte' | 'eq' | 'lt' | 'lte';
        },
        fetchOptions?: { [key: string]: any }
    ): Promise<any> {
        try {
            let res = await skapi.util.request(this.admin_private_endpoint + 'get-templates', Object.assign({
                service: this.id,
                owner: this.owner,
            }, params), { auth: true, method: 'get', fetchOptions: fetchOptions || {} });

            res.list = res.list.map((value: any) => {
                return {
                    message_id: value.mid, timestamp: value.stmp, subject: value.subj, url: value.url
                }
            });

            return res;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    async deleteTemplate(
        params?: {
            message_id: string;
            group: 'welcome' | 'confirmation' | 'verification' | 'invitation';
        }
    ): Promise<any> {
        try {
            return skapi.util.request(this.admin_private_endpoint + 'delete-template', Object.assign({
                service: this.id,
                owner: this.owner,
            }, params), { auth: true });
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    async setTemplate(
        params?: {
            message_id: string;
            group: 'welcome' | 'confirmation' | 'verification' | 'invitation';
        }
    ): Promise<any> {
        try {
            return skapi.util.request(this.admin_private_endpoint + 'set-template', Object.assign({
                service: this.id,
                owner: this.owner,
            }, params), { auth: true });
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    async refreshCDN(
        serviceId: string,
        params?: {
            // when true, returns the status of the cdn refresh without running the cdn refresh
            // if callback are given, calls for cdn refresh, then callbacks the cdn refresh status in 3 seconds interval
            checkStatus: boolean | ((status: 'IN_QUEUE' | 'COMPLETE' | 'IN_PROCESS') => void);
        }
    ): Promise<
        'IS_QUEUED' | // new cdn refresh is queued
        'IN_QUEUE' | // the previous cdn refresh is still in queue
        'COMPLETE' | // only when checkStatus is true and the previous cdn refresh is complete
        'IN_PROCESS' // the cdn refresh is in process
    > {
        await this.require(Required.ADMIN);
        let { checkStatus = false } = params || {};

        if (!serviceId) throw 'Service ID is required';

        let service = this.services[serviceId];
        if (!service.subdomain || service.subdomain[0] === '*') {
            throw 'subdomain does not exists.';
        }

        try {
            let res = await this.request(await this.getAdminEndpoint('refresh-cdn'), {
                service: serviceId,
                subdomain: service.subdomain,
                exec: typeof checkStatus === 'boolean' && checkStatus ? 'status' : 'refresh'
            }, {
                auth: true,
                method: 'post'
            });

            if (checkStatus === true) {
                return res;
            }

            return 'IS_QUEUED';

        }
        catch (err) {
            if ((err as SkapiError).message === 'previous cdn refresh is still in queue.') {
                return 'IN_QUEUE';
            }
            if ((err as SkapiError).message === 'previous cdn refresh is in process.') {
                return 'IN_PROCESS';
            }
            else {
                throw err;
            }
        }
        finally {
            if (typeof checkStatus === 'function') {
                let callbackInterval = (serviceId, cb, time = 30000) => {
                    setTimeout(() => {
                        this.refreshCDN(serviceId, { checkStatus: true }).then(res => {
                            if (res === 'COMPLETE') {
                                return cb(res);
                            }
                            callbackInterval(serviceId, cb, time);
                        });
                    }, time);
                };
                callbackInterval(serviceId, checkStatus);
            }
        }
    }

    async set404(
        params: {
            path: string; // Set path to file of 404 page. ex) folder/file.html
        }
    ): Promise<'SUCCESS: Removed 404 page'> {
        return await skapi.util.request(this.admin_private_endpoint + 'set-404', { service: this.id, owner: this.owner, page404: params.path }, { auth: true });
    }

    async uploadHostFiles(
        fileList: FormData | HTMLFormElement | SubmitEvent,
        params: {
            nestKey?: string; // file to nest
            progress?: (p:
                {
                    status: 'upload',
                    progress: number,
                    currentFile: File,
                    completed: File[],
                    failed: File[],
                    loaded: number,
                    total: number,
                    abort: () => void
                }
            ) => void;
        }
    ): Promise<{ completed: File[]; failed: File[]; bin_endpoints: string[] }> {
        let progress = params?.progress || ((p: any) => p);

        if (fileList instanceof SubmitEvent) {
            fileList = (fileList.target as HTMLFormElement);
        }

        if (fileList instanceof HTMLFormElement) {
            fileList = new FormData(fileList);
        }

        let reserved_key = this.id;

        let getSignedParams: Record<string, any> = {
            reserved_key,
            service: this.id,
            owner: this.owner,
            request: 'host',
            id: this.service.subdomain
        };

        let xhr: any;
        let fetchProgress = (
            url: string,
            body: FormData,
            progressCallback: (p: ProgressEvent) => void
        ) => {
            return new Promise((res, rej) => {
                xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.onload = () => {
                    let result = xhr.responseText;
                    try {
                        result = JSON.parse(result);
                    }
                    catch (err) { }
                    if (xhr.status >= 200 && xhr.status < 300) {
                        res(result);
                    } else {
                        rej(result);
                    }
                };
                xhr.onerror = () => rej('Network error');
                xhr.onabort = () => rej('Aborted');
                xhr.ontimeout = () => rej('Timeout');

                // xhr.addEventListener('error', rej);
                if (xhr.upload && typeof progressCallback === 'function') {
                    xhr.upload.onprogress = progressCallback;
                }

                xhr.send(body);
            });
        };

        let completed = [];
        let failed = [];
        let bin_endpoints = [];
        for (let [key, f] of (fileList as any).entries()) {
            if (!(f instanceof File)) {
                continue;
            }

            let signedParams = Object.assign({
                key: f.name,
                // sizeKey: toBase62(f.size),
                contentType: f.type || null
            }, getSignedParams);

            let { fields = null, url } = await skapi.util.request(this.record_private_endpoint + 'get-signed-url', signedParams, { auth: true });

            bin_endpoints.push(url);

            let form = new FormData();

            for (let name in fields) {
                form.append(name, fields[name]);
            }

            form.append('file', f);
            console.log(url, form)
            try {
                await fetchProgress(
                    url,
                    form,
                    (p: ProgressEvent) => progress(
                        {
                            status: 'upload',
                            progress: p.loaded / p.total * 100,
                            currentFile: f,
                            completed,
                            failed,
                            loaded: p.loaded,
                            total: p.total,
                            abort: () => xhr.abort()
                        }
                    )
                );
                completed.push(f);
            } catch (err) {
                failed.push(f);
            }
        }

        return { completed, failed, bin_endpoints };
    }

    async deleteHostFiles(
        params: {
            paths: string[]; // path without subdomain ex) folder/file.html
        }
    ): Promise<string> {
        if (!params.paths || !params.paths.length) return;
        return skapi.util.request(this.record_private_endpoint + 'del-files', {
            service: this.id,
            owner: this.owner,
            endpoints: params.paths,
            storage: 'host'
        }, { auth: true, method: 'post' });
    }

    getDirInfo() {
        return skapi.util.request(this.admin_private_endpoint + 'host-directory', Object.assign({ service: this.id, owner: this.owner }, { dir: '', info: true }), {
            fetchOptions: {
                limit: 1,
                fetchMore: false,
                ascending: true
            },
            method: 'post',
            auth: true
        });
    }
    listHostDirectory(
        params: {
            dir: string; // unix style dir with subdomain. ex) subdomain/folder/subfolder
        },
        fetchMore: boolean = false
    ): Promise<{
        [key: string]: any;
        list: {
            name: string; // file path ex) /folder/subfolder/file.txt
            path: string;
            size: number;
            upl: number;
            cnt: number;
        }
    }> {
        let _subd = this.service.subdomain;
        if (_subd[0] === '*' || _subd[0] === '+') {
            _subd = _subd.slice(1);
        }

        return skapi.util.request(this.admin_private_endpoint + 'host-directory', Object.assign({ service: this.id, owner: this.owner }, params), {
            fetchOptions: {
                limit: 100,
                fetchMore: !!fetchMore,
                ascending: true
            },
            method: 'post',
            auth: true
        });
    }

    //////////////////////////////////////////////////////////////////////////////
    static async create(params: { name: string }) {
        if (!params?.name) throw new Error('Invalid service name.');

        let endpoints = await Promise.all([skapi.admin_endpoint, skapi.record_endpoint]);
        let admin_private_endpoint = endpoints[0].admin_private; // https://.../
        let record_private_endpoint = endpoints[1].record_private; // https://.../

        let currentLocale = skapi.connection.locale;
        let serviceRegion = '';

        if (regions?.[currentLocale]) {
            serviceRegion = regions[currentLocale];
        }
        else {
            const calculateDistance = (locale: any, region: any) => {
                const R = 6371e3; // metres
                const φ1 = (locale.latitude * Math.PI) / 180; // φ, λ in radians
                const φ2 = (region.latitude * Math.PI) / 180;
                const Δφ = ((region.latitude - locale.latitude) * Math.PI) / 180;
                const Δλ = ((region.longitude - locale.longitude) * Math.PI) / 180;

                const a =
                    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                const d = R * c; // in metres

                return d;
            };

            let difference = null;
            for (let region in regions) {
                let distance = calculateDistance(Countries[currentLocale], Countries[region]);
                if (difference == null || distance < difference) {
                    difference = distance;
                    serviceRegion = regions[region];
                }
            }
        }

        let service = await skapi.util.request(admin_private_endpoint + 'register-service', Object.assign(params, { service: skapi.service, owner: skapi.owner, execute: 'create', region: serviceRegion }), { auth: true });
        return new Service(service.service, service, [admin_private_endpoint, record_private_endpoint]);
    }

    async refresh() {
        let service = await skapi.util.request(this.admin_private_endpoint + 'get-services', { service: skapi.service, owner: skapi.owner, service_id: this.id }, { auth: true });
        for (let region in service) {
            if (service[region][0]) {
                this.service = reactive(service[region][0]);
                break;
            }
        }
        return this.service;
    }

    static async load(id: string): Promise<Service> {
        if (!id) throw new Error('Invalid service id.');

        let endpoints = await Promise.all([skapi.admin_endpoint, skapi.record_endpoint]);
        let admin_private_endpoint = endpoints[0].admin_private; // https://.../
        let admin_public_endpoint = endpoints[0].admin_public; // https://.../
        let record_private_endpoint = endpoints[1].record_private; // https://.../

        if (typeof id === 'string') {
            let service = await skapi.util.request(admin_private_endpoint + 'get-services', { service: skapi.service, owner: skapi.owner, service_id: id }, { auth: true });
            for (let region in service) {
                if (service[region][0]) {
                    let serviceClass = new Service(id, service[region][0], [admin_private_endpoint, record_private_endpoint, admin_public_endpoint]);
                    return serviceClass;
                }
            }
        }
    }
}