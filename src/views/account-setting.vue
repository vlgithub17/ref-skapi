<template lang="pug">
br
br
br
br

#accountSetting 
    .infoBox
        .info
            .smallTitle
                | Email 
                .material-symbols-outlined.fill.clickable(@click="editEmail") edit 
            template(v-if="modifyMode")
                form.modifyInputForm(@submit.prevent="changeEmail")
                    .customInput
                        input(type="email" :value="inputEmail" @input="(e) => {inputEmail = e.target.value;}" placeholder="Please enter a valid email address." required)
                    template(v-if="updatingValue")
                        img.loading(src="@/assets/img/loading.png")
                    template(v-else)
                        input#submitInp(type="submit" hidden)
                        label.material-symbols-outlined.save(for='submitInp') done
                        .material-symbols-outlined.cancel(@click="modifyMode = false;") close
            template(v-else)
                .smallValue {{ user.email }}

        .info 
            .smallTitle 
                | Verify Email 
                .material-symbols-outlined.fill.clickable(v-if="!user.email_verified") send
            template(v-if="user.email_verified")
                .smallValue(style="color:var(--main-color)")
                    .material-symbols-outlined.fill check_circle
                    span(style="margin-left:5px;") Verified
            template(v-else)
                .smallValue(style="color:var(--caution-color)") 
                    .material-symbols-outlined.fill error
                    span(style="margin-left:5px;") Unverified

        .info 
            .smallTitle Subscription 
            .smallValue 
                .customCheckBox(:class="{'nonClickable' : !user.email_verified}" :style='{opacity: disableNewsletterCheckbox ? ".5" : "1"}')
                    input#subscribeCheckbox(type="checkbox" v-model='newsletterSubscribed' :disabled="disableNewsletterCheckbox")
                    label(for="subscribeCheckbox")
                        span(style="font-weight:400") Subscribe to Skapi newsletter
                        .material-symbols-outlined.mid.check(:style="{cursor: disableNewsletterCheckbox ? 'default' : null }") check
        
        .info 
            .smallTitle 
                | Password 
                .material-symbols-outlined.fill.clickable lock_reset

        hr(style="background:rgba(0,0,0,0.15);height:1px;border:0;margin:1rem 0")

        .info(style="text-align:right")
            .smallTitle(style="cursor:pointer")
                | Delete Account 
                .material-symbols-outlined.fill.nohover delete
</template>

<script setup lang="ts">
import { skapi } from '@/code/admin';
import { loginState, user } from '@/code/user';
import { computed, ref } from 'vue';

let modifyMode = ref(false);
let updatingValue = ref(false);
let inputEmail = '';

let editEmail = () => {
    if (user.email_verified) {
        inputEmail = user.email;
        modifyMode.value = true;
    } else {
        return false;
    }
}

let newsletterPromise = ref(null);
let newsletterSubscribed = ref(null);

// if (user.hasOwnProperty('_newsletterSubscribed')) {
//     newsletterSubscribed.value = user._newsletterSubscribed;
// }
// else {
//     skapi.getNewsletterSubscription({
//         group: 2
//     }).then(s => {
//         console.log(s)
//         // if (s.length) {
//         //     newsletterSubscribed.value = true;
//         //     user._newsletterSubscribed = true;
//         // }
//         // else {
//         //     newsletterSubscribed.value = false;
//         //     user._newsletterSubscribed = false;
//         // }
//     })
// }

let disableNewsletterCheckbox = computed(() => {
    // 사용자 email이 인증이 안되었을시 뉴스레터를 구독할수없습니다.
    if (!user.hasOwnProperty('_newsletterSubscribed') || newsletterPromise.value) {
        return true;
    }
    if (!user.email_verified) {
        if (user._newsletterSubscribed) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
})
console.log(user)
</script>

<style scoped lang="less">
#accountSetting {
    position: relative;
    max-width: 100%;
    padding: 20px;
}
.infoBox {
    max-width: 600px;
    margin: 0 auto;
}
.info {
    margin-bottom: 0.75rem;

    &:last-child {
        margin-bottom: 0;
    }
    .edit {
        margin-left: 5px;
    }
}
.ellipsis {
    max-width: 100%;
}
.modifyInputForm {
    width: 100%;
    margin-top: 0.25rem;
}
.smallTitle {
    display: inline-block;
    width: 200px;
}
.smallValue {
    display: inline-block;
}
</style>