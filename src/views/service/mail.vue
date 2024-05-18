<template lang="pug">
h2(style='margin-bottom: 0')
    | Automated Email:
    | &nbsp;
    .customSelect(style='display: inline-block; min-width: 220px; vertical-align: middle' @click.stop="(e)=>{showDropDown(e)}")
        button(type='button')
            span {{ emailType }}
            span.material-symbols-outlined arrow_drop_down
        .moreVert(style="--moreVert-left:0;display:none")
            .inner(style="padding:0.8rem;padding-right:1rem")
                .more(@click="emailType = 'Signup Confirmation'") Signup Confirmation
                .more(@click="emailType = 'Welcome Email'") Welcome Email
                .more(@click="emailType = 'Verification Email'") Verification Email
                .more(@click="emailType = 'Invitation Email'") Invitation Email

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

    p(style='margin-bottom: 0').
        You can customize the email by sending the template to the #[a(:href='"mailto:" + email_templates.signup_confirmation') email address] provided below:

    Code
        pre {{ email_templates.signup_confirmation }}

    p.
        For customizing the email template, see #[a(href='https://docs.skapi.com/email/email-templates.html' target="_blank") Automated Emails] for more information.

    section.infoBox
        .state
            .smallTitle Subject
            .ellipsis {{ converter(signup_confirmation.subject, parseOpt.signup) }}

        .state
            .smallTitle Content
            small.editHandle(:style='{color: parseOpt.signup ? "black" : null}' @click='parseOpt.signup = true') [Parsed]
            span &nbsp;|&nbsp;
            small.editHandle(:style='{color: !parseOpt.signup ? "black" : null}' @click='parseOpt.signup = false') [Original]

        .email
            div(v-if='signup_confirmation.html === null') ...
            div(v-else v-html='converter(signup_confirmation.html, parseOpt.signup)')


template(v-if='emailType === "Welcome Email"')
    p.
        Welcome Email is sent when the user successfully logs in after the signup confirmation.
        #[span.wordset If the signup did not require any signup confirmation, Welcome Email will not be sent]

    small Optional Placeholder
    ul
        li #[b ${email}] - User email
        li #[b ${name}] - User name, normaled to users email if not provided
        li #[b ${service_name}] - Service name

    p(style='margin-bottom: 0').
        You can customize the email by sending the template to the #[a(:href='"mailto:" + email_templates.signup_confirmation') email address] provided below:
    Code
        pre {{ email_templates.signup_confirmation }}

    p.
        For customizing the email template, see #[a(href='https://docs.skapi.com/email/email-templates.html' target="_blank") Automated Emails] for more information.

    section.infoBox
        .state
            .smallTitle Subject
            .ellipsis {{ converter(welcome.subject, parseOpt.welcome) }}

        .state
            .smallTitle Content
            small.editHandle(:style='{color: parseOpt.welcome ? "black" : null}' @click='parseOpt.welcome = true') [Parsed]
            span &nbsp;|&nbsp;
            small.editHandle(:style='{color: !parseOpt.welcome ? "black" : null}' @click='parseOpt.welcome = false') [Original]

        .email
            div(v-if='welcome.html === null') ...
            div(v-else v-html='converter(welcome.html, parseOpt.welcome)')


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

    p(style='margin-bottom: 0').
        You can customize the email by sending the template to the #[a(:href='"mailto:" + email_templates.signup_confirmation') email address] provided below:

    Code
        pre {{ email_templates.signup_confirmation }}

    p.
        For customizing the email template, see #[a(href='https://docs.skapi.com/email/email-templates.html' target="_blank") Automated Emails] for more information.

    section.infoBox
        .state
            .smallTitle Subject
            .ellipsis {{ converter(verification.subject, parseOpt.verification) }}
        .state
            .smallTitle Content
            small.editHandle(:style='{color: parseOpt.verification ? "black" : null}' @click='parseOpt.verification = true') [Parsed]
            span &nbsp;|&nbsp;
            small.editHandle(:style='{color: !parseOpt.verification ? "black" : null}' @click='parseOpt.verification = false') [Original]

        .email
            div(v-if='verification.html === null') ...
            div(v-else v-html='converter(verification.html, parseOpt.verification)')


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
        You can customize the email by sending the template to the #[a(:href='"mailto:" + email_templates.signup_confirmation') email address] provided below:

    Code
        pre {{ email_templates.signup_confirmation }}

    p.
        For customizing the email template, see #[a(href='https://docs.skapi.com/email/email-templates.html' target="_blank") Automated Emails] for more information.

    section.infoBox
        .state
            .smallTitle Subject
            .ellipsis {{ converter(invitation.subject, parseOpt.invitation) }}
        .state
            .smallTitle Content
            small.editHandle(:style='{color: parseOpt.invitation ? "black" : null}' @click='parseOpt.invitation = true') [Parsed]
            span &nbsp;|&nbsp;
            small.editHandle(:style='{color: !parseOpt.invitation ? "black" : null}' @click='parseOpt.invitation = false') [Original]

        .email
            div(v-if='invitation.html === null') ...
            div(v-else v-html='converter(invitation.html, parseOpt.invitation, true)')

br
br

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { currentService } from './main';
import { user } from '@/code/user';
import { showDropDown } from '@/assets/js/event.js'
import Code from '@/components/code.vue';

let service = currentService.service;
let email_templates = currentService.service.email_triggers.template_setters;
let emailType: Ref<string> = ref('Signup Confirmation');
let parseOpt = reactive({});

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

let welcome = reactive({
    subject: service?.template_welcome?.subject || "Thank you for joining ${service_name}",
    html: null
})

if (!service.template_welcome?.url) {
    welcome.html = `
<pre>
<span style="font-weight: bold">Hello \${name}</span>
Thank you for joining \${service_name}
Your login email is: <span style="font-weight: bold">\${email}</span></pre>`;

}
else {
    fetchHTML(service.template_welcome.url).then((html) => {
        welcome.html = html;
    });
}

let verification = reactive({
    subject: service?.template_verification?.subject || '[${service_name}] Verification code',
    html: null
})

if (!service.template_verification?.url) {
    verification.html = '<pre>Your verification code is <span style="font-weight: bold">${code}</span></pre>';
}
else {
    fetchHTML(service.template_verification.url).then((html) => {
        verification.html = html;
    });
}

let signup_confirmation = reactive({
    subject: service?.template_signup_confirmation?.subject || '[${service_name}] Signup Confirmation',
    html: null
})

if (!service.template_signup_confirmation?.url) {
    signup_confirmation.html = `<pre>
Please activate your account by clicking this <a href="\${link}" style="font-weight: bold">LINK</a>
Your activation link is valid for 7 days.
</pre>`;
}

else {
    fetchHTML(service.template_signup_confirmation.url).then((html) => {
        signup_confirmation.html = html;
    });
}

let invitation = reactive({
    subject: service?.template_invitation?.subject || '[${service_name}] Invitation',
    html: null
})

if (!service.template_invitation?.url) {
    invitation.html = `
<pre>
Hello \${name}
You are invited to \${service_name}
You can accept the invitation by clicking on this <a href="\${link}" style="font-weight: bold">LINK</a>

Your login e-mail is: <b>\${email}</b>
Your account password is: <b>\${password}</b>

Your activation link is valid for 7 days.
</pre>`
}
else {
    fetchHTML(service.template_invitation.url).then((html) => {
        invitation.html = html;
    });
}

async function fetchHTML(url: string) {
    let res = await fetch(url);
    let html = await res.text();
    return html;
}

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
</style>