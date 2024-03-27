<template lang="pug">
router-view(v-if='loaded')
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { skapi } from './code/admin';
import { user } from './code/user';
import { ref } from 'vue';
import Service from './code/service';

let loaded = ref(false);

skapi.getProfile().then(async u => {
    if (u) {
        Object.assign(user, u);
        console.log(u)

        let uInfo = await skapi.getUsers({
            searchFor: "user_id",
            value: u.user_id
        });

        let serviceIdList = uInfo.list[0].services;

        for(let serviceId of serviceIdList) {
            console.log(serviceId)
            Service.load(serviceId).then(sobj=>console.log(sobj))
        }
    }
}).finally(()=>{
    loaded.value = true;
});

const router = useRouter();
const route = useRoute();
</script>

<style lang="less" scoped>

</style>