<template lang="pug">
#service
    section.codeWrap
        div(@click="copy" style="text-align:right")
            .copy
                span#copyMsg Copy code
                .material-symbols-outlined.fill.nohover(style="font-size:20px;margin-left:5px") file_copy
        .scrollWrap
            pre#code.scrollInner.
                #[span(style="color:#999") &lt;]#[span(style="color:#44E9FF") script]#[span(style="color:#44E9FF") &nbsp;src] = #[span(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]#[span(style="color:#999") &gt;&lt;/]#[span(style="color:#44E9FF") script]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#44E9FF") script]#[span(style="color:#999") &gt;]
                    #[span(style="color:#33adff") const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "{{ currentService.id }}"], #[span(style="color:#FFED91") "{{ currentService.owner }}"]);
                #[span(style="color:#999") &lt;/]#[span(style="color:#44E9FF") script]#[span(style="color:#999") &gt;]
    
    br

    a.question(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank")
        .material-symbols-outlined.empty.nohover(style="font-size: 20px;") help 
        span Where do I put this code?
    
    br
    br

    section.infoBox
        .state 
            .smallTitle 
                | Service Name
                span.material-symbols-outlined.fill.clickable.edit(@click="editName" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") edit
            template(v-if="modifyMode.name")
                form.modifyInputForm(@submit.prevent="changeName")
                    .customInput
                        input(type="text" placeholder="Service name" max-length="30" :value='inputName' @input="(e) => inputName = e.target.value" required)
                    template(v-if="updatingValue.name")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        input#submitInp(type="submit" hidden)
                        label.material-symbols-outlined.save(for='submitInp') done
                        .material-symbols-outlined.cancel(@click="modifyMode.name = false;") close
            template(v-else)
                .smallValue.ellipsis.pencil.strong {{ currentService.service.name }}

        .state 
            .smallTitle Service ID
            .smallValue.ellipsis {{ currentService.id }}

        .state 
            .smallTitle Date Created
            .smallValue {{ currentService.dateCreated }}

        .state 
            .smallTitle State
            .smallValue 
                template(v-if="currentService?.subscription?.cancel_at_period_end" style="color:var(--caution-color)") Canceled
                template(v-else-if="currentService.service.active == -1 && currentService?.subscription?.status == 'canceled'" style="color:var(--caution-color)") Suspended
                template(v-else) Running

        .state 
            .smallTitle Users 
            .smallValue {{ currentService.service.users }} / 
                span(v-if="currentService.plan == 'Trial' || currentService.plan == 'Standard' || currentService.plan == 'Free Standard'") 10K
                span(v-else-if="currentService.plan == 'Premium'") 100K
                span(v-else-if="currentService.plan == 'Unlimited'") Unlimited

        .state 
            .smallTitle Database 
            .smallValue {{ currentService.storageInfo.database + 'B' }} / 
                span(v-if="currentService.plan == 'Trial' || currentService.plan == 'Standard' || currentService.plan == 'Free Standard'") 4GB
                span(v-else-if="currentService.plan == 'Premium'") 100GB
                span(v-else-if="currentService.plan == 'Unlimited'") Unlimited

        .state 
            .smallTitle Cloud 
            .smallValue {{ currentService.storageInfo.cloud + 'B' }} / 
                span(v-if="currentService.plan == 'Trial' || currentService.plan == 'Standard' || currentService.plan == 'Free Standard'") 50GB
                span(v-else-if="currentService.plan == 'Premium'") 1TB
                span(v-else-if="currentService.plan == 'Unlimited'") Unlimited

        hr(style="background:rgba(0,0,0,0.15);height:1px;border:0;margin:1rem 0")

        .state 
            .smallTitle Subscription Plan
            .smallValue {{ currentService.plan }}

        .state 
            .smallTitle Renew Date
            .smallValue 
                template(v-if="currentService.plan == 'Trial'" style="color:var(--caution-color)") All Data will be deleted by {{ dateFormat(currentService.service.timestamp + 604800000) }}
                template(v-else-if="currentService.service.active >= 0") {{ currentService?.subscription?.current_period_end ? dateFormat(currentService?.subscription?.current_period_end * 1000) : '-' }}
                template(v-else) -
        
        div(style="text-align:right")
            router-link(:to='`/subscription/${currentService.id}`')
                button.final(v-if="new Date().getTime() < currentService?.subscription?.canceled_at") Resume Plan
                button.final(v-else) Manage Subscription

            //- .toggleWrap(:class="{'active': currentService.service.active >= 1}")
                span.smallTitle Disable/Enable
                .toggleBg(:class="{'nonClickable' : !user?.email_verified || currentService.service.active == -1}")
                    .toggleBtn(@click="enableDisableToggle")

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
                .smallTitle 
                    | Cors 
                    span.material-symbols-outlined.fill.clickable.edit(@click="editCors") edit
                .smallValue(style="padding:0")
                    form.modifyInputForm(v-if="modifyMode.cors" @submit.prevent="changeCors")
                        .customInput
                            input#modifyCors(:disabled="updatingValue.cors || null" type="text" placeholder='https://your.domain.com' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")
                        template(v-if="updatingValue.cors")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            input#submitInp(type="submit" hidden)
                            label.material-symbols-outlined.big.save(for='submitInp') done
                            .material-symbols-outlined.sml.cancel(@click="modifyMode.cors = false;") close
                    template(v-else)
                        span.ellipsis.pencil {{ currentService.service.cors || 'No cors' }}
            .state
                .smallTitle 
                    | Secret Key
                    span.material-symbols-outlined.fill.clickable.edit(@click="editApiKey" :class="{'nonClickable' : !user?.email_verified}") edit
                template(v-if="modifyMode.api_key")
                    form.modifyInputForm(@submit.prevent="changeApiKey")
                        .customInput
                            input(:disabled="updatingValue.api_key || null" type="text" placeholder="Secret key for external request" :value='inputKey' @input="(e) => inputKey = e.target.value")
                        template(v-if="updatingValue.api_key")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            input#submitInp(type="submit" hidden)
                            label.material-symbols-outlined.save(for='submitInp') done
                            .material-symbols-outlined.cancel(@click="modifyMode.api_key = false;") close
                .smallValue.ellipsis.edit(v-else) {{ currentService.service.api_key || 'No api_key' }}
            form.state(@submit.prevent="changeClientKey")
                label.smallTitle Client Secret Key
                template(v-if="modifyMode.client_key")
                    input#submitInp(type="submit" hidden)
                    .buttonWrap(style="padding: 12.5px 0;")
                        label.material-symbols-outlined.clickable.save(for='submitInp' style="margin-right:8px") check
                        .material-symbols-outlined.clickable.cancel(@click="modifyMode.client_key=false") close
                template(v-else)
                    .material-symbols-outlined.fill.clickable.edit(@click="editClientKey" style="padding: 12.5px 0;") edit
                .keyBox
                    .header 
                        .keyName(style="width:150px") keyName
                        .secretKey(style="flex-grow:1") secretKey
                    .content(v-if="clientSecretKeys")
                        .inner 
                            .keyWrap(ref="keyWrap")
                            .addButtonRow(v-if="modifyMode.client_key" @click="addSecretKey") 
                                .material-symbols-outlined.fill.clickable(style="color:unset") add_box
                                span Add Secret Key
                            .empty(v-else) 
                                br
                                br
                                br
                                | No Secret Key
    
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
                    .customSelect(@click.stop="(e)=>{showDropDown(e)}" :class="{'nonClickable' : updatingValue.client_key}")
                        button
                            span {{ currentService.service?.prevent_signup ? 'Only Admin allowed' : 'Anyone allowed' || 'Anyone allowed' }}
                            span.material-symbols-outlined arrow_drop_down
                        .moreVert(style="--moreVert-left:0;margin-top:0;display:none")
                            .inner 
                                .more(value="admin" @click="changeCreateUserMode('admin')") Only Admin allowed
                                .more(value="anyone" @click="changeCreateUserMode('anyone')") Anyone allowed
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
import { createApp, ref, nextTick, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showDropDown } from '@/assets/js/event.js'
import { currentService } from '@/views/service/main';
import { user } from '@/code/user';
import ClientKey from '@/views/service/client_key.vue';

const router = useRouter();
const route = useRoute();

console.log(currentService)

let inputName = '';
let inputCors = '';
let inputKey = '';
let modifyMode = reactive({
    name: false,
    cors: false,
    api_key: false,
    client_key : false
})
let updatingValue = reactive({
    name: false,
    cors: false,
    api_key: false,
    client_key : false
});
let keyWrap = ref(null);
let clientSecretKeys = ref([]);
// let clientSecretKeys = ref([
//     { key: 'aaaaa', value: 'apd210dkfjseoddj' },
//     { key: 'bbbbb', value: 'apd210dkfjseoddj' },
//     { key: 'ccccc', value: 'apd210dkfjseoddj' },
//     { key: 'ddddd', value: 'apd210dkfjseoddj' }
// ])

let editClientKey = () => {
    modifyMode.client_key = true;
    // if(!clientSecretKeys.value.length) {
    //     addSecretKey();
    // }
    nextTick(() => {
        let scrollTarget = document.querySelector('.keyBox .content');
        if (scrollTarget.getBoundingClientRect().height < scrollTarget.scrollHeight) {
            scrollTarget.scrollTop = scrollTarget.scrollHeight;
        }
    })
}
let addSecretKey = () => {
    let keyComponent = createComponent();
    // keyComponent.mount(keyWrap.value);
    keyWrap.value.appendChild(keyComponent)
    // let addKey = reactive({ key: '', value: '' });
    // clientSecretKeys.value.push(addKey);
    // Object.assign(clientSecretKeys, { key: '', value: '' })
    nextTick(() => {
        let scrollTarget = document.querySelector('.keyBox .content');
        if (scrollTarget.getBoundingClientRect().height < scrollTarget.scrollHeight) {
            scrollTarget.scrollTop = scrollTarget.getBoundingClientRect().height + 30;
        }
    })
}
let createComponent = () => {
    // const keyComponent = createApp(ClientKey, {
    //     modifyMode: modifyMode.client_key,
    //     updatingValue: updatingValue.client_key
    // });
    const keyComponent = new ClientKey({
        modifyMode: modifyMode.client_key,
        updatingValue: updatingValue.client_key
    })
    return keyComponent;
}
let changeClientKey = () => {
    
}
if(currentService.service?.client_secret) {
    console.log(currentService.service)
    console.log(currentService.service?.client_secret)
} else {
    
}

// edit/change name
let editName = () => {
    if (user.email_verified) {
        inputName = currentService.service.name;
        modifyMode.name = true;
    } else {
        return false;
    }
}
let changeName = () => {
    if (currentService.service.name !== inputName) {
        let previous = currentService.service.name;

        updatingValue.name = true;

        currentService.updateService({
            name: inputName
        }).then(() => {
            updatingValue.name = false;
            currentService.service.name = inputName;
            modifyMode.name = false;
        }).catch(err => {
            updatingValue.name = false;
            currentService.service.name = previous;
            throw err;
        });
    } else {
        return false;
    }
}

// edit/change cors
let editCors = () => {
    inputCors = currentService.service.cors === '*' ? '' : currentService.service.cors;
    modifyMode.cors = true;
}
let changeCors = () => {
    updatingValue.cors = true;

    currentService.updateService({
        cors: inputCors
    }).then(() => {
        updatingValue.cors = false;
        currentService.service.cors = inputCors;
        modifyMode.cors = false;
    }).catch(err => {
        updatingValue.cors = false;
        nextTick(() => {
            document.getElementById('modifyCors').focus();
            document.getElementById('modifyCors').setCustomValidity(err.message);
            document.getElementById('modifyCors').reportValidity();
        });
    });
}

// edit/change api_key
let editApiKey = () => {
    inputKey = currentService.service.api_key;
    modifyMode.api_key = true;
}
let changeApiKey = () => {
    let previous = currentService.service.api_key;
    
    updatingValue.api_key = true;
    
    currentService.updateService({
        api_key: inputKey
    }).then(() => {
        updatingValue.api_key = false;
        currentService.service.api_key = inputKey;
        modifyMode.api_key = false;
    }).catch(err => {
        currentService.service.api_key = previous;
        throw err;
    });
}

// change prevent_signup
let changeCreateUserMode = (value:string) => {
    updatingValue.client_key = true;

    let boolean = value == 'admin' ? true : false;

    currentService.setServiceOption({
        prevent_signup: boolean,
    }).then(() => {
        updatingValue.client_key = false;
        currentService.service.prevent_signup = boolean;
    })
}

let dateFormat = (timestamp) => {
    let currentDate = new Date(timestamp);
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let day = ('0' + currentDate.getDate()).slice(-2);
    let dateStr = `${year}-${month}-${day}`;

    return dateStr;
}

let copy = () => {
    let code = document.getElementById('code');
    let doc = document.createElement('textarea');
    doc.textContent = code.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    let copyMsg = document.getElementById('copyMsg');
    copyMsg.textContent = 'Copied'
}


</script>

<style lang="less" scoped>
.smallTitle {
    display: inline-block;
    width: 200px;
    // padding: 12.5px 0;
}
.smallValue {
    display: inline-block;
    // height: 44px;
    // line-height: 44px;
    // margin-top: 8px;
}
.flexInfo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
}
.state {
    margin-bottom: 0.75rem;

    .edit {
        margin-left: 5px;
    }
}
.ellipsis {
    max-width: 100%;
}
.modifyInputForm {
    width: 100%;
    margin-top: 0.25rem;
}
.serviceState {
    position: relative;
    display: inline-block;

    &.security {
        width: 100%;
    }

    &.subs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}
.keyBox {
    width: 100%;
    height: 200px;
    padding: 0 16px;
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, 0.10);
    border-radius: 8px;
    overflow: hidden;

    .inner {
        min-width: 420px;
    }
    .header {
        height: 36px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.8rem;
        gap: 20px;
    }
    .content {
        height: calc(100% - 38px);
        padding: 8px 0;
        overflow: auto;
    }
    .keyWrap {
        margin-bottom: 8px;
    }
    .addButtonRow {
        text-align: center;
        padding: 6px 0;
        // margin-bottom: 8px;
        color: var(--main-color);
        background-color: #293fe60d;
        border-radius: 4px;
        font-size: .7rem;
        font-weight: 500;
        cursor: pointer;
    }
    .empty {
        text-align: center;
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

    .copy {
        display: inline-block;
        text-align: right;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
    }
    .scrollWrap {
        background: rgba(0,0,0,0.8);
        margin-top: 8px;
        border-radius: 8px;
        box-shadow: 3px 9px 6px 0px rgba(0, 0, 0, 0.15);
        color: #FFF;
        overflow-x: auto;
    
        .scrollInner {
            font-size: 20px;
            font-size: 16px;
            margin: 0;
            padding: 1rem;
        }
    }
}
.question {
    display: inline-block;
    text-decoration: none;
    font-weight: bold;
    color: var(--main-color);
    font-size: 14px;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }

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