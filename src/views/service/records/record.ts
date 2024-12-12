import { skapi } from "@/code/admin"
import { devLog } from "@/code/logger";
import { currentService } from "../main";
import { ref, computed } from "vue";
import jsonCrawler from 'jsoncrawler'; // https://github.com/broadwayinc/jsoncrawler 참고
import { compileScript } from "vue/compiler-sfc";

let parseBinEndpoint = async (r: string[]) => {
    let binObj: any = {};
    if (Array.isArray(r)) {
        for (let url of r) {
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
                url_endpoint = (await skapi.getFile(url, { dataType: 'endpoint' }) as string);
            }

            let obj = {
                access_group,
                filename,
                url: url_endpoint,
                path,
                size: skapi.util.fromBase62(size),
                uploaded: skapi.util.fromBase62(uploaded),
                // getFile: (dataType: 'base64' | 'endpoint' | 'blob' | 'download', progress: (c: any) => void) => {
                //     let config = {
                //         dataType: dataType || 'download',
                //         progress
                //     };
                //     return skapi.getFile(url, config);
                // }
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

// remove_bin 파일 전체를 넣어도 되고 endpoint만 보내도 됨
export let uploadRecord = async (e: SubmitEvent, edit?: boolean, remove_bin?: { [key: string]: any }[], progress?: (c: any) => void) => {
    let form = e.target as HTMLFormElement;
    let elements = form.elements;
    let updateInputName = ['config[tags]', 'config[reference]', 'config[source][referencing_limit]'];
    let updateInputValue: { [key: string]: string | null } = {};

    if (edit) {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLInputElement;
        
            if (updateInputName.includes(element.name)) {
                updateInputValue[element.name] = element.value;
            }
        }
        devLog({updateInputValue});
    }

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
    } = skapi.util.extractFormData(e, { ignoreEmpty: true });

    if (!toUpload.data?.config?.index?.name) {
        delete toUpload.data.config.index;
    }

    let data = undefined;
    let config: any = {};
    let isUpdate = !!toUpload.data.config?.record_id;

    // set json string to actual data
    let checkPrivateData: any = {
        __is_private__: null
    }
    if (toUpload.data.data && toUpload.data.config?.table?.access_group == 'private' && JSON.stringify(JSON.parse(toUpload.data?.data)) == JSON.stringify(checkPrivateData)) {
        delete toUpload.data.data;
    } else {
        data = toUpload.data.data ? JSON.parse(toUpload.data.data) : null;
    }

    config = toUpload.data.config;
    config.service = currentService.id;
    config.owner = currentService.owner;

    if (!isUpdate) {
        delete config.record_id;
    }

    let files = toUpload.files;

    if (config?.index?.condition === 'range') {
        delete config.index.condition;
    }

    // 빈 값 제거
    let emptyValues = jsonCrawler(config, [""]);
    for (let p of emptyValues) {
        let obj = config;
        for (let k of p.path) {
            obj = obj[k];
        }
        devLog(obj, p.key)
        delete obj[p.key];
    }

    if (Object.keys(updateInputValue)) {
        config.tags = updateInputValue['config[tags]'];
        config.reference = updateInputValue['config[reference]'];
        config.source.referencing_limit = updateInputValue['config[source][referencing_limit]'] === '' ? null : updateInputValue['config[source][referencing_limit]'];
    }
    
    devLog({ config });

    // upload json data first
    let rec;
    if (edit) {
        rec = await skapi.postRecord(data, Object.assign({ record_id: toUpload.data.config?.record_id, remove_bin }, config));
    } else {
        rec = await skapi.postRecord(data, config);
    }

    // upload files if any
    if (files.length) {
        let bin_formData = new FormData();
        for (let f of files) {
            bin_formData.append(f.name, f.file, f.file.name);
        }

        let uploadFileParams = {
            record_id: rec.record_id,
            service: currentService.id,
            owner: currentService.owner,
            progress
        }

        let { bin_endpoints } = await skapi.uploadFiles(bin_formData, uploadFileParams);
        // devLog({bin_endpoints})
        let bin = await parseBinEndpoint(bin_endpoints);

        if (!rec.bin) {
            rec.bin = bin;
        }
        else {
            Object.assign(rec.bin, bin)
        }
    }
    // devLog({rec})
    return rec;
}