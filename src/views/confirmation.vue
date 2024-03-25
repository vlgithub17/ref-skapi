<template lang="pug">
br
br
br
br
br
br
br
br

#confirmation 
    router-link(to="/")
        img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

    .bottomLineTitle Confirm your email

    br

    .content Please check your inbox for a confirmation email.Click the link in the email to confirm your email address.

    .email The link has sent to : 
        span {{ decodedEmail }}

    br
    br

    .resend
        template(v-if="resending")
            .resending The Code has been resent.
        template(v-else)
            span Haven’t got any Code?
            span.click(@click="resend") Re-send Code

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
    skapi.resendSignupConfirmation(redirectUrl).then(res=>{
        console.log(res); // 'SUCCESS: Signup confirmation E-Mail has been sent.'
    });
}
</script>

<style scoped lang="less">
#confirmation {
    max-width: 440px;
    padding: 0 20px;
    margin: 0 auto;
}
.content {
    font-size: 16px;
    margin-bottom: 16px;
}
.email {
    color: var(--black-4);
    font-size: 16px;
    font-weight: 400;

    span {
        color: var(--main-color);
    }
}
.resend {
    span {
        font-weight: 500;
        margin-right: 5px;
    }
    .click {
        display: inline-block;
        color: var(--main-color);
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
    }
    .resending {
        color: rgba(0, 0, 0, 0.40);
        font-weight: 400;
        font-size: 16px;
    }
}
</style>