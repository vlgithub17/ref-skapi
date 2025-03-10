<template lang="pug">
._tooltip(:class="classNames" @mouseenter="handleMouseEnter" ref="host")
	.tool
		//- slot(name="tool")
		.tool-icon
			svg
				use(xlink:href="@/assets/img/material-icon.svg#icon-help")
		.tip(:style="{ '--tip-background-color': props.tipBackgroundColor, '--text-color': props.textColor }" ref="tipContainer")
			slot(name="tip")
		.tip-arrow(:class="classNames" :style="{ '--tip-background-color': props.tipBackgroundColor }")
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
	tipBackgroundColor: {
		type: String,
		default: 'transparent'
	},
	textColor: {
		type: String,
		default: '#000'
	}
});

const host = ref(null);
const tipContainer = ref(null);
const classNames = ref('');
const tipBackgroundColor = ref('transparent');

const handleMouseEnter = (e) => {
	const y = window.innerHeight / 2;
	const x = window.innerWidth / 2;
	const isBottom = e.clientY < y;
	const isLeft = e.clientX > x;

	classNames.value = '';
	classNames.value += isBottom ? ' bottom' : ' top';
	classNames.value += isLeft ? ' left' : ' right';

	nextTick(() => {
		const tipElement = tipContainer.value?.querySelector('[slot="tip"]');
		if (tipElement) {
			const bgColor = window.getComputedStyle(tipElement).getPropertyValue('background-color');
			tipBackgroundColor.value = bgColor || 'transparent';
		}
	})
}
</script>

<style lang="less" scoped>
._tooltip {
  display: block;
  position: relative !important;
}

._tooltip>.tool {
  text-align: inherit;
}

._tooltip .tool-icon {
  display: inline-block;
  cursor: pointer;
}

._tooltip .tool-icon svg {
	height: 20px;
	width: 20px;
	fill: #aaa !important;
}

._tooltip .tip {
  min-width: 100%;
  display: none;
  position: absolute;
  box-sizing: border-box;
  bottom: calc(100% + 8px);
  top: unset;
  left: 0;
  right: unset;

  // 배경색 적용
  background-color: var(--tip-background-color);
  // 텍스트 색상 적용
  color: var(--text-color);
  padding: 8px;
  white-space: nowrap;
  font-size: 0.8rem;
}

._tooltip.bottom .tip {
  top: calc(100% + 8px);
  bottom: unset;
}

._tooltip.left .tip {
  left: unset;
  right: 0;
}

._tooltip:hover .tip {
  display: block;
}

._tooltip:hover .tip-arrow {
  display: block;
}

.tip-arrow {
  display: none;
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;
  transform: translateX(-50%);
}

.tip-arrow.bottom {
  z-index: 1;
  top: calc(100% + 4px);
  bottom: unset;
  border: 4px solid transparent;
  border-top-width: 0;
  border-bottom-width: 4px;
  border-bottom-color: var(--tip-background-color);
}

.tip-arrow.top {
  top: unset;
  bottom: calc(100% + 4px);
  border: 4px solid transparent;
  border-bottom-width: 0;
  border-top-width: 4px;
  border-top-color: var(--tip-background-color);
}

::slotted([slot='tip']) {
  /* slot1 every slotted element - YES */
  white-space: pre;
  overflow: hidden;
}
</style>