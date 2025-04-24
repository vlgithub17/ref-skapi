<template lang="pug">
.infoBox(v-if='!currentService.service.subdomain' style='max-width:600px;margin:3rem auto;' :class='{nonClickable: email_is_unverified_or_service_is_disabled}')
    .infoTitle File Hosting 

    hr

    .error(v-if='!user?.email_verified')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        router-link(to="/account-setting") Please verify your email address to modify settings.
        
    .error(v-else-if='currentService.service.active == 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently disabled.

    .error(v-else-if='currentService.service.active < 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently suspended.

    p.
        File hosting service let you host files and static websites.
        #[br]
        To host your public files, please register a subdomain.

    p The subdomain can only be #[span.wordset alphanumeric and hyphen,] should be at least #[span.wordset 6 characters] minimum and #[span.wordset max 32 characters.]
    
    br

    form.register(@submit.prevent='registerSubdomain')
        .subdomain
            input.big(v-model='subdomain' pattern='^[a-z\\d](?:[a-z\\d\\-]{0,61}[a-z\\d])?$' minlength="6" maxlength="32" :disabled="registerSubdomainRunning" placeholder="your-subdomain" required)
        button.final(style='min-width: 124px;' :disabled='registerSubdomainRunning' :class='{nonClickable: registerSubdomainRunning}')
            template(v-if="registerSubdomainRunning")
                .loader(style="--loader-color:white; --loader-size:12px")
            template(v-else)
                | Register

template(v-else)
    .infoBox(:class='{nonClickable: email_is_unverified_or_service_is_disabled || !subdomainReady}')
        //- .infoTitle File Hosting&nbsp;&nbsp;
        h2 File Hosting

        hr

        .error(v-if='!user?.email_verified')
            //- .material-symbols-outlined.notranslate.fill warning
            svg
                use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
            router-link(to="/account-setting") Please verify your email address to modify settings.
            br
            br  
        .error(v-else-if='currentService.service.active == 0')
            //- .material-symbols-outlined.notranslate.fill warning
            svg
                use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
            span This service is currently disabled.
            br
            br
        .error(v-else-if='currentService.service.active < 0')
            //- .material-symbols-outlined.notranslate.fill warning
            svg
                use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
            span This service is currently suspended.
            br
            br

        .infoValue
            .smallTitle Storage in-use
            .smallValue {{ currentService.dirInfo?.size ? getFileSize(currentService.dirInfo?.size || 0) : '...' }}

        .infoValue
            .smallTitle URL
            .smallValue(:class='{nonClickable: isPending}')
                template(v-if="modifyMode.subdomain")
                    form.register.editValue(@submit.prevent="changeSubdomain")
                        .subdomain
                            input#modifySubdomain.big(ref="focus_subdomain" :disabled="updatingValue.subdomain || null" type="text"  pattern='^[a-z\\d](?:[a-z\\d\\-]{0,61}[a-z\\d])?$' minlength="6" maxlength="32" placeholder="your-subdomain" required :value='inputSubdomain' @input="(e) => {e.target.setCustomValidity(''); inputSubdomain = e.target.value;}")
                        template(v-if="updatingValue.subdomain")
                            .loader(style="--loader-color:blue; --loader-size:12px")
                        //- label.material-symbols-outlined.notranslate.save(v-else) done
                        label(v-else)
                            svg.svgIcon.clickable.save()
                                use(xlink:href="@/assets/img/material-icon.svg#icon-check")
                            input(type="submit" hidden)
                        //- span.material-symbols-outlined.notranslate.cancel(@click="modifyMode.subdomain = false;") close
                        svg.svgIcon.black.clickable.cancel(@click="modifyMode.subdomain = false;")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-close")

                div(v-else)
                    .smallValue
                        | {{ hostUrl }}&nbsp;
                        span.editHandle(@click="editSubdomain") [EDIT]
                    .infoValue

        .infoValue
            .smallTitle 404 Page
            .smallValue(:class='{nonClickable: email_is_unverified_or_service_is_disabled || isPending}')
                template(v-if="modifyMode.page404")
                    form.register.editValue(@submit.prevent="change404" style='flex-grow: 0')
                        input(ref="focus_404" hidden type="file" name='file' required @change="handle404file" :disabled='updatingValue.page404' accept="text/html")
                        .input.editHandle(style='font-size: .8rem;margin-right: 8px;' @click='focus_404.click()' :class='{nonClickable:updatingValue.page404}') {{ selected404File || sdInfo?.['404'] || 'Click here to select a file' }}
                        template(v-if="updatingValue.page404")
                            pre(style='margin:0;font-size: .8rem;font-weight:normal' v-if='progress404 < 100') {{ progress404 }}%
                            pre(style='margin:0;font-size: .8rem;font-weight:normal' v-else) Updating...
                        //- label.material-symbols-outlined.notranslate.save.fill(v-else :class="{'nonClickable' : !selected404File}") done
                        label(v-else :class="{'nonClickable' : !selected404File}")
                            svg.svgIcon.clickable.save()
                                use(xlink:href="@/assets/img/material-icon.svg#icon-check")
                            input(type="submit" hidden)
                        //- span.material-symbols-outlined.notranslate.cancel(v-if='!updatingValue.page404' @click="modifyMode.page404 = false;selected404File=null;") close
                        svg.svgIcon.black.clickable.cancel(v-if='!updatingValue.page404' @click="modifyMode.page404 = false;selected404File=null;")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-close")

                div(v-else)
                    .smallValue.editValue
                        span(:class='{nonClickable:isPending}') {{ sdInfo?.['404'] || '-' }}
                        span.editHandle(:class='{nonClickable:isPending}' @click="open404FileInp") {{ sdInfo?.['404'] ? '[CHANGE]' : '[UPLOAD]'}}
                        span.editHandle(v-if='!updatingValue.page404 && sdInfo?.["404"] && sdInfo?.["404"] !== "..."' @click="openRemove404=true" style="color:var(--caution-color)") [REMOVE]

        div(style="text-align:right")
            .iconClick.square(@click="removeHosting = true" style='color:var(--caution-color);font-size:0.66rem;')
                //- .material-symbols-outlined.notranslate.fill(style='font-size:24px;') delete
                svg.svgIcon(style="fill: var(--caution-color)")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")
                span &nbsp;Remove Hosting
    br

    .tableMenu

        .iconClick.square(@click='uploadFileInp.click()' :class="{'nonClickable' : email_is_unverified_or_service_is_disabled || isPending || fetching}")
            input(type="file" hidden multiple @change="e=>uploadFiles(e.target.files, getFileList)" ref="uploadFileInp")
            //- .material-symbols-outlined.notranslate.fill upload_file
            svg.svgIcon
                use(xlink:href="@/assets/img/material-icon.svg#icon-upload-file-fill")
            span &nbsp;&nbsp;Upload Files

        .iconClick.square(@click='uploadFolderInp.click()' :class="{'nonClickable' : email_is_unverified_or_service_is_disabled || isPending || fetching}")
            input(type="file" hidden multiple directory webkitdirectory @change="e=>uploadFiles(e.target.files, getFileList)" ref="uploadFolderInp")
            //- .material-symbols-outlined.notranslate.fill drive_folder_upload
            svg.svgIcon
                use(xlink:href="@/assets/img/material-icon.svg#icon-drive-folder-upload-fill")
            span &nbsp;&nbsp;Upload Folder

        .iconClick.square(:class="{'nonClickable' : email_is_unverified_or_service_is_disabled || isPending || fetching || !Object.keys(checked).length}" @click='deleteSelected=true')
            //- .material-symbols-outlined.notranslate.fill delete
            svg.svgIcon
                use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")
            span &nbsp;&nbsp;Delete Selected

        // .iconClick.square(@click='openRefreshCdn=true' :class="{'nonClickable' : email_is_unverified_or_service_is_disabled || isPending || fetching}")
            .material-symbols-outlined.notranslate.fill(:class='{loading:currentService.pending.cdn}') refresh
            span &nbsp;&nbsp;Refresh CDN

    .hostingPart
        #loading
            template(v-if="fetching")
                .loader(style="--loader-color:black; --loader-size:12px")
                | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fetching ...

            template(v-else-if='!subdomainReady')
                .loader(style="--loader-color:black; --loader-size:12px")
                | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subdomain change in process ...
            
            template(v-else-if='currentService.pending.cdn')
                .loader(style="--loader-color:black; --loader-size:12px")
                | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CDN Refresh in process... 

        Table(
            @dragover.stop.prevent="e=>{if(isPending) return; e.dataTransfer.dropEffect = 'copy'; dragHere = true;}"
            @dragleave.stop.prevent="dragHere = false;"
            @drop.stop.prevent="e => {dragHere = false; if(!isPending) onDrop(e, getFileList)}"
            :class="{'nonClickable' : fetching || isPending || email_is_unverified_or_service_is_disabled, 'dragHere' : dragHere}"
            resizable)
            template(v-slot:head)
                tr
                    th.fixed(style="width:60px;")
                        Checkbox(@click.stop  :modelValue="!!Object.keys(checked).length" @update:modelValue="(value) => { if (value) listDisplay.forEach((d) => (checked[d.name] = d)); else checked = {}; }" :class='{nonClickable: !listDisplay.length}')
                        .resizer.fixed
                    th(style='width:320px;')
                        span(@click='toggleSort("name")')
                            | Filename
                            svg.svgIcon.black(v-if='sortBy === "name" && ascending')
                                use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down")
                            svg.svgIcon.black(v-if='sortBy === "name" && !ascending')
                                use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-up")
                        .resizer

                    th(style='width:160px;')
                        span(@click='toggleSort("size")')
                            | Size
                            svg.svgIcon.black(v-if='sortBy === "size" && ascending')
                                use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down")
                            svg.svgIcon.black(v-if='sortBy === "size" && !ascending')
                                use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-up")
                        .resizer
                    th(style='width:220px;')
                        span(@click='toggleSort("upl")')
                            | Uploaded
                            svg.svgIcon.black(v-if='sortBy === "upl" && ascending')
                                use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down")
                            svg.svgIcon.black(v-if='sortBy === "upl" && !ascending')
                                use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-up")

            template(v-slot:body)
                template(v-if="fetching || isPending")
                    tr
                        td(colspan="4")

                template(v-else-if='uploadProgress.name')
                    .progress( :style="{ width: uploadProgress.progress + '%', height: '3px', background: 'var(--main-color)', position: 'absolute'}")
                    tr.uploadState(style="position:relative")
                        td
                            svg.svgIcon.moving()
                                use(xlink:href="@/assets/img/material-icon.svg#icon-upload")
                        td(colspan="3")
                            | Uploading: /{{ uploadProgress.name }}&nbsp;
                            b ({{ uploadCount[0] }} / {{ uploadCount[1] }})

                template(v-else-if="!listDisplay || listDisplay.length === 0")
                    tr
                        td
                            svg.svgIcon.black()
                                use(xlink:href="@/assets/img/material-icon.svg#icon-upload")

                        td(colspan="3") Drag and drop files here

                template(v-else)
                    tr(:class='{hoverRow:currentDirectory}' @click='currentDirectory = currentDirectory.split("/").length === 1 ? "" : currentDirectory.split("/").slice(0, -1).join("/")')
                        td
                            svg.svgIcon.black()
                                use(xlink:href="@/assets/img/material-icon.svg#icon-folder-open-fill")

                        td(colspan="3")
                            | {{hostUrl}}/{{ currentDirectory ? currentDirectory + '/' : '' }}
                
                tr.hoverRow(v-for="(ns, i) in listDisplay" @click='()=>{ns.name[0] != "#" ? openFile(ns) : currentDirectory = setNewDir(ns) }')
                    td
                        Checkbox(@click.stop :modelValue="!!checked?.[ns?.name]" @update:modelValue="(value) => { if (value) checked[ns?.name] = value; else delete checked[ns?.name]; }")

                    td.overflow(v-if='ns.name[0] == "#"')
                        svg.svgIcon.black(style='height: 22px; width: 22px; vertical-align: sub;')
                            use(xlink:href="@/assets/img/material-icon.svg#icon-folder-fill")
                        | &nbsp;{{ ns.name.slice(1) }}
                    td.overflow(v-else) {{ ns.name }}
                    td.overflow {{ getFileSize(ns.size) }}
                    td.overflow {{ new Date(ns.upl).toLocaleString() }}

                tr(v-for="i in (10 - listDisplay.length)")
                    td(colspan="4")

    br

    .tableMenu(style='display:block;text-align:center;')
        .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': fetching || currentPage <= 1 }")
            //- .material-symbols-outlined.notranslate.bold chevron_left
            svg.svgIcon(style="width: 26px; height: 26px")
                use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-left")
            span Previous&nbsp;&nbsp;
        | &nbsp;&nbsp;
        .iconClick.square.arrow(@click="currentPage++;" :class="{'nonClickable': fetching || currentPage >= maxPage || !listDisplay.length }")
            span &nbsp;&nbsp;Next
            //- .material-symbols-outlined.notranslate.bold chevron_right
            svg.svgIcon(style="width: 26px; height: 26px")
                use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-right")

    .dragPopup(:class="{'show' : dragHere}")
        //- .material-symbols-outlined.notranslate(style='font-size:64px;') cloud_upload
        svg.svgIcon(style="width: 64px; height: 64px; fill: white")
            use(xlink:href="@/assets/img/material-icon.svg#icon-cloud-upload")
        p Drop your files to upload

    Modal(:open="deleteSelected" @close="deleteSelected=false")
        h4(style='margin:.5em 0 0;') Delete Files

            hr

            div(style='font-size:.8rem;')
                p.
                    Delete {{ Object.keys(checked).length }} file(s) from your hosting?
                    #[br]
                    This action cannot be undone.
            br

            div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
                div(v-if="modalPromise" style="width:100%; text-align:center")
                    .loader(style="--loader-color:blue; --loader-size:12px")
                template(v-else)
                    button.noLine.warning(@click="deleteSelected = false") Cancel
                    button.final.warning(@click="deleteFiles") Delete

    Modal(:open="removeHosting" @close="removeHosting=false")
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
            div(v-if="modalPromise" style="width:100%; text-align:center")
                .loader(style="--loader-color:blue; --loader-size:12px")
            template(v-else)
                button.noLine.warning(@click="removeHosting = false") Cancel
                button.final.warning(@click="remove") Remove

    Modal(:open="openRemove404" @close="openRemove404=false")
        h4(style='margin:.5em 0 0;') Remove 404

        hr

        div(style='font-size:.8rem;')
            p.
                Would you like to remove the 404 page?
                #[br]
                This will revert the 404 page to the default one.
        br

        div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
            div(v-if="modalPromise" style="width:100%; text-align:center")
                .loader(style="--loader-color:blue; --loader-size:12px")
            template(v-else)
                button.noLine.warning(@click="openRemove404 = false") Cancel
                button.final.warning(@click="remove404") Remove

    // Modal(:open="openRefreshCdn" @close="openRefreshCdn=false")
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
            div(v-if="modalPromise" style="width:100%; text-align:center")
                .loader(style="--loader-color:blue; --loader-size:12px")
            template(v-else)
                button.noLine.warning(@click="openRefreshCdn = false") Cancel
                button.final.warning(@click="()=>{currentService.refreshCDN(); openRefreshCdn=false;}") Refresh
</template>

<script setup lang="ts">
    import { reactive, ref, computed, watch, nextTick } from 'vue';
    import type { ComputedRef, Ref } from 'vue';
    import { currentService } from '@/views/service/main';
    import Code from '@/components/code.vue';
    import Table from '@/components/table.vue';
    import Modal from '@/components/modal.vue';
    import Pager from '@/code/pager';
    import { getFileSize } from '@/code/admin';
    import { skapi } from '@/main';
    import { user } from '@/code/user';
    import Checkbox from '@/components/checkbox.vue';
    import { serviceFolders, uploadFiles, onDrop, currentDirectory, uploadCount, uploadProgress } from '@/views/service/hosting/file';

    let folders = {}; // cache folders

    let email_is_unverified_or_service_is_disabled = computed(() => !user?.email_verified || currentService.service.active <= 0);

    let isPending = computed(() => currentService.pending.subdomain || currentService.pending.cdn || !subdomainReady.value);
    let sdInfo = computed(() => currentService.subdInfo);

    let dragHere = ref(false);
    // fileinputs
    let uploadFileInp = ref();
    let uploadFolderInp = ref();
    let domain = import.meta.env.VITE_DOMAIN;

    let registerSubdomainRunning = ref(false);
    let modalPromise = ref(false);

    let subdomain = ref(''); // register input value. not the actual subdomain
    let registerSubdomain = async () => {
        registerSubdomainRunning.value = true;
        try {
            await currentService.registerSubdomain({
                subdomain: subdomain.value, cb: (srvc) => {
                    registerSubdomainRunning.value = false;
                    // getInfo();
                }
            });

        } catch (err: any) {
            registerSubdomainRunning.value = false;
            alert(err.message);
        }
    }

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
        inputSubdomain = hostUrl.value.split('.').slice(0, -2).join('.');
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

            // get current 13 digit timestamp
            let pager = folders['!'].pager;

            await pager.editItem({
                name: up.completed[0].name,
                size: up.completed[0].size,
                upl: Date.now(),
            });

            getFileList();

            await currentService.set404({
                path: up.completed[0].name,
            });

            currentService.subdInfo['404'] = up.completed[0].name;

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

            delete currentService.subdInfo['404'];
            openRemove404.value = false;
            selected404File.value = null;
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
        currentService.registerSubdomain()
            .then(() => {
                removeHosting.value = false;
                modalPromise.value = false;
            }).catch(err => {
                modalPromise.value = false;
                alert(err.message);
            });
    }

    let changeSubdomain = async () => {
        if (currentService.service.subdomain === inputSubdomain) {
            modifyMode.subdomain = false;
            return;
        }

        if (inputSubdomain.charAt(0) == '-' && inputSubdomain.charAt(inputSubdomain.length - 1) == '-') {
            alert("Subdomains cannot start or end with a hyphen.");
            return;
        }

        if (/--/.test(inputSubdomain)) {
            alert('Hyphens cannot be used consecutively.');
            return;
        }

        updatingValue.subdomain = true;

        try {
            await currentService.registerSubdomain({
                subdomain: inputSubdomain
            });
        } catch (err: any) {
            alert(err?.message || err.toString());
            throw err;
        } finally {
            modifyMode.subdomain = false;
            updatingValue.subdomain = false;
        }
    }

    let retriveCachedFolders = () => {
        let sd = currentService.service.subdomain;
        if (!sd) {
            return '';
        }

        let subd = '';
        if (sd && sd[0] === '*' || sd[0] === '+') {
            subd = sd.slice(1) + '.' + domain;
        }
        else {
            subd = sd + '.' + domain;
        }

        if (serviceFolders?.[sd] && Object.keys(serviceFolders[sd]).length) {
            folders = serviceFolders[sd];
        }
        else {
            serviceFolders[sd] = folders;
        }

        return subd
    }

    let hostUrl = computed(retriveCachedFolders);

    retriveCachedFolders();

    let listDisplay = ref([]);
    let sortBy = ref('name');
    let ascending = ref(true);
    let currentPage = ref(1);
    let endOfList: any = reactive({});
    let maxPage = ref(0);
    let fetching = ref(true); // init value should be true

    // checks
    let checked: any = ref({});
    // let checkedall = ref(false);
    // let checkall = () => {
    //     for (let i in listDisplay.value) {
    //         checked.value[listDisplay.value[i].name] = checkedall.value;
    //     }
    // }
    // let noSelection = computed(() => {
    //     for (let i in checked.value) {
    //         if (checked.value[i]) {
    //             return false;
    //         }
    //     }
    //     return true;
    // });

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
            checked.value = {};
            // checkedall.value = false;
        } catch (err: any) {
            alert(err.message);
        } finally {
            modalPromise.value = false;
        }
    }

    // let numberOfSelected = computed(() => {
    //     let n = 0;
    //     for (let i in checked.value) {
    //         if (checked.value[i]) {
    //             n++;
    //         }
    //     }
    //     return n;
    // });

    let subdomainReady = computed(() => {
        let sd = currentService.service.subdomain;
        if (!sd) {
            return 'no-subdomain';
        }
        return currentService.subdInfo.stat && currentService.subdInfo.stat === 'active' || currentService.subdInfo.stat === 'tracked';
    });

    if (currentService.dirInfo.path) {
        fetching.value = false;
    }

    watch(() => currentService.dirInfo.path, (n, o) => {
        if (n) {
            getFileList('conditional').then(() => {
                fetching.value = false;
            });
        }
    },
        {
            immediate: true
        });

    watch(subdomainReady,
        (n, o) => {
            if (n) {
                if (n !== 'no-subdomain') {
                    // currentDirectory.value = "";
                    fetching.value = true;
                    currentService.getDirInfo();
                }
            }
        },
        {
            immediate: true
        }
    );

    let setNewDir = (ns: any) => {
        let path = ns.path;
        path = path.split('/');
        if (path.length > 1) {
            return path.slice(1).join('/') + '/' + ns.name.slice(1);
        }

        return ns.name.slice(1);
    }

    watch(currentDirectory, (n) => {
        getFileList();
    });

    async function getFileList(refresh: string | boolean = false) {
        if (!refresh && fetching.value) return;

        let resultsPerPage = 10;
        fetching.value = true;

        let currDir = currentDirectory.value || '!';
        let hasPage = folders?.[currDir]?.pager;

        let pager = null;

        if (hasPage) {
            pager = folders[currDir].pager;
            maxPage.value = Math.ceil(pager.map.length / pager.resultsPerPage);
        }

        if (!hasPage || refresh && refresh !== 'conditional') {
            folders[currDir] = {
                pager: await Pager.init({
                    id: 'name',
                    sortBy: sortBy.value,
                    order: ascending.value ? 'asc' : 'desc',
                    resultsPerPage,
                })
            }
            maxPage.value = 0;
            currentPage.value = 1;
            endOfList[currDir] = false;
        }

        pager = folders[currDir].pager;

        if (refresh && refresh !== 'conditional') {
            checked.value = {};
        }

        if (refresh && refresh !== 'conditional' || !endOfList[currDir] && currentPage.value > maxPage.value) {
            try {
                let l = await currentService.listHostDirectory({ dir: currentDirectory.value }, !(refresh || maxPage.value == 0));
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
            fetching.value = false;
        }

        // let chk: any = {};
        // for (let lk in listDisplay.value) {
        //     chk[listDisplay.value[lk].name] = false;
        // }

        // checked.value = chk;
    }

    function openFile(ns: any) {
        let path = ns.path;
        let url;
        if (path.split('/').length > 1) {
            url = `https://${hostUrl.value}/${path.split('/').slice(1).join('/')}/${ns.name}`;
        }
        else {
            url = `https://${hostUrl.value}/${ns.name}`;
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

    // call getPage when currentPage changes
    watch(currentPage, (n, o) => {
        if (n !== o && n > 0 && (n <= maxPage.value || n > maxPage.value && !endOfList[currentDirectory.value || '!'])) {
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
    tbody {
        tr:first-child {
            background-color: rgba(0, 0, 255, 0.02);

            &::before {
                background-color: rgba(0, 0, 255, 0.02);
            }
        }

        tr {
            cursor: default;
        }
    }

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
                line-height: 44px;
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

        svg:hover {
            border-radius: 50%;
            background-color: rgba(41, 63, 230, 0.1);
        }

        button {
            flex-shrink: 0;
        }
    }

    // table style below
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
        border-radius: 6px;
        transform: translate(-50%, 300px);
        transition: all .15s;
        background-color: var(--main-color);
        color: #fff;
        user-select: none;
        pointer-events: none;

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
            margin-top: -10px;
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