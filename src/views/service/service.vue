<template lang="pug">
h2 Getting Started
p Add the following code to your HTML website to get started:

Code
    pre.
        #[span(style="color:#999") &lt;]#[span(style="color:#44E9FF") script]#[span(style="color:#44E9FF") &nbsp;src]=#[span(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]#[span(style="color:#999") &gt;&lt;/]#[span(style="color:#44E9FF") script]#[span(style="color:#999") &gt;]
        #[span(style="color:#999") &lt;]#[span(style="color:#44E9FF") script]#[span(style="color:#999") &gt;]
            #[span(style="color:#33adff") const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "{{ currentService.id }}"], #[span(style="color:#FFED91") "{{ currentService.owner }}"]);
        #[span(style="color:#999") &lt;/]#[span(style="color:#44E9FF") script]#[span(style="color:#999") &gt;]

br

h4 For SPA Projects:

p 1. Install the package:

Code
    pre npm install skapi-js

br

p 2. Initialize Skapi from your main.js:

Code
    pre.
        #[span(style="color:#999") // main.js]
        #[span(style="color:#44E9FF") import] { Skapi } #[span(style="color:#44E9FF") from] #[span(style="color:#FFED91") "skapi-js"]
        #[span(style="color:#33adff") const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "{{ currentService.id }}"], #[span(style="color:#FFED91") "{{ currentService.owner }}"]);
        #[span(style="color:#44E9FF") export] { skapi } #[span(style="color:#999") // Import the instance in your components]

p For more details, please refer to the #[a(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank") Documentation]

br

section.infoBox
    .infoTitle(style="margin-right: 1rem;") Dashboard&nbsp;

    hr
    br

    .state 
        .smallTitle Service ID
        .smallValue.ellipsis {{ currentService.id }}

    .state
        .smallTitle Owner ID
        .smallValue.ellipsis {{ currentService.service.owner }}

    br

    .state
        .smallTitle Date Created
        .smallValue {{ currentService.dateCreated }}

    .state 
        .smallTitle State
        .smallValue
            span(v-if="currentService.service.active == 0") Disabled
            span(v-else-if="currentService.service.active == -1 && currentService?.subscription?.status == 'canceled'" style="color:var(--caution-color)") Suspended
            span(v-else) Running

    .state 
        .smallTitle Host URL
        .smallValue {{ currentService.service.subdomain ? currentService.service.subdomain + '.skapi.com' : 'Not hosted' }}

    br

    .state 
        .smallTitle Users 
        .smallValue {{ currentService.service.users }} / 
            span(v-if="currentService.plan == 'Trial' || currentService.plan == 'Standard' || currentService.plan == 'Free Standard'") 10K
            span(v-else-if="currentService.plan == 'Premium'") 100K
            span(v-else-if="currentService.plan == 'Unlimited'") Unlimited

    .state 
        .smallTitle Database 
        .smallValue {{ (currentService.storageInfo.database || '0') + 'B' }} / 
            span(v-if="currentService.plan == 'Trial' || currentService.plan == 'Standard' || currentService.plan == 'Free Standard'") 4GB
            span(v-else-if="currentService.plan == 'Premium'") 100GB
            span(v-else-if="currentService.plan == 'Unlimited'") Unlimited

    .state 
        .smallTitle File Storage
        .smallValue {{ (currentService.storageInfo.cloud || '0') + 'B' }} / 
            span(v-if="currentService.plan == 'Trial' || currentService.plan == 'Standard' || currentService.plan == 'Free Standard'") 50GB
            span(v-else-if="currentService.plan == 'Premium'") 1TB
            span(v-else-if="currentService.plan == 'Unlimited'") Unlimited

    .state 
        .smallTitle Email Storage
        .smallValue {{ (currentService.storageInfo.email || '0') + 'B' }} / 
            span(v-if="currentService.plan == 'Trial' || currentService.plan == 'Standard' || currentService.plan == 'Free Standard'") 1GB
            span(v-else-if="currentService.plan == 'Premium'") 10GB
            span(v-else-if="currentService.plan == 'Unlimited'") Unlimited

    .state 
        .smallTitle Hosting Storage
        .smallValue {{ (currentService.storageInfo.host || '0') + 'B' }} / 
            span(v-if="currentService.plan == 'Trial' || currentService.plan == 'Standard' || currentService.plan == 'Free Standard'") 50GB
            span(v-else-if="currentService.plan == 'Premium'") 1TB
            span(v-else-if="currentService.plan == 'Unlimited'") Unlimited

    br

    .state 
        .smallTitle Subscription Plan
        .smallValue(:style='{fontWeight:currentService.service.plan == "Canceled" ? "normal" : null, color:currentService.service.plan == "Canceled" ? "var(--caution-color)" : null}')
            | {{ currentService.service.plan }}&nbsp;
            router-link.edit(:to='`/subscription/${currentService.id}`' style='font-size: 0.66rem;' @click="editCors") [Manage]

    .state 
        .smallTitle Renewal Date
        .smallValue 
            template(v-if="currentService.plan == 'Trial'" style="color:var(--caution-color)") All Data will be deleted by {{ dateFormat(currentService.service.timestamp + 604800000) }}
            template(v-else-if="currentService.service.active >= 0") {{ currentService?.subscription?.current_period_end ? dateFormat(currentService?.subscription?.current_period_end * 1000) : '-' }}
            template(v-else) -

br

section.infoBox
    .infoTitle(style="margin-right: 1rem;")
        | Settings&nbsp;
        a.question(href='https://docs.skapi.com/security/security-settings.html' target="_blank")
            .material-symbols-outlined.empty help 
            span Help

    hr
    br

    div(:class="{'nonClickable' : !user?.email_verified || currentService.service.active == 0 || currentService.service.active == -1}")
        .infoValue
            .smallTitle Service Name
            template(v-if="modifyMode.name")
                form.editValue(@submit.prevent="changeName")
                    input(type="text" placeholder="Maximum 40 characters" maxlength="40" :value='inputName' @input="(e) => inputName = e.target.value" required)

                    template(v-if="updatingValue.name")
                        img.loading(src="@/assets/img/loading.png")
                    label.material-symbols-outlined.save(v-else) done
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(@click="modifyMode.name = false;") close

            div(v-else)
                .smallValue {{ currentService.service.name }}&nbsp;
                span.edit(style='font-size: 0.66rem;' @click="editName" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") [EDIT]

        .infoValue
            .smallTitle CORS
            template(v-if="modifyMode.cors")
                form.editValue(@submit.prevent="changeCors")
                    input#modifyCors(:disabled="updatingValue.cors || null" type="text" placeholder='https://your.domain.com, http://second.domain.net, ...' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")

                    template(v-if="updatingValue.cors")
                        img.loading(src="@/assets/img/loading.png")
                    label.material-symbols-outlined.save(v-else) done
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(@click="modifyMode.cors = false;") close

            div(v-else)
                .smallValue {{ currentService.service.cors || '*' }}&nbsp;
                span.edit(style='font-size: 0.66rem;' @click="editCors" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") [EDIT]


        .infoValue
            .smallTitle Secret Key
            template(v-if="modifyMode.api_key")
                form.editValue(@submit.prevent="changeApiKey")
                    input(:disabled="updatingValue.api_key || null" type="text" maxlength="256" placeholder='Maximum 256 characters' :value='inputKey' @input="(e) => inputKey = e.target.value")

                    template(v-if="updatingValue.api_key")
                        img.loading(src="@/assets/img/loading.png")
                    label.material-symbols-outlined.save(v-else) done
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(@click="modifyMode.api_key = false;") close

            div(v-else)
                .smallValue {{ currentService.service.api_key ? currentService.service.api_key.slice(0, 1) + '*'.repeat(currentService.service.api_key.length - 1) : 'No Secret Key' }}&nbsp;
                span.edit(style='font-size: 0.66rem;' @click="editApiKey" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") [EDIT]

        .infoValue
            .smallTitle User Signup
            select(@change="(e) => changeCreateUserMode(e.target.value)" :value="currentService.service.prevent_signup ? 'admin' : 'anyone'" :disabled='updatingValue.prevent_signup')
                option(value="admin") Only admin allowed
                option(value="anyone") Anyone allowed



    .infoValue 
        .smallTitle Disable/Enable
        Toggle(:disabled="!user?.email_verified || currentService.service.active == -1" :active="currentService.service.active >= 1"  @click="currentService.service.active >= 1 ? currentService.disableService() : currentService.enableService()")
br
</template>

<script setup lang="ts">
import { nextTick, reactive } from 'vue';
import { currentService } from '@/views/service/main';
import { user } from '@/code/user';
import Code from '@/components/code.vue';
import Toggle from '@/components/toggle.vue';

console.log(currentService)

let inputName = '';
let inputCors = '';
let inputKey = '';
let modifyMode = reactive({
    name: false,
    cors: false,
    api_key: false,
    prevent_signup: false
})
let updatingValue = reactive({
    name: false,
    cors: false,
    api_key: false,
    prevent_signup: false
});

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

let dateFormat = (timestamp: number) => {
    let currentDate = new Date(timestamp);
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let day = ('0' + currentDate.getDate()).slice(-2);
    let dateStr = `${year}-${month}-${day}`;

    return dateStr;
}

// change prevent_signup
let changeCreateUserMode = (value: string) => {
    updatingValue.prevent_signup = true;
    let boolean = value == 'admin';
    currentService.setServiceOption({
        prevent_signup: boolean,
    }).then(() => {
        updatingValue.prevent_signup = false;
        currentService.service.prevent_signup = boolean;
    })
}
</script>

<style lang="less" scoped>
select {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: none;
    border: 0;
    font-size: 0.9rem;
    margin-left: -2px;
    background-color: white;
    font-family: inherit;
    font-weight: 300;

    &:not(:disabled) {
        cursor: pointer;
    }

    &:not(:disabled)::hover {
        text-decoration: underline;
    }
}

.smallTitle {
    display: inline-block;
    width: 160px;
}

.smallValue {
    display: inline-block;
}

.edit {
    // edit button
    font-weight: normal;
    color: var(--main-color);
    text-decoration: none;
    vertical-align: middle;

    &:hover {
        text-decoration: underline;
    }

    cursor: pointer;
}

.infoValue {
    display: flex;
    align-items: center;
    max-width: 100%;
    flex-wrap: wrap;
    min-height: 52px;
    margin-bottom: 8px;

    &>* {
        margin-bottom: 8px;
        .smallValue {
            word-break: break-all;
        }
        &:not(select):last-child {
            min-height: 44px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }
    }

    .editValue {
        display: flex;
        align-items: center;
        flex-grow: 1;
        position: relative;
        flex-wrap: nowrap !important;
        
        .loading {
            vertical-align: middle;
            margin-right: 10px;
        }

        .save,
        .cancel {
            position: relative;
            font-size: 1.3rem;
            font-weight: 500;
            cursor: pointer;

            &::after {
                position: absolute;
                content: '';
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                padding: 4px;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                background-color: #293FE61A;
                display: none;
            }

            &:hover::after {
                display: block;
            }
        }

        .save {
            color: var(--main-color);
            margin-right: 10px;
        }

        input {
            flex-grow: 1;
            width: 160px;
            height: 44px;
            border-radius: 8px;
            margin-right: 10px;
            background-color: rgba(0, 0, 0, 0.05);
            border: 0;
            color: rgba(0, 0, 0, 0.8);
            font-size: 0.8rem;
            padding: 0 12px;
        }
    }
}

.state {
    margin-bottom: 0.75rem;
}

.question {
    display: inline-block;
    text-decoration: none;
    color: var(--main-color);
    font-size: 14px;
    color: var(--black-4);
    vertical-align: middle;

    &:hover {
        text-decoration: underline;
    }
}
</style>