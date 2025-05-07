<template lang="pug">
main#accountSetting
    .title Account Settings
        .delete-icon(@click="router.push('/delete-account')")
            svg
                use(xlink:href="@/assets/img/material-icon.svg#icon-delete")
    .desc Edit your account details down below.

    br

    .bar-wrap
        .bar(:class="{active: activeBar === 'email'}" @click="activeBar = 'email'") Email
        .bar(:class="{active: activeBar === 'password'}" @click="activeBar = 'password'") Password
        .bar(:class="{active: activeBar === 'newsletters'}" @click="activeBar = 'newsletters'") Newsletters

    .form-wrap
        template(v-if="activeBar === 'email'")
            .form-title Email
            form(@submit.prevent="changeEmail" style='margin-bottom:12px;')
                input.big(type="email" ref='emailInp' spellcheck="false" :value="inputEmail" :disabled="updatingValue || !user.email_verified" @input="(e) => {e.target.setCustomValidity('');inputEmail = e.target.value;}" placeholder="your@email.com" required)
                button.final(style="width:100%; margin-bottom:0.5rem" :class="{disabled: updatingValue || inputEmail === user.email}")
                    template(v-if="updatingValue")
                        .loader(style="--loader-color:#fff; --loader-size:12px")
                    template(v-else) Change Email
                button.final.warning(v-if="!user.email_verified" style="width:100%;" @click="proceedVerification = true;") Verify Email
        template(v-else-if="activeBar === 'password'")
            .form-title Password
            form(@submit.prevent="changePassword" style='margin-bottom:12px;')
                input.big.disabled(type="password" ref='passwordInp' value="********")
                button.final(style="width:100%" @click="router.push('/change-password')") Change Password
        template(v-else-if="activeBar === 'newsletters'")
            button(:class="{unFinished: emailSubscribed, final: subing_email || !emailSubscribed, disabled: !user.email_verified || subing_email || emailSubscribed === null}" @click="emailSubscribed = !emailSubscribed" style="width:100%; margin-bottom:0.5rem")
                template(v-if="subing_email")
                    .loader(style="--loader-color:#fff; --loader-size:12px")
                template(v-else)
                    template(v-if="emailSubscribed") Unsubscribe from newsletters
                    template(v-else) Subscribe to newsletters
        //- template(v-else-if="activeBar === 'account'")
            .form-title Delete Account
            //- .desc This action will delete your account and all of your data.
            button.final.warning(style="width:100%" @click="router.push('/delete-account')") Delete Account
            //- template(v-if="updatingValue")
                .loader(style="--loader-color:blue; --loader-size:12px")
            //- label.material-symbols-outlined.notranslate.save(v-else) done
            //- label(v-else)
                svg.svgIcon.clickable.save
                    use(xlink:href="@/assets/img/material-icon.svg#icon-check")
                input(type="submit" hidden)
            //- span.material-symbols-outlined.notranslate.cancel(@click="modifyMode = false;") close
            //- svg.svgIcon.black.clickable.cancel(@click="modifyMode = false;")
                use(xlink:href="@/assets/img/material-icon.svg#icon-close")
//- br
//- br
//- br

//- #accountSetting 
    .infoBox
        .infoTitle Account Settings

        hr

        .infoValue(style='margin-bottom:0;')
            .smallTitle Email:
            template(v-if="modifyMode")
                form.editValue(@submit.prevent="changeEmail" style='margin-bottom:12px;')
                    input.big(type="email" ref='emailInp' spellcheck="false" :value="inputEmail" @input="(e) => {e.target.setCustomValidity('');inputEmail = e.target.value;}" placeholder="your@email.com" required)

                    template(v-if="updatingValue")
                        .loader(style="--loader-color:blue; --loader-size:12px")
                    //- label.material-symbols-outlined.notranslate.save(v-else) done
                    label(v-else)
                        svg.svgIcon.clickable.save
                            use(xlink:href="@/assets/img/material-icon.svg#icon-check")
                        input(type="submit" hidden)
                    //- span.material-symbols-outlined.notranslate.cancel(@click="modifyMode = false;") close
                    svg.svgIcon.black.clickable.cancel(@click="modifyMode = false;")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-close")

            div(v-else style='margin-bottom:12px;')
                .ellipsis {{ user.email }}&nbsp;
                span.editHandle(@click="editEmail") [CHANGE]

        .infoValue
            .smallTitle Password:
            div
                .ellipsis ******...&nbsp;
                router-link.editHandle(to='/change-password') [CHANGE]

        div(v-if="user.email_verified")
            Checkbox(v-model="emailSubscribed" :disabled="!user.email_verified || subing_email || emailSubscribed === null") Receive newsletters from Skapi.
        .iconClick(v-else style="color:var(--caution-color);display:inline-flex" @click="proceedVerification = true;")
            //- .material-symbols-outlined.notranslate.fill(style='font-size:24px;') error
            svg.svgIcon.clickable.danger(style="height: 24px; width: 24px;")
                use(xlink:href="@/assets/img/material-icon.svg#icon-error-fill")
            span &nbsp;Click to verify your email address
        hr

        div(style="text-align:right")
            router-link.iconClick.square(to='/delete-account' style='color:var(--caution-color);font-size:0.66rem;')
            
                //- .material-symbols-outlined.notranslate.fill(style='font-size:24px;') cancel
                svg.svgIcon.clickable.danger(style="height: 24px; width: 24px;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-cancel-fill")
                span &nbsp;Delete Account
br
br
br
Modal(:open="proceedVerification" @close="proceedVerification=false")
    h4(style='margin:.5em 0 0;') Email Verification
    hr

    div(style='font-size:.8rem;')
        p.
            Would you like to verify your email address?
            #[br]
            The verification code will be sent to #[b {{ user.email }}]
    br
    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        template(v-if='sendingEmail')
            .loader(style="--loader-color:blue; --loader-size:12px; margin:0 auto")
        template(v-else)
            button.noLine(@click="proceedVerification = false") Cancel
            button.final(@click="sendEmail") Proceed

</template>

<script setup lang="ts">
import { skapi } from '@/main';
import { user, emailSubscribed } from '@/code/user';
import router from '@/router';
import { computed, ref, nextTick, watch, onMounted } from 'vue';
import Modal from '@/components/modal.vue';
import Checkbox from '@/components/checkbox.vue';

let activeBar = ref('email');
let modifyMode = ref(false);
let updatingValue = ref(false);
let inputEmail = ref(user.email);
let sendingEmail = ref(false);
let emailInp = ref();
let subing_email = ref(false);
let editEmail = () => {
    inputEmail.value = user.email;
    modifyMode.value = true;
    nextTick(() => {
        emailInp.value.focus();
    });
}
let sendEmail = async () => {
    sendingEmail.value = true;
    try {
        await skapi.verifyEmail();
        router.push('/verification');
    } catch (err) {
        window.alert(err.message);
    }
    finally {
        proceedVerification.value = false
    }
}
let changeEmail = async () => {
    updatingValue.value = true;
    try {
        await skapi.updateProfile({
            email: inputEmail.value
        });
        updatingValue.value = false;
        modifyMode.value = false;
    }
    catch (err) {
        updatingValue.value = false;
        nextTick(() => {
            emailInp.value.focus();
            emailInp.value.setCustomValidity(err.message);
            emailInp.value.reportValidity();
        });
    }
}

let proceedVerification = ref(false);

watch(emailSubscribed, async (n, o) => {
    if (o === null) return;

    subing_email.value = true
    if (n) {
        await skapi.subscribeNewsletter({
            group: 'authorized'
        });
    }
    else {
        await skapi.unsubscribeNewsletter({
            group: 'authorized'
        });
    }
    subing_email.value = false
})
</script>

<style scoped lang="less">
#accountSetting {
    max-width: 1200px;
    margin: 8px auto 0;
    padding: 0 10px;
    padding-top: 3rem;
}

.title {
    position: relative;
    font-size: 1.3rem;
    margin-bottom: 8px;

    .delete-icon {
        position: absolute;
        right: 0;
        bottom: -1.5rem;

        svg {
            width: 24px;
            height: 24px;
            cursor: pointer;
            fill: #ccc
        }

        &:hover {
            svg {
                fill: var(--caution-color);
            }
        }
    }
}

.desc {
    font-size: 0.9rem;
}

.bar-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgb(248, 249, 251);
    padding: 4px;
    border-radius: 8px;
    gap: 4px;

    .bar {
        padding: 8px 30px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        user-select: none;

        &.active {
            background-color: #fff;
        }

        // flex: 1;
        // padding: 8px;
        // text-align: center;
        // font-size: 0.9rem;
        // font-weight: 500;
        // color: var(--main-color);
        // cursor: pointer;

        // &:hover {
        //     background-color: rgba(41, 63, 230, 0.1);
        //     border-radius: 4px;
        // }
    }
}

.form-wrap {
    max-width: 530px;
    margin: 0 auto;
    padding: 3rem 0;

    .form-title {
        margin-bottom: 8px;
    }

    input {
        margin-bottom: 0.5rem;
    }
}

@media (max-width: 600px) {
    .title {
        .delete-icon {
            bottom: unset;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}

// .infoBox {
//     max-width: 600px;
//     margin: 0 auto;

//     .svgIcon {
//         height: 28px;
//         width: 28px;
//     }

//     svg:hover {
//         border-radius: 50%;
//         background-color: rgba(41, 63, 230, 0.1);
//     }
// }</style>