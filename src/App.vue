<template lang="pug">
div(style='min-height: calc(100vh - 1px - var(--footer-height, 0));' :style='{"--footer-height": footerHeight+"px"}')
    router-view(v-if='loaded')

footer#footer
    img(src="@/assets/img/logo/logo-white.svg" style="height:.88rem;")
    router-link(to="/pp.html" target="_blank") Terms of service • Privacy policy
    span.hideOnMobile BROADWAYINC PTE. LTD. Singapore.
    
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
let footerHeight = ref(0);
updateUser(true).finally(() => {
    loaded.value = true;
});

onMounted(() => {
    document.addEventListener('click', hideMoreVert);

    // get footer height
    footerHeight.value = document.getElementById('footer').offsetHeight;
    // detect window width change
    window.addEventListener('resize', () => {
        footerHeight.value = document.getElementById('footer').offsetHeight;
    });
})

// onUnmounted(() => {
//     document.removeEventListener('click', hideMoreVert);
// })
</script>
<style lang='less'>
footer {
    background-color: black;

    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    box-shadow: 0px 2px black; // compensate offset calc

    & > * {
        font-size: 0.8rem;
        color: #fff;
        margin: .5rem 8px;
    }
    img {
        margin-top: .88em;
    }
    .hideOnMobile {
        @media (max-width: 600px) {
            display: none;
        }
    }
}
</style>