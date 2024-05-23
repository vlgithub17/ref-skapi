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
            case 'register-service':
            case 'get-services':
            case 'register-subdomain':
            case 'list-host-directory':
            case 'refresh-cdn':
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

export let dateFormat = (timestamp: number) => {
    let currentDate = new Date(timestamp);
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let day = ('0' + currentDate.getDate()).slice(-2);
    let dateStr = `${year}-${month}-${day}`;

    return dateStr;
}

export const getFileSize = (s: any) => {
    if (s <= 0 || s == null) {
        return '0 bytes'
    }
    else {
        let unit = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
        let e = Math.floor(Math.log(s) / Math.log(1024));
        return (s / Math.pow(1024, e)).toFixed(2) + " " + unit[e];
    }
};