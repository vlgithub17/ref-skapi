<template lang="pug">

form#searchForm(@submit.prevent="callSearch")
    .inner(style='padding: 1.2rem;')
        input(hidden name='service' :value='currentService.id')
        input(hidden name='owner' :value='currentService.owner')
        
        .content(style="width:100%;padding: 0;overflow:visible;")
            .row
                .key Search By
                select(v-model='searchBy')
                    option(selected value='record_id') Record ID
                    option(value='unique_id') Unique ID
                    option(value='query') Query

            .row(v-if='searchBy === "record_id"')
                .key Record ID
                .value(style='min-width: 300px;')
                    input.line(placeholder="xxxxxxxxxxxxxxxx" name='record_id')

            .row(v-else-if='searchBy === "unique_id"')
                .key Unique ID
                .value(style='min-width: 300px;')
                    input.line(placeholder="Unique ID of the record" name='unique_id')
            
            template(v-else)
                .row(style='margin-bottom: 1rem')
                    .key Table

                .row.indent(style='height: 42px;')
                    .key
                        select(v-model='accessGroup')
                            option(selected value='public') Public
                            option(value='auth') Access Group
                            option(value='private') Private
                            
                    .value(v-if='accessGroup === "auth"' style='min-width: 300px;')
                        input.line(required placeholder="1 ~ 99" value='1' type='number' name='table[access_group]')

                    template(v-else)
                        input.line(hidden v-if='accessGroup === "public"' placeholder="1 ~ 99" value='public' name='table[access_group]')
                        input.line(hidden v-else-if='accessGroup === "Private"' value='Private' name='table[access_group]')

                .row.indent
                    .key Table Name
                    .value(style='min-width: 300px;')
                        input.line(placeholder="Table.Name" name='table[name]' v-model='tableName')
                

                .row.indent(:class="{'nonClickable': !tableName}")
                    .key Subscription
                    .value(style='min-width: 300px;')
                        input.line(placeholder="xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" name='table[subscription]')

                br

                .row(style="margin-bottom:1rem" :class="{'nonClickable': !tableName}")
                    .key Index&nbsp;&nbsp;
                    .value(style='min-width: 300px;')
                        select(v-model='searchIndex')
                            option(selected value='name') By Index Name
                            option(value='$updated') By Updated Timestamp
                            option(value='$uploaded') By Uploaded Timestamp
                            option(value='$referenced_count') By Referenced Count
                            option(value='$user_id') By User ID

                .row.indent(v-if='searchIndex == "name"' :class="{'nonClickable': !tableName}")
                    .key Index Name
                    .value(style='min-width: 300px;')
                        input.line(name='index[name]' placeholder='Alphanumeric, periods only.')
                
                input(v-else name='index[name]' hidden :value='searchIndex')

                template(v-if='searchIndex == "name"')
                    .row.indent(:class="{'nonClickable': !tableName}")
                        .key Value
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                            select(v-model='searchIndexType')
                                option(value='string' selected) String
                                option(value='number') Number
                                option(value='boolean') Boolean

                            input.line(
                                v-if="searchIndexType !== 'boolean'"
                                    name='index[value]'
                                    :type='searchIndexType' :placeholder='searchIndexType === "string" ? "Alphanumeric, space only." : searchIndexType === "number" ? "Number value" : "Boolean value"'
                                    style="flex-grow:30; width:unset; vertical-align:middle;")
                            
                            template(v-else)
                                label(style='width:unset;display: flex;align-items: center;')
                                    input(type='radio' name='index[value]' value='true' checked style='margin:0;width:unset;')
                                    | &nbsp;True
                                label(style='width:unset;display: flex;align-items: center;')
                                    input(type='radio' name='index[value]' value='false' style='margin:0;width:unset;')
                                    | &nbsp;False

                    .row.indent(v-if='searchIndexType !== "boolean"' :class="{'nonClickable': !tableName}")
                        .key Condition
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                            select(v-model='searchIndexCondition')
                                option(value='=' selected) =
                                option(value='>=') Greater or =
                                option(value='>') Greater
                                option(value='<=') Less or =
                                option(value='<') Less
                                option(value='range') Range

                            input(v-if='searchIndexCondition !== "range"' hidden :value='searchIndexCondition' name='index[condition]')
                            template(v-else)
                                input.line(
                                    name='index[range]'
                                    :type='searchIndexType' :placeholder='searchIndexType === "string" ? "Alphanumeric, space only." : searchIndexType === "number" ? "Number value" : "Boolean value"'
                                    style="flex-grow:30; width:unset; vertical-align:middle;")

                template(v-else-if='searchIndex == "$user_id"')
                    .row.indent(:class="{'nonClickable': !tableName}")
                        .key Value
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                            input.line(
                                name='index[value]'
                                type='string' placeholder='xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                                required
                                pattern='[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
                                title='Invalid user\'s ID'
                                style="flex-grow:30; width:unset; vertical-align:middle;")

                template(v-else)
                    .row.indent(:class="{'nonClickable': !tableName}")
                        .key Value
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                            input.line(
                                    name='index[value]'
                                    type='number' :placeholder='searchIndex == "$referenced_count" ? "Number of references" : "1234567890123"'
                                    required
                                    style="flex-grow:30; width:unset; vertical-align:middle;")

                    .row.indent(:class="{'nonClickable': !tableName}")
                        .key Condition
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                            select(v-model='searchIndexCondition' name='index[condition]')
                                option(value='=' selected) =
                                option(value='>=') Greater or =
                                option(value='>') Greater
                                option(value='<=') Less or =
                                option(value='<') Less
                                option(value='range') Range

                            input(v-if='searchIndexCondition !== "range"' hidden :value='searchIndexCondition' name='index[condition]')
                            template(v-else)
                                input.line(
                                    name='index[range]'
                                    type='name' :placeholder='searchIndex == "$referenced_count" ? "Number of references" : "1234567890123"'
                                    required
                                    style="flex-grow:30; width:unset; vertical-align:middle;")
                
                br

                .row(style="margin-bottom:1rem" :class="{'nonClickable': !tableName}")
                        .key Reference
                        .value(style='min-width: 300px;')
                            input.line(placeholder="xxxxxxxxxxxxxxxx" name='reference')

                .row(style="margin-bottom:1rem" :class="{'nonClickable': !tableName}")
                    .key Tag
                    .value(style='min-width: 300px;')
                        input.line(name='tag' placeholder="Tag name. Alphanumeric and space only.")

            br

            div(style='text-align:right')
                button.btn.final.wideOnMobile(type="submit") Search

</template>

<script setup lang="ts">
    import { currentService } from "@/views/service/main";
    import { ref, reactive } from "vue";
    let { callSearch } = defineProps({
        callSearch: Function
    });
    let tableName = ref("");
    let searchBy = ref("record_id");
    let searchIndex = ref("name");
    let searchIndexCondition = ref("=");
    let searchIndexType = ref("string");
    let accessGroup = ref("public");
</script>

<style scoped lang="less">
    #searchForm {
        // width: 700px;
        // max-width: 100%;
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