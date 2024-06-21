<template lang="pug">

h3 Database

p(style='margin-bottom: 0').
    The example below shows how you can let your users to upload / fetch their data from your service.
    The indexing and the security level is defined from your HTML without any server side code.
    Skapi can handle any type of data including huge binary files.
Code
    pre.
        #[span(style="color:#999") &lt;!-- Uploading data --&gt;]
        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.postRecord(event, { table: { name: 'my_collection', access_group: 'authorized' } }).then(r => console.log(r))"]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "something"] #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "Write something"]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "file"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "my_file"]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Submit"]#[span(style="color:#999") &gt;]
        #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

Code
    pre.
        #[span(style="color:#999") &lt;!-- Fetching data --&gt;]
        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.getRecords(event).then(r => console.log(r))"]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "table&#91;name&#93;"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "my_collection"] #[span(style="color:#44E9FF") hidden]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "table&#91;access_group&#93;"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "authorized"] #[span(style="color:#44E9FF") hidden]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Get Data"]#[span(style="color:#999") &gt;]
        #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

p For more details, please refer to the #[a(href="https://docs.skapi.com/database/create.html" target="_blank") Documentation]

br

h2 Records

hr

p Search and manage your service records.

form#searchForm(@submit.prevent="searchRecords")
    .inner
        input(type='hidden' name='service' :value='currentService.id')
        input(type='hidden' name='owner' :value='currentService.owner')

        .groupWrap
            .material-symbols-outlined.fill.group(:class="{active : searchFormValue.table.access_group == 'public'}" title="public" @click.stop="searchFormValue.table.access_group = 'public'") language
            .material-symbols-outlined.fill.group(:class="{active : searchFormValue.table.access_group == 'authorized'}" title="authorized" @click.stop="searchFormValue.table.access_group = 'authorized'") person
            .material-symbols-outlined.fill.group(:class="{active : searchFormValue.table.access_group == 'private'}" title="private" @click.stop="searchFormValue.table.access_group = 'private'") vpn_key
        .search
            input.big(@input="e => {searchFormValue.table.name = e.target.value}" :placeholder="searchFormValue.table.access_group + ' table.name'" required style="padding-right: 40px;")
            .material-symbols-outlined.fill.icon(@click.stop="showAdvanced = !showAdvanced") manage_search
        button.final(type="submit" style='flex-shrink: 0;') Search

        // table 검색일때 추가적인 필드
        .advanced(v-if="showAdvanced" style="width:100%")
            .infoBox
                .smallTitle(style="margin-bottom: 8px") Subscription ID
                input.big(@input="e => {searchFormValue.table.subscription = e.target.value}" pattern='[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' title='Subscription ID should be the user\'s ID' name='subscription' placeholder="Subscription ID")

                br
                br

                .smallTitle(style="margin-bottom: 8px") Referenced ID
                input.big(@input="e => {searchFormValue.reference = e.target.value}" name='reference' placeholder='referenced record id')

                br
                br

                .smallTitle(style="margin-bottom: 8px") Tag
                input.big(@input="e => {searchFormValue.tag = e.target.value}" name='tag' placeholder='tag search')

                br
                br

                .smallTitle(style="margin-bottom: 8px") Index
                select(v-model='searchFormValue.index.name' style="width:100%; height:44px; margin-bottom:10px")
                    option(value='none' selected) None
                    option(value='name') Index name
                    option(value='$updated') Updated Date
                    option(value='$uploaded') Uploaded Date
                    option(value='$referenced_count') Number of referenced
                    option(value='$user_id') Uploaders user id

                input.big(v-if='searchFormValue.index.name == "name"' v-model='searchFormValue.index.value' name='index[name]' placeholder='index name' style="margin-bottom:10px" required)

                .value(v-if='searchFormValue.index.name !== "none"' style="display:flex; flex-wrap:wrap; gap:10px;")
                    select(v-if='searchFormValue.index.name == "name"' v-model='searchFormValue.index.type' style="flex-grow:1; height:44px")
                        option(value='text' selected) String
                        option(value='number') Number
                        option(value='checkbox') Boolean

                    input.big(v-if="searchFormValue.index.type !== 'checkbox'" name='index[value]' :type='searchFormValue.index.type' placeholder='index value' :required='searchFormValue.index.type !== "checkbox"' v-model='searchFormValue.index.value' style="flex-grow:50; width:unset")
                    select(v-else v-model="searchFormValue.index.value" style="flex-grow:50")
                        option(value=true name='index[value]' selected) True
                        option(value=false name='index[value]') False

                    template(v-if='searchFormValue.index.name !== "$user_id" && searchFormValue.index.type !== "checkbox"')
                        select(v-model='searchFormValue.index.condition' :disabled='conditionDisabled' style="flex-grow:1; height:44px")
                            option(value='=' selected) equal
                            option(value='>=') greater or equal
                            option(value='>') greater
                            option(value='<=') less or equal
                            option(value='<') less
                            option(value='range') range

                        input(v-if='searchFormValue.index.condition == "range"' name='index[range]' :type='searchFormValue.index.type' placeholder='index range' style="flex-grow:1; height:44px" required)

br

.tableMenu
    .iconClick.square(@click.stop="(e)=>{showDropDown(e)}" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        .material-symbols-outlined.fill checklist_rtl
        span &nbsp;&nbsp;Show Columns
        .moreVert(@click.stop style="--moreVert-left:0;display:none;font-weight:normal; color:black")
            .inner(style="padding:.5rem 1rem .5rem .5rem")
                Checkbox(v-model="filterOptions.table" style="display:flex;") Table
                Checkbox(v-model="filterOptions.user_id" style="display:flex") User ID 
                Checkbox(v-model="filterOptions.subscription" style="display:flex") Subscription
                Checkbox(v-model="filterOptions.reference" style="display:flex") Reference
                Checkbox(v-model="filterOptions.index" style="display:flex") Index/Value
                Checkbox(v-model="filterOptions.tag" style="display:flex") Tag
                Checkbox(v-model="filterOptions.record_id" style="display:flex") Record ID
                Checkbox(v-model="filterOptions.updated" style="display:flex") Updated
                Checkbox(v-model="filterOptions.uploaded" style="display:flex") Uploaded
                Checkbox(v-model="filterOptions.readonly" style="display:flex") ReadOnly 
                Checkbox(v-model="filterOptions.ip" style="display:flex") ip 
                Checkbox(v-model="filterOptions.files" style="display:flex") Files 
                Checkbox(v-model="filterOptions.reference_limit" style="display:flex") Reference  Limit
                Checkbox(v-model="filterOptions.referenced" style="display:flex") Referenced 
                Checkbox(v-model="filterOptions.allow_multiple_reference" style="display:flex") Multiple Referenced 
                Checkbox(v-model="filterOptions.data" style="display:flex") Data

    .iconClick.square(@click="()=>{ !user.email_verified ? false : selectedRecord = JSON.parse(JSON.stringify(createRecordTemplate)); showDetail=true; fileList=[]; }" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        .material-symbols-outlined.fill add_circle
        span &nbsp;&nbsp;Create Record

    .iconClick.square(:class="{'nonClickable': noSelection || fetching || !user?.email_verified || currentService.service.active <= 0}" )
        .material-symbols-outlined.fill delete
        span &nbsp;&nbsp;Delete Selected

    .iconClick.square(@click="init" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        .material-symbols-outlined.fill refresh
        span &nbsp;&nbsp;Refresh

.recordPart 
    Table(:key="tableKey" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}" resizable)
        template(v-slot:head)
            tr
                th.center(style='width:60px;padding:0')
                    Checkbox(@click.stop v-model='checkedall' @change='checkall' :class='{nonClickable: !listDisplay || !listDisplay.length}' style="display:inline-block")
                    .resizer
                th.overflow(v-if="filterOptions.table" style='width:160px;')
                    | Table
                    .resizer
                th.overflow(v-if="filterOptions.record_id" style='width:160px;')
                    | Record ID
                    .resizer
                th.overflow(v-if="filterOptions.user_id" style='width:160px;')
                    | User ID
                    .resizer
                th.center.overflow(v-if="filterOptions.subscription" style='width:130px;')
                    | Subscription
                    .resizer
                th.overflow(v-if="filterOptions.reference" style='width:160px;')
                    | Reference
                    .resizer
                th.overflow(v-if="filterOptions.index" style='width:160px;')
                    | Index/Value
                    .resizer
                th.overflow(v-if="filterOptions.tag" style='width:220px;')
                    | Tag
                    .resizer
                th.overflow(v-if="filterOptions.updated" style='width:160px;')
                    | Updated
                    .resizer
                th.overflow(v-if="filterOptions.uploaded" style='width:160px;')
                    | uploaded
                    .resizer
                th.center.overflow(v-if="filterOptions.readonly" style='width:100px;')
                    | ReadOnly
                    .resizer
                th.overflow(v-if="filterOptions.ip" style='width:160px;')
                    | ip
                    .resizer
                th.center.overflow(v-if="filterOptions.files" style='width:100px;')
                    | Files
                    .resizer
                th.center.overflow(v-if="filterOptions.reference_limit" style='width:140px;')
                    | Reference Limit
                    .resizer
                th.center.overflow(v-if="filterOptions.referenced" style='width:110px;')
                    | Referenced
                    .resizer
                th.center.overflow(v-if="filterOptions.allow_multiple_reference" style='width:190px;')
                    | Allow multiple reference
                    .resizer
                th.overflow(v-if="filterOptions.data" style='width:220px;')
                    | Data
                    .resizer
        template(v-slot:body)
            template(v-if="fetching")
                tr
                    td#loading(:colspan="colspan").
                        Loading Records ... &nbsp;
                        #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
                tr(v-for="i in 14")
                    td(:colspan="colspan")
            template(v-else-if="!listDisplay || listDisplay.length === 0")
                tr
                    td#noUsers(:colspan="colspan") No Records
                tr(v-for="i in 14")
                    td(:colspan="colspan")
            template(v-else)
                tr.nsrow(v-for="(rc, i) in listDisplay" @click="showDetail=true; selectedRecord=JSON.parse(JSON.stringify(rc))")
                    td.center
                        Checkbox(@click.stop v-model='checked[rc?.table?.name]')
                    td.overflow(v-if="filterOptions.table") 
                        span.material-symbols-outlined.fill(v-if="rc.table.access_group == 'private'") vpn_key
                        span.material-symbols-outlined.fill(v-if="rc.table.access_group > 0 || rc.table.access_group == 'authorized'") person
                        span.material-symbols-outlined.fill(v-if="rc.table.access_group == 0 || rc.table.access_group == 'public'") language
                        span(style="margin-left: 8px") {{ rc?.table?.name }}
                    td(v-if="filterOptions.record_id")
                        .click.overflow(@click.stop="copyID") {{ rc.record_id }}
                    td(v-if="filterOptions.user_id") 
                        .click.overflow(@click.stop="copyID") {{ rc.user_id }}
                    td.center.overflow(v-if="filterOptions.subscription") {{ rc.table.subscription ? 'Required' : '-' }}
                    td(v-if="filterOptions.reference")
                        .click.overflow(v-if="rc?.reference?.record_id" @click.stop="copyID") {{ rc?.reference?.record_id }}
                        template(v-else) -
                    td.overflow(v-if="filterOptions.index") 
                        template(v-if="rc?.index") {{ rc?.index?.name }} / {{ rc?.index?.value }}
                        template(v-else) -
                    td.overflow(v-if="filterOptions.tag") 
                        template(v-if="rc?.tags" v-for="(tag, index) in rc.tags")
                            span(v-if="rc.tags.length-1 == index") {{ tag }}
                            span(v-else) {{ tag }}, 
                        template(v-else) -
                    td.overflow(v-if="filterOptions.updated") {{ rc.updated }}
                    td.overflow(v-if="filterOptions.uploaded") {{ rc.uploaded }}
                    td.center.overflow(v-if="filterOptions.readonly")
                        .material-symbols-outlined.fill(v-if="rc.readonly") check_circle
                        template(v-else) -
                    td.overflow(v-if="filterOptions.ip") {{ rc.ip }}
                    td.center.overflow(v-if="filterOptions.files") {{ bins[rc.record_id].length }}
                    td.center.overflow(v-if="filterOptions.reference_limit") {{ (rc.reference.reference_limit == null) ? 'infinite' : rc.reference.reference_limit }}
                    td.center.overflow(v-if="filterOptions.referenced") {{ rc.reference.referenced_count }}
                    td.center.overflow(v-if="filterOptions.allow_multiple_reference")
                        .material-symbols-outlined.fill(v-if="rc.reference.allow_multiple_reference") check_circle
                    td.overflow(v-if="filterOptions.data") {{ rc.data }}
                tr(v-for="i in (15 - listDisplay.length)")
                    td(:colspan="colspan")

    form.detailRecord(:class="{show: showDetail}" @submit.prevent="upload")
        template(v-if="selectedRecord")
            .header
                .material-symbols-outlined(@click="showDetail=false; selectedRecord=createRecordTemplate; fileList=[]; indexValue=false;" :class="{nonClickable: fetching}") arrow_back
                .name {{ selectedRecord?.record_id ? selectedRecord?.record_id : 'Create Record' }}
                template(v-if="fetching")
                    img.loading(src="@/assets/img/loading.png")
                template(v-else)
                    button.noLine(type="submit") Save
            .content(:class="{nonClickable: fetching}")
                template(v-if="selectedRecord?.record_id")
                    .row
                        .key Record ID
                        .value {{ selectedRecord?.record_id }}
                        // record_id needed for update
                        input(:value='selectedRecord?.record_id' name='config[record_id]' hidden)
                    .row 
                        .key User ID
                        .value {{ selectedRecord?.user_id }}
                        // user_id info needed for uploadRecord()
                        input(:value='selectedRecord?.user_id' name='user_id' hidden)
                    .row 
                        .key Updated
                        .value {{ selectedRecord?.updated }}
                    .row 
                        .key Uploaded
                        .value {{ selectedRecord?.uploaded }}
                    .row 
                        .key ip
                        .value {{ selectedRecord?.ip }}
                    .row 
                        .key Referenced
                        .value {{ selectedRecord?.reference?.referenced_count }}

                    hr

                .row 
                    .key Read Only
                    .value
                        Checkbox(v-model="selectedRecord_readOnly" name='config[readonly]')
                
                .row(style="margin-bottom:6px") 
                    .key Table

                .row.indent
                    .key Name 
                    input.line.value(v-model="selectedRecord.table.name" name='config[table][name]')

                .row.indent 
                    .key Access Group 
                    template(v-if="selectedRecord?.record_id && selectedRecord?.table?.access_group == 'private'") {{ selectedRecord?.table?.access_group }}
                    select.value(v-else v-model="selectedRecord.table.access_group" name='config[table][access_group]')
                        option(value="0") Public
                        option(value="1") Authorized
                        option(value="private") Private

                .row.indent 
                    .key Subscription 
                    .value
                        Checkbox(v-model="selectedRecord_subscription" name='config[table][subscription]')

                .row(style="margin-bottom:6px")
                    .key Reference

                .row.indent 
                    .key Reference ID 
                    input.line.value(v-model="selectedRecord.reference.record_id" name='config[reference][record_id]')

                .row.indent 
                    .key Reference Limit
                    input.line.value(type="number" min="0" :placeholder="selectedRecord.reference.reference_limit == null ? 'Infinite' : ''" v-model="selectedRecord.reference.reference_limit" name='config[reference][reference_limit]')
                    
                .row.indent 
                    .key Multiple Reference
                    .value
                        Checkbox(v-model="selectedRecord.reference.allow_multiple_reference" name='config[reference][allow_multiple_reference]')

                .row(style="margin-bottom:6px")
                    .key Index 
                    Checkbox(v-model="indexValue")

                template(v-if='indexValue')
                    .row.indent 
                        .key Name 
                        input.line.value(v-model='index_name' name='config[index][name]' placeholder='index name' required)

                    .row.indent
                        .key Value
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;")
                            select(v-model='indexType' style="flex-grow:1;")
                                option(value='string' selected) String
                                option(value='number') Number
                                option(value='boolean') Boolean

                            input.line(v-if="indexType !== 'boolean'" v-model="index_value" name='config[index][value]' :type='indexType' placeholder='index value' :required='indexType !== "checkbox"' style="flex-grow:30; width:unset")
                            
                            select(v-else v-model="index_value" style="flex-grow:30")
                                option(value='true' name='config[index][value]' selected) True
                                option(value='false' name='config[index][value]') False

                .row 
                    .key Tags 
                    input.line.value(v-model="selectedRecord.tags" name='config[tags]')

                .row
                    .key(style="margin-bottom: 6px") Data 
                    textarea.value(v-model="selectedRecord_data" @keydown.stop="handleKey" style="width:100%;height:150px;resize: none;tab-size: 2;font-family: monospace;white-space: pre;" name='data')

                .row 
                    .key(style="margin-bottom:6px") Files 
                    .value.fileWrap(style="width:100%;")
                        template(v-if="fileList")
                            .file(v-for="(value, index) in fileList")
                                .material-symbols-outlined.fill(@click="deleteFile(value, index)") do_not_disturb_on
                                template(v-if="value.key && value.filename && !value.add")
                                    input.line.key(v-model="value.key" disabled)
                                    input.line.value(v-model="value.filename" disabled)
                                template(v-else)
                                    input.line.key(v-model="value.key" required)
                                    .value.flex
                                        input.line(v-model="value.filename" required readonly)
                                        .upload(style='white-space: nowrap;overflow: hidden;flex-shrink: 1;text-overflow: ellipsis;' @click='e=>{ e.target.children[0].click() }') Choose a file
                                            input(@click.stop type="file" @change="e=>{ value.filename = e.target.files[0].name }" required hidden :name='value.key')

                    .add(@click="addFile")
                        .material-symbols-outlined.fill add_circle
                        span Add File

.tableMenu(v-if="!showDetail" style='display:block;text-align:center;')
    .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': fetching || currentPage === 1 }")
        .material-symbols-outlined.bold chevron_left
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow(@click="currentPage++;" :class="{'nonClickable': fetching || endOfList && currentPage >= maxPage }")
        span &nbsp;&nbsp;Next
        .material-symbols-outlined.bold chevron_right

br
br
</template>
<script setup lang="ts">
import Code from '@/components/code.vue';
import Table from '@/components/table.vue';
import Checkbox from '@/components/checkbox.vue';
import Select from '@/components/select.vue';
import Pager from '@/code/pager'

import type { Ref } from 'vue';
import { ref, computed, nextTick, reactive, watch } from 'vue';
import { skapi } from '@/code/admin';
import { user } from '@/code/user';
import { currentService } from '@/views/service/main';
import { showDropDown } from '@/assets/js/event.js'
import { convertToObject } from 'typescript';
import { uploadRecord } from '@/views/service/records/record';

// table columns
let filterOptions = ref({
    table: true,
    user_id: true,
    subscription: true,
    reference: true,
    index: true,
    tag: true,
    record_id: true,
    updated: true,
    uploaded: true,
    readonly: true,
    ip: true,
    files: true,
    reference_limit: true,
    referenced: true,
    allow_multiple_reference: true,
    data: true
});

// ui/ux related
let tableKey = ref(0);
let fetching = ref(false);
let maxPage = ref(0);
let currentPage: Ref<number> = ref(1);
let endOfList = ref(false);
let showDetail = ref(false);
let showAdvanced = ref(false);
let indexValue = ref(false);
let indexType = ref('string');
let indexCondition = ref('=');
let index_name = ref('');
let index_value = ref('');
let conditionDisabled = ref(false);
let colspan = Object.values(filterOptions.value).filter(value => value === true).length + 1;
watch(filterOptions.value, nv => {
    colspan = Object.values(filterOptions.value).filter(value => value).length + 1;
    tableKey.value++;
}, { immediate: true })

// search
let searchFormValue = reactive({
    table: {
        name: '',
        access_group: 'public',
        subscription: '',
    },
    index: {
        name: 'none',
        type: 'text',
        value: '',
        condition: '=',
        range: ''
    },
    tag: '',
    reference: ''
});
watch(() => searchFormValue.index.name, (n) => {
    conditionDisabled.value = false;
    searchFormValue.index.type = 'text';
    searchFormValue.index.condition = '=';
    switch (n) {
        case '$user_id':
            searchFormValue.index.type = 'text';
            searchFormValue.index.condition = '=';
            conditionDisabled.value = true;
            break;
        case 'name':
            break;
        case '$referenced_count':
            searchFormValue.index.type = 'number';
            break;
        default:
            // updated, uploaded
            searchFormValue.index.type = 'datetime-local';
    }
})
watch(() => searchFormValue.index.type, n => {
    searchFormValue.index.value = '';
})

let pager: Pager = null;
let listDisplay = ref(null);
let fileList = ref([]);
let currentParams = searchFormValue;
let reserved_index = {
    none: 'record_id',
    name: 'index.value',
    $uploaded: 'record_id',
    $updated: 'updated',
    $referenced_count: 'referenced_count',
    $user_id: 'record_id'
}
let bins: {
    [record_id: string]: { [key:string]: any }
} = {};

let getPage = async (refresh?: boolean) => {
    if (!pager) {
        return;
    }
    
    if (refresh) {
        endOfList.value = false;
    }

    if (!refresh && maxPage.value >= currentPage.value || endOfList.value) {
        listDisplay.value = pager.getPage(currentPage.value).list;
        return;
    }

    else if (!endOfList.value || refresh) {
        fetching.value = true;


        if (!currentParams?.table?.name) {
            currentParams = null;
        }

        let fetchedData = await skapi.getRecords(Object.assign({service: currentService.id}, currentParams || {}), { fetchMore: !refresh });
        fetchedData.list = fetchedData.list.map(r=>{
            bins[r.record_id] = r?.bin || {};
            delete r.bin;
            return r;
        })

        // save endOfList status
        endOfList.value = fetchedData.endOfList;

        // insert data in pager
        if (fetchedData.list.length > 0) {
            await pager.insertItems(fetchedData.list);
        }

        // get page from pager
        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;

        if(disp.maxPage > 0 && disp.maxPage < currentPage.value && !disp.list.length) {
            currentPage.value--;
        }

        for(let i in bins) {
            bins[i].length = 0;
            if(Object.keys(bins[i]).length) {
                for(let j in bins[i]) {
                    if (j !== 'length') {
                        bins[i].length += bins[i][j].length;
                    }
                }
            }
        }

        fetching.value = false;
    }
}

let init = async () => {
    currentPage.value = 1;

    // setup pagers
    pager = await Pager.init({
        id: 'record_id',
        resultsPerPage: 10,
        sortBy: reserved_index[searchFormValue.index.name],
        order: searchFormValue.index.condition.includes('<') ? 'desc' : 'asc',
    });

    getPage(true);
}

init();

let createRecordTemplate = {
    table: {
        name: '',
        access_group: 0,
        subscription: false,
    },
    index: {
        name: '',
        value: '',
    },
    reference: {
        record_id: '',
        allow_multiple_reference: false,
        reference_limit: null
    },
    tags: [],
    readonly: false,
};

let selectedRecord = ref(createRecordTemplate);
let selectedRecord_readOnly = ref(false);
let selectedRecord_subscription = ref(false);
let selectedRecord_data = ref({});
watch(() => selectedRecord.value, nv => {
    if (nv) {
        deleteFileList.value = [];
        selectedRecord_readOnly.value = nv?.readonly || false;
        selectedRecord_subscription.value = nv?.table?.subscription || false;
        selectedRecord_data.value = JSON.stringify(nv?.data, null, 2) || '';

        if(Object.keys(bins).includes(nv.record_id)) {
            // console.log(bins[nv.record_id])
            let normBin = (key, obj) => {
                fileList.value.push({
                    type: 'binary',
                    key,
                    filename: obj.filename,
                    endpoint: obj.url,
                    download: () => skapi.getFile(obj.url, { dataType: 'download' })
                })
            }
            for (let k in bins[nv.record_id]) {
                if (k !== 'length') {
                    let b = bins[nv.record_id][k];
                    for (let i of b) {
                        normBin(k, i);
                    }                    
                }
            }
        }

        console.log(fileList.value)

        if(nv?.index?.name) {
            indexValue.value = true;
            let value = JSON.parse(JSON.stringify(nv?.index?.value));
            indexType.value = typeof(value);
            index_name.value = nv?.index?.name;
            index_value.value = nv?.index?.value;
        }
    }
})

let upload = async(e: SubmitEvent) => {
    fetching.value = true;

    let remove_bin = [];

    for (let i in deleteFileList.value) {
        remove_bin.push(deleteFileList.value[i].endpoint)
    }

    if (selectedRecord.value?.record_id) {
        await uploadRecord(e, true, remove_bin);
    } else {
        await uploadRecord(e, false);
    }

    fetching.value = false;
    showDetail.value = false; 
    indexValue.value = false;
    selectedRecord.value = createRecordTemplate; 
    fileList.value = []; 
    getPage(true);
}

let copyID = (e) => {
    let target = e.currentTarget;
    let copy = target.textContent;
    let doc = document.createElement('textarea');

    doc.textContent = target.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    target.classList.add('clicked');

    setTimeout(() => {
        target.classList.remove('clicked');
    }, 1000);
}

// checks
let checked: any = ref({});
let checkedall = ref(false);
let checkall = () => {
    for (let i in listDisplay.value) {
        checked.value[listDisplay.value[i].table.name] = checkedall.value;
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

// textarea tab key
let handleKey = (e) => {
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    let beforeCursor = e.target.value.slice(0, start);
    let afterCursor = e.target.value.slice(start);

    if (e.key == 'Tab') {
        e.preventDefault();

        e.target.value = e.target.value.substring(0, start) + "\t" + e.target.value.substring(end);
        e.target.setSelectionRange(start + 1, start + 1);
    } else if (e.key == 'Enter') {
        e.preventDefault();

        let indentMatch = beforeCursor.match(/(\n|\s)*$/);
        let startCount = (indentMatch.input.split("{").length - 1);
        let endCount = (indentMatch.input.split("}").length - 1);

        let currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
        let currentIndentation = beforeCursor.slice(currentLineStart).match(/^\s*/)[0];
        let newIndentation = currentIndentation + '\t';
        let newCursorPosition = beforeCursor.length + newIndentation.length + 1;

        if (beforeCursor.endsWith('{') && afterCursor.startsWith('}') || beforeCursor.endsWith('[') && afterCursor.startsWith(']')) {
            e.target.value = beforeCursor + '\n' + newIndentation + '\n' + currentIndentation + afterCursor;
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        } else {
            if (startCount > endCount) {
                e.target.value = beforeCursor + '\n' + currentIndentation + currentIndentation + afterCursor;
                e.target.setSelectionRange(beforeCursor.length + newIndentation.length, beforeCursor.length + newIndentation.length);
            }
        }
    } else if (e.key == '{' && e.shiftKey) {
        e.target.value = beforeCursor + '}' + afterCursor;
        e.target.setSelectionRange(start, start);
    } else if (e.key == '[') {
        e.target.value = beforeCursor + ']' + afterCursor;
        e.target.setSelectionRange(start, start);
    }
}

// file
let deleteFileList = ref([]);
let addFile = (e) => {
    fileList.value.push({ add: true, key: '', filename: '' });

    nextTick(() => {
        let scrollTarget = document.querySelector('.detailRecord .content');
        scrollTarget.scrollTop = scrollTarget.scrollHeight
    })
}
let deleteFile = (item, index) => {
    if (!item.key || !item.filename) {
        fileList.value.splice(index, 1);
    } else {
        deleteFileList.value.push(item);
        fileList.value.forEach((f, i)=> {
            if(f.key === item.key && f.filename === item.filename) {
                fileList.value.splice(i, 1);
            }
        });
    }
}
</script>
<style scoped lang="less">
#searchForm {
    max-width: 700px;
    margin: 0 auto;
    
    .inner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
    }
    .customSelect {
        flex-grow: 1;
    }
    .search {
        position: relative;
        flex-grow: 50;

        .icon {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            user-select: none;
        }
    }
    .groupWrap {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
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

            &::after {
                position: absolute;
                content: '';
                top: 0;
                left: -1px;
                bottom: 0;
                right: 0;
                border: 1px solid rgba(0, 0, 0, 0.5);
            }
            
            &:first-child {
                border-radius: 8px 0 0 8px;

                &::after {
                    border-radius: 8px 0 0 8px;
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

                &::after {
                    border: 1px solid var(--main-color);
                }
            }
        }
    }
    .final {
        flex-grow: 1;
        width: 140px;
    }
    .advanced {
        font-size: 0.8rem;
        user-select: none;
        
        .infoBox {
            input {
                outline: 0;
                background-color: rgba(0,0,0,0.05);
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
    tr.nsrow {
        @media (pointer: fine) {

            &:not(.active):hover {
                background-color: rgba(41, 63, 230, 0.05);
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

    td {
        .click {
            position: relative;
            color: var(--main-color);
            font-weight: 500;
            
            &::after {
                position: absolute;
                content: 'copied!';
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
    transition: all .3s;

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

            input {
                width: 100%;
            }
        }
        .file {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 12px;
            gap: 10px;

            .material-symbols-outlined {
                cursor: pointer;
            }
            input {
                width: unset;
            }
            .key {
                flex-grow: 1;
            }
            .value {
                flex-grow: 2;

                &.flex {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px;

                    input {
                        flex-grow: 1;
                    }
                }
            }
            .upload {
                color: var(--main-color);
                font-weight: 500;
                cursor: pointer;
                
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .add {
            width: 100%;
            text-align: center;
            padding: 6px 0;
            color: var(--main-color);
            background-color: #293fe60d;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
        }
    }
}
</style>