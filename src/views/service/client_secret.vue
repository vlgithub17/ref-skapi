<template lang="pug">
section.infoBox
    .titleHead
        h2 Client Secret Key
            
        span.moreInfo(@click="showDes = !showDes" @mouseover="hovering = true" @mouseleave="hovering = false")
            span More Info&nbsp;
            template(v-if="showDes")
                //- .material-symbols-outlined.notranslate.fill expand_circle_up 
                //- .material-symbols-outlined.notranslate.noFill expand_circle_up
                svg(v-if="hovering" style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up-fill")
                svg(v-else style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up")
            template(v-else) 
                //- .material-symbols-outlined.notranslate.fill expand_circle_down
                //- .material-symbols-outlined.notranslate.noFill expand_circle_down
                svg(v-if="hovering" style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down-fill")
                svg(v-else style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down")

    template(v-if="showDes")
        p(style='margin-bottom: 0').
            When using a 3rd party API that requires a client secret key in your website,
            register them in Skapi and make secure requests to your APIs #[span.wordset without exposing] your #[span.wordset client secret key.]

        Code
            pre.
                skapi.#[span(style="color:#44E9FF") clientSecretRequest]({
                    clientSecretName: #[span(style="color:#FFED91") "myapi"],
                    url: #[span(style="color:#FFED91") "https://api.openai.com/v1/images/generations"],
                    method: #[span(style="color:#FFED91") "POST"],
                    headers: {
                        #[span(style="color:#FFED91") "Content-Type"]: #[span(style="color:#FFED91") "application/json"],
                        Authorization: #[span(style="color:#FFED91") "Bearer $CLIENT_SECRET"]
                    },
                    data: {
                        model: #[span(style="color:#FFED91") "dall-e-3"],
                        "prompt": #[span(style="color:#FFED91") "A cute baby sea otter"],
                        n: #[span(style="color:#FFED91") 1],
                        size: #[span(style="color:#FFED91") "1024x1024"]
                    }
                }).#[span(style="color:#44E9FF") then]( result => console.#[span(style="color:#44E9FF") log](result) );

        p.
            The example above shows how you can request #[b OpenAI]'s #[b DALL·E 3] in your project.
        p.
            It is using the client secret key stored under the name: "#[b myapi]".
            #[br]
            The placeholder: "#[b $CLIENT_SECRET]" will be replaced to the actual client secret key from the backend.
        
        
        p For more details, please refer to the #[a(href="https://docs.skapi.com/api-bridge/client-secret-request.html" target="_blank") Documentation]

    hr

    .error(v-if='!user?.email_verified')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        router-link(to="/account-setting") Please verify your email address to modify settings.

    .error(v-else-if='currentService.service.active == 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently disabled.

    .error(v-else-if='currentService.service.active < 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently suspended.

    p(style='margin-bottom:0') Register your client secret keys by clicking '#[b Register Client Secret Key]' below.

br

.iconClick.square(@click="addKey" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0 || editMode || addMode}" style='margin-bottom:8px;')
    //- .material-symbols-outlined.notranslate.fill add_circle
    svg.svgIcon
        use(xlink:href="@/assets/img/material-icon.svg#icon-add-circle-fill")
    span(style="font-size: 0.8rem;font-weight:bold") &nbsp;&nbsp;Register Client Secret Key


form.table-form(@submit.prevent :class='{disabled: !user?.email_verified || currentService.service.active <= 0}')
    .table-tootlip
        Tooltip(tip-background-color="var(--main-color)" text-color="white")
            template(v-slot:tip)
                | When LOCKED only signed users can have access to the client secret key.
    Table
        template(v-slot:head)
            tr
                th.center.fixed(style="width:48px")
                    //- .material-symbols-outlined.notranslate lock
                    //- svg.svgIcon(style="fill: black;")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-lock")
                    .resizer
                th(style="width:200px")
                    | Name
                    .resizer
                th(style="width:400px")
                    | $CLIENT_SECRET
                    .resizer
                th.center(style="width:66px")
                    .resizer

        template(v-slot:body)
            tr(v-if="!client_key.length") 
                td(colspan=4 style="padding-left:20px") No Client Secret Key
            tr(v-for="(key, index) in client_key")
                template(v-if="editMode && key.edit || addMode && key.edit")
                    td.center 
                        //- Checkbox(v-model="key.secure" :disabled='updating')
                        svg.svgIcon.black(@click="key.secure = !key.secure" :class="{ 'reactive' : !updating }" :style="{ opacity : updating ? 0.3 : 1, pointerEvents : updating ? 'none' : 'default' }" style="cursor:pointer")
                            template(v-if="key.secure")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-lock-fill")
                            template(v-else)
                                use(xlink:href="@/assets/img/material-icon.svg#icon-lock-open")
                    td  
                        input#keyName.line(type="text" v-model="key.name" placeholder="myapi" required maxlength="16" @input="e=>e.target.setCustomValidity('')" :disabled='updating')
                    td
                        input.line(type="text" v-model="key.key" placeholder="string1234..." required :disabled='updating')
                    td.center.buttonWrap
                        div(v-if="updating" style="width:100%; text-align:center")
                            .loader(style="--loader-color:blue; --loader-size:12px")
                        template(v-else)
                            //- label.material-symbols-outlined.notranslate.clickable.save(@click="saveKey(key)" style="color:var(--main-color)") done
                            label
                              svg.svgIcon.clickable.save(style="fill: var(--main-color);" @click="saveKey(key)")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-check")
                                input(type="submit" hidden)
                            //- .material-symbols-outlined.notranslate.clickable.cancel(@click="cancelKey(key, index)") close
                            svg.svgIcon.clickable.cancel(style="fill: black;" @click="cancelKey(key, index)")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-close")
                template(v-else)
                    td.center 
                        //- .material-symbols-outlined.notranslate.bold(v-if="key.secure") check
                        svg.svgIcon(v-if="key.secure" style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-check")
                    td.overflow {{ key.name }}
                    td.overflow {{ key.key ? key.key.slice(0,2) + '*'.repeat(key.key.length - 2) : '' }}
                    td.center.buttonWrap
                        template(v-if="!editMode && !addMode")
                            //- .material-symbols-outlined.notranslate.fill.clickable.icon.hide(@click="editKey(key)") edit
                            svg.svgIcon.reactive.clickable.hide(@click="editKey(key)")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-edit-fill")
                            //- .material-symbols-outlined.notranslate.fill.clickable.icon.hide(@click="deleteClientKey = key.name;deleteIndex = index;") delete
                            svg.svgIcon.reactive.clickable.hide(@click="deleteClientKey = !!key.name;deleteIndex = index;")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")

Modal(:open="deleteClientKey" @close="deleteClientKey=false")
    h4(style='margin:.5em 0 0;') Delete Client Secret
    hr

    div(style='font-size:.8rem;')
        p.
            Are you sure you want to delete #[b "{{deleteClientKey}}"]?
            #[br]
            This action cannot be undone.
    br
    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        div(v-if="deleteKeyLoad" style="width:100%; text-align:center")
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine.warning(@click="deleteClientKey = false") Cancel
            button.final.warning(@click="delCliKey") Delete

</template>
<script setup>
import Table from '@/components/table.vue';
import Code from '@/components/code.vue';
import Checkbox from '@/components/checkbox.vue';
import Modal from '@/components/modal.vue';
import Tooltip from '@/components/tooltip.vue';

import { ref, nextTick } from 'vue';
import { user } from '@/code/user';
import { currentService } from '@/views/service/main';

let updating = ref(false);
let showDes = ref(false);
let addMode = ref(false);
let editMode = ref(false);
let deleteKeyLoad = ref(false);
let deleteClientKey = ref(false);
let hovering = ref(false);
let deleteIndex = '';
let client_key = ref([
    // {
    //     edit: false,
    //     secure: true,
    //     name: 'test1',
    //     key: 'dssdlfkjsdakdsjfaiw'
    // },
]);
let delCliKey = async () => {
    deleteKeyLoad.value = true;

    client_key.value.splice(deleteIndex, 1);

    let authKeys = [];
    let secKeys = {};
    for (let i = 0; i < client_key.value.length; i++) {
        let ck = client_key.value[i];

        if (secKeys[ck.name] && secKeys[ck.name] !== ck.key) {
            continue;
        }

        if (ck.secure && authKeys.indexOf(ck.name) === -1) {
            authKeys.push(ck.name);
        }

        Object.assign(secKeys, {
            [ck.name]: ck.key
        });
    }

    await currentService.setServiceOption({
        client_secret: secKeys,
        auth_client_secret: authKeys,
    }).catch(err => {
        window.alert(err.message || err);
    });

    deleteClientKey.value = false;
    deleteKeyLoad.value = false;
}

if (currentService.service.client_secret) {
    for (let key in currentService.service.client_secret) {
        client_key.value.push({
            edit: false,
            secure: (currentService.service?.auth_client_secret || []).indexOf(key) !== -1,
            name: key,
            key: currentService.service.client_secret[key]
        })
    }
}

let edit_key_origin = {};

let addKey = () => {
    client_key.value.unshift({ edit: true, secure: false, name: '', key: '' });
    addMode.value = true;
    nextTick(() => {
        document.getElementById('keyName').focus();
    })
}

let editKey = (key) => {
    key.edit = true;
    editMode.value = true;
    edit_key_origin.name = key.name;
    edit_key_origin.key = key.key;
}

let cancelKey = (key, index) => {
    if (addMode.value) {
        client_key.value.splice(index, 1);
        addMode.value = false;
    } else {
        if (edit_key_origin.name !== key.name || edit_key_origin.key !== key.key) {
            key.name = edit_key_origin.name;
            key.key = edit_key_origin.key;
        }

        key.edit = false;
        editMode.value = false;
    }
}

let saveKey = async (key) => {
    let authKeys = [];
    let secKeys = {};
    for (let i = 0; i < client_key.value.length; i++) {
        let ck = client_key.value[i];

        if (secKeys[ck.name] && secKeys[ck.name] !== ck.key) {
            let el = document.getElementById('keyName');
            el.focus();
            el.setCustomValidity('The name is already in use.');
            el.reportValidity();
            return;
        }

        if (ck.secure && authKeys.indexOf(ck.name) === -1) {
            authKeys.push(ck.name);
        }

        Object.assign(secKeys, {
            [ck.name]: ck.key
        });
    }

    // loading...
    updating.value = true;
    await currentService.setServiceOption({
        client_secret: secKeys,
        auth_client_secret: authKeys,
    }).catch(err => {
        window.alert(err.message || err);
    });

    // loading end
    updating.value = false;

    if (addMode.value) {
        key.edit = false;
        addMode.value = false;
    } else {
        key.edit = false;
        editMode.value = false;
    }
}
</script>
<style scoped lang="less">
.table-form {
    position: relative;

    .table-tootlip {
        position: absolute;
        left: 18px;
        top: 17px;
        z-index: 999;
    }
}

.updown {
    background-color: #fff;
    background-color: var(--main-color);
    border-radius: 50%;
    margin-left: 8px;
    cursor: pointer;
    box-shadow: rgba(41, 63, 230, 0.24) 0px 1px 8px;
}

input {
    width: 100%;
}

table {
    form {
        display: block;
    }

    tr {
        &:hover {
            .hide {
                display: block;
            }
        }

        .hide {
            display: none;
        }
    }

    td,
    th {
        padding: 0 4px 0 10px;
    }
}

.buttonWrap {
    display: flex;
    height: 60px;
    align-items: center;
    gap: 8px;
    padding: 0;
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

    &:hover {
      border-radius: 50%;
      background-color: #293FE61A;
    }
}

@media (pointer: coarse) {
    .hide {
        display: block !important;
    }
}
</style>