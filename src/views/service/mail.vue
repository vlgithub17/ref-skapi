<template lang="pug">
#mail
    section.infoBox
        .infoTitle Automated Emails
        
        br
        br

        .smallValue Automated emails are sent to your users when certain events occur. You can customize the content of these emails by sending your customized version of the email to the addresses below. For more information refer the 
            a(href="https://docs.skapi.com/email/email-templates.html" target="_blank" style="font-weight:700") Documentation

        br

        div(style="display:block; text-align:right")
            .sentenceButton 
                span Learn more about placeholder

        br

        .mail
            .title Welcome Email 
            .desc The user receives this email when they signup, and have successfully verified their email, and logged in for the first time.
            br
            .endpoint 
                .smallTitle Endpoint 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.fill file_copy
            .smallValue service endpoint
            br
            .smallTitle Subject 
            .smallValue service welcome email design

        br

        .mail
            .title Verification Email
            .desc The user receives this email when they verifes their email or when they request forgot password.
            br
            .endpoint 
                .smallTitle Endpoint 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.fill file_copy
            .smallValue service endpoint
            br
            .smallTitle Subject 
            .smallValue service welcome email design
            br
            .smallTitle Required Placeholder
            .smallValue ${code}
        
        br

        .mail
            .title Signup Confirmation Email
            .desc The user receives this email when they are requested for confirmation on signup.
            br
            .endpoint 
                .smallTitle Endpoint 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.fill file_copy 
            .smallValue service endpoint
            br
            .smallTitle Subject 
            .smallValue service welcome email design
            br
            .smallTitle Required Placeholder
            .smallValue ${link}

        br

        .mail
            .title Invitation Email
            .desc The user receives this email when they are invited to the service.
            br
            .endpoint 
                .smallTitle Endpoint 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.fill file_copy
            .smallValue service endpoint
            br
            .smallTitle Subject 
            .smallValue service welcome email design
            br
            .smallTitle Required Placeholder
            .smallValue ${password}, ${email}

    br

    section.infoBox
        .infoTitle Automated Emails

        br
        br

        .smallValue Automated emails are sent to your users when certain events occur. You can customize the content of these emails by sending your customized version of the email to the addresses below. For more information refer the 
            a(href="https://docs.skapi.com/email/newsletters.html" target="_blank" style="font-weight:700") Documentation

        br
        br

        .mail 
            .title Public Newsletter
            br
            .endpoint 
                .smallTitle Endpoint 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.fill file_copy
            .smallValue service endpoint
        br

        .mail
            .title Service User Newsletter
            br
            .endpoint 
                .smallTitle Endpoint 
                .copy.clickable(@click="copy")
                    .material-symbols-outlined.fill file_copy
            .smallValue service endpoint
</template>

<script setup lang="ts">
let copy = (e) => {
    let currentTarget = e.currentTarget;
    let doc = document.createElement('textarea');
    doc.textContent = e.currentTarget.previousSibling.parentNode.nextSibling.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    e.currentTarget.classList.add('copied');
    setTimeout(() => {
        currentTarget.classList.remove('copied');
    }, 1000);
}
</script>

<style lang="less" scoped>
.smallTitle {
    font-weight: 500;
}
.smallValue {
    margin-top: 8px;
}
.endpoint {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.mail {
    position: relative;
    padding: 1.5rem;
    background-color: rgba(0,0,0,0.03);
    border-radius: 8px;

    .title {
        font-weight: 700;
        color: var(--black-6)
    }
    .desc {
        font-size: 0.8rem;
        margin-top: 0.5rem;
        color: var(--black-4);
    }
}
</style>