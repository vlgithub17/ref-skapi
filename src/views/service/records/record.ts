import { skapi } from "@/code/admin"
import { currentService } from "../main";
import { ref, computed } from "vue";
import jsonCrawler from 'jsoncrawler'; // https://github.com/broadwayinc/jsoncrawler 참고
// import Pager from '@/code/pager'
// import type { Ref } from 'vue';

// export let pager: Pager = null;
// export let searchFor: Ref<"table" | "reference"> = ref('table');
// export let searchValue: Ref<string | number> = ref('');
// export let listDisplay = ref(null);

// export let fetching = ref(false);
// export let maxPage = ref(0);
// export let currentPage: Ref<number> = ref(1);
// export let endOfList = ref(false);

// let updateEndTime = ref(false);
// // let callParams = computed(() => {
// //     let result = {};

// //     switch (searchFor.value) {
// //         case 'table':
// //             result = {
// //                 service: currentService.id,
// //                 searchFor: searchFor.value,
// //             }
// //         case 'reference':
// //             result = {
// //                 service: currentService.id,
// //                 searchFor: searchFor.value,
// //                 value: searchValue.value
// //             }

// //         default:
// //             result = {
// //                 service: currentService.id,
// //                 searchFor: searchValue.value == '' ? 'record_id' : searchFor.value,
// //                 value: searchValue.value == '' ? 0 : searchValue.value,
// //                 condition: '>='
// //             }
// //     }

// //     return result;
// // });

// let currentParams = {
//     service: currentService.id,
//     searchFor: 'record_id'
// };

// export let init = async () => {
//     currentPage.value = 1;

//     // setup pagers
//     pager = await Pager.init({
//         id: 'record_id',
//         resultsPerPage: 15,
//         sortBy: !searchValue.value ? 'record_id' : currentParams.searchFor,
//         order: !searchValue.value ? 'desc' : 'asc',
//     });

//     getPage(true);
// }

// export let getPage = async (refresh?: boolean) => {
//     if (!pager) {
//         return;
//     }
    
//     if (refresh) {
//         endOfList.value = false;
//         updateEndTime.value = true;
//     }

//     if (!refresh && maxPage.value >= currentPage.value || endOfList.value) {
//         listDisplay.value = pager.getPage(currentPage.value).list;
//         return;
//     }

//     else if (!endOfList.value || refresh) {
//         fetching.value = true;

//         let fetchedData = await skapi.getRecords(currentParams, { fetchMore: !refresh, ascending: !searchValue.value ? false : true });

//         // save endOfList status
//         endOfList.value = fetchedData.endOfList;

//         // insert data in pager
//         if (fetchedData.list.length > 0) {
//             await pager.insertItems(fetchedData.list);
//         }

//         // get page from pager
//         let disp = pager.getPage(currentPage.value);
//         maxPage.value = disp.maxPage;
//         listDisplay.value = disp.list;

//         if(disp.maxPage > 0 && disp.maxPage < currentPage.value && !disp.list.length) {
//             currentPage.value--;
//         }

//         fetching.value = false;
//     }
// }

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

export let uploadRecord = async (e: SubmitEvent, remove_bin?:{[key:string]:any}[], progress?: (c: any) => void) => {
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

    // upload json data first
    let rec = await skapi.postRecord(Object.assign({remove_bin}, data), config);

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

        let bin = await parseBinEndpoint(bin_endpoints);

        if (!rec.bin) {
            rec.bin = bin;
        }
        else {
            Object.assign(rec.bin, bin)
        }
    }

    return rec;
}