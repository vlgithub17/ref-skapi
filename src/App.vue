<template lang="pug">
router-view(v-if='loaded')
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { updateUser } from './code/user';
import { callServiceList } from './views/service-list';

let loaded = ref(false);
callServiceList.value = true;

updateUser().finally(() => {
    loaded.value = true;
});

const router = useRouter();
const route = useRoute();
</script>