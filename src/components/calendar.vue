<template lang="pug">
.moreVert
    .inner(@click.stop style="padding:0")
        .timeWrap
            .timeNav 
                input#here(type="date" hidden)
                input.big.year(type="text" pattern="[0-9]+" minlength="4" :value="currentYear" @input="(e) => currentYear = e.target.value" @change="(e) => updateCalendar(e, 'year')")
                select(style='background-color:transparent' @change.stop="(e) => updateCalendar(e, 'month')")
                    option(v-for="(m,i) in monthObj" :value="i" :selected="currentMonth === i") {{ m }}
                .goback
                    .material-symbols-outlined.prev(@click.stop="prevTime") arrow_back_ios
                    .material-symbols-outlined.next(@click.stop="nextTime") arrow_forward_ios
            .timeCont 
                .days 
                    .day Mo
                    .day Tu
                    .day We
                    .day Th
                    .day Fr
                    .day Sa
                    .day Su
                .dates  
                    div(v-for="date in dates" :key="date.key" :class="date.classes" @click.stop="(e) => createdDate(e, date)") {{ date.day }}
        .timeSettingWrap(:class="{'active' : activeTime}")
            .start(@click.stop="activeStart = true; activeEnd = false;" :class="{'active' : activeStart}") {{ startDate }}
            span ~
            .end(@click.stop="activeEnd = true; activeStart = false;" :class="{'active' : activeEnd}") {{ endDate }}
</template>

<script setup>
import { onMounted, ref } from 'vue';  

let activeTime = ref(false);
let startDate = ref('');
let endDate = ref('');
let monthObj = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let newDate = new Date(); // 현재 날짜
let utc = newDate.getTime() + (newDate.getTimezoneOffset() * 60 * 1000); // utc 표준시
let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시
let today = new Date(utc + kstGap); // 한국 시간 date

let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
let currentYear = ref(thisMonth.getFullYear());
let currentMonth = ref(thisMonth.getMonth());
let currentDate = thisMonth.getDate();
let startYear = currentYear.value - 5; // 현재 년도에서 5년 전부터 시작
let endYear = currentYear.value + 5;   // 현재 년도에서 5년 후까지 표시
let years = ref(Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index));
let dates = ref([]);
let visibleYears = ref([]);
let activeStart = ref(false);
let activeEnd = ref(false);
let selectedStart, selectedEnd;


function renderCalender(thisMonth) {
    dates.value.splice(0);
    currentYear.value = thisMonth.getFullYear();
    currentMonth.value = thisMonth.getMonth();
    currentDate = thisMonth.getDate();

    let startDay = new Date(currentYear.value, currentMonth.value, 0);
    let prevDate = startDay.getDate();  // 저번달 마지막 날짜
    let prevDay = startDay.getDay();    // 저번달 마지막 요일

    let endDay = new Date(currentYear.value, currentMonth.value + 1, 0);
    let nextDate = endDay.getDate();    // 이번달 마지막 날짜
    let nextDay = endDay.getDay();      // 이번달 마지막 요일

    for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
        dates.value.push({ day: i, classes: 'date prev disable', key: 'prev-' + i });
    }

    for (let i = 1; i <= nextDate; i++) {
        dates.value.push({ day: i, classes: 'date current', key: 'current-' + i });
    }

    for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
        dates.value.push({ day: i, classes: 'date next disable', key: 'next-' + i });
    }
}
renderCalender(thisMonth);

// 오늘 날짜 표기
onMounted(() => {
    if (today.getMonth() == currentMonth.value) {
        let todayDate = today.getDate();
        let currentMonthDate = document.querySelectorAll('.dates .current');
        currentMonthDate[todayDate - 1].classList.add('today');
    }
})

let updateCalendar = (e, what) => {
    if(what == 'year') {
        currentYear.value = e.target.value;
    } else if(what == 'month') {
        currentMonth.value = e.target.value;
    }

    thisMonth = new Date(currentYear.value, currentMonth.value, 1);
    renderCalender(thisMonth);
}

let prevTime = () => {
    thisMonth = new Date(currentYear.value, currentMonth.value - 1, 1);
    renderCalender(thisMonth);
}

let nextTime = () => {
    thisMonth = new Date(currentYear.value, currentMonth.value + 1, 1);
    renderCalender(thisMonth);
}

let emit = defineEmits(['dateClicked']);

let props = defineProps(['alwaysEmit']); // 임시로 만들어놓은 props

let createdDate = (e, date) => {
    let targetDate = e.target;
    let selectedYear = currentYear.value;
    let selectedMonth = currentMonth.value + 1
    let selectedDay = date.day
    let getDateClass = document.querySelectorAll('.date');
    let formattedDate = `${selectedYear}-${selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}-${selectedDay < 10 ? `0${selectedDay}` : selectedDay}`;

    activeTime.value = true;

    if ((!startDate.value && !activeEnd.value) || (activeStart.value && !activeEnd.value)) {
        startDate.value = formattedDate;
        selectedStart = selectedDay - 1;
        targetDate.classList.add('start');

        if (endDate.value && (endDate.value < startDate.value)) {
            startDate.value = null;
            endDate.value = null;
            for(let i = 0; i < getDateClass.length; i ++ ) {
                getDateClass[i].classList.remove('start');
                getDateClass[i].classList.remove('period');
                getDateClass[i].classList.remove('end');
            }
            activeStart.value = false;
        }
        if (activeStart.value) {
            activeStart.value = false;
        }
    } else if (!endDate.value || activeEnd.value) {
        endDate.value = formattedDate;
        selectedEnd = selectedDay - 1;
        targetDate.classList.add('end');

        for(let i = (selectedStart + 1); i < (selectedEnd - selectedStart + 2); i ++) {
            getDateClass[i].classList.add('period');
        }

        if (endDate.value < startDate.value) {
            startDate.value = null;
            endDate.value = null;
            for(let i = 0; i < getDateClass.length; i ++ ) {
                getDateClass[i].classList.remove('start');
                getDateClass[i].classList.remove('period');
                getDateClass[i].classList.remove('end');
            }
            activeEnd.value = false;
        }
        if (activeEnd.value) {
            activeEnd.value = false;
        }
        if (!props?.alwaysEmit) {
            emit('dateClicked', startDate.value, endDate.value);
        }
    } else {
        for(let i = 0; i < getDateClass.length; i ++ ) {
            getDateClass[i].classList.remove('start');
            getDateClass[i].classList.remove('period');
            getDateClass[i].classList.remove('end');
        }

        startDate.value = formattedDate;
        selectedStart = selectedDay - 1;
        targetDate.classList.add('start');
        endDate.value = null;
    }
    if (props?.alwaysEmit) {
        emit('dateClicked', startDate.value, endDate.value); // 칼랜더를 닫히게 하지 않고 계속 아웃풋이 나오게 하는건 어떤가요?
    }
}
</script>

<style lang="less" scoped>
.timeWrap {
    padding: 1.4rem;

    .timeNav {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        margin-bottom: 28px;

        * {
            text-align: center;
        }

        .goback {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: end;
            padding: 0 7px 0 14px;

            * {
                cursor: pointer;
                font-size: 0.9rem;
                user-select: none;
            }

            .prev {
                margin-right: 10px;
            }
        }

        // .year {
        //     // flex-grow: 1;
        //     // width: 25%;
        //     width: 80px;
        //     font-size: 0.8rem;
        //     border: 1px solid rgba(0,0,0,0.05);
        //     background-color: rgba(0,0,0,0.02);
        //     padding: 4px 0;
        //     margin-right: 14px;
        //     border-radius: 4px;
        // }

        select {
            flex-grow: 1;
        }

        .month {
            background-color: unset;
            border: 0;
            cursor: pointer;
            font-size: 0.9rem;
        }
    }

    .timeCont {
        .days {
            display: flex;
            flex-wrap: nowrap;
            margin-bottom: 15px;

            .day {
                text-align: center;
                width: calc(100% / 7);
                color: rgba(0, 0, 0, 0.25);
                font-size: 0.7rem;
                font-weight: 500;
            }
        }

        .dates {
            display: flex;
            flex-wrap: wrap;

            .date {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-size: 0.7rem;
                width: calc(100% / 7);
                line-height: 32px;
                cursor: pointer;

                &::before {
                    position: absolute;
                    content: '';
                    width: 100%;
                    height: 32px;
                    background-color: rgba(41, 63, 230, 0.05);
                    transition: all 0.3s;
                    border-radius: 4px;
                    opacity: 0;
                }

                &:hover::before {
                    opacity: 1;
                }

                &.start, &.end {
                    &::before {
                        opacity: 1;
                        border: 1px solid var(--main-color);
                    }
                }
                &.period {
                    &::before {
                        opacity: 0.5;
                    }
                }

                &.prev,
                &.next {
                    color: rgba(0, 0, 0, 0.2);
                }
            }
        }
    }
}

.timeSettingWrap {
    position: relative;
    padding: 20px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;

    &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.10);
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.06);
    }

    &.active {

        .start,
        .end {
            opacity: 1;
        }
    }

    .start,
    .end {
        width: 130px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.05);
        font-size: 0.8rem;
        opacity: 0.4;
        cursor: pointer;

        &.active {
            outline: 2px solid var(--main-color);
            opacity: 1;
        }
    }

    span {
        font-size: 1rem;
        padding: 0 10px;
    }
}
</style>