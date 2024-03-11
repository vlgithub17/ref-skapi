<template lang="pug">
#service
    section.infoBox
        .flexInfo
            .serviceState
                .state 
                    .smallTitle(style="width: 150px;") Service Name
                    .smallValue
                        form.modifyInputForm(v-if="modifyServiceName" @submit.prevent="modifyServiceName = false;")
                            .customInput
                                input#modifyServiceName(type="text" placeholder="Service name" max-length="30" :value='inputServiceName' @input="(e) => inputServiceName = e.target.value" required)
                            template(v-if="serviceFetching")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                input#submitInp(type="submit" hidden)
                                label.material-symbols-outlined.big.save(for='submitInp') done
                                .material-symbols-outlined.cancel(@click="modifyServiceName = false;") close
                        template(v-else)
                            span.ellipsis.pencil.strong {{ currentService.service }}
                            span.material-symbols-outlined.fill.clickable.edit(@click="editServiceName") edit

                .state 
                    .smallTitle(style="width: 150px;") Service ID
                    .smallValue
                        .ellipsis ap226E8TXhYtbcXRgi5D

                .state 
                    .smallTitle(style="width: 150px;") Date Created
                    .smallValue 0000.00.00

            .toggleWrap.active
                span.smallTitle(style="width: 150px;") Disable/Enable
                .toggleBg
                    .toggleBtn(@click="enableDisableToggle")

        br
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

        .serviceState.security
            .state    
                label.smallTitle(style="width: 170px;") Cors 
                .smallValue(style="padding:0")
                    form.modifyInputForm(v-if="modifyCors" @submit.prevent="changeCors")
                        .customInput
                            input#modifyCors(:disabled="promiseRunningCors || null" type="text" placeholder='https://your.domain.com' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")
                        template(v-if="promiseRunningCors")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            input#submitInp(type="submit" hidden)
                            label.material-symbols-outlined.big.save(for='submitInp') done
                            .material-symbols-outlined.sml.cancel(@click="modifyCors = false;") close
                    template(v-else)
                        span.ellipsis.pencil https://expamle.domain.com
                        span.material-symbols-outlined.fill.clickable.edit(@click="editCors") edit
            .state
                label.smallTitle(style="width: 170px;") Secret Key
                .smallValue
                    form.modifyInputForm(v-if="modifyKey" @submit.prevent="setSecretKey")
                        .customInput
                            input#modifyKey(:disabled="promiseRunningSecKey || null" type="text" placeholder="Secret key for external request" :value='inputKey' @input="(e) => inputKey = e.target.value")
                        template(v-if="promiseRunningSecKey")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            input#submitInp(type="submit" hidden)
                            label.material-symbols-outlined.big.save(for='submitInp') done
                            .material-symbols-outlined.sml.cancel(@click="modifyKey = false;") close
                    template(v-else)
                        span.ellipsis.pencil dlfsl2sldkfjf48475skd
                        span.material-symbols-outlined.fill.clickable.edit(@click="editKey") edit
            .state
                label.smallTitle(style="width: 170px;") Client Secret Key
                .material-symbols-outlined.fill.clickable(@click="addSecretKey") add_box
                .keyWrap
                    .key
                        .inputWrap
                            //- .material-symbols-outlined.sml.minus do_not_disturb_on
                            input#keyName(type="text" name='keyName' placeholder="Key name" required)
                            input#secretKey(type="text" name='secretKey' placeholder="Secret Key" required)
                        .buttonWrap
                            template(v-if="promiseRunning")
                                img.loading(style='padding:0;width:18px;height:18px;' src="@/assets/img/loading.png")
                            template(v-else)
                                input#submitInp(type="submit" hidden)
                                label.material-symbols-outlined.mid.save(for='submitInp') check
                                .material-symbols-outlined.mid.cancel(@click="checkKeyInp(index)") close

    
    br

    //- section.infoBox
    //-     .infoTitle Subsription Plan

    //-     br
    //-     br

    //-     .subsWrap 
    //-         .subs 
    //-             .smallTitle Currnet Plan
    //-             .smallValue ======
    //-         .subs 
    //-             .smallTitle State
    //-             .smallValue ======
    //-         .subs 
    //-             .smallTitle Renew Date
    //-             .smallValue ======
    //-         .subs 
    //-             button.final Manage Subscription

    //- br

    //- section.cardWrap
    //-     .cardBox
    //-         .header 
    //-             .title 
    //-                 .material-symbols-outlined.fill(style="font-size: 1.5rem") group
    //-                 span Users
    //-             router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/users`' style="font-size: 1.5rem") arrow_forward_ios
    //-         .content
    //-             .cont
    //-                 .smallTitle # of Users
    //-                 .smallValue ======
    //-             .cont 
    //-                 .smallTitle Creating User
    //-                 .smallValue ======

    //-     .cardBox
    //-         .header 
    //-             .title 
    //-                 .material-symbols-outlined.fill(style="font-size: 1.5rem") database
    //-                 span Database
    //-             router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/records`' style="font-size: 1.5rem") arrow_forward_ios
    //-         .content
    //-             .cont
    //-                 .smallTitle # of Users
    //-                 .smallValue ======
    //-             .cont 
    //-                 .smallTitle Creating User
    //-                 .smallValue ======

    //-     .cardBox
    //-         .header 
    //-             .title 
    //-                 .material-symbols-outlined.fill(style="font-size: 1.5rem") mail
    //-                 span Mail
    //-             router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/mail`' style="font-size: 1.5rem") arrow_forward_ios
    //-         .content
    //-             .cont
    //-                 .smallTitle # Subscribers
    //-                 .smallValue ======
    //-             .cont 
    //-                 .smallTitle Mail storage used
    //-                 .smallValue ======

    //-     .cardBox
    //-         .header 
    //-             .title 
    //-                 .material-symbols-outlined.fill(style="font-size: 1.5rem") language
    //-                 span Hosting
    //-             router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/records`' style="font-size: 1.5rem") arrow_forward_ios
    //-         .content
    //-             .cont
    //-                 .smallTitle Registered Subdomain
    //-                 .smallValue ======
    //-             .cont 
    //-                 .smallTitle Host storage used
    //-                 .smallValue ======

    //- br

    //- section.deleteWrap 
        h3 Delete Service
        ul.deleteDesc
            li Deleting the service will permanently erase all data. Recovery is not possible. The service plan will also be immediately canceled, and the remaining days will be prorated and refunded.
        div(style="display:block; text-align:right;")
            button.unFinished.warning Delete Service
    
    br
    br
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { currentService } from '@/data.js';
import { ref, nextTick } from 'vue';

const router = useRouter();
const route = useRoute();

let serviceFetching = ref(false);
let modifyServiceName = ref(false);
let inputServiceName = '';
let modifyCors = ref(false);
let promiseRunningCors = ref(false);
let inputCors = ref('');
let modifyKey = ref(false);
let promiseRunningSecKey = ref(false);
let inputKey = '';
let clientSecretState =ref([]);
let secretKeyAdd = ref(false);
let secretKeyEdit = ref(false);
let promiseRunning = ref(false);

let editServiceName = () => {
    inputServiceName = currentService.value.name;
    modifyServiceName.value = true;
}
let editCors = () => {
    inputCors.value = currentService.value.cors === '*' ? '' : currentService.value.cors; modifyCors.value = true;
}
let editKey = () => {
    inputKey = currentService.value.api_key;
    modifyKey.value = true;
}
let addSecretKey = () => {
    clientSecretState.value.unshift({ key: '', value: '', keyEdit: false, keyAdd: true });
    secretKeyAdd.value = true;
    nextTick(() => {
        document.getElementById('keyName').focus();
    });
}

</script>

<style lang="less" scoped>
.flexInfo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.serviceState {
    display: inline-block;
    flex-grow: 1;

    &.security {
        width: 100%;
    }

    .state {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        
        &:first-child {
            .smallValue {
                padding-right: 1rem;
            }
        }
    }

    .ellipsis {
        width: 250px;
    }

    .smallTitle {
        padding: 12.5px 0;
    }

    .smallValue {
        margin: 0;
        flex-grow: 1;
        height: 44px;
        line-height: 44px;
    }

    .keyWrap {
        width: 100%;
        height: 100px;
        flex-grow: 1;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        overflow-y: auto;
        padding: 8px 16px;

        .empty {
            line-height: 80px;
            color: rgba(0, 0, 0, 0.4);
            font-size: 0.9rem;
            font-weight: 400;
            text-align: center;
        }

        .key {
            display: flex;
            flex-wrap: wrap;
        }
    }
}
.toggleWrap {
    height: 44px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
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

    .smallTitle {
        width: 150px;
    }

    .toggleBg {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 63px;
        height: 32px;
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
        width: 48%;
        flex-grow: 1;

        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
.deleteDesc li {
    color: var(--secondary-text);
    line-height: 1.5rem;
}

@media (max-width:1023px) {
    .settingWrap {
        .right {
            width: 100%;
        }
    }    
}

@media (max-width:767px) {
    .serviceState {
        .smallValue {
            width: 100%;
            padding-right: 0 !important;
        }
    }
    .ellipsis {
        width: calc(100vw - 40px - 3rem) !important;

        &.pencil {
            width: calc(100vw - 40px - 3rem - 24px) !important;
        }
    }
    .toggleWrap {
        width: 100%;
        height: unset;
    }
    .cardWrap {
        .cardBox {
            width: 100%;
        }
    }    
}
</style>