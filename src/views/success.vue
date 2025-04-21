<template lang="pug">
br
br
br

#success
    router-link(to="/")
        img(src="@/assets/img/logo/logo.png" style="height: 49px;")

    h2(style="color:var(--main-color)") Thanks for joining!

    p Your email has been confirmed. You can now login to Skapi.

    br
    
    div(style="display:block;text-align:center")
        button.final(@click="router.push({path: '/login', query: {suc_redirect: routeQuery} })") Login
br
br
br
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const route = useRoute();

let routeQuery = route.query?.suc_redirect;
</script>

<style scoped lang="less">
#success {
    max-width: 480px;
    padding: 0 20px;
    margin: 0 auto;
}

@media (max-width: 480px) {
    button {
        width: 100%;
    }
}
</style>