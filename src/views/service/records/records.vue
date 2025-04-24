<template lang="pug">
section.infoBox
    .titleHead
        h2 Database
            
        span.moreInfo(@click="showGuide = !showGuide" @mouseover="hovering = true" @mouseleave="hovering = false")
            span More Info&nbsp;
            template(v-if="showGuide")
                svg(v-if="hovering" style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up-fill")
                svg(v-else style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up")
            template(v-else) 
                svg(v-if="hovering" style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down-fill")
                svg(v-else style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down")

    template(v-if="showGuide")
        Guide

    hr

    .error(v-if='!user?.email_verified')
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        router-link(to="/account-setting") Please verify your email address to modify settings.
        
    .error(v-else-if='currentService.service.active == 0')
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently disabled.

    .error(v-else-if='currentService.service.active < 0')
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently suspended.

SearchBox(:callSearch='callSearch')

hr

.tableMenu
    .iconClick.square(@click.stop="(e)=>{showDropDown(e)}")
        svg.svgIcon()
            use(xlink:href="@/assets/img/material-icon.svg#icon-checklist-rtl")
        span &nbsp;&nbsp;Show Columns
        .moreVert(@click.stop style="--moreVert-left:0;display:none;font-weight:normal; color:black")
            .inner
                Checkbox(v-model="filterOptions.table" style="display:flex;") Table
                Checkbox(v-model="filterOptions.record_id" style="display:flex") Record ID
                Checkbox(v-model="filterOptions.user_id" style="display:flex") User ID 
                Checkbox(v-model="filterOptions.reference" style="display:flex") Reference
                Checkbox(v-model="filterOptions.index" style="display:flex") Index/Value
                Checkbox(v-model="filterOptions.tag" style="display:flex") Tag
                Checkbox(v-model="filterOptions.files" style="display:flex") Files
                Checkbox(v-model="filterOptions.data" style="display:flex") Data
                Checkbox(v-model="filterOptions.updated" style="display:flex") Updated
                Checkbox(v-model="filterOptions.referenced" style="display:flex") Referenced
                Checkbox(v-model="filterOptions.ip" style="display:flex") IP

    .iconClick.square(@click="()=>{ !user.email_verified ? false : selectedRecord = null; showDetail=true; }" :class="{'nonClickable' : showDetail || uploading || fetching || !user?.email_verified || currentService.service.active <= 0}")
        svg.svgIcon
            use(xlink:href="@/assets/img/material-icon.svg#icon-add-circle-fill")
        span &nbsp;&nbsp;Create Record

    .iconClick.square(@click="openDeleteRecords=true" :class="{'nonClickable': !Object.keys(checked).length || fetching || !user?.email_verified || currentService.service.active <= 0}" )
        svg.svgIcon
            use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")
        span &nbsp;&nbsp;Delete Selected

    //- .iconClick.square(@click="getPage(true)" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
    //-     //- .material-symbols-outlined.notranslate.fill(:class='{loading:fetching}') refresh
    //-     svg.svgIcon(:class='{loading:fetching}')
    //-         use(xlink:href="@/assets/img/material-icon.svg#icon-refresh")
    //-     span &nbsp;&nbsp;Refresh

.recordPart 
    template(v-if="fetching")
        #loading.
            Loading ... &nbsp;
            #[.loader(style="--loader-color:black; --loader-size:12px")]
            
    Table(:key="tableKey" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}" resizable)
        template(v-slot:head)
            tr
                th.fixed(style='width:60px;')
                    Checkbox(@click.stop :modelValue="!!Object.keys(checked).length" @update:modelValue="(value) => { if (value) listDisplay.forEach((d) => (checked[d.record_id] = d)); else checked = {}; }" style="display:inline-block")
                    .resizer.fixed
                th.overflow(v-if="filterOptions.table" style='width:160px;')
                    | Table
                    .resizer
                th.overflow(v-if="filterOptions.record_id" style='width:160px;')
                    | Record ID
                    .resizer
                th.overflow(v-if="filterOptions.user_id" style='width:160px;')
                    | User ID
                    .resizer
                th.overflow(v-if="filterOptions.reference" style='width:120px;')
                    | Reference
                    .resizer
                th.overflow(v-if="filterOptions.index" style='width:160px;')
                    | Index/Value
                    .resizer
                th.overflow(v-if="filterOptions.tag" style='width:160px;')
                    | Tag
                    .resizer
                th.overflow(v-if="filterOptions.files" style='width:80px;')
                    | Files
                    .resizer
                th(v-if="filterOptions.data" style='width:200px;')
                    | Data
                    .resizer
                th.overflow(v-if="filterOptions.updated" style='width:160px;')
                    | Updated
                    .resizer
                th.overflow(v-if="filterOptions.referenced" style='width:120px;')
                    | Referenced
                    .resizer
                th.overflow(v-if="filterOptions.ip" style='width:160px;')
                    | IP
        template(v-slot:body)
            template(v-if="fetching")
                tr(v-for="i in 10")
                    td(:colspan="colspan")
            template(v-else-if="!listDisplay || listDisplay?.length === 0")
                tr
                    td#noUsers(:colspan="colspan") No Records
                tr(v-for="i in 9")
                    td(:colspan="colspan")
            template(v-else)
                tr.hoverRow(v-for="(rc, i) in listDisplay" @click="showDetail=true; selectedRecord=rc")
                    td
                        Checkbox(@click.stop
                            :modelValue="!!checked?.[rc?.record_id]"
                            @update:modelValue="(value) => { if (value) checked[rc?.record_id] = value; else delete checked[rc?.record_id]; }")

                    td.overflow(v-if="filterOptions.table") 
                        span
                            svg.svgIcon(v-if="rc.table.access_group == 'private' || rc.table.access_group == 99 || rc.table.access_group === 'admin'" style="fill:black; margin-bottom: 2px")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-vpn-key-fill")
                        span
                            svg.svgIcon(v-if="rc.table.access_group == 'authorized' || typeof rc.table.access_group === 'number' && rc.table.access_group > 0" style="fill:black; margin-bottom: 2px")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-person-fill")
                        span
                            svg.svgIcon(v-if="rc.table.access_group == 'public' || rc.table.access_group === 0" style="fill:black; margin-bottom: 2px")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-language")
                        span(style="margin-left: 8px") {{ rc?.table?.name }}

                    td(v-if="filterOptions.record_id")
                        .click.overflow(@click.stop="copyID") {{ rc.record_id }}

                    td(v-if="filterOptions.user_id") 
                        .click.overflow(@click.stop="copyID") {{ rc.user_id }}

                    td(v-if="filterOptions.reference")
                        .click.overflow(v-if="rc?.reference" @click.stop="copyID") {{ rc?.reference }}
                        template(v-else) -
                    td.overflow(v-if="filterOptions.index") 
                        template(v-if="rc?.index") 
                            span(v-if="typeof(rc?.index?.value) == 'string'") {{ rc?.index?.name }} / "{{ rc?.index?.value }}"
                            span(v-else) {{ rc?.index?.name }} / {{ rc?.index?.value }}
                        template(v-else) -
                    td.overflow(v-if="filterOptions.tag") 
                        template(v-if="rc?.tags" v-for="(tag, index) in rc.tags")
                            span(v-if="rc.tags.length-1 == index") {{ tag }}
                            span(v-else) {{ tag }}
                        template(v-else) -

                    td.overflow(v-if="filterOptions.files") {{ countMyFiles(rc) }}
                    td.overflow(v-if="filterOptions.data") {{ rc.data }}
                    td.overflow(v-if="filterOptions.updated") {{ new Date(rc.updated).toLocaleString() }}
                    td.overflow(v-if="filterOptions.referenced") {{ rc.referenced_count }}
                    td.overflow(v-if="filterOptions.ip") {{ rc.ip }}
                tr(v-for="i in (10 - listDisplay?.length)")
                    td(:colspan="colspan")

    form.detailRecord(:class="{show: showDetail}" @submit.prevent='upload')
        .header(style='padding-right:10px;')
            svg.svgIcon.black.clickable(@click="showDetail=false; selectedRecord=null;" :class="{nonClickable: fetching}")
                use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-back")
            .name {{ selectedRecord?.record_id ? selectedRecord?.record_id : 'Create Record' }}
            template(v-if="uploading")
                .loader(style="--loader-color:blue; --loader-size:12px; margin: 12px;")
            template(v-else)
                button.noLine.iconClick.square(type="submit" style='padding:0 14px') SAVE

        RecDetails(v-if='showDetail' :data='selectedRecord')

br

.tableMenu(v-if="!showDetail" style='display:block;text-align:center;')
    .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': fetching || currentPage === 1 }")
        svg.svgIcon(style="width: 26px; height: 26px")
            use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-left")
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow(@click="currentPage++;" :class="{'nonClickable': fetching || endOfList && currentPage >= maxPage }")
        span &nbsp;&nbsp;Next
        svg.svgIcon(style="width: 26px; height: 26px")
            use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-right")

// delete records
Modal(:open="openDeleteRecords" @close="openDeleteRecords=false")
    h4(style='margin:.5em 0 0; color: var(--caution-color)') Delete Records

    hr

    div(style='font-size:.8rem;')
        p.
            You sure want to delete {{ Object.values(checked).filter(value => value === true).length > 1 ? Object.values(checked).filter(value => value === true).length + ' records' : 'the record'}}?
            #[br]
            This action cannot be undone.

    br

    div(style="display: flex; align-items: center; justify-content: space-between;")
        div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine.warning(type="button" @click="openDeleteRecords=false;") Cancel 
            button.final.warning(type="button" @click="deleteRecords") Delete

</template>
<script setup lang="ts">
    import Table from "@/components/table.vue";
    import Checkbox from "@/components/checkbox.vue";
    import Modal from "@/components/modal.vue";
    import Pager from "@/code/pager";
    import Guide from "./guide.vue";
    import SearchBox from './searchbox.vue'
    import RecDetails from './showDetail.vue'

    import type { Ref } from "vue";
    import { ref, computed, watch, nextTick } from "vue";
    import { skapi } from "@/main";
    import { user } from "@/code/user";
    import { devLog } from "@/code/logger"
    import { currentService, serviceRecords } from "@/views/service/main";
    import { showDropDown } from "@/assets/js/event.js";

    // table columns
    let filterOptions = ref({
        table: true,
        user_id: false,
        reference: true,
        index: false,
        tag: false,
        record_id: true,
        updated: true,
        ip: false,
        files: true,
        referenced: true,
        data: true,
    });

    // ui/ux related
    let openDeleteRecords = ref(false);
    let promiseRunning = ref(false);
    let tableKey = ref(0);
    let fetching = ref(false);
    let maxPage = ref(0);
    let currentPage: Ref<number> = ref(1);
    let endOfList = ref(false);
    let showDetail = ref(false);
    let showGuide = ref(false);
    let hovering = ref(false);

    let colspan = computed(() => {
        return Object.values(filterOptions.value).filter((value) => value === true).length + 1;
    });

    let countMyFiles = (rc: any) => {
        let count = 0;
        if (!rc.bin) return 0;
        for (let k in rc.bin) {
            count += rc.bin[k].length;
        }

        return count
    }

    watch(currentPage, (n, o) => {
        if (
            n !== o &&
            n > 0 &&
            (n <= maxPage.value || (n > maxPage.value && !endOfList.value))
        ) {
            getPage();
        } else {
            currentPage.value = o;
        }
    });

    watch(showDetail, (nv) => {
        if (nv) {
            nextTick(() => {
                let scrollTarget = document.querySelector(".detailRecord .content");
                let detailRecord = document.querySelector(".detailRecord");
                let targetTop = window.scrollY + detailRecord.getBoundingClientRect().top;
                scrollTarget.scrollTop = 0;
                window.scrollTo(0, targetTop);
            });
        }
    });

    let pager: Pager = null;
    let listDisplay = ref(null);

    let callParams: any = {};

    let callSearch = async (e: HTMLFormElement) => {
        let toFetch: {
            data: {
                record_id: string;
                unique_id: string;
                table: {
                    name?: string;
                    access_group?: string | number;
                    subscription?: string;
                };
                index: {
                    name?: any;
                    value?: any;
                    condition?: any;
                    range?: any;
                };
                reference?: string;
                tags?: string;
            };
            files: {
                file: File;
                name: string;
            }[];
        } = skapi.util.extractFormData(e, { ignoreEmpty: true });

        if (!toFetch.data?.index?.name) {
            delete toFetch.data.index
        }

        if (!toFetch.data?.table?.name) {
            if (toFetch.data?.record_id || toFetch.data?.unique_id) {
                callParams = {
                    record_id: toFetch?.data?.record_id || undefined,
                    unique_id: toFetch?.data?.unique_id || undefined,
                }
            }
            else {
                callParams = {};
            }
        }
        else {
            callParams = toFetch.data;
        }
        await setUpNewPageList();
        getPage(true);
    };

    let setUpNewPageList = async () => {
        endOfList.value = false;
        currentPage.value = 1;
        maxPage.value = 0;

        serviceRecords[currentService.id] = await Pager.init({
            id: "record_id",
            resultsPerPage: 10,
            sortBy: callParams?.index?.name || "record_id",
            order:
                callParams?.index?.name && (callParams?.index?.condition || "").includes("<")
                    ? "desc"
                    : callParams?.table?.name
                        ? "asc"
                        : "desc",
        });
    }

    let getPage = async (refresh?: boolean) => {
        pager = serviceRecords[currentService.id];
        if (!refresh) {
            if ((maxPage.value >= currentPage.value) || endOfList.value) {
                let disp = pager.getPage(currentPage.value);
                maxPage.value = disp.maxPage;
                listDisplay.value = disp.list;

                while (disp.maxPage > 0 && disp.maxPage < currentPage.value && !disp.list.length) {
                    currentPage.value--;
                }

                return;
            }
        }

        fetching.value = true;

        let fetchedData = await skapi.getRecords(Object.assign({ service: currentService.id }, callParams), {
            fetchMore: !refresh,
        })
            .catch((err) => {
                alert(err);
                fetching.value = false;
                throw err;
            });

        fetchedData.list.forEach((r) => {
            if (r.bin) {
                // remove getFile function from bin data. Pager cannot handle functions.
                for (let k in r.bin) {
                    r.bin[k] = r.bin[k].map(f => {
                        delete f.getFile;
                        return f;
                    })
                }
            }
        });

        // save endOfList status as a Pager property
        pager.endOfList = fetchedData.endOfList;
        endOfList.value = pager.endOfList;

        // insert data in pager
        if (fetchedData.list.length > 0) {
            await pager.insertItems(fetchedData.list);
        }

        // get page from pager
        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;

        while (disp.maxPage > 0 && disp.maxPage < currentPage.value && !disp.list.length) {
            currentPage.value--;
        }

        fetching.value = false;

    };

    let init = async () => {
        currentPage.value = 1;

        // setup pagers
        if (serviceRecords[currentService.id] && Object.keys(serviceRecords[currentService.id]).length) {
            endOfList.value = serviceRecords[currentService.id].endOfList;
            getPage();

        } else {
            await setUpNewPageList();
            getPage(true);
        }
    };

    init();

    let selectedRecord = ref(null);
    let uploading = ref(false);

    let upload = async (e: SubmitEvent) => {
        uploading.value = true;

        let { data, files } = skapi.util.extractFormData(e, { nullIfEmpty: true });

        let jsonData = data.data || null;

        try {
            if (jsonData)
                jsonData = JSON.parse(data.data);
        } catch (err) {
            alert('Invalid JSON data');
            uploading.value = false;
            return;
        }

        let configs = data.config;

        if (!configs.index?.name) {
            delete configs.index;
        }

        try {
            let r = await skapi.postRecord(jsonData, configs, files);

            if (r.bin) {
                // remove getFile function from bin data. Pager cannot handle functions.
                for (let k in r.bin) {
                    r.bin[k] = r.bin[k].map(f => {
                        delete f.getFile;
                        return f;
                    })
                }
            }

            if (configs.record_id) {
                await pager.editItem(r);
            } else {
                await pager.insertItems([r]);
            }

            getPage();

            showDetail.value = false;
        } catch (err: any) {
            alert(err.message);
            throw err;
        } finally {
            uploading.value = false;
        }
    };

    let deleteRecords = () => {
        promiseRunning.value = true;

        let deleteIds = Object.keys(checked.value)

        skapi
            .deleteRecords({ service: currentService.id, record_id: deleteIds })
            .then(async (r) => {
                for (let id of deleteIds) {
                    for (let i = 0; i < listDisplay.value.length; i++) {
                        if (listDisplay.value[i].record_id == id) {
                            listDisplay.value.splice(i, 1);
                        }
                    }
                    await pager.deleteItem(id);
                }

                getPage();

                checked.value = {};
                promiseRunning.value = false;
                openDeleteRecords.value = false;
            });
    };

    let copyID = (e) => {
        let target = e.currentTarget;
        let copy = target.textContent;
        let doc = document.createElement("textarea");

        doc.textContent = target.textContent;
        document.body.append(doc);
        doc.select();
        document.execCommand("copy");
        doc.remove();

        target.classList.add("clicked");

        setTimeout(() => {
            target.classList.remove("clicked");
        }, 1000);
    };

    // checks
    let checked: any = ref({});

</script>

<style scoped lang="less">
    textarea::placeholder {
        opacity: 0.5;
    }

    .updown {
        background-color: #fff;
        background-color: var(--main-color);
        border-radius: 50%;
        margin-left: 8px;
        cursor: pointer;
        box-shadow: rgba(41, 63, 230, 0.24) 0px 1px 8px;
    }

    .moreVert {
        .inner {
            padding-top: 0.25rem;

            &>* {
                padding: 0.25rem 0.5rem;
            }

            padding-bottom: 0.25rem;
        }
    }

    #searchForm {
        // max-width: 700px;
        margin: 0 auto;

        .inner {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
        }

        // .customSelect {
        //     flex-grow: 1;
        // }
        .search {
            position: relative;
            flex-grow: 50;

            .icon {
                &:hover {
                    @media (pointer: fine) {
                        color: var(--main-color) !important;
                    }
                }

                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                user-select: none;

                &::before {
                    display: none;
                }
            }
        }

        .groupWrap {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 6px;
            border-style: hidden;
            cursor: pointer;
            user-select: none;

            .group {
                position: relative;
                height: 44px;
                padding: 10px;
                flex-grow: 1;
                text-align: center;
                background-color: #fff;
                color: rgba(0, 0, 0, 0.4);
                fill: rgba(0, 0, 0, 0.4);

                svg {
                    width: 23px;
                    height: 23px;
                    vertical-align: unset !important;
                }

                &::after {
                    position: absolute;
                    content: "";
                    top: 0;
                    left: -1px;
                    bottom: 0;
                    right: 0;
                    border: 1px solid rgba(0, 0, 0, 0.5);
                }

                &:first-child {
                    border-radius: 6px 0 0 8px;

                    &::after {
                        border-radius: 6px 0 0 8px;
                    }
                }

                &:nth-child(2) {
                    &::after {
                        border-left: 0;
                    }
                }

                &:last-child {
                    border-radius: 0 8px 8px 0;

                    &::after {
                        border-left: 0;
                        border-radius: 0 8px 8px 0;
                    }
                }

                &.active {
                    background-color: rgba(41, 63, 230, 0.05);
                    color: var(--main-color);
                    fill: var(--main-color);

                    &::after {
                        border: 1px solid var(--main-color);
                    }
                }
            }
        }

        .btn {
            flex-grow: 1;
            width: 140px;
        }

        .advanced {
            font-size: 0.8rem;
            user-select: none;

            .infoBox {
                input {
                    outline: 0;
                    background-color: rgba(0, 0, 0, 0.05);
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

    tbody {
        td {
            .click {
                position: relative;
                color: var(--main-color);
                font-weight: 500;

                &::after {
                    position: absolute;
                    content: "copied!";
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    border-radius: 4px;
                    text-align: center;
                    background-color: var(--main-color);
                    color: #fff;
                    display: none;
                }

                &:hover {
                    text-decoration: underline;
                    cursor: pointer;
                }

                &.clicked {
                    &::after {
                        display: block;
                    }
                }
            }
        }
    }

    .recordPart {
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

    .detailRecord {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        transform: translateX(110%);
        transition: all 0.3s;

        &.show {
            transform: translateX(0px);
        }

        .header {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            padding: 0 20px;
            font-weight: 500;
            background-color: #f0f0f0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.2);

            .material-symbols-outlined {
                cursor: pointer;
            }

            .name {
                flex-grow: 1;
                padding-left: 20px;
            }

            button {
                padding: 0;
                font-size: 0.9rem;
            }
        }
    }

    .content {
        flex-grow: 1;
        overflow-y: auto;
        padding: 20px;
        font-size: 0.8rem;

        .row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 12px;

            &.indent {
                padding-left: 20px;

                .key {
                    font-weight: normal;
                    width: 150px;
                }
            }
        }

        .key {
            font-weight: 500;
            width: 170px;
        }

        .value {
            flex-grow: 1;
            min-width: 270px;
            margin: 6px 0 6px;

            input {
                width: 100%;
            }
        }
    }
</style>
