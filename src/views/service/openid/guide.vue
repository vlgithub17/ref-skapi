<template lang="pug">
    p(style="margin-bottom: 0").
      Search and manage Open ID loggers.
      #[br]
      You can setup Open ID loggers to allow users to signup/login to your website using their existing Open ID account.

    p.
      The example below shows how to login using an Open Id Logger. If the user is logging in for the first time, Skapi account will be automatically created for them.

    Code
        pre.
            skapi.#[span(style="color:#44E9FF") openidLogin]({
                token: #[span(style="color:#FFED91") "Token.fetched.from.authentication.service"],
                id: #[span(style="color:#FFED91") "Your Open ID Logger ID"]
            }).#[span(style="color:#44E9FF") then]( result => console.#[span(style="color:#44E9FF") log](result) );

    p.
      Once the user have logged in for the first time, they will be listed on your #[b Users] section below.
      
    p For more details, please refer to the #[a(href="https://docs.skapi.com/authentication/openid-login.html", target="_blank") Documentation]
</template>

<script setup lang="ts">
    import Code from "@/components/code.vue";
</script>