import { skapi } from "@/code/admin"
import { currentService } from "../main";

let parseBinEndpoint = async (r: string[]) => {
    let binObj: any = {};

    if (Array.isArray(r)) {
        for (let url of r) {
            // publ/ap21piquKpzLtjAJxckv/4d4a36a5-b318-4093-92ae-7cf11feae989/4d4a36a5-b318-4093-92ae-7cf11feae989/records/TrNFqeRsKGXyxckv/00/bin/TrNFron/IuqU/gogo/Skapi_IR deck_Final_KOR.pptx
            let path = url.split('/').slice(3).join('/');
            let splitPath = path.split('/');
            let filename = decodeURIComponent(splitPath.slice(-1)[0]);
            let pathKey = decodeURIComponent(splitPath[10]);
            let size = splitPath[9];
            let uploaded = splitPath[8];
            let access_group = splitPath[6] == '**' ? 'private' : parseInt(splitPath[6]);
            access_group = access_group == 0 ? 'public' : access_group == 1 ? 'authorized' : access_group;

            let url_endpoint = url;
            if (access_group !== 'public') {
                let resolved_endpoint = (await skapi.getFile.bind(this)(url, { dataType: 'endpoint', expires: access_group === 'private' && currentService.owner !== path[0] ? 3600 : 0 }) as string);
                url_endpoint = resolved_endpoint;
            }

            let obj = {
                access_group,
                filename,
                url: url_endpoint,
                path,
                size: skapi.util.fromBase62(size),
                uploaded: skapi.util.fromBase62(uploaded),
                getFile: (dataType: 'base64' | 'endpoint' | 'blob' | 'download', progress: (c: any) => void) => {
                    let config = {
                        dataType: dataType || 'download',
                        progress
                    };
                    return skapi.getFile.bind(this)(url, config);
                }
            };
            if (binObj[pathKey]) {
                binObj[pathKey].push(obj);
                continue;
            }

            binObj[pathKey] = [obj];
        }
    }
    return binObj;
}

export let uploadRecord = async (e: SubmitEvent, progress: (c: any) => void) => {
    // extract form values based on input names
    let toUpload: {
        data: {
            user_id: string;
            config: any;
            data: any;
        },
        files: {
            file: File,
            name: string
        }[]
    } = skapi.util.extractFormData(e);

    let data = undefined;
    let config:any = {};
    let access_group = toUpload.data.config?.table?.access_group;

    let isUpdate = !!toUpload.data.config?.record_id;

    if (isUpdate && toUpload.data.user_id !== currentService.owner && access_group === 'private') {
        // cannot change access group of private records of other users
        delete toUpload.data.config.table.access_group;
    }
    else {
        // string number to actual number
        toUpload.data.config.table.access_group = parseInt(toUpload.data.config.table.access_group);

        // set json string to actual data
        if (toUpload.data.data) {
            data = toUpload.data.data ? JSON.parse(toUpload.data.data) : null;
        }
    }

    config = toUpload.data.config;
    config.service = currentService.id;
    config.owner = currentService.owner;

    if (!isUpdate) {
        // record_id is empty if it's a new record
        delete config.record_id;
    }

    let files = toUpload.files;
    console.log({ data, config, files });

    // uncomment below to upload

    // // upload json data first
    // let rec = await skapi.postRecord(data, config);

    // // upload files if any
    // if (files.length) {
    //     let bin_formData = new FormData();
    //     for (let f of files) {
    //         bin_formData.append(f.name, f.file, f.file.name);
    //     }

    //     let uploadFileParams = {
    //         record_id: rec.record_id,
    //         service: currentService.id,
    //         owner: currentService.owner,
    //         progress
    //     }

    //     let { bin_endpoints } = await skapi.uploadFiles.bind(this)(bin_formData, uploadFileParams);

    //     let bin = await parseBinEndpoint(bin_endpoints);

    //     if (!rec.bin) {
    //         rec.bin = bin;
    //     }
    //     else {
    //         Object.assign(rec.bin, bin)
    //     }
    // }

    // return rec;
}