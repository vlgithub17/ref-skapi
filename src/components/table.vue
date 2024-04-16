<template lang="pug">
.tableWrap
    table.customTbl(ref='table' :class='{resizable}' :style='{width: resizable ? "0" : "100%"}')
        thead(ref="thead")
            slot(name="head")

        tbody
            slot(name='body')
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick, useSlots, onBeforeUnmount, watchEffect } from 'vue';
let { resizable } = defineProps({
    resizable: Boolean
});

let thead = ref(null);
let slots = useSlots();

let setupResize = async () => {
    // Wait for next DOM update cycle
    await nextTick();
    // Check if slot is rendered
    if (slots.head) {
        if (resizable) {
            let heads = thead.value.querySelectorAll('th');
            for (let h of heads) {
                if (h instanceof HTMLElement) {
                    h.style.width = window.getComputedStyle(h).width;
                }
            }
        }

        setResize(thead.value);
    }
}
let removeSetup = () => {
    resizers_arr.forEach((resizer) => {
        resizer.removeEventListener('mousedown', mousedown);
        resizer.removeEventListener('mouseup', mouseup);
    });
    document.removeEventListener('mousemove', mouseMoveHandler);
}

if (resizable) {
    onBeforeUnmount(removeSetup);
}

let hasSlotContent = ref(false);
watchEffect(() => {
    hasSlotContent.value = !!slots.default && slots.head().length > 0;
    if (resizable) {
        setupResize();
    }
});

let resizers_arr: Element[] = [];
let setResize = (el: HTMLElement) => {

    let resizers = el.querySelectorAll('th > .resizer');
    for (let i = 0; i < resizers.length; i++) {
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
<style lang="less">
.customTbl.resizable>thead>tr>th>.resizer {
    cursor: col-resize;
}

.tableWrap {
    position: relative;
    overflow-x: auto;
    box-sizing: border-box;
}

.customTbl {
    min-width: 100%;
    width: 0;
    border-collapse: collapse;
    table-layout: fixed;

    .overflow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    thead {
        background-color: #f0f0f0;
        text-align: left;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: inset 0px -3px 3px -3px rgba(0, 0, 0, 0.2);

        tr {
            height: 60px;
        }

        th {
            position: relative;
            font-size: 0.7rem;
            font-weight: 500;
            padding: 0 20px;
            white-space: nowrap;
            user-select: none;

            &.center {
                text-align: center;
            }

            &:last-child {
                .resizer {
                    display: none;
                }
            }

            .resizer {
                position: absolute;
                top: 50%;
                right: -2px;
                transform: translateY(-50%);
                width: 4px;
                height: 20px;
                background-color: rgba(0, 0, 0, 0.1);

                &.contrast {
                    background-color: #fff !important;
                }
            }
        }
    }

    tbody {
        overflow-y: auto;
        background-color: #fff;

        tr {
            height: 60px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.2);
        }

        td {
            position: relative;
            padding: 0 1rem;
            font-size: 0.8rem;

            &.center {
                text-align: center;
            }
        }
    }
}
</style>