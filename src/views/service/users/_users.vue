<template lang="pug">
#users
    section.infoBox
        form#searchForm(@submit.prevent="searchUsers")
            .selectBar
                .customSelect(@click.stop="(e)=>{showDropDown(e)}" style="padding: 0 1rem;")
                    button
                        span {{ searchFor }}
                        span.material-symbols-outlined arrow_drop_down
                    .moreVert(@click.stop style="--moreVert-left:0;width:100%;display:none")
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
                .material-symbols-outlined.search search
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
                //- Calendar(v-if="showCalendar" @dateClicked="handledateClick" alwaysEmit='true')

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
                            Checkbox(v-model="filterOptions.userID") User ID
                            Checkbox(v-model="filterOptions.name") Name
                            Checkbox(v-model="filterOptions.block") Block/Unblock
                            Checkbox(v-model="filterOptions.status") Status
                            Checkbox(v-model="filterOptions.email") Email
                            Checkbox(v-model="filterOptions.address") Address
                            Checkbox(v-model="filterOptions.gender") Gender
                            Checkbox(v-model="filterOptions.locale") Locale
                            Checkbox(v-model="filterOptions.timestamp") Date Created 
                .material-symbols-outlined.clickable.refresh cached
                .material-symbols-outlined.clickable.fill.create(@click="openInviteUser=true") mail
                .material-symbols-outlined.clickable.fill.create(@click="openCreateUser=true") person_add
                .menu(@click.stop="(e)=>{showDropDown(e)}")
                    .material-symbols-outlined.mid.clickable more_vert
                    .moreVert(@click.stop style="--moreVert-left:0;display:none")
                        .inner
                            .more(@click="()=>{stateText='Block'; showBlockUser=true; showUserSetting=false;}")
                                .material-symbols-outlined.fill account_circle_off
                                span Block
                            .more(@click="()=>{stateText='Unblock'; showUnblockUser=true; showUserSetting=false;}")
                                .material-symbols-outlined.fill account_circle
                                span Unblock
                            .more(@click="()=>{stateText='Delete'; showDeleteUser = true; showUserSetting = false;}")
                                .material-symbols-outlined.fill delete
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
                                .material-symbols-outlined.fill.block(v-if="user.approved.includes('suspended')") no_accounts
                                .material-symbols-outlined.fill.unblock(v-else) account_circle
                            td.center(v-if="filterOptions.status")
                                .material-symbols-outlined.fill.enable(v-if="user.access_group > 0") check_circle
                                .material-symbols-outlined.fill.disable(v-else) cancel
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

Modal(:open="openInviteUser")
    h4(style='margin:.5em 0 0;') Invite User

    hr

    div(style='font-size:.8rem;')
        p.
            Invitation Email includes a temporary password and the acception link. 
            #[br]
            User must accept the invitation within 7 days.
            #[br]
            For more information, refer:&nbsp;
            #[a(href="https://docs.skapi.com/email/email-templates.html" target="_blank" style='white-space: nowrap') E-Mail Templates]

    br

    form#inviteForm(@submit.prevent="inviteUser")
        input(hidden name="service" :value="currentService.id")

        label
            | User's Email 
            input.big(
                type="email"
                @input="e => email = e.target.value"
                title="Please enter a valid email address." 
                placeholder="anonymous@anonymous.com"
                required
            )
        br

        label
            | Name 
            input.big(
                @input="e => name = e.target.value"
                placeholder="User's Name" 
                required
            )

        br

        label
            | Redirect URL 
            input.big(
                @input="e => redirect = e.target.value"
                placeholder="URL to redirect when accepted. (optional)"
                type='url'
            )

        br

        .error(v-if="error")
            .material-symbols-outlined.mid error
            span {{ error }}

        br

        .buttonWrap
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.noLine(@click="error='';openInviteUser=false") Cancel 
                button.final(type="submit") Create User

Modal(:open="openCreateUser" style="width:478px")
    h4(style='margin:.5em 0 0;') Create User

    hr

    form#createForm(@submit.prevent="createUser")
        input(hidden name="service" :value="currentService.id")

        label User's Email 
            input.big(
                type="email"
                @input="e => email = e.target.value"
                title="Please enter a valid email address." 
                placeholder="anonymous@anonymous.com"
                required
            )
        br

        label Name 
            input.big(
                @input="e => name = e.target.value"
                placeholder="User's Name" 
                required
            )

        br

        label Password 
            input.big(
                @input="e => password = e.target.value"
                placeholder="User's Password"
                type='Password'
                minlength="6"
                required
            )

        br

        .error(v-if="error")
            .material-symbols-outlined.mid error
            span {{ error }}

        br

        .buttonWrap
            template(v-if="promiseRunning")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.noLine(@click="error='';openCreateUser=false") Cancel 
                button.final(type="submit") Create User
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { showDropDown } from '@/assets/js/event.js'
import { currentService, serviceUsers } from '@/views/service/main';
import { skapi } from '@/code/admin';
import Pager from '@/code/pager'
import Modal from '@/components/modal.vue';
import Checkbox from '@/components/checkbox.vue';
// import Calendar from '@/components/calendar.vue';

console.log(serviceUsers.value)

let searchFor = ref('timestamp');
let searchText = ref('');
let showCalendar = ref(false);
let showFilter = ref(false);
let searchDropDown = ref(null);
let checkDropDown = ref(null);
let showUserSetting = ref(false);
let openInviteUser = ref(false);
let openCreateUser = ref(false);
let promiseRunning = ref(false);
let name: '';
let email: '';
let password: '';
let redirect: '';
let error = ref('');
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

// let inviteUser = () => {
//     promiseRunning.value = true;
//     error.value = '';
//     skapi.signup({
//         email,
//         name,
//         access_group: 1,
//         service: currentService.id
//     }, {
//         signup_confirmation: redirect || false
//     }).then((res) => {
//         promiseRunning.value = false;
//         openInviteUser.value = false;
//     }).catch((err) => {
//         if (err.code === 'EXISTS') {
//             skapi.resendInvitation({
//                 redirect: redirect || '',
//                 email,
//                 service: currentService.id
//             }).then(() => {
//                 promiseRunning.value = false;
//                 openInviteUser.value = false;
//             }).catch((err) => {
//                 promiseRunning.value = false;
//                 error.value = err.message;
//             });
//         }
//         else {
//             promiseRunning.value = false;
//             error.value = err.message;
//         }
//     });
// }

// let createUser = () => {
//     promiseRunning.value = true;
//     error.value = '';
//     skapi.signup({
//         email,
//         name,
//         password,
//         service: currentService.id
//     }).then((res) => {
//         console.log(res);
//         promiseRunning.value = false;
//         document.getElementById('modalForm').reset();
//         email = ''; name = ''; password = '';
//         openCreateUser.value = false;
//     }).catch((err) => {
//         promiseRunning.value = false;
//         error.value = err.message;
//     });
// }

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
#inviteForm, #createForm {
    .buttonWrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
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