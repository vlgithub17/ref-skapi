<template lang="pug">
.tableWrap
    table.customTbl(ref='table' :class='{resizable}' :style='{width: resizable ? "0" : "100%"}')
        thead(ref="thead")
            slot(name="head")

        tbody
            slot(name='body')
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick, useSlots, onBeforeUnmount } from 'vue';
let { resizable } = defineProps({
    resizable: Boolean
});

let thead = ref(null);
let slots = useSlots();
let heads: any[] = [];

let observer: MutationObserver = null;
let resizers_arr: Element[] = [];

let removeSetup = () => {
    resizers_arr.forEach((resizer) => {
        resizer.removeEventListener('mousedown', mousedown);
    });
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseup);
}

if (resizable) {
    onMounted(async () => {
        // Check if slot is rendered
        if (slots.head) {
            if (resizable) {

                await setResize();

                // Create a MutationObserver to watch for changes in the 'thead' element
                observer = new MutationObserver((mutationsList) => {
                    for (let mutation of mutationsList) {
                        type MutationType = 'childList' | 'attributes';
                        let type = mutation.type as MutationType;

                        if (type === 'childList') {
                            setResize();
                        }
                        // if (mutation.type === 'attributes') {
                        //     console.log('The ' + mutation.attributeName + ' attribute was modified.');
                        // }
                    }
                });

                // Start observing the 'thead' element for configured mutations
                observer.observe(thead.value, {
                    // attributes: true,
                    childList: true,
                    subtree: true
                });
            }
        }
    });
    onBeforeUnmount(() => {
        removeSetup();
        if (observer) {
            observer.disconnect();
        }
    });
}

let currentHeadCol: HTMLElement = null;
let pageXMouseDown = 0;
let pageXMouseMoveDiff = 0;
let currentHeadColWidth = 0;
let headFullWidth = 0;
let thTotal = 0;
let currentSiblingHeadWidth = 0;

let mousedown = (e: MouseEvent) => {
    let el = thead.value;
    headFullWidth = parseFloat(window.getComputedStyle(el).width);
    thTotal = heads.reduce((acc, cur) => {
        return acc + parseFloat(cur.width);
    }, 0);

    pageXMouseDown = e.pageX;
    let currentTarget = e.currentTarget as HTMLElement;
    currentHeadCol = currentTarget.parentNode as HTMLElement;
    currentHeadColWidth = parseFloat(window.getComputedStyle(currentHeadCol).width);
    if (isNaN(currentHeadColWidth)) {
        return;
    }
    currentSiblingHeadWidth = parseFloat(window.getComputedStyle(currentHeadCol.nextElementSibling as HTMLElement).width);
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
    let val = currentHeadColWidth + pageXMouseMoveDiff;

    if (val > 64) {
        if (thTotal < headFullWidth) {
            let nextTh = currentHeadCol.nextElementSibling as HTMLElement;
            let newSiblingWidth = currentSiblingHeadWidth - pageXMouseMoveDiff;
            if (newSiblingWidth < 64) {
                return;
            }
            nextTh.style.width = `${newSiblingWidth}px`;
        }
        currentHeadCol.style.width = `${currentHeadColWidth + pageXMouseMoveDiff}px`;
    }
};


let setResize = async () => {
    // - initiallize start
    removeSetup();
    await nextTick();
    heads = [];
    let el = thead.value;
    let th = el.querySelectorAll('th');

    for (let i = 0; i < th.length - 1; i++) {
        let style = window.getComputedStyle(th[i]);
        th[i].style.width = style.width;
    }

    resizers_arr = [];
    // - initiallize end

    let resizers = el.querySelectorAll('th > .resizer');
    for (let i = 0; i < resizers.length; i++) {
        (resizers[i] as HTMLElement).addEventListener('mousedown', mousedown);
        resizers_arr.push(resizers[i]);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseup);
}

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
        box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.2);

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
                right: -6px;
                transform: translateY(-50%);
                width: 12px; // enough width for user to grab
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;

                &::before {
                    content: '';
                    display: block;
                    height: 100%;
                    width: 2px;
                    background-color: rgba(0, 0, 0, 0.1);
                }

                height: 20px;

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