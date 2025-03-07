<template lang="pug">
br
br
br

#verify
    template(v-if="step == 1")
        router-link(to="/")
            img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

        .bottomLineTitle Email Verification
    template(v-else)
        //- .material-symbols-outlined.notranslate.fill(style="font-size:50px;color:rgba(90, 216, 88, 1);") check_circle
        svg.svgIcon(style="fill: rgba(90, 216, 88, 1); height: 50px; width: 50px")
            use(xlink:href="@/assets/img/material-icon.svg#icon-check-circle-fill")
        .bottomLineTitle Success

    template(v-if="step === 1")
        form(@submit="verifyEmail")
            p Verification code has been sent to #[b {{skapi.user.email}}]
            p Please check your email and enter the code.

            label
                | Code
                input.big(
                type="text"
                @input="(e) => { error = ''; }"
                name='code'
                placeholder="6 digits code"
                required)

            .resend 
                template(v-if="resending")
                    .resending Email has been re-sent.
                template(v-else)
                    | Haven’t received the email?&nbsp;
                    a.clickable(@click="resend") Re-send

            br

            .error(v-if="error") 
                //- .material-symbols-outlined.notranslate.mid error
                svg
                    use(xlink:href="@/assets/img/material-icon.svg#icon-error-fill")
                span {{ error }}

            br

            .bottom
                div(v-if="promiseRunning" style="width:100%; text-align:center")
                    .loader(style="--loader-color:blue; --loader-size:12px")
                template(v-else)
                    router-link(to='/account-setting') Back
                    button.final(type="submit") Submit

    template(v-else-if="step === 2")
        p #[b {{ skapi.user.email }}] has been successfully verified.

        br

        div(style="text-align:right")
            button.final(@click="router.push('/account-setting')") Confirm

br
br
br

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { skapi } from '@/main';

const router = useRouter();

let step = ref(1);
let error = ref('');
let resending = ref(false);
let promiseRunning = ref(false);
let resend = async () => {
    resending.value = true;
    skapi.verifyEmail();

    setTimeout(() => {
        resending.value = false;
    }, 30000);
}
let verifyEmail = e => {
    promiseRunning.value = true;
    skapi.verifyEmail(e).then(() => step.value++ ).catch(err => error = err.message).finally(() => promiseRunning.value = false);
}
</script>

<style scoped lang="less">
#verify {
    max-width: 640px;
    padding: 0 20px;
    margin: 0 auto;
}

// .passwordInput {
//     position: relative;

//     .passwordIcon {
//         position: absolute;
//         right: 15px;
//         bottom: 10px;
//         opacity: 0.5;
//         cursor: pointer;
//     }
// }

.navigator {
    text-align: center;

    .ball {
        display: inline-block;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background-color: #D9D9D9;
        margin-right: 12px;

        &.active {
            background-color: var(--main-color);
        }

        &:last-child {
            margin: 0;
        }
    }
}

form {
    padding: 8px;

    >label {
        margin-bottom: 16px;
    }

    .resend {
        font-size: 16px;

        // .click {
        //     color: var(--main-color);
        //     font-weight: 600;
        //     cursor: pointer;
        // }
    }

    .bottom {
        min-height: 44px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }
}
</style>