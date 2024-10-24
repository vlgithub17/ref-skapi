<template lang="pug">
.customSelect(@click.stop="showDropDown")
    button(type='button')
        span {{ showValue }}
        //- span.material-symbols-outlined.notranslate arrow_drop_down
        svg.svgIcon.black()
            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down")

    .moreVert(style="--moreVert-left:0;display:none;--moreVert-width:100%")
        .inner
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
        // padding: 0 1rem;
        // padding: 0 .5rem 0 1rem;
        padding: 0 0.2rem 0 0.77rem;
        
        border-radius: 6px;
        outline: 1px solid; // input 과 크기 맞추기 위함
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #000;
        background-color: #fff;
        // border: 1px solid rgba(0,0,0,0.5);
        // font-weight: 300;
        font-weight: 400;
    }
    .more:hover {
        @media (pointer: fine) {
            text-decoration: underline;
        }
    }
}
</style>