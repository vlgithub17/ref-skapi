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

    input(:value='service' name='service' hidden)
    input(:value='owner' name='owner' hidden)

    .row
        .key(style="margin-bottom: 6px") MISC
        textarea.value(v-model="selectedUser_data" @keydown.stop="handleKey" style="padding: 8px;width:100%;height:160px;resize: none;tab-size: 2;font-family: monospace;white-space: pre;" name='attributes[misc]'
            placeholder='Misc data (String)')

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