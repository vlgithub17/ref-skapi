<template lang="pug">
br
br
br

#signup
    router-link(to="/")
        img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

    .bottomLineTitle Sign Up

    br

    form(@submit.prevent="signup")
        label
            | Email
            input.big(type="email" 
            :value='form.email' 
            @input="e=> { form.email = e.target.value; }"
            placeholder="Enter your email" 
            required)


        label.passwordInput
            | Password
            input.big(:type='showPassword ? "text" : "password"'
            ref="passwordField" 
            @input="e=> { form.password = e.target.value; e.target.setCustomValidity(''); error = '' }"
            minlength="6"
            placeholder="Create a password" 
            required)
            .passwordIcon(@click="showPassword = !showPassword")
                template(v-if="showPassword")
                    .material-symbols-outlined.fill visibility
                template(v-else)
                    .material-symbols-outlined.fill visibility_off

        label.passwordInput
            | Confirm password
            input.big(:type='showPassword ? "text" : "password"'
            ref="confirmPasswordField" 
            @input="e=> { form.password_confirm = e.target.value; e.target.setCustomValidity(''); error = '' }"
            @change="validatePassword"
            placeholder="Confirm the password" 
            required)
            .passwordIcon(@click="showPassword = !showPassword")
                template(v-if="showPassword")
                    .material-symbols-outlined.fill visibility
                template(v-else)
                    .material-symbols-outlined.fill visibility_off

        .actions 
            Checkbox(v-model="form.subscribe" style='font-weight:unset;') I agree to receive newsletters from Skapi.

        br

        .error(v-if="error")
            .material-symbols-outlined.fill error
            span {{ error }}
        
        br

        .bottom
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")

            template(v-else)
                button.final Sign-up
                .signup 
                    | Have an account?&nbsp;
                    RouterLink(:to="{name: 'login'}") Login
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { skapi } from '@/code/admin'
import { user } from '@/code/user'
import { ref } from 'vue';
import Checkbox from '@/components/checkbox.vue';
const router = useRouter();
const route = useRoute();

let showPassword = ref(false);
let promiseRunning = ref(false);
let passwordField = ref(null);
let confirmPasswordField = ref(null);
let error = ref(null);
let form = {
    email: '',
    password: '',
    password_confirm: '',
    subscribe: true,
};

let validatePassword = () => {
    if (form.password_confirm !== form.password) {
        confirmPasswordField.value.setCustomValidity('Password does not match');
        confirmPasswordField.value.reportValidity();
    }
}

let signup = (e) => {
    error.value = '';
    promiseRunning.value = true;

    let params = {
        email: form.email,
        password: form.password,
    }
    let options = {
        signup_confirmation: '/success',
        email_subscription: form.subscribe
    }

    skapi.signup(params, options).then(res => {
        console.log(res);
        router.push({ path: '/confirmation', query: { email: form.email } })
    }).catch(err => {
        console.log(err)
        promiseRunning.value = false;

        switch (err.code) {
            case 'EXISTS':
                error.value = "This email is already in use";
                break;
            default:
                error.value = "Something went wrong please contact an administrator.";
                throw e;
        }
    });
}
</script>

<style scoped lang="less">
#signup {
    max-width: 440px;
    padding: 0 20px;
    margin: 0 auto;
}

form {
    >label {
        margin-bottom: 16px;
    }

    .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center
    }

    .bottom {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        flex-direction: row-reverse;
        min-height: 44px;
        .signup {
            font-size: 16px;
            margin: 16px 0;
        }
    }
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

@media (max-width: 480px) {
    form {
        .bottom {
            display: block;
            text-align: center;

            button {
                width: 100%;
            }

            .forgot {
                display: block;
                margin-bottom: 8px;
            }
        }
    }
}
</style>