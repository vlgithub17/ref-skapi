<template lang="pug">
//- p {{ searchText }}
//- h3 User Authentication

//- p.
//-     The example below shows how to setup a basic sign-up / login form for your website.

//- Code
//-     pre.
//-         #[span(style="color:#999") &lt;!-- signup.html --&gt;]
//-         #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") action]=#[span(style="color:#FFED91") "login.html"] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.signup(event).catch(err=>alert(err.message))"]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
//-                 Email
//-                 #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
//-                 #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "user@email.com"] #[span(style="color:#44E9FF") required]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
//-                 Password
//-                 #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
//-                 #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") minlength]=#[span(style="color:#FFED91") "6"] #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "At least 6 characters"] #[span(style="color:#44E9FF") required]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Signup"]#[span(style="color:#999") &gt;]
//-         #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

//- br

//- Code
//-     pre.
//-         #[span(style="color:#999") &lt;!-- login.html --&gt;]
//-         #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") action]=#[span(style="color:#FFED91") "welcome.html"] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.login(event).catch(err=>alert(err.message))"]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
//-                 Email
//-                 #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
//-                 #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "your@email.com"] required]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
//-                 Password
//-                 #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
//-                 #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "Login password"] required]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
//-             #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Login"]#[span(style="color:#999") &gt;]
//-         #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]
//- p.
//-     Once the user have logged in for the first time, they will be listed on your #[b Users] section below.
//- p For more details, please refer to the #[a(href="https://docs.skapi.com/authentication/create-account.html" target="_blank") Documentation]

//- br

h2 Users

hr

p Search and manage your service users.

form#searchForm(@submit.prevent="searchUsers")
    .customSelect(@click.stop="(e)=>{showDropDown(e)}")
        button(type='button')
            span {{ searchFor == 'timestamp' ? 'date created' : searchFor }}
            span.material-symbols-outlined arrow_drop_down
        .moreVert(style="--moreVert-left:0;display:none")
            .inner(style="padding:0.8rem;padding-right:1rem")
                .more(value="timestamp" @click="searchFor = 'timestamp';searchText = '';") Date Created
                .more(value="user_id" @click="searchFor = 'user_id';searchText = '';") User ID
                .more(value="email" @click="searchFor = 'email';searchText = '';") Email
                .more(value="phone_number" @click="searchFor = 'phone_number';searchText = '';") phone_number
                .more(value="address" @click="searchFor = 'address';searchText = '';") Address
                .more(value="gender" @click="searchFor = 'gender';searchText = '';") Gender
                .more(value="name" @click="searchFor = 'name';searchText = '';") Name
                .more(value="locale" @click="searchFor = 'locale';searchText = '';") Locale
                .more(value="birthdate" @click="searchFor = 'birthdate';searchText = '';") Birth Date
    .search
        .clickInput(v-if="searchFor === 'timestamp' || searchFor === 'birthdate'" @click.stop="showCalendar = !showCalendar;")
            input.big#searchInput(type="text" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchText" readonly)
            .material-symbols-outlined.fill.icon(v-if="(searchFor === 'timestamp' || searchFor === 'birthdate')") calendar_today
            Calendar(v-model="searchText" :showCalendar="showCalendar" @close="showCalendar=false" alwaysEmit='true')
        input.big#searchInput(v-else-if="searchFor === 'phone_number'" type="text" placeholder="eg+821234567890" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'address'" type="text" placeholder="Address" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'gender'" type="text" placeholder="Gender" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'name'" type="text" placeholder="Name" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'locale'" type="text" placeholder="2 digit country code e.g. KR" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'user_id'" type="search" placeholder="Search Users" v-model="searchText" @input="e=>{e.target.setCustomValidity('');}" pattern="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")
        input.big#searchInput(v-else-if="searchFor === 'email'" type="email" placeholder="Search public email address" v-model="searchText")
        .material-symbols-outlined.fill.icon(v-if="searchFor === 'locale'" @click.stop="showLocale = !showLocale") arrow_drop_down
        button.final(type="submit" style='flex-shrink: 0;') Search
        Locale(v-if="showLocale" @countryClicked="handleCountryClick" @close="showLocale=false" :searchText="searchText")

br

.tableMenu
    div(style='flex-grow: 1;text-align:right')
        .iconClick.square(@click="refresh" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
            .material-symbols-outlined.fill refresh
            span &nbsp;&nbsp;Refresh
    div
        .iconClick.square(@click="openCreateUser = true" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
            .material-symbols-outlined.fill person_add
            span &nbsp;&nbsp;Create User
        .iconClick.square(@click="openInviteUser = true" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
            .material-symbols-outlined.fill mark_email_unread
            span &nbsp;&nbsp;Invite User


Table(:class="{disabled: !user?.email_verified || currentService.service.active <= 0}" resizable)
    template(v-slot:head)
        tr
            th.center(style='width:80px;padding:0')
                .iconClick.square(@click.stop="(e)=>{showDropDown(e)}" style='color:black')
                    .material-symbols-outlined.fill checklist_rtl
                    .moreVert(@click.stop style="--moreVert-left:0;display:none;font-weight:normal")
                        .inner(style="padding:.5rem 1rem .5rem .5rem")
                            Checkbox(v-model="filterOptions.userID" style="display:flex;") User ID
                            Checkbox(v-model="filterOptions.name" style="display:flex") Name
                            Checkbox(v-model="filterOptions.email" style="display:flex") Email
                            Checkbox(v-model="filterOptions.address" style="display:flex") Address
                            Checkbox(v-model="filterOptions.gender" style="display:flex") Gender
                            Checkbox(v-model="filterOptions.locale" style="display:flex") Locale
                            Checkbox(v-model="filterOptions.timestamp" style="display:flex") Date Created 
                .resizer
            th.overflow(v-if="filterOptions.email" style="width:200px")
                | Email
                .resizer
            th.overflow(v-if="filterOptions.userID" style="width:160px")
                | User ID
                .resizer
            th.overflow(v-if="filterOptions.name" style="width:160px")
                | Name
                .resizer
            th.overflow(v-if="filterOptions.timestamp" style="width:200px")
                | Sign Up Date
                .resizer
            th.overflow(v-if="filterOptions.address" style="width:160px")
                | Address
                .resizer
            th.center.overflow(v-if="filterOptions.locale" style="width:96px;")
                | Locale
                .resizer
            th.center.overflow(v-if="filterOptions.gender" style="width:96px;")
                | Gender
                .resizer


    template(v-slot:body)
        template(v-if="callUserList")
            tr
                td#loading(:colspan="colspan").
                    Loading Users ... &nbsp;
                    #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
            tr(v-for="i in 9")
                td(:colspan="colspan")
        template(v-else-if="users == null || (!users.length && !callUserList)")
            tr
                td#noUsers(:colspan="colspan") No Users
            tr(v-for="i in 9")
                td(:colspan="colspan")
        template(v-else-if="users.length && !callUserList") 
            tr(v-for="(user, index) in users") 
                td.center.optionCol.overflow(style="padding:0")
                    .material-symbols-outlined.fill.icon(@click="openDeleteUser = true; selectedUser = user") delete
                    template(v-if="user.approved.includes('suspended')")
                        .material-symbols-outlined.fill.icon(@click="openUnblockUser = true; selectedUser = user") no_accounts
                    template(v-else)
                        .material-symbols-outlined.fill.icon(@click="openBlockUser = true; selectedUser = user") account_circle
                td.overflow(v-if="filterOptions.email") {{ user.email }}
                td.overflow(v-if="filterOptions.userID") {{ user.user_id }}
                td.overflow(v-if="filterOptions.name") {{ user.name }}
                td.overflow(v-if="filterOptions.timestamp") {{ user.timestamp }}
                td.overflow(v-if="filterOptions.address") {{ user.address || '-' }}
                td.center(v-if="filterOptions.locale" style='font-size:0.8rem') {{ Countries?.[user.locale].flag || '-' }}
                td.center.overflow(v-if="filterOptions.gender") -
            tr(v-if="users.length < 10" v-for="i in (10 - users.length)" :key="'extra-' + i")
                td(:colspan="colspan")
        
.tableMenu(style='display:block;text-align:center;')
    .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': currentPage === 1 || callUserList }")
        .material-symbols-outlined.bold chevron_left
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow(@click="nextPage" :class="{'nonClickable': maxPage <= currentPage && userPage?.endOfList || callUserList }")
        span &nbsp;&nbsp;Next
        .material-symbols-outlined.bold chevron_right

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
            input.big#inviteUserEmail(
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

        div(style="display: flex; align-items: center; justify-content: space-between;")
            div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.noLine(type="button" @click="closeModal") Cancel 
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

        div(style="display: flex; align-items: center; justify-content: space-between;")
            div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
                img.loading(src="@/assets/img/loading.png")
            template(v-else)
                button.noLine(type="button" @click="closeModal") Cancel 
                button.final(type="submit") Create User

Modal(:open="openBlockUser")
    h4(style='margin:.5em 0 0;') Block User

    hr

    div(style='font-size:.8rem;')
        p.
            This action will block user from your service.
            #[br]
            The user will not be able to access your service anymore.

    br

    div(style="display: flex; align-items: center; justify-content: space-between;")
        div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine(type="button" @click="openBlockUser=false; selectedUser='';") Cancel 
            button.final(type="button" @click="changeUserState('block')") Block

Modal(:open="openUnblockUser")
    h4(style='margin:.5em 0 0;') Unblock User

    hr

    div(style='font-size:.8rem;')
        p.
            This action will unblock user from your service. 
            #[br]
            The user will have access to your service.

    br

    div(style="display: flex; align-items: center; justify-content: space-between;")
        div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine(type="button" @click="openUnblockUser=false; selectedUser='';") Cancel 
            button.final(type="button" @click="changeUserState('unblock')") Unblock  

Modal(:open="openDeleteUser")
    h4(style='margin:.5em 0 0; color: var(--caution-color)') Delete User

    hr

    div(style='font-size:.8rem;')
        p.
            This action will delete user account and all the user's data, 
            #[br]
            This action cannot be undone.

    br

    div(style="display: flex; align-items: center; justify-content: space-between;")
        div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine(type="button" @click="openDeleteUser=false; selectedUser='';") Cancel 
            button.unFinished.warning(type="button" @click="deleteUser") Delete  

br
br
</template>
<script setup lang="ts">
import Table from '@/components/table.vue';
import Code from '@/components/code.vue';
import Checkbox from '@/components/checkbox.vue';
import Modal from '@/components/modal.vue';
import Calendar from '@/components/calendar.vue';
import Locale from '@/components/locale.vue';
import Pager from '@/code/pager'

import { ref, nextTick, watch, onUnmounted, onMounted } from 'vue';
import { skapi } from '@/code/admin';
import { user } from '@/code/user';
import { showDropDown } from '@/assets/js/event.js'
import { currentService, serviceUsers } from '@/views/service/main';
import { Countries } from '@/code/countries';

function log(e){
    console.log('- log -')
    console.log(e);
}
let userPage = null;
let users = ref(null);
let callUserList = ref(false);
let currentPage = ref(1);
let maxPage = ref(1);
let defaultFetchParams = {
    service: currentService.id,
    searchFor: 'timestamp',
    condition: '<=',
    value: new Date().getTime()
}
let fetchParams = defaultFetchParams;
let filterOptions = ref({
    userID: true,
    name: true,
    email: true,
    address: true,
    gender: true,
    locale: true,
    timestamp: true
});
let colspan = Object.values(filterOptions.value).filter(value => value === true).length + 1;
let searchFor = ref('timestamp');
let searchText = ref('');
let showCalendar = ref(false);
let showLocale = ref(false);
let openInviteUser = ref(false);
let openCreateUser = ref(false);
let openBlockUser = ref(false);
let openUnblockUser = ref(false);
let openDeleteUser = ref(false);
let promiseRunning = ref(false);
let selectedUser = '';
let name = '';
let email = '';
let password = '';
let redirect = '';
let error = ref('');

let getPage = (p) => {
    let res = userPage.getPage(p);

    userPage.maxPage = res.maxPage;
    users.value = res.list;
    maxPage.value = res.maxPage;

    if(!res.list.length) {
        currentPage.value--;
    }
}

let refresh = async(update) => {
    if (callUserList.value) {
        return;
    }
    if (!searchText.value) {
        fetchParams = defaultFetchParams;
        fetchParams.value = new Date().getTime();
    }

    users.value = null;
     
    serviceUsers[currentService.id] = await Pager.init({
        id: 'user_id',
        sortBy: 'timestamp',
        order: 'desc',
        resultsPerPage: 10
    })

    userPage = serviceUsers[currentService.id];

    callUserList.value = true;

    skapi.getUsers(fetchParams, { limit: 50 }).then(u => {
        if (u.endOfList) {
            userPage.endOfList = true;
        }
        userPage.insertItems(u.list).then(_ => {
            // to avoid watch trigger
            if (currentPage.value === 1) {
                getPage(1);
            } 
            else {
                currentPage.value = 1;
            }
            callUserList.value = false;
        });
    });
}

// if (!serviceUsers?.[currentService.id]) {
//     refresh();
// }
// else {
//     userPage = serviceUsers[currentService.id];
//     getPage(currentPage.value);
// }

let nextPage = () => {
    if (currentPage.value === maxPage.value && !userPage.endOfList) {
        users.value = null;
        callUserList.value = true;
        skapi.getUsers(fetchParams, { fetchMore: true, limit: 50 }).then(u => {
            if (u.endOfList) {
                userPage.endOfList = true;
            }
            userPage.insertItems(u.list).then(_ => {
                currentPage.value++;
                callUserList.value = false;
            });
        });
    } else {
        currentPage.value++;
    }
}

// let handledateClick = (startDate, endDate, startTimestamp, endTimestamp) => {
//     if (startDate == '' && endDate == '') {
//         searchText.value = ''
//     } else {
//         searchText.value = (startDate || '') + ' ~ ' + (endDate || '');
//         prevDateInfo.start = startTimestamp;
//         prevDateInfo.end = endTimestamp;
//     }
// }

let handleCountryClick = (key) => {
    searchText.value = key;
    // showLocale.value = false;
    document.querySelector('#searchInput').focus();
}

let createUser = () => {
    promiseRunning.value = true;
    error.value = '';
    skapi.signup({
        email,
        name,
        password,
        service: currentService.id
    }).then((res) => {
        console.log(res);
        document.getElementById("createForm").reset();
        openCreateUser.value = false;
        promiseRunning.value = false;
        refresh();
    }).catch((err) => {
        promiseRunning.value = false;
        error.value = err.message;
    });
}

let changeUserState = (state) => {
    promiseRunning.value = true;

    if(state == 'block') {
        currentService.blockAccount(selectedUser.user_id).then((r) => {
            selectedUser.approved = 'by_admin:suspended:' + (new Date()).getTime();
            let toEdit = {}
            for(let k in selectedUser) {
                toEdit[k] = selectedUser[k];
            }
            userPage.editItem(toEdit).then((r) => {
                selectedUser = '';
                promiseRunning.value = false;
                openBlockUser.value = false;
                getPage(currentPage.value);
            });
        }).catch(e => alert(e.message));
    } else if(state == 'unblock') {
        currentService.unblockAccount(selectedUser.user_id).then((r) => {
            selectedUser.approved = 'by_admin:' + (new Date()).getTime();
            let toEdit = {}
            for(let k in selectedUser) {
                toEdit[k] = selectedUser[k];
            }
            userPage.editItem(toEdit).then((r) => {
                selectedUser = '';
                promiseRunning.value = false;
                openUnblockUser.value = false;
                getPage(currentPage.value);
            });
        }).catch(e => alert(e.message));
    }
}

let deleteUser = () => {
    promiseRunning.value = true;

    currentService.deleteAccount(selectedUser.user_id).then(() => {
        userPage.deleteItem(selectedUser.user_id).then(() => {
            selectedUser = '';
            promiseRunning.value = false;
            openDeleteUser.value = false;
            getPage(currentPage.value);
        })
    }).catch(e => alert(e.message));
}

let closeModal = () => {
    if(openInviteUser.value) {
        document.getElementById("inviteForm").reset();
        openInviteUser.value = false;
    } else if(openCreateUser.value) {
        document.getElementById("createForm").reset();
        openCreateUser.value = false;
    }
}

let searchUsers = () => {
    if (!searchText.value) {
        fetchParams = defaultFetchParams;
        refresh();
    } else if (searchFor.value === 'timestamp') {
        let dates = searchText.value.split('~').map(d => d.trim());

        let startDate = 0;
        if (dates?.[0]) {
            let st = new Date(dates[0]).getTime();
            if (!isNaN(st)) {
                startDate = st
            }
        }

        let endDate = Date.now();
        if (dates?.[1]) {
            let ed = new Date(dates[1]).getTime();
            if (!isNaN(endDate)) {
                endDate = ed;
            }
        }

        fetchParams = {
            service: currentService.id,
            searchFor: searchFor.value,
            value: startDate,
            range: endDate
        }

        refresh();
    } else if (searchFor.value === 'user_id') {
        fetchParams = {
            service: currentService.id,
            searchFor: 'user_id',
            value: searchText.value
        }

        refresh();
    } else if (searchFor.value === 'birthdate') {
        let dates = searchText.value.split('~').map(d => d.trim());

        let startDate = dates?.[0] || '1000-01-01';

        let endDate = dates?.[1] || new Date().toISOString().substring(0, 10);

        fetchParams = {
            service: currentService.id,
            searchFor: searchFor.value,
            value: startDate,
            range: endDate
        }

        refresh();
    } else {
        fetchParams = {
            service: currentService.id,
            searchFor: searchFor.value,
            value: searchText.value,
            condition: '>='
        }
        refresh();
    }
}

onUnmounted(() => {
    if (fetchParams.searchFor !== 'timestamp' || fetchParams?.condition !== '<=') {
        // remove list if it's not defaultParams
        delete serviceUsers[currentService.id];
    }
});

watch(filterOptions.value, nv => {
    colspan = Object.values(filterOptions.value).filter(value => value).length + 1;
}, { immediate: true })

watch(currentPage, (page) => {
    getPage(page);
});

watch(openInviteUser, nv => {
    if(nv) {
        nextTick(() => {
            document.getElementById('inviteUserEmail').focus();
        })
    }
})
</script>
<style scoped lang="less">
#searchForm {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    width: 600px;
    max-width: 100%;

    .search {
        position:relative;
        display: flex;
        flex-grow: 1;
        gap: 8px;
    }
    .big {
        padding-right: 1rem;
    }
    .icon {
        position: absolute;
        top: 50%;
        right: 125px;
        transform: translateY(-50%);
        cursor: pointer;
        user-select: none;
        // z-index: 99;
    }
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
.tableMenu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row-reverse;

    &>* {
        margin: 8px 0;
    }
}

.optionCol {
    &>*:first-child {
        margin-right: 8px;
    }
}
.iconClick {
    font-size: 0.7rem;
}
.iconClick.arrow {
    padding:0;
    font-size: 0.8rem;
}
</style>