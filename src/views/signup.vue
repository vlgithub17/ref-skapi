<template lang="pug">
br
br
br

#signup
    router-link(to="/")
        img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

    .bottomLineTitle Sign Up

    form(@submit.prevent="signup")
        p Enter your Email and create a password.

        br
        
        label
            | Email
            input.big(type="email" 
            :value='form.email' 
            @input="e=> { form.email = e.target.value; }"
            placeholder="your@email.com" 
            required)


        label.passwordInput
            | Create Password
            input.big(:type='showPassword ? "text" : "password"'
            ref="passwordField" 
            @input="e=> { form.password = e.target.value; e.target.setCustomValidity(''); error = '' }"
            minlength="6"
            maxlength="60"
            placeholder="At least 6 characters" 
            required)
            //- .passwordIcon(@click="showPassword = !showPassword")
            //-     template(v-if="showPassword")
            //-         //- .material-symbols-outlined.notranslate.fill visibility
            //-         svg.svgIcon(style="fill: var(--black-6)")
            //-             use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-fill")
            //-     template(v-else)
            //-         //- .material-symbols-outlined.notranslate.fill visibility_off
            //-         svg.svgIcon(style="fill: var(--black-6)")
            //-             use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-off-fill")

        label.passwordInput
            | Confirm password
            input.big(:type='showPassword ? "text" : "password"'
            ref="confirmPasswordField" 
            @input="e=> { form.password_confirm = e.target.value; e.target.setCustomValidity(''); error = '' }"
            @change="validatePassword"
            placeholder="Enter your password again to confirm" 
            required)
            //- .passwordIcon(@click="showPassword = !showPassword")
            //-     template(v-if="showPassword")
            //-         //- .material-symbols-outlined.notranslate.fill visibility
            //-         svg.svgIcon(style="fill: var(--black-6)")
            //-             use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-fill")
            //-     template(v-else)
            //-         //- .material-symbols-outlined.notranslate.fill visibility_off
            //-         svg.svgIcon(style="fill: var(--black-6)")
            //-             use(xlink:href="@/assets/img/material-icon.svg#icon-visibility-off-fill")

        .actions 
            Checkbox(v-model="form.subscribe" style='font-weight:unset;') I agree to receive newsletters from Skapi.

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
                button.final Sign-up
                .signup 
                    | Have an account?&nbsp;
                    RouterLink(:to="{name: 'login'}") Login
        
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

let showPassword = ref(false);
let promiseRunning = ref(false);
let passwordField = ref(null);
let confirmPasswordField = ref(null);
let error = ref(null);
let form = ref({
    email: '',
    password: '',
    password_confirm: '',
    subscribe: true,
});
let routeQuery = route.query;
onMounted(() => {
	console.log({routeQuery})
});

let validatePassword = () => {
    if (form.value.password_confirm !== form.value.password) {
        confirmPasswordField.value.setCustomValidity('Password does not match');
        confirmPasswordField.value.reportValidity();
    }
}

let signup = (e) => {
    error.value = '';
    promiseRunning.value = true;

    let params = {
        email: form.value.email,
        password: form.value.password,
    }
    let options = {
        signup_confirmation: '/success',
        email_subscription: form.value.subscribe
    }

	if(routeQuery?.suc_redirect) {
		options.signup_confirmation = options.signup_confirmation + '?suc_redirect=' + routeQuery.suc_redirect
	}

    skapi.signup(params, options).then(res => {
        router.push({ path: '/confirmation', query: { email: form.value.email } })
    }).catch(err => {
        promiseRunning.value = false;

        switch (err.code) {
            case 'EXISTS':
            case 'UsernameExistsException' :
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