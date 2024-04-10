<template lang="pug">
label._checkbox(:class="{'nonClickable' : disabled}" :style='{opacity: disabled ? ".5" : "1"}')
    input(type="checkbox" :checked='modelValue' @input="$emit('update:modelValue', $event.target.checked)" :disabled="disabled" :name="name" hidden)
    span.material-symbols-outlined.fill {{ modelValue ? 'check_box' : 'check_box_outline_blank' }}
    div
        slot
</template>
<script setup>
let { disabled, modelValue = ref(false), name } = defineProps({
    disabled: Boolean,
    modelValue: {
        type: Boolean,
        default: false
    },
    name: String
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
        font-weight: normal;
    }

    input:checked+* {
        color: var(--main-color);
    }

    &:hover {
        .material-symbols-outlined.fill {
            color: var(--main-color);
        }
    }
}
</style>