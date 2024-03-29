import { Skapi } from 'skapi-js';

export const skapi = new Skapi(import.meta.env.VITE_ADMIN, 'skapi', { autoLogin: window.localStorage.getItem('remember') === 'true' }, JSON.parse(import.meta.env.VITE_ETC));

export async function getEndpointUrl(dest: string, auth: boolean = true): Promise<string> {
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
    service: string,
    params: {
        userId: string;
    }
): Promise<'SUCCESS'> {
    await skapi.util.request(await getEndpointUrl('block-account'), { owner: skapi.user.user_id, service, block: params.userId }, { auth: true });
    return 'SUCCESS';
}

export async function unblockAccount(
    service: string,
    params: {
        userId: string;
    }
): Promise<'SUCCESS'> {
    await skapi.util.request(await getEndpointUrl('block-account'), { owner: skapi.user.user_id, service, unblock: params.userId }, { auth: true });
    return 'SUCCESS';
}

export async function deleteAccount(
    service: string,
    params: {
        userId: string;
    }
): Promise<'SUCCESS'> {
    await skapi.util.request('remove-account', { owner: skapi.user.user_id, service, delete: params.userId }, { auth: true });
    return 'SUCCESS';
}

export async function deleteService(service: string): Promise<"The service has been successfully deleted."> {
    await skapi.util.request(await getEndpointUrl('register-service'), {
        service,
        owner: skapi.user.user_id,
        execute: 'delete'
    }, { auth: true });

    return 'The service has been successfully deleted.';
}

// get newsletter mail address
export async function requestNewsletterSender(service: string, params: { groupNum: number }): Promise<string> {
    return skapi.util.request(await getEndpointUrl('request-newsletter-sender'), Object.assign({ service, owner: skapi.user.user_id }, skapi.util.extractFormData(params).data || {}), { auth: true });
}

export async function deleteNewsletter(
    service: string,
    params: {
        message_id: string;
        group: number;
    }
) {
    return skapi.util.request(await getEndpointUrl('delete-newsletter'), Object.assign({ service, owner: skapi.user.user_id }, skapi.util.extractFormData(params).data || {}), { auth: true });
}

//send invitation email, when accepted, user will have their account created, and be redirected
export async function resendInvitation(
    service: string,
    params: {
        email: string,
        redirect: string;
    }
): Promise<'SUCCESS: Invitation E-Mail has been sent.'> {
    let p: any = skapi.util.extractFormData(params).data;
    let resend = await skapi.util.request("confirm-signup", {
        service,
        owner: skapi.user.user_id,
        is_invitation: p.email,
        redirect: p.redirect
    }, { auth: true });

    return resend; // 'SUCCESS: Invitation E-Mail has been sent.'
}