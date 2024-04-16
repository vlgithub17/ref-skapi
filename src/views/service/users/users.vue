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

form(@submit.prevent="createService" style='display: flex;gap: 8px;width: 480px;max-width: 100%;')
    input.big(placeholder="Search" type='search')
    button.final(type="submit" style='flex-shrink: 0;') Search

br

.tableMenu
    div(style='flex-grow: 1;text-align:right')
        .iconClick.square(:class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
            .material-symbols-outlined.fill refresh
            span(style="font-size: 0.8rem;font-weight:bold") &nbsp;&nbsp;Refresh
    div
        .iconClick.square(:class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
            .material-symbols-outlined.fill person_add
            span(style="font-size: 0.8rem;font-weight:bold") &nbsp;&nbsp;Create User
        .iconClick.square(:class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
            .material-symbols-outlined.fill mark_email_unread
            span(style="font-size: 0.8rem;font-weight:bold") &nbsp;&nbsp;Invite User
    

Table(:class="{disabled: !user?.email_verified || currentService.service.active <= 0}" resizable)
    template(v-slot:head)
        tr
            th.center(style="width:48px; padding:0")
                .resizer
            th.center(style="width:48px; padding:0")
                .resizer
            th.overflow(style="width:200px")
                | Email
                .resizer
            th.overflow(style="width:160px")
                | User ID
                .resizer
            th.overflow(style="width:160px")
                | Name
                .resizer
            th.overflow(style="width:200px")
                | Sign Up Date
                .resizer
            th.overflow(style="width:160px")
                | Address
                .resizer
            th.center.overflow(style="width:96px;")
                | Locale
                .resizer
            th.center.overflow(style="width:96px;")
                | Gender
                .resizer


    template(v-slot:body)
        tr
            td(colspan=9).
                Loading Users ... &nbsp;
                #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
        tr
            td(colspan=9) No Users
        tr
            td.center(style="padding:0")
                .material-symbols-outlined.fill delete
            td.center(style="padding:0")
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center(style="padding:0")
                .material-symbols-outlined.fill delete
            td.center(style="padding:0")
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center(style="padding:0")
                .material-symbols-outlined.fill delete
            td.center(style="padding:0")
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center(style="padding:0")
                .material-symbols-outlined.fill delete
            td.center(style="padding:0")
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center(style="padding:0")
                .material-symbols-outlined.fill delete
            td.center(style="padding:0")
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center(style="padding:0")
                .material-symbols-outlined.fill delete
            td.center(style="padding:0")
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -

        tr
            td(colspan=9).
        tr
            td(colspan=9).
        

.tableMenu(style='display:block;text-align:center;')
    .iconClick.square
        .material-symbols-outlined.bold chevron_left
        span Previous
    | &nbsp;&nbsp;
    .iconClick.square
        span Next
        .material-symbols-outlined.bold chevron_right
br
br

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
    flex-direction:row-reverse;
    &>* {
        margin: 8px 0;
    }
}
</style>