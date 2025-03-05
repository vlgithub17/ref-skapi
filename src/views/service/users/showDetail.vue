<template lang="pug">
.content
    template(v-if='selectedUser.user_id')
        .row
            .key(style='font-weight:normal;') USER ID:
            .value {{ selectedUser?.user_id }}
            // record_id needed for update
            input(:value='selectedUser?.user_id' name='user_id' hidden)
        .row
            .key(style='font-weight:normal;') ACCESS GROUP:
            .value {{ selectedUser?.access_group }}
        .row
            .key(style='font-weight:normal;') LAST LOGIN/UPDATE:
            .value {{ new Date(selectedUser?.timestamp).toLocaleString() }}

        .row 
            .key(style='font-weight:normal;') EMAIL:
            .value {{ selectedUser?.email || "N/A" }}
        .row 
            .key(style='font-weight:normal;') EMAIL VERIFIED:
            .value {{ selectedUser?.email_verified || "FALSE" }}
        .row
            .key(style='font-weight:normal;') PHONE:
            .value {{ (selectedUser?.phone_number || "").toUpperCase() || "N/A" }}
        .row
            .key(style='font-weight:normal;') PHONE VERIFIED:
            .value {{ (selectedUser?.phone_number_verified || "").toUpperCase() || "FALSE" }}

        .row
            .key(style='font-weight:normal;') NAME:
            .value {{ selectedUser?.name || "N/A" }}
        .row 
            .key(style='font-weight:normal;') LOCALE:
            .value {{ selectedUser?.locale || "N/A" }}
        .row
            .key(style='font-weight:normal;') ADDRESS:
            .value {{ selectedUser?.address || "N/A" }}
        .row 
            .key(style='font-weight:normal;') GENDER:
            .value {{ selectedUser?.gender || "N/A" }}
        .row
            .key(style='font-weight:normal;') BIRTHDATE:
            .value {{ selectedUser?.birthdate || "N/A" }}
        .row
            .key(style='font-weight:normal;') PROFILE:
            .value {{ selectedUser?.profile || "N/A" }}
        .row
            .key(style='font-weight:normal;') PICTURE:
            .value {{ selectedUser?.picture || "N/A" }}
        .row
            .key(style='font-weight:normal;') WEBSITE:
            .value {{ selectedUser?.website || "N/A" }}
        .row
            .key(style='font-weight:normal;') NICKNAME:
            .value {{ selectedUser?.nickname || "N/A" }}

        .row 
            .key(style='font-weight:normal;') RECORDS:
            .value {{ selectedUser?.records || "0" }}
        .row 
            .key(style='font-weight:normal;') SUBSCRIBERS:
            .value {{ selectedUser?.subscribers || "0" }}
        .row 
            .key(style='font-weight:normal;') SUBSCRIBED:
            .value {{ selectedUser?.subscribed || "0" }}
            
        hr

    //- label.row
    //-     .key(style='color:black;') Read Only&nbsp;&nbsp;
    //-     .value
    //-         Checkbox(v-model="selectedUser.readonly" name='config[readonly]' style='vertical-align:text-top;')
    
    //- br

    //- .row(style='margin-bottom: 1rem')
    //-     .key Table

    //- .row.indent(style='height: 42px;')
    //-     .key
    //-         select(v-model='accessGroup')
    //-             option(value='public') Public
    //-             option(value='authorized') Authorized
    //-             option(value='private') Private
                
    //-     .value(v-if='accessGroup === "authorized"' style='min-width: 300px;')
    //-         input.line(required placeholder="1 ~ 99" :value='accessGroup === "authorized" ? 1 : accessGroup' type='number' name='config[table][access_group]')

    //-     template(v-else)
    //-         input.line(hidden v-if='accessGroup === "public"' value='public' name='config[table][access_group]')
    //-         input.line(hidden v-else-if='accessGroup === "Private"' value='Private' name='config[table][access_group]')

    //- .row.indent
    //-     .key Table Name
    //-     .value(style='min-width: 300px;')
    //-         input.line(placeholder="Table.Name" name='config[table][name]' v-model='selectedUser.table.name' required)
    
    //- br

    //- .row(style="margin-bottom:1rem")
    //-     .key Index&nbsp;&nbsp;

    //- .row.indent
    //-     .key Index Name
    //-     .value(style='min-width: 300px;')
    //-         input.line(name='config[index][name]' v-model='indexName' placeholder='Alphanumeric, periods only.')

    //- .row.indent(:class="{'nonClickable': !indexName}")
    //-     .key Value
    //-     .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
    //-         select(v-model='indexValueType')
    //-             option(value='string' selected) String
    //-             option(value='number') Number
    //-             option(value='boolean') Boolean

    //-         input.line(
    //-             v-if="indexValueType !== 'boolean'"
    //-                 v-model='indexValue'
    //-                 name='config[index][value]'
    //-                 :type='indexValueType' :placeholder='indexValueType === "string" ? "Alphanumeric, space only." : indexValueType === "number" ? "Number value" : "Boolean value"'
    //-                 style="flex-grow:30; width:unset; vertical-align:middle;")
            
    //-         template(v-else)
    //-             label(style='width:unset;display: flex;align-items: center;')
    //-                 input(type='radio' name='config[index][value]' value='true' :checked='indexValue' style='margin:0;width:unset;')
    //-                 | &nbsp;True
    //-             label(style='width:unset;display: flex;align-items: center;')
    //-                 input(type='radio' name='config[index][value]' value='false' :checked='indexValue ? null : true' style='margin:0;width:unset;')
    //-                 | &nbsp;False

    input(:value='service' name='service' hidden)
    input(:value='owner' name='owner' hidden)

    //- br

    //- .row 
    //-     .key Tags 
    //-     .value
    //-         input.line(v-model="selectedUser.tags" name='config[tags]' placeholder="Tag1, Tag2, ... Alphanumeric and space only. Separated with comma.")

    //- br

    //- .row(style='margin-bottom: 1rem')
    //-     .key Reference
    //-     input.line.value(v-model="selectedUser.reference" name='config[reference]' placeholder='Record ID to reference')

    //- br

    .row
        .key(style="margin-bottom: 6px") MISC
        textarea.value(v-model="selectedUser_data" @keydown.stop="handleKey" style="width:100%;height:160px;resize: none;tab-size: 2;font-family: monospace;white-space: pre;" name='attributes[misc]'
            placeholder='Misc data (String)')

    //- br

    //- .row(style='margin-bottom: 1rem')
    //-     .key Files 
    //-     .value(style="width:100%;")
    //-         // already uploaded files
    //-         .file(v-if="selectedUser.bin" v-for="(fileList, key) in selectedUser.bin")
    //-                 template(v-for="(file, index) in fileList")
    //-                     div(style='display: flex;gap:8px;margin-bottom: 8px;')
    //-                         svg.svgIcon.black.clickable(@click="deleteFile(key, index)" style='margin-top: 3px; padding-top: 1px;')
    //-                             use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")

    //-                         div(style='display: flex;flex-wrap: wrap;')
    //-                             input.line.key(style='width:unset;flex-grow:1;' :value="key" required placeholder="Key name for file" disabled)
                                
    //-                             | &nbsp;&nbsp;

    //-                             a.filename(:href='file.url' target="_blank") {{ file.filename }}

    //-         // new files
    //-         .file(v-for="(file, index) in addFileList")
    //-             div(style='display: flex;gap:8px;margin-bottom: 8px;')
    //-                 svg.svgIcon.black.clickable(@click="addFileList.splice(index, 1)" style='margin-top: 3px; padding-top: 1px;')
    //-                     use(xlink:href="@/assets/img/material-icon.svg#icon-do-not-disturb-on-fill")
    //-                 div(style='display: flex;flex-wrap: wrap;')
    //-                     input.line.key(style='width:unset;flex-grow:1;' v-model="file.key" required placeholder="Key name for file")
    //-                     | &nbsp;&nbsp;
    //-                     label.filename {{ file.filename || "Choose a file"}}
    //-                         input(@click.stop type="file" :name='file.key' @change="e=>{ file.filename = e.target.files[0].name }" required hidden)

    //-     // files to delete
    //-     template(v-for='furl in deleteFileList')
    //-         input(:value='furl' name='config[remove_bin]' hidden)

    //-     .add(:class="{disabled: restrictedAccess}" @click="addFile" style='margin-top: 1em;')
    //-         svg.svgIcon
    //-             use(xlink:href="@/assets/img/material-icon.svg#icon-add-circle-fill")
    //-         span &nbsp;Add File
</template>

<script setup lang="ts">
    import { nextTick, ref, watch, type Ref } from 'vue';
    import Checkbox from '@/components/checkbox.vue';
    import { user } from '@/code/user';
    import { currentService } from "@/views/service/main";

    let service = currentService.id;
    let owner = currentService.owner;

    let { data } = defineProps({
        data: Object
    })

    let def: any = {}

    let selectedUser = ref(def);
    let selectedUser_data = ref("");

    function load(rec: any) {
        rec = rec || def;
        selectedUser.value = rec;
        selectedUser_data.value = rec.misc;
    }

    watch(() => data, (newVal) => {
        load(newVal);
    }, { immediate: true });

    // textarea tab key
    let handleKey = (e: any) => {
        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        let beforeCursor = e.target.value.slice(0, start);
        let afterCursor = e.target.value.slice(start);

        if (e.key == "Tab") {
            e.preventDefault();

            e.target.value =
                e.target.value.substring(0, start) + "\t" + e.target.value.substring(end);
            e.target.setSelectionRange(start + 1, start + 1);
        } else if (e.key == "Enter") {
            e.preventDefault();

            let indentMatch = beforeCursor.match(/(\n|\s)*$/);
            let startCount = indentMatch.input.split("{").length - 1;
            let endCount = indentMatch.input.split("}").length - 1;

            let currentLineStart = beforeCursor.lastIndexOf("\n") + 1;
            let currentIndentation = beforeCursor.slice(currentLineStart).match(/^\s*/)[0];
            let newIndentation = currentIndentation + "\t";
            let newCursorPosition = beforeCursor.length + newIndentation.length + 1;

            if (
                (beforeCursor.endsWith("{") && afterCursor.startsWith("}")) ||
                (beforeCursor.endsWith("[") && afterCursor.startsWith("]"))
            ) {
                e.target.value =
                    beforeCursor +
                    "\n" +
                    newIndentation +
                    "\n" +
                    currentIndentation +
                    afterCursor;
                e.target.setSelectionRange(newCursorPosition, newCursorPosition);
            } else {
                if (startCount > endCount) {
                    e.target.value =
                        beforeCursor +
                        "\n" +
                        currentIndentation +
                        currentIndentation +
                        afterCursor;
                    e.target.setSelectionRange(
                        beforeCursor.length + newIndentation.length,
                        beforeCursor.length + newIndentation.length
                    );
                }
            }
        } else if (e.key == "{" && e.shiftKey) {
            e.target.value = beforeCursor + "}" + afterCursor;
            e.target.setSelectionRange(start, start);
        } else if (e.key == "[") {
            e.target.value = beforeCursor + "]" + afterCursor;
            e.target.setSelectionRange(start, start);
        }
    }

</script>
<style lang="less">

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

        .file {
            .removeFile {
                cursor: pointer;
            }

            .filename {
                display: inline-block;
                vertical-align: middle;
                max-width: 100%;
                min-width: 270px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: var(--main-color);

                @media (pointer: fine) {
                    &:hover {
                        text-decoration: underline;
                    }
                }

                font-weight: 500;
                cursor: pointer;
                margin-bottom: 4px;
            }

            input.line.key {
                margin-bottom: 4px;
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
</style>