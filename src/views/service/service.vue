<template lang="pug">
#service
    section.infoBox
        .flexInfo
            .serviceState
                .state 
                    .smallTitle Service Name
                    .smallValue
                        form.modifyInputForm(v-if="modifyServiceName" @submit.prevent="modifyServiceName = false;")
                            .customInput
                                input#modifyServiceName(type="text" placeholder="Service name" max-length="30" :value='inputServiceName' @input="(e) => inputServiceName = e.target.value" required)
                            template(v-if="updatingValue.name")
                                img.loading(src="@/assets/img/loading.png")
                            template(v-else)
                                input#submitInp(type="submit" hidden)
                                label.material-symbols-outlined.big.save(for='submitInp') done
                                .material-symbols-outlined.cancel(@click="modifyServiceName = false;") close
                        template(v-else)
                            span.ellipsis.pencil.strong {{ currentService.service.name }}
                            span.material-symbols-outlined.fill.clickable.edit(@click="editServiceName" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") edit

                .state 
                    .smallTitle Service ID
                    .smallValue
                        .ellipsis {{ currentService.id }}

                .state 
                    .smallTitle Date Created
                    .smallValue {{ currentService.dateCreated }}

            .toggleWrap(:class="{'active': currentService.service.active >= 1}")
                span.smallTitle Disable/Enable
                .toggleBg(:class="{'nonClickable' : !user?.email_verified || currentService.service.active == -1}")
                    .toggleBtn(@click="enableDisableToggle")

        br
        .codeWrap
            .scrollWrap
                pre.scrollInner.
                    #[span(style="color:#33adff") &nbsp;&nbsp;&nbsp;&nbsp;const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "{{ currentService.id }}"], #[span(style="color:#FFED91") "{{ currentService.owner }}"]);&nbsp;&nbsp;&nbsp;&nbsp;
                
            .copy.clickable.material-symbols-outlined.fill(@click="copy") file_copy
        br
        a.question(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank")
            .material-symbols-outlined.empty help 
            span Where do I put this code?

    br

    section.infoBox(:class="{'nonClickable' : !user?.email_verified || currentService.service.active == 0 || currentService.service.active == -1}") 
        .infoTitle(style="margin-right: 1rem;") Security Setting
        a.question.help(href='https://docs.skapi.com/security/security-settings.html' target="_blank")
            .material-symbols-outlined.empty help 
            span Help
        
        br
        br

        .serviceState.security
            .state    
                label.smallTitle Cors 
                .smallValue(style="padding:0")
                    form.modifyInputForm(v-if="modifyCors" @submit.prevent="changeCors")
                        .customInput
                            input#modifyCors(:disabled="updatingValue.cors || null" type="text" placeholder='https://your.domain.com' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")
                        template(v-if="updatingValue.cors")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            input#submitInp(type="submit" hidden)
                            label.material-symbols-outlined.big.save(for='submitInp') done
                            .material-symbols-outlined.sml.cancel(@click="modifyCors = false;") close
                    template(v-else)
                        span.ellipsis.pencil https://expamle.domain.com
                        span.material-symbols-outlined.fill.clickable.edit(@click="editCors") edit
            .state
                label.smallTitle Secret Key
                .smallValue
                    form.modifyInputForm(v-if="modifyKey" @submit.prevent="setSecretKey")
                        .customInput
                            input#modifyKey(:disabled="updatingValue.secretKey || null" type="text" placeholder="Secret key for external request" :value='inputKey' @input="(e) => inputKey = e.target.value")
                        template(v-if="updatingValue.secretKey")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            input#submitInp(type="submit" hidden)
                            label.material-symbols-outlined.big.save(for='submitInp') done
                            .material-symbols-outlined.sml.cancel(@click="modifyKey = false;") close
                    template(v-else)
                        span.ellipsis.pencil {{ currentService.service.api_key || 'No key' }}
                        span.material-symbols-outlined.fill.clickable.edit(@click="editKey" :class="{'nonClickable' : !user?.email_verified}") edit
            .state(style="flex-grow:1")
                label.smallTitle Client Secret Key
                .sentenceButton.noBorder.withIcon(@click="addSecretKey" :class="{'nonClickable' : activeIndex !== null || updatingValue.clientKey}" style="padding: 12.5px 0;height:unset")
                    .material-symbols-outlined.fill.clickable(style="color:unset") add_box
                    span Add Secret Key
                .keyBox
                    .inner
                        .header 
                            .keyName keyName
                            .secretKey secretKey
                        .content(v-if="clientSecretKeys")
                            template(v-for="(key, index) of clientSecretKeys")
                                template(v-if="key.edit || key.add")
                                    form.key(@submit.prevent="saveSecretKey(index)")
                                        input#keyName.keyName.lineInput(type="text" name='keyName' :value="key.key" placeholder="Key name" required)
                                        input.secretKey.lineInput(type="text" name='secretKey' :value="key.value" placeholder="Secret Key" required)
                                        .buttonWrap
                                            template(v-if="updatingValue.clientKey")
                                                img.loading(style='padding:0;width:18px;height:18px;' src="@/assets/img/loading.png")
                                            template(v-else)
                                                input#submitInp(type="submit" hidden)
                                                .material-symbols-outlined.fill.clickable(v-if="key.edit") delete
                                                label.material-symbols-outlined.clickable.save(for='submitInp') check
                                                .material-symbols-outlined.clickable.cancel(@click="checkInput(key)") close
                                template(v-else)
                                    .key
                                        .keyName {{ key.key }}
                                        .secretKey {{ key.value.substr(0,4) + '**********' }}
                                        .material-symbols-outlined.fill.clickable.edit(@click="editSecretKey(key, index)" :class="{'nonClickable' : activeIndex !== null && activeIndex !== index}") edit
                        .empty(v-else) No Secret Key

    br
    
    section.infoBox
        .infoTitle Subsription Plan

        br
        br

        .flexInfo
            .subs 
                .smallTitle(style="padding:0") Currnet Plan
                .smallValue {{ currentService.plan }}
            .subs 
                .smallTitle(style="padding:0") State
                .smallValue 
                    template(v-if="currentService?.subscription?.cancel_at_period_end" style="color:var(--caution-color)") Canceled
                    template(v-else-if="currentService.service.active == -1 && currentService?.subscription?.status == 'canceled'" style="color:var(--caution-color)") Suspended
                    template(v-else) Running
            .subs 
                .smallTitle(style="padding:0") Renew Date
                .smallValue 
                    template(v-if="currentService.plan == 'Trial'" style="color:var(--caution-color)") All Data will be deleted by {{ dateFormat(currentService.service.timestamp + 604800000) }}
                    template(v-else-if="currentService.service.active >= 0") {{ currentService?.subscription?.current_period_end ? dateFormat(currentService?.subscription?.current_period_end * 1000) : '-' }}
                    template(v-else) -
        
        br

        //- div(style="display:block; text-align:right") 
        router-link(:to='`/subscription/${currentService.id}`' style="display:block; text-align:right")
            button.final(v-if="new Date().getTime() < currentService?.subscription?.canceled_at") Resume Plan
            button.final(v-else) Manage Subscription
    
    br

    .flexInfo
        section.cardBox(:class="{'nonClickable' : !user?.email_verified || currentService.service.active == 0 || currentService.service.active == -1}")
            .header 
                .title 
                    .material-symbols-outlined.fill.nohover(style="font-size: 1.5rem") group
                    span Users
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.id}/users`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle # of Users
                    .smallValue {{ currentService.service.users }}
                .cont 
                    .smallTitle Creating User
                    .customSelect(@click.stop="(e)=>{showDropDown(e)}")
                        button
                            span ddd
                            span.material-symbols-outlined arrow_drop_down
                        .moreVert(style="--moreVert-left:0;margin-top:0;display:none")
                            .inner 
                                .more(value="admin") Only Admin allowed
                                .more(value="anyone") Anyone allowed
                        //- select(:value="currentService.prevent_signup ? 'admin' : 'anyone'" @change="(e) => changeCreateUserMode(e)" style="color:var(--main-color);")
                        //-     option(value="admin") Only Admin allowed 
                        //-     option(value="anyone") Anyone allowed
                        //- .material-symbols-outlined.mid.search.selectArrowDown(style="right:-30px;top:66%;color:var(--main-color);") arrow_drop_down

        section.cardBox(:class="{'nonClickable' : !user?.email_verified || currentService.service.active == 0 || currentService.service.active == -1}")
            .header 
                .title 
                    .material-symbols-outlined.fill.nohover(style="font-size: 1.5rem") database
                    span Database
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.id}/records`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle # of database storage Used
                    .smallValue {{ currentService?.storageInfo?.database }}
                .cont 
                    .smallTitle # of cloud storage Used
                    .smallValue {{ currentService?.storageInfo?.cloud }}

        section.cardBox(:class="{'nonClickable' : !user?.email_verified || currentService.service.active == 0 || currentService.service.active == -1}")
            .header 
                .title 
                    .material-symbols-outlined.fill.nohover(style="font-size: 1.5rem") mail
                    span Mail
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.id}/mail`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle # Subscribers
                    .smallValue {{ currentService.service.newsletter_subscribers }}
                .cont 
                    .smallTitle Mail storage used
                    .smallValue {{ currentService?.storageInfo?.email }}

        section.cardBox(:class="{'nonClickable' : !user?.email_verified || currentService.service.active == 0 || currentService.service.active == -1}")
            .header 
                .title 
                    .material-symbols-outlined.fill.nohover(style="font-size: 1.5rem") language
                    span Hosting
                router-link.material-symbols-outlined(:to='`/my-services/${currentService.id}/records`' style="font-size: 1.5rem") arrow_forward_ios
            .content
                .cont
                    .smallTitle Registered Subdomain
                    .smallValue {{ currentService.service?.subdomain || '-' }}
                .cont 
                    .smallTitle Host storage used
                    .smallValue {{ currentService?.storageInfo?.host || '-' }}

    br

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
import { ref, nextTick, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showDropDown } from '@/assets/js/event.js'
import { currentService } from '@/views/service/main';
import { user } from '@/code/user';

const router = useRouter();
const route = useRoute();

console.log(currentService)

let updatingValue = reactive({
    name: false,
    cors: false,
    secretKey: false,
    clientKey : false
});
let clientSecretKeys = ref([
    { key: 'aaaaa', value: 'apd210dkfjseoddj', edit: false, add: false },
    { key: 'bbbbb', value: 'apd210dkfjseoddj', edit: false, add: false },
    { key: 'ccccc', value: 'apd210dkfjseoddj', edit: false, add: false },
    { key: 'ddddd', value: 'apd210dkfjseoddj', edit: false, add: false }
])
let activeIndex = ref(null);
let checkInput = (key) => {
    if(key.add) {
        clientSecretKeys.value.shift();
    } else {
        key.edit = false;
    }
    activeIndex.value = null;
}

let modifyServiceName = ref(false);
let inputServiceName = '';
let modifyCors = ref(false);
let inputCors = ref('');
let modifyKey = ref(false);
let inputKey = '';

let dateFormat = (timestamp) => {
    let currentDate = new Date(timestamp);
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let day = ('0' + currentDate.getDate()).slice(-2);
    let dateStr = `${year}-${month}-${day}`;

    return dateStr;
}
let editServiceName = () => {
    if (user.email_verified) {
        inputServiceName = currentService.service.name;
        modifyServiceName.value = true;
    } else {
        return false;
    }
}
let editCors = () => {
    inputCors.value = currentService.cors === '*' ? '' : currentService.cors; modifyCors.value = true;
}
let editKey = () => {
    inputKey = currentService.api_key;
    modifyKey.value = true;
}
let addSecretKey = () => {
    clientSecretKeys.value.unshift({ key: '', value: '', edit: false, add: true });
    activeIndex.value = 0;
}
let editSecretKey = (key, index) => {
    key.edit=true;
    activeIndex.value = clientSecretKeys.value[index].edit ? index : null;
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
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-grow: 1;
    }

    .ellipsis {
        width: 250px;
        flex-grow: 1;
    }

    .smallValue {
        position: relative;
        width: calc(100% - 150px);
        margin: 0;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
.keyBox {
    width: 100%;
    height: 180px;
    padding: 0 16px;
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, 0.10);
    border-radius: 8px;
    overflow: auto;

    .inner {
        min-width: 420px;
    }
    .header, .key {
        height: 30px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.8rem;
        margin-bottom: 4px;
        gap: 20px;
    }
    .header {
        height: 36px;
        color: #0006;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .keyName {
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .secretKey {
        flex-grow: 1;
    }
    input {
        height: 100%;
        border-bottom: 1px solid #000;
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