<template lang="pug">
h2 Client Secret Keys

p If you are using 3rd party API's that requires a client secret key, you can add them here and safely make requests from your website without exposing your client secret key.

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

p For more details, please refer to the #[a(href="https://docs.skapi.com/api-bridge/client-secret-request.html" target="_blank" style='font-weight:normal;') Documentation]

br

h2 CLIENT SECRET

Table
    template(v-slot:head)
        tr
            th.center(style="width:80px")
                | Public
                .resizer
            th
                | Name
                .resizer
            th
                | $CLIENT_SECRET
                .resizer

    template(v-slot:body)
        tr
            td(colspan=3)
                .createButton
                    .material-symbols-outlined.fill add_circle
                    span(style="font-size: 0.8rem;font-weight:bold") &nbsp;&nbsp;Add New Key
        tr
            td(colspan=3).
                Loading keys ... &nbsp;
                #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
        tr
            td.center
                Checkbox(v-model="checkbox[0]")
            td.overflow Max 8 characters
            td.overflow aspdofiapsfjpaoiesjfpaosijfapoiejpfaoidjfaoseijfpoasijfpoeijpsoijfdapoaeijfpaoiesjfoaiesjfpoaijesfpoasiejfpoaiesjfpaoesi
        tr
            td.center
                Checkbox(v-model="checkbox[1]")
            td.overflow Max 8 characters
            td.overflow aspdofiapsfjpaoiesjfpaosijfapoiejpfaoidjfaoseijfpoasijfpoeijpsoijfdapoaeijfpaoiesjfoaiesjfpoaijesfpoasiejfpoaiesjfpaoesi

br
br
br
br
br
br
br
br

</template>
<script setup>
import Table from '@/components/table.vue';
import Code from '@/components/code.vue';
import Checkbox from '@/components/checkbox.vue';
import {ref, computed} from 'vue';
import { currentService } from '@/views/service/main';
let checkbox = ref([]);
</script>