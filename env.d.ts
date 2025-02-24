/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ADMIN: string;
    readonly VITE_ETC: string;
    readonly VITE_DATE: string;

    readonly VITE_DOMAIN: string; // host domain
    readonly VITE_PRODUCT: string; // stripe product id { "product name": "id", ... }

    // add more environment variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
