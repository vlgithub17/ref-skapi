<template lang="pug">
.tab-menu
	ul
		li(v-for="(tab, index) in tabs" :key="index" :ref="setItemRef" @click="selectTab(index)" :class="{ active: activeIndex === index }") {{ tab }}
		.active-menu(:style="{ width: activeWidth, left: activeLeft }")
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
	tabs: {
		type: Array,
		required: true,
	},
	modelValue: {
		type: Number,
		default: 0,
	},
});

const emit = defineEmits(['update:modelValue']);

const activeIndex = ref(0);
const activeWidth = ref('0px');
const activeLeft = ref('0px');

const itemRefs = [];
const setItemRef = (el) => {
	if (el) {
		itemRefs.push(el);
	}
};

const selectTab = (index) => {
	setActiveMenu(index);
	emit('update:modelValue', index); // 부모에게 선택된 인덱스 전달
};

const setActiveMenu = (index) => {
	const activeTab = itemRefs[index];

	activeIndex.value = index;
	activeWidth.value = `${activeTab.offsetWidth}px`;
	activeLeft.value = `${activeTab.offsetLeft}px`;
};

onMounted(() => {
	if (itemRefs.length > 0) {
		setActiveMenu(activeIndex.value);
	}
});
</script>

<style scoped lang="less">
.tab-menu {
	margin-bottom: 1rem;
	
    ul {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 4px;
        background-color: rgba(0,0,0,0.05);
        border-radius: 24px;

        li {
            position: relative;
            list-style: none;
            padding: 8px 16px;
            font-size: 0.9rem;
            cursor: pointer;
            z-index: 2;
        }

        .active-menu {
            position: absolute;
            content: '';
            height: calc(100% - 8px);
            border-radius: 20px;
            background-color: rgb(255, 255, 255);
            box-shadow: rgba(113, 116, 152, 0.1) 0px 18px 31px, rgba(113, 116, 152, 0.067) 0px 8px 16.2244px, rgba(113, 116, 152, 0.05) 0px 8px 8.46625px;
            transition: left 200ms cubic-bezier(0.6, 0.6, 0, 1), 350ms cubic-bezier(0.6, 0.6, 0, 1);
        }
    }
}
</style>