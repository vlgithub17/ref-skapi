<template lang="pug">
br
br
br

#success
    router-link(to="/")
        img(src="@/assets/img/logo/logo.png" style="height: 2em;")

    p Your account and all your subscription plan has been disabled.
    p All your services will no longer be accessible and will be completely removed in 30 days.
    p You can re-enable your account within 30 days.

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
</style>