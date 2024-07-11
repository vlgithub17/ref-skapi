<template lang="pug">
h2(style='margin-bottom: 0')
    | Automated Email:&nbsp;
    Select(v-model="emailType" :selectOptions="emailTypeSelect" style='display:inline-block;vertical-align:middle;' :class='{disabled: fetching}')

hr

template(v-if='emailType === "Signup Confirmation"')
    p.
        Signup confirmation email is sent when the signup requires email verification #[span.wordset or when the user tries to recover their disabled account.]
        #[span.wordset The email contains a link to activate the account.&nbsp;]

        #[br]

        See #[a.wordset(href='https://docs.skapi.com/authentication/signup-confirmation.html' target="_blank") Signup Confirmation]
        ,
        #[a.wordset(href='https://docs.skapi.com/user-account/disable-recover-account.html' target="_blank") Disable / Recover Account]

    small Required Placeholder
    ul
        li #[b ${link}] - Activation link url. You can append this to the href attribute of the anchor tag.

    small Optional Placeholder
    ul
        li #[b ${email}] - User email
        li #[b ${name}] - User name, normaled to users email if not provided
        li #[b ${service_name}] - Service name

template(v-if='emailType === "Welcome Email"')
    p.
        Welcome Email is sent when the user successfully logs in after the signup confirmation.
        #[span.wordset If the signup did not require any signup confirmation, Welcome Email will not be sent]

    small Optional Placeholder
    ul
        li #[b ${email}] - User email
        li #[b ${name}] - User name, normaled to users email if not provided
        li #[b ${service_name}] - Service name

template(v-if='emailType === "Verification Email"')
    p.
        Verification Email is sent when the user requests to verify their email address or tries to reset their #[span.wordset forgotten password.]
        #[br]
        See #[a(href='https://docs.skapi.com/user-account/email-verification.html' target="_blank") Verification Email]
        ,
        #[a.wordset(href='https://docs.skapi.com/authentication/forgot-password.html' target="_blank") Forgot Password]

    small Required Placeholder:
    ul
        li #[b ${code}] - Verification code.

    small Optional Placeholder:
    ul
        li #[b ${email}] - User email
        li #[b ${name}] - User name, normaled to users email if not provided
        li #[b ${service_name}] - Service name

template(v-if='emailType === "Invitation Email"')
    p.
        Invitation Email is sent when the user is invited to join the service.
        #[span.wordset You can invite new users] to your service from the #[router-link(to='users') Users] page.
        #[span.wordset User can login] with provided email and password after they accept the invitation by clicking on the link provided in the email.

    small Required Placeholder:
    ul
        li #[b ${link}] - Invitation accept link url. You can append this to the href attribute of the anchor tag.
        li #[b ${email}] - User's login email
        li #[b ${password}] - User's login password

    small Optional Placeholder:
    ul
        li #[b ${name}] - User name, normaled to users email if not provided
        li #[b ${service_name}] - Service name

p(style='margin-bottom: 0').
    You can customize the email by sending the template to the #[a(:href='"mailto:" + email_templates[group]') email address] provided below:
Code
    pre {{ email_templates[group] }}

p.
    * The senders email address should exactly match your current profile email address: #[b.wordset {{ user.email }}]
    #[br]
    For customizing the email template, see #[a(href='https://docs.skapi.com/email/email-templates.html' target="_blank") Automated Emails] for more information.

section.infoBox
    .infoTitle {{emailType}}

    hr

    .state
        .smallTitle Subject
        .ellipsis {{ converter(subjects[group], parseOpt[group]) }}
    .state
        .smallTitle Content
        small.editHandle(:style='{color: parseOpt[group] ? "black" : null}' @click='parseOpt[group] = true') [Preview]
        span &nbsp;|&nbsp;
        small.editHandle(:style='{color: !parseOpt[group] ? "black" : null}' @click='parseOpt[group] = false') [Original]

    .email
        div(v-if='htmls[group] === null') ...
        iframe(v-else :srcdoc='currentTemp' style='width: 100%; height: 300px; border: none;')

br

.tableMenu
    a.iconClick.square(:href="'mailto:' + mailEndpoint" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        .material-symbols-outlined.fill mail
        span &nbsp;&nbsp;New {{emailType}}
    .iconClick.square(@click="()=>{init(true)}" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        .material-symbols-outlined.fill refresh
        span &nbsp;&nbsp;Refresh

Table(:class='{disabled: !user?.email_verified || currentService.service.active <= 0}')
    template(v-slot:head)
        tr(:class="{'nonClickable' : fetching}")
            th(style="width:66px; padding:0;text-align:center;")
                span In-Use
                .resizer
            th
                span(@click='toggleSort("subject")')
                    | Subject
                    span.material-symbols-outlined.fill(v-if='searchFor === "subject"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}
                .resizer
            th
                span(@click='toggleSort("timestamp")')
                    | Date
                    span.material-symbols-outlined.fill(v-if='searchFor === "timestamp"') {{ascending ? 'arrow_drop_down' : 'arrow_drop_up'}}
            th(style="width:66px; padding:0")

    template(v-slot:body)
        template(v-if="fetching")
            tr
                td#loading(colspan="4").
                    Loading {{emailType}} ... &nbsp;
                    #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
            tr(v-for="i in 9")
                td(colspan="4")
        template(v-else-if="!listDisplay || listDisplay.length === 0")
            tr
                td(colspan="4") No {{emailType}} Template
            tr(v-for="i in 9")
                td(colspan="4")
        template(v-else)
            tr.nsrow(v-for="ns in listDisplay" @click='openNewsletter(ns.url)')
                td.overflow
                    template(v-if='currentService.service?.["template_" + group]?.url === ns.url')
                        span.material-symbols-outlined.fill verified
                    template(v-else)
                        span.material-symbols-outlined.icon.clickable.hide(@click.stop="emailToUse = ns") verified
                td.overflow {{ converter(ns.subject) }}
                td.overflow {{ dateFormat(ns.timestamp) }}
                td.center.buttonWrap(@click.stop)
                    span.material-symbols-outlined.fill.clickable.dangerIcon.hide(@click.stop="emailToDelete = ns") delete
            tr(v-for="i in (10 - listDisplay.length)")
                td(colspan="4")

br

.tableMenu(style='display:block;text-align:center;')
    .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': fetching || currentPage <= 1 }")
        .material-symbols-outlined.bold chevron_left
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow(@click="currentPage++;" :class="{'nonClickable': fetching || endOfList && currentPage >= maxPage }")
        span &nbsp;&nbsp;Next
        .material-symbols-outlined.bold chevron_right

Modal(:open="!!emailToDelete")
    h4(style='margin:.5em 0 0;') Delete Email

    hr

    div(style='font-size:.8rem;')
        p.
            Are you sure you want to delete email template:
            #[br]
            "#[b {{ emailToDelete?.subject }}]"?
            #[br]
            #[br]
            This action cannot be undone.

    br

    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        template(v-if='deleteMailLoad')
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine.warning(@click="emailToDelete = null") Cancel
            button.final.warning(@click="deleteEmail(emailToDelete)") Delete

Modal(:open="!!emailToUse")
    h4(style='margin:.5em 0 0;') Set Template

    hr

    div(style='font-size:.8rem;')
        p.
            By clicking confirm, you are setting the email template:
            #[br]
            "#[b {{ emailToUse?.subject }}]"
            #[br]
            as the {{ emailType }} template.

    br

    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        template(v-if='useMailLoad')
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine(@click="emailToUse = null") Cancel
            button.final(@click="useEmail(emailToUse)") Confirm

br
br

</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { currentService } from './main';
import { user } from '@/code/user';
import Code from '@/components/code.vue';
import { dateFormat } from '@/code/admin';
import Table from '@/components/table.vue';
import Modal from '@/components/modal.vue';
import Pager from '@/code/pager';
import { skapi } from '@/code/admin';
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

let emailType: Ref<'Signup Confirmation' | 'Welcome Email' | 'Verification Email' | 'Invitation Email'> = ref('Signup Confirmation');
let emailTypeSelect = [
    {
        value: 'Signup Confirmation',
        option: 'Signup Confirmation'
    },
    {
        value: 'Welcome Email',
        option: 'Welcome Email'
    },
    {
        value: 'Verification Email',
        option: 'Verification Email'
    },
    {
        value: 'Invitation Email',
        option: 'Invitation Email'
    }
]
///////////////////////////////////////////////////////////////////////////////// template history[start]
let pager: Pager = null;

// default form input values

let searchFor: Ref<"timestamp" | "subject"> = ref('timestamp');
let ascending: Ref<boolean> = ref(false);
let emailToDelete: Ref<Newsletter> = ref(null);

// ui/ux related
let fetching = ref(false);
let maxPage = ref(0);
let currentPage = ref(1);
let endOfList = ref(false);
let deleteMailLoad = ref(false);

// list renderer
let listDisplay: Ref<Newsletter[]> = ref(null);

// etc

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
        let prev = ascending.value;
        if (n === 'subject') {
            ascending.value = true;
        }
        if (prev !== ascending.value) {

            if (endOfList.value) {
                resetIndex();
            }
            else {
                init();
            }
        }
    }
});

watch(ascending, () => {
    if (!fetching.value) {
        if (endOfList.value) {
            resetIndex();
        }
        else {
            init();
        }
    }
});

watch(emailType, () => {
    if (!fetching.value) {
        init();
    }
})

let mailEndpoint = ref('');

let group: ComputedRef<'confirmation' | 'welcome' | 'verification' | 'invitation'> = computed(() => {
    let grp: 'confirmation' | 'welcome' | 'verification' | 'invitation' = 'confirmation';
    switch (emailType.value) {
        case 'Signup Confirmation':
            grp = 'confirmation';
            break;

        case 'Welcome Email':
            grp = 'welcome';
            break;
        case 'Verification Email':
            grp = 'verification';
            break;
        case 'Invitation Email':
            grp = 'invitation';
            break;
    }

    mailEndpoint.value = (currentService.service.email_triggers.template_setters as any)[grp];
    return grp;
});

watch(group, n => {
    getHtml(n);
})

// computed fetch params
let callParams = computed(() => {
    let defaultValues = {
        timestamp: {
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
    if (!pager) {
        // if pager is not ready, return
        return;
    }

    if (refresh) {
        endOfList.value = false;
    }

    if (!refresh && maxPage.value >= currentPage.value || endOfList.value) {
        // if is not refresh and has page data
        listDisplay.value = pager.getPage(currentPage.value).list as Newsletter[];
        return;
    }

    else if (!endOfList.value || refresh) {
        // if page data needs to be fetched
        fetching.value = true;

        // fetch from server
        let fetchedData = await currentService.getMailTemplates(callParams.value.params, Object.assign({ fetchMore: !refresh }, callParams.value.options));
        
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
    currentPage.value = 1;
    await pager.resetIndex({
        sortBy: searchFor.value,
        order: ascending.value ? 'asc' : 'desc',
    });

    getPage();
}

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
        group: group.value
    }

    deleteMailLoad.value = true;
    currentService.deleteTemplate(params).then(async () => {
        emailToDelete.value = null;

        if ((currentService.service as any)?.["template_" + group]?.url === ns.url) {
            delete (currentService.service as any)?.["template_" + group];
        }

        await pager.deleteItem(params.message_id);
        getHtml(group.value);
        getPage();
    }).catch(err => window.alert(err)).finally(() => {
        deleteMailLoad.value = false;
    });
}

let useMailLoad = ref(false);
let emailToUse = ref(null);

let useEmail = (ns: Newsletter) => {
    if (!ns) {
        return;
    }

    let params = {
        message_id: ns.message_id,
        group: group.value
    }

    useMailLoad.value = true;
    currentService.setTemplate(params).then(async () => {
        if (!(currentService.service as any)["template_" + group.value])
            (currentService.service as any)["template_" + group.value] = reactive({
                url: ns.url,
                subject: ns.subject
            })
        else {
            (currentService.service as any)["template_" + group.value].url = ns.url;
            (currentService.service as any)["template_" + group.value].subject = ns.subject;
        }

        getHtml(group.value);

        emailToUse.value = null;
    }).catch(err => window.alert(err)).finally(() => {
        useMailLoad.value = false;
    });
}
///////////////////////////////////////////////////////////////////////////////// template history[end]

let service = currentService.service;
let email_templates = currentService.service.email_triggers.template_setters;
let parseOpt: any = reactive({});

let currentTemp = computed(() => {
    return converter(htmls[group.value], parseOpt[group.value], true);
})

let converter = (html: string, parsed: boolean, inv: boolean) => {
    if (!parsed) {
        html = html.replaceAll('style="font-weight: bold"', 'style="font-weight: bold; pointer-events: none;"');
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

let subjects = computed(() => {
    let s = currentService.service;
    return {
        confirmation: s?.template_confirmation?.subject || '[${service_name}] Signup Confirmation',
        welcome: s?.template_welcome?.subject || "Thank you for joining ${service_name}",
        verification: s?.template_verification?.subject || '[${service_name}] Verification code',
        invitation: s?.template_invitation?.subject || '[${service_name}] Invitation'
    }
})

let htmls: { [key: string]: string } = reactive({
    confirmation: null,
    welcome: null,
    verification: null,
    invitation: null
})

let getHtml = async (key: string) => {
    if (!key) {
        return;
    }

    let defaults: { [key: string]: string } = {
        welcome: `
<pre>
<span style="font-weight: bold">Hello \${name}</span>
Thank you for joining \${service_name}
Your login email is: <span style="font-weight: bold">\${email}</span></pre>`,
        verification: '<pre>Your verification code is <span style="font-weight: bold">${code}</span></pre>',
        confirmation: `<pre>
Please activate your account by clicking this <a href="\${link}" style="font-weight: bold">LINK</a>
Your activation link is valid for 7 days.
</pre>`,
        invitation: `
<pre>
Hello \${name}
You are invited to \${service_name}
You can accept the invitation by clicking on this <a href="\${link}" style="font-weight: bold">LINK</a>

Your login e-mail is: <b>\${email}</b>
Your account password is: <b>\${password}</b>

Your activation link is valid for 7 days.
</pre>`
    }

    let url = (service as any)?.['template_' + group.value]?.url;
    if (!url) {
        htmls[key] = defaults[key];
        return;
    }

    let res = await fetch(url);
    let html = await res.text();
    htmls[key] = html;
}

let init = async (refreshService?: boolean) => {
    if (refreshService) {
        fetching.value = true;
        await currentService.refresh();
        service = currentService.service;
        fetching.value = false;
    }
    currentPage.value = 1;

    // setup pagers
    pager = await Pager.init({
        id: 'message_id',
        resultsPerPage: 10,
        sortBy: searchFor.value,
        order: ascending.value ? 'asc' : 'desc',
    });

    getPage(true);
    getHtml(group.value);
}

init();
</script>

<style lang="less" scoped>
.email {
    overflow-x: auto;
    display: flex;
    justify-content: center;

    &>div {
        width: 100%;
    }
}

.plch {
    font-weight: normal
}

ul {
    margin-top: .5rem;
}

li {
    margin-bottom: 8px;
    font-size: .8rem;
}

// table style below

tbody {
    tr.nsrow {
        @media (pointer: fine) {

            // only for mouse pointer devices
            &:not(.active):hover {
                background-color: rgba(41, 63, 230, 0.05);
                // cursor: pointer;
            }
        }

        &.active {
            background-color: rgba(41, 63, 230, 0.10);
        }

        &:hover {
            .hide {
                display: block;
            }
        }

        .hide {
            display: none;
        }
    }
}

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
</style>