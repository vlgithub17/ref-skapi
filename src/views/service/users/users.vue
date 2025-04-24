<template lang="pug">
section.infoBox
  .titleHead
    h2 Users

    span.moreInfo(
      @click="showGuide = !showGuide",
      @mouseover="hovering = true",
      @mouseleave="hovering = false"
    )
      span More Info&nbsp;
      template(v-if="showGuide")
        //- .material-symbols-outlined.notranslate.fill expand_circle_up 
        //- .material-symbols-outlined.notranslate.noFill expand_circle_up
        svg(v-if="hovering", style="width: 25px; height: 25px; fill: black")
          use(
            xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up-fill"
          )
        svg(v-else, style="width: 25px; height: 25px; fill: black")
          use(
            xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up"
          )
      template(v-else)
        //- .material-symbols-outlined.notranslate.fill expand_circle_down
        //- .material-symbols-outlined.notranslate.noFill expand_circle_down
        svg(v-if="hovering", style="width: 25px; height: 25px; fill: black")
          use(
            xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down-fill"
          )
        svg(v-else, style="width: 25px; height: 25px; fill: black")
          use(
            xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down"
          )

  template(v-if="showGuide")
    Guide

  hr

  .error(v-if="!user?.email_verified")
    //- .material-symbols-outlined.notranslate.fill warning
    svg
      use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
    router-link(to="/account-setting") Please verify your email address to modify settings.

  .error(v-else-if="currentService.service.active == 0")
    //- .material-symbols-outlined.notranslate.fill warning
    svg
      use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
    span This service is currently disabled.

  .error(v-else-if="currentService.service.active < 0")
    //- .material-symbols-outlined.notranslate.fill warning
    svg
      use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
    span This service is currently suspended.

form#searchForm(@submit.prevent="getPage(true)", style="padding: 1.2em")
  Select(
    v-model="searchFor",
    :selectOptions="searchOptions",
    :class="{ nonClickable: fetching }",
    style="min-width: 162px; flex-grow: 1"
  )
  .search(:class="{ nonClickable: fetching }")
    .clickInput(
      v-if="searchFor === 'timestamp' || searchFor === 'birthdate'",
      @click="showCalendar = !showCalendar"
    )
      input#searchInput.big(
        type="text",
        placeholder="YYYY-MM-DD ~ YYYY-MM-DD",
        v-model="searchValue",
        name="date",
        readonly
      )
      //- .material-symbols-outlined.notranslate.fill.icon(v-if="(searchFor === 'timestamp' || searchFor === 'birthdate')") calendar_today
      svg.svgIcon.reactive(
        v-if="searchFor === 'timestamp' || searchFor === 'birthdate'"
      )
        use(
          xlink:href="@/assets/img/material-icon.svg#icon-calendar-today-fill"
        ) 
      Calendar(
        v-model="searchValue",
        :showCalendar="showCalendar",
        @close="showCalendar = false",
        alwaysEmit="true"
      )
    input#searchInput.big(
      v-else-if="searchFor === 'phone_number'",
      type="text",
      placeholder="+821234567890",
      v-model="searchValue",
      :disabled="fetching"
    )
    input#searchInput.big(
      v-else-if="searchFor === 'address'",
      type="text",
      placeholder="User's address",
      v-model="searchValue",
      name="address"
    )
    input#searchInput.big(
      v-else-if="searchFor === 'gender'",
      type="text",
      placeholder="Gender",
      v-model="searchValue",
      name="gender"
    )
    input#searchInput.big(
      v-else-if="searchFor === 'name'",
      type="text",
      placeholder="User's name",
      v-model="searchValue",
      name="name"
    )
    .clickInput(
      v-else-if="searchFor === 'locale'",
      @click="showLocale = !showLocale"
    )
      input#searchInput.big(
        type="text",
        placeholder="2 digit country code e.g. KR",
        v-model="searchValue",
        name="locale",
        readonly
      )
      //- .material-symbols-outlined.notranslate.fill.icon(v-if="searchFor === 'locale'") arrow_drop_down
      svg.svgIcon.reactive(v-if="searchFor === 'locale'")
        use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down") 
      Locale(
        v-model="searchValue",
        :showLocale="showLocale",
        @close="showLocale = false"
      )
    input#searchInput.big(
      v-else-if="searchFor === 'user_id'",
      type="search",
      placeholder="xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      v-model="searchValue",
      name="user_id",
      @input="(e) => { e.target.setCustomValidity(''); }",
      pattern="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
    )
    input#searchInput.big(
      v-else-if="searchFor === 'email'",
      placeholder="user@email.com",
      v-model="searchValue",
      name="email",
      type="email",
      minlength="5"
    )
  button.final(type="submit", style="flex-shrink: 0") Search

br

.tableMenu
  .iconClick.square(@click.stop="(e) => { showDropDown(e); }")
    svg.svgIcon
      use(xlink:href="@/assets/img/material-icon.svg#icon-checklist-rtl") 
    span &nbsp;&nbsp;Show Columns
    .moreVert(
      @click.stop,
      style="--moreVert-left: 0; display: none; font-weight: normal; color: black"
    )
      .inner
        template(v-for="c in columnList")
          Checkbox(v-model="c.value", style="display: flex") {{ c.name }}

  .iconClick.square(
    @click="openCreateUser = true",
    :class="{ nonClickable: fetching || !user?.email_verified || currentService.service.active <= 0 }"
  )
    svg.svgIcon
      use(xlink:href="@/assets/img/material-icon.svg#icon-person-add-fill") 
    span &nbsp;&nbsp;Create User

  .iconClick.square(
    @click="currentService.plan == 'Trial' ? (openUpgrade = true) : (openInviteUser = true)",
    :class="{ nonClickable: fetching || !user?.email_verified || currentService.service.active <= 0, deact: currentService.plan == 'Trial' }"
  )
    svg.svgIcon
      use(
        xlink:href="@/assets/img/material-icon.svg#icon-mark-email-unread-fill"
      )

    span &nbsp;&nbsp;Invite User

  .iconClick.square(:class="{'nonClickable': !Object.keys(checked).length || fetching}" @click.stop="(e) => { showDropDown(e); }")
    svg.svgIcon
      use(xlink:href="@/assets/img/material-icon.svg#icon-checklist-rtl") 
    span &nbsp;&nbsp;Actions
    .moreVert(
      @click.stop,
      style="--moreVert-right: 0; display: none; font-weight: normal; color: black"
    )
      .inner
        .iconClick.square(@click="openGrantAccess=true" style='width: 100%;padding: .5rem;' :class="{'nonClickable': !Object.keys(checked).length || fetching}" )
          span(style='white-space: nowrap')
            svg.svgIcon
              use(xlink:href="@/assets/img/material-icon.svg#icon-supervisor-account-fill")
            span &nbsp;&nbsp;Grant Access
          
        .iconClick.square(@click="openUnblockUser=true" style='width: 100%;padding: .5rem;' :class="{'nonClickable': !Object.keys(checked).length || fetching}" )
          span(style='white-space: nowrap')
            svg.svgIcon
              use(xlink:href="@/assets/img/material-icon.svg#icon-account-circle-fill")
            span &nbsp;&nbsp;Unblock User
        
        .iconClick.square(@click="openBlockUser=true" style='width: 100%;padding: .5rem;' :class="{'nonClickable': !Object.keys(checked).length || fetching}" )
          span(style='white-space: nowrap')
            svg.svgIcon
              use(xlink:href="@/assets/img/material-icon.svg#icon-no-accounts-fill")
            span &nbsp;&nbsp;Block User

        .iconClick.square(@click="openDeleteUser=true" style='width: 100%;padding: .5rem;' :class="{'nonClickable': !Object.keys(checked).length || fetching}")
          span(style='white-space: nowrap')
              svg.svgIcon
                  use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")

              span &nbsp;&nbsp;Delete User

  //- .iconClick.square(
  //-   @click="getPage(true)",
  //-   :class="{ nonClickable: fetching || !user?.email_verified || currentService.service.active <= 0 }"
  //- )
  //-   svg.svgIcon(:class="{ loading: fetching }")
  //-     use(xlink:href="@/assets/img/material-icon.svg#icon-refresh")
  //-   span &nbsp;&nbsp;Refresh

.userPart
  template(v-if="fetching")
    #loading.
      Loading ... &nbsp;
      #[.loader(style="--loader-color: black; --loader-size: 12px")]

  Table(
    :key="tableKey"
    :class="{ disabled: !user?.email_verified || currentService.service.active <= 0 }"
    resizable
    )
    template(v-slot:head)
      tr
        th.fixed(style="width: 60px")
          Checkbox(
            @click.stop
            :modelValue="!!Object.keys(checked).length"
            @update:modelValue="(value) => { if (value) listDisplay.forEach((d) => (checked[d.user_id] = d)); else checked = {}; }"
            :class="{ nonClickable: !listDisplay || !listDisplay?.length }"
            style="display: inline-block"
          )
          .resizer.fixed

        template(v-for="c in columnList")
          th.overflow(v-if="c.value", style="width: 200px")
            | {{ c.name }}
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
        tr.hoverRow(v-for="(user, index) in listDisplay" @click="showDetail=true; selectedUser=user")
          td
            Checkbox(
              @click.stop
              :modelValue="!!checked?.[user?.user_id]"
              @update:modelValue="(value) => { if (value) checked[user?.user_id] = value; else delete checked[user?.user_id]; }"
            )

          template(v-for="c in columnList")
            template(v-if="c.value")
              // customize the column
              td.overflow(v-if="c.key === 'timestamp'") {{ new Date(user[c.key]).toLocaleString() }}
              td.overflow(v-else-if="c.key === 'approved'") {{ user[c.key].split(':')[1].charAt(0).toUpperCase() + user[c.key].split(':')[1].slice(1) }}
              td.overflow(v-else-if="c.key === 'locale'")
                img(
                  :src="'https://flagcdn.com/' + user.locale.toLowerCase() + '.svg'",
                  style="width: 16px; object-fit: contain"
                )
              td.overflow(v-else-if="c.key === 'access_group'" :style="{color: user[c.key] < 0 ? 'var(--caution-color)' : null }") {{ Math.abs(user[c.key]) }} {{user[c.key] < 0 ? "(Disabled)" : "" }}
              td.overflow(v-else-if="c.value") {{ user[c.key] || "-" }}

        tr(v-for="i in 10 - listDisplay.length")
          td(:colspan="colspan")

  form.detailRecord(:class="{show: showDetail}" @submit.prevent='upload')
    .header(style='padding-right:10px;')
        svg.svgIcon.black.clickable(@click="showDetail=false; selectedUser=null;" :class="{nonClickable: fetching}")
          use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-back")
        .name {{ selectedUser?.name || selectedUser?.email || selectedUser?.user_id }}
        template(v-if="uploading")
          .loader(style="--loader-color:blue; --loader-size:12px; margin: 12px;")
        template(v-else)
          button.noLine.iconClick.square(type="submit" style='padding:0 14px') SAVE

    UserDetails(v-if='showDetail' :data='selectedUser')

.tableMenu(v-if="!showDetail" style="display: block; text-align: center")
  .iconClick.square.arrow(
    @click="currentPage--",
    :class="{ nonClickable: fetching || currentPage === 1 }"
  )
    //- .material-symbols-outlined.notranslate.bold chevron_left
    svg.svgIcon(style="width: 26px; height: 26px")
      use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-left")
    span Previous&nbsp;&nbsp;
  | &nbsp;&nbsp;
  .iconClick.square.arrow(
    @click="currentPage++",
    :class="{ nonClickable: fetching || (endOfList && currentPage >= maxPage) }"
  )
    span &nbsp;&nbsp;Next
    //- .material-symbols-outlined.notranslate.bold chevron_right
    svg.svgIcon(style="width: 26px; height: 26px")
      use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-right")

// create user
Modal(
  :open="openCreateUser",
  @close="openCreateUser = false",
  style="width: 478px"
)
  h4(style="margin: 0.5em 0 0") Create User

  hr

  form#createForm(@submit.prevent="createUser")
    input(hidden, name="service", :value="currentService.id")

    label User's Email
      |
      em(style="color: red; font-size: 0.6rem") * Required
      input#email.big(
        type="email",
        @input="(e) => (createParams.email = e.target.value)",
        @keydown="(e) => moveFocus(e, 'password')",
        :disabled="promiseRunning",
        title="Please enter a valid email address.",
        placeholder="anonymous@anonymous.com",
        required
      )
    br

    label Password
      |
      em(style="color: red; font-size: 0.6rem") * Required
      input#password.big(
        @input="(e) => (createParams.password = e.target.value)",
        @keydown="(e) => moveFocus(e, 'name')",
        :disabled="promiseRunning",
        placeholder="User's Password",
        type="Password",
        minlength="6",
        required
      )

    br

    label Name
      |
      input#name.big(
        @input="(e) => (createParams.name = e.target.value)",
        @keydown="(e) => moveFocus(e, 'phone')",
        :disabled="promiseRunning",
        placeholder="User's Name"
      )

    br

    label Phone Number
      |
      input#phone.big(
        @input="(e) => (createParams.phone_number = e.target.value)",
        @keydown="(e) => moveFocus(e, 'gender')",
        :disabled="promiseRunning",
        placeholder="User's Phone Number",
        type="text"
      )

    br

    .label
      label Gender
        |
        input#gender.big(
          @input="(e) => (createParams.gender = e.target.value)",
          @keydown="(e) => moveFocus(e, 'address')",
          :disabled="promiseRunning",
          placeholder="User's Gender",
          type="text"
        )
      Checkbox(v-model="gender_public") public

    br

    .label
      label Address
        |
        input#address.big(
          @input="(e) => (createParams.address = e.target.value)",
          @keydown="(e) => moveFocus(e, 'birthdate')",
          :disabled="promiseRunning",
          placeholder="User's Address",
          type="text"
        ) 
      Checkbox(v-model="address_public") public

    br

    .label
      label Birthdate
        |
        input#birthdate.big(
          @input="(e) => (createParams.birthdate = e.target.value)",
          @keydown="(e) => moveFocus(e, 'picture')",
          :disabled="promiseRunning",
          placeholder="User's Birthdate (YYYY-MM-DD)",
          type="text"
        )
      Checkbox(v-model="birthdate_public") public

    br

    label Picture
      |
      input#picture.big(
        @input="(e) => (createParams.picture = e.target.value)",
        @keydown="(e) => moveFocus(e, 'profile')",
        :disabled="promiseRunning",
        placeholder="URL of the profile picture.",
        type="url"
      )

    br

    label Profile
      |
      input#profile.big(
        @input="(e) => (createParams.profile = e.target.value)",
        @keydown="(e) => moveFocus(e, 'website')",
        :disabled="promiseRunning",
        placeholder="URL of the profile page",
        type="url"
      )

    br

    label Website
      |
      input#website.big(
        @input="(e) => (createParams.website = e.target.value)",
        @keydown="(e) => moveFocus(e, 'nickname')",
        :disabled="promiseRunning",
        placeholder="URL of the website",
        type="url"
      )

    br

    label Nickname
      |
      input#nickname.big(
        @input="(e) => (createParams.nickname = e.target.value)",
        @keydown="(e) => moveFocus(e, 'misc')",
        :disabled="promiseRunning",
        placeholder="Nickname of the user",
        type="text"
      )

    br

    label misc
      |
      input#misc.big(
        @input="(e) => (createParams.misc = e.target.value)",
        :disabled="promiseRunning",
        placeholder="Additional string value that can be used freely",
        type="text"
      )

    br

    .error(v-if="error")
      svg
        use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
      span {{ error }}

    br

    div(
      style="display: flex; align-items: center; justify-content: space-between"
    )
      div(
        v-if="promiseRunning",
        style="width: 100%; height: 44px; text-align: center"
      )
        .loader(style="--loader-color: blue; --loader-size: 12px")
      template(v-else)
        button.noLine(type="button", @click="closeModal") Cancel
        button.final(type="submit") Create User

// invite user
Modal(:open="openInviteUser", @close="openInviteUser = false")
  h4(style="margin: 0.5em 0 0") Invite User

  hr

  div(style="font-size: 0.8rem")
    p.
      Invitation Email includes a temporary password and the acception link. 
      #[br]
      User must accept the invitation within 7 days.
      #[br]
      For more information, refer:&nbsp;
      #[a(href="https://docs.skapi.com/email/email-templates.html", target="_blank", style="white-space: nowrap") E-Mail Templates]

  br

  form#inviteForm(@submit.prevent="inviteUser")
    input(hidden, name="service", :value="currentService.id")

    label User's Email
      |
      em(style="color: red; font-size: 0.6rem") * Required
      input#inviteUserEmail.big(
        type="email"
        @input="(e) => (inviteParams.email = e.target.value)"
        @keydown="(e) => moveFocus(e, 'inviteUserName')"
        title="Please enter a valid email address."
        placeholder="anonymous@anonymous.com"
        required
      )
    br

    label Name
      |
      em(style="color: red; font-size: 0.6rem") * Required
      input#inviteUserName.big(
        @input="(e) => (inviteParams.name = e.target.value)"
        @keydown="(e) => moveFocus(e, 'inviteUserURL')"
        placeholder="User's Name"
        required
      )

    br

    label Redirect URL
      |
      input#inviteUserURL.big(
        @input="(e) => (redirect = e.target.value)"
        placeholder="URL to redirect when accepted. (optional)"
        type="url"
      )

    br

    .error(v-if="error")
      svg
        use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
      span {{ error }}

    br

    div(
      style="display: flex; align-items: center; justify-content: space-between"
    )
      div(
        v-if="promiseRunning",
        style="width: 100%; height: 44px; text-align: center"
      )
        .loader(style="--loader-color: blue; --loader-size: 12px")
      template(v-else)
        button.noLine(type="button", @click="closeModal") Cancel
        button.final(type="submit") Invite

// block user
Modal(:open="openBlockUser", @close="openBlockUser = false")
  h4(style="margin: 0.5em 0 0") Block User

  hr

  div(style="font-size: 0.8rem")
    p.
      This action will block {{Object.keys(checked).length}} user(s) from your service.
      #[br]
      The user will not be able to access your service anymore.

  br

  div(
    style="display: flex; align-items: center; justify-content: space-between"
  )
    div(
      v-if="promiseRunning",
      style="width: 100%; height: 44px; text-align: center"
    )
      .loader(style="--loader-color: blue; --loader-size: 12px")
    template(v-else)
      button.noLine(
        type="button"
        @click="openBlockUser = false;"
      ) Cancel
      button.final(type="button", @click="changeUserApprovalState('block')") Block

// unblock user
Modal(:open="openUnblockUser", @close="openUnblockUser = false")
  h4(style="margin: 0.5em 0 0") Unblock User

  hr

  div(style="font-size: 0.8rem")
    p.
      This action will unblock {{Object.keys(checked).length}} user(s) from your service. 
      #[br]
      The user will have access to your service.

  br

  div(
    style="display: flex; align-items: center; justify-content: space-between"
  )
    div(
      v-if="promiseRunning"
      style="width: 100%; height: 44px; text-align: center"
    )
      .loader(style="--loader-color: blue; --loader-size: 12px")
    template(v-else)
      button.noLine(
        type="button"
        @click="openUnblockUser = false;"
      ) Cancel
      button.final(type="button", @click="changeUserApprovalState('unblock')") Unblock

// delete user
Modal(:open="openDeleteUser", @close="openDeleteUser = false")
  h4(style="margin: 0.5em 0 0; color: var(--caution-color)") Delete User

  hr

  div(style="font-size: 0.8rem")
    p.
      This action will delete {{Object.keys(checked).length}} user(s) from your service.
      #[br]
      All the user's data will be deleted.
      #[br]
      This action cannot be undone.

  br

  div(
    style="display: flex; align-items: center; justify-content: space-between"
  )
    div(
      v-if="promiseRunning",
      style="width: 100%; height: 44px; text-align: center"
    )
      .loader(style="--loader-color: blue; --loader-size: 12px")
    template(v-else)
      button.noLine.warning(
        type="button"
        @click="openDeleteUser = false;"
      ) Cancel
      button.final.warning(type="button", @click="deleteUser") Delete

// upgrade service
Modal(:open="openUpgrade", @close="openUpgrade = false")
  h4(style="margin: 0.5em 0 0") Upgrade

  hr

  div(style="font-size: 0.8rem")
    p.
      You can access more features like sending newsletters,
      #[br]
      inviting users and file hosting by upgrading your service.

    p Would you like you check out our service plans?

  br

  div(
    style="display: flex; align-items: center; justify-content: space-between"
  )
    button.noLine(type="button", @click="openUpgrade = false") No
    router-link(:to="`/subscription/${currentService.id}`")
      button.final(type="button") Yes

// grant access
Modal(:open="openGrantAccess", @close="openGrantAccess = false")
  h4(style="margin: 0.5em 0 0") Grant Access

  hr

  div(style="font-size: 0.8rem")
    p.
      This will grant {{Object.keys(checked).length}} user(s) to a new access group.
      #[br]
      Access group can be granted from 1 to 99.

    input.change-access(
      type="number"
      placeholder="1~99"
      min=1
      max=99
      @keyup.stop="(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }"
      style="background-color: white; outline: 1px solid rgba(0, 0, 0, 0.5); border-radius: 6px; width: 100%; padding: 8px"
    )

  br

  div(
    style="display: flex; align-items: center; justify-content: space-between"
  )
    div(
      v-if="promiseRunning"
      style="width: 100%; height: 44px; text-align: center"
    )
      .loader(style="--loader-color: blue; --loader-size: 12px")
    template(v-else)
      button.noLine(type="button", @click="closeGrantAccess") Cancel
      button.final(type="button", @click="grantAccess") Change

// grant access > success
Modal(:open="successGrantAccess", @close="successGrantAccess = false")
  h4(style="margin: 0.5em 0 0") Grant Access

  hr

  div(style="font-size: 0.8rem")
    p.
      New access group has been granted to {{Object.keys(checked).length}} user(s).

  br

  div(style="display: flex; align-items: center; justify-content: flex-end")
    button.final(type="button", @click="()=>{checked.value = {};successGrantAccess = false;}") close
</template>
<script setup lang="ts">
  import Table from "@/components/table.vue";
  import Guide from "./guide.vue";
  import Select from "@/components/select.vue";
  import Checkbox from "@/components/checkbox.vue";
  import Modal from "@/components/modal.vue";
  import Calendar from "@/components/calendar.vue";
  import Locale from "@/components/locale.vue";
  import Pager from "@/code/pager";

  import { nextTick, reactive, ref, computed, watch, type Ref } from "vue";
  import { skapi } from "@/main";
  import { user } from "@/code/user";
  import { showDropDown } from "@/assets/js/event.js";
  import { currentService, serviceUsers } from "@/views/service/main";
  import { Countries } from "@/code/countries";
  import { devLog } from "@/code/logger";
  import UserDetails from './showDetail.vue'

  let pager: Pager = null;
  let selectedUser = ref(null);

  let searchFor: Ref<
    "timestamp"
    | "user_id"
    | "email"
    | "phone_number"
    | "address"
    | "gender"
    | "name"
    | "locale"
    | "birthdate"
  > = ref("user_id");

  let searchValue: Ref<string | number> = ref("");

  // ui/ux related
  let fetching = ref(false);
  let maxPage = ref(0);
  let currentPage: Ref<number> = ref(1);
  let endOfList = ref(false);
  let showCalendar = ref(false);
  let showLocale = ref(false);
  let showGuide = ref(false);
  let hovering = ref(false);
  let showDetail = ref(false);

  let columnList = reactive([
    {
      name: "User ID",
      key: "user_id",
      value: true,
    },
    {
      name: "Email",
      key: "email",
      value: true,
    },
    {
      name: "Name",
      key: "name",
      value: true,
    },
    {
      name: "Access Group",
      key: "access_group",
      value: true,
    },
    {
      name: "Approval",
      key: "approved",
      value: true,
    },
    {
      name: "Date Created",
      key: "timestamp",
      value: false,
    },
    {
      name: "Phone Number",
      key: "phone_number",
      value: false,
    },
    {
      name: "Address",
      key: "address",
      value: false,
    },
    {
      name: "Locale",
      key: "locale",
      value: false,
    },
    {
      name: "Gender",
      key: "gender",
      value: false,
    },
    {
      name: "Birth Date",
      key: "birthdate",
      value: false,
    },
    {
      name: "Picture",
      key: "picture",
      value: false,
    },
    {
      name: "Profile",
      key: "profile",
      value: false,
    },
    {
      name: "Website",
      key: "website",
      value: false,
    },
    {
      name: "Nickname",
      key: "nickname",
      value: false,
    },
    {
      name: "Misc",
      key: "misc",
      value: true,
    },
  ]);

  let searchOptions = [
    {
      option: "User ID",
      value: "user_id",
    },
    {
      option: "Email",
      value: "email",
    },
    {
      option: "Name",
      value: "name",
    },
    {
      option: "Phone Number",
      value: "phone_number",
    },
    {
      option: "Address",
      value: "address",
    },
    {
      option: "Gender",
      value: "gender",
    },
    {
      option: "Birth Date",
      value: "birthdate",
    },
    {
      option: "Locale",
      value: "locale",
    },
    {
      option: "Date Created",
      value: "timestamp",
    },
  ];
  let uploading = ref(false);

  let upload = async (e: SubmitEvent) => {
    uploading.value = true;

    try {
      let att = await currentService.updateUserAttribute(e);
      console.log(att);

      for (let k in att.attributes) {
        selectedUser.value[k] = att.attributes[k];
      }

      let sel:any = {};
      for(let k in selectedUser.value) {
          sel[k] = selectedUser.value[k];
      }

      await pager.editItem(sel);

      getPage();

      selectedUser.value = null;
      showDetail.value = false;
    } catch (err: any) {
      alert(err.message);
      throw err;
    } finally {
      uploading.value = false;
    }
  };

  let checked: Ref<{ [key: string]: any }> = ref({});
  function checkall() {
    if (Object.keys(checked.value).length) {
      checked.value = {};
    } else {
      listDisplay.value.forEach((user) => {
        checked.value[user.record_id] = user;
      });
    }
  }
  let colspan = 0;
  let tableKey = ref(0);

  watch(
    columnList,
    (nv) => {
      colspan = 1;
      nv.forEach((c) => {
        if (c.value) {
          colspan++;
        }
      });

      tableKey.value++;
    },
    { immediate: true }
  );

  watch(showDetail, (nv) => {
    if (nv) {
      nextTick(() => {
        let scrollTarget = document.querySelector(".detailRecord .content");
        let detailRecord = document.querySelector(".detailRecord");
        let targetTop = window.scrollY + detailRecord.getBoundingClientRect().top;
        scrollTarget.scrollTop = 0;
        window.scrollTo(0, targetTop);
      });
    }
  });

  // modal related
  let promiseRunning = ref(false);
  let openInviteUser = ref(false);
  let openCreateUser = ref(false);
  let openBlockUser = ref(false);
  let openUnblockUser = ref(false);
  let openDeleteUser = ref(false);
  let openUpgrade = ref(false);
  let openGrantAccess = ref(false);
  let successGrantAccess = ref(false);
  let gender_public = ref(false);
  let address_public = ref(false);
  let birthdate_public = ref(false);
  let createParams = {
    email: "",
    name: "",
    password: "",
    phone_number: "",
    gender: "",
    address: "",
    birthdate: "",
    picture: "",
    profile: "",
    website: "",
    nickname: "",
    misc: "",
  };
  let inviteParams = {
    email: "",
    name: "",
  };
  let redirect = "";
  let error = ref("");

  // list renderer
  let listDisplay = ref(null);

  // call getPage when currentPage changes
  watch(currentPage, (n, o) => {
    if (
      n !== o &&
      n > 0 &&
      (n <= maxPage.value || (n > maxPage.value && !endOfList.value))
    ) {
      getPage();
    } else {
      currentPage.value = o;
    }
  });

  watch(fetching, (n) => {
    if (n && showCalendar.value) {
      showCalendar.value = false;
    }
  });

  watch(searchFor, (n, o) => {
    if (n !== o) {
      searchValue.value = "";
    }
  });

  // computed fetch params
  let callParams = computed(() => {
    let dates = searchValue.value.split("~").map((d) => d.trim());
    let result = {};

    switch (searchFor.value) {
      case "timestamp":
        let startDate = dates?.[0]
          ? new Date(new Date(dates[0]).setHours(0, 0, 0, 0)).getTime()
          : 0;
        let endDate = dates?.[1]
          ? new Date(new Date(dates[1]).setHours(23, 59, 59, 999)).getTime()
          : "";

        if (startDate && endDate) {
          result = {
            service: currentService.id,
            searchFor: searchFor.value,
            value: startDate,
            range: endDate,
          };
        } else if (startDate || endDate) {
          result = {
            service: currentService.id,
            searchFor: searchFor.value,
            value: startDate ? startDate : endDate,
            condition: startDate ? ">=" : "<=",
          };
        } else {
          result = {
            service: currentService.id,
            searchFor: searchFor.value,
            value: new Date().getTime(),
            condition: "<=",
          };
        }

        break;

      case "user_id":
      case "email":
      case "phone_number":
        result = {
          service: currentService.id,
          searchFor: searchFor.value,
          value: searchValue.value,
          condition: "=",
        };

        break;

      case "birthdate":
        let start = dates?.[0];
        let end = dates?.[1];

        if (start && end) {
          result = {
            service: currentService.id,
            searchFor: searchFor.value,
            value: start,
            range: end,
          };
        } else if (start || end) {
          result = {
            service: currentService.id,
            searchFor: searchFor.value,
            value: start ? start : end,
            condition: start ? ">=" : "<=",
          };
        }

        break;

      default:
        result = {
          service: currentService.id,
          searchFor: searchFor.value,
          value: searchValue.value,
          condition: ">=",
        };
    }

    return result;
  });

  let getPage = async (refresh?: boolean) => {
    // if (!pager) {
    //     return;
    // }

    if (refresh) {
      endOfList.value = false;
      currentPage.value = 1;
    }

    if (!serviceUsers[currentService.id] || searchValue.value) {
      serviceUsers[currentService.id] = await Pager.init({
        id: "user_id",
        resultsPerPage: 10,
        sortBy: !searchValue.value ? "timestamp" : callParams.value.searchFor,
        order: !searchValue.value ? "desc" : "asc",
      });
    }

    pager = serviceUsers[currentService.id];

    if ((!refresh && maxPage.value >= currentPage.value) || endOfList.value) {
      listDisplay.value = pager.getPage(currentPage.value).list;
      return;
    } else if (!endOfList.value || refresh) {
      fetching.value = true;

      if (!searchValue.value) {
        callParams.value.searchFor = "timestamp";
        callParams.value.value = new Date().getTime();
        callParams.value.condition = "<=";
      }

      // devLog({callParams.value})

      let fetchedData = await skapi
        .getUsers(callParams.value, {
          fetchMore: !refresh,
          ascending: !searchValue.value ? false : true,
        })
        .catch((err) => {
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
      updateListDisplay();
      fetching.value = false;
    }
  };

  let init = async () => {
    currentPage.value = 1;

    // setup pagers
    if (
      serviceUsers[currentService.id] &&
      Object.keys(serviceUsers[currentService.id]).length
    ) {
      pager = serviceUsers[currentService.id];
      endOfList.value = serviceUsers[currentService.id].endOfList;

      let disp = pager.getPage(currentPage.value);
      maxPage.value = disp.maxPage;
      listDisplay.value = disp.list;
    } else {
      serviceUsers[currentService.id] = pager;
      getPage(true);
    }
  };

  init();

  let moveFocus = (e: any, next: string) => {
    if (e.key == "Enter") {
      e.preventDefault();

      if (e.target.id == "email" || e.target.id == "inviteUserEmail") {
        if (!e.target.value) {
          alert("email is required");
          return false;
        } else {
          let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
          if (!email_regex.test(e.target.value)) {
            alert("Please enter it in e-mail format");
            return false;
          }
        }
      } else if (e.target.id == "password") {
        if (!e.target.value) {
          alert("password is required");
          return false;
        } else {
          if (e.target.value.length < 6 || e.target.value.length > 60) {
            alert("Min 6 characters and Max 60 characters");
            return false;
          }
        }
      } else if (e.target.id == "inviteUserName") {
        if (!e.target.value) {
          alert("name is required");
          return false;
        }
      }

      let scrollTarget = e.target.parentElement.parentElement.parentElement;

      if (
        scrollTarget.getBoundingClientRect().height < scrollTarget.scrollHeight
      ) {
        scrollTarget.scrollTop += 70;
      }

      document.getElementById(next).focus();
    }
  };

  let createUser = () => {
    promiseRunning.value = true;
    error.value = "";

    if (gender_public.value || address_public.value || birthdate_public.value) {
      Object.assign(
        createParams,
        {
          gender_public: gender_public.value,
          address_public: address_public.value,
          birthdate_public: birthdate_public.value,
        }
      );
    }

    currentService
      .createAccount(createParams, {
        // email_subscription: redirect || false,
      })
      .then(async (res) => {
        res.email = res.email_admin;
        await pager.insertItems([res]);

        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;

        document.getElementById("createForm").reset();
        for (let i in createParams) {
          createParams[i] = "";
        }
        redirect = "";
        gender_public.value = false;
        address_public.value = false;
        birthdate_public.value = false;
        openCreateUser.value = false;
        promiseRunning.value = false;
        getPage();
      })
      .catch((err) => {
        promiseRunning.value = false;
        // error.value = err.message;
        alert(err.message);
      });
  };

  let inviteUser = () => {
    promiseRunning.value = true;
    error.value = "";

    let options = {};
    if (redirect) {
      options.confirmation_url = redirect;
    }

    currentService
      .inviteUser(inviteParams, options)
      .then((res) => {
        promiseRunning.value = false;
        openInviteUser.value = false;

        let successMessage = `Invitation E-Mail has been sent to: "${inviteParams.email}". Invited users will be listed once they accept their invitation.`;
        alert(successMessage);

        document.getElementById("inviteForm").reset();
        for (let i in inviteParams) {
          inviteParams[i] = "";
        }
        redirect = "";
      })
      .catch((err) => {
        promiseRunning.value = false;
        // error.value = err.message;
        alert(err.message);
      });
  };

  let changeUserApprovalState = async (state: string) => {
    promiseRunning.value = true;

    let user_ids = Object.keys(checked.value);

    let promise = user_ids.map(user_id => {
      let selectedUser = pager.list[user_id];
      let original_approved_info = selectedUser.approved.split(":");
      let original_approver = original_approved_info[0];
      let original_approved_status = original_approved_info[1];

      if (state == "block") {
        if (original_approved_status == "suspended") {
          // This user is already blocked.
          return;
        }

        return currentService.blockAccount(user_id).then(() => {
          selectedUser.approved = `${original_approver}:suspended:` + new Date().getTime();
          return pager.editItem(selectedUser);
        })
      }

      else if (state == "unblock") {
        if (original_approved_status != "suspended") {
          // This user is not blocked.
          return;
        }

        return currentService.unblockAccount(user_id).then(() => {
          selectedUser.approved = `${original_approver}:approved:` + new Date().getTime();
          return pager.editItem(selectedUser);
        })
      }
    });

    await Promise.all(promise).then(() => {
      checked.value = {};
      updateListDisplay();
      promiseRunning.value = false;
      openBlockUser.value = false;
      openUnblockUser.value = false;
    }).catch((e) => {
      promiseRunning.value = false;
      alert(e.message);
    });
  };

  let updateListDisplay = () => {
    let disp = pager.getPage(currentPage.value);
    maxPage.value = disp.maxPage;
    listDisplay.value = disp.list;
    while (
      disp.maxPage > 0 &&
      disp.maxPage < currentPage.value &&
      !disp.list.length
    ) {
      currentPage.value--;
    }
  }

  let deleteUser = () => {
    promiseRunning.value = true;

    let userToDel = Object.keys(checked.value);
    let promises: Array<Promise<any>> = [];
    userToDel.forEach((u) => {
      console.log({ u })
      promises.push(currentService.deleteAccount(u).then(async () => {
        await pager.deleteItem(u);
      }));
    });

    Promise.all(promises).then(() => {
      checked.value = {};
      updateListDisplay();
      promiseRunning.value = false;
      openDeleteUser.value = false;
    }).catch((e) => {
      promiseRunning.value = false;
      alert(e.message);
    });

  };

  let closeModal = () => {
    if (openInviteUser.value) {
      document.getElementById("inviteForm").reset();
      openInviteUser.value = false;
    } else if (openCreateUser.value) {
      document.getElementById("createForm").reset();
      for (let i in createParams) {
        createParams[i] = "";
      }
      gender_public.value = false;
      address_public.value = false;
      birthdate_public.value = false;
      openCreateUser.value = false;
    }
  };

  let grantAccess = async () => {
    promiseRunning.value = true;

    let inputAccess: HTMLInputElement = document.querySelector(".change-access");
    let resultAccess = Number(inputAccess.value);

    if (resultAccess < 1 || resultAccess > 99) {
      promiseRunning.value = false;
      inputAccess.value = "";
      alert("Access group should be between 1 and 99");
      return;
    }

    let user_ids = Object.keys(checked.value);
    let promises: Array<Promise<any>> = [];

    user_ids.forEach((u) => {
      promises.push(
        currentService.grantAccess({ user_id: u, access_group: resultAccess }).then(() => {
          pager.list[u].access_group = resultAccess;
          pager.editItem(pager.list[u]);
        })
      );
    });

    await Promise.all(promises).then(() => {
      inputAccess.value = "";
      updateListDisplay();
      openGrantAccess.value = false;
      successGrantAccess.value = true;
    }).catch((e) => {
      alert(e.message);
    }).finally(() => {
      promiseRunning.value = false;
    });
  };

  let closeGrantAccess = () => {
    let inputAccess: HTMLInputElement = document.querySelector(".change-access");

    openGrantAccess.value = false;

    if (inputAccess) {
      inputAccess.value = "";
    }
  };
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
      padding-top: 0.25rem;

      &>* {
        padding: 0.25rem 0.5rem;
      }

      padding-bottom: 0.25rem;
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
    margin: 0 auto;

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
      position: relative;
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
    padding: 0;
    font-size: 0.8rem;
  }

  .iconClick.deact {
    color: rgba(0, 0, 0, 0.5);

    &::before {
      box-shadow: unset !important;
    }

    svg {
      fill: rgba(0, 0, 0, 0.5);
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .detailRecord {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    transform: translateX(110%);
    transition: all 0.3s;

    &.show {
      transform: translateX(0px);
    }

    .header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding: 0 20px;
      font-weight: 500;
      background-color: #f0f0f0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.2);

      .material-symbols-outlined {
        cursor: pointer;
      }

      .name {
        flex-grow: 1;
        padding-left: 20px;
      }

      button {
        padding: 0;
        font-size: 0.9rem;
      }
    }
  }

  tbody {
    td {
      .click {
        position: relative;
        color: var(--main-color);
        font-weight: 500;

        &::after {
          position: absolute;
          content: "copied!";
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          border-radius: 4px;
          text-align: center;
          background-color: var(--main-color);
          color: #fff;
          display: none;
        }

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }

        &.clicked {
          &::after {
            display: block;
          }
        }
      }
    }
  }
</style>