<template lang="pug">
section.infoBox
    .titleHead
        h2 Users
            
        span.moreInfo(@click="showDes = !showDes" @mouseover="hovering = true" @mouseleave="hovering = false")
            span More Info&nbsp;
            template(v-if="showDes")
                //- .material-symbols-outlined.notranslate.fill expand_circle_up 
                //- .material-symbols-outlined.notranslate.noFill expand_circle_up
                svg(v-if="hovering" style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up-fill")
                svg(v-else style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up")
            template(v-else) 
                //- .material-symbols-outlined.notranslate.fill expand_circle_down
                //- .material-symbols-outlined.notranslate.noFill expand_circle_down
                svg(v-if="hovering" style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down-fill")
                svg(v-else style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down")

    template(v-if="showDes")
        p.
            The example below shows how to setup a basic sign-up / login form for your website.

        Code
            pre.
                #[span(style="color:#999") &lt;!-- signup.html --&gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") h1]#[span(style="color:#999") &gt;]Signup#[span(style="color:#999") &lt;/]#[span(style="color:#33adff") h1]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") action]=#[span(style="color:#FFED91") "login.html"] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.signup(event).catch(err=>alert(err.message))"]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                        Email
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "user@email.com"] #[span(style="color:#44E9FF") required]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                        Password
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") minlength]=#[span(style="color:#FFED91") "6"] #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "At least 6 characters"] #[span(style="color:#44E9FF") required]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Signup"]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

        br

        Code
            pre.
                #[span(style="color:#999") &lt;!-- login.html --&gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") h1]#[span(style="color:#999") &gt;]Login#[span(style="color:#999") &lt;/]#[span(style="color:#33adff") h1]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") action]=#[span(style="color:#FFED91") "welcome.html"] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.login(event).catch(err=>alert(err.message))"]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                        Email
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "your@email.com"] required]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                        Password
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "password"] #[span(style="color:#44E9FF") #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "Login password"] required]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Login"]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]
        p.
            Once the user have logged in for the first time, they will be listed on your #[b Users] section below.
        p For more details, please refer to the #[a(href="https://docs.skapi.com/authentication/create-account.html" target="_blank") Documentation]

    hr
    
    .error(v-if='!user?.email_verified')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        router-link(to="/account-setting") Please verify your email address to modify settings.
        
    .error(v-else-if='currentService.service.active == 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently disabled.

    .error(v-else-if='currentService.service.active < 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently suspended.

    p(style='margin-bottom:0').
        Search and manage your service users.
        #[br]
        #[b User must have at least one successful login to be listed here.]


form#searchForm(@submit.prevent="getPage(true)" style="padding:1.2em")
    Select(v-model="searchFor" :selectOptions="selectOptions" :class="{'nonClickable' : fetching}" style="min-width:162px;flex-grow:1")
    .search(:class="{'nonClickable' : fetching}")
        .clickInput(v-if="searchFor === 'timestamp' || searchFor === 'birthdate'" @click="showCalendar = !showCalendar;")
            input.big#searchInput(type="text" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchValue" name="date" readonly)
            //- .material-symbols-outlined.notranslate.fill.icon(v-if="(searchFor === 'timestamp' || searchFor === 'birthdate')") calendar_today
            svg.svgIcon.reactive(v-if="(searchFor === 'timestamp' || searchFor === 'birthdate')")
                use(xlink:href="@/assets/img/material-icon.svg#icon-calendar-today-fill")  
            Calendar(v-model="searchValue" :showCalendar="showCalendar" @close="showCalendar=false" alwaysEmit='true')
        //- input.big#searchInput(v-else-if="searchFor === 'phone_number'" type="text" placeholder="eg+821234567890" v-model="searchValue" :disabled="fetching")
        input.big#searchInput(v-else-if="searchFor === 'address'" type="text" placeholder="Address" v-model="searchValue" name="address")
        input.big#searchInput(v-else-if="searchFor === 'gender'" type="text" placeholder="Gender" v-model="searchValue" name="gender")
        input.big#searchInput(v-else-if="searchFor === 'name'" type="text" placeholder="Name" v-model="searchValue" name="name")
        .clickInput(v-else-if="searchFor === 'locale'" @click="showLocale = !showLocale")
            input.big#searchInput(type="text" placeholder="2 digit country code e.g. KR" v-model="searchValue" name="locale" readonly)
            //- .material-symbols-outlined.notranslate.fill.icon(v-if="searchFor === 'locale'") arrow_drop_down
            svg.svgIcon.reactive(v-if="searchFor === 'locale'")
                use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down") 
            Locale(v-model="searchValue" :showLocale="showLocale" @close="showLocale=false")
        input.big#searchInput(v-else-if="searchFor === 'user_id'" type="search" placeholder="Search Users" v-model="searchValue" name="user_id" @input="e=>{e.target.setCustomValidity('');}" pattern="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")
        input.big#searchInput(v-else-if="searchFor === 'email'" placeholder="Search public email address" v-model="searchValue" name="email" type="email" minlength="5")
    button.final(type="submit" style='flex-shrink: 0;') Search

br

.tableMenu
    .iconClick.square(@click.stop="(e)=>{showDropDown(e)}")
        //- .material-symbols-outlined.notranslate.fill checklist_rtl
        svg.svgIcon
            use(xlink:href="@/assets/img/material-icon.svg#icon-checklist-rtl")  
        span &nbsp;&nbsp;Show Columns
        .moreVert(@click.stop style="--moreVert-left:0;display:none;font-weight:normal;color:black")
            .inner
                Checkbox(v-model="filterOptions.userID" style="display:flex;") User ID
                Checkbox(v-model="filterOptions.name" style="display:flex") Name
                Checkbox(v-model="filterOptions.email" style="display:flex") Email
                Checkbox(v-model="filterOptions.address" style="display:flex") Address
                Checkbox(v-model="filterOptions.gender" style="display:flex") Gender
                Checkbox(v-model="filterOptions.locale" style="display:flex") Locale
                Checkbox(v-model="filterOptions.timestamp" style="display:flex") Date Created 
                Checkbox(v-model="filterOptions.birthdate" style="display:flex") Birthdate 
                Checkbox(v-model="filterOptions.picture" style="display:flex") Picture 
                Checkbox(v-model="filterOptions.profile" style="display:flex") Profile 
                Checkbox(v-model="filterOptions.website" style="display:flex") Website 
                Checkbox(v-model="filterOptions.nickname" style="display:flex") Nickname
                Checkbox(v-model="filterOptions.misc" style="display:flex") Misc

    .iconClick.square(@click="openCreateUser = true" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        //- .material-symbols-outlined.notranslate.fill person_add
        svg.svgIcon
            use(xlink:href="@/assets/img/material-icon.svg#icon-person-add-fill") 
        span &nbsp;&nbsp;Create User
        
    .iconClick.square(@click="currentService.plan == 'Trial' ? openUpgrade = true : openInviteUser = true" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0, 'deact' : currentService.plan == 'Trial'}")
        //- .material-symbols-outlined.notranslate.fill mark_email_unread
        svg.svgIcon
            use(xlink:href="@/assets/img/material-icon.svg#icon-mark-email-unread-fill")
        
        span &nbsp;&nbsp;Invite User

    .iconClick.square(@click="getPage(true)" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        //- .material-symbols-outlined.notranslate.fill(:class='{loading:fetching}') refresh
        svg.svgIcon(:class='{loading:fetching}')
            use(xlink:href="@/assets/img/material-icon.svg#icon-refresh")
        span &nbsp;&nbsp;Refresh

.userPart
    template(v-if="fetching")
        #loading.
            Loading ... &nbsp;
            #[.loader(style="--loader-color:black; --loader-size:12px")]

    Table(:key="tableKey" :class="{disabled: !user?.email_verified || currentService.service.active <= 0}" resizable)

        template(v-slot:head)
            tr
                th.center(style='width:120px;padding:0')
                    //- .material-symbols-outlined.notranslate.fill manage_accounts
                    svg.svgIcon(style="fill: black;")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-manage-accounts-fill")
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
                th.center.overflow(v-if="filterOptions.birthdate" style="width:140px;")
                    | Birthdate
                    .resizer
                th.center.overflow(v-if="filterOptions.nickname" style="width:140px;")
                    | Nickname
                    .resizer
                th.overflow(v-if="filterOptions.picture" style="width:160px;")
                    | Picture
                    .resizer
                th.overflow(v-if="filterOptions.profile" style="width:160px;")
                    | Profile
                    .resizer
                th.overflow(v-if="filterOptions.website" style="width:160px;")
                    | Website
                    .resizer
                th.overflow(v-if="filterOptions.misc" style="width:200px;")
                    | Misc
                    .resizer


        template(v-slot:body)
            template(v-if="fetching")
                tr(v-for="i in 10")
                    td(:colspan="colspan")
            template(v-else-if="!listDisplay || listDisplay.length === 0")
                tr
                    td#noUsers(:colspan="colspan") No Users
                tr(v-for="i in 9")
                    td(:colspan="colspan")
            template(v-else) 
                tr(v-for="(user, index) in listDisplay") 
                    td.center.optionCol.overflow(style="padding:0")
                        //- .material-symbols-outlined.notranslate.fill.icon(@click="openDeleteUser = true; selectedUser = user") delete
                        svg.svgIcon.reactive(@click="openDeleteUser = true; selectedUser = user")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")
                        template(v-if="user.approved.includes('suspended')")
                            //- .material-symbols-outlined.notranslate.fill.icon(@click="openUnblockUser = true; selectedUser = user") no_accounts
                            svg.svgIcon.reactive(@click="openUnblockUser = true; selectedUser = user")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-no-accounts-fill")

                            svg.svgIcon.reactive(@click="openGrantAccess = false; selectedUser = user")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-supervisor-account-fill")
                            
                        template(v-else)
                            //- .material-symbols-outlined.notranslate.fill.icon(@click="openBlockUser = true; selectedUser = user") account_circle
                            svg.svgIcon.reactive(@click="openBlockUser = true; selectedUser = user")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-account-circle-fill")

                            svg.svgIcon.reactive(@click="openGrantAccess = true; selectedUser = user")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-supervisor-account-fill")
                    td.overflow(v-if="filterOptions.email") {{ user.email }}
                    td.overflow(v-if="filterOptions.userID") {{ user.user_id }}
                    td.overflow(v-if="filterOptions.name") {{ user.name }}
                    td.overflow(v-if="filterOptions.timestamp") {{ new Date(user.timestamp).toLocaleString() }}
                    td.overflow(v-if="filterOptions.address") {{ user.address || '-' }}
                    //- td.center(v-if="filterOptions.locale" style='font-size:0.8rem') {{ Countries?.[user.locale].flag || '-' }}
                    td.center(v-if="filterOptions.locale" style='font-size:0.8rem')
                        img(:src="'https://flagcdn.com/' + user.locale.toLowerCase() + '.svg'" style="width:16px; object-fit:contain")
                    td.center.overflow(v-if="filterOptions.gender") {{ user.gender || '-' }}
                    td.center.overflow(v-if="filterOptions.birthdate") {{ user.birthdate || '-' }}
                    td.center.overflow(v-if="filterOptions.nickname") {{ user.nickname || '-' }}
                    td.overflow(v-if="filterOptions.picture") {{ user.picture || '-' }}
                    td.overflow(v-if="filterOptions.profile") {{ user.profile || '-' }}
                    td.overflow(v-if="filterOptions.website") {{ user.website || '-' }}
                    td.overflow(v-if="filterOptions.misc") {{ user.misc || '-' }}
                tr(v-for="i in (10 - listDisplay.length)")
                    td(:colspan="colspan")
        
.tableMenu(style='display:block;text-align:center;')
    .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': fetching || currentPage === 1 }")
        //- .material-symbols-outlined.notranslate.bold chevron_left
        svg.svgIcon(style="width: 26px; height: 26px")
            use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-left")
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow(@click="currentPage++;" :class="{'nonClickable': fetching || endOfList && currentPage >= maxPage }")
        span &nbsp;&nbsp;Next
        //- .material-symbols-outlined.notranslate.bold chevron_right
        svg.svgIcon(style="width: 26px; height: 26px")
            use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-right")

// create user
Modal(:open="openCreateUser" @close="openCreateUser=false" style="width:478px")
    h4(style='margin:.5em 0 0;') Create User

    hr

    form#createForm(@submit.prevent="createUser")
        input(hidden name="service" :value="currentService.id")

        label User's Email 
            em(style="color:red; font-size:0.6rem") * Required
            input.big#email(
                type="email"
                @input="e => createParams.email = e.target.value"
                @keydown="e => moveFocus(e, 'password')"
                :disabled="promiseRunning"
                title="Please enter a valid email address." 
                placeholder="anonymous@anonymous.com"
                required
            )
        br

        label Password 
            em(style="color:red; font-size:0.6rem") * Required
            input.big#password(
                @input="e => createParams.password = e.target.value"
                @keydown="e => moveFocus(e, 'name')"
                :disabled="promiseRunning"
                placeholder="User's Password"
                type='Password'
                minlength="6"
                required
            )

        br

        label Name 
            input.big#name(
                @input="e => createParams.name = e.target.value"
                @keydown="e => moveFocus(e, 'phone')"
                :disabled="promiseRunning"
                placeholder="User's Name" 
            )

        br

        label Phone Number 
            input.big#phone(
                @input="e => createParams.phone_number = e.target.value"
                @keydown="e => moveFocus(e, 'gender')"
                :disabled="promiseRunning"
                placeholder="User's Phone Number"
                type='text'
            )

        br

        .label
            label Gender 
                input.big#gender(
                    @input="e => createParams.gender = e.target.value"
                    @keydown="e => moveFocus(e, 'address')"
                    :disabled="promiseRunning"
                    placeholder="User's Gender"
                    type='text'
                )
            Checkbox(v-model="gender_public") public

        br

        .label
            label Address 
                input.big#address(
                    @input="e => createParams.address = e.target.value"
                    @keydown="e => moveFocus(e, 'birthdate')"
                    :disabled="promiseRunning"
                    placeholder="User's Address"
                    type='text'
                ) 
            Checkbox(v-model="address_public") public

        br

        .label
            label Birthdate 
                input.big#birthdate(
                    @input="e => createParams.birthdate = e.target.value"
                    @keydown="e => moveFocus(e, 'picture')"
                    :disabled="promiseRunning"
                    placeholder="User's Birthdate (YYYY-MM-DD)"
                    type='text'
                )
            Checkbox(v-model="birthdate_public") public

        br

        label Picture 
            input.big#picture(
                @input="e => createParams.picture = e.target.value"
                @keydown="e => moveFocus(e, 'profile')"
                :disabled="promiseRunning"
                placeholder="URL of the profile picture."
                type='url'
            )

        br

        label Profile 
            input.big#profile(
                @input="e => createParams.profile = e.target.value"
                @keydown="e => moveFocus(e, 'website')"
                :disabled="promiseRunning"
                placeholder="URL of the profile page"
                type='url'
            )

        br

        label Website 
            input.big#website(
                @input="e => createParams.website = e.target.value"
                @keydown="e => moveFocus(e, 'nickname')"
                :disabled="promiseRunning"
                placeholder="URL of the website"
                type='url'
            )

        br

        label Nickname 
            input.big#nickname(
                @input="e => createParams.nickname = e.target.value"
                @keydown="e => moveFocus(e, 'misc')"
                :disabled="promiseRunning"
                placeholder="Nickname of the user"
                type='text'
            )

        br

        label misc 
            input.big#misc(
                @input="e => createParams.misc = e.target.value"
                :disabled="promiseRunning"
                placeholder="Additional string value that can be used freely"
                type='text'
            )

        br

        .error(v-if="error")
            //- .material-symbols-outlined.notranslate.mid error
            svg
                use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
            span {{ error }}

        br

        div(style="display: flex; align-items: center; justify-content: space-between;")
            div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
                .loader(style="--loader-color:blue; --loader-size:12px")
            template(v-else)
                button.noLine(type="button" @click="closeModal") Cancel 
                button.final(type="submit") Create User

// invite user
Modal(:open="openInviteUser" @close="openInviteUser=false")
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

        label User's Email 
            em(style="color:red; font-size:0.6rem") * Required
            input.big#inviteUserEmail(
                type="email"
                @input="e => inviteParams.email = e.target.value"
                @keydown="e => moveFocus(e, 'inviteUserName')"
                title="Please enter a valid email address." 
                placeholder="anonymous@anonymous.com"
                required
            )
        br

        label Name 
            em(style="color:red; font-size:0.6rem") * Required
            input.big#inviteUserName(
                @input="e => inviteParams.name = e.target.value"
                @keydown="e => moveFocus(e, 'inviteUserURL')"
                placeholder="User's Name" 
                required
            )

        br

        label Redirect URL 
            input.big#inviteUserURL(
                @input="e => redirect = e.target.value"
                placeholder="URL to redirect when accepted. (optional)"
                type='url'
            )

        br

        .error(v-if="error")
            //- .material-symbols-outlined.notranslate.mid error
            svg
                use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
            span {{ error }}

        br

        div(style="display: flex; align-items: center; justify-content: space-between;")
            div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
                .loader(style="--loader-color:blue; --loader-size:12px")
            template(v-else)
                button.noLine(type="button" @click="closeModal") Cancel 
                button.final(type="submit") Create User

// block user
Modal(:open="openBlockUser" @close="openBlockUser=false")
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
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine(type="button" @click="openBlockUser=false; selectedUser='';") Cancel 
            button.final(type="button" @click="changeUserState('block')") Block

// unblock user
Modal(:open="openUnblockUser" @close="openUnblockUser=false")
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
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine(type="button" @click="openUnblockUser=false; selectedUser='';") Cancel 
            button.final(type="button" @click="changeUserState('unblock')") Unblock  

// delete user
Modal(:open="openDeleteUser" @close="openDeleteUser=false")
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
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine.warning(type="button" @click="openDeleteUser=false; selectedUser='';") Cancel 
            button.final.warning(type="button" @click="deleteUser") Delete  

// upgrade service
Modal(:open="openUpgrade" @close="openUpgrade=false")
    h4(style='margin:.5em 0 0;') Upgrade

    hr

    div(style='font-size:.8rem;')
        p.
            You can access more features like sending newsletters,
            #[br]
            inviting users and file hosting by upgrading your service.
            
        p Would you like you check out our service plans?


    br

    div(style="display: flex; align-items: center; justify-content: space-between;")
        button.noLine(type="button" @click="openUpgrade=false;") No
        router-link(:to='`/subscription/${currentService.id}`')
            button.final(type="button") Yes

// grant access
Modal(:open="openGrantAccess" @close="openGrantAccess=false")
    h4(style='margin:.5em 0 0;') Grant Access

    hr

    div(style='font-size:.8rem;')
        p.
            This will grant the user access.
            #[br]
            Access rights can be granted from 1 to 99.

        span.current-access(style="margin-bottom:8px; display:block; font-weight:bold;") Current Access : {{ selectedUser.access_group }}
        input.change-access(type="number" placeholder='1~99' @keyup.stop="(e) => {e.target.value=e.target.value.replace(/[^0-9]/g,'')}" style="background-color: white; outline: 1px solid rgba(0, 0, 0, 0.5); border-radius: 6px; width:100%; padding:8px;")

    br

    div(style="display: flex; align-items: center; justify-content: space-between;")
        div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine(type="button" @click="closeGrantAccess") Cancel 
            button.final(type="button" @click="grantAccess") Change  

</template>
<script setup lang="ts">
import Table from '@/components/table.vue';
import Code from '@/components/code.vue';
import Select from '@/components/select.vue';
import Checkbox from '@/components/checkbox.vue';
import Modal from '@/components/modal.vue';
import Calendar from '@/components/calendar.vue';
import Locale from '@/components/locale.vue';
import Pager from '@/code/pager'

import type { Ref } from 'vue';
import { ref, computed, watch } from 'vue';
import { skapi } from '@/code/admin';
import { user } from '@/code/user';
import { showDropDown } from '@/assets/js/event.js'
import { currentService, serviceUsers } from '@/views/service/main';
import { Countries } from '@/code/countries';
import { devLog } from '@/code/logger';

let pager: Pager = null;

let searchFor: Ref<"timestamp" | "user_id" | "email" | "phone_number" | "address" | "gender" | "name" | "locale" | "birthdate"> = ref('timestamp');
let searchValue: Ref<string | number> = ref('');

// ui/ux related
let fetching = ref(false);
let maxPage = ref(0);
let currentPage: Ref<number> = ref(1);
let endOfList = ref(false);
let showCalendar = ref(false);
let showLocale = ref(false);
let showDes = ref(false);
let hovering = ref(false);

let filterOptions = ref({
    email: true,
    userID: true,
    name: true,
    timestamp: true,
    address: true,
    locale: true,
    gender: true,
    birthdate: true,
    picture: true,
    profile: true,
    website: true,
    nickname: true,
    misc: true,
});
let selectOptions = [
    {
        option: 'Date Created',
        value: 'timestamp'
    },
    {
        option: 'User ID',
        value: 'user_id'
    },
    {
        option: 'Email',
        value: 'email'
    },
    // {
    //     option: 'Phone Number',
    //     value: 'phone_number'
    // },
    {
        option: 'Address',
        value: 'address'
    },
    {
        option: 'Gender',
        value: 'gender'
    },
    {
        option: 'Name',
        value: 'name'
    },
    {
        option: 'Locale',
        value: 'locale'
    },
    {
        option: 'Birth Date',
        value: 'birthdate'
    },
]
let colspan = Object.values(filterOptions.value).filter(value => value === true).length + 1;
let tableKey = ref(0);

watch(filterOptions.value, nv => {
    colspan = Object.values(filterOptions.value).filter(value => value).length + 1;
    tableKey.value++;
}, { immediate: true })

// modal related
let promiseRunning = ref(false);
let openInviteUser = ref(false);
let openCreateUser = ref(false);
let openBlockUser = ref(false);
let openUnblockUser = ref(false);
let openDeleteUser = ref(false);
let openUpgrade = ref(false);
let openGrantAccess = ref(false);
let selectedUser: { [key:string]: any } = {};
let gender_public = ref(false);
let address_public = ref(false);
let birthdate_public = ref(false);
let createParams = {
    email: '',
    name: '',
    password: '',
    phone_number: '',
    gender: '',
    address: '',
    birthdate: '',
    picture: '',
    profile: '',
    website: '',
    nickname: '',
    misc: ''
}
let inviteParams = {
    email: '',
    name: ''
}
let accessParams = {
    user_id: '',
    access_group: ''
}
let redirect = '';
let error = ref('');

// list renderer
let listDisplay = ref(null);

// call getPage when currentPage changes
watch(currentPage, (n, o) => {
    if (n !== o && n > 0 && (n <= maxPage.value || n > maxPage.value && !endOfList.value)) {
        getPage();
    }
    else {
        currentPage.value = o;
    }
});

watch(fetching, n => {
    if (n && showCalendar.value) {
        showCalendar.value = false
    }
})

watch(searchFor, (n, o) => {
    if (n !== o) {
        searchValue.value = '';
    }
})

// computed fetch params
let callParams = computed(() => {
    let dates = searchValue.value.split('~').map(d => d.trim());
    let result = {};
    
    switch (searchFor.value) {
        case 'timestamp':
            let startDate = dates?.[0] ? new Date(dates?.[0]).getTime() : 0;
            let endDate = dates?.[1] ? new Date(dates?.[1]).getTime() : '';
            
            if (startDate && endDate) {
                result = {
                    service: currentService.id,
                    searchFor: searchFor.value,
                    value: startDate,
                    range: endDate
                }
            } else if (startDate || endDate) {
                result = {
                    service: currentService.id,
                    searchFor: searchFor.value,
                    value: startDate ? startDate : endDate,
                    condition: startDate ? '>=' : '<='
                }
            } else {
                result = {
                    service: currentService.id,
                    searchFor: searchFor.value,
                    value: new Date().getTime(),
                    condition: '<='
                }
            }

            break;

        case 'user_id':
        case 'email':
        case 'phone_number':
            result = {
                service: currentService.id,
                searchFor: searchFor.value,
                value: searchValue.value,
                condition: '='
            }

            break;
            
        case 'birthdate':
            let start = dates?.[0];
            let end = dates?.[1];

            if (start && end) {
                result = {
                    service: currentService.id,
                    searchFor: searchFor.value,
                    value: start,
                    range: end
                }
            } else if (start || end) {
                result = {
                    service: currentService.id,
                    searchFor: searchFor.value,
                    value: start ? start : end,
                    condition: start ? '>=' : '<='
                }
            }

            break;

        default:
            result = {
                service: currentService.id,
                searchFor: searchFor.value,
                value: searchValue.value,
                condition: '>='
            }
    }

    return result;
});

let getPage = async (refresh?: boolean) => {
    // if (!pager) {
    //     return;
    // }
    
    if (refresh) {
        endOfList.value = false;
    }

    if(!serviceUsers[currentService.id] || searchValue.value) {
        serviceUsers[currentService.id] = await Pager.init({
            id: 'user_id',
            resultsPerPage: 10,
            sortBy: !searchValue.value ? 'timestamp' : callParams.value.searchFor,
            order: !searchValue.value ? 'desc' : 'asc',
        });
    }

    pager = serviceUsers[currentService.id];

    if (!refresh && maxPage.value >= currentPage.value || endOfList.value) {
        listDisplay.value = pager.getPage(currentPage.value).list;
        return;
    }

    else if (!endOfList.value || refresh) {
        fetching.value = true;

        if (!searchValue.value) {
            callParams.value.searchFor = 'timestamp';
            callParams.value.value = new Date().getTime();
            callParams.value.condition = '<=';
        }

        // devLog({callParams.value})

        let fetchedData = await skapi.getUsers(callParams.value, { fetchMore: !refresh, ascending: !searchValue.value ? false : true }).catch((err) => {
            fetching.value = false;
            alert(err);
        });

        // devLog({fetchedData})

        // save endOfList status
        serviceUsers[currentService.id].endOfList = fetchedData.endOfList;
        endOfList.value = serviceUsers[currentService.id].endOfList;

        // insert data in pager
        if (fetchedData.list.length > 0) {
            await pager.insertItems(fetchedData.list);
        }

        // get page from pager
        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;

        if(disp.maxPage > 0 && disp.maxPage < currentPage.value && !disp.list.length) {
            currentPage.value--;
        }

        fetching.value = false;
    }
}

let init = async () => {
    currentPage.value = 1;

    // setup pagers
    if(serviceUsers[currentService.id] && Object.keys(serviceUsers[currentService.id]).length) {
        pager = serviceUsers[currentService.id];
        endOfList.value = serviceUsers[currentService.id].endOfList;

        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;

    } else {
        serviceUsers[currentService.id] = pager;
        getPage(true);
    }
}

init();

let moveFocus = (e:any, next:string) => {
    if (e.key == 'Enter') {
        e.preventDefault();

        if (e.target.id == 'email' || e.target.id == 'inviteUserEmail') {
            if (!e.target.value) {
                alert('email is required');
                return false;
            } else {
                let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
                if (!email_regex.test(e.target.value)) {
                    alert('Please enter it in e-mail format');
                    return false;
                }
            }
        } else if (e.target.id == 'password') {
            if (!e.target.value) {
                alert('password is required');
                return false;
            } else {
                if (e.target.value.length < 6 || e.target.value.length > 60) {
                    alert('Min 6 characters and Max 60 characters');
                    return false;
                }
            }
        } else if (e.target.id == 'inviteUserName') {
            if (!e.target.value) {
                alert('name is required');
                return false;
            }
        }
        
        let scrollTarget = e.target.parentElement.parentElement.parentElement;

        if (scrollTarget.getBoundingClientRect().height < scrollTarget.scrollHeight) {
            scrollTarget.scrollTop += 70;
        }

        document.getElementById(next).focus();
    }
}

let createUser = () => {
    promiseRunning.value = true;
    error.value = '';

    if (gender_public.value || address_public.value || birthdate_public.value){
        createParams = Object.assign({gender_public: gender_public.value, address_public: address_public.value, birthdate_public: birthdate_public.value}, createParams)
    }

    currentService.createAccount(createParams, {
        // email_subscription: redirect || false,
    }).then(async(res) => {
        res.email = res.email_admin;
        await pager.insertItems([res]);

        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;

        document.getElementById("createForm").reset(); 
        for(let i in createParams) {
            createParams[i] = '';
        }
        redirect = '';
        gender_public.value = false;
        address_public.value = false;
        birthdate_public.value = false;
        openCreateUser.value = false;
        promiseRunning.value = false;
        getPage();
    }).catch((err) => {
        promiseRunning.value = false;
        // error.value = err.message;
        alert(err.message);
    });
}

let inviteUser = () => {
    promiseRunning.value = true;
    error.value = '';

    let options = {};
    if (redirect) {
        options.confirmation_url = redirect;
    }

    currentService.inviteUser(inviteParams, options).then((res) => {
        promiseRunning.value = false;
        openInviteUser.value = false;

        document.getElementById("inviteForm").reset();
        for(let i in inviteParams) {
            inviteParams[i] = '';
        }
        redirect = '';
    }).catch((err) => {
        promiseRunning.value = false;
        // error.value = err.message;
        alert(err.message);
    });
}

let changeUserState = (state: string) => {
    promiseRunning.value = true;

    if(state == 'block') {
        currentService.blockAccount(selectedUser.user_id).then(async(r) => {
            selectedUser.approved = 'by_admin:suspended:' + (new Date()).getTime();
            let toEdit = {}
            for(let k in selectedUser) {
                toEdit[k] = selectedUser[k];
            }
            await pager.editItem(toEdit).then((r) => {
                selectedUser = {};
                promiseRunning.value = false;
                openBlockUser.value = false;
            });
        }).catch(e => alert(e.message));
    } else if(state == 'unblock') {
        currentService.unblockAccount(selectedUser.user_id).then(async(r) => {
            selectedUser.approved = 'by_admin:' + (new Date()).getTime();
            let toEdit = {}
            for(let k in selectedUser) {
                toEdit[k] = selectedUser[k];
            }
            await pager.editItem(toEdit).then((r) => {
                selectedUser = {};
                promiseRunning.value = false;
                openUnblockUser.value = false;
            });
        }).catch(e => alert(e.message));
    }
}

let deleteUser = () => {
    promiseRunning.value = true;

    currentService.deleteAccount(selectedUser.user_id).then(async() => {
        for(let i=0; i<listDisplay.value.length; i++) {
            if (listDisplay.value[i].user_id == selectedUser.user_id) {
                listDisplay.value.splice(i, 1);
            }
        }

        await pager.deleteItem(selectedUser.user_id);

        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;

        if(disp.maxPage > 0 && disp.maxPage < currentPage.value && !disp.list.length) {
            currentPage.value--;
        }

        selectedUser = {};
        promiseRunning.value = false;
        openDeleteUser.value = false;
    }).catch(e => alert(e.message));
}

let closeModal = () => {
    if(openInviteUser.value) {
        document.getElementById("inviteForm").reset();
        openInviteUser.value = false;
    } else if(openCreateUser.value) {
        document.getElementById("createForm").reset();
        for(let i in createParams) {
            createParams[i] = '';
        }
        gender_public.value = false;
        address_public.value = false;
        birthdate_public.value = false;
        openCreateUser.value = false;
    }
}

let grantAccess = (e) => {
    promiseRunning.value = true;

    let inputAccess: HTMLInputElement = document.querySelector('.change-access');
    let resultAccess = Number(inputAccess.value);

    if (resultAccess < 1 || resultAccess > 99) {
        promiseRunning.value = false;
        inputAccess.value = '';
    }

    currentService.grantAccess({user_id: selectedUser.user_id, access_group: resultAccess}).then(res => {
        selectedUser.access_group = resultAccess;
        inputAccess.value = '';

        promiseRunning.value = false;
        openGrantAccess.value = false;
        alert(res);
    }).catch(e => {
        promiseRunning.value = false;
        inputAccess.value = '';
        alert(e.message);
    });
}

let closeGrantAccess = () => {
    let inputAccess: HTMLInputElement = document.querySelector('.change-access');
    
    openGrantAccess.value =false;
    selectedUser = {};

    if(inputAccess) {
        inputAccess.value = '';
    }
}

</script>
<style scoped lang="less">
body {
    font-family: "Twemoji Country Flags", "Radio Canada", sans-serif;
}
// .updown {
//     background-color: #fff;
//     background-color: var(--main-color);
//     border-radius: 50%;
//     margin-left: 8px;
//     cursor: pointer;
//     box-shadow: rgba(41, 63, 230, 0.24) 0px 1px 8px;
// }
.moreVert {
    .inner {
        padding-top: .25rem;
        &>*{
            padding: .25rem .5rem;
        }
        padding-bottom: .25rem;
    }
}
// svg {
//     fill: black;
//     width: 22px;
//     height: 22px;
// }
// svg:hover {
//       fill: var(--main-color);
// }
#searchForm {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    width: 700px;
    max-width: 100%;

    // .customSelect {
    //     flex-grow: 1;
    // }
    .search {
        position:relative;
        display: flex;
        flex-grow: 50;
        gap: 8px;
        flex-shrink: 0;
        min-width: 290px;
    }
    .clickInput {
        position: relative;
    }
    .big {
        padding-right: 40px;
    }
    svg,
    .icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
        user-select: none;
        fill: black;
    }
    svg:hover {
      fill: var(--main-color);
    }
    .final {
        flex-grow: 1;
        width: 140px;
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
#createForm {
    .label {
        position: relative;

        ._checkbox {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
.tableMenu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // flex-direction: row-reverse;

    &>* {
        margin: 8px 0;
    }
}
.userPart {
    position: relative;
    overflow: hidden;
}
#loading {
    position: absolute;
    top: 60px;
    left: 20px;
    height: 60px;
    z-index: 2;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 0.8rem;
}
.optionCol {
    &>*:not(:last-child) {
        margin-right: 8px;
    }
}
.iconClick.arrow {
    padding:0;
    font-size: 0.8rem;
}
.iconClick.deact {
    color: rgba(0,0,0,0.5);

    &::before {
        box-shadow: unset !important;
    }

    svg {
        fill: rgba(0,0,0,0.5)
    }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>