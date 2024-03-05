<template lang="pug">
header#navBar 
    .left 
        router-link(to="/") logo
    .right
        .inner(:class="{'flex' : route.params.service && currentService}")
            router-link.service(v-if="route.params.service && currentService" :to="`/my-services/${currentService.service}`") {{ currentService.service }}
            .routeWrap
                a.doc(href="https://docs.skapi.com" target="_blank") Documentation
                router-link.ser(to="/my-services") My Services
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
        width: 11rem;
        padding-left: 20px;
    }
    .right {
        flex-grow: 1;
        text-align: right;
        padding: 0 20px;

        .inner {
            &.flex {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
    a {
        text-decoration: none;
        color: var(--secondary-text);
        display: inline-block;
        font-weight: 700;
    }
}
.service {
    font-size: 1rem;
    font-weight: 700;
    color: var(--main-color) !important;
}
.routeWrap {
    .ser {
        padding: 0 1rem;
    }
    .prof {
        display: inline-block;
    }
}

@media (max-width:1023px) {
    #navBar {
        .left {
            width: 2.5rem;
        }
    }
}

@media (max-width:767px) {
    .routeWrap {
        .doc, .prof {
            display: none !important;
        }
        .ser {
            padding-right: 0;
        }
    }
}
</style>