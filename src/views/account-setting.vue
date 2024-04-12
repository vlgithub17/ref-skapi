<template lang="pug">
br
br
br

#accountSetting 
    .infoBox
        .infoTitle Account Settings

        hr

        .infoValue
            .smallTitle Email
            template(v-if="modifyMode")
                form.editValue(@submit.prevent="changeEmail")
                    input(type="email" spellcheck="false" :value="inputEmail" @input="(e) => {e.target.setCustomValidity('');inputEmail = e.target.value;}" placeholder="your@email.com" required)

                    template(v-if="updatingValue")
                        img.loading(src="@/assets/img/loading.png")
                    label.material-symbols-outlined.save(v-else) done
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(@click="modifyMode = false;") close

            template(v-else)
                .ellipsis {{ user.email }}&nbsp;
                .editHandle(@click="editEmail") [EDIT]

        .infoValue
            .smallTitle Verify Email
            .smallValue(v-if="user.email_verified" style="font-size:0.8rem;color:var(--main-color);")
                .material-symbols-outlined.fill check_circle
                span &nbsp;Verified
            .iconClick.smallValue(v-else style="color:var(--caution-color);" @click="proceedVerification = true;")
                .material-symbols-outlined.fill(style='font-size:24px;') error
                span &nbsp;Unverified

        .infoValue
            .smallTitle Newsletter
            .smallValue 
                Checkbox(v-model="newsletterSubscribed" :disabled="!user.email_verified") Subscribe {{ !user.email_verified ? '(Verification required)' : '' }}

        .infoValue
            .smallTitle Password 
            router-link(to='/password' style='font-size:0.8rem;') Change Password

        hr(style="background:rgba(0,0,0,0.15);height:1px;border:0;margin:1rem 0")

        div(style="text-align:right")
            .iconClick(style='color:var(--caution-color);font-size:0.66rem;')
                .material-symbols-outlined.fill(style='font-size:24px;') cancel
                span &nbsp;&nbsp;Delete Account

Modal(:open="proceedVerification")
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
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine(@click="proceedVerification = false") Cancel
            button.final(@click="sendEmail") Proceed

</template>

<script setup lang="ts">
import { skapi } from '@/code/admin';
import { user, updateUser } from '@/code/user';
import router from '@/router';
import { computed, ref, nextTick, watch } from 'vue';
import Modal from '@/components/modal.vue';
import Checkbox from '@/components/checkbox.vue';
let modifyMode = ref(false);
let updatingValue = ref(false);
let inputEmail = '';
let sendingEmail = ref(false);
let editEmail = () => {
    inputEmail = user.email;
    modifyMode.value = true;
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
            email: inputEmail
        });
        updatingValue.value = false;
        modifyMode.value = false;
        updateUser();
    }
    catch (err) {
        updatingValue.value = false;
        nextTick(() => {
            document.getElementById('modifyCors').focus();
            document.getElementById('modifyCors').setCustomValidity(err.message);
            document.getElementById('modifyCors').reportValidity();
        });
    }
}

let proceedVerification = ref(false);
let newsletterSubscribed = ref(false);

watch(newsletterSubscribed, () => {
    updateUser();
})
</script>

<style scoped lang="less">
#accountSetting {
    position: relative;
    padding: 8px;
}

.infoBox {
    max-width: 600px;
    margin: 0 auto;
}
</style>