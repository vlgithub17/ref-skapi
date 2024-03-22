<template lang="pug">
NavBar(:class="{ 'home' :route.name == 'home'}")
router-view
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { hideMoreVert } from '@/assets/js/event.js'
import NavBar from '@/components/navBar.vue';

hideMoreVert();

const router = useRouter();
const route = useRoute();

</script>

<style lang="less" scoped>

</style>