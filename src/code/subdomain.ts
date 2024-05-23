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
