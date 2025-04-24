<template lang="pug">
.tableWrap(ref='full')
    table.customTbl(ref='table' :class='{resizable}' style="width:0")
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

let observer: MutationObserver = null;
let resizers_arr: Element[] = [];
let full = ref(null);
let removeSetup = () => {
	resizers_arr.forEach((resizer) => {
		resizer.removeEventListener('mousedown', mousedown);
	});
	document.removeEventListener('mousemove', mouseMoveHandler);
	document.removeEventListener('mouseup', mouseup);
}

let headFullWidth = 0;
let fakeWidth = ref(0);

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

// ResizeObserver 인스턴스 생성
const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
        // tableWrapWidth 계산
        let tableWrapWidth = entry.contentRect.width;

        // customTblWidth 계산
        let customTbl = entry.target.querySelector('.customTbl');
        if (!customTbl) return; // .customTbl 요소가 없는 경우 처리
        let customTblWidth = customTbl.getBoundingClientRect().width;

        // fakeWidth 계산 및 적용
        if (customTblWidth < tableWrapWidth) {
            let fakeWidth = tableWrapWidth - customTblWidth;
            document.body.style.setProperty('--fakeWidth', `${fakeWidth}px`);
        } else {
            document.body.style.setProperty('--fakeWidth', '0px'); // fakeWidth 초기화
        }

        // 디버깅 로그 출력
        // console.log({
        //     tableWrapWidth,
        //     customTblWidth,
        //     fakeWidth: parseFloat(document.body.style.getPropertyValue('--fakeWidth'))
        // });
    }
});

// full.value 요소를 관찰 대상으로 등록
onMounted(() => {
	if (full.value) {
		resizeObserver.observe(full.value);
	}
});

let currentHeadCol: HTMLElement = null;
let pageXMouseDown = 0;
let pageXMouseMoveDiff = 0;
let currentHeadColWidth = 0;

let thTotal = 0;
let currentSiblingHeadWidth = 0;

let mousedown = (e: MouseEvent) => {
	let el = thead.value;
	let ths = el.querySelectorAll('th');
	let th = (e.currentTarget as HTMLElement).parentElement;

	for (let i = 0; i < ths.length; i++) {
		if (ths[i] === th) {
			ths[i].classList.add('hovered');
		} else {
			ths[i].classList.add('nohover');
		}
	}

	thTotal = parseFloat(window.getComputedStyle(el).width);

	pageXMouseDown = e.pageX;
	let currentTarget = e.currentTarget as HTMLElement;
	currentHeadCol = currentTarget.parentNode as HTMLElement;
	if (!currentHeadCol) {
		return;
	}
	currentHeadColWidth = parseFloat(window.getComputedStyle(currentHeadCol).width);
	if (isNaN(currentHeadColWidth)) {
		return;
	}
	currentSiblingHeadWidth = parseFloat(window.getComputedStyle(currentHeadCol.nextElementSibling as HTMLElement).width);
};

let mouseup = () => {
	currentHeadCol = null;
	pageXMouseDown = pageXMouseMoveDiff;
	if (thead.value) {
		let th = thead.value.querySelectorAll('th');
		for (let i = 0; i < th.length; i++) {
			th[i].classList.remove('hovered');
			th[i].classList.remove('nohover');
		}
	}
};

let mouseMoveHandler = (e) => {
	if (!currentHeadCol) {
		return;
	}

	if (currentHeadCol.classList.contains('fixed')) return;

	// 마우스 이동 거리 계산
	pageXMouseMoveDiff = e.pageX - pageXMouseDown;

	// 새로운 너비 계산
	let newWidth = currentHeadColWidth + pageXMouseMoveDiff;

	// 너비가 음수가 되지 않도록 제한
	if (newWidth < 50) {
		newWidth = 50;
	}

	// 현재 열의 너비만 적용
	currentHeadCol.style.width = `${newWidth}px`;

	// .tableWrap 의 너비 가져오기
	let tableWrapWidth = parseFloat(window.getComputedStyle(full.value).width);
	// customTbl 의 너비 가져오기
	let customTblWidth = parseFloat(window.getComputedStyle(full.value.querySelector('.customTbl')).width);
	// customTbl 의 너비가 .tableWrap 의 너비보다 작으면
	if (customTblWidth < tableWrapWidth) {
		// 차이 값 만큼 fakeWidth 값 설정
		fakeWidth.value = tableWrapWidth - customTblWidth;
		// customTblWidth 의 가상요소 너비를 fakeWidth 값으로 설정
		document.body.style.setProperty('--fakeWidth', `${fakeWidth.value}px`);
	}
};

let setResize = async () => {
	// - initiallize start
	removeSetup();
	await nextTick();
	headFullWidth = parseFloat(window.getComputedStyle(full.value).width);

	// let tableWrapWidth = parseFloat(window.getComputedStyle(full.value).width);
	// let customTblWidth = parseFloat(window.getComputedStyle(full.value.querySelector('.customTbl')).width);
	// if (customTblWidth < tableWrapWidth) {
	// 	fakeWidth.value = tableWrapWidth - customTblWidth;
	// 	document.body.style.setProperty('--fakeWidth', `${fakeWidth.value + 10}px`);
	// }

	let el = thead.value;
	let th = el.querySelectorAll('th');

	// 마지막 th 에 last 클래스 추가
	th[th.length - 1].classList.add('last');

	// for (let i = 0; i < th.length - 1; i++) {
	// 	if (th[i].classList.contains('fixed')) continue;
	// 	let style = window.getComputedStyle(th[i]);
	// 	th[i].style.width = style.width;
	// }

	resizers_arr = [];
	// - initiallize end

	let resizers = el.querySelectorAll('th > .resizer:not(.fixed)');
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
	overflow-y: hidden;
	box-sizing: border-box;
	border-radius: 10px;
	border: 1px solid #f2f2f4;
}

.customTbl {
	width: auto; // 테이블 너비는 자동으로 조정
	min-width: fit-content; // 최소 너비는 내용에 맞춤
	border-collapse: collapse;
	table-layout: fixed;

	&.resizable {
		thead {
			th {
				&.hovered, &:hover {
					background-color: #eeeeee;

					.resizer {
						display: block;
					}
				}
			}
		}
	}

	.overflow {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	thead {
		// background-color: #f0f0f0;
		background-color: #f9f9f9;
		text-align: left;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		// box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.2);

		
		tr {
			position: relative;
			height: 60px;

			&::before {
				position: absolute;
				content: '';
				display: block;
				height: 100%; // 높이는 최소화
				background-color: #f9f9f9;
				min-width: var(--fakeWidth); // 화면 너비만큼 확장
				top: 0;
				right: calc(var(--fakeWidth) * -1);
				z-index: -1; // 테이블 뒤쪽으로 배치
			}
			&::after {
				position: absolute;
				content: '';
				display: block;
				background-color: rgba(0, 0, 0, 0.05);
				min-width: var(--fakeWidth); // 화면 너비만큼 확장
				height: 1px;
				bottom: -0.5px;
				right: calc(var(--fakeWidth) * -1);
				// z-index: -1; // 테이블 뒤쪽으로 배치
			}
		}

		th {
			position: relative;
			font-size: 0.7rem;
			font-weight: 500;
			padding: 0 20px;
			white-space: nowrap;
			user-select: none;

			span {
				display: inline-block;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 100%;
			}

			// overflow: hidden;
			text-overflow: ellipsis;

			&.center {
				text-align: center;
			}

			&.last {
				background-color: transparent !important;

				.resizer {
					display: none !important;
				}
			}

			&.nohover, &.fixed {
				&:hover {
					background-color: #f9f9f9 !important;
	
					.resizer {
						display: none;
					}
				}
			}

			.resizer {
				position: absolute;
				// top: 50%;
				top: 0px;
				right: -9px;
				// transform: translateY(-50%);
				width: 12px; // enough width for user to grab
				// border-left: 5px solid transparent;
				// border-right: 5px solid transparent;
				border-left: 4px solid transparent;
				border-right: 12px solid transparent;
				display: none;

				&::before {
					content: '';
					display: block;
					height: 100%;
					width: 2px;
					background-color: rgba(0, 0, 0, 0.2);
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
			position: relative;
			height: 60px;
			border-bottom: 1px solid rgba(0, 0, 0, 0.05);
			// box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.2);

			&::before {
				position: absolute;
				content: '';
				display: block;
				height: 100%; // 높이는 최소화
				background-color: #fff;
				min-width: var(--fakeWidth); // 화면 너비만큼 확장
				top: 0;
				right: calc(var(--fakeWidth) * -1);
				z-index: -1; // 테이블 뒤쪽으로 배치
			}
			&::after {
				position: absolute;
				content: '';
				display: block;
				background-color: rgba(0, 0, 0, 0.05);
				min-width: var(--fakeWidth); // 화면 너비만큼 확장
				height: 1px;
				bottom: -1.5px;
				right: calc(var(--fakeWidth) * -1);
				// z-index: -1; // 테이블 뒤쪽으로 배치
			}

			&:last-child {
				border-bottom: none;
			}

			&.hoverRow {
				&:not(.active):hover {
					background-color: rgba(41, 63, 230, 0.05);
					cursor: pointer;
	
					&::before {
						background-color: rgba(41, 63, 230, 0.05);
					}
				}
	
				&.active {
					background-color: rgba(41, 63, 230, 0.10);
	
					&::before {
						background-color: rgba(41, 63, 230, 0.10);
					}
				}
			}
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