<template lang="pug">
table(ref='table' :class='{resizable}' :style='{width: resizable ? "0" : "100%"}')
    thead(ref="thead")
        slot(name="head")

    tbody
        slot(name='body')
</template>
<script setup lang="ts">
import { defineProps, ref, onMounted, nextTick, useSlots, onBeforeUnmount } from 'vue';
let { resizable } = defineProps({
    resizable: Boolean
});

let thead = ref(null);
let slots = useSlots();
if (resizable) {
    onMounted(async () => {
        // Wait for next DOM update cycle
        await nextTick();
        // Check if slot is rendered
        if (slots.head) {
            setResize(thead.value);
        }
    });

    onBeforeUnmount(() => {
        resizers_arr.forEach((resizer) => {
            resizer.removeEventListener('mousedown', mousedown);
            resizer.removeEventListener('mouseup', mouseup);
        });
        document.removeEventListener('mousemove', mouseMoveHandler);
    });
}

let resizers_arr:Element[] = [];
let setResize = (el: HTMLElement) => {
    let resizers = el.querySelectorAll('th > span.resizer');
    for(let i = 0; i < resizers.length; i++) {
        (resizers[i] as HTMLElement).addEventListener('mousedown', mousedown);
        resizers_arr.push(resizers[i]);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseup);
}

let currentHeadCol: HTMLElement = null;
let pageXMouseDown = 0;
let pageXMouseMoveDiff = 0;
let currentHeadColWidth = 0;
let mousedown = (e: MouseEvent) => {
    pageXMouseDown = e.pageX;
    let currentTarget = e.currentTarget as HTMLElement;
    currentHeadCol = currentTarget.parentNode as HTMLElement;
    currentHeadColWidth = parseFloat(window.getComputedStyle(currentHeadCol).width);
    if (isNaN(currentHeadColWidth)) {
        return;
    }
};

let mouseup = () => {
    currentHeadCol = null;
    pageXMouseDown = pageXMouseMoveDiff;
};

let mouseMoveHandler = (e) => {
    if (!currentHeadCol) {
        return;
    }
    
    pageXMouseMoveDiff = e.pageX - pageXMouseDown;
    currentHeadCol.style.width = `${currentHeadColWidth + pageXMouseMoveDiff}px`;
};


</script>
<style lang="less" scoped>
table {
    width: 0;
}
</style>