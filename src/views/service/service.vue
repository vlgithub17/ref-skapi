<template lang="pug">
#service
    .infoBox
        .serviceState
            table.serviceInfoTable
                tbody
                    tr
                        td.smallTitle Service Name
                        td.value
                            .currentValue
                                span {{ currentService.service }}
                                span.material-symbols-outlined.fill.clickable.edit edit
                    tr
                        td.smallTitle Service ID
                        td.value kjskdflaskfjlskjflksdjfsk
                    tr
                        td.smallTitle Date Created
                        td.value 0000.00.00
            .toggleWrap.active
                span.smallTitle Disable/Enable
                .toggleBg
                    .toggleBtn(@click="enableDisableToggle")
        .codeWrap
            pre.codeInner.
                #[span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "{{ currentService.service }}"], #[span(style="color:#FFED91") "dsalfkjsldkfjalsdkfjalskdfjlkdfjlaskfjlskjfalsf"]);
            .copy.clickable(@click="copy")
                .material-symbols-outlined.fill file_copy
        br
        a.question(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank")
            .material-symbols-outlined.empty help 
            span Where do I put this code?

    br

    .infoBox
        .infoTitle Security Setting
        a.question.help(href='https://docs.skapi.com/security/security-settings.html' target="_blank")
            .material-symbols-outlined.empty help 
            span Help
        
        br
        br

        .settingWrap 
            .left
                .setting    
                    label.smallTitle Cors 
                    .smallValue
                        .currentValue
                            span *
                            span.material-symbols-outlined.fill.clickable.edit edit
                br
                .setting
                    label.smallTitle Secret Key
                    .smallValue
                        .currentValue
                            span No Key
                            span.material-symbols-outlined.fill.clickable.edit edit
            .right
                label.smallTitle Client Secret Key
                .addBtn
                    .material-symbols-outlined.sml add 
                    span Add Secret Key
                .keyWrap
    
    br

    .infoBox
        .infoTitle Subsription Plan

        br
        br

        .subsWrap 
            .subs 
                .smallTitle Currnet Plan
                .smallValue ======
            .subs 
                .smallTitle State
                .smallValue ======
            .subs 
                .smallTitle Renew Date
                .smallValue ======
            .subs 
                button.final Manage Subscription

    br

    .cardWrap
        .cardBox
            .header 
                .title 
                    .material-symbols-outlined.fill(style="font-size: 1.5rem") group
                    span Users
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/users`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle # of Users
                    .smallValue ======
                .cont 
                    .smallTitle Creating User
                    .smallValue ======

        .cardBox
            .header 
                .title 
                    .material-symbols-outlined.fill(style="font-size: 1.5rem") database
                    span Database
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/records`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle # of Users
                    .smallValue ======
                .cont 
                    .smallTitle Creating User
                    .smallValue ======

    br

    .cardWrap
        .cardBox
            .header 
                .title 
                    .material-symbols-outlined.fill(style="font-size: 1.5rem") mail
                    span Mail
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/mail`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle # Subscribers
                    .smallValue ======
                .cont 
                    .smallTitle Mail storage used
                    .smallValue ======

        .cardBox
            .header 
                .title 
                    .material-symbols-outlined.fill(style="font-size: 1.5rem") language
                    span Hosting
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/records`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle Registered Subdomain
                    .smallValue ======
                .cont 
                    .smallTitle Host storage used
                    .smallValue ======

    br


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

    td {
        white-space: nowrap;
    }
    // .name {
    //     font-size: 20px;
    //     color: #0006;
    // }
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
    margin-bottom: 1rem;
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
    overflow-x: auto;

    .codeInner {
        // width: 100%;
        // overflow-x: auto;
        font-size: 20px;
        // padding: 1rem 0;
        max-width: 0;
        font-size: 1rem;
    }
    .copy {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;

        &::after {
            position: absolute;
            display: block;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            background: rgba(255, 255, 255, 0.6);
            color: #343434;
            padding: 4px;
            content: "Copied";
            transition: opacity .4s;
            opacity: 0;
        }

        &.copied::after {
            opacity: 1;
        }
    }
}
.question {
    display: block;
    text-decoration: none;
    color: var(--main-color);
    font-size: 0.9rem;
    font-weight: 500;

    &.help {
        display: inline-block;
        margin-left: 1rem;
        color: rgba(0, 0, 0, 0.40);
    }

    span {
        margin-left: 5px;
    }
}
.smallValue {
    margin-top: 8px;
}
.settingWrap {
    display: flex;
    flex-wrap: wrap;

    .left, .right {
        flex-grow: 1;
    }
    .right {
        position: relative;
    }
    .addBtn {
        position: absolute;
        top: 0.2rem;
        right: 0;
        cursor: pointer;
        font-size: 0.7rem;
        color: var(--main-color);
    } 
    .smallValue {
        height: 44px;
        display: flex;
        align-items: center;
        
        .currentValue {
            // width: 100%;
            // display: flex;
            // align-items: center;
            // justify-content: space-between;

            .edit {
                margin-left: 8px;
            }
        }
    }
    .keyWrap {
        margin-top: 0.5rem;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        overflow-y: auto;
        padding: 8px 16px;
    }
}
.subsWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.cardWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .cardBox {
        width: calc(50% - 0.5rem);
        // min-width: 350px;
        // flex-grow: 1;
        margin-right: 1rem;

        &:last-child {
            margin-right: 0;
        }
        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}

@media (max-width:1023px) {
    .settingWrap {
        .right {
            width: 100%;
            margin-top: 1rem;
        }
    }    

    .cardWrap {
        .cardBox {
            width: 100%;
            margin-right: 0;
            margin-bottom: 1rem;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>