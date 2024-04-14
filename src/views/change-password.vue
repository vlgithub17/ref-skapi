<template lang="pug">
br
br
br

#changePassword
    template(v-if="step < 3")
        router-link(to="/")
            img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

        .bottomLineTitle Change Password
    template(v-else)
        .material-symbols-outlined.fill(style="font-size:50px;color:rgba(90, 216, 88, 1);") check_circle
        .bottomLineTitle Success

    template(v-if="step === 1")
        form(@submit.prevent="login")
            p Please enter your current password.

            br

            input(
                :value="user.email"
                name="email"
                required
                hidden)

            label.passwordInput
                | Current Password
                input(
                    :type='showPassword ? "text" : "password"'
                    @input="e=>currPassword = e.target.value"
                    placeholder="Enter your current password"
                    required
                    name="password")
                .passwordIcon(@click="showPassword = !showPassword")
                    template(v-if="showPassword")
                        .material-symbols-outlined.fill visibility
                    template(v-else)
                        .material-symbols-outlined.fill visibility_off

            br

            .error(v-if="error")
                .material-symbols-outlined.fill error
                span {{ error }}

            br

            .bottom
                template(v-if="promiseRunning")
                    img.loading(src="@/assets/img/loading.png")
                template(v-else)
                    button.noLine(type="button" @click="router.push('/account-setting')") Cancel
                    button.unFinished(type="submit") Continue

    template(v-else-if="step === 2")
        form(@submit.prevent="changePassword" action="")
            p Create a new password.

            br

            label.passwordInput(style="margin-bottom:16px")
                | New password
                input(
                    :type='showNewPassword ? "text" : "password"'
                    minlength="6"
                    maxlength='60'
                    @input="e=>newPassword=e.target.value"
                    placeholder="Min 6 characters and max 60 characters"
                    required)
                .passwordIcon(@click="showNewPassword = !showNewPassword")
                    template(v-if="showNewPassword")
                        .material-symbols-outlined.fill visibility
                    template(v-else)
                        .material-symbols-outlined.fill visibility_off

            label.passwordInput
                | Confirm new password
                input(
                    :type='showConfirmPassword ? "text" : "password"'
                    ref="confirmNewPasswordField"
                    minlength="6"
                    maxlength='60'
                    :value="newPasswordConfirm"
                    @input="e=> { newPasswordConfirm = e.target.value; e.target.setCustomValidity(''); }" 
                    @change="validateNewPassword" 
                    placeholder="Confirm the new password"
                    required)
                .passwordIcon(@click="showConfirmPassword = !showConfirmPassword")
                    template(v-if="showConfirmPassword")
                        .material-symbols-outlined.fill visibility
                    template(v-else)
                        .material-symbols-outlined.fill visibility_off

            br

            .bottom
                template(v-if="promiseRunning")
                    img.loading(src="@/assets/img/loading.png")
                template(v-else)
                    button.noLine(type="button" @click="router.push('/account-setting')") Cancel
                    button.final(type="submit") Submit

    template(v-else-if="step === 3")
        p Your password has been successfully changed. Please login with the new password.

        div(style="display:block;text-align:right")
            button.final(@click="router.replace('/login')") Login

    br
    br

    .navigator(v-if="step <= 2")
        .ball(v-for="num in 2" :class="{'active': step === num}")
br
br

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, nextTick } from 'vue';
import { skapi } from '@/code/admin';
import { user } from '@/code/user';
const router = useRouter();
const route = useRoute();

let step = ref(1);
let error = ref('');
let promiseRunning = ref(false);

let showPassword = ref(false);
let showNewPassword = ref(false);
let showConfirmPassword = ref(false);
let confirmNewPasswordField = ref(null);

let currPassword = '';
let newPassword = '';
let newPasswordConfirm = '';

let login = async (e: SubmitEvent) => {
    promiseRunning.value = true;
    error.value = '';
    try {
        await skapi.login(e);
        step.value++;
    }
    catch (err: any) {
        error.value = 'Invalid password';
    }
    finally {
        promiseRunning.value = false;
    }
}

let validateNewPassword = () => {
    if (newPasswordConfirm !== newPassword) {
        confirmNewPasswordField.value.setCustomValidity('Password does not match');
        confirmNewPasswordField.value.reportValidity();
    }
}
let changePassword = async () => {
    promiseRunning.value = true;
    error.value = '';
    try {
        await skapi.changePassword({ current_password: currPassword, new_password: newPassword });
        await skapi.logout();
        step.value++;
    }
    catch (err: any) {
        error.value = err.message;
    }
    finally {
        promiseRunning.value = false;
    }
}
</script>

<style scoped lang="less">
#changePassword {
    max-width: 440px;
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

    label {
        display: block;
        color: var(--black-6);
        font-size: 16px;
        font-weight: 700;
    }

    input {
        width: 100%;
        margin-top: 8px;
        padding: 12px 15px;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.05);
    }

    a {
        font-size: 16px;
        text-decoration: none;
        color: var(--main-color);
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