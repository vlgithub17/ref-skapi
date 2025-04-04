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
            .value {{ Math.abs(selectedUser?.access_group || 0) }} {{(selectedUser?.access_group || 0) < 0 ? "(Disabled)" : "" }}
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
        textarea.value(v-model="selectedUser_data" style="padding: 8px;width:100%;height:160px;resize: none;tab-size: 2;font-family: monospace;white-space: pre;" name='attributes[misc]'
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