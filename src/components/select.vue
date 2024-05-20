<template lang="pug">
.customSelect(@click.stop="showDropDown")
    button(type='button')
        span {{ showValue }}
        span.material-symbols-outlined arrow_drop_down
    .moreVert(style="--moreVert-left:0;display:none")
        .inner(style="padding:0.8rem;padding-right:1rem")
            .more(v-for="(o) in selectOptions" @click="showValue=o.option; emit('update:modelValue', o.value)") {{ o.option }}
</template>

<script lang="ts" setup>
let emit = defineEmits(['update:modelValue']);
let props = defineProps(['modelValue', 'selectOptions', 'firstValue']);
let showValue = props.selectOptions[0].option;

let showDropDown = (e) => {
    let currentTarget = e.currentTarget;
    let moreVert = currentTarget.lastChild;

    if (moreVert.style.display === 'none') {
        moreVert.style.display = 'block';
    } else {
        moreVert.style.display = 'none'
    }
}
</script>

<style lang="less" scoped>
.customSelect {
    position: relative;
    cursor: pointer;

    button {
        width: 100%;
        border: 0;
        padding: 0 1rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #000;
        background-color: #fff;
        border: 1px solid rgba(0,0,0,0.5);
        font-weight: 300;
    }
}
</style>