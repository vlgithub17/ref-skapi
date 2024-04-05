<template lang="pug">
router-view(v-if='loaded')
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { skapi } from './code/admin';
import { user } from './code/user';
import { callServiceList } from './views/service-list';

let loaded = ref(false);
skapi.getProfile().then(u => {
    callServiceList.value = true;
    if (u) {
        // Object.assign(user, u);
        for (let k in user) {
            delete user[k]
        }
        for (let k in u) {
            user[k] = u[k]
        }
    }
}).finally(() => {
    loaded.value = true;
});

const router = useRouter();
const route = useRoute();
</script>

<style lang="less" scoped></style>