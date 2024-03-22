<template lang="pug">
router-view(v-if='loaded')
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { skapi } from './code/admin';
import { user } from './code/user';
import { ref } from 'vue';

let loaded = ref(false);

skapi.getProfile().then(u => {
    if (u) {
        Object.assign(user, u);
    }
}).finally(()=>{
    loaded.value = true;
});

const router = useRouter();
const route = useRoute();
</script>

<style lang="less" scoped>

</style>