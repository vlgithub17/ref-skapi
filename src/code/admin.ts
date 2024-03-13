import { Skapi } from 'skapi-js';

export const skapi = new Skapi(import.meta.env.VITE_ADMIN, 'skapi', { autoLogin: window.localStorage.getItem('remember') === 'true' }, JSON.parse(import.meta.env.VITE_ETC));

export async function getEndpointUrl(dest: string, auth: boolean = true):Promise<string> {
    const endpoints = await Promise.all([
        skapi.admin_endpoint,
        skapi.record_endpoint
    ]);

    const admin = endpoints[0];
    const record = endpoints[1];
    const get_ep = () => {
        switch (dest) {
            case 'delete-newsletter':
            case 'block-account':
            case 'register-service':
            case 'get-services':
            case 'register-subdomain':
            case 'list-host-directory':
            case 'refresh-cdn':
            case 'request-newsletter-sender':
            case 'set-404':
            case 'subdomain-info':
                return {
                    public: admin.admin_public,
                    private: admin.admin_private
                };

            case 'storage-info':
                return {
                    private: record.record_private,
                    public: record.record_public
                };

            default:
                return null
        }
    };

    return (get_ep()?.[auth ? 'private' : 'public'] || '') + dest;
}

export async function blockAccount(
    serviceId: string,
    params: {
        userId: string;
    }
): Promise<'SUCCESS'> {
    await skapi.request(await getEndpointUrl('block-account'), { service: serviceId, block: params.userId }, { auth: true });
    return 'SUCCESS';
}

export async function unblockAccount(
    serviceId: string,
    params: {
        userId: string;
    }
): Promise<'SUCCESS'> {
    await skapi.request(await getEndpointUrl('block-account'), { service: serviceId, unblock: params.userId }, { auth: true });
    return 'SUCCESS';
}

export async function deleteAccount(
    serviceId: string,
    params: {
        userId: string;
    }
): Promise<'SUCCESS'> {
    await skapi.request('remove-account', { service: serviceId, delete: params.userId }, { auth: true });
    return 'SUCCESS';
}

export async function deleteService(serviceId: string): Promise<"The service has been successfully deleted."> {
    await skapi.request(await getEndpointUrl('register-service'), {
        service: serviceId,
        execute: 'delete'
    }, { auth: true });

    return 'The service has been successfully deleted.';
}

// get newsletter mail address
export async function requestNewsletterSender(serviceId: string, params: { groupNum: number; }): Promise<string> {
    return skapi.request(await getEndpointUrl('request-newsletter-sender'), { service: serviceId, group_numb: params.groupNum }, { auth: true });
}


export async function deleteNewsletter(
    params: {
        message_id: string;
        group: number;
    }
) {
    return skapi.request(await getEndpointUrl('delete-newsletter'), params, { auth: true });
}

//send invitation email, when accepted, user will have their account created, and be redirected
export async function resendInvitation(
    params: {
        service: string,
        email: string,
        redirect: string;
    }
): Promise<'SUCCESS: Invitation E-Mail has been sent.'> {
    let resend = await skapi.request("confirm-signup", {
        service: params.service,
        is_invitation: params.email,
        redirect: params.redirect
    }, { auth: true });

    return resend; // 'SUCCESS: Invitation E-Mail has been sent.'
}