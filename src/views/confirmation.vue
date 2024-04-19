<template lang="pug">
br
br
br

#confirmation 
    router-link(to="/")
        img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

    .bottomLineTitle Verify Your Email

    p Please check your inbox to verify your email address.
    p The confirmation link has been sent to #[b {{decodedEmail}}].

    .resend
        template(v-if="resending")
            .resending Email has been re-sent.
        template(v-else)
            span Haven’t received the email?&nbsp;
            span.click(@click="resend") Re-send
</template>

<script setup lang="ts">
import { skapi } from '@/code/admin';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

let email = window.location.search.split('=')[1];
let decodedEmail = decodeURIComponent(email);
let resending = ref(false);

let resend = () => {
    resending.value = true;
    console.log('resend!');
    let redirectUrl = '/success'
    skapi.resendSignupConfirmation(redirectUrl).then(res => {
        console.log(res); // 'SUCCESS: Signup confirmation E-Mail has been sent.'
    });
}
</script>

<style scoped lang="less">
#confirmation {
    max-width: 640px;
    padding: 0 20px;
    margin: 0 auto;
}

.resend {
    font-size: 16px;

    .click {
        color: var(--main-color);
        font-weight: 600;
        cursor: pointer;
    }
}
</style>