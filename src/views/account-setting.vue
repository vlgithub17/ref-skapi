<template lang="pug">
br
br
br
br
br

#accountSetting 
    .left 
        .menu.active
            .material-symbols-outlined.icon.fill.nohover person
            span Account Info
        .menu
            .material-symbols-outlined.icon.fill.nohover delete
            span Delete Account
    .right 
        .infoBox
            .info 
                .smallTitle 
                    | Email 
                    .material-symbols-outlined.fill edit
                .smallValue {{ user.email }}
            .info 
                .smallTitle 
                    | Verify Email 
                    .material-symbols-outlined.fill(v-if="!user.email_verified") send
                .smallValue 
                    template(v-if="user.email_verified")
                        .material-symbols-outlined.fill check_circle
                        span(style="margin-left:5px;") Verified
                    template(v-else)
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
                    .material-symbols-outlined.fill edit
</template>

<script setup lang="ts">
import { skapi } from '@/code/admin';
import { loginState, user } from '@/code/user';
import { computed, ref } from 'vue';

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
    display: flex;
    flex-wrap: nowrap;

    .left {
        padding-left: 20px;
    }

    .right {
        width: 50%;
        flex-grow: 1;
        padding: 0 20px;

        >div {
            margin: 0 auto;
        }
    }
}
.menu {
    color: var(--main-color);
    padding: 12px;

    &.active {
        span {
            font-weight: bold;
        }
    }

    span {
        font-size: 1rem;
        font-weight: 500;
        margin-left: 13px;
        padding-right: 60px;
    }
}
.info {
    margin-bottom: 0.75rem;

    .edit {
        margin-left: 5px;
    }
}
.smallTitle {
    display: inline-block;
    width: 200px;
}
.smallValue {
    display: inline-block;
}
</style>