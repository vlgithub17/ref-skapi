<template lang="pug">
dialog(ref='dialog')
    slot
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
let props = defineProps({
    open: Boolean
});

let dialog = ref(null);

onMounted(() => {
    if (props.open) {
        dialog.value.showModal();
    }
});

watch(() => props.open, nv => {
    if (nv) {
        dialog.value.showModal();
    }
    else {
        dialog.value.close();
    }
});

</script>

<style lang="less" scoped>
dialog {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}
</style>