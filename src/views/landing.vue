<template lang="pug">
main
    .dynamo-section.main.center
        //- p(style="color:var(--main-color); font-weight:500; font-size:14px;") BACKEND API
        img.symbol(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo" style="height: 44px;")

        br
        br

        .title.faktum Serverless #[span.wordset Backend API]
        .title.faktum for HTML Frontend

        p.desc Skapi is a fully serverless backend API that works seamlessly with pure HTML and JavaScript—no complex installations, no backend configurations, and no database management required.

        .vscode
            .header
                .circle
                    .cir
                    .cir
                    .cir
                .route 
                    span(style="color:#E37834; margin-right:4px") <>
                    span index.html
                .copy(@click="copyVscode")
                    svg(height="16" width="16" style="margin-left: 5px;")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-file-copy-fill")
            .body
                pre.
                    #[span(style="color:#999") &lt;!]#[span(style="color:#33adff") DOCTYPE] #[span(style="color:#44E9FF") html]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") html]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") head]#[span(style="color:#999") &gt;]
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") script] #[span(style="color:#44E9FF") src]=#[span(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]#[span(style="color:#999") &gt;&lt;/]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") head]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") body]#[span(style="color:#999") &gt;]
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]
                            #[span(style="color:#33adff") const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "your_service_id"], #[span(style="color:#FFED91") "your_owner_id"]);
                        #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") body]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") html]#[span(style="color:#999") &gt;]
            .copied Copied! 👏

    .dynamo-section.center
        .title.faktum Works Seamlessly
        .title.faktum with Pure HTML

        .desc No need for complex JavaScript just to handle user input—Skapi fully embraces pure HTML forms, making backend interaction as simple as submitting a form.

        TabMenu(v-model="activeTabs.pureHTML" :tabs="['User Login', 'Uploading Data & Files']")

        .vscode
            .header
                .circle
                    .cir
                    .cir
                    .cir
                .route 
                    span(style="color:#E37834; margin-right:4px") <>
                    template(v-if="activeTabs.pureHTML === 0")
                        span login.html
                    template(v-if="activeTabs.pureHTML === 1")
                        span upload.html
                .copy(@click="copyVscode")
                    svg(height="16" width="16" style="margin-left: 5px;")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-file-copy-fill")
            .body
                template(v-if="activeTabs.pureHTML === 0")
                    pre.
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form ]#[span(style="color:#9CDCFE") action]=#[span(style="color:#CE9178") "welcome.html" ]#[span(style="color:#9CDCFE") onsubmit]=#[span(style="color:#CE9178") "skapi.login(event)"]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                                Email#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") type]=#[span(style="color:#CE9178") "email" ]#[span(style="color:#9CDCFE") name]=#[span(style="color:#CE9178") "email" ]#[span(style="color:#9CDCFE") required]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                                Password#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") type]=#[span(style="color:#CE9178") "password" ]#[span(style="color:#9CDCFE") name]=#[span(style="color:#CE9178") "password" ]#[span(style="color:#9CDCFE") required]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") type]=#[span(style="color:#CE9178") "submit" ]#[span(style="color:#9CDCFE") value]=#[span(style="color:#CE9178") "Login"]#[span(style="color:#999") &gt;]
                        #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]
                template(v-if="activeTabs.pureHTML === 1")
                    pre.
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form ]#[span(style="color:#9CDCFE") onsubmit]=#[span(style="color:#CE9178") "skapi.postRecord(event, { table: 'my_photos' }).then(res => alert('Success!') )"]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") name]=#[span(style="color:#CE9178") "picture" ]#[span(style="color:#9CDCFE") type]=#[span(style="color:#CE9178") "file"]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                                Description#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") name]=#[span(style="color:#CE9178") "description" ]#[span(style="color:#9CDCFE") placeholder]=#[span(style="color:#CE9178") "Enter description"]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") type]=#[span(style="color:#CE9178") "submit" ]#[span(style="color:#9CDCFE") value]=#[span(style="color:#CE9178") "Upload"]#[span(style="color:#999") &gt;]
                        #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]
            .copied Copied! 👏
    .dynamo-section.center.wide
        .title.faktum Everything You Need in One API

        .desc Skapi simplifies backend development by bundling essential services into a single JavaScript library, dramatically reducing development time and costs.

        .tab-icon
            .icon-wrap
                .icon(:class="{'active' : selectedIcon === 'Authentication'}" @click="selectedIcon = 'Authentication'")
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-encrypted-fill")
                .icon(:class="{'active' : selectedIcon === 'Database'}" @click="selectedIcon = 'Database'")
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-database-fill")
                .icon(:class="{'active' : selectedIcon === 'File Storage'}" @click="selectedIcon = 'File Storage'")
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-cloud-upload-fill")
                .icon(:class="{'active' : selectedIcon === 'CDN'}" @click="selectedIcon = 'CDN'")
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-public")
                .icon(:class="{'active' : selectedIcon === 'Realtime Data'}" @click="selectedIcon = 'Realtime Data'")
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-wifi-fill")
                .icon(:class="{'active' : selectedIcon === 'API Bridge'}" @click="selectedIcon = 'API Bridge'")
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-graph-fill")
                .icon(:class="{'active' : selectedIcon === 'Automated Emails'}" @click="selectedIcon = 'Automated Emails'")
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-mail-fill")
                .icon(:class="{'active' : selectedIcon === 'Website Hosting'}" @click="selectedIcon = 'Website Hosting'")
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-language")

            .icon-content
                span.tit.faktum {{ selectedIcon }}
                span.des {{ selectedIconDesc[selectedIcon] }}
            
            //- p(style="margin:0; padding:0; margin-top:1rem") All fully serverless, requiring zero backend setup or deployment.
    
    .dynamo-section.center
        .change-toggle(:class="{'motion': hoverFramework}")
            img.skapi(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo")
            .fade-dot-wrap
                .dot
                .dot
                .dot
            img(v-if="hoverFramework === null" src="@/assets/img/icon/javascript.png" alt="Javascript logo")
            img(v-else-if="hoverFramework === 'react'" src="@/assets/img/icon/react.png" alt="React logo")
            img(v-else-if="hoverFramework === 'angular'" src="@/assets/img/icon/angular.png" alt="Angular logo")
            img(v-else-if="hoverFramework === 'vue'" src="@/assets/img/icon/vue.png" alt="Vue logo")
            img(v-else-if="hoverFramework === 'html'" src="@/assets/img/icon/html.png" alt="Html logo")

        .title.faktum Built with TypeScript,
        .title.faktum Compatible with Any JS Framework

        .desc Skapi is compatible with Vue.js, React, Angular, and more, providing pre-built templates for various frameworks. It also works seamlessly with plain HTML without requiring any dependencies.

        .card-wrap
            .card(@mouseenter="hoverFramework = 'react'" @mouseleave="hoverFramework = null")
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    img.icon(src="@/assets/img/icon/react.png" alt="React logo")
                    .content
                        p.big React
                        p.small Javascript
            //- .card(style="padding: 0.5rem")
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    .change-toggle
                        img.skapi(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo")
                        //- svg.rotate(style="fill:var(--main-color); height: 15px; width: 15px")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-cached")
                        .fade-dot-wrap
                            .dot
                            .dot
                            .dot
                        img(src="@/assets/img/icon/react.png" alt="React logo")
                    .content
                        p.big React
                        p.small Javascript
            .card(@mouseenter="hoverFramework = 'angular'" @mouseleave="hoverFramework = null")
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    img.icon(src="@/assets/img/icon/angular.png" alt="Angular logo")
                    .content
                        p.big Angular
                        p.small Javascript
            .card(@mouseenter="hoverFramework = 'vue'" @mouseleave="hoverFramework = null")
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    img.icon(src="@/assets/img/icon/vue.png" alt="Vue logo")
                    .content
                        p.big Vue
                        p.small Javascript
            .card(@mouseenter="hoverFramework = 'html'" @mouseleave="hoverFramework = null")
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    img.icon(src="@/assets/img/icon/html.png" alt="Html logo")
                    .content
                        p.big Html
                        p.small Html

    .dynamo-section.center
        .title.faktum Pricing Plans

        TabMenu(v-model="activeTabs.plan" :tabs="['Monthly', 'Limited']")

        .plan-wrap.card-wrap
            template(v-if="activeTabs.plan === 0")
                //- .plan
                    .card
                        .title Trial
                        .price
                            .faktum $19
                            span /mo
                        .desc Suits best for hobby use for small projects #[span.wordset or businesses.]
                        button.final(type="button") Get
                    ul.provides
                        li 10K User Accounts
                        li 4GB Database Storage
                        li 50GB File Storage
                .plan
                    .card
                        .title Standard 
                        .price
                            .faktum $19
                            span /mo
                        .desc Suits best for hobby use for small projects #[span.wordset or businesses.]
                        button.final(type="button") Get
                    ul.provides
                        li 10K User Accounts
                        li User Invitation System
                        li Website Hosting
                        li 8GB Database Storage
                        li 100GB File Storage & Subdomain Hosting
                        li Automated Emails & Sending Bulk Emails
                        li 1GB Email Storage
                .plan
                    .card
                        .title Premium 
                        .price
                            .faktum $89
                            span /mo
                        .desc Empower your business with formcarry, #[span.wordset for big businesses]
                        button.final(type="button") Get
                    ul.provides
                        li Includes all Standard Plan features
                        li 100K User Accounts
                        li 100GB Database Storage
                        li 1TB File Storage & Subdomain Hosting
                        li 10GB Email Storage
            template(v-else)
                .card
                    .title 🚀 Limited-Time Offer
                    .price
                        .faktum $300
                        span /only-once
                    .desc Get lifetime access #[span.wordset to the Standard plan] #[span.wordset for just $300—upgrade anytime #[span.wordset as your needs grow.]]
                    button.final(type="button") Get

    .dynamo-section.center
        .title.faktum Try Skapi for Free!
        .desc We offer a free trial so you can start building today
        .plan-wrap.card-wrap(style="max-width: 400px")
            .plan
                .card
                    .title Trial
                    .price
                        .faktum $19
                        span /mo
                    .desc Suits best for hobby use for small projects #[span.wordset or businesses.]
                    button.final(type="button") Get
                ul.provides
                    li 10K User Accounts
                    li 4GB Database Storage
                    li 50GB File Storage
        //- .trial-card
            .left
                .title Trial
                .price
                    .faktum FREE
                    span /mo
                button.final(type="button") Get Started
            .right
                ul.provides
                    li 10K User Accounts
                    li 4GB Database Storage
                    li 50GB File Storage
    
    .dynamo-section.center.wide
        .title.faktum Start Building Today!

        .desc Experience the serverless backend development #[strong.wordset 🚀 No servers. No deployment. Just pure HTML & JavaScript.]

        button.final(type="button") Get Started

    br
    br
    br
    br
    br
    br

</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { npmVersion } from "@/main.ts";
import { user } from "@/code/user";

import Code from "@/components/code.vue";
import TabMenu from '@/components/tab.vue';

let activeTabs = ref({
    pureHTML: 0,
    plan: 0,
});

let selectedIcon = ref("Authentication");

let selectedIconDesc = {
    "Authentication": "Secure, AWS Cognito-based user management",
    "Database": "Scalable, auto-indexing database",
    "File Storage": "Reliable, S3-based storage",
    "CDN": "Deliver content globally with ease",
    "Realtime Data": "Instant WebRTC and WebSocket implementation",
    "API Bridge": "Connect external APIs effortlessly",
    "Automated Emails": "Built-in email automation & sending bulk emails",
    "Website Hosting": "Easy file & website hosting",
}

let hoverFramework = ref(null);

let copyVscode = (e) => {
    // console.log(e.currentTarget)
    // let allcopy = document.querySelectorAll('.copyMsg');
    // for (let i = 0; i < allcopy.length; i++) {
    //     allcopy[i].textContent = 'Copy code';
    // }
    let code = e.currentTarget.parentElement.nextElementSibling.querySelector('.body > pre');
    let doc = document.createElement('textarea');
    doc.textContent = code.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand('copy');
    doc.remove();

    let copied = e.currentTarget.parentElement.parentElement.querySelector('.copied');
    copied.classList.add('show');
    setTimeout(() => {
        copied.classList.remove('show');
    }, 1000);
}
</script>

<style lang="less" scoped>
.dynamo-section {
    max-width: 1200px;
    margin: 11rem auto;
    padding: 0 20px;

    &.center {
        text-align: center;

        .desc {
            margin: 0 auto;
            margin-bottom: 1rem;
        }
    }

    &.wide {
        max-width:unset;
        background-color:rgb(247, 249, 252);
        margin: 0 20px;
        border-radius: 24px;
        padding: 5rem 20px;
    }

    &.main {
        margin-top: 5rem;
        margin-bottom: 0;

        .title {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    }

    .title {
        font-size: 2.4rem;
        margin-bottom: 1rem;
    }

    .desc {
        max-width: 570px;
        margin-bottom: 1rem;
        line-height: 1.9;
        color: #333;
    }
}

.vscode {
    position: relative;
    max-width: 570px;
    height: 340px;
    margin: 0 auto;
    border-radius: 12px;
    background-color: #181818;
    overflow: hidden;

    .header {
        position: relative;
        padding: 6px 0;
        border-bottom: 1px solid #2b2b2b;
        display: flex;
        align-items: center;
        justify-content: center;

        .circle {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 8px;

            .cir {
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #FF605C;

                &:nth-child(2) {
                    background-color: #FFBD44;
                }

                &:nth-child(3) {
                    background-color: #28CA41;
                }
            }
        }

        .route {
            width: 50%;
            color: #fff;
            background-color: #242424;
            border: 1px solid #454545;
            border-radius: 6px;
            font-size: 14px;
            padding: 4px 0;
        }

        .copy {
            position: absolute;
            right: 16px;
            bottom: calc(0px - 24px - 0.8rem);
            fill: #fff;
            cursor: pointer;
            transition: all .3s;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
    .body {
        height: 300px;
        text-align: left;
        background-color: #1f1f1f;
        border-radius: 0 0 12px 12px;
        box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
        color: #FFF;
        overflow: auto;

        pre {
            font-family: 'Space Mono', monospace;
            align-items: center;    
            font-size: 16px;
            margin: 0;
            padding: 0.8rem 1rem;
            min-height: 44px;
        }
    }
    .copied {
        position: absolute;
        background-color: #fff;
        color: var(--main-color);
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        transition: all .3s;
        font-size: 0.7rem;
        padding: 6px 20px;
        border-radius: 6px;
        z-index: 9;

        &.show {
            bottom: 12px;
        }
    }
}

@keyframes scaleBounce{
    from { transform:scale(1) }
    to { transform:scale(1.08) }
}

@keyframes loadingFade {
    0% { opacity: 0; transform:scale(1) }
    50% { opacity: 0.8; transform:scale(1.3) }
    100% { opacity: 0; transform:scale(1) }
}

.card-wrap {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .card {
        flex-grow: 1;
        width: 48%;
        min-width: 250px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 12px;
        padding: 1rem;
        transition: all .3s;
        cursor: pointer;

        &:hover {
            // border-color: var(--main-color);
            box-shadow: 1px 1px 10px rgba(0,0,0, 0.05);
        }

        &.dark {
            // background-color: var(--main-color);
            // background: linear-gradient(to right, rgb(11, 53, 218), rgb(172, 250, 5), rgb(172, 250, 5), rgb(11, 53, 218));
            // color: #fff;
        }
        
        a {
            display: flex;
            align-items: center;
            gap: 1rem;
            text-decoration: none;
            color: #333;
        }

        // .change-toggle {
        //     // position: relative;
        //     display: flex;
        //     align-items: center;
        //     background-color: rgba(0,0,0,0.03);
        //     border-radius: 12px;
        //     padding: 0.7rem;
        //     gap: 0.8rem;

        //     img {
        //         width: 2.5rem;

        //         &.skapi {
        //             width: 2rem;
        //         }
        //     }
        //     .fade-dot-wrap {
        //         .dot {
        //             display: inline-block;
        //             vertical-align: middle;
        //             width: 6px;
        //             height: 6px;
        //             margin: 0 4px;
        //             background: #333;
        //             border-radius: 50%;
        //             opacity: 0.5;
        //         }
        //     }
        // }

        .icon {
            width: 3rem;
            height: 3rem;
        }
        .content {
            text-align: left;

            p {
                margin: 0;

                &.small {
                    font-size: 0.8rem;
                    color: rgba(0,0,0,0.5);
                }
            }
        }
    }
}

.change-toggle {
    // position: relative;
    display: inline-flex;
    margin-bottom: 1rem;
    align-items: center;
    background-color: rgb(247, 249, 252);
    border-radius: 12px;
    padding: 0.7rem;
    gap: 0.8rem;

    &.motion {
        img {
            animation: scaleBounce .5s alternate infinite;
        }
        .fade-dot-wrap {
            .dot {
                animation: loadingFade 1s infinite;

                &:nth-child(1) {
                    animation-delay: 0s;
                }

                &:nth-child(2) {
                    animation-delay: 0.1s;
                }

                &:nth-child(3) {
                    animation-delay: 0.2s;
                }
            }
        }
    }
    img {
        width: 2.5rem;

        &.skapi {
            width: 2rem;
        }
    }
    .fade-dot-wrap {
        .dot {
            display: inline-block;
            vertical-align: middle;
            width: 6px;
            height: 6px;
            margin: 0 4px;
            background: #333;
            border-radius: 50%;
            opacity: 0.5;
        }
    }
}

.plan-wrap {
    // max-width: unset;
    align-items: start;

    .plan {
        // width: 48%;
        width: 31%;
        min-width: 250px;
        flex-grow: 1;

        // &.trial {
        //     width: 48%;
        //     display: flex;
        //     flex-wrap: wrap;

        //     .card {
        //         width: 48% !important;
        //     }
        // }
    }
    .card {
        width: 100% !important;
    }
    .title {
        font-size: 1rem;
    }
    .price {
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin-bottom: 1rem;

        .faktum {
            font-size: 2.4rem;
            margin-right: 0.5rem;
        }
        span {
            color: #888
        }
    }
    .desc {
        margin: 0;
        line-height: 1.4;
        font-size: 0.8rem;
        color: #777;
    }
    button {
        width: 100% !important;
    }
}

.provides {
    li {
        position: relative;
        list-style: none;
        text-align: left;
        margin-bottom: 0.5rem;
        font-size: 0.8rem;

        &::before {
            position: absolute;
            content: '';
            left: -1.3rem;
            top: 0.1rem;
            background: url('@/assets/img/icon/check.svg') no-repeat;
            background-size: cover;
            width: 16px;
            height: 16px;
            opacity: 0.8;
        }
    }
}

.trial-card {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    > div {
        flex-grow: 1;
    }
    .left {
        border: 1px solid rgba(0,0,0,0.05);
        border-radius: 12px;
        padding: 1rem;
    }
    .title {
        font-size: 1rem;
    }
    .price {
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin-bottom: 1rem;

        .faktum {
            font-size: 2.4rem;
            margin-right: 0.5rem;
        }
        span {
            color: #888
        }
    }
}

.icon-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .icon {
        &.active {
            svg {
                fill: var(--main-color);
            }
        }
    }
    svg {
        width: 2.2rem;
        height: 2.2rem;
        fill: rgb(213 215 218);
        cursor: pointer;
        transition: all .3s;

        &:hover {
            fill: var(--main-color);
            transform: scale(1.1);
        }
    }
}

.icon-content {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 24px;
    border: 1px solid #F0F2FA;
    background: #fff;

    .tit {
        margin-bottom: 0.5rem;
        color: var(--main-color);
        display: block;
        font-weight: bold;
    }
    .des {
        font-size: 0.9rem;
        color: #555;
    }
}
</style>
