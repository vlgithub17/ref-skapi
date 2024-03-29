<template lang="pug">
br
br
br
br
br
br
br
br

#forgot
    template(v-if="step < 4")
        router-link(to="/")
            img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

        .bottomLineTitle Forgot Password
    template(v-else)
        .material-symbols-outlined.fill(style="font-size:50px;color:rgba(90, 216, 88, 1);") check_circle
        .bottomLineTitle New Password Success

    br

    template(v-if="step === 1")
        form(@submit.prevent="forgotPassword")
            .message 
                | Please check your inbox for a confirmation email.
                br
                | Click the link in the email to confirm your email address.

            br

            label
                | Email
                input(type="email" 
                :value="email"
                @input="(e) => { email = e.target.value; error = ''; }"
                placeholder="Enter your email address" 
                required)

            .error(v-if="error")
                .material-symbols-outlined.fill error
                span {{ error }}

            br
            br

            .bottom 
                template(v-if="promiseRunning")
                    img.loading(src="@/assets/img/loading.png")
                template(v-else)
                    router-link(to="/login") Back to Log in
                    button.unFinished(type="submit") Continue

    template(v-else-if="step === 2")
        form(@submit.prevent="step++")
            .message 
                | Please check your email and insert the code
                br
                | in order to create a new password. 
            
            br

            .email The code has sent to : {{ email }}

            br

            label
                | Code
                input(
                type="text"
                :value="code"
                @input="(e) => { code = e.target.value; error = ''; }"
                placeholder="Enter verification code"
                required)

            .resend 
                template(v-if="resending")
                    .resending The Code has been resent.
                template(v-else)
                    span(style="margin-right:5px") Haven’t got any Code?
                    span.click(@click="resend") Re-send Code
            .error(v-if="error") 
                .material-symbols-outlined.mid error
                span {{ error }}

            br
            br

            .bottom
                button.noLine(type="button" @click="back") Back
                button.unFinished(type="submit") Continue

    template(v-else-if="step === 3")
        form(@submit.prevent="changePassword" action="")
            .message Create a new password.

            br

            .passwordInput(style="margin-bottom:16px")
                label 
                    | New password
                    input(
                    :type='showPassword ? "text" : "password"'
                    ref="newPasswordField" 
                    :value="newPassword"
                    @input="e=> { newPassword = e.target.value; e.target.setCustomValidity(''); }" 
                    @change="validateNewPassword" 
                    placeholder="Create a new password"
                    required)
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        .material-symbols-outlined.fill visibility
                    template(v-else)
                        .material-symbols-outlined.fill visibility_off

            .passwordInput
                label 
                    | New password confirm
                    input(
                    :type='showPassword ? "text" : "password"'
                    ref="confirmNewPasswordField"
                    :value="newPasswordConfirm"
                    @input="e=> { newPasswordConfirm = e.target.value; e.target.setCustomValidity(''); }" 
                    @change="validateNewPassword" 
                    placeholder="Confirm the new password"
                    required)
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        .material-symbols-outlined.fill visibility
                    template(v-else)
                        .material-symbols-outlined.fill visibility_off

            br
            br

            .bottom(style="justify-content: flex-end;")
                template(v-if="promiseRunning")
                    img.loading(src="@/assets/img/loading.png")
                template(v-else)
                    button.final(type="submit") Change

    template(v-else-if="step === 4")
        .message 
            | Your password has been changed successfully.
            br
            | Please login with new password.
        
        br
        br
        br
        br

        div(style="display:block;text-align:right")
            button.final(@click="router.push('/login')") Login

    br
    br

    .navigator(v-if="step <= 3")
        .ball(v-for="num in 3" @click="() => { num < step ? step = num : null; password = '';  passwordConfirm = '';}" :class="{'active': step === num}")
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
import { ref, nextTick } from 'vue';
import { skapi } from '@/code/admin';

const router = useRouter();
const route = useRoute();

let step = ref(1);
let error = ref('');
let promiseRunning = ref(false);
let resending = ref(false);
let showPassword = ref(false);
let showSuccess = ref(true);
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
    // skapi.resetPassword({ email: email, code: code, new_password: newPassword }).then(res => {
    //     step.value++;
    // }).catch(err => {
    //     step.value--;
    //     nextTick(() => {
    //         error.value = err.message;
    //     });
    // })
}
</script>

<style scoped lang="less">
#forgot {
    max-width: 440px;
    padding: 0 20px;
    margin: 0 auto;
}
.message {
    font-size: 16px;
    line-height: 24px;
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
        cursor: pointer;
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
    font-size: 16px;

    label {
        display: block;
        color: var(--black-6);
        font-weight: 700;
    }
    input {
        width: 100%;
        margin-top: 8px;
        padding: 12px 15px;
        border-radius: 8px;
        background-color: rgba(0,0,0,0.05);
    }
    .error, .resend {
        margin-top: 8px;
    }
    .resend {
        .click {
            color: var(--main-color);
            font-weight: 700;
            cursor: pointer;
        }
    }
    .email {
        color: var(--black-4);
        font-weight: 400;
        line-height: 20px;
    }
    .bottom {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        
        a {
            text-decoration: none;
            color: var(--main-color);
            font-weight: 700;
        }
    }
}
</style>