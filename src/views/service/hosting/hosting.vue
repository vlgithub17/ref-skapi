<template lang="pug">
.infoBox(v-if='!user?.email_verified || !currentService.service.subdomain' style='max-width:600px;margin:3rem auto;')
    .infoTitle Hosting 

    hr

    p.
        File hosting service let you host files and static websites.
        #[br]
        To host your public files, please register a subdomain.

    p The subdomain can only be #[span.wordset alphanumeric and hyphen,] #[span.wordset min 4 characters] and #[span.wordset max 32 characters.]
    br

    form.register(@submit.prevent='registerSubdomain')
        .subdomain
            input.big(v-model='subdomain' pattern='^[a-z\\d](?:[a-z\\d\\-]{0,61}[a-z\\d])?$' minlength="4" maxlength="32" :disabled="promiseRunning" placeholder="your-subdomain" required)
        button.final(style='min-width: 124px;' :disabled='promiseRunning' :class='{nonClickable: promiseRunning}')
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                | Register

.infoBox(v-else :class='{nonClickable: !user?.email_verified || currentService.service.active <= 0 || currentSubdomain.status !== "Active"}')
    .infoTitle
        | Hosting&nbsp;&nbsp;
        small(style='font-weight: normal' :style='{color: currentSubdomain.status === "Active" ? "var(--text-green)" : currentSubdomain.status === "Removing" ? "var(--caution-color)" : null } ') ({{ currentSubdomain.status }})

    hr

    .infoValue
        .smallTitle URL
        .smallValue
            template(v-if="modifyMode.subdomain")
                form.register.editValue(@submit.prevent="changeSubdomain")
                    .subdomain
                        input#modifySubdomain.big(ref="focus_subdomain" :disabled="updatingValue.subdomain || null" type="text"  pattern='^[a-z\\d](?:[a-z\\d\\-]{0,61}[a-z\\d])?$' minlength="4" maxlength="32" placeholder="your-subdomain" required :value='inputSubdomain' @input="(e) => {e.target.setCustomValidity(''); inputSubdomain = e.target.value;}")

                    template(v-if="updatingValue.subdomain")
                        img.loading(src="@/assets/img/loading.png")
                    label.material-symbols-outlined.save(v-else) done
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(@click="modifyMode.subdomain = false;") close

            div(v-else)
                .smallValue {{ currentSubdomain.subdomain }}&nbsp;
                span.editHandle(@click="editSubdomain" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}") [EDIT]
                .infoValue

    .infoValue
        .smallTitle 404 Page
        .smallValue
            template(v-if="modifyMode.page404")
                form.register.editValue(@submit.prevent="change404" style='flex-grow: 0')
                    input(ref="focus_404" hidden type="file" name='file' required @change="handle404file" :disabled='updatingValue.page404' accept="text/html")
                    .input.editHandle(style='font-size: .8rem;margin-right: 8px;' @click='focus_404.click()' :class='{nonClickable:updatingValue.page404}') {{ selected404File || sdInfo?.['404'] || 'Select HTML File' }}
                    template(v-if="updatingValue.page404")
                        //- img.loading(src="@/assets/img/loading.png")
                        pre(style='margin:0;font-size: .8rem;font-weight:normal' v-if='progress404 < 100') {{ progress404 }}%
                        pre(style='margin:0;font-size: .8rem;font-weight:normal' v-else) Updating...
                    label.material-symbols-outlined.save.fill(v-else :class="{'nonClickable' : !selected404File}") upload
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(v-if='!updatingValue.page404' @click="modifyMode.page404 = false;selected404File=null;") close

            div(v-else)
                .smallValue.editValue
                    span.editHandle(style='font-size: .8rem;margin-right: 8px;' @click="open404FileInp") {{ sdInfo?.['404'] || 'Select HTML File' }}
                    span.material-symbols-outlined.cancel.fill(v-if='!updatingValue.page404 && sdInfo?.["404"] && sdInfo?.["404"] !== "..."' @click="modifyMode.page404 = false;selected404File=null;") delete

    br

    div(style="text-align:right")
        .iconClick(@click="removeHosting = true" style='color:var(--caution-color);font-size:0.66rem;')
            .material-symbols-outlined.fill(style='font-size:24px;') cancel
            span &nbsp;Remove Hosting


Modal(:open="removeHosting")
    h4(style='margin:.5em 0 0;') Remove Hosting

    hr

    div(style='font-size:.8rem;')
        p.
            Are you sure you want to remove hosting?
            #[br]
            This will remove all the files and release your subdomain address.
            #[br]
            This action cannot be undone.
    br

    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        template(v-if='removeingHosting')
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine.warning(@click="removeHosting = false") Cancel
            button.final.warning(@click="remove") Remove

</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, nextTick } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { currentService } from '@/views/service/main';
import Code from '@/components/code.vue';
import { dateFormat } from '@/code/admin';
import Table from '@/components/table.vue';
import Modal from '@/components/modal.vue';
import Pager from '@/code/pager';
import { skapi } from '@/code/admin';
import { user } from '@/code/user';


// register input
let subdomain = ref('');
let promiseRunning = ref(false);

let registerSubdomain = async () => {
    promiseRunning.value = true;
    try {
        await currentService.registerSubdomain({
            subdomain: subdomain.value, cb: (srvc) => {
                promiseRunning.value = false;
            }
        });

    } catch (err: any) {
        promiseRunning.value = false;
        alert(err.message);
    }
}
//

// edit/change

let modifyMode = reactive({
    subdomain: false,
    page404: false
})
let updatingValue = reactive({
    subdomain: false,
    page404: false
});
let focus_subdomain = ref();

let inputSubdomain = '';
let editSubdomain = () => {
    inputSubdomain = currentSubdomain.value.subdomain.split('.').slice(0, -2).join('.');
    modifyMode.subdomain = true;
    nextTick(() => {
        focus_subdomain.value.focus();
    });
}

let focus_404 = ref();
let selected404File = ref(null);
let open404FileInp = async () => {
    console.log('yo')
    modifyMode.page404 = true;
    await nextTick();
    focus_404.value.click();
}

let handle404file = (e: any) => {
    let file = e.target.files[0];
    console.log(file);
    let fileName = file.name;
    selected404File.value = fileName;
}
let progress404 = ref(0);
let change404 = async (e: any) => {
    console.log(e);
    updatingValue.page404 = true;

    try {
        let up = await currentService.uploadHostFiles(e, {
            progress: p => {
                progress404.value = Math.floor(p.progress);
            }
        })

        await currentService.set404({
            path: up.completed[0].name,
        });

        sdInfo.value = await currentService.getSubdomainInfo();

        modifyMode.page404 = false;
        updatingValue.page404 = false;
        progress404.value = 0;

    } catch (err: any) {
        updatingValue.page404 = false;
        alert(err.message);
    }
}
//

let removeHosting = ref(false);
let removeingHosting = ref(false);
let remove = () => {
    removeingHosting.value = true;
    currentService.registerSubdomain({
        cb: () => null
    }).then(() => {
        removeHosting.value = false;
        removeingHosting.value = false;
    }).catch(err => {
        removeingHosting.value = false;
        alert(err.message);
    });
}

let changeSubdomain = async () => {
    if (currentService.service.subdomain === inputSubdomain) {
        modifyMode.subdomain = false;
        return;
    }

    updatingValue.subdomain = true;

    try {
        await currentService.registerSubdomain({
            subdomain: inputSubdomain,
            cb: () => null
        });

        modifyMode.subdomain = false;
        updatingValue.subdomain = false;

    } catch (err: any) {
        updatingValue.subdomain = false;
        alert(err.message);
    }
}

let currentSubdomain = computed(() => {
    let sd = currentService.service.subdomain;
    let status = '';
    let subd = '';
    if (sd && sd[0] === '*' || sd[0] === '+') {
        subd = sd.slice(1) + '.skapi.com';
        status = sd[0] === '*' ? 'Removing' : 'Pending';
    }
    else {
        subd = sd + '.skapi.com';
        status = 'Active';
    }
    return {
        subdomain: subd,
        status: status
    };
});

let _subd = currentService.service?.subdomain || '';
let sdInfo: Ref<{
    '404'?: string;
    srvc: string;
    subd: string;
    ownr: string;
    stat: string;
}> = ref({
    '404': '...',
    srvc: '',
    subd: '',
    ownr: '',
    stat: ''
});
if (_subd) {
    if (_subd[0] === '*' || _subd[0] === '+') {
        currentService.updateSubdomain(() => {
            // + pending
            // * removing
            subdomain.value = currentService.service.subdomain;
            // currentService.getSubdomainInfo().then(s => console.log(s))
        });
    }
    // else {
    //     currentService.getSubdomainInfo().then(s => console.log(s))
    // }
    currentService.getSubdomainInfo().then(s => sdInfo.value = s);
}

</script>

<style lang="less" scoped>
form.register {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: flex-end;

    .subdomain {
        display: inline-block;
        position: relative;
        height: 44px;

        &::after {
            content: ".skapi.com";
            position: absolute;
            right: 10px;
            top: 12px;
            color: #999;
            font-size: 0.8rem;
            font-weight: 400;
            pointer-events: none;
            user-select: none;
            z-index: 1;
        }

        input {
            padding-right: 88px;
        }

        flex-grow: 1;
    }

    button {
        flex-shrink: 0;
    }
}
</style>