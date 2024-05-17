<template lang="pug">
h2 Newsletter

hr

p You can send newsletters to your users by clicking on #[a(:href="'mailto:' + newsletterEndpoint") Send Newsletter] #[.wordset or sending the email to the address provided below:]

Code
    pre {{ newsletterEndpoint }}

br

p.
    You can collect your subscribers by using the following code:

Code
    pre.
        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.subscribeNewsletter(event).then(res => alert(res))"]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "email"] #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "E-Mail address"]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") hidden] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "group"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "public"]#[span(style="color:#999") &gt;]
            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Subscribe"]#[span(style="color:#999") &gt;]
        #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

p For more information on how to use the code above, please refer to the #[a(href="https://docs.skapi.com/email/newsletters.html" target="_blank") documentation]

br

//- form#searchForm(@submit.prevent="init(true)")
//-     .customSelect(@click.stop="(e)=>{showDropDown(e)}")
//-         button(type='button')
//-             span {{ searchFor == 'timestamp' ? 'Sent' : searchFor }}
//-             span.material-symbols-outlined arrow_drop_down
//-         .moreVert(style="--moreVert-left:0;display:none")
//-             .inner(style="padding:0.8rem;padding-right:1rem")
//-                 .more(value="Subject" @click="searchFor = 'subject';searchText = '';") Subject
//-                 .more(value="timestamp" @click="searchFor = 'timestamp';searchText = '';") Sent

//-     .search
//-         .clickInput(v-if="searchFor === 'timestamp'" @click.stop="showCalendar = !showCalendar;")
//-             input.big#searchInput(type="text" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchText" readonly)
//-             .material-symbols-outlined.fill.icon(v-if="(searchFor === 'timestamp')") calendar_today
//-             Calendar(v-if="showCalendar" @dateClicked="handledateClick" @close="showCalendar=false" :searchText="searchText" :prevDateInfo="prevDateInfo" alwaysEmit='true')

//-         input.big#searchInput(v-else-if="searchFor === 'subject'" type="text" placeholder="Email subject" v-model="searchText")

//-         button.final(type="submit" style='flex-shrink: 0;') Search

.tableMenu
    a.iconClick.square(:href="'mailto:' + newsletterEndpoint" @click="init" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        .material-symbols-outlined.fill mail
        span &nbsp;&nbsp;Send Newsletter

    .iconClick.square(@click="init" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        .material-symbols-outlined.fill refresh
        span &nbsp;&nbsp;Refresh


Table(:class='{disabled: !user?.email_verified || currentService.service.active <= 0}')
    template(v-slot:head)
        tr
            th(style='width: 250px;')
                | Subject
                .resizer
            th(style='width: 120px;')
                | Sent
                .resizer
            th(style='width: 120px;')
                | Reads
                .resizer
            th(style='width: 120px;')
                | Complaint
                .resizer
            th(style='width: 120px;')
                | Bounced
                .resizer
    template(v-slot:body)
        template(v-if="fetching")
            tr
                td#loading(colspan="5").
                    Loading Newsletters ... &nbsp;
                    #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
            tr(v-for="i in 9")
                td(colspan="5")
        template(v-else-if="!listDisplay || listDisplay.length === 0")
            tr
                td(colspan="5") No newsletter sent
            tr(v-for="i in 9")
                td(colspan="5")
        template(v-else)
            tr.nsrow(v-for="ns in listDisplay" @click='openNewsletter(ns.url)')
                td.overflow {{ converter(ns.subject) }}
                td.overflow {{ dateFormat(ns.timestamp) }}
                td.overflow {{ ns.read }}
                td.overflow {{ ns.complaint }}
                td.overflow {{ ns.bounced }}
            tr(v-for="i in (10 - listDisplay.length)")
                td(colspan="5")
.tableMenu(style='display:block;text-align:center;')
    .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': fetching || currentPage <= 1 }")
        .material-symbols-outlined.bold chevron_left
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow(@click="currentPage++;" :class="{'nonClickable': fetching || endOfList && currentPage >= maxPage }")
        span &nbsp;&nbsp;Next
        .material-symbols-outlined.bold chevron_right

br

</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { currentService } from './main';
import { user } from '@/code/user';
import Table from '@/components/table.vue';
import { skapi } from '@/code/admin';
import { dateFormat } from '@/code/admin';
import Pager from '@/code/pager';
import Code from '@/components/code.vue';
import { showDropDown } from '@/assets/js/event.js'

let pager: Pager = null;

// default form input values

let searchFor: Ref<"timestamp" | "message_id" | "read" | "complaint" | "subject"> = ref('timestamp');
let searchValue: Ref<string | number> = ref('');
let group: Ref<0 | 1> = ref(0);
let currentTimestamp: Ref<number> = ref(new Date().getTime());

type Newsletter = {
    bounced: number;
    compliant: number;
    read: number;
    message_id: string;
    subject: string;
    timestamp: number;
    url: string;
}

// ui/ux related
let fetching = ref(false);
let maxPage = ref(0);
let currentPage = ref(1);
let endOfList = ref(false);

let newsletterEndpoint: Ref<string> = ref('');
currentService.newsletterSender[0].then(n => newsletterEndpoint.value = n);

// list renderer
let listDisplay: Ref<Newsletter[]> = ref(null);

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
    init();
});
watch(group, (n) => {
    init();
});

// computed fetch params
let callParams = computed(() => {
    let defaultValues = {
        timestamp: {
            value: currentTimestamp.value,
            condition: '<=',
        },
        message_id: {
            value: '',
            condition: '=',
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
            value: '',
            condition: '>=',
        },
    }
    return {
        params: {
            service: currentService.service.service,
            owner: currentService.service.owner,
            searchFor: searchFor.value,
            value: searchValue.value || defaultValues[searchFor.value].value,
            condition: defaultValues[searchFor.value].condition,
            group: group.value,
        },
        options: {
            ascending: searchFor.value === 'subject',
        }
    }
});

let getPage = async (refresh?: boolean) => {
    if (!pager) {
        // if pager is not ready, return
        return;
    }

    if (!refresh && maxPage.value >= currentPage.value) {
        // if is not refresh and has page data
        listDisplay.value = pager.getPage(currentPage.value).list as Newsletter[];
        return;
    }

    else if (!endOfList.value || refresh) {
        // if page data needs to be fetched

        if (refresh) {
            // refresh timestamp
            currentTimestamp.value = new Date().getTime();
        }

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

let init = async () => {
    currentPage.value = 1;

    // setup pagers
    pager = await Pager.init({
        id: 'message_id',
        resultsPerPage: 10,
        sortBy: searchFor.value,
        order: searchFor.value === 'subject' ? 'asc' : 'desc',
    });

    getPage(true);
}

init();


// ux related functions

let openNewsletter = (url: string) => {
    window.open(url, '_blank');
}

let converter = (html: string, parsed: boolean, inv: boolean) => {
    if (!parsed) {
        return html;
    }
    html = html.replaceAll('${code}', '123456');
    html = html.replaceAll('${email}', user.email);
    html = html.replaceAll('${name}', user.name || user.email);
    html = html.replaceAll('${service_name}', service.name);
    html = html.replaceAll('${link}', inv ? '/invitation_confirmed_template' : '/signup_confirmed_template');
    html = html.replaceAll('${password}', 'abc123&&');
    return html
}
</script>

<style lang="less" scoped>
// table style below

tbody tr.nsrow {
    &:not(.active):hover {
        background-color: rgba(41, 63, 230, 0.05);
        cursor: pointer;
    }

    &.active {
        background-color: rgba(41, 63, 230, 0.10);
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

#searchForm {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    width: 600px;
    max-width: 100%;

    .search {
        position: relative;
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
</style>