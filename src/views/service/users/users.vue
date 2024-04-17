<template lang="pug">

h3 User Authentication

p.
    The example below shows how to setup a basic form to sign up users in your website.

Code
    pre.
        #[span(style="color:#999") &lt;!-- signup.html --&gt;]
        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") action]=#[span(style="color:#FFED91") "login.html"] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.signup(event).catch(err=>alert(err.message))"]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                Email
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") required]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                Password
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") minlength]=#[span(style="color:#FFED91") "6"] #[span(style="color:#44E9FF") required]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Signup"]#[span(style="color:#999") &gt;]
        #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

br

p.
    Similar to the signup form, the login form below is a basic example of how to setup a login form.

Code
    pre.
        #[span(style="color:#999") &lt;!-- login.html --&gt;]
        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") action]=#[span(style="color:#FFED91") "welcome.html"] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.login(event).catch(err=>alert(err.message))"]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                Email
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") required]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                Password
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") required]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Login"]#[span(style="color:#999") &gt;]
        #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]
p.
    Once the user have logged in for the first time, they will be listed on your user list.
p.
    There are tons of other features for user authentications.
    For more details, please refer to the #[a(href="https://docs.skapi.com/authentication/create-account.html" target="_blank") Documentation]

br

h2 Users

hr

p Search and manage your service users.

form#searchForm(@submit.prevent="searchUsers")
    .customSelect(@click.stop="(e)=>{showDropDown(e)}")
        button
            span {{ searchFor == 'timestamp' ? 'date created' : searchFor }}
            span.material-symbols-outlined arrow_drop_down
        .moreVert(style="--moreVert-left:0;display:none")
            .inner(style="padding:0.8rem;padding-right:1rem")
                .more(value="timestamp" @click="searchFor = 'timestamp';searchText = ''") Date Created
                .more(value="user_id" @click="searchFor = 'user_id';searchText = ''") User ID
                .more(value="email" @click="searchFor = 'email';searchText = ''") Email
                .more(value="phone_number" @click="searchFor = 'phone_number';searchText = ''") phone_number
                .more(value="address" @click="searchFor = 'address';searchText = ''") Address
                .more(value="gender" @click="searchFor = 'gender';searchText = ''") Gender
                .more(value="name" @click="searchFor = 'name';searchText = ''") Name
                .more(value="locale" @click="searchFor = 'locale';searchText = ''") Locale
                .more(value="birthdate" @click="searchFor = 'birthdate';searchText = ''") Birth Date
    .search
        input.big#searchInput(v-if="searchFor === 'timestamp' || searchFor === 'birthdate'" type="text" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'user_id'" type="search" placeholder="Search Users" v-model="searchText" @input="e=>{e.target.setCustomValidity('');}" pattern="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")
        input.big#searchInput(v-else-if="searchFor === 'email'" type="email" placeholder="Search public email address" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'phone_number'" type="text" placeholder="eg+821234567890" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'address'" type="text" placeholder="Address" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'gender'" type="text" placeholder="Gender" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'name'" type="text" placeholder="Name" v-model="searchText")
        input.big#searchInput(v-else-if="searchFor === 'locale'" type="text" placeholder="2 digit country code e.g. KR" v-model="searchText")
        .material-symbols-outlined.fill.icon(v-if="(searchFor === 'timestamp' || searchFor === 'birthdate')" @click.stop="showCalendar = !showCalendar") calendar_today
        .material-symbols-outlined.fill.icon(v-if="searchFor === 'locale' && !searchText" @click.stop="showLocale = !showLocale") arrow_drop_down
        button.final(type="submit" style='flex-shrink: 0;') Search
        Calendar(v-if="showCalendar" @click.stop @dateClicked="handledateClick" alwaysEmit='true')

br

.tableMenu
    div(style='flex-grow: 1;text-align:right')
        .iconClick.square(:class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
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
        tr(v-if="loading")
            td#loading(:colspan="colspan").
                Loading Users ... &nbsp;
                #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
        tr(v-if="serviceUsers === null")
            td#noUsers(:colspan="colspan") No Users
        template(v-if="serviceUsers.length")
            tr(v-for="(user, index) in serviceUsers")
                td.center.optionCol.overflow(style="padding:0")
                    .material-symbols-outlined.fill.icon delete
                    .material-symbols-outlined.fill.icon account_circle
                td.overflow(v-if="filterOptions.email") {{ user.email }}
                td.overflow(v-if="filterOptions.userID") {{ user.user_id }}
                td.overflow(v-if="filterOptions.name") {{ user.name }}
                td.overflow(v-if="filterOptions.timestamp") {{ user.timestamp }}
                td.overflow(v-if="filterOptions.address") {{ user.address || '-' }}
                td.center(v-if="filterOptions.locale" style='font-size:0.8rem') {{ Countries?.[user.locale].flag || '-' }}
                td.center.overflow(v-if="filterOptions.gender") -
            tr(v-if="serviceUsers.length < 10" v-for="i in (10 - serviceUsers.length)" :key="'extra-' + i")
                td(:colspan="colspan")
        


.tableMenu(style='display:block;text-align:center;')
    .iconClick.square.arrow
        .material-symbols-outlined.bold chevron_left
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow
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

br
br
</template>
<script setup>
import Table from '@/components/table.vue';
import Code from '@/components/code.vue';
import Checkbox from '@/components/checkbox.vue';
import Modal from '@/components/modal.vue';
import Calendar from '@/components/calendar.vue';

import { ref, nextTick, watch } from 'vue';
import { user } from '@/code/user';
import { showDropDown } from '@/assets/js/event.js'
import { currentService } from '@/views/service/main';
import { Countries } from '@/code/countries';

let serviceUsers = ref([
    {
        access_group: 1,
        approved: "by_skapi:approved:1705046812570",
        email: "sdfsf@dsflf.ccc",
        locale: "KR",
        name: "slfk",
        records: 0,
        service: "ap210soCqAvRaYvQCmGr#5750ee2c-f7f7-43ff-b6a5-cce599d30101",
        subscribers: 0,
        timestamp: 1705046815700,
        user_id: "af5ebf3c-b308-4e4d-8939-d4227cfac7d4"
    },
    {
        access_group: 1,
        approved: "by_skapi:approved:1705046812570",
        email: "sdfsf@dsflf.ccc",
        locale: "KR",
        name: "slfk",
        records: 0,
        service: "ap210soCqAvRaYvQCmGr#5750ee2c-f7f7-43ff-b6a5-cce599d30101",
        subscribers: 0,
        timestamp: 1705046815700,
        user_id: "af5ebf3c-b308-4e4d-8939-d4227cfac7d4"
    },
    {
        access_group: 1,
        approved: "by_skapi:approved:1705046812570",
        email: "sdfsf@dsflf.ccc",
        locale: "KR",
        name: "slfk",
        records: 0,
        service: "ap210soCqAvRaYvQCmGr#5750ee2c-f7f7-43ff-b6a5-cce599d30101",
        subscribers: 0,
        timestamp: 1705046815700,
        user_id: "af5ebf3c-b308-4e4d-8939-d4227cfac7d4"
    },
    {
        access_group: 1,
        approved: "by_skapi:approved:1705046812570",
        email: "sdfsf@dsflf.ccc",
        locale: "KR",
        name: "slfk",
        records: 0,
        service: "ap210soCqAvRaYvQCmGr#5750ee2c-f7f7-43ff-b6a5-cce599d30101",
        subscribers: 0,
        timestamp: 1705046815700,
        user_id: "af5ebf3c-b308-4e4d-8939-d4227cfac7d4"
    },
    {
        access_group: 1,
        approved: "by_skapi:approved:1705046812570",
        email: "sdfsf@dsflf.ccc",
        locale: "KR",
        name: "slfk",
        records: 0,
        service: "ap210soCqAvRaYvQCmGr#5750ee2c-f7f7-43ff-b6a5-cce599d30101",
        subscribers: 0,
        timestamp: 1705046815700,
        user_id: "af5ebf3c-b308-4e4d-8939-d4227cfac7d4"
    }
])
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
let loading = ref(false);
let showCalendar = ref(false);
let showLocale = ref(false);
let openInviteUser = ref(false);
let openCreateUser = ref(false);
let promiseRunning = ref(false);
let name = '';
let email = '';
let password = '';
let redirect = '';
let error = ref('');

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

watch(filterOptions.value, nv => {
    colspan = Object.values(filterOptions.value).filter(value => value).length + 1;
}, { immediate: true })
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
        z-index: 9999;
    }
}
#inviteForm, #createForm {
    .buttonWrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
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