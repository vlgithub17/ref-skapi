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
        .infoTitle(style="margin-right: 1rem;") Security Setting
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
            .state(style="flex-grow:1")
                label.smallTitle(style="width: 170px;") Client Secret Key
                .material-symbols-outlined.fill.clickable(:class="{'nonClickable' : showKeyAdd}" style="padding: 12.5px 0" @click="showKeyAdd = !showKeyAdd") add_box
                .smallValue.keyBox
                    template(v-if="showKeyAdd")
                        form.keyWrap(@submit.prevent="saveSecretKey(index)")
                            .key
                                .material-symbols-outlined.fill.clickable do_not_disturb_on
                                .inputWrap
                                    input#keyName.lineInput(type="text" name='keyName' placeholder="Key name" required)
                                    input#secretKey.lineInput(type="text" name='secretKey' placeholder="Secret Key" required)
                                .buttonWrap
                                    template(v-if="promiseRunning")
                                        img.loading(style='padding:0;width:18px;height:18px;' src="@/assets/img/loading.png")
                                    template(v-else)
                                        input#submitInp(type="submit" hidden)
                                        label.material-symbols-outlined.clickable.save(for='submitInp') check
                                        .material-symbols-outlined.clickable.cancel(@click="showKeyAdd = false") close
                    .empty(v-else) No Secret Key

    br
    
    section.infoBox
        .infoTitle Subsription Plan

        br
        br

        .flexInfo
            .subs 
                .smallTitle(style="width: 150px;") Currnet Plan
                .smallValue ======
            .subs 
                .smallTitle(style="width: 150px;") State
                .smallValue ======
            .subs 
                .smallTitle(style="width: 150px;") Renew Date
                .smallValue ======
        
        br

        //- div(style="display:block; text-align:right") 
        router-link(:to='`/subscription/ap226E8TXhYtbcXRgi5D`' style="display:block; text-align:right")
            button.final Manage Subscription
    
    br

    .flexInfo
        section.cardBox
            .header 
                .title 
                    .material-symbols-outlined.fill.nohover(style="font-size: 1.5rem") group
                    span Users
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/users`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle # of Users
                    .smallValue ======
                .cont 
                    .smallTitle Creating User
                    .smallValue ======

        section.cardBox
            .header 
                .title 
                    .material-symbols-outlined.fill.nohover(style="font-size: 1.5rem") database
                    span Database
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/records`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle # of Users
                    .smallValue ======
                .cont 
                    .smallTitle Creating User
                    .smallValue ======

        section.cardBox
            .header 
                .title 
                    .material-symbols-outlined.fill.nohover(style="font-size: 1.5rem") mail
                    span Mail
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.service}/mail`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle # Subscribers
                    .smallValue ======
                .cont 
                    .smallTitle Mail storage used
                    .smallValue ======

        section.cardBox
            .header 
                .title 
                    .material-symbols-outlined.fill.nohover(style="font-size: 1.5rem") language
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

    section.deleteWrap 
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
let showKeyAdd = ref(false);

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
.smallTitle {
    width: 150px;
    padding: 12.5px 0;
}
.smallValue {
    height: 44px;
    line-height: 44px;
    margin-top: 8px;
}
.flexInfo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
}
.serviceState {
    display: inline-block;
    flex-grow: 1;

    &.security {
        width: 100%;
    }

    &.subs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .state {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-grow: 1;
    }

    .ellipsis {
        width: 250px;
    }

    .smallValue {
        margin: 0;
        flex-grow: 1;
    }
}
.keyBox {
    width: 100%;
    line-height: unset;
    height: 180px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.10);
    overflow-y: auto;
    padding: 8px 16px;

    .add {
        display: block;
        background-color: #293fe60d;
        border-radius: 4px;
        text-align: center;
        padding: 6px 0;
        margin-bottom: 0.5rem;
        cursor: pointer;
        
        * {
            color: var(--main-color);
        }
    }
    .empty {
        line-height: 160px;
        color: rgba(0, 0, 0, 0.4);
        font-size: 0.9rem;
        font-weight: 400;
        text-align: center;
    }
    .key {
        position: relative;
        height: 30px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        div {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 10px;
        }
        .inputWrap {
            position: relative;
            width: calc(100% - 94px);

            #keyName {
                width: 200px;
            }
            #secretKey {
                flex-grow: 1;
            }
        }
        input {
            border: 0;
            background-color: unset;
            border-bottom: 1px solid #000;
            height: 36px;
            // background-color: rgba(0,0,0,0.05);
            // border-radius: 8px;
            // font-size: 16px;
            // padding: 0 12px;
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
        background: rgba(0,0,0,0.8);
        border-radius: 8px;
        box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);
        color: #FFF;
        overflow-x: auto;
    
        .scrollInner {
            font-size: 20px;
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
        color: rgba(0, 0, 0, 0.40);
    }

    span {
        margin-left: 5px;
    }
}
.subs {
    flex-grow: 1;
}
.cardBox {
    width: 48%;
    flex-grow: 1;

    .smallTitle {
        padding: 0;
    }
    .content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }
}
.deleteDesc li {
    color: var(--black-6);
    line-height: 1.5rem;
}

@media (max-width:1023px) {
    .infoBox {
        width: 100% !important;
    }
    .settingWrap {
        .right {
            width: 100%;
        }
    }    
}

@media (max-width:767px) {
    .flexInfo {
        &:first-child {
            gap: unset;
        }
    }
    .serviceState {
        .smallValue {
            width: 100%;
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
    // .keyBox {
    //     .key {
    //         .inputWrap {
    //             width: 100%;
    //         }
    //     }
    // }
    .cardBox {
        width: 100%;
    }
}
</style>