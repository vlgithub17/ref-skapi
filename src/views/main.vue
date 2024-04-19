<template lang="pug">
NavBar
router-view
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import NavBar from '@/components/navBar.vue';

const router = useRouter();
const route = useRoute();
</script>

<style lang="less" scoped>

</style>