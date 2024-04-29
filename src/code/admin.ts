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

