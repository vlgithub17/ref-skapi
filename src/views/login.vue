<template lang="pug">
br
br
br
br
br
br
br
br

#login
    router-link(to="/")
        img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

    .bottomLineTitle Log in

    br

    form(@submit.prevent="login")
        label
            | Email
            input(type="email" @input="e=> { form.email = e.target.value; error='';}" placeholder="E.g. someone@gmail.com" required)

        .passwordInput
            label 
                | Password
                input(:type='showPassword ? "text" : "password"'
                @input="(e)=>{form.password = e.target.value; error='';}" 
                name="password" placeholder="Enter password" required)
            .passwordIcon(@click="showPassword = !showPassword")
                template(v-if="showPassword")
                    .material-symbols-outlined.fill visibility
                template(v-else)
                    .material-symbols-outlined.fill visibility_off

        .actions 
            .customCheckBox
                input#remember(type="checkbox" @change="(e)=>{checkLocalSetorage(e)}" checked)
                label(for="remember")
                    span(style="font-weight:400") Remember Me
                    .material-symbols-outlined.mid.check check
            RouterLink.forgot(to="/forgot") Forgot Email & Password?

        .error(v-if="error")
            .material-symbols-outlined.fill error
            span {{ error }}
        br
        
        .bottom
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.final Login
                //- br
                //- br
                //- a.googleLogin(:href="googleOpenId")
                //-     img(src="@/assets/img/icon/google.svg")
                //-     span Sign in with Google
                br
                br
                RouterLink.forgot(to="/forgot") Forgot Email & Password?
                .signup 
                    span No account?
                    router-link(to="/signup") Sign up

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
import { skapi } from '@/code/admin'
import { user } from '@/code/user'
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();

let showPassword = ref(false);
let promiseRunning = ref(false);
let error = ref(null);
let form = {
    email: '',
    password: '',
};

let checkLocalSetorage = (e) => {
    localStorage.setItem('remember', e.target.checked ? 'true' : 'false');
}

let login = (e) => {
    promiseRunning.value = true;

    let params = {
        email: form.email,
        password: form.password
    }

    skapi.login(params).then(u => {
        Object.assign(user, u);
        router.push('/my-services');
    }).catch(err => {
        for (let k in user) {
            delete user[k];
        }
        if (err.code === "SIGNUP_CONFIRMATION_NEEDED") {
            router.push({ path: '/confirmation', query: { email: form.email } });
        } else if (err.code === "USER_IS_DISABLED") {
            error.value = "This account is disabled."
        } else if (err.code === "INCORRECT_USERNAME_OR_PASSWORD") {
            error.value = "Incorrect email or password."
        } else if (err.code === "NOT_EXISTS") {
            error.value = "Incorrect email or password."
        } else {
            error.value = err.message;
        }
    }).finally(()=>{
        promiseRunning.value = false;
    })
}
</script>

<style scoped lang="less">
#login {
    max-width: 440px;
    padding: 0 20px;
    margin: 0 auto;
}
form {
    > div, label {
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
        background-color: rgba(0,0,0,0.05);
    }
    a {
        font-size: 16px;
        text-decoration: none;
        color: var(--main-color);
    }
    .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .bottom {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        flex-direction: row-reverse;

        .forgot {
            display: none;
        }
        .signup {
            a {
                font-weight: 700;
                margin-left: 8px;
            }
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
        .actions {
            .forgot {
                display: none;
            }
        }
        .bottom {
            height: unset;
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