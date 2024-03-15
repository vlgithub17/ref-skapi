import { skapi, getEndpointUrl } from './admin';


export async function refreshCDN(
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
    let { checkStatus = false } = params || {};

    if (!serviceId) throw 'Service ID is required';

    try {
        let res = await skapi.request(await getEndpointUrl('refresh-cdn'), {
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

export async function set404(
    params: {
        serviceId: string,
        path: string; // Set path to file of 404 page. ex) folder/file.html
    }
): Promise<'SUCCESS'> {
    await this.require(Required.ADMIN);
    let serviceId = params.serviceId;
    if (!this.services[serviceId].subdomain) {
        throw 'subdomain does not exists.';
    }
    await this.request(await this.getEndpointUrl('set-404'), { service: serviceId, page404: params.path }, { auth: true });
    return 'SUCCESS';
}

export async function uploadHostFiles(
    formData: FormData,
    params: {
        nestKey: string;
        serviceId: string;
        progress: (p) => void;
    }
): Promise<{ completed: File[]; failed: File[]; }> {
    return this.hostFiles(formData, ({
        service: params.serviceId,
        dir: params.nestKey,
        progress: params?.progress
    } as any));
}

export async function deleteHostFiles(
    serviceId: string,
    params: {
        subdomain: string,
        paths: string[]; // path without subdomain ex) folder/file.html
    }
): Promise<string> {
    if (!params.subdomain) {
        throw '"params.serviceId" is required.';
    }
    if (!params?.paths) {
        throw '"params.paths" is required.';
    }

    let pathsArr = [];

    for (let i = 0; i < params.paths.length; i++) {
        pathsArr.push(params.subdomain + '/' + params.paths[i]);
    }

    return skapi.request('del-files', {
        service: serviceId,
        endpoints: pathsArr,
        storage: 'host'
    }, { auth: true, method: 'post' });
}

export async function listHostDirectory(
    params: {
        dir: string; // unix style dir with subdomain. ex) subdomain/folder/subfolder
    },
    fetchOptions: FetchOptions
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
    this.require(Required.ADMIN);

    return this.request(await this.getEndpointUrl('list-host-directory', false), Object.assign(params), {
        fetchOptions,
        method: 'post'
    });
}
