<template lang="pug">
router-view(v-if='loaded')
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { skapi } from './code/admin';
import { user } from './code/user';
import Service from './code/service';
import { callServiceList, serviceList, serviceIdList } from './views/service-list';

let loaded = ref(false);

skapi.getProfile().then(u => {
    callServiceList.value = true;

    if (u) {
        Object.assign(user, u);
        console.log(u)

        skapi.getUsers({
            searchFor: "user_id",
            value: u.user_id
        }).then(async uInfo => {
            Object.assign(serviceIdList, uInfo.list[0].services.reverse());

            for (let serviceId of serviceIdList) {
                Service.load(serviceId).then(serviceObj => {
                    serviceList[serviceId] = serviceObj;
                    callServiceList.value = false;
                })
            }
        });
    }
}).finally(() => {
    loaded.value = true;
});

const router = useRouter();
const route = useRoute();
</script>

<style lang="less" scoped></style>