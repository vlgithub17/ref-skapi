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
            span &nbsp;&nbsp;Refresh
    div
        .iconClick.square(:class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
            .material-symbols-outlined.fill person_add
            span &nbsp;&nbsp;Create User
        .iconClick.square(:class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
            .material-symbols-outlined.fill mark_email_unread
            span &nbsp;&nbsp;Invite User


Table(:class="{disabled: !user?.email_verified || currentService.service.active <= 0}" resizable)
    template(v-slot:head)
        tr
            th.center(style='width:80px;padding:0')
                .iconClick.square(style='color:black')
                    .material-symbols-outlined.fill checklist_rtl
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
            td(colspan=8).
                Loading Users ... &nbsp;
                #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
        tr
            td(colspan=8) No Users
        tr
            td.center.optionCol.overflow(style="padding:0")
                .material-symbols-outlined.fill delete
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center.optionCol.overflow(style="padding:0")
                .material-symbols-outlined.fill delete
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center.optionCol.overflow(style="padding:0")
                .material-symbols-outlined.fill delete
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center.optionCol.overflow(style="padding:0")
                .material-symbols-outlined.fill delete
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center.optionCol.overflow(style="padding:0")
                .material-symbols-outlined.fill delete
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -
        tr
            td.center.optionCol.overflow(style="padding:0")
                .material-symbols-outlined.fill delete
                .material-symbols-outlined.fill account_circle
            td.overflow user@email.com
            td.overflow 08a688a9-13b4-4e82-9d32-fd574bea4dc3
            td.overflow Jimmy Gibberman
            td.overflow 1/19/2024, 4:12:41 PM
            td.overflow -
            td.center(style='font-size:1rem') {{ Countries.KR.flag }}
            td.center.overflow -

        tr
            td(colspan=8).
        tr
            td(colspan=8).


.tableMenu(style='display:block;text-align:center;')
    .iconClick.square.arrow
        .material-symbols-outlined.bold chevron_left
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow
        span &nbsp;&nbsp;Next
        .material-symbols-outlined.bold chevron_right
br
br

</template>
<script setup>
import Table from '@/components/table.vue';
import Code from '@/components/code.vue';

import { ref, nextTick } from 'vue';
import { user } from '@/code/user';
import { currentService } from '@/views/service/main';

import { Countries } from '@/code/countries';

</script>
<style scoped lang="less">
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