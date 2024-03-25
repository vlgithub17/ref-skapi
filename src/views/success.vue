<template lang="pug">
br
br
br
br
br
br
br
br

#success
    router-link(to="/")
        img(src="@/assets/img/logo/logo.png" style="width: 146px;")

    br
    br

    h2(style="color:var(--main-color)") Congratulations!

    br

    .message 
        | Thanks for joining!
        br
        | Your email has been confirmed. You can now login to Skapi.
    
    br
    br

    div(style="display:block;text-align:center")
        router-link.login(to="/login") Login

br
br
br
br
br
br
br
br
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>

<style scoped lang="less">
#success {
    max-width: 480px;
    padding: 0 20px;
    margin: 0 auto;
}
.message {
    font-size: 16px;
    line-height: 24px;
}
.login {
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    background-color: var(--main-color);
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    padding: 10px 100px;
}
</style>