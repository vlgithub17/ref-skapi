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
    email_triggers?: {
        template_setters: {
            welcome: string,
            signup_confirmation: string,
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
// import { callServiceList, serviceList, serviceIdList } from '@/views/service-list';

type SubscriptionObj = {
    [key: string]: any;
    application: null;
    application_fee_percent: null
    automatic_tax: { enabled: boolean, liability: null }
    billing_cycle_anchor: number
    billing_cycle_anchor_config: null
    billing_thresholds: null
    cancel_at: null
    cancel_at_period_end: false
    canceled_at: null
    cancellation_details: { comment: null, feedback: null, reason: null }
    collection_method: string
    created: number
    currency: string
    current_period_end: number
    current_period_start: number
    customer: string
    days_until_due: null
    default_payment_method: string
    default_source: null
    default_tax_rates: []
    description: string
    discount: null
    ended_at: null
    id: string
    invoice_settings: { account_tax_ids: null, issuer: { type: string } }
    items: { object: string, data: [], has_more: false, total_count: 1, url: string }
    latest_invoice: string
    livemode: false
    metadata: { service: string }
    next_pending_invoice_item_invoice: null
    object: string
    on_behalf_of: null
    pause_collection: null
    payment_settings: { payment_method_options: null, payment_method_types: null, save_default_payment_method: string }
    pending_invoice_item_interval: null
    pending_setup_intent: null
    pending_update: null
    plan: {
        active: boolean,
        aggregate_usage: null,
        amount: number,
        amount_decimal: string,
        billing_scheme: string,
        created: number,
        currency: string,
        id: string,
        interval: string,
        interval_count: number,
        livemode: boolean,
        metadata: {},
        nickname: null,
        object: string,
        product: string,
        tiers_mode: null,
        transform_usage: null,
        trial_period_days: null,
        usage_type: string
    }
    quantity: number
    schedule: null
    start_date: number
    status: string
    test_clock: null
    transfer_data: null
    trial_end: null
    trial_settings: { end_behavior: { missing_payment_method: string } }
    trial_start: null
}

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
    subscription?: SubscriptionObj | {} = reactive({});
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
    })

    subscriptionFetched = ref(false);
    _orgPlan = '';
    _subsPromise;
    newsletterSender: Promise<string>[] = [];
    constructor(id: string, service: ServiceObj, endpoints: string[]) {
        this.id = id;
        this.admin_private_endpoint = endpoints[0];
        this.record_private_endpoint = endpoints[1];
        this.admin_public_endpoint = endpoints[2];
        service.plan = '-'
        this.service = reactive(service);
        this.owner = service.owner;
        this.dateCreated = typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString();
        this.plan = this.planCode[this.service.group];
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

    setPlan = (subscription: SubscriptionObj) => {
        this._orgPlan = this.planCode[this.service.group];
        if (subscription?.status === 'canceled' || subscription?.cancel_at_period_end || new Date().getTime() < (subscription?.canceled_at || 0)) {
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
        if (Object.keys(this.subscription).length) {
            if (!refresh) {
                return this.subscription;
            }
        }

        for (let k in this.subscription) {
            delete this.subscription[k];
        }

        if (this.service?.subs_id) {
            let subs_id = this.service?.subs_id.split('#');

            if (subs_id.length < 2) {
                return;
            }

            let SUBSCRIPTION_ID = subs_id[0];

            let res = await skapi.clientSecretRequest({
                clientSecretName: 'stripe_test',
                url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer $CLIENT_SECRET',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            Object.assign(this.subscription, res);
        }

        this.setPlan(this.subscription);
        return this.subscription;
    }

    async cancelSubscription(): Promise<SubscriptionObj> {
        await this._subsPromise;

        if (!Object.keys(this.subscription).length) {
            return null;
        }

        for (let k in this.subscription) {
            delete this.subscription[k];
        }

        if (this.service?.subs_id) {
            let subs_id = this.service?.subs_id.split('#');

            if (subs_id.length < 2) {
                return;
            }

            let SUBSCRIPTION_ID = subs_id[0];

            let res = await skapi.clientSecretRequest({
                clientSecretName: 'stripe_test',
                url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer $CLIENT_SECRET'
                },
                data: {
                    cancel_at_period_end: true
                }
            });

            Object.assign(this.subscription, res);
        }

        this.setPlan(this.subscription);
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
            let srv = await skapi.util.request(this.admin_private_endpoint + 'register-service', Object.assign({ execute: 'update', service: this.id, owner: this.owner }, to_update), { auth: true });
            for (let k in srv) {
                this.service[k] = srv[k];
            }
        }

        return this.service;
    }

    async getServiceInfo() {
        this.service = await skapi.util.request(this.admin_private_endpoint + 'get-services', { service: skapi.service, owner: skapi.owner, service_id: this.id }, { auth: true });
        return this.service;
    }

    getSubdomainInfo(
        params: {
            subdomain: string;
        }
    ): Promise<{
        srvc: string;
        subd: string;
        ownr: string;
        stat: string;
        ["404"]?: string;
    }> {
        return skapi.util.request(this.admin_private_endpoint + 'subdomain-info', { service_id: this.id, subdomain: params.subdomain, service: skapi.service, owner: skapi.owner }, { auth: true });
    }

    updateSubdomain(cb: (service: ServiceObj) => void, time = 1000) {
        if (this.service?.subdomain && (this.service.subdomain?.[0] === '+' || this.service.subdomain?.[0] === '*')) {
            this.getServiceInfo().then(() => {
                if (!this.service?.subdomain || this.service?.subdomain && this.service.subdomain[0] !== '+' && this.service.subdomain[0] !== '*') {
                    return cb(this.service);
                }
                else {
                    time *= 1.2;
                    setTimeout(() => this.updateSubdomain(cb, time), time);
                }
            });
        }
        else {
            return cb(this.service);
        }
    }

    async registerSubdomain(
        params: {
            subdomain: string,
            cb: (service: ServiceObj) => void; // callback runs when the subdomain process is complete
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
            this.updateSubdomain(params.cb);
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

            res.list.forEach((value: any, idx: number) => {
                res.list[idx] = {
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