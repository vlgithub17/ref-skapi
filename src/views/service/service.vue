<template lang="pug">
main#service
    .infoBox
        .serviceState
            table.serviceInfoTable
                tbody
                    tr
                        td.name Service Name
                        td.value
                            .currentValue
                                span {{ currentService.service }}
                                span.material-symbols-outlined.fill.clickable.edit edit
                    tr
                        td.name Service ID
                        td.value kjskdflaskfjlskjflksdjfsk
                    tr
                        td.name Date Created
                        td.value 0000.00.00
            .toggleWrap.active
                span Disable/Enable
                .toggleBg
                    .toggleBtn(@click="enableDisableToggle")
        .codeWrap
            pre.codeInner.
                #[span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "{{ currentService.service }}"], #[span(style="color:#FFED91") "dsalfkjsldkfjalsdkfjalskdfjlkdfjlaskfjlskjfalsf"]);
            .copy.clickable(@click="copy")
                .material-symbols-outlined.fill file_copy
        a.question(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank")
            .material-symbols-outlined.empty.sml help 
            span Where do I put this code?

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { currentService } from '@/data.js';

const router = useRouter();
const route = useRoute();
</script>

<style lang="less" scoped>
#service {
    max-width: 1200px;
    margin: 0 auto;
}
.serviceState {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.serviceInfoTable {
    display: inline-table;
    border-spacing: 0 1rem;

    .name {
        font-size: 20px;
        color: #0006;
    }
    .value {
        padding-left: 1rem;
        font-size: 1rem;
        color: var(--secondary-text);

        .currentValue {
            span {
                font-weight: 700;
                color: var(--main-color);
            }
            .edit {
                margin-left: 8px;
                color: var(--secondary-text);
            }
        }
    }
}
.toggleWrap {
    display: inline-block;
    opacity: 1;

    &.locked {
        opacity: 0.4;
    }

    &.active {
        .toggleBg {
            background-color: var(--main-color);

            .toggleBtn {
                transform: translate(31px, -50%);
                transition: all 0.3s;
            }
        }
    }

    span {
        color: rgba(0, 0, 0, 0.40);
        font-size: 20px;
        font-weight: 400;
    }

    .toggleBg {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 63px;
        height: 32px;
        margin-left: 1rem;
        border-radius: 16px;
        background-color: rgba(0, 0, 0, 0.6);
        transition: all 0.3s;

        &.nonClickable {
            .toggleBtn {
                cursor: default;
            }
        }
        .toggleBtn {
            position: absolute;
            width: 26px;
            height: 26px;
            right: unset;
            left: 3px;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
            background-color: #eee;
            transition: all 0.3s;
            cursor: pointer;
        }
    }
}   
.codeWrap {
    position: relative;
    background: rgba(0,0,0,0.8);
    border-radius: 8px;
    box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);
    color: #FFF;

    .codeInner {
        // width: 100%;
        overflow-x: auto;
        font-size: 20px;
        padding: 1rem 0;
    }
    .copy {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
    }
}
// .codeWrap {
//     position: relative;
//     border-radius: 8px;
//     border: 1px solid rgba(255, 255, 255, 0.10);
//     background: rgba(0,0,0,0.8);
//     font-family: monospace;
//     color: #FFF;
//     box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);
//     margin-top: 1rem;
//     user-select: text !important;
//     margin-bottom: 1rem;

//     .codeInner {
//         width: 100%;
//         white-space: pre;
//         overflow-x: auto;
//         line-height: 1.4;
//         font-size: 1.125rem;
//     }
//     .copy {
//         position: absolute;
//         right: 20px;
//         top: 50%;
//         transform: translateY(-50%);
//         color: #fff;

//         &::after {
//             position: absolute;
//             display: block;
//             right: 30px;
//             top: 50%;
//             transform: translateY(-50%);
//             text-align: center;
//             font-size: 14px;
//             font-weight: 400;
//             background: rgba(255, 255, 255, 0.6);
//             color: #343434;
//             padding: 4px;
//             content: "Copied";
//             transition: opacity .4s;
//             opacity: 0;
//         }

//         &.copied::after {
//             opacity: 1;
//         }
//     }
// }
.question {
    display: block;
    text-decoration: none;
    color: var(--main-color);
    font-size: 20px;
    font-weight: 500;

    &.help {
        position: absolute;
        left: 10rem;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(0, 0, 0, 0.40);
    }

    span {
        margin-left: 5px;
    }
}
</style>