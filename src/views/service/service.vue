<template lang="pug">
h2 Getting Started

hr

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

    .state.nobreak
        .smallTitle Service ID
        .ellipsis {{ currentService.id }}

    .state.nobreak
        .smallTitle Owner ID
        .ellipsis {{ currentService.service.owner }}

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
        .smallTitle Hosting
        .smallValue {{ (currentService.storageInfo.host || '0') + 'B' }} / 
            span(v-if="currentService.plan == 'Trial' || currentService.plan == 'Standard' || currentService.plan == 'Free Standard'") 50GB
            span(v-else-if="currentService.plan == 'Premium'") 1TB
            span(v-else-if="currentService.plan == 'Unlimited'") Unlimited

    br

    .state 
        .smallTitle Subscription
        .smallValue(:style='{fontWeight:currentService.service.plan == "Canceled" ? "normal" : null, color:currentService.service.plan == "Canceled" ? "var(--caution-color)" : null}')
            | {{ currentService.service.plan }}&nbsp;
            router-link.editHandle(:to='`/subscription/${currentService.id}`' @click="editCors") [CHANGE]

    .state 
        .smallTitle Renewal Date
        .smallValue 
            template(v-if="currentService.plan == 'Trial'" style="color:var(--caution-color)") All Data will be deleted by {{ dateFormat(currentService.service.timestamp + 604800000) }}
            template(v-else-if="currentService.service.active >= 0") {{ currentService?.subscription?.current_period_end ? dateFormat(currentService?.subscription?.current_period_end * 1000) : '-' }}
            template(v-else) -

br

section.infoBox
    .error(v-if='!user?.email_verified')
        .material-symbols-outlined.fill warning
        router-link(to="/account-setting") Please verify your email address to modify settings.
    .infoTitle(v-else style="margin-right: 1rem;")
        | Settings&nbsp;
        a.question(href='https://docs.skapi.com/security/security-settings.html' target="_blank")
            .material-symbols-outlined.empty help 
            span Help
        br


    hr

    div(:class="{'nonClickable' : !user?.email_verified || currentService.service.active == 0 || currentService.service.active == -1}")
        .infoValue
            .smallTitle Service Name
            template(v-if="modifyMode.name")
                form.editValue(@submit.prevent="changeName")
                    input(type="text" ref="focus_name" placeholder="Maximum 40 characters" maxlength="40" :value='inputName' @input="(e) => inputName = e.target.value" required)

                    template(v-if="updatingValue.name")
                        img.loading(src="@/assets/img/loading.png")
                    label.material-symbols-outlined.save(v-else) done
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(@click="modifyMode.name = false;") close

            div(v-else)
                .smallValue {{ currentService.service.name }}&nbsp;
                span.editHandle(@click="editName" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") [EDIT]

        .infoValue
            .smallTitle CORS
            template(v-if="modifyMode.cors")
                form.editValue(@submit.prevent="changeCors")
                    input#modifyCors(ref="focus_cors" :disabled="updatingValue.cors || null" type="text" placeholder='https://your.domain.com, http://second.domain.net, ...' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")

                    template(v-if="updatingValue.cors")
                        img.loading(src="@/assets/img/loading.png")
                    label.material-symbols-outlined.save(v-else) done
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(@click="modifyMode.cors = false;") close

            div(v-else)
                .smallValue {{ currentService.service.cors || '*' }}&nbsp;
                span.editHandle(@click="editCors" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") [EDIT]

        .infoValue
            .smallTitle Secret Key
            template(v-if="modifyMode.api_key")
                form.editValue(@submit.prevent="changeApiKey")
                    input(ref="focus_key" :disabled="updatingValue.api_key || null" type="text" minlength="4" maxlength="256" placeholder='Maximum 256 characters, At least 6 characters.' :value='inputKey' @input="(e) => inputKey = e.target.value")

                    template(v-if="updatingValue.api_key")
                        img.loading(src="@/assets/img/loading.png")
                    label.material-symbols-outlined.save(v-else) done
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(@click="modifyMode.api_key = false;") close

            div(v-else)
                .ellipsis {{ currentService.service.api_key ? currentService.service.api_key.slice(0, 2) + '*'.repeat(currentService.service.api_key.length - 2) + '...' : 'No Secret Key' }}&nbsp;
                span.editHandle(@click="editApiKey" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") [EDIT]

        .infoValue(style='display:flex;align-items:center;min-height:44px;')
            .smallTitle User Signup
            select(@change="(e) => changeCreateUserMode(e.target.value)" :value="currentService.service.prevent_signup ? 'admin' : 'anyone'" :disabled='updatingValue.prevent_signup')
                option(value="admin") Only admin allowed
                option(value="anyone") Anyone allowed

    //- .infoValue(:class="{'nonClickable' : !user?.email_verified}" style='display: flex;align-items: center;min-height:44px;')
    //-     .smallTitle Disable/Enable
    //-     Toggle(style='display:inline-flex;' :disabled="!user?.email_verified || currentService.service.active == -1" :active="currentService.service.active >= 1"  @click="currentService.service.active >= 1 ? currentService.disableService() : currentService.enableService()")
br
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
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
let focus_name = ref();
let focus_cors = ref();
let focus_key = ref();

// edit/change name
let editName = () => {
    inputName = currentService.service.name;
    modifyMode.name = true;
    nextTick(() => {
        focus_name.value.focus();
    });
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
    nextTick(() => {
        focus_cors.value.focus();
    });
}
let changeCors = () => {
    updatingValue.cors = true;
    currentService.updateService({
        cors: inputCors
    }).then(() => {
        updatingValue.cors = false;
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
    nextTick(() => {
        focus_key.value.focus();
    });
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
    padding: 4px;
    margin: 0;
    outline: none;
    border: 0;
    border-radius: 4px;
    font-size: 0.8rem;
    background-color: rgba(0, 0, 0, 0.05);
    font-family: inherit;
    font-weight: normal;

    &:disabled {
        opacity: 0.5;
    }

    &:not(:disabled) {
        cursor: pointer;
    }

    &:not(:disabled):hover {
        text-decoration: underline;
    }
}

.question {
    display: inline-block;
    font-size: 14px;
    color: var(--black-4);
    vertical-align: middle;

    &:hover {
        text-decoration: none;
    }
}
</style>