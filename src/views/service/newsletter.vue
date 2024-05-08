<template lang="pug">
h2 Newsletter

hr

p.
    You can send newsletters to your users by sending your email to the endpoint provided.

form#searchForm(@submit.prevent="init(true)")
    .customSelect(@click.stop="(e)=>{showDropDown(e)}")
        button(type='button')
            span {{ searchFor == 'timestamp' ? 'Sent' : searchFor }}
            span.material-symbols-outlined arrow_drop_down
        .moreVert(style="--moreVert-left:0;display:none")
            .inner(style="padding:0.8rem;padding-right:1rem")
                .more(value="Subject" @click="searchFor = 'subject';searchText = '';") Subject
                .more(value="timestamp" @click="searchFor = 'timestamp';searchText = '';") Sent

    .search
        .clickInput(v-if="searchFor === 'timestamp'" @click.stop="showCalendar = !showCalendar;")
            input.big#searchInput(type="text" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchText" readonly)
            .material-symbols-outlined.fill.icon(v-if="(searchFor === 'timestamp')") calendar_today
            Calendar(v-if="showCalendar" @dateClicked="handledateClick" @close="showCalendar=false" :searchText="searchText" :prevDateInfo="prevDateInfo" alwaysEmit='true')

        input.big#searchInput(v-else-if="searchFor === 'subject'" type="text" placeholder="Email subject" v-model="searchText")

        button.final(type="submit" style='flex-shrink: 0;') Search

.tableMenu
    div(style='flex-grow: 1;text-align:right')
        .iconClick.square(@click="init(true)" :class="{'nonClickable' : !user?.email_verified || currentService.service.active <= 0}")
            .material-symbols-outlined.fill refresh
            span &nbsp;&nbsp;Refresh

Table(:class='{disabled: !user?.email_verified || currentService.service.active <= 0}' resizable)
    template(v-slot:head)
        tr
            th(style='width: 250px;')
                | Subject
                .resizer
            th(style='width: 150px;')
                | Sent
                .resizer
            th(style='width: 100px;')
                | Reads
                .resizer
            th(style='width: 100px;')
                | Complaint
                .resizer
            th(style='width: 100px;')
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
        template(v-else-if="!newsletterDisplay || newsletterDisplay.length === 0")
            tr
                td(colspan="5") No newsletter sent
            tr(v-for="i in 9")
                td(colspan="5")
        template(v-else)
            tr.nsrow(v-for="ns in newsletterDisplay" @click='openNewsletter(ns.url)')
                td.overflow {{ converter(ns.subject) }}
                td.overflow {{ dateFormat(ns.timestamp) }}
                td.overflow {{ ns.read }}
                td.overflow {{ ns.complaint }}
                td.overflow {{ ns.bounced }}
            tr(v-for="i in (10 - newsletterDisplay.length)")
                td(colspan="5")
.tableMenu(style='display:block;text-align:center;')
    .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': currentPage === 1 || fetching }")
        .material-symbols-outlined.bold chevron_left
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow(@click="currentPage++;" :class="{'nonClickable': maxPage <= currentPage && newsletterPager?.endOfList || fetching }")
        span &nbsp;&nbsp;Next
        .material-symbols-outlined.bold chevron_right

</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { Ref } from 'vue';
import Calendar from '@/components/_calcal.vue';
import { showDropDown } from '@/assets/js/event.js'
import { currentService } from './main';
import { user } from '@/code/user';
import Table from '@/components/table.vue';
import { skapi } from '@/code/admin';
import { dateFormat } from '@/code/admin';
import Pager from '@/code/pager';
import { serviceNewsletters } from '@/views/service/main';

let service = currentService.service;
let showCalendar = ref(false);
let currentTimestamp = new Date().getTime();

type Newsletter = {
    bounced: number;
    compliant: number;
    read: number;
    message_id: string;
    subject: string;
    timestamp: number;
    url: string;
}

let newsletterPager: Pager = null;
let newsletterSender: string[] = reactive([]);
let newsletterDisplay: Ref<Newsletter[]> = ref(null);
let fetching = ref(false);
let maxPage = 0;
let currentPage = ref(1);
let searchFor = ref('timestamp');
let group = ref(0);
let searchText = ref('');

watch(currentPage, (n) => {
    if (!fetching.value) {
        getPage();
    }
});
let prevDateInfo = {};
let handledateClick = (startDate, endDate, startTimestamp, endTimestamp) => {
    if (startDate == '' && endDate == '') {
        searchText.value = ''
    } else {
        searchText.value = (startDate || '') + ' ~ ' + (endDate || '');
        prevDateInfo.start = startTimestamp;
        prevDateInfo.end = endTimestamp;
    }
}

let getPage = async (refresh?: boolean) => {
    let page = currentPage.value;

    if (maxPage > page) {
        let ns = newsletterPager.getPage(page);
        maxPage = ns.maxPage;
        return ns.list;
    }

    else if (!newsletterPager.endOfList) {
        fetching.value = true;

        // initial fetch
        let nsl = await skapi.getNewsletters({
            service: service.service,
            owner: service.owner,
            searchFor: searchFor.value,
            value: currentTimestamp,
            condition: searchFor.value === 'subject' ? '>=' : '<=',
            group: group.value ? 'authorized' : 'public',
        }, { fetchMore: !refresh, ascending: searchFor.value === 'subject' });

        newsletterPager.endOfList = nsl.endOfList;
        if (nsl.list.length > 0) {
            await newsletterPager.insertItems(nsl.list);
        }
        let disp = newsletterPager.getPage(page);
        maxPage = disp.maxPage;
        newsletterDisplay.value = disp.list as Newsletter[];
        fetching.value = false;
    }
}

let init = async (refresh: boolean) => {
    let currentPage = ref(1);
    // setup pagers
    if (!refresh && serviceNewsletters[group.value]) {
        newsletterPager = serviceNewsletters[group.value];
    }
    else {
        serviceNewsletters[group.value] = await Pager.init({
            id: 'message_id',
            resultsPerPage: 10,
            sortBy: searchFor.value,
            order: searchFor.value === 'subject' ? 'asc' : 'desc',
        });
        newsletterPager = serviceNewsletters[group.value];
        currentService.requestNewsletterSender({ group_numb: group.value }).then(r => {
            newsletterSender[group.value] = r;
        });
    }
    getPage(true);
}

init();

let converter = (text: string, parsed: boolean) => {
    if (!parsed) {
        return text;
    }
    text = text.replaceAll('${email}', user.email);
    text = text.replaceAll('${name}', user.name || user.email);
    text = text.replaceAll('${service_name}', currentService.service.name);
    return text
}

let openNewsletter = (url: string) => {
    window.open(url, '_blank');
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
    flex-direction: row-reverse;

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