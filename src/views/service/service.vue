<template lang="pug">

section.infoBox
    h2 Service Settings

    hr

    
    .error(v-if='!user?.email_verified')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        router-link(to="/account-setting") Please verify your email address to modify settings.
        br
        br

    .error(v-else-if='currentService.service.active == 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently disabled.
        br
        br

    .error(v-else-if='currentService.service.active < 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently suspended.
        br
        br

    //- .state 
    //-     .smallTitle State
    //-     .smallValue
    //-         span(v-if="currentService.service.active == 0" style="color:var(--caution-color);") Disabled
    //-         span(v-else-if="currentService.service.active <= -1" style="color:var(--caution-color);") Suspended
    //-         span(v-else-if="currentService.service.active >= 1") Running
    //-         span(v-else) -

    .state
        .smallTitle Service ID
        .smallValue {{ currentService.id }}


    .state
        .smallTitle Subscription
        .smallValue(:style='{fontWeight:currentService.service.plan == "Canceled" ? "normal" : null, color:currentService.service.plan == "Canceled" ? "var(--caution-color)" : null}')
            span {{ currentService.service.plan || currentService.plan }}&nbsp;
            router-link.editHandle(v-if="currentService.service.group !== 51 && currentService.service.group !== 52" :to='`/subscription/${currentService.id}`') [CHANGE]

    .state 
        .smallTitle {{currentService.service.plan == "Canceled" ? '-' : 'Renewal Date'}}
        .smallValue(:style='{color: (currentService.service.plan == "Canceled" || currentService.plan == "Trial") ? "var(--caution-color)" : null, fontWeight: (currentService.service.plan == "Canceled" || currentService.plan == "Trial") ? "normal" : null}' )
            template(v-if="currentService.plan == 'Trial'" style="color:var(--caution-color)") All Data will reset on {{ resetTime(currentService.service.timestamp) }}
            template(v-else-if='currentService.service.plan == "Canceled" && !currentService.service.suspended' style="color:var(--caution-color)") Suspends on {{ dateFormat(currentService.subscription?.current_period_end * 1000) }}
            template(v-else-if='currentService.service.suspended' style="color:var(--caution-color)") Terminates on {{ dateFormat(2592000000 + currentService.subscription.cancel_at * 1000) }}
            template(v-else) {{currentService.subscription?.current_period_end ? dateFormat(currentService.subscription?.current_period_end * 1000) : '-' }}

    br

    .state
        .smallTitle Date Created
        .smallValue {{ currentService.dateCreated }}


    .state 
        .smallTitle Users
        .smallValue {{ currentServiceSpec.dataSize?.users }} / {{ currentServiceSpec.servicePlan.users }}

    .state 
        .smallTitle Database
        .smallValue {{ currentServiceSpec.dataSize?.database }} / {{ currentServiceSpec.servicePlan.storage.database }}

    .state 
        .smallTitle File Storage
        .smallValue {{ currentServiceSpec.dataSize?.cloud }} / {{ currentServiceSpec.servicePlan.storage.cloud }}

    template(v-if="currentService.plan !== 'Trial'")
        .state 
            .smallTitle File Hosting
            .smallValue {{ currentServiceSpec.dataSize?.host }} / {{ currentServiceSpec.servicePlan.storage.host }}

        .state 
            .smallTitle Email Storage
            .smallValue {{ currentServiceSpec.dataSize?.email }} / {{ currentServiceSpec.servicePlan.storage.email }}

    hr(style='margin-top: 1.5rem;')

    .infoValue(:class="{'nonClickable' : !user?.email_verified && currentService.service.suspended}" style='display: flex;align-items: center;margin-bottom: 0;min-height: 0;gap: 10px;')
        .smallTitle Disable/Enable
        Toggle(
            style='display:inline-flex;align-items:center;'
            :disabled="!user?.email_verified || currentService.service.suspended || updatingValue.enableDisable"
            :active="currentService.service.active >= 1"
            @click="enableDisable"
        )
        Tooltip(tip-background-color="var(--main-color)" text-color="white")
            template(v-slot:tip)
                | When the service is disabled, users cannot access the service.

    div(:class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
        .infoValue(style='display: flex;align-items: center;min-height: 0; margin-bottom:0;gap: 10px;')
            .smallTitle Allow Signup
            Toggle(
                style='display:inline-flex;align-items:center;'
                :active='!currentService.service.prevent_signup'
                :disabled='updatingValue.prevent_signup'
                @click="changeCreateUserMode(!currentService.service.prevent_signup)"
            )
            Tooltip(tip-background-color="var(--main-color)" text-color="white")
                template(v-slot:tip)
                    | When signup is disallowed, only the administrator can create accounts.

        .infoValue(style='display: flex;align-items: center;min-height: 0; margin-bottom:0; gap: 10px;')
            .smallTitle Prevent Inquiry
            Toggle(
                style='display:inline-flex;align-items:center;'
                :active='currentService.service.prevent_inquiry'
                :disabled='updatingValue.prevent_inquiry'
                @click="changePreventInquiry(!currentService.service.prevent_inquiry)"
            )
            Tooltip(tip-background-color="var(--main-color)" text-color="white")
                template(v-slot:tip)
                    | You can prevent users from sending inquiries via sendInquiry() to the service.
        
        .infoValue(style='display: flex;align-items: center;min-height: 0;gap: 10px;')
            .smallTitle Freeze Database
            Toggle(
                style='display:inline-flex;align-items:center;'
                :active='currentService.service.freeze_database'
                :disabled='updatingValue.freeze_database'
                @click="changeFreezeDatabase(!currentService.service.freeze_database)"
            )
            Tooltip(tip-background-color="var(--main-color)" text-color="white")
                template(v-slot:tip)
                    | You can prevent users from uploading any data to the database by freezing the database.
        
        br

        .infoValue
            .smallTitle Service Name:
            template(v-if="modifyMode.name")
                form.editValue(@submit.prevent="changeName")
                    input.big(type="text" ref="focus_name" placeholder="Maximum 40 characters" maxlength="40" :value='inputName' @input="(e) => inputName = e.target.value" :disabled="updatingValue.name" required)

                    template(v-if="updatingValue.name")
                        .loader(style="--loader-color:blue; --loader-size:12px")
                    template(v-else)
                        input#saveHiddenInput(type="submit" hidden)
                        label(for="saveHiddenInput") <!-- done -->
                            svg.svgIcon.save(style="height: 30px; width: 30px;")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-check")
                    //- span.material-symbols-outlined.notranslate.cancel(@click="modifyMode.name = false;") close
                    svg.svgIcon.cancel(@click="modifyMode.name = false;" style="height: 30px; width: 30px; fill: black")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-close")

            div(v-else)
                .smallValue
                    | {{ currentService.service.name }}&nbsp;
                    span.editHandle(@click="editName") [EDIT]

        .infoValue
            .smallTitle CORS:
            template(v-if="modifyMode.cors")
                form.editValue(@submit.prevent="changeCors")
                    input#modifyCors.big(ref="focus_cors" :disabled="updatingValue.cors || null" type="text" placeholder='https://your.domain.com, http://second.domain.net, ...' :value='inputCors' @input="(e) => {e.target.setCustomValidity(''); inputCors = e.target.value;}")

                    template(v-if="updatingValue.cors")
                        .loader(style="--loader-color:blue; --loader-size:12px")
                    template(v-else)
                        input#saveHiddenInput2(type="submit" hidden)
                        label(for="saveHiddenInput2")
                            svg.svgIcon.save(style="height: 30px; width: 30px;")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-check")
                    //- span.material-symbols-outlined.notranslate.cancel(@click="modifyMode.cors = false;") close
                    svg.svgIcon.cancel(@click="modifyMode.cors = false;" style="height: 30px; width: 30px; fill: black")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-close")

            div(v-else)
                .smallValue {{ currentService.service.cors || '*' }}&nbsp;
                    span.editHandle(@click="editCors") [EDIT]

        .infoValue
            .smallTitle Secret Key:
            template(v-if="modifyMode.api_key")
                form.editValue(@submit.prevent="changeApiKey")
                    input.big(ref="focus_key" :disabled="updatingValue.api_key || null" type="text" minlength="4" maxlength="256" placeholder='Maximum 256 characters, At least 4 characters.' :value='inputKey' @input="(e) => inputKey = e.target.value")

                    template(v-if="updatingValue.api_key")
                        .loader(style="--loader-color:blue; --loader-size:12px")
                    template(v-else)
                        input#saveHiddenInput3(type="submit" hidden)
                        label(for="saveHiddenInput3")
                            svg.svgIcon.save(style="height: 30px; width: 30px;")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-check")
                    //- label.material-symbols-outlined.notranslate.save(v-else) done
                        input(type="submit" hidden)
                    //- span.material-symbols-outlined.notranslate.cancel(@click="modifyMode.api_key = false;") close
                    svg.svgIcon.cancel(@click="modifyMode.api_key = false;" style="height: 30px; width: 30px; fill: black")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-close")

            div(v-else)
                .ellipsis {{ currentService.service.api_key ? currentService.service.api_key.slice(0, 2) + '*'.repeat(currentService.service.api_key.length - 2) + '...' : 'No Secret Key' }}&nbsp;
                span.editHandle(@click="editApiKey" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") [EDIT]
    
    template(v-if="currentService.plan == 'Trial' || currentService.plan == 'Unlimited' || currentService.service.plan == 'Canceled'")
        hr
        div(style="text-align:right")
            router-link.iconClick.square(:to='"/delete-service/" + currentService.id' style='color:var(--caution-color);font-size:0.66rem;')
                //- .material-symbols-outlined.notranslate.fill(style='font-size:24px;') delete
                svg.svgIcon.cancel(style="height: 22px; width: 22px; fill: var(--caution-color)")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")
                span &nbsp;Delete Service

</template>

<script setup lang="ts">
import { nextTick, reactive, ref, computed, onMounted } from 'vue';
import { currentService } from '@/views/service/main';
import { dateFormat } from '@/code/admin';
import { devLog } from '@/code/logger';
import { user } from '@/code/user';
import { currentServiceSpec } from '@/views/service/service-spec';

import Toggle from '@/components/toggle.vue';
import Tooltip from '@/components/tooltip.vue';

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
    prevent_signup: false,
    enableDisable: false,
    prevent_inquiry: false,
    freeze_database: false,
});
let focus_name = ref();
let focus_cors = ref();
let focus_key = ref();

let resetTime = (timestamp:number) => {
  // Convert the timestamp to a Date object
  let startDate = new Date(timestamp); // assuming the timestamp is in seconds
  let today = new Date();
  let resetDay = 14;

  // Calculate the difference in days
  const diffInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  // Calculate the number of days since the last 7-day cycle
  const daysSinceLastCycle = diffInDays % resetDay;

  // Calculate the number of days until the next cycle
  let daysUntilNextCycle = (resetDay - daysSinceLastCycle) % resetDay;

  // If the cycle has just started today, then daysUntilNextCycle will be 0.
  // In that case, we want to return 7 (the next cycle will start in 7 days).
  if (daysUntilNextCycle === 0) {
    daysUntilNextCycle = resetDay;
  }

  // Add the number of days until the next cycle to today's date
  today.setDate(today.getDate() + daysUntilNextCycle);

  // Return the date as a 13-digit timestamp
  return dateFormat(today.getTime());
}

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
        let regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        if (inputName.match(regex)) {
            alert('Special characters are not allowed');

            return
        }

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

// change prevent_signup
let changeCreateUserMode = async (onlyAdmin: boolean) => {
    updatingValue.prevent_signup = true;
    currentService.setServiceOption({
        prevent_signup: onlyAdmin,
    }).catch(err=>{
        alert(err.message);
    }).finally(() => {
        updatingValue.prevent_signup = false;
    });
}
let enableDisable = async ()=>{
    updatingValue.enableDisable = true;
    try {
        if(currentService.service.active >= 1)
            await currentService.disableService()
        else
            await currentService.enableService()
    }
    catch (error) {
        window.alert(error.message)
        throw error;
    }
    finally {
        updatingValue.enableDisable = false;
    }
}

// change prevent_inquiry
let changePreventInquiry = async (onlyAdmin: boolean) => {
    updatingValue.prevent_inquiry = true;
     currentService.setServiceOption({
        prevent_inquiry: onlyAdmin,
     }).catch(err=>{
        alert(err.message);
    }).finally(() => {
        updatingValue.prevent_inquiry = false;
    });
}

// change freeze_database
let changeFreezeDatabase = async (onlyAdmin: boolean) => {
    updatingValue.freeze_database = true;
     currentService.setServiceOption({
        freeze_database: onlyAdmin,
     }).catch(err=>{
        alert(err.message);
    }).finally(() => {
        updatingValue.freeze_database = false;
    });
}
</script>

<style lang="less" scoped>
.question {
    display: inline-block;
    font-size: 14px;
    color: var(--black-4);
    vertical-align: middle;

    &:hover {
        text-decoration: none;
    }
}
.svgIcon.nohover {
    background-color: unset;
}
.svgIcon:hover {
    border-radius: 50%;
    background-color: #293FE61A;
}
</style>