<template lang="pug">
section.infoBox
    h2 Getting Started

    hr

    p(style='margin-bottom: 0') Add the following code to your HTML website to get started:

    Code
        pre.
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") script] #[span(style="color:#44E9FF") src]=#[span(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]#[span(style="color:#999") &gt;&lt;/]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]
                #[span(style="color:#33adff") const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "{{ currentService.id }}"], #[span(style="color:#FFED91") "{{ currentService.owner }}"]);
            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]

    br

    h4 For SPA Projects:

    p(style='margin-bottom: 0') 1. Install the library:

    Code
        pre npm install skapi-js

    br

    p(style='margin-bottom: 0') 2. Initialize Skapi from your main.js:

    Code
        pre.
            #[span(style="color:#999") // main.js]
            #[span(style="color:#44E9FF") import] { Skapi } #[span(style="color:#44E9FF") from] #[span(style="color:#FFED91") "skapi-js"]
            #[span(style="color:#33adff") const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "{{ currentService.id }}"], #[span(style="color:#FFED91") "{{ currentService.owner }}"]);
            #[span(style="color:#44E9FF") export] { skapi } #[span(style="color:#999") // Import the instance in your components]

    br

    p For more details, please refer to the #[a(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank") Documentation]

    br

    //- .routerWrap
        .routerButton
        .routerButton
            router-link(:to="`/my-services/${currentService.id}/dashboard`")
                .desc Next Page
                .title Dashboard & Settings
</template>

<script setup>
import Code from '@/components/code.vue';
import { currentService } from '@/views/service/main';
</script>