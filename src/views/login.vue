<template lang="pug">
br
br
br

#login
    router-link(to="/")
        img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

    .bottomLineTitle Login

    br

    form(@submit.prevent="login")
        label
            | Email
            input.big(type="email" @input="e=> { form.email = e.target.value; error='';}" :disabled="promiseRunning" placeholder="your@email.com" required)

        label.passwordInput
            | Password
            input.big(:type='showPassword ? "text" : "password"'
            @input="(e)=>{form.password = e.target.value; error='';}" 
            :disabled="promiseRunning"
            name="password" placeholder="Enter password" required)
            //- .passwordIcon(@click.stop="showPassword = !showPassword")
            //-     template(v-if="showPassword")
            //-         //- .material-symbols-outlined.notranslate.fill visibility
            //-         svg.svgIcon(style="fill: var(--black-6)")
            //-             use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-fill")
            //-     template(v-else)
            //-         //- .material-symbols-outlined.notranslate.fill visibility_off
            //-         svg.svgIcon(style="fill: var(--black-6)")
            //-             use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-off-fill")

        .actions
            Checkbox(style='font-weight:unset;' @change="(e)=>{setLocalStorage(e)}" :disabled='promiseRunning' v-model='remVal') Remember Me
            RouterLink(to="/forgot" :class='{disabled: promiseRunning}') Forgot Password?

        br

        .error(v-if="error")
            //- .material-symbols-outlined.notranslate.fill error
            svg
                use(xlink:href="@/assets/img/material-icon.svg#icon-error-fill")
            div(v-if="enableAccount")
                | {{ error }}
                br
                br
            span(v-else) {{ error }}

        .error(v-if="enableAccount" style="align-items: center;")
            router-link(:to='"/enable-account/" + form.email') [Click Here]
            span &nbsp;to enable your account.

        br

        .bottom
            div(v-if="promiseRunning" style="width:100%; text-align:center")
                .loader(style="--loader-color:blue; --loader-size:12px")
            template(v-else)
                button.final Login
                .signup
                    span No account?&nbsp;
                    router-link(to="/signup") Sign up
    
    br
    br
    br
    
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { skapi } from '@/main'
import { user } from '@/code/user'
import { onMounted, ref } from 'vue';
import Checkbox from '@/components/checkbox.vue';
const router = useRouter();
const route = useRoute();
skapi.logout().then(() => {
    for (let k in user) {
        delete user[k];
    }
});
let showPassword = ref(false);
let remVal = ref(false); // dom 업데이트시 checkbox value 유지하기 위함
let promiseRunning = ref(false);
let error = ref(null);
let form = {
    email: '',
    password: '',
};
let enableAccount = ref(false);

onMounted(() => {
    if (window.localStorage.getItem('remember') === 'true') {
        remVal.value = true;
    } else {
        remVal.value = false;
    }
})
let setLocalStorage = (e) => {
    localStorage.setItem('remember', e.target.checked ? 'true' : 'false');
}

let login = (e) => {
    promiseRunning.value = true;

    let params = {
        email: form.email,
        password: form.password
    }

    skapi.login(params).then(u => {
        for(let k in u) {
            user[k] = u[k];
        }
		if(route.query?.suc_redirect) {
			router.push(route.query?.suc_redirect);
		} else {
			router.push('/my-services');
		}
    }).catch(err => {
        for (let k in user) {
            delete user[k];
        }
        if (err.code === "SIGNUP_CONFIRMATION_NEEDED") {
            router.push({ path: '/confirmation', query: { email: form.email } });
        }
        else if (err.code === "USER_IS_DISABLED") {
            error.value = "This account is disabled.";
            enableAccount.value = true;
        }
        else if (err.code === "INCORRECT_USERNAME_OR_PASSWORD") {
            error.value = "Incorrect email or password."
        }
        else if (err.code === "NOT_EXISTS") {
            error.value = "Incorrect email or password."
        }
        else {
            error.value = err.message;
        }
    }).finally(() => {
        promiseRunning.value = false;
    })
}
</script>

<style scoped lang="less">
#login {
    max-width: 480px;
    padding: 0 20px;
    margin: 0 auto;
}

form {
    padding: 8px;
    
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