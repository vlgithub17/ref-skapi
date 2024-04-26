<template lang="pug">
#localeSelector(@click.stop)
    .wrap
        .country(v-for="(c, key) in Countries" @click="handleCountryClick(key)" :class="{'selected' : selectedFlag == key}") 
            span.flag {{ c.flag }}
            .name {{ key }} - {{ c.name }}
</template>
<script setup>
import { Countries } from '@/code/countries';
import { ref, onBeforeMount, onBeforeUnmount, onMounted, nextTick } from 'vue';

let emit = defineEmits(['countryClicked', 'close']);
let props = defineProps(['searchText']);
let selectedFlag = ref('');
let handleCountryClick = (key) => {
    selectedFlag.value = key;
    emit('countryClicked', key);
};

if(props.searchText) {
    nextTick(() => {
        selectedFlag.value = props.searchText;
    })
}

onMounted(() => {
    document.addEventListener('mouseup', closeLocale);
})
onBeforeUnmount(() => {
    document.removeEventListener('mouseup', closeLocale);
})

let closeLocale = (e) => {
    let localeSelector = document.querySelector('#localeSelector');

    if(!localeSelector.contains(e.target)) {
        emit('close');
    }
}
</script>
<style lang="less" scoped>
#localeSelector {
    width: 340px;
    height: 276px;
    overflow: hidden;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);

    .wrap {
        height: 100%;
        overflow: scroll;
    }

.country {
    display: flex;
    gap: 16px;
    margin-bottom: 4px;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &.selected {
        background-color: rgba(41, 63, 230, 0.05);
        border: 1px solid var(--main-color);
    }
    &:hover {
        background-color: rgba(41, 63, 230, 0.05);
    }
    .name {
        flex: 0.95;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}
}
</style>