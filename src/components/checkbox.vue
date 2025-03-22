<template lang="pug">
label._checkbox(:class="{'nonClickable' : disabled}" :style='{opacity: disabled ? ".5" : "1", "align-items": "center"}')
    //- input(type="checkbox" :checked='modelValue' @input="e=>{modelValue = e.target.checked;$emit('update:modelValue', e.target.checked)}" :disabled="disabled" :name="name" hidden)
    input(type="checkbox" :checked='modelValue' @input.stop="e=>{$emit('update:modelValue', e.target.checked)}" :disabled="disabled" :name="name" hidden)
    //- span.material-symbols-outlined.notranslate(:class='{fill:modelValue !== null}' :style='{"margin-top": hasSlotContent ? "-3px" : null}') {{ modelValue === null ? 'indeterminate_check_box' : modelValue ? 'check_box' : 'check_box_outline_blank' }}
    template(v-if="modelValue === null")
        svg.svgIcon.black(:class='{fill:modelValue !== null}')
            use(xlink:href="@/assets/img/material-icon.svg#icon-indeterminate-check-box")
    template(v-else-if="modelValue")
        svg.svgIcon.black(:class='{fill:modelValue !== null}')
            use(xlink:href="@/assets/img/material-icon.svg#icon-check-box-fill")
    template(v-else)
        svg.svgIcon.black(:class='{fill:modelValue !== null}')
            use(xlink:href="@/assets/img/material-icon.svg#icon-check-box-outline-blank")

    div
        slot
</template>
<script setup>
import { ref, onMounted, useSlots, watch } from 'vue';
let { disabled, modelValue = ref(false), name } = defineProps({
    disabled: Boolean,
    modelValue: {
        type: Boolean,
        default: false
    },
    name: String
});

const emit = defineEmits(['update:modelValue']);
const slots = useSlots();
let hasSlotContent = ref(false);
onMounted(() => {
    hasSlotContent.value = !!slots.default && slots.default().length > 0;
});
</script>
<style lang="less" scoped>
label._checkbox {
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    user-select: none;

    &>div {
        font-size: 0.8rem;
        white-space: nowrap;
    }

    span+div:not(:empty) {
        margin-left: 4px;
    }

    input:checked+* {
        // color: var(--main-color);
        color: inherit;
    }
}
</style>