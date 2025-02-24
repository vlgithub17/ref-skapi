<template lang="pug">
br
br
br

#confirmation 
    router-link(:to="'/my-services/' + serviceId")
        img(src="@/assets/img/logo/symbol-logo.png" style="width: 40px;")

    .bottomLineTitle Delete Service

    p Once you delete your service you will not be able to recover it.

    p Please note:
    ul(style='padding-left: 1em;')
        li Your website will be disconnected from the service.

        li All your service users and data will be deleted permanently.

        li All your hosted files will be deleted immediately.

        li You will lose your subdomain registration.

        li The remaining subscription cannot be refunded.

    br

    p Are you sure you want to delete your service "#[b {{currentService.service.name}}]"?

    Checkbox(v-model="iUnderstand" :disabled="promiseRunning")
        b I agree to delete my service "{{currentService.service.name}}".

    br
    br
    br

    .bottom
        div(v-if="promiseRunning" style="width:100%; text-align:center")
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine.warning(type="button" @click="router.push('/my-services/' + serviceId + '/dashboard')") Cancel
            | &nbsp;&nbsp;
            button.final.warning(type="submit" :class="{disabled: !iUnderstand}" @click='deleteService()') Delete

br
br
br
    
</template>

<script setup lang="ts">
import { skapi } from '@/main';
import { currentService } from '@/views/service/main';
import { useRoute, useRouter } from 'vue-router';
import Checkbox from '@/components/checkbox.vue';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
let iUnderstand = ref(false);
let promiseRunning = ref(false);
let serviceId = route.params.id as string;

let deleteService = async () => {
    promiseRunning.value = true;
    try {
        await currentService.deleteSubscription();
        await currentService.deleteService();
        let url = window.location.origin + '/my-services';
        window.location = url;
    }
    catch (err) {
        promiseRunning.value = false;
        alert(err.message);
        return;
    }
}
</script>

<style scoped lang="less">
#confirmation {
    max-width: 600px;
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