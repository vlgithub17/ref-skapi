<template lang="pug">
h2 Automated Email

hr

p.
    Automated Emails are sent to users based on their actions or events in the service:
    #[br]
    #[span.wordset Signup Confirmation], #[span.wordset Welcome Email], #[span.wordset Verification Email], and #[span.wordset Invitation Email.]
    #[br]
    You can customize the content of these emails by sending your email template to the endpoint provided below.

p See #[a(href='https://docs.skapi.com/email/email-templates.html' target="_blank") Automated Emails] for more information.

br

section.infoBox
    .infoTitle Signup Confirmation&nbsp;
    
    hr
    
    p.
        Signup Confirmation is sent when the signup requires email verification or when the user tries to recover their disabled account.
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

    hr

    .state
        .smallTitle Template
        a.ellipsis(:href='"mailto:" + email_templates.signup_confirmation' ) {{ email_templates.signup_confirmation }}

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

br

section.infoBox
    .infoTitle Welcome Email&nbsp;
    
    hr
    
    p.
        Welcome Email is sent when the user successfully logs in after the signup confirmation.
        #[span.wordset If the signup did not require any signup confirmation, Welcome Email will not be sent]

    small Optional Placeholder
    ul
        li #[b ${email}] - User email
        li #[b ${name}] - User name, normaled to users email if not provided
        li #[b ${service_name}] - Service name

    hr

    .state
        .smallTitle Endpoint
        a.ellipsis(:href='"mailto:" + email_templates.welcome' ) {{ email_templates.welcome }}
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

br

section.infoBox
    .infoTitle Verification Email&nbsp;

    hr

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

    hr

    .state
        .smallTitle Endpoint
        a.ellipsis(:href='"mailto:" + email_templates.verification' ) {{ email_templates.verification }}
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

br

section.infoBox
    .infoTitle Invitation Email&nbsp;

    hr
    
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

    hr

    .state
        .smallTitle Endpoint
        a.ellipsis(:href='"mailto:" + email_templates.invitation' ) {{ email_templates.invitation }}
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

</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { currentService } from './main';
import { user } from '@/code/user';
let service = currentService.service;
let email_templates = currentService.service.email_triggers.template_setters;

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