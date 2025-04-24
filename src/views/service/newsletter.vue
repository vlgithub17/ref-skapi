<template lang="pug">
section.infoBox(v-if='needsEmailAlias' style='max-width:600px;margin:3rem auto;' :class='{nonClickable: email_is_unverified_or_service_is_disabled}')

    .infoTitle Bulk Email

    hr

    .error(v-if='!user?.email_verified')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        router-link(to="/account-setting") Please verify your email address to modify settings.

    p.
        You can send bulk emails to your newsletter subscribers.
        #[br]
        To proceed, please register your email alias address that will be used to send out the emails.

    p The email alias can only be #[span.wordset alphanumeric and hyphen.]

    br

    form.register(@submit.prevent='registerAlias')
        .emailAlias
            input.big(v-model='emailAliasVal' pattern='^[a-z\\d](?:[a-z\\d\\-]{0,61}[a-z\\d])?$' :disabled="registerAliasRunning" placeholder="your-email-alias" required)

        button.final(style='min-width: 124px;' :disabled='registerAliasRunning' :class='{nonClickable: registerAliasRunning}')
            template(v-if="registerAliasRunning")
                .loader(style="--loader-color:white; --loader-size:12px")
            template(v-else)
                | Register

template(v-else)
    section.infoBox
        .titleHead
            h2 Bulk Email
            Select(v-model="group" :selectOptions="[{option: 'Newsletter', value: 0}, {option: 'Service Mail', value: 1}]" style='display:inline-block;vertical-align:middle;width:136px')

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

        p(style='margin-bottom: 0').
            You can collect your {{mailType.toLowerCase()}} subscribers by using the following code:

        Code(v-if='group === 0')
            pre.
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.subscribeNewsletter(event).then(res => alert(res))"]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "E-Mail address"]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") hidden] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "group"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") {{group ? '"authorized"' : '"public"'}}]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Subscribe"]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]
        Code(v-if='group === 1')
            pre.
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.subscribeNewsletter(event).then(res => alert(res))"]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") hidden] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "group"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") {{group ? '"authorized"' : '"public"'}}]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Subscribe"]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

        p(v-if='group === 1') * User must be logged in to subscribe to Service Mail, and the user must have their email verified.

        br

        p(style='margin-bottom: 0') Once the users have subscribed to your {{mailType.toLowerCase()}}, they will be able to receive your emails sent to the address #[span.wordset provided below:]

        Code
            pre {{ newsletterEndpoint || '...' }}

        br

        p * The senders email address should exactly match your current profile email address: #[b.wordset {{ user.email }}]
        
        p Email Alias: #[b.wordset {{ currentService.service.email_alias || currentService.service.service }}@mail.skapi.com]

        p For more information, please refer to the #[a(href="https://docs.skapi.com/email/newsletters.html" target="_blank") documentation]

        br
        
    br

    .tableMenu
        a.iconClick.square(:href="'mailto:' + newsletterEndpoint" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
            //- .material-symbols-outlined.notranslate.fill mail
            svg.svgIcon
                use(xlink:href="@/assets/img/material-icon.svg#icon-mail-fill")
            span &nbsp;&nbsp;Send {{mailType}}
        .iconClick.square(@click="getPage(true)" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
            //- .material-symbols-outlined.notranslate.fill(:class='{loading:fetching}') refresh
            svg.svgIcon(:class='{loading:fetching}')
                use(xlink:href="@/assets/img/material-icon.svg#icon-refresh")
            span &nbsp;&nbsp;Refresh


    Table(:class='{disabled: !user?.email_verified || currentService.service.active <= 0}')
        template(v-slot:head)
            tr(:class="{'nonClickable' : fetching}")
                th(style='width: 250px;')
                    span(@click='toggleSort("subject")')
                        | Subject
                        //- span.material-symbols-outlined.notranslate.fill(v-if='searchFor === "subject"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}
                        svg.svgIcon(v-if='searchFor === "subject" && ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down")
                        svg.svgIcon(v-if='searchFor === "subject" && !ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-up")
                    .resizer
                th(style='width: 120px;')
                    span(@click='toggleSort("timestamp")')
                        | Sent
                        //- span.material-symbols-outlined.notranslate.fill(v-if='searchFor === "timestamp"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}
                        svg.svgIcon(v-if='searchFor === "timestamp" && ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down")
                        svg.svgIcon(v-if='searchFor === "timestamp" && !ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-up")
                    .resizer
                th(style='width: 120px;')
                    span(@click='toggleSort("read")')
                        | Reads
                        //- span.material-symbols-outlined.notranslate.fill(v-if='searchFor === "read"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}
                        svg.svgIcon(v-if='searchFor === "read" && ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down")
                        svg.svgIcon(v-if='searchFor === "read" && !ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-up")
                    .resizer
                th(style='width: 120px;')
                    span(@click='toggleSort("complaint")')
                        | Complaint
                        //- span.material-symbols-outlined.notranslate.fill(v-if='searchFor === "complaint"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}
                        svg.svgIcon(v-if='searchFor === "complaint" && ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down")
                        svg.svgIcon(v-if='searchFor === "complaint" && !ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-up")
                    .resizer
                th(style='width: 120px;')
                    span(@click='toggleSort("bounced")')
                        | Bounced
                        //- span.material-symbols-outlined.notranslate.fill(v-if='searchFor === "bounced"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}
                        svg.svgIcon(v-if='searchFor === "bounced" && ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-down")
                        svg.svgIcon(v-if='searchFor === "bounced" && !ascending' style="fill: black")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-drop-up")
                th.center(style="width:60px; padding:0")

        template(v-slot:body)
            template(v-if="fetching")
                tr
                    td#loading(colspan="6").
                        Loading {{mailType}} ... &nbsp;
                        #[.loader(style="--loader-color:black; --loader-size:12px")]
                tr(v-for="i in 9")
                    td(colspan="6")
            template(v-else-if="!listDisplay || listDisplay.length === 0")
                tr
                    td(colspan="6") No {{mailType}} Sent
                tr(v-for="i in 9")
                    td(colspan="6")
            template(v-else)
                tr.hoverRow(v-for="ns in listDisplay" @click='openNewsletter(ns.url)')
                    td.overflow {{ converter(ns.subject) }}
                    td.overflow {{ dateFormat(ns.timestamp) }}
                    td.overflow {{ ns.read }}
                    td.overflow {{ ns.complaint }}
                    td.overflow {{ ns.bounced }}
                    td.center.buttonWrap(@click.stop)
                        //- .material-symbols-outlined.notranslate.fill.clickable.dangerIcon.hide(@click.stop="emailToDelete = ns") delete
                        svg.svgIcon.reactiveDanger.clickable.hide(@click.stop="emailToDelete = ns")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")
                        
                tr(v-for="i in (10 - listDisplay.length)")
                    td(colspan="6")

    br

    .tableMenu(style='display:block;text-align:center;')
        .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': fetching || currentPage <= 1 }")
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

    Modal(:open="emailToDelete" @close="emailToDelete=false")
        h4(style='margin:.5em 0 0;') Delete Email

        hr

        div(style='font-size:.8rem;')
            p.
                Are you sure you want to delete email:
                #[br]
                "#[b {{ emailToDelete?.subject }}]"?
                #[br]
                #[br]
                This action cannot be undone.
        br
        div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
            div(v-if="deleteMailLoad" style="width:100%; text-align:center")
                .loader(style="--loader-color:blue; --loader-size:12px")
            template(v-else)
                button.noLine.warning(@click="emailToDelete = null") Cancel
                button.final.warning(@click="deleteEmail(emailToDelete)") Delete

</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { currentService, serviceBulkMails } from './main';
import { user } from '@/code/user';
import Table from '@/components/table.vue';
import { skapi } from '@/main';
import { dateFormat } from '@/code/admin';
import Pager from '@/code/pager';
import Code from '@/components/code.vue';
import Modal from '@/components/modal.vue';
import type { Newsletters } from 'skapi-js/js/Types';
import Select from '@/components/select.vue';

type Newsletter = {
    bounced: number;
    compliant: number;
    read: number;
    message_id: string;
    subject: string;
    timestamp: number;
    url: string;
}

let pager: Pager = null;

let emailAliasVal = ref("");
let email_is_unverified_or_service_is_disabled = computed(() => !user?.email_verified || currentService.service.active <= 0);
let registerAliasRunning = ref(false);
function registerAlias(){
    registerAliasRunning.value = true;
    currentService.registerSenderEmail({
        email_alias: emailAliasVal.value,
    }).catch(err=>{
        window.alert(err.message);
    }).finally(()=>{
        registerAliasRunning.value = false;
    });
}
let needsEmailAlias = computed(() => {
    return currentService.service.active > 0 && !currentService.service.email_alias;
});

// default form input values

let searchFor: Ref<"timestamp" | "read" | "complaint" | "subject"> = ref('timestamp');
let group: Ref<0 | 1> = ref(0);
let ascending: Ref<boolean> = ref(false);
let emailToDelete: Ref<Newsletter> = ref(null);

// ui/ux related
let fetching = ref(false);
let maxPage = ref(0);
let currentPage = ref(1);
let endOfList = ref(false);
let mailType = computed(() => group.value === 0 ? 'Newsletter' : 'Service Mail');
let deleteMailLoad = ref(false);
// list renderer
let listDisplay: Ref<Newsletter[]> = ref(null);

// etc
let newsletterEndpoint: Ref<string> = ref('');
currentService.newsletterSender[0].then(r => newsletterEndpoint.value = r);

// call getPage when currentPage changes
watch(currentPage, (n, o) => {
    if (n !== o && n > 0 && (n <= maxPage.value || n > maxPage.value && !endOfList.value)) {
        // if new value is different from old value
        // if new value is within maxPage
        // if new value is greater than maxPage but not end of list

        getPage();
    }
    else {
        currentPage.value = o; // revert back to old value
    }
});

// initialize the pager when searchFor changes
watch(searchFor, (n) => {
    if (!fetching.value) {
        ascending.value = n === 'subject';
        if (endOfList.value) {
            resetIndex();
        }
        else {
            init();
        }
    }
});

watch(ascending, (n) => {
    if (!fetching.value) {
        if (endOfList.value) {
            resetIndex();
        }
        else {
            init();
        }
    }
});

watch(group, (n) => {
    newsletterEndpoint.value = '';
    currentService.newsletterSender[n].then(r => newsletterEndpoint.value = r);
    init();
});

// computed fetch params
let callParams = computed(() => {
    let defaultValues = {
        timestamp: {
            value: 0,
            condition: '>=',
        },
        read: {
            value: 0,
            condition: '>=',
        },
        complaint: {
            value: 0,
            condition: '>=',
        },
        subject: {
            value: ' ',
            condition: '>',
        },
    }
    return {
        params: {
            service: currentService.service.service,
            owner: currentService.service.owner,
            searchFor: searchFor.value,
            value: defaultValues[searchFor.value].value,
            condition: defaultValues[searchFor.value].condition,
            group: group.value,
        },
        options: {
            ascending: ascending.value,
        }
    }
});

let getPage = async (refresh?: boolean) => {
    if(refresh) {
        endOfList.value = false;
    }

    // 서비스 ID가 없으면 객체 초기화
    if (!serviceBulkMails[currentService.id]) {
        serviceBulkMails[currentService.id] = {};
    }

    // group.value 키가 없거나 검색 조건이 있으면 초기화
    if (!serviceBulkMails[currentService.id][group.value] || (refresh && searchFor.value)) {
        serviceBulkMails[currentService.id][group.value] = await Pager.init({
            id: 'message_id',
            resultsPerPage: 10,
            sortBy: searchFor.value,
            order: ascending.value ? 'asc' : 'desc',
        });
    }

    pager = serviceBulkMails[currentService.id][group.value];

    // if(!serviceBulkMails[currentService.id] || searchFor.value) {
    //     serviceBulkMails[currentService.id] = await Pager.init({
    //         id: 'message_id',
    //         resultsPerPage: 10,
    //         sortBy: searchFor.value,
    //         order: ascending.value ? 'asc' : 'desc',
    //     });
    // }

    // pager = serviceBulkMails[currentService.id];

    if (!refresh && maxPage.value >= currentPage.value || endOfList.value) {
        // if is not refresh and has page data
        listDisplay.value = pager.getPage(currentPage.value).list as Newsletter[];
        return;
    }

    else if (!endOfList.value || refresh) {
        // if page data needs to be fetched
        fetching.value = true;

        // fetch from server
        let fetchedData = await skapi.getNewsletters(callParams.value.params, Object.assign({ fetchMore: !refresh }, callParams.value.options));

        // save endOfList status
        endOfList.value = fetchedData.endOfList;

        // insert data in pager
        if (fetchedData.list.length > 0) {
            await pager.insertItems(fetchedData.list);
        }

        // get page from pager
        let disp = pager.getPage(currentPage.value);

        // set maxpage
        maxPage.value = disp.maxPage;

        // render data
        listDisplay.value = disp.list as Newsletter[];
        fetching.value = false;
    }
}

let resetIndex = async () => {
    // reset index is used when index is changed but it's end of list
    currentPage.value = 1;
    await pager.resetIndex({
        sortBy: searchFor.value,
        order: ascending.value ? 'asc' : 'desc',
    });
    getPage(true);
}

let init = async () => {
    currentPage.value = 1;

    // 서비스 ID가 없을 때 초기화
    if (!serviceBulkMails[currentService.id]) {
        serviceBulkMails[currentService.id] = {};
    }

    // 선택된 그룹 값이 없을 때만 pager로 초기화
    if (!serviceBulkMails[currentService.id][group.value]) {
        serviceBulkMails[currentService.id][group.value] = { ...pager }; // 새로 추가
        getPage(true);
    } else {
        // 기존 값이 있는 경우 가져와서 사용
        pager = serviceBulkMails[currentService.id][group.value];
        endOfList.value = pager.endOfList;

        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;
    }

    // if(serviceBulkMails[currentService.id] && Object.keys(serviceBulkMails[currentService.id]).length) {
    //     pager = serviceBulkMails[currentService.id];
    //     endOfList.value = serviceBulkMails[currentService.id].endOfList;

    //     let disp = pager.getPage(currentPage.value);
    //     maxPage.value = disp.maxPage;
    //     listDisplay.value = disp.list;

    // } else {
    //     serviceBulkMails[currentService.id] = pager;
    //     getPage(true);
    // }

    // setup pagers
    // pager = await Pager.init({
    //     id: 'message_id',
    //     resultsPerPage: 10,
    //     sortBy: searchFor.value,
    //     order: ascending.value ? 'asc' : 'desc',
    // });

    // getPage(true);
}

init();

// ux related functions

let openNewsletter = (url: string) => {
    window.open(url, '_blank');
}

let toggleSort = (search: any) => {
    if (fetching.value) {
        return;
    }

    if (searchFor.value === search) {
        ascending.value = !ascending.value;
    }
    else {
        searchFor.value = search;
    }
}

let deleteEmail = (ns: Newsletter) => {
    if (!ns) {
        return;
    }

    let params = {
        message_id: ns.message_id,
        group: group.value,
    }

    deleteMailLoad.value = true;
    currentService.deleteNewsletter(params).then(async () => {
        emailToDelete.value = null;
        await pager.deleteItem(params.message_id);
        getPage();
    }).catch(err => window.alert(err)).finally(() => {
        deleteMailLoad.value = false;
    });
}

let converter = (html: string, parsed: boolean, inv: boolean) => {
    if (!parsed) {
        return html;
    }
    html = html.replaceAll('${code}', '123456');
    html = html.replaceAll('${email}', user.email);
    html = html.replaceAll('${name}', user.name || user.email);
    html = html.replaceAll('${service_name}', service.name);
    html = html.replaceAll('https://link.skapi', inv ? '/invitation_confirmed_template' : '/signup_confirmed_template');
    html = html.replaceAll('${password}', 'abc123&&');
    return html
}
</script>

<style lang="less" scoped>
// table style below
thead {
    th {
        &>span {
            @media (pointer: fine) {

                // only for mouse pointer devices
                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
        }
    }
}

.tableMenu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &>* {
        margin-bottom: 8px;
    }
}

@media (pointer: coarse) {
    .hide {
        display: block !important;
    }
}
form.register {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: flex-end;

    .emailAlias {
        display: inline-block;
        position: relative;
        height: 44px;

        &::after {
            content: "@mail.skapi.com";
            position: absolute;
            right: 10px;
            line-height: 44px;
            color: #999;
            font-size: 0.8rem;
            font-weight: 400;
            pointer-events: none;
            user-select: none;
            z-index: 1;
        }

        input {
            padding-right: 132px;
        }

        flex-grow: 1;
    }

    svg:hover {
        border-radius: 50%;
        background-color: rgba(41, 63, 230, 0.1);
    }

    button {
        flex-shrink: 0;
    }
}
</style>