<template lang="pug">
#users
    section.infoBox
        form#searchForm(@submit.prevent="searchUsers")
            .selectBar
                .customSelect(@click.stop="(e)=>{showDropDown(e)}" style="padding: 0 1rem;")
                    button
                        span {{ searchFor }}
                        span.material-symbols-outlined arrow_drop_down
                    .moreVert(style="--moreVert-left:0;width:100%;display:none")
                        .inner
                            .more(value="timestamp" @click="searchFor = 'timestamp';searchText = ''") Date Created
                            .more(value="user_id" @click="searchFor = 'user_id';searchText = ''") User ID
                            .more(value="email" @click="searchFor = 'email';searchText = ''") Email
                            .more(value="phone_number" @click="searchFor = 'phone_number';searchText = ''") phone_number
                            .more(value="address" @click="searchFor = 'address';searchText = ''") Address
                            .more(value="gender" @click="searchFor = 'gender';searchText = ''") Gender
                            .more(value="name" @click="searchFor = 'name';searchText = ''") Name
                            .more(value="locale" @click="searchFor = 'locale';searchText = ''") Locale
                            .more(value="birthdate" @click="searchFor = 'birthdate';searchText = ''") Birth Date
            .searchBar
                .material-symbols-outlined.nohover.search search
                input#searchInput(v-if="searchFor === 'timestamp'" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchText")
                label.customSearchLabel(v-else-if="searchFor === 'user_id'")
                    input#searchInput(
                        placeholder="Search Users" 
                        v-model="searchText"
                        @input="e=>{e.target.setCustomValidity('');}"
                        pattern="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
                    )
                    .material-symbols-outlined.delete(v-if="searchText" @click='searchText=""') close
                label.customSearchLabel(v-else-if="searchFor === 'email'")
                    input#searchInput(type="email" placeholder="Search public email address" v-model="searchText")
                    .material-symbols-outlined.delete(v-if="searchText" @click='searchText=""') close
                label.customSearchLabel(v-else-if="searchFor === 'phone_number'")
                    input#searchInput(type="text" placeholder="eg+821234567890" v-model="searchText")
                    .material-symbols-outlined.delete(v-if="searchText" @click='searchText=""') close
                label.customSearchLabel(v-else-if="searchFor === 'address'")
                    input#searchInput(type="text" placeholder="Address" v-model="searchText")
                    .material-symbols-outlined.delete(v-if="searchText" @click='searchText=""') close
                label.customSearchLabel(v-else-if="searchFor === 'gender'")
                    input#searchInput(type="text" placeholder="Gender" v-model="searchText")
                    .material-symbols-outlined.delete(v-if="searchText" @click='searchText=""') close
                label.customSearchLabel(v-else-if="searchFor === 'name'")
                    input#searchInput(vtype="text" placeholder="Name" v-model="searchText")
                    .material-symbols-outlined.delete(v-if="searchText" @click='searchText=""') close
                label.customSearchLabel(v-else-if="searchFor === 'locale'")
                    input#searchInput(type="text" placeholder="2 digit country code e.g. KR" v-model="searchText")
                    .material-symbols-outlined.delete(v-if="searchText" @click='searchText=""') close
                input#searchInput(v-else="searchFor === 'birthdate'" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchText")
                input(hidden type='submit')
                .material-symbols-outlined.fill.modalIcon(v-if="(searchFor === 'timestamp' || searchFor === 'birthdate')" @click.stop="showCalendar = !showCalendar") calendar_today
                .material-symbols-outlined.fill.modalIcon(v-if="searchFor === 'locale' && !searchText" @click.stop="showLocale = !showLocale") arrow_drop_down
                Calendar(v-if="showCalendar" @dateClicked="handledateClick" alwaysEmit='true')

    br

    section.infoBox
        .tableHeader 
            .actions
                .customSelect(@click.stop="(e)=>{showDropDown(e)}")
                    button(style="height:unset")
                        span Headers
                        .material-symbols-outlined.mid arrow_drop_down
                    .moreVert(@click.stop style="--moreVert-left:0;display:none")
                        .inner
                            .more.customCheckBox
                                input#userID(type="checkbox" :checked="filterOptions.userID" @change="filterOptions.userID = !filterOptions.userID")
                                label(for="userID")
                                    .material-symbols-outlined.mid.check check
                                    span User ID
                            .more.customCheckBox
                                input#name(type="checkbox" :checked="filterOptions.name" @change="filterOptions.name = !filterOptions.name")
                                label(for="name")
                                    .material-symbols-outlined.mid.check check
                                    span Name
                            .more.customCheckBox
                                input#block(type="checkbox" :checked="filterOptions.block" @change="filterOptions.block = !filterOptions.block")
                                label(for="block")
                                    .material-symbols-outlined.mid.check check
                                    span Block/Unblock
                            .more.customCheckBox
                                input#status(type="checkbox" :checked="filterOptions.status" @change="filterOptions.status = !filterOptions.status")
                                label(for="status")
                                    .material-symbols-outlined.mid.check check
                                    span Status
                            .more.customCheckBox
                                input#email(type="checkbox" :checked="filterOptions.email" @change="filterOptions.email = !filterOptions.email")
                                label(for="email")
                                    .material-symbols-outlined.mid.check check
                                    span Email
                            .more.customCheckBox
                                input#address(type="checkbox" :checked="filterOptions.address" @change="filterOptions.address = !filterOptions.address")
                                label(for="address")
                                    .material-symbols-outlined.mid.check check
                                    span Address
                            .more.customCheckBox
                                input#gender(type="checkbox" :checked="filterOptions.gender" @change="filterOptions.gender = !filterOptions.gender")
                                label(for="gender")
                                    .material-symbols-outlined.mid.check check
                                    span Gender
                            .more.customCheckBox
                                input#locale(type="checkbox" :checked="filterOptions.locale" @change="filterOptions.locale = !filterOptions.locale")
                                label(for="locale")
                                    .material-symbols-outlined.mid.check check
                                    span Locale
                            .more.customCheckBox
                                input#timestamp(type="checkbox" :checked="filterOptions.timestamp" @change="filterOptions.timestamp = !filterOptions.timestamp")
                                label(for="timestamp")
                                    .material-symbols-outlined.mid.check check
                                    span Date Created   

                .material-symbols-outlined.clickable.refresh cached
                .material-symbols-outlined.clickable.fill.create(@click="inviteDialog.showModal();") mail
                .material-symbols-outlined.clickable.fill.create(@click="createDialog.showModal();") person_add
                .menu(@click.stop="(e)=>{showDropDown(e)}")
                    .material-symbols-outlined.mid.clickable more_vert
                    .moreVert(@click.stop style="--moreVert-left:0;display:none")
                        .inner
                            .more(@click="()=>{stateText='Block'; showBlockUser=true; showUserSetting=false;}")
                                .material-symbols-outlined.fill.nohover account_circle_off
                                span Block
                            .more(@click="()=>{stateText='Unblock'; showUnblockUser=true; showUserSetting=false;}")
                                .material-symbols-outlined.fill.nohover account_circle
                                span Unblock
                            .more(@click="()=>{stateText='Delete'; showDeleteUser = true; showUserSetting = false;}")
                                .material-symbols-outlined.fill.nohover delete
                                span Delete
            .pagenator
                .material-symbols-outlined.clickable.prevPage(style="font-size:1rem;margin-right:0.5rem") arrow_back_ios
                .material-symbols-outlined.clickable.nextPage(style="font-size:1rem") arrow_forward_ios
        .tableWrap 
            table#resizeMe.table
                thead
                    tr
                        th.th.center(style="width:20px;" :class='{nonClickable: serviceUsers === null || !serviceUsers.length}')
                            .customCheckBox
                                input#allUsers(type="checkbox" value='selectall' @click="selectAll")
                                label(for="allUsers")
                                    .material-symbols-outlined.check check
                        th.th.center(v-if="filterOptions.block" style="width:70px;")
                            | Block
                            .resizer(@mousedown="mousedown")
                        th.th.center(v-if="filterOptions.status" style="width:70px;")
                            | Status
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.userID" style="width:360px;")
                            | User ID
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.name" style="width:160px;")
                            | Name
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.email" style="width:160px;")
                            | Email
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.address" style="width:160px;")
                            | Address
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.gender" style="width:160px;")
                            | Gender
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.locale" style="width:160px;")
                            | Locale
                            .resizer(@mousedown="mousedown")
                        th.th(v-if="filterOptions.timestamp" style="width:160px;")
                            | Date Created
                            .resizer(@mousedown="mousedown")
                tbody
                    template(v-if="serviceUsers && serviceUsers.length")
                        tr(v-for="(user, index) in serviceUsers" :key="index" @click="userCheckConfirm(user)")
                            td(style="min-width:20px;")
                                .customCheckBox
                                    input(type="checkbox" name="user" :id="user.user_id" @change='trackSelectedUsers' :value="user.user_id")
                                    label(:for="user.user_id")
                                        .material-symbols-outlined.fill.check check
                            td.center(v-if="filterOptions.block")
                                .material-symbols-outlined.fill.nohover.block(v-if="user.approved.includes('suspended')") no_accounts
                                .material-symbols-outlined.fill.nohover.unblock(v-else) account_circle
                            td.center(v-if="filterOptions.status")
                                .material-symbols-outlined.fill.nohover.enable(v-if="user.access_group > 0") check_circle
                                .material-symbols-outlined.fill.nohover.disable(v-else) cancel
                            td(v-if="filterOptions.userID") 
                                .overflow {{ user.user_id }}
                            td(v-if="filterOptions.name")
                                .overflow {{ user.name }}
                            td(v-if="filterOptions.email")
                                .overflow {{ user.email }}
                            td(v-if="filterOptions.address") 
                                .overflow {{ user.address }}
                            td(v-if="filterOptions.gender")
                                .overflow {{ user.gender }}
                            td(v-if="filterOptions.locale")
                                .overflow {{ user.locale.flag }}
                            td(v-if="filterOptions.timestamp")
                                .overflow {{ user.timestamp }}
                        tr(v-if="serviceUsers.length < 10" v-for="i in (10 - serviceUsers.length)" :key="'extra-' + i")
                    tr.noData(v-if="serviceUsers === null")
                        td(colspan="9" style="text-align:center; padding-top:20px;")
                            h3 No Users
                            br
                            p There are no users matching your search terms.

    Invite(ref="inviteDialog" @close="inviteDialog.close();" @load="(e)=>inviteDialog = e")
    Create(ref="createDialog" @close="createDialog.close();" @load="(e)=>createDialog = e")
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { showDropDown } from '@/assets/js/event.js'
import Calendar from '@/components/calendar.vue';
import Invite from '@/views/service/users/dialog/invite-user.vue'
import Create from '@/views/service/users/dialog/create-user.vue'
import Pager from '@/code/pager'
import { skapi } from '@/code/admin';
import { currentService, serviceUsers } from '@/views/service/main';

console.log(serviceUsers.value)

// if( !serviceUsers.length ) {
//     Pager.init({
//         id: 'user_id',
//         sortBy: 'user_id',
//         order: 'desc',
//         resultsPerPage: 10
//     })
// }

let searchFor = ref('timestamp');
let searchText = ref('');
let showCalendar = ref(false);
let showFilter = ref(false);
let searchDropDown = ref(null);
let checkDropDown = ref(null);
let inviteDialog = ref(null);
let createDialog = ref(null);
let showUserSetting = ref(false);
// let users = ref([
//     {
//         access_group: 1,
//         approved: "by_skapi:approved:1705046812570",
//         email: "sdfsf@dsflf.ccc",
//         locale: "KR",
//         name: "slfk",
//         records: 0,
//         service: "ap210soCqAvRaYvQCmGr#5750ee2c-f7f7-43ff-b6a5-cce599d30101",
//         subscribers: 0,
//         timestamp: 1705046815700,
//         user_id: "af5ebf3c-b308-4e4d-8939-d4227cfac7d4"
//     }
// ]);
let filterOptions = ref({
    userID: true,
    name: true,
    block: true,
    status: true,
    email: true,
    address: false,
    gender: false,
    locale: false,
    timestamp: false
});

let searchForChange = (e) => {
    searchFor.value = e.target.value;
    searchText.value = '';
    if(showCalendar) {
        showCalendar.value = false;
    }
    nextTick(() => {
        document.querySelector('#searchInput').focus();
    });
}

//user checkbox
let selectAll = (e) => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = e.target.checked
    })
    trackSelectedUsers();
}

let selectNone = () => {
    // page 넘길때 사용
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    trackSelectedUsers();
}

let checkedUsers = ref([]);

let trackSelectedUsers = () => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked && checkbox.value !== 'selectall') {
            checked.push(checkbox.value);
        }
    })
    checkedUsers.value = checked;
}

let userCheckConfirm = (user) => {
    let targetInput = document.getElementById(user.user_id);
    if (targetInput.checked) {
        targetInput.checked = false;
    } else {
        targetInput.checked = true;
    }
    trackSelectedUsers();
}

//calendar
let handleCountryClick = (key) => {
    searchText.value = key;
    showLocale.value = false;
    document.querySelector('#searchInput').focus();
}

let handledateClick = (startDate, endDate) => {
    if (startDate == null && endDate == null) {
        searchText.value = ''
        // showCalendar.value = true;
    } else {
        searchText.value = (startDate || '') + ' ~ ' + (endDate || '');
        // showCalendar.value = false;
    }
    document.querySelector('#searchInput').focus();
}

// table
let prevX, prevW, nextW = 0;
let prevCol, nextCol = null;
let widthSum = 0;

nextTick(() => {
    let ths = document.getElementsByTagName('th');
    let thsArr = Array.from(ths);

    thsArr.forEach((e) => {
        let widthStyle = window.getComputedStyle(e).width;
        e.style.width = widthStyle;
        widthSum += widthStyle;
    });
})

let mouseMoveHandler = function (e) {
    let dx = e.clientX - prevX;
    let ths = document.getElementsByTagName('th');
    let thsArr = Array.from(ths);

    thsArr.forEach((e) => {
        widthSum += e.offsetWidth;
    });

    if ((widthSum < window.innerWidth || dx < 0) && (prevW + dx > 100 && nextW - dx > 100)) {
        prevCol.style.width = `${prevW + dx}px`;
        nextCol.style.width = `${nextW - dx}px`;
    }
};

let mousedown = function (e) {
    console.log(e)
    prevCol = e.target.parentNode;
    nextCol = prevCol.nextSibling;

    let prevStyles = window.getComputedStyle(e.target.parentNode);
    let nextStyles = window.getComputedStyle(prevCol.nextSibling);

    prevX = e.clientX;
    prevW = parseInt(prevStyles.width, 10);
    nextW = parseInt(nextStyles.width, 10);
    document.addEventListener('mousemove', mouseMoveHandler);
};

document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
});

</script>

<style lang="less" scoped>
#users {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
}
#calendar,
#localeSelector {
    position: absolute;
    right: 0;
    top: 100%;
    max-width: 100%;
    margin-top: 8px;
    z-index: 1;
}
#searchForm {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .selectBar {
        width: 200px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
    }
    .searchBar {
        position: relative;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        flex-grow: 1;

        input {
            width: 100%;
            padding: 0 50px;
        }
        .search {
            position: absolute;
            left: 16px;
            top: 10px;
            color: rgba(0, 0, 0, 0.4);
        }
        .modalIcon {
            position: absolute;
            right: 16px;
            top: 10px;
            color: rgba(0, 0, 0, 0.8);
            cursor: pointer;
        }
    }
}
.customCheckBox {
    label {
        span {
            cursor: pointer;
        }
    }
}
.tableHeader {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .actions {
        display: flex;
        flex-wrap: wrap;

        > div:not(.menu) {
            margin-right: 0.5rem;
        }
        .create {
            color: var(--main-color);
        }
        .menu {
            position: relative;
            display: inline-block;
        }
    }
    .pagenator {
        font-size: 1rem !important;
    }
}

@media (max-width:767px) {
    #searchForm {
        .selectBar {
            width: 100%;
        }
    }
}
</style>