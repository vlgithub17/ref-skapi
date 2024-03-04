<template lang="pug">
header#navBar 
    .left 
        router-link(to="/") logo
    .right(:class="{'flex' : route.params.service && currentService}")
        router-link.service(v-if="route.params.service && currentService" :to="`/my-services/${currentService.service}`") {{ currentService.service }}
        .routeWrap
            a(href="https://docs.skapi.com" target="_blank") Documentation
            router-link(to="/my-services") My Services
            .prof F
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { currentService } from '@/data.js';

const router = useRouter();
const route = useRoute();
</script>

<style lang="less" scoped>
#navBar {
    position: relative;
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    left: unset;
    top: unset;
    background-color: unset;
    color: var(--secondary-text);
    
    &.home {
        position: fixed;
        width: 100%;
        background-color: #262626;
        left: 0;
        top: 0;
        color: #fff;

        a {
            color: #fff;
        }
    }
    .left {
        width: 240px;
    }
    .right {
        width: calc(100vw - 240px);
        text-align: right;

        &.flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    a {
        text-decoration: none;
        color: var(--secondary-text);
    }
}
.service {
    font-size: 1rem;
    font-weight: 700;
    color: var(--main-color) !important;
}
.routeWrap {
    a {
        margin-right: 1rem;
    }
    .prof {
        display: inline-block;
    }
}
</style>