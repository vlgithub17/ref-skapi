<template lang="pug">
.content
    template(v-if='selectedRecord.record_id')
        .row
            .key(style='font-weight:normal;') RECORD ID:
            .value {{ selectedRecord?.record_id }}
            // record_id needed for update
            input(:value='selectedRecord?.record_id' name='config[record_id]' hidden)
        .row
            .key(style='font-weight:normal;') USER ID:
            .value {{ selectedRecord?.user_id }}
        .row
            .key(style='font-weight:normal;') UPDATED:
            .value {{ new Date(selectedRecord?.updated).toLocaleString() }}
        .row 
            .key(style='font-weight:normal;') UPLOADED:
            .value {{ new Date(selectedRecord?.uploaded).toLocaleString() }}
        .row 
            .key(style='font-weight:normal;') IP:
            .value {{ selectedRecord?.ip }}
        .row 
            .key(style='font-weight:normal;') REFERENCED:
            .value {{ selectedRecord?.referenced_count }}

        hr

    label.row
        .key(style='color:black;') Read Only&nbsp;&nbsp;
        .value
            Checkbox(v-model="selectedRecord.readonly" name='config[readonly]' style='vertical-align:text-top;' :disabled='restrictedAccess')
    
    br

    .row(style='margin-bottom: 1rem')
        .key Table

    .row.indent(style='height: 42px;')
        .key
            select(v-model='accessGroup' :disabled='restrictedAccess')
                option(value='public') Public
                option(value='authorized') Authorized
                option(value='private') Private
                
        .value(v-if='accessGroup === "authorized"' style='min-width: 300px;')
            input.line(required placeholder="1 ~ 99" :value='accessGroup === "authorized" ? 1 : accessGroup' type='number' name='config[table][access_group]' :disabled='restrictedAccess')

        template(v-else)
            input.line(hidden v-if='accessGroup === "public"' value='public' name='config[table][access_group]' :disabled='restrictedAccess')
            input.line(hidden v-else-if='accessGroup === "Private"' value='Private' name='config[table][access_group]' :disabled='restrictedAccess')

    .row.indent
        .key Table Name
        .value(style='min-width: 300px;')
            input.line(placeholder="Table.Name" name='config[table][name]' v-model='selectedRecord.table.name' required :disabled='restrictedAccess')
    
    //- .row.indent(:class="{'nonClickable': !tableName}")
    //-     .key Subscription
    //-     .value(style='min-width: 300px;')
    //-         input.line(placeholder="xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" name='table[subscription]')

    //- .row.indent(:class="{disabled : selectedRecord.table.access_group == 'public'}")
        label.key(style='width:unset;color:black;')
            | Subscription&nbsp;&nbsp;
            Checkbox(v-model="selectedRecord_subscription" name='config[table][subscription]' :disabled="selectedRecord.table.access_group == 'public'" style='vertical-align:text-top;')

    br

    .row(style="margin-bottom:1rem")
        .key Index&nbsp;&nbsp;

    .row.indent
        .key Index Name
        .value(style='min-width: 300px;')
            input.line(name='config[index][name]' v-model='indexName' placeholder='Alphanumeric, periods only.' :disabled='restrictedAccess')

    .row.indent(:class="{'nonClickable': !indexName}")
        .key Value
        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
            select(v-model='indexValueType' :disabled='restrictedAccess')
                option(value='string' selected) String
                option(value='number') Number
                option(value='boolean') Boolean

            input.line(
                v-if="indexValueType !== 'boolean'"
                    v-model='indexValue'
                    name='config[index][value]'
                    :type='indexValueType' :placeholder='indexValueType === "string" ? "Alphanumeric, space only." : indexValueType === "number" ? "Number value" : "Boolean value"'
                    style="flex-grow:30; width:unset; vertical-align:middle;" :disabled='restrictedAccess')
            
            template(v-else)
                label(style='width:unset;display: flex;align-items: center;')
                    input(type='radio' name='config[index][value]' value='true' :checked='indexValue' style='margin:0;width:unset;' :disabled='restrictedAccess')
                    | &nbsp;True
                label(style='width:unset;display: flex;align-items: center;')
                    input(type='radio' name='config[index][value]' value='false' :checked='indexValue ? null : true' style='margin:0;width:unset;' :disabled='restrictedAccess')
                    | &nbsp;False

    input(:value='service' name='config[service]' hidden)
    input(:value='owner' name='config[owner]' hidden)

    br

    .row 
        .key Tags 
        .value
            input.line(v-model="selectedRecord.tags" name='config[tags]' placeholder="Tag1, Tag2, ... Alphanumeric and space only. Separated with comma." :disabled='restrictedAccess')

    br

    .row(style='margin-bottom: 1rem')
        .key Reference
        input.line.value(v-model="selectedRecord.reference" name='config[reference]' placeholder='Record ID to reference' :disabled='restrictedAccess')

    br

    .row
        .key(style="margin-bottom: 6px") Data (JSON Object)
        textarea.value(:disabled='restrictedAccess' v-model="selectedRecord_data" @keydown.stop="handleKey" style="padding: 8px;width:100%;height:160px;resize: none;tab-size: 2;font-family: monospace;white-space: pre;" :name='accessGroup !== "private" ? "data" : selectedRecord.user_id === user.user_id ? null : "data"'
            placeholder='{ "key": "value" }')

    br

    .row(style='margin-bottom: 1rem')
        .key Files 
        .value(style="width:100%;")
            // already uploaded files
            .file(v-if="selectedRecord.bin" v-for="(fileList, key) in selectedRecord.bin")
                    template(v-for="(file, index) in fileList")
                        div(style='display: flex;gap:8px;margin-bottom: 8px;' :class="{disabled: restrictedAccess}")
                            svg.svgIcon.black.clickable(@click="deleteFile(key, index)" style='margin-top: 3px; padding-top: 1px;')
                                use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")

                            div(style='display: flex;flex-wrap: wrap;')
                                input.line.key(style='width:unset;flex-grow:1;' :value="key" required placeholder="Key name for file" disabled)
                                
                                | &nbsp;&nbsp;

                                a.filename(:href='file.url' target="_blank") {{ file.filename }}

            // new files
            .file(v-for="(file, index) in addFileList")
                div(style='display: flex;gap:8px;margin-bottom: 8px;')
                    svg.svgIcon.black.clickable(@click="addFileList.splice(index, 1)" style='margin-top: 3px; padding-top: 1px;')
                        use(xlink:href="@/assets/img/material-icon.svg#icon-do-not-disturb-on-fill")
                    div(style='display: flex;flex-wrap: wrap;')
                        input.line.key(style='width:unset;flex-grow:1;' v-model="file.key" required placeholder="Key name for file" :disabled='restrictedAccess')
                        | &nbsp;&nbsp;
                        label.filename {{ file.filename || "Choose a file"}}
                            input(@click.stop type="file" :name='file.key' @change="e=>{ file.filename = e.target.files[0].name }" required hidden)

        // files to delete
        template(v-for='furl in deleteFileList')
            input(:value='furl' name='config[remove_bin]' hidden)

        .add(:class="{disabled: restrictedAccess}" @click="addFile" style='margin-top: 1em;')
            svg.svgIcon
                use(xlink:href="@/assets/img/material-icon.svg#icon-add-circle-fill")
            span &nbsp;Add File
</template>

<script setup lang="ts">
    import { computed, nextTick, ref, watch, type Ref } from 'vue';
    import Checkbox from '@/components/checkbox.vue';
    import { user } from '@/code/user';
    import { currentService, serviceRecords } from "@/views/service/main";
    
    let service = currentService.id;
    let owner = currentService.owner;

    let { data } = defineProps({
        data: Object
    })

    let def: any = {
        table: {
            name: "",
            access_group: "public",
            subscription: {
                is_subscription_record: false, // When true, record will be uploaded to subscription table.
                exclude_from_feed: false, // When true, record will be excluded from the subscribers feed.
                notify_subscribers: false, // When true, subscribers will receive notification when the record is uploaded.
                feed_referencing_records: false, // When true, records referencing this record will be included to the subscribers feed.
                notify_referencing_records: false // When true, records referencing this record will be notified to subscribers.
            },
        },
        index: {
            name: "",
            value: "",
        },
        source: {
            referencing_limit: null, // Default: null (Infinite)
            prevent_multiple_referencing: false, // If true, a single user can reference this record only once.
            only_granted_can_reference: false, // When true, only the user who has granted private access to the record can reference this record.
            can_remove_referencing_records: false, // When true, owner of the record can remove any record that are referencing this record. Also when this record is deleted, all the record referencing this record will be deleted.
            referencing_index_restrictions: null as any
        },
        reference: "",
        tags: [] as string[],
        readonly: false,
        data: null,
        bin: {},
    }

    let accessGroup = ref('public');
    let indexName = ref("")
    let indexValueType = ref("string");

    let selectedRecord_data = ref('');
    let indexValue: Ref<any> = ref("");
    let restrictedAccess = ref(false);
    
    // file
    let deleteFileList = ref([]);
    let addFileList = ref([]);

    let selectedRecord = ref(def);

    function load(rec: any) {
        rec = rec || def;
        selectedRecord.value = rec;

        deleteFileList.value = [];
        addFileList.value = [];
        accessGroup.value = typeof rec.table.access_group === 'number' ? 'authorized' : rec.table.access_group;
        indexName.value = rec?.index?.name || "";
        indexValue.value = rec.index?.value || "";

        if (rec?.user_id && rec.table.access_group === 'private' && rec.user_id !== user?.user_id) {
            restrictedAccess.value = true;
        }
        else {
            restrictedAccess.value = false;
        }

        if (indexValue.value !== false || indexValue.value !== 0) {
            indexValue.value = indexValue.value || "";
        }

        indexValueType.value = typeof indexValue.value;
        console.log(rec.data);
        selectedRecord_data.value = JSON.stringify(rec.data || null, null, 2);
        if (Array.isArray(selectedRecord?.value?.tags)) {
            selectedRecord.value.tags = selectedRecord.value.tags.join(", ");
        }
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
    };

    let addFile = () => {
        addFileList.value.push({ key: "", filename: "" });
        nextTick(() => {
            let scrollTarget = document.querySelector(".detailRecord .content");
            scrollTarget.scrollTop = scrollTarget.scrollHeight;
        });
    };

    let deleteFile = (key: string, index: number) => {
        deleteFileList.value.push(selectedRecord.value.bin[key].splice(index, 1)[0].url.split('?')[0]);
    };

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