<template lang="pug">
.infoBox(v-if='!user?.email_verified || !currentService.service.subdomain' style='max-width:600px;margin:3rem auto;')
    .infoTitle Hosting 

    hr

    p.
        File hosting service let you host files and static websites.
        #[br]
        To host your public files, please register a subdomain.

    p The subdomain can only be #[span.wordset alphanumeric and hyphen,] should be at least #[span.wordset 6 characters] minimum and #[span.wordset max 32 characters.]
    
    br

    form.register(@submit.prevent='registerSubdomain')
        .subdomain
            input.big(v-model='subdomain' pattern='^[a-z\\d](?:[a-z\\d\\-]{0,61}[a-z\\d])?$' minlength="6" maxlength="32" :disabled="promiseRunning" placeholder="your-subdomain" required)
        button.final(style='min-width: 124px;' :disabled='promiseRunning' :class='{nonClickable: promiseRunning}')
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                | Register

template(v-else)
    .infoBox(:class='{nonClickable: !user?.email_verified || currentService.service.active <= 0 || currentSubdomain.status !== "Active"}')
        .infoTitle
            | Hosting&nbsp;&nbsp;
            small(style='font-weight: normal' :style='{color: currentSubdomain.status === "Active" ? "var(--text-green)" : currentSubdomain.status === "Removing" ? "var(--caution-color)" : null } ') ({{ currentSubdomain.status }})

        hr

        .infoValue
            .smallTitle Created
            .smallValue {{ !fetching ? dirInfo?.upl ? new Date(dirInfo.upl).toLocaleString() : new Date().toLocaleString() : '...' }}

        .infoValue
            .smallTitle Storage in-use
            .smallValue {{ !fetching ? getFileSize(dirInfo?.size || 0) : '...' }}

        .infoValue
            .smallTitle URL
            .smallValue(:class='{nonClickable: !user?.email_verified || currentService.service.active <= 0 || cdnPending || fetching}')
                template(v-if="modifyMode.subdomain")
                    form.register.editValue(@submit.prevent="changeSubdomain")
                        .subdomain
                            input#modifySubdomain.big(ref="focus_subdomain" :disabled="updatingValue.subdomain || null" type="text"  pattern='^[a-z\\d](?:[a-z\\d\\-]{0,61}[a-z\\d])?$' minlength="4" maxlength="32" placeholder="your-subdomain" required :value='inputSubdomain' @input="(e) => {e.target.setCustomValidity(''); inputSubdomain = e.target.value;}")

                        template(v-if="updatingValue.subdomain")
                            img.loading(src="@/assets/img/loading.png")
                        label.material-symbols-outlined.save(v-else) done
                            input(type="submit" hidden)
                        span.material-symbols-outlined.cancel(@click="modifyMode.subdomain = false;") close

                div(v-else)
                    .smallValue {{ currentSubdomain.subdomain }}&nbsp;
                    span.editHandle(@click="editSubdomain" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") [EDIT]
                    .infoValue

        .infoValue
            .smallTitle 404 Page
            .smallValue(:class='{nonClickable: !user?.email_verified || currentService.service.active <= 0 || cdnPending || fetching}')
                template(v-if="modifyMode.page404")
                    form.register.editValue(@submit.prevent="change404" style='flex-grow: 0')
                        input(ref="focus_404" hidden type="file" name='file' required @change="handle404file" :disabled='updatingValue.page404' accept="text/html")
                        .input.editHandle(style='font-size: .8rem;margin-right: 8px;' @click='focus_404.click()' :class='{nonClickable:updatingValue.page404}') {{ selected404File || sdInfo?.['404'] || 'Select HTML File' }}
                        template(v-if="updatingValue.page404")
                            //- img.loading(src="@/assets/img/loading.png")
                            pre(style='margin:0;font-size: .8rem;font-weight:normal' v-if='progress404 < 100') {{ progress404 }}%
                            pre(style='margin:0;font-size: .8rem;font-weight:normal' v-else) Updating...
                        label.material-symbols-outlined.save.fill(v-else :class="{'nonClickable' : !selected404File}") upload
                            input(type="submit" hidden)
                        span.material-symbols-outlined.cancel(v-if='!updatingValue.page404' @click="modifyMode.page404 = false;selected404File=null;") close

                div(v-else)
                    .smallValue.editValue
                        span.editHandle(style='font-size: .8rem;margin-right: 8px;' :class='{nonClickable:sdInfo?.["404"] && sdInfo?.["404"] === "..."}' @click="open404FileInp") {{ sdInfo?.['404'] || 'Select HTML File' }}
                        span.material-symbols-outlined.cancel.fill(v-if='!updatingValue.page404 && sdInfo?.["404"] && sdInfo?.["404"] !== "..."' @click="openRemove404=true") delete

        div(style="text-align:right")
            .iconClick(@click="removeHosting = true" style='color:var(--caution-color);font-size:0.66rem;')
                .material-symbols-outlined.fill(style='font-size:24px;') cancel
                span &nbsp;Remove Hosting
    br

    .tableMenu(:class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")

        .iconClick.square(@click='uploadFileInp.click()' :class="{'nonClickable': fetching || !user?.email_verified || currentService.service.active <= 0 || cdnPending}")
            input(type="file" hidden multiple @change="e=>uploadFiles(e.target.files, getFileList)" ref="uploadFileInp")
            .material-symbols-outlined.fill upload_file
            span &nbsp;&nbsp;Upload Files

        .iconClick.square(@click='uploadFolderInp.click()' :class="{'nonClickable': fetching || !user?.email_verified || currentService.service.active <= 0 || cdnPending}")
            input(type="file" hidden multiple directory webkitdirectory @change="e=>uploadFiles(e.target.files, getFileList)" ref="uploadFolderInp")
            .material-symbols-outlined.fill drive_folder_upload
            span &nbsp;&nbsp;Upload Folder

        .iconClick.square(:class="{'nonClickable': noSelection || fetching || !user?.email_verified || currentService.service.active <= 0 || cdnPending}" @click='deleteSelected=true')
            .material-symbols-outlined.fill delete
            span &nbsp;&nbsp;Delete Selected

        .iconClick.square(@click='openRefreshCdn=true' :class="{'nonClickable': fetching || !user?.email_verified || currentService.service.active <= 0 || cdnPending}")
            .material-symbols-outlined.fill refresh
            span &nbsp;&nbsp;Refresh CDN


    .hostingPart
        template(v-if="cdnPending")
            #loading.
                Refreshing CDN ... &nbsp;
                #[img.loading(src="@/assets/img/loading.png")]

        template(v-if="fetching")
            #loading.
                Loading ... &nbsp;
                #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
        
        Table(
            @dragover.stop.prevent="e=>{if(cdnPending) return; e.dataTransfer.dropEffect = 'copy'; dragHere = true;}"
            @dragleave.stop.prevent="dragHere = false;"
            @drop.stop.prevent="e => {dragHere = false; if(!cdnPending) onDrop(e, getFileList)}"
            :class="{'nonClickable' : cdnPending || fetching || !user?.email_verified || currentService.service.active <= 0 || currentSubdomain.status !== 'Active', 'dragHere' : dragHere}"
            resizable)
            template(v-slot:head)
                tr
                    th(style="width:1px;")
                        Checkbox(@click.stop v-model='checkedall' @change='checkall' :class='{nonClickable: !listDisplay.length}')
                        .resizer
                    th(style='width:320px;')
                        span(@click='toggleSort("name")')
                            | Filename
                            .material-symbols-outlined.fill(v-if='sortBy === "name"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}
                        .resizer

                    th(style='width:160px;')
                        span(@click='toggleSort("size")')
                            | Size
                            span.material-symbols-outlined.fill(v-if='sortBy === "size"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}
                        .resizer
                    th(style='width:220px;')
                        span(@click='toggleSort("upl")')
                            | Uploaded
                            span.material-symbols-outlined.fill(v-if='sortBy === "upl"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}

            template(v-slot:body)
                template(v-if='cdnPending || fetching')
                    tr(v-for="i in 10")
                        td(colspan="4")

                template(v-else-if='uploadProgress.name')
                    .progress( :style="{ width: uploadProgress.progress + '%', height: '3px', background: 'var(--main-color)', position: 'absolute'}")
                    tr.uploadState(style="position:relative")
                        td
                            .material-symbols-outlined.center.moving upload
                        td(colspan="3")
                            | Uploading: /{{ uploadProgress.name }}&nbsp;
                            b ({{ uploadCount[0] }} / {{ uploadCount[1] }})
                    tr(v-for="i in 9")
                        td(colspan="4")

                template(v-else-if="!listDisplay || listDisplay.length === 0")
                    tr
                        td(colspan="4") Drag and drop files here

                    tr(v-for="i in 9")
                        td(colspan="4")

                template(v-else)
                    tr(:class='{nsrow:currentDirectory}' @click='currentDirectory = currentDirectory.split("/").length === 1 ? "" : currentDirectory.split("/").slice(0, -1).join("/")')
                        td
                            .material-symbols-outlined.fill(v-if='currentDirectory') arrow_upward
                            template(v-if="cdnPending")
                                img.loading(src="@/assets/img/loading.png")
                        td(colspan="3")
                            template(v-if='currentDirectory')
                                .material-symbols-outlined.fill folder_open
                                | &nbsp;
                            | / {{ currentDirectory }}

                    tr.nsrow(v-for="(ns, i) in listDisplay" @click='()=>{ns.name[0] != "#" ? openFile(ns) : currentDirectory = setNewDir(ns) }')
                        td
                            Checkbox(@click.stop v-model='checked[ns.name]')

                        td.overflow(v-if='ns.name[0] == "#"')
                            span.material-symbols-outlined.fill(style='vertical-align: sub;') folder
                            | &nbsp;{{ ns.name.slice(1) }}
                        td.overflow(v-else) {{ ns.name }}
                        td.overflow {{ getFileSize(ns.size) }}
                        td.overflow {{ new Date(ns.upl).toLocaleString() }}

                    tr(v-for="i in (10 - listDisplay.length)")
                        td(colspan="4")

    br

    .tableMenu(style='display:block;text-align:center;')
        .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': fetching || currentPage <= 1 }")
            .material-symbols-outlined.bold chevron_left
            span Previous&nbsp;&nbsp;
        | &nbsp;&nbsp;
        .iconClick.square.arrow(@click="currentPage++;" :class="{'nonClickable': fetching || eof && currentPage >= maxPage || !listDisplay.length }")
            span &nbsp;&nbsp;Next
            .material-symbols-outlined.bold chevron_right

    br

    .dragPopup(:class="{'show' : dragHere}")
        .material-symbols-outlined(style='font-size:64px;') cloud_upload
        p Drop your files to upload

    Modal(:open="deleteSelected")
        h4(style='margin:.5em 0 0;') Delete Files

            hr

            div(style='font-size:.8rem;')
                p.
                    Delete {{ numberOfSelected }} file(s) from your hosting?
                    #[br]
                    This action cannot be undone.
            br

            div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
                template(v-if='modalPromise')
                    img.loading(src="@/assets/img/loading.png")
                template(v-else)
                    button.noLine.warning(@click="deleteSelected = false") Cancel
                    button.final.warning(@click="deleteFiles") Delete

    Modal(:open="removeHosting")
        h4(style='margin:.5em 0 0;') Remove Hosting

        hr

        div(style='font-size:.8rem;')
            p.
                Are you sure you want to remove hosting?
                #[br]
                This will remove all the files and release your subdomain address.
                #[br]
                This action cannot be undone.
        br

        div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
            template(v-if='modalPromise')
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.noLine.warning(@click="removeHosting = false") Cancel
                button.final.warning(@click="remove") Remove

    Modal(:open="openRemove404")
        h4(style='margin:.5em 0 0;') Remove 404

        hr

        div(style='font-size:.8rem;')
            p.
                Would you like to remove the 404 page?
                #[br]
                This will revert the 404 page to the default one.
        br

        div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
            template(v-if='modalPromise')
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.noLine.warning(@click="openRemove404 = false") Cancel
                button.final.warning(@click="remove404") Remove

    Modal(:open="openRefreshCdn")
        h4(style='margin:.5em 0 0;') Refresh CDN

        hr

        div(style='font-size:.8rem;')
            p.
                If you have overwritten files, you can refresh the CDN to apply the changes.
                #[br]
                While in process you will not be able to upload or delete files.
                This process will take a few minutes.
        br

        div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
            template(v-if='modalPromise')
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.noLine.warning(@click="openRefreshCdn = false") Cancel
                button.final.warning(@click="()=>{refreshCdn();openRefreshCdn=false;}") Refresh
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, nextTick } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { currentService } from '@/views/service/main';
import Code from '@/components/code.vue';
import Table from '@/components/table.vue';
import Modal from '@/components/modal.vue';
import Pager from '@/code/pager';
import { skapi, getFileSize, dateFormat } from '@/code/admin';
import { user } from '@/code/user';
import Checkbox from '@/components/checkbox.vue';
import { folders, uploadFiles, onDrop, currentDirectory, uploadCount, uploadProgress } from '@/views/service/hosting/file';

let dragHere = ref(false);
// fileinputs
let uploadFileInp = ref();
let uploadFolderInp = ref();
//

let domain = import.meta.env.VITE_DOMAIN;

let promiseRunning = ref(false);
let modalPromise = ref(false);
let sdInfo: Ref<{
    srvc?: string;
    subd?: string;
    ownr?: string;
    stat?: string;
    "404"?: string;
}> = ref({
    "404": '...'
})

let dirInfo: Ref<{
    cnt: number;
    size: number;
    upl: number;
}> = ref(null);

// register input
let subdomain = ref('');
let registerSubdomain = async () => {
    promiseRunning.value = true;
    try {
        await currentService.registerSubdomain({
            subdomain: subdomain.value, cb: (srvc) => {
                promiseRunning.value = false;
                getInfo();
            }
        });

    } catch (err: any) {
        promiseRunning.value = false;
        alert(err.message);
    }
}
//

// edit/change
let openRefreshCdn = ref(false);
let modifyMode = reactive({
    subdomain: false,
    page404: false
})
let updatingValue = reactive({
    subdomain: false,
    page404: false
});
let focus_subdomain = ref();

let inputSubdomain = '';
let editSubdomain = () => {
    inputSubdomain = currentSubdomain.value.subdomain.split('.').slice(0, -2).join('.');
    modifyMode.subdomain = true;
    nextTick(() => {
        focus_subdomain.value.focus();
    });
}

// modal
let focus_404 = ref();
let selected404File = ref(null);
let open404FileInp = async () => {
    modifyMode.page404 = true;
    await nextTick();
    focus_404.value.click();
}

let handle404file = (e: any) => {
    let file = e.target.files[0];
    let fileName = file.name;
    selected404File.value = fileName;
}
let progress404 = ref(0);
let change404 = async (e: any) => {
    updatingValue.page404 = true;

    try {
        let up = await currentService.uploadHostFiles(e, {
            progress: p => {
                progress404.value = Math.floor(p.progress);
            }
        })

        await currentService.set404({
            path: up.completed[0].name,
        });

        sdInfo.value = await currentService.getSubdomainInfo();

        modifyMode.page404 = false;
        updatingValue.page404 = false;
        progress404.value = 0;

    } catch (err: any) {
        updatingValue.page404 = false;
        alert(err.message);
    }
}

let openRemove404 = ref(false);
let remove404 = async () => {
    modalPromise.value = true;

    try {
        await currentService.set404({
            path: null,
        });

        delete sdInfo.value['404'];
        openRemove404.value = false;
        selected404File = null;
    }
    catch (err: any) {
        alert(err.message);
    }
    finally {
        modalPromise.value = false;
    }
}

let removeHosting = ref(false);
let remove = () => {
    modalPromise.value = true;
    currentService.registerSubdomain({
        cb: () => null
    }).then(() => {
        removeHosting.value = false;
        modalPromise.value = false;
    }).catch(err => {
        modalPromise.value = false;
        alert(err.message);
    });
}

let changeSubdomain = async () => {
    // when domains are changed, refreshCDN kicks in
    if (currentService.service.subdomain === inputSubdomain) {
        modifyMode.subdomain = false;
        return;
    }

    updatingValue.subdomain = true;

    try {
        await currentService.registerSubdomain({
            subdomain: inputSubdomain,
            cb: getInfo
        });

        modifyMode.subdomain = false;
        updatingValue.subdomain = false;

        cdnPending.value = true;
        currentService.refreshCDN({
            checkStatus: res => {
                cdnPending.value = false;
            }
        });
    } catch (err: any) {
        updatingValue.subdomain = false;
        alert(err.message);
    }
}

//

let currentSubdomain = computed(() => {
    let sd = currentService.service.subdomain;
    let status = '';
    let subd = '';
    if (sd && sd[0] === '*' || sd[0] === '+') {
        subd = sd.slice(1) + '.skapi.com';
        status = sd[0] === '*' ? 'Removing' : 'Pending';
    }
    else {
        subd = sd + '.' + domain;
        status = 'Active';
    }
    return {
        subdomain: subd,
        status: status
    };
});

let listDisplay = ref([]);
let sortBy = ref('name');
let ascending = ref(true);
let currentPage = ref(1);
let endOfList: any = reactive({});
let maxPage = ref(0);
let fetching = ref(false);

// checks
let checked: any = ref({});
let checkedall = ref(false);
let checkall = () => {
    for (let i in listDisplay.value) {
        checked.value[listDisplay.value[i].name] = checkedall.value;
    }
}
let noSelection = computed(() => {
    for (let i in checked.value) {
        if (checked.value[i]) {
            return false;
        }
    }
    return true;
});

let deleteSelected = ref(false);

let deleteFiles = async () => {
    modalPromise.value = true;
    let toDel = [];
    for (let i in checked.value) {
        if (checked.value[i]) {
            toDel.push((() => {
                for (let v of listDisplay.value) {
                    if (v.name === i) {
                        return v
                    }
                }
            })());
        }
    }

    try {
        let currDir = currentDirectory.value || '!';
        let pager = folders[currDir].pager;
        await currentService.deleteHostFiles({
            paths: toDel.map(v => v.path + '/' + (() => {
                let n = v.name;
                if (n[0] == '#') {
                    return n.slice(1) + '/';
                }
                return n;
            })())
        });

        for (let v of toDel) {
            await pager.deleteItem(v.name);
        }

        getFileList().then(() => {
            // when empty, go back a page
            if (!listDisplay.value.length && currentPage.value > 1) {
                currentPage.value--;
            }
        });

        deleteSelected.value = false;
        checkedall.value = false;
    } catch (err: any) {
        alert(err.message);
    } finally {
        modalPromise.value = false;
    }
}

let numberOfSelected = computed(() => {
    let n = 0;
    for (let i in checked.value) {
        if (checked.value[i]) {
            n++;
        }
    }
    return n;
});

//

function getInfo() {
    let process = () => {
        currentService.getSubdomainInfo().then(s => {
            sdInfo.value = s
            if (s?.invid && s.invid[0] === '@') {
                cdnPending.value = true;
                currentService.refreshCDN({
                    checkStatus: res => {
                        cdnPending.value = false;
                        currentService.getDirInfo().then(dir => {
                            fetching.value = false;
                            getFileList(true);
                            dirInfo.value = dir;
                        });
                    }
                })
            }
            else {
                currentService.getDirInfo().then(dir => {
                    fetching.value = false;
                    getFileList();
                    dirInfo.value = dir;
                });
            }
        });
    }

    let _subd = currentService.service?.subdomain || '';
    if (_subd) {
        fetching.value = true;
        if (_subd[0] === '*' || _subd[0] === '+') {
            currentService.pendingSubdomain(() => {
                // + pending
                // * removing
                subdomain.value = currentService.service.subdomain;
                process();
            });
        }
        else if (!sdInfo.value.srvc) {
            process();
        }
        else {
            fetching.value = false;
        }
    }
    else {
        fetching.value = false;
    }
}

getInfo();

let setNewDir = (ns: any) => {
    let path = ns.path;
    path = path.split('/');
    if (path.length > 1) {
        return path.slice(1).join('/') + '/' + ns.name.slice(1);
    }

    return ns.name.slice(1);
}

let eof = computed(() => {
    let currDir = currentDirectory.value || '!';
    return endOfList[currDir]
});

watch(currentDirectory, () => {
    getFileList();
});

async function getFileList(refresh = false) {
    if (!refresh && fetching.value) return;

    let resultsPerPage = 10;
    let currDir = currentDirectory.value || '!';

    fetching.value = true;

    let hasPage = folders?.[currDir];

    if (!hasPage || refresh) {
        maxPage.value = 0;
        currentPage.value = 1;
        endOfList[currDir] = false;
        folders[currDir] = {
            pager: await Pager.init({
                id: 'name',
                sortBy: sortBy.value,
                order: ascending.value ? 'asc' : 'desc',
                resultsPerPage,
            })
        }
    }

    let pager = folders[currDir].pager;

    if (refresh || !endOfList[currDir] && currentPage.value > maxPage.value) {
        try {
            let l = await currentService.listHostDirectory({ dir: currentDirectory.value }, !(refresh || maxPage.value == 0))
            if (l.list.length > 0) {
                await pager.insertItems(l.list);
                let fl = pager.getPage(currentPage.value);
                listDisplay.value = fl.list;
                maxPage.value = fl.maxPage;
                endOfList[currDir] = l.endOfList;
            }
            else {
                listDisplay.value = [];
                endOfList[currDir] = true;
            }
            maxPage.value = 1;
        } catch (err: any) {
            alert(err.message);
        } finally {
            fetching.value = false;
        }
    }
    else if (endOfList[currDir] || maxPage.value && currentPage.value <= maxPage.value) {
        let fl = pager.getPage(currentPage.value);
        listDisplay.value = fl.list;
        maxPage.value = fl.maxPage;
    }

    let chk: any = {};
    for (let lk in listDisplay.value) {
        chk[listDisplay.value[lk].name] = false;
    }

    checked.value = chk;
    fetching.value = false;
}

function openFile(ns: any) {
    let path = ns.path;
    let url;
    if (path.split('/').length > 1) {
        url = `https://${currentSubdomain.value.subdomain}/${path.split('/').slice(1).join('/')}/${ns.name}`;
    }
    else {
        url = `https://${currentSubdomain.value.subdomain}/${ns.name}`;
    }

    window.open(url, '_blank');
}

let resetIndex = async () => {
    let currDir = currentDirectory.value || '!';
    await folders[currDir].pager.resetIndex({
        sortBy: sortBy.value,
        order: ascending.value ? 'asc' : 'desc',
    });
    if (currentPage.value !== 1) {
        currentPage.value = 1;
    }
    else {
        getFileList();
    }
}

let toggleSort = (search: any) => {
    if (fetching.value || !listDisplay.value.length) {
        // if no list or fetching no nothing
        return;
    }

    if (sortBy.value === search) {
        ascending.value = !ascending.value;
    }
    else {
        sortBy.value = search;
    }
}
let cdnPending = ref(false);

let refreshCdn = async () => {
    cdnPending.value = true;
    await currentService.refreshCDN();
    currentService.refreshCDN({
        checkStatus: res => {
            cdnPending.value = false;
        }
    });
}
// call getPage when currentPage changes
watch(currentPage, (n, o) => {
    if (n !== o && n > 0 && (n <= maxPage.value || n > maxPage.value && !endOfList.value)) {
        // if new value is different from old value
        // if new value is within maxPage
        // if new value is greater than maxPage but not end of list

        getFileList();
    }
    else {
        currentPage.value = o; // revert back to old value
    }
});

// initialize the pager when searchFor changes
watch(sortBy, (n) => {
    if (!fetching.value) {
        let currDir = currentDirectory.value || '!';
        if (endOfList[currDir]) {
            resetIndex();
        }
        else {
            getFileList(true);
        }
    }
});

watch(ascending, () => {
    if (!fetching.value) {
        let currDir = currentDirectory.value || '!';
        if (endOfList[currDir]) {
            resetIndex();
        }
        else {
            getFileList(true);
        }
    }
});
</script>

<style lang="less" scoped>
form.register {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: flex-end;

    .subdomain {
        display: inline-block;
        position: relative;
        height: 44px;

        &::after {
            content: ".skapi.com";
            position: absolute;
            right: 10px;
            top: 12px;
            color: #999;
            font-size: 0.8rem;
            font-weight: 400;
            pointer-events: none;
            user-select: none;
            z-index: 1;
        }

        input {
            padding-right: 88px;
        }

        flex-grow: 1;
    }

    button {
        flex-shrink: 0;
    }
}


// table style below

tbody {
    tr.nsrow {
        @media (pointer: fine) {

            // only for mouse pointer devices
            &:not(.active):hover {
                background-color: rgba(41, 63, 230, 0.05);
                // cursor: pointer;
            }
        }

        &.active {
            background-color: rgba(41, 63, 230, 0.10);
        }

        &:hover {
            .hide {
                display: block;
            }
        }

        .hide {
            display: none;
        }
    }
}

thead {
    th {
        &>span {
            @media (pointer: fine) {

                // only for mouse pointer devices
                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
        }
    }
}

.tableMenu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &>* {
        margin-bottom: 8px;
    }
}

.hostingPart {
    position: relative;
    overflow: hidden;
}

#loading {
    position: absolute;
    top: 60px;
    left: 20px;
    height: 60px;
    z-index: 2;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 0.8rem;
}

.dragHere {
    outline: 4px solid var(--main-color);
    border-radius: 4px;
    opacity: 0.3;
}

.dragPopup {
    position: fixed;
    left: 50%;
    bottom: 20px;
    max-width: 300px;
    width: 100%;
    padding: 10px 20px;
    margin: 8px;
    border-radius: 8px;
    transform: translate(-50%, 300px);
    transition: all .15s;
    background-color: var(--main-color);
    color: #fff;

    &.show {
        transform: translate(-50%, 0);
    }
}

.moving {
    color: var(--main-color);
    font-size: 24px;
    animation: motion 0.3s linear 1s infinite alternate;
}

@keyframes motion {
    0% {
        margin-top: -5px;
    }

    100% {
        margin-top: 0px;
    }
}

@media (pointer: coarse) {
    .hide {
        display: block !important;
    }
}
</style>