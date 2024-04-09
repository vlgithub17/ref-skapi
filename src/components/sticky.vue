<template lang="pug">
.dummy(:style='{height:height+"px", width:fixWidth ? width + "px" : null}')
._sticky(ref="sticky")
    slot
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
let { fixWidth } = defineProps({
    fixWidth: Boolean
});

let sticky = ref(null);
let height = ref(0);
let width = ref(null);

let setWidth = async () => {
    await nextTick();
    let elSt = window.getComputedStyle(sticky.value);
    height.value = parseFloat(elSt.height);
    width.value = parseFloat(elSt.width);
}


onMounted(()=>{
    if(fixWidth){
        setWidth();
        window.addEventListener('resize', setWidth);
    }
});

onBeforeUnmount(()=>{
    if(fixWidth){
        window.removeEventListener('resize', setWidth);
    }
});
</script>

<style lang="less" scoped>
._sticky {
    position: fixed;
}
</style>