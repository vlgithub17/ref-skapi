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

.tableMenu(:class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
    .iconClick.square
        .material-symbols-outlined.fill add_circle
        span &nbsp;&nbsp;Create Record

    .iconClick.square(:class="{'nonClickable': noSelection}")
        .material-symbols-outlined.fill delete
        span &nbsp;&nbsp;Delete Selected

    .iconClick.square
        .material-symbols-outlined.fill refresh
        span &nbsp;&nbsp;Refresh

.recordPart 
    Table(:class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}" resizable)
        template(v-slot:head)
            tr
                th.center(style='width:100px;padding:0')
                    .iconClick.square(@click.stop="(e)=>{showDropDown(e)}" style='color:black')
                        .material-symbols-outlined.fill checklist_rtl
                        .moreVert(@click.stop style="--moreVert-left:0;display:none;font-weight:normal")
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
                                Checkbox(v-model="filterOptions.allow_multiple_reference" style="display:flex") Referenced 
                                Checkbox(v-model="filterOptions.data" style="display:flex") Data 
                    Checkbox(@click.stop v-model='checkedall' @change='checkall' :class='{nonClickable: !listDisplay.length}' style="display:inline-block")
                    .resizer
                th.overflow(style='width:160px;')
                    | Table
                    .resizer
                th.overflow(style='width:160px;')
                    | User ID
                    .resizer
                th.center.overflow(style='width:120px;')
                    | Subscription
                    .resizer
                th.overflow(style='width:160px;')
                    | Reference
                    .resizer
                th.overflow(style='width:160px;')
                    | Index/Value
                    .resizer
                th.overflow(style='width:220px;')
                    | Tag
                    .resizer
                th.overflow(style='width:160px;')
                    | Record ID
                    .resizer
                th.overflow(style='width:160px;')
                    | Updated
                    .resizer
                th.overflow(style='width:160px;')
                    | uploaded
                    .resizer
                th.center.overflow(style='width:100px;')
                    | ReadOnly
                    .resizer
                th.overflow(style='width:160px;')
                    | ip
                    .resizer
                th.center.overflow(style='width:100px;')
                    | Files
                    .resizer
                th.center.overflow(style='width:140px;')
                    | Reference Limit
                    .resizer
                th.center.overflow(style='width:110px;')
                    | Referenced
                    .resizer
                th.center.overflow(style='width:190px;')
                    | Allow multiple reference
                    .resizer
                th.overflow(style='width:220px;')
                    | Data
                    .resizer
        template(v-slot:body)
            tr.nsrow(v-for="(rc, i) in listDisplay" @click="showDetail=true; selectedRecord=rc")
                td.center.overflow
                    Checkbox(@click.stop v-model='checked[rc.name]')
                td.overflow {{ rc.table.name }}
                td 
                    .click.overflow {{ rc.user_id }}
                td.center.overflow {{ rc.table.subscription ? 'required' : '' }}
                td.overflow {{ rc.reference.record_id }}
                td.overflow {{ rc.index.name }} / {{ rc.index.value }}
                td.overflow 
                    template(v-for="(tag, index) in rc.tags")
                        span(v-if="rc.tags.length-1 == index") {{ tag }}
                        span(v-else) {{ tag }}, 
                td 
                    .click.overflow {{ rc.record_id }}
                td.overflow {{ rc.updated }}
                td.overflow {{ rc.uploaded }}
                td.center.overflow
                    .material-symbols-outlined.fill(v-if="rc.readonly") check_circle
                td.overflow {{ rc.ip }}
                td.center.overflow {{ rc.bin }}
                td.center.overflow {{ (rc.reference.reference_limit == null) ? 'infinite' : rc.reference.reference_limit }}
                td.center.overflow {{ rc.reference.referenced_count }}
                td.center.overflow
                    .material-symbols-outlined.fill(v-if="rc.reference.allow_multiple_reference") check_circle
                td.overflow {{ rc.data }}
            tr(v-for="i in (10 - listDisplay.length)")
                    td(:colspan="colspan")

    .detailRecord(:class="{show: showDetail}")
        template(v-if="selectedRecord")
            .header
                .material-symbols-outlined(@click="showDetail=false; fileList=[]; uploadFileList=[];") arrow_back
                .name {{ selectedRecord?.record_id }}
                .save Save
            .content 
                .row
                    .key Record ID
                    .value {{ selectedRecord?.record_id }}
                .row 
                    .key User ID
                    .value {{ selectedRecord?.user_id }}
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
                        Checkbox
                
                .row(style="margin-bottom:6px") 
                    .key Table

                .row.indent
                    .key Name 
                    input.line.value(:value="selectedRecord?.table?.name")

                .row.indent 
                    .key Access Group 
                    select.value(v-if="selectedRecord?.table?.access_group !== 'private'" :value="(selectedRecord?.table?.access_group == '0' || selectedRecord?.table?.access_group == 'Public') ? '0' : '1'")
                        option(value="0") Public
                        option(value="1") Authorized
                        option(value="private") Private
                    template(v-else) {{ selectedRecord?.table?.access_group }}

                .row.indent 
                    .key Subscription 
                    .value
                        //- Checkbox(v-model="selectedRecord?.table?.subscription")

                .row(style="margin-bottom:6px")
                    .key Reference

                .row.indent 
                    .key Reference ID 
                    input.line.value(:value="selectedRecord?.reference?.record_id")

                .row.indent 
                    .key Reference Limit
                    input.line.value(type="number" min="0" :placeholder="selectedRecord?.reference?.reference_limit == null ? 'null' : ''" :value="selectedRecord?.reference?.reference_limit === null ? '' : selectedRecord?.reference?.reference_limit")
                    
                .row.indent 
                    .key Multiple Reference
                    select.value(:value="selectedRecord?.reference?.allow_multiple_reference ? 'true' : 'false'")
                        option(value='true') Allowed
                        option(value='false') Not Allowed

                .row(style="margin-bottom:6px")
                    .key Index 

                .row.indent 
                    .key Name 
                    input.line.value(:value="selectedRecord?.index?.name")

                .row.indent 
                    .key Value 
                    input.line.value(:value="selectedRecord?.index?.value")

                .row 
                    .key Tags 
                    input.line.value(:value="selectedRecord?.tags")

                .row
                    .key(style="margin-bottom: 6px") Data 
                    //- textarea.value(v-model="jsonData" @keydown.stop="handleEnterKey" style="width:100%;height:150px;resize: none;") 
                    textarea.value(:value="JSON.stringify(selectedRecord?.data, null, 4)" @keydown.stop="handleTabKey" style="width:100%;height:150px;resize: none;") 

                .row 
                    .key(style="margin-bottom:6px") Files 
                    .value.fileWrap(style="width:100%;")
                        template(v-if="fileList")
                            .file(v-for="f in fileList")
                                .material-symbols-outlined.fill do_not_disturb_on
                                input.line(:value="f?.context" disabled)
                        template(v-if="uploadFileList")
                            .file(v-for="uf in uploadFileList")
                                .material-symbols-outlined.fill do_not_disturb_on
                                input.line
                                .upload(style='white-space: nowrap;overflow: hidden;flex-shrink: 1;text-overflow: ellipsis;' @click='e=>{ e.target.children[0].click() }') Choose a file
                                    input(@click.stop type="file" @change="e=>{ e.target.parentNode.previousSibling.value = e.target.files[0].name }" required hidden)
                    .add(@click="addFile")
                        .material-symbols-outlined.fill add_circle
                        span Add File

                


br
br
</template>
<script setup lang="ts">
import { ref, computed, nextTick, onMounted, watch } from 'vue';
import { skapi } from '@/code/admin';
import { user } from '@/code/user';
import { currentService } from '@/views/service/main';
import { showDropDown } from '@/assets/js/event.js'
import Code from '@/components/code.vue';
import Table from '@/components/table.vue';
import Checkbox from '@/components/checkbox.vue';
import Select from '@/components/select.vue';

let filterOptions = ref({
    table: true,
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
    user_id: true,
    reference_limit: true,
    referenced: true,
    allow_multiple_reference: true,
    data: true
});
let listDisplay = ref([
    {
        service: 'ap210jya6jmJUYO5CmGr',
        record_id: 'TyUHVYQ22VAmgi5D',
        user_id: 'bf305ace-03b5-4f9d-b88f-291458748ca3',
        updated: 1704938348,
        uploaded: 1704938348,
        ip: '20.401.23924.432',
        readonly: false,
        bin: [
            {
                access_group: 'public',
                filename: 'file name',
                url: 'Full URL endpoint of the file',
                path: 'Path of the file',
                size: 2384,
                uploaded: 1704934348,
                getFile: () => {console.log('ddd')}
            },
            {
                access_group: 'public',
                filename: 'file name',
                url: 'Full URL endpoint of the file',
                path: 'Path of the file',
                size: 2384,
                uploaded: 1704934348,
                getFile: () => {console.log('ddd')}
            },
        ],
        table: {
            name: 'jojojo',
            access_group: 'private',
            subscription: true,
        },
        reference: {
            record_id: 'record iiid',
            reference_limit: null,
            allow_multiple_reference: true,
            referenced_count: 1
        },
        index: {
            name: 'index name',
            value: 1234
        },
        tags: ['tag1', 'tag2', 'tag3'],
        data: {
            'key': 'value'
        }
    },
    {
        service: 'ap210soBLv3kl95KCmGr',
        record_id: 'TyU7xSdOtgr5gi5D',
        user_id: 'bf305ace-03b5-4f9d-b88f-291458748ca3',
        updated: 1704938348,
        uploaded: 1704938348,
        ip: '20.401.23924.432',
        readonly: false,
        bin: [],
        table: {
            name: 'opse',
            access_group: 'public',
            subscription: false,
        },
        reference: {
            record_id: 'record id',
            reference_limit: 2,
            allow_multiple_reference: false,
            referenced_count: 1
        },
        index: {
            name: 'index name',
            value: 1234
        },
        tags: ['tag1', 'tag2', 'tag3'],
        data: {
            'key': 'value',
            'ssss': 123434
        }
    },
    {
        service: 'ap212GYdxocHtyDlCmGr',
        record_id: 'TyU6Z6FzoGhGgi5D',
        user_id: 'bf305ace-03b5-4f9d-b88f-291458748ca3',
        updated: 1704938348,
        uploaded: 1704938348,
        ip: '20.401.23924.432',
        readonly: true,
        bin: [
            {
                access_group: 'public',
                filename: 'file name',
                url: 'Full URL endpoint of the file',
                path: 'Path of the file',
                size: 2384,
                uploaded: 1704934348,
                getFile: () => {console.log('ddd')}
            },
            {
                access_group: 'public',
                filename: 'file name',
                url: 'Full URL endpoint of the file',
                path: 'Path of the file',
                size: 2384,
                uploaded: 1704934348,
                getFile: () => {console.log('ddd')}
            },
            {
                access_group: 'public',
                filename: 'file name',
                url: 'Full URL endpoint of the file',
                path: 'Path of the file',
                size: 2384,
                uploaded: 1704934348,
                getFile: () => {console.log('ddd')}
            },
        ],
        table: {
            name: 'hook',
            access_group: 'authorized',
            subscription: false,
        },
        reference: {
            record_id: 'reccccord id',
            reference_limit: null,
            allow_multiple_reference: true,
            referenced_count: 0
        },
        index: {
            name: 'index name',
            value: 1234
        },
        tags: ['tag1', 'tag2', 'tag3'],
        data: {
            'key': 'value'
        }
    }
]);
let colspan = Object.values(filterOptions.value).filter(value => value === true).length + 1;
let selectedRecord = ref({});
let showDetail = ref(false);
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

// json
let jsonData = ref('');

let handleEnterKey = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    
        let textarea = e.target;
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let value = textarea.value;
    
        // Find the start of the line
        let lineStart = start;
        while (lineStart > 0 && value[lineStart - 1] !== '\n') {
            lineStart--;
        }
    
        // Get the current line
        let line = value.substring(lineStart, start);
    
        // Match indentation (spaces or tabs) at the beginning of the current line
        let indentMatch = line.match(/^\s*/);
        let indent = indentMatch ? indentMatch[0] : '';
    
        // Insert a new line with the same indentation
        let newValue = value.substring(0, start) + '\n' + indent + value.substring(end);
    
        // Update the textarea's value and adjust the cursor position
        nextTick(() => {
            jsonData.value = newValue;
            textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
        })
    }
}

let handleTabKey = (e) => {
    // if (e.key == 'Tab') {
    //     let start = e.target.selectionStart;
    //     let end = e.target.selectionEnd;

    //     console.log(start, end)
    // }
    // console.log(e)
}


// file
let uploadFileList = ref([]);
let fileList = ref([]);

watch(selectedRecord, nv => {
    if (nv?.bin) {
        for (let b of nv?.bin) {
            fileList.value.push({
                type: 'binary',
                context: b.filename,
                endpoint: b.url,
                download: () => skapi.getFile(b.url, { dataType: 'download' })
            })
        }
    }
})

let addFile = (e) => {
    uploadFileList.value.push({ type: 'binary', context: '' });

    nextTick(() => {
        let scrollTarget = document.querySelector('.detailRecord .content');
        scrollTarget.scrollTop = scrollTarget.scrollHeight
    })
}
</script>
<style scoped lang="less">
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
            color: var(--main-color);
            font-weight: 500;

            &:hover {
                text-decoration: underline;
                cursor: pointer;
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
                flex-grow: 1;
                width: unset;
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