<template lang="pug">
br
br
br

#confirmation 
    router-link(to="/")
        img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

    .bottomLineTitle Delete Account

    p Once your account is deleted, you will not be able to recover it.

    p Please note:
    ul(style='padding-left: 1em;')
        li All your data will be deleted permanently.

        li All your subscription plans will be cancelled.

        li All your services will be removed.

        li All your subdomains will be removed immediately.

        li The remaining subscription cannot be refunded.

    br
    
    p Are you sure you want to delete your account?

    Checkbox(v-model="iUnderstand" :disabled="promiseRunning")
        b I agree to delete my account.

    br
    br
    br

    .bottom
        div(v-if="promiseRunning" style="width:100%; text-align:center")
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine.warning(type="button" @click="router.push('/account-setting')") Cancel
            | &nbsp;&nbsp;
            button.final.warning(:class="{disabled: !iUnderstand}" @click='processDelete') Delete

br
br
br
</template>

<script setup lang="ts">
import { skapi } from '@/main';
import { useRoute, useRouter } from 'vue-router';
import Checkbox from '@/components/checkbox.vue';
import { serviceList } from './service-list';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
let iUnderstand = ref(false);
let promiseRunning = ref(false);

let processDelete = async () => {
    promiseRunning.value = true;
    
    try {
        let disables = [];
        let cancelSubs = [];
        for (let k in serviceList) {
            disables.push(serviceList[k].disableService());
            disables.push(serviceList[k].registerSubdomain())
        }
        await Promise.all(disables);

        for (let k in serviceList) {
            cancelSubs.push(serviceList[k].cancelSubscription());
        }
        await Promise.all(cancelSubs);
        await skapi.disableAccount();
        router.push('/bye')
    }
    catch (err: any) {
        promiseRunning.value = false;
        alert(err.message);
    }
}
</script>

<style scoped lang="less">
#confirmation {
    max-width: 640px;
    padding: 0 20px;
    margin: 0 auto;

    .bottom {
        min-height: 44px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>