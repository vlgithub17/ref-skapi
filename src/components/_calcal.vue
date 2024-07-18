<template lang="pug">
#calendar(:class="{'show' : props.showCalendar}" @click.stop @keydown.stop="onKeyDown")
    .timeWrap
        .timeNav 
            input#here(type="date" hidden)
            input.big#year(type="text" :value="currentYear" @focus="onFocus" @input.stop="(e) => updateCalendar(e, 'year')" style="width:80px")
            select(style='background-color:transparent' @change="(e) => updateCalendar(e, 'month')")
                option(v-for="(m,i) in monthObj" :value="i" :selected="currentMonth === i") {{ m }}
            .goback
                .material-symbols-outlined.notranslate.prev(@click="prevTime") arrow_back_ios
                .material-symbols-outlined.notranslate.next(@click="nextTime") arrow_forward_ios
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
                div(v-for="date in dates" :data-time='date.time' :class="[date.classes, {'start' : (selectedStart == date.time), 'end' : (selectedEnd == date.time)}]" @click="(e) => createdDate(e, date)") {{ date.day }}
    .timeSettingWrap
        input.big#start(type="text" placeholder="Start" readonly v-model="startDate" @focus="onFocus" @click="checkCalendar('start')")
        span ~
        input.big#end(type="text" placeholder="End" readonly v-model="endDate" @focus="onFocus" @click="checkCalendar('end')")
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick, watch } from 'vue';

let activeTime = ref(false);
let selectedInput = '';
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
let dates = ref([]);
let selectedStart = ref('');
let selectedEnd = ref('');

let modelValue = ref('');
let emit = defineEmits(['close', 'update:modelValue']);
let props = defineProps(['showCalendar', 'modelValue']);

watch(() => props.showCalendar, nv => {
    if (nv) {
        if (startDate.value || (startDate.value && endDate.value)) {
            let s = startDate.value.split('-');
            // goSelectedDate(s[0], s[1]);
            selectedInput = 'start';

            nextTick(() => {
                document.getElementById('start').focus();
            })
        } else if (endDate.value) {
            let e = endDate.value.split('-');
            // goSelectedDate(e[0], e[1]);
            selectedInput = 'end';

            nextTick(() => {
                document.getElementById('end').focus();
            })
        } else {
            nextTick(() => {
                document.getElementById('start').focus();
            })
        }
    }
})
onMounted(() => {
    document.addEventListener('mouseup', closeCalendar);
})
onBeforeUnmount(() => {
    document.removeEventListener('mouseup', closeCalendar);
})

let closeCalendar = (e) => {
    let localeSelector = document.querySelector('#calendar');

    if (!localeSelector.contains(e.target)) {
        emit('close');
    }
}

let updateSearchText = () => {
    if (startDate.value == '' && endDate.value == '') {
        modelValue.value = ''
    } else {
        modelValue.value = (startDate.value || '') + ' ~ ' + (endDate.value || '');
    }
    emit('update:modelValue', modelValue.value);
}

let onFocus = (e) => {
    let targetId = e.target.id;
    let activeInput = document.activeElement;
    selectedInput = activeInput.id;

    if (startDate.value || endDate.value) {
        if(startDate.value.split('-')[0] == currentYear.value && parseInt(startDate.value.split('-')[1]) == (currentMonth.value + 1) || endDate.value.split('-')[0] == currentYear.value && parseInt(endDate.value.split('-')[1]) == (currentMonth.value + 1)) {
            if (targetId == 'start' && startDate.value) {
                let getDateClass = document.querySelectorAll('.date');
                for (let i = 0; i < getDateClass.length; i++) {
                    nextTick(() => {
                        getDateClass[i].classList.remove('here');
                    })
                }

                let startClass = document.querySelector('.start');
                if(startClass) { 
                    nextTick(() => {
                        startClass.classList.add('here');
                    })
                }
            } else if (targetId == 'end' && endDate.value) {
                let getDateClass = document.querySelectorAll('.date');
                for (let i = 0; i < getDateClass.length; i++) {
                    nextTick(() => {
                        getDateClass[i].classList.remove('here');
                    })
                }

                let endClass = document.querySelector('.end');
                if(endClass) {
                    nextTick(() => {
                        endClass.classList.add('here');
                    })
                }
            } else {
                return
            }
        }

    }
}

let onKeyDown = (e) => {
    if (e.key == 'Backspace' && selectedInput !== 'year') {
        let getDateClass = document.querySelectorAll('.date');

        if (selectedInput == 'start' && startDate.value) {
            startDate.value = '';
            selectedStart.value = '';
            for (let i = 0; i < getDateClass.length; i++) {
                nextTick(() => {
                    getDateClass[i].classList.remove('period');
                })
            }

            updateSearchText();

            if (endDate.value) {
                let e = endDate.value.split('-');
                // goSelectedDate(e[0], e[1]);
                selectedInput = 'end';

                // document.getElementById('end').focus();
            } else {
                // let s = startDate.value.split('-');
                // goSelectedDate(s[0], s[1]);
                thisMonth = new Date(currentYear.value, currentMonth.value, 1);
                renderCalender(thisMonth);
            }
            document.getElementById('start').focus();
        } else if (selectedInput == 'end' && endDate.value) {
            endDate.value = '';
            selectedEnd.value = '';
            for (let i = 0; i < getDateClass.length; i++) {
                nextTick(() => {
                    getDateClass[i].classList.remove('period');
                })
            }

            updateSearchText();

            if (startDate.value) {
                let s = startDate.value.split('-');
                // goSelectedDate(s[0], s[1]);
                selectedInput = 'start';

                // document.getElementById('start').focus();
            } else {
                // let e = endDate.value.split('-');
                // goSelectedDate(e[0], e[1]);
                thisMonth = new Date(currentYear.value, currentMonth.value, 1);
                renderCalender(thisMonth);
            }
            document.getElementById('end').focus();
        }
    } else if (e.key == 'Enter') {
        e.preventDefault();
        return false;
    }
}

let checkCalendar = (c) => {
    let getDateClass = document.querySelectorAll('.date');
    let s = startDate.value.split('-');
    let e = endDate.value.split('-');

    if (startDate.value || endDate.value) {
        if (c == 'start' && startDate.value && selectedInput !== 'year') {
            // goSelectedDate(s[0], s[1]);
            selectedInput = 'start';
        } else if (c == 'end' && endDate.value && selectedInput !== 'year') {
            // goSelectedDate(e[0], e[1]);
            selectedInput = 'end';
        } else if (c == 'start' && startDate.value && selectedInput == 'year') {
            selectedInput = 'start';
        } else if (c == 'end' && endDate.value && selectedInput == 'year') {
            selectedInput = 'end';
        } else if (c == 'create') {
            console.log(selectedStart.value, selectedEnd.value)
            for (let i = 0; i < getDateClass.length; i++) {
                if (selectedStart.value < getDateClass[i].dataset.time && getDateClass[i].dataset.time < selectedEnd.value) {
                    nextTick(() => {
                        getDateClass[i].classList.add('period');
                    })
                }
            }
        }
    }
}

let renderCalender = async (thisMonth) => {
    let getDateClass = document.querySelectorAll('.date');

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
        let prevTimestamp = new Date(currentMonth.value == 1 ? currentYear.value - 1 : currentYear.value, currentMonth.value == 0 ? 11 : currentMonth.value - 1, i);
        dates.value.push({ day: i, classes: 'date prev disabled', time: prevTimestamp.getTime() });
    }

    for (let i = 1; i <= nextDate; i++) {
        let currentTimestamp = new Date(currentYear.value, currentMonth.value, i);
        dates.value.push({ day: i, classes: 'date current', time: currentTimestamp.getTime() });
    }

    for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
        let nextTimestamp = new Date(currentMonth.value == 12 ? currentYear.value + 1 : currentYear.value, currentMonth.value == 11 ? 0 : currentMonth.value + 1, i);
        dates.value.push({ day: i, classes: 'date next disabled', time: nextTimestamp.getTime() });
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

let periodDateSetting = () => {
    if (selectedStart.value && selectedEnd.value) {
        if (startDate.value && endDate.value) {
            let getDateClass = document.querySelectorAll('.date');
            let s = startDate.value.split('-');
            let e = endDate.value.split('-');

            for (let i = 0; i < getDateClass.length; i++) {
                if (selectedStart.value < getDateClass[i].dataset.time && getDateClass[i].dataset.time < selectedEnd.value) {
                    nextTick(() => {
                        getDateClass[i].classList.add('period');
                    })
                }
            }
        }
    }
}

let updateCalendar = async (e, what) => {
    if (what == 'year') {
        currentYear.value = e.target.value;
    } else if (what == 'month') {
        currentMonth.value = e.target.value;
    }

    thisMonth = new Date(currentYear.value, currentMonth.value, 1);
    let getDateClass = document.querySelectorAll('.date');
    for (let i = 0; i < getDateClass.length; i++) {
        getDateClass[i].classList.remove('period');
    }
    await renderCalender(thisMonth);
    periodDateSetting();
}

let prevTime = async () => {
    thisMonth = new Date(currentYear.value, currentMonth.value - 1, 1);
    let getDateClass = document.querySelectorAll('.date');
    for (let i = 0; i < getDateClass.length; i++) {
        getDateClass[i].classList.remove('period');
    }
    await renderCalender(thisMonth);
    periodDateSetting();
    if (selectedInput == 'start') {
        document.getElementById('start').focus();
    } else if (selectedInput == 'end') {
        document.getElementById('end').focus();
    }
}

let nextTime = async () => {
    thisMonth = new Date(currentYear.value, currentMonth.value + 1, 1);
    let getDateClass = document.querySelectorAll('.date');
    for (let i = 0; i < getDateClass.length; i++) {
        getDateClass[i].classList.remove('period');
    }
    await renderCalender(thisMonth);
    periodDateSetting();
    if (selectedInput == 'start') {
        document.getElementById('start').focus();
    } else if (selectedInput == 'end') {
        document.getElementById('end').focus();
    }
}

// let goSelectedDate = async (y, m) => {
//     // console.log(y,m)
//     thisMonth = new Date(y, m - 1, 1);
//     let getDateClass = document.querySelectorAll('.date');
//     for (let i = 0; i < getDateClass.length; i++) {
//         getDateClass[i].classList.remove('period');
//         getDateClass[i].classList.remove('here');
//     }
//     await renderCalender(thisMonth);
//     periodDateSetting();
//     if (selectedInput == 'start' && selectedStart.value) {
//         let startClass = document.querySelector('.start');
//         nextTick(() => {
//             startClass.classList.add('here');
//         })
//     } else if (selectedInput == 'end' && selectedEnd.value) {
//         let endClass = document.querySelector('.end');
//         nextTick(() => {
//             endClass.classList.add('here');
//         })
//     }
// }

let createdDate = (e, date) => {
    let getDateClass = document.querySelectorAll('.date');

    if (selectedStart.value && (selectedStart.value === date.time)) {
        startDate.value = '';
        selectedStart.value = '';
        for (let i = 0; i < getDateClass.length; i++) {
            nextTick(() => {
                getDateClass[i].classList.remove('period');
            })
        }

        updateSearchText();

        if (endDate.value) {
            let e = endDate.value.split('-');
            // goSelectedDate(e[0], e[1]);
            selectedInput = 'end';
        } else {
            thisMonth = new Date(currentYear.value, currentMonth.value, 1);
            renderCalender(thisMonth);
        }
        nextTick(() => {
            document.getElementById('start').focus();
        })

        return false
    } else if (selectedEnd.value && (selectedEnd.value === date.time)) {
        endDate.value = '';
        selectedEnd.value = '';
        for (let i = 0; i < getDateClass.length; i++) {
            nextTick(() => {
                getDateClass[i].classList.remove('period');
            })
        }

        updateSearchText();

        if (startDate.value) {
            let s = startDate.value.split('-');
            // goSelectedDate(s[0], s[1]);
            selectedInput = 'start';
        } else {
            thisMonth = new Date(currentYear.value, currentMonth.value, 1);
            renderCalender(thisMonth);
        }
        nextTick(() => {
            document.getElementById('end').focus();
        })

        return false
    }

    let selectedYear = currentYear.value;
    let selectedMonth = currentMonth.value + 1;
    let selectedDay = date.day;
    let formattedDate = `${selectedYear}-${selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}-${selectedDay < 10 ? `0${selectedDay}` : selectedDay}`;

    let checkDateRange = (e, date) => {
        if (startDate.value && endDate.value) {
            if (endDate.value < startDate.value) {
                startDate.value = endDate.value;
                selectedStart.value = date.time;
                for (let i = 0; i < getDateClass.length; i++) {
                    getDateClass[i].classList.remove('start');
                    getDateClass[i].classList.remove('period');
                    getDateClass[i].classList.remove('end');
                }
                endDate.value = null;

                nextTick(() => {
                    document.getElementById('end').focus();
                })
            } else {
                checkCalendar('create');
            }
        }
    }

    if (selectedInput == 'start') {
        startDate.value = formattedDate;
        selectedStart.value = date.time;
        for (let i = 0; i < getDateClass.length; i++) {
            getDateClass[i].classList.remove('start');
            getDateClass[i].classList.remove('period');
        }

        checkDateRange(e, date);
        updateSearchText();

        nextTick(() => {
            document.getElementById('end').focus();
        })
    } else if (selectedInput == 'end') {
        endDate.value = formattedDate;
        selectedEnd.value = date.time;
        for (let i = 0; i < getDateClass.length; i++) {
            getDateClass[i].classList.remove('end');
            getDateClass[i].classList.remove('period');
        }

        checkDateRange(e, date);
        updateSearchText();

        nextTick(() => {
            document.getElementById('end').focus();
        })
    }
}
</script>

<style lang="less" scoped>
#calendar {
    width: 340px;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #FAFAFA;
    box-shadow: 8px 12px 36px 0px rgba(0, 0, 0, 0.10);
    display: none;

    &.show {
        display: block;
    }

    .infiniteScroll {
        position: relative;
        width: 65px;
        padding: 5px;
        cursor: pointer;
    }

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

            select {
                flex-grow: 1;

                -webkit-appearance: none;
                /* 크롬 */
                -moz-appearance: none;
                /* 파이어폭스 */
                appearance: none
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

                    &.here {
                        &::before {
                            border: 1.8px solid var(--main-color) !important;
                            background-color: rgba(41, 63, 230, 0.2);
                        }
                    }

                    &.start,
                    &.end {
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
                        color: rgba(0, 0, 0, 0.5);
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

        input {
            cursor: pointer;
        }

        span {
            font-size: 1rem;
            padding: 0 10px;
        }
    }
}
</style>