<template lang="pug">
br
br
br

#forgot
    template(v-if="step < 4")
        router-link(to="/")
            img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

        .bottomLineTitle Forgot Password
    template(v-else)
        //- .material-symbols-outlined.notranslate.fill(style="font-size:50px;color:rgba(90, 216, 88, 1);") check_circle
        svg.svgIcon(style="fill: rgba(90, 216, 88, 1); height: 50px; width: 50px")
            use(xlink:href="@/assets/img/material-icon.svg#icon-check-circle-fill")
        .bottomLineTitle Success

    template(v-if="step === 1")
        form(@submit.prevent="forgotPassword")
            p Please enter your login email address.

            br

            label
                | Email
                input.big(type="email" 
                :value="email"
                @input="(e) => { email = e.target.value; error = ''; }"
                placeholder="Enter your email address" 
                required)

            br
            
            .error(v-if="error")
                //- .material-symbols-outlined.notranslate.fill error
                svg
                    use(xlink:href="@/assets/img/material-icon.svg#icon-error-fill")
                span {{ error }}

            br

            .bottom
                div(v-if="promiseRunning" style="width:100%; text-align:center")
                    .loader(style="--loader-color:blue; --loader-size:12px")
                template(v-else)
                    router-link(to='/login') Back to Login
                    button.unFinished(type="submit") Continue

    template(v-else-if="step === 2")
        form(@submit.prevent="step++")
            p Verification code has been sent to #[b {{email}}]
            p Please check your email and enter the code.

            label
                | Code
                input.big(
                type="text"
                :value="code"
                @input="(e) => { code = e.target.value; error = ''; }"
                placeholder="Enter verification code"
                required)

            .resend 
                template(v-if="resending")
                    .resending The Code has been resent.
                template(v-else)
                    | Haven’t received the code?&nbsp;
                    span.click(@click="resend") Re-send Code

            br

            .error(v-if="error") 
                //- .material-symbols-outlined.notranslate.mid error
                svg
                    use(xlink:href="@/assets/img/material-icon.svg#icon-error-fill")
                span {{ error }}

            br

            .bottom
                a.clickable(@click="back") Back
                button.unFinished(type="submit") Continue

    template(v-else-if="step === 3")
        form(@submit.prevent="changePassword" action="")
            p Create a new password.

            br

            label.passwordInput(style="margin-bottom:16px")
                | New password
                input.big(
                :type='showPassword ? "text" : "password"'
                ref="newPasswordField" 
                :value="newPassword"
                @input="e=> { newPassword = e.target.value; e.target.setCustomValidity(''); }" 
                @change="validateNewPassword" 
                placeholder="Create a new password"
                required)
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        //- .material-symbols-outlined.notranslate.fill visibility
                        svg.svgIcon(style="fill: var(--black-6)")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-fill")
                    template(v-else)
                        //- .material-symbols-outlined.notranslate.fill visibility_off
                        svg.svgIcon(style="fill: var(--black-6)")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-off-fill")

            label.passwordInput
                | Confirm new password
                input.big(
                :type='showPassword ? "text" : "password"'
                ref="confirmNewPasswordField"
                :value="newPasswordConfirm"
                @input="e=> { newPasswordConfirm = e.target.value; e.target.setCustomValidity(''); }" 
                @change="validateNewPassword" 
                placeholder="Confirm the new password"
                required)
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        //- .material-symbols-outlined.notranslate.fill visibility
                        svg.svgIcon(style="fill: var(--black-6)")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-fill")
                    template(v-else)
                        //- .material-symbols-outlined.notranslate.fill visibility_off
                        svg.svgIcon(style="fill: var(--black-6)")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-off-fill")

            br

            .bottom(style="justify-content: flex-end;")
                div(v-if="promiseRunning" style="width:100%; text-align:center")
                    .loader(style="--loader-color:blue; --loader-size:12px")
                template(v-else)
                    button.final(type="submit") Submit

    template(v-else-if="step === 4")
        p Your password has been successfully changed. Please login with the new password.
        
        div(style="text-align:right")
            button.final(@click="router.replace('/login')") Login

    br
    br

    .navigator(v-if="step <= 3")
        .ball(v-for="num in 3" :class="{'active': step === num}")
br
br
br

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, nextTick } from 'vue';
import { skapi } from '@/code/admin';

const router = useRouter();
const route = useRoute();

let step = ref(1);
let error = ref('');
let promiseRunning = ref(false);
let resending = ref(false);
let showPassword = ref(false);

let newPasswordField = ref(null);
let confirmNewPasswordField = ref(null);
let email = '';
let newPassword = '';
let newPasswordConfirm = '';
let code = '';

let back = () => {
    code = '';
    error.value = '';
    step.value--;
}
let resend = () => {
    resending.value = true;
    
    skapi.forgotPassword({ email }).catch(err => {
        error.value = err.message;
        step.value = 1;
    })

    setTimeout(() => {
        resending.value = false;
    }, 30000);
}
let validateNewPassword = () => {
    if (newPassword.length < 6 || newPassword.length > 60) {
        newPasswordField.value.setCustomValidity('Min 6 characters and Max 60 characters');
        newPasswordField.value.reportValidity();
    } else if (newPasswordConfirm !== newPassword) {
        confirmNewPasswordField.value.setCustomValidity('Password does not match');
        confirmNewPasswordField.value.reportValidity();
    }
}
let forgotPassword = async () => {
    promiseRunning.value = true;
    error.value = '';
    try {
        await skapi.forgotPassword({ email });
        step.value++;
    }
    catch (err:any) {
        error.value = err.message;
    }
    finally {
        promiseRunning.value = false;
    }
}
let changePassword = async () => {
    promiseRunning.value = true;
    error.value = '';
    try {
        await skapi.resetPassword({ email: email, code: code, new_password: newPassword })
        step.value++;
    }
    catch (err:any) {
        step.value--;
        nextTick(() => {
            error.value = err.message;
        });
    }
    finally {
        promiseRunning.value = false;
    }
}
</script>

<style scoped lang="less">
#forgot {
    max-width: 480px;
    padding: 0 20px;
    margin: 0 auto;
}
.passwordInput {
    position: relative;

    .passwordIcon {
        position: absolute;
        right: 15px;
        bottom: 10px;
        opacity: 0.5;
        cursor: pointer;
    }
}
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
    >label {
        margin-bottom: 16px;
    }

    .resend {
        font-size: 16px;
        .click {
            color: var(--main-color);
            font-weight: 600;
            cursor: pointer;
        }
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