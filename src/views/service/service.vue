<template lang="pug">
#service
    section.infoBox
        .serviceState
            table.serviceInfoTable
                tbody
                    tr
                        td.smallTitle Service Name
                        td.smallValue
                            form.modifyInputForm(v-if="modifyServiceName" @submit.prevent="modifyServiceName = false;" style="display:inline-block;")
                                .customInput
                                    input#modifyServiceName(type="text" placeholder="Service name" max-length="30" :value='inputServiceName' @input="(e) => inputServiceName = e.target.value" required)
                                template(v-if="serviceFetching")
                                    img.loading(src="@/assets/img/loading.png")
                                template(v-else)
                                    input#submitInp(type="submit" hidden)
                                    label.material-symbols-outlined.big.save(for='submitInp') done
                                    .material-symbols-outlined.cancel(@click="modifyServiceName = false;") close
                            template(v-else)
                                span.ellipsis.strong {{ currentService.service }}
                                span.material-symbols-outlined.fill.clickable.edit(@click="editServiceName") edit
                    tr
                        td.smallTitle Service ID
                        td.smallValue
                            .ellipsis ap226E8TXhYtbcXRgi5D
                    tr
                        td.smallTitle Date Created
                        td.smallValue 0000.00.00
            .toggleWrap.active
                span.smallTitle Disable/Enable
                .toggleBg
                    .toggleBtn(@click="enableDisableToggle")
        .codeWrap
            .scrollWrap
                pre.scrollInner.
                    #[span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "{{ currentService.service }}"], #[span(style="color:#FFED91") "dsalfkjsldkfjalsdkfjalskdfjlkdfjlaskfjlskjfalsf"]);&nbsp;&nbsp;&nbsp;&nbsp;
                
            .copy.clickable.material-symbols-outlined.fill(@click="copy") file_copy
        br
        a.question(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank")
            .material-symbols-outlined.empty help 
            span Where do I put this code?

    br

    section.infoBox
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
                    form.modifyInputForm(v-if="modifyCors" style="margin-top: 8px" @submit.prevent="changeCors")
                        .customInput
                            input#modifyCors(:disabled="promiseRunningCors || null" type="text" placeholder='https://your.domain.com' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")
                        template(v-if="promiseRunningCors")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            input#submitInp(type="submit" hidden)
                            label.material-symbols-outlined.big.save(for='submitInp') done
                            .material-symbols-outlined.sml.cancel(@click="modifyCors = false;") close
                    .smallValue(v-else)
                        span.ellipsis ******************************************
                        span.material-symbols-outlined.fill.clickable.edit(@click="editCors") edit
                br
                .setting
                    label.smallTitle Secret Key
                    .smallValue
                        span.ellipsis ******************************************
                        span.material-symbols-outlined.fill.clickable.edit edit
            .right
                .titleWrap
                    label.smallTitle Client Secret Key
                    .addBtn
                        .material-symbols-outlined.sml add 
                        span Add Secret Key
                .keyWrap
    
    br

    section.infoBox
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

    section.cardWrap
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
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();

let serviceFetching = ref(false);
let modifyServiceName = ref(false);
let inputServiceName = '';
let modifyCors = ref(false);
let promiseRunningCors = ref(false);
let inputCors = ref('');

let editServiceName = () => {
    // if (account.value?.email_verified) {
    //     inputServiceName = currentService.value.name;
    //     modifyServiceName.value = true;
    // } else {
    //     return false;
    // }

    inputServiceName = currentService.value.name;
    modifyServiceName.value = true;
}
let editCors = () => {
    // if (account.value?.email_verified) {
    //     inputCors.value = currentService.value.cors === '*' ? '' : currentService.value.cors; modifyCors.value = true;
    // } else {
    //     return false;
    // }

    inputCors.value = currentService.value.cors === '*' ? '' : currentService.value.cors; modifyCors.value = true;
}
</script>

<style lang="less" scoped>
.serviceState {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.serviceInfoTable {
    display: inline-table;
    border-spacing: 0;
    margin-bottom: 0.5rem;

    .smallTitle {
        padding-right: 1rem;
        white-space: nowrap;
    }
    .smallValue {
        position: relative;
        width: 100%;
        height: 44px;
        padding: 0;
    }
    .strong {
        font-weight: 700;
        color: var(--main-color);
    }
    .edit {
        margin-left: 8px;
        color: var(--secondary-text);
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

    .scrollWrap {
        // position: relative;
        background: rgba(0,0,0,0.8);
        border-radius: 8px;
        box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);
        color: #FFF;
        overflow-x: auto;
    
        .scrollInner {
            // width: 100%;
            // overflow-x: auto;
            font-size: 20px;
            // padding: 1rem 0;
            max-width: 0;
            font-size: 1rem;
        }
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
    gap: 1rem;

    .left {
        width: 48%;
        flex-grow: 1;
    }
    .right {
        width: 48%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        flex-grow: 1;
    }
    .titleWrap {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    .addBtn {
        flex-shrink: 1;
        cursor: pointer;
        font-size: 0.7rem;
        color: var(--main-color);
    } 
    .smallValue {
        position: relative;
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        
        .edit {
            margin-left: 8px;
        }
        .ellipsis {
            width: 100%;
        }
    }
    .keyWrap {
        min-height: 100px;
        flex-grow: 1;
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
    gap: 1rem;
}
.cardWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;

    .cardBox {
        // width: calc(50% - 0.5rem);
        // min-width: 350px;
        width: 48%;
        flex-grow: 1;

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
        }
    }    
}

@media (max-width:767px) {
    .ellipsis {
        width: calc(100vw - 250px);
    }
    .settingWrap {
        .smallValue {
            .ellipsis {
                width: calc(100vw - 120px);
            } 
        }
    }
    .cardWrap {
        .cardBox {
            width: 100%;
        }
    }    
}
</style>