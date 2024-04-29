<template lang="pug">
router-view(v-if='loaded')
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';
import { updateUser } from './code/user';
import { callServiceList } from './views/service-list';
import { hideMoreVert } from '@/assets/js/event.js'

const router = useRouter();
const route = useRoute();

let loaded = ref(false);
callServiceList.value = true;

updateUser(true).finally(() => {
    loaded.value = true;
});

onMounted(() => {
    document.addEventListener('click', hideMoreVert);
})

onUnmounted(() => {
    document.removeEventListener('click', hideMoreVert);
})
</script>