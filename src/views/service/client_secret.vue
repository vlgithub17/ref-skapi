<template lang="pug">
h3 Using 3rd party APIs

p If you wish to use a 3rd party API that requires a client secret key in your website, you can add them here and safely make requests from your website without exposing your client secret key.

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
    It is using the client secret key stored under the name: #[b "myapi"]
    and the placeholder: #[b "$CLIENT_SECRET"] will be replaced to the actual client secret key.

p For more details, please refer to the #[a(href="https://docs.skapi.com/api-bridge/client-secret-request.html" target="_blank") Documentation]

br

h2 Client Secret

hr

.iconClick(@click="addKey" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0 || editMode || addMode}")
    .material-symbols-outlined.fill add_circle
    span(style="font-size: 0.8rem;font-weight:bold") &nbsp;&nbsp;Add Key

br
br

form(@submit.prevent :class='{disabled: !user?.email_verified || currentService.service.active <= 0}')
    Table
        template(v-slot:head)
            tr
                th.center(style="width:48px; padding:0")
                    .material-symbols-outlined lock
                    .resizer
                th(style="width:26%")
                    | Name
                    .resizer
                th
                    | $CLIENT_SECRET
                    //- .resizer
                th.center(style="width:66px; padding:0")

        template(v-slot:body)
            tr(v-if="loading")
                td(colspan=4).
                    Loading keys ... &nbsp;
                    #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
            tr(v-else-if="!client_key.length") 
                td(colspan=4) No Client Secret Key
            tr(v-for="(key, index) in client_key")
                template(v-if="editMode && key.edit || addMode && key.edit")
                    td.center 
                        Checkbox(v-model="key.secure")
                    td  
                        input#keyName.line(type="text" v-model="key.name" placeholder="myapi" required maxlength="16")
                    td
                        input.line(type="text" v-model="key.key" placeholder="string1234..." required)
                    td.center.buttonWrap
                        template(v-if="updating")
                            img.loading(src="@/assets/img/loading.png")
                        template(v-else)
                            label.material-symbols-outlined.clickable.save(@click="saveKey(key)" style="color:var(--main-color)") done
                                input(type="submit" hidden)
                            .material-symbols-outlined.clickable.cancel(@click="cancelKey(key, index)") close
                template(v-else)  
                    td.center 
                        .material-symbols-outlined.bold(v-if="key.secure") check
                    td.overflow {{ key.name }}
                    td.overflow {{ key.key ? key.key.slice(0,2) + '*'.repeat(key.key.length - 2) : '' }}
                    td.center.buttonWrap
                        template(v-if="!editMode && !addMode")
                            .material-symbols-outlined.fill.clickable.icon.hide(@click="editKey(key)") edit
                            .material-symbols-outlined.fill.clickable.icon.hide(@click="deleteClientKey = key.name;deleteIndex = index;") delete

Modal(:open="deleteClientKey")
    h4(style='margin:.5em 0 0;') Delete Client Secret
    hr

    div(style='font-size:.8rem;')
        p.
            Are you sure you want to delete #[b "{{deleteClientKey}}"]?
            #[br]
            This action cannot be undone.
    br
    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        template(v-if='sendingEmail')
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine.warning(@click="deleteClientKey = false") Cancel
            button.final.warning(@click="client_key.splice(deleteIndex, 1);deleteClientKey = false;") Delete

br
</template>
<script setup>
import Table from '@/components/table.vue';
import Code from '@/components/code.vue';
import Checkbox from '@/components/checkbox.vue';
import Modal from '@/components/modal.vue';

import { ref, nextTick } from 'vue';
import { user } from '@/code/user';
import { currentService } from '@/views/service/main';

let loading = ref(false);
let updating = ref(false);
let addMode = ref(false);
let editMode = ref(false);
let sendingEmail = ref(false);
let deleteClientKey = ref(false);
let deleteIndex = '';
let client_key = ref([
    {
        edit: false,
        secure: true,
        name: 'test1',
        key: 'dssdlfkjsdakdsjfaiw'
    },
    {
        edit: false,
        secure: false,
        name: 'test2',
        key: 'sdfsdfsafjssdfasdfasfdassjfaiw'
    }
]);
let edit_key_origin = {};

let addKey = () => {
    client_key.value.unshift({edit: true, secure:false, name:'', key:''});
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
    if(addMode.value) {
        client_key.value.splice(index, 1);
        addMode.value = false;
    } else {
        if(edit_key_origin.name !== key.name || edit_key_origin.key !== key.key) {
            key.name = edit_key_origin.name;
            key.key = edit_key_origin.key;
        }

        key.edit = false;
        editMode.value = false;
    }
}

let saveKey = (key) => {
    if(addMode.value) {
        key.edit = false;
        addMode.value = false;
    } else {
        key.edit = false;
        editMode.value = false;
    }
}
</script>
<style scoped lang="less">
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
    td, th {
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
}
@media (pointer: coarse) {
    .hide {
        display: block !important;
    }
}
</style>