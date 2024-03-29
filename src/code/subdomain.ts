import { skapi, getEndpointUrl } from './admin';
import { SkapiError } from 'skapi-js'

export async function refreshCDN(
    params?: {
        service: string,
        subdomain: string,
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

    try {
        let res = await skapi.util.request(await getEndpointUrl('refresh-cdn'), {
            service: params.service,
            owner: skapi.user.user_id,
            subdomain: params.subdomain,
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
            let callbackInterval = (serviceId: string, cb: any, time = 30000) => {
                setTimeout(() => {
                    refreshCDN({ service: serviceId, subdomain: params.subdomain, checkStatus: true }).then(res => {
                        if (res === 'COMPLETE') {
                            return cb(res);
                        }
                        callbackInterval(serviceId, cb, time);
                    });
                }, time);
            };
            callbackInterval(params.service, checkStatus);
        }
    }
}

export async function set404(
    params: {
        service: string,
        path: string; // Set path to file of 404 page. ex) folder/file.html
    }
): Promise<'SUCCESS'> {
    await skapi.util.request(await getEndpointUrl('set-404'), { service: params.service, owner: skapi.user.user_id, page404: params.path }, { auth: true });
    return 'SUCCESS';
}

export async function uploadHostFiles(
    fileList: FormData,
    params: {
        dir: string; // dir without subdomain. ex) folder/subfolder
        service: string;
        progress: (p: any) => void;
    }
): Promise<{ completed: File[]; failed: File[]; }> {

    let { service, dir = '', progress } = params;

    if (dir) {
        dir = dir.replace(/^\//, '').replace(/\/$/, '') + '/'; // remove leading and trailing slashes and add trailing slash
    }

    if (!service) {
        throw new SkapiError('invalid service.', { code: 'INVALID_PARAMETER' });
    }

    if (!(fileList instanceof FormData)) {
        throw new SkapiError('"fileList" should be a FormData or HTMLFormElement.', { code: 'INVALID_PARAMETER' });
    }

    let getSignedParams: Record<string, any> = {
        reserved_key: skapi.util.generateRandom(),
        service,
        request: 'host'
    };

    let xhr: XMLHttpRequest;
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
            service,
            owner: skapi.user.user_id,
            key: dir + f.name,
            sizeKey: skapi.util.toBase62(f.size),
            contentType: f.type || null
        }, getSignedParams);

        let { fields = null, url, cdn } = await skapi.util.request('get-signed-url', signedParams, { auth: true });

        bin_endpoints.push(cdn);

        let form = new FormData();

        for (let name in fields) {
            form.append(name, fields[name]);
        }

        form.append('file', f);

        try {
            await fetchProgress(
                url,
                form,
                typeof progress === 'function' ? (p: ProgressEvent) => progress(
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
                ) : null
            );
            completed.push(f);
        } catch (err) {
            failed.push(f);
        }
    }

    return { completed, failed };
}

export async function deleteHostFiles(
    params: {
        service: string,
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

    return skapi.util.request('del-files', {
        service: params.service,
        endpoints: pathsArr,
        storage: 'host'
    }, { auth: true, method: 'post' });
}

export async function listHostDirectory(
    params: {
        dir: string; // unix style dir with subdomain. ex) subdomain/folder/subfolder
    },
    fetchOptions: {
        limit: number;
        fetchMore: boolean;
        ascending: boolean;
    }
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
    return skapi.util.request(await getEndpointUrl('list-host-directory', false), params, {
        fetchOptions,
        method: 'post'
    });
}
