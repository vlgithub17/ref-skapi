<template lang="pug">
br
br
br

#confirmation 
    router-link(to="/")
        img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

    .bottomLineTitle Delete Account

    p Are you sure you want to delete your account? This action is irreversible. 
    
    p
        | All your data will be deleted permanently.
        br
        | All your subscription plan will be cancelled.
    
    Checkbox(v-model="iUnderstand" :disabled="promiseRunning")
        b I agree to delete my account.

    br
    br

    .bottom
        template(v-if="promiseRunning")
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine.warning(type="button" @click="router.push('/account-setting')") Cancel
            button.unFinished.warning(type="submit") Delete

</template>

<script setup lang="ts">
import { skapi } from '@/code/admin';
import { useRoute, useRouter } from 'vue-router';
import Checkbox from '@/components/checkbox.vue';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
let iUnderstand = ref(false);
let promiseRunning = ref(false);
</script>

<style scoped lang="less">
#confirmation {
    max-width: 440px;
    padding: 0 20px;
    margin: 0 auto;

    .bottom {
        min-height: 44px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }
}
</style>