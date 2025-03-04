<template lang="pug">
main
    .dynamo-section(style='min-height: 80vh;')
        header(style='color:white;width:800px;')
            img(src='@/assets/img/logo/logo-white.svg' style='height:2.875rem;')
            h1.title Serverless Backend API
            h1.title for HTML Frontend

            small For HTML Projects -
            Code(:hidecopy='true')
                pre.
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") script] #[span(style="color:#44E9FF") src]=#[span(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]#[span(style="color:#999") &gt;&lt;/]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]
            br
            small For SPA Projects -
            Code(:hidecopy='true')
                pre npm i skapi-js@latest

            p(style='text-align:right;')
                
                small Current Version: {{npmVersion}}
                br
                a(href='https://docs.skapi.com' target='_blank' style='color:yellow')
                    //- .material-symbols-outlined.notranslate menu_book
                    svg(width="24" height="24" style="fill: yellow; filter: drop-shadow(1px 1px 1px black)")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-menu-book")

                    | &nbsp;Read Docs
            
            br

            div(v-if='user.user_id')
                h4
                    | Go to&nbsp;
                    router-link(to='my-services' style='color:yellow') My Services
                    | &nbsp;#[span.wordset and start] building!
                router-link(to="my-services")
                    button.final(style='background-color:white;color:black;width:170px') My Services
            div(v-else)
                h2
                    router-link(to='signup' style='color:yellow') Sign-up
                    | &nbsp;today for FREE #[span.wordset and start] building!
                router-link(to="signup")
                    button.final(style='background-color:white;color:black;width:170px') Sign-Up
            
        section.intact
            .explain.one
                .image
                    img(src="@/assets/img/landingpage/feature2.png")
                .desc
                    h2 Serverless Technology, #[span.wordset Scale without limits]
                    p.
                        Requires no additional server between your #[span.wordset website and your users.]
                        Just import the API and start building immediately!
            br
            .explain.two
                .image
                    img(src="@/assets/img/landingpage/feature1.png") 
                .desc
                    h2 User-Centric #[span.wordset Database Design]
                    p.
                        Your users own their data, defining access levels and indexing for each piece of data.
                        Skapi introduces a secure, #[span.wordset user-centric database] approach that requires #[span.wordset no pre-configuration.]
            br
            .explain.three
                .image
                    img(src="@/assets/img/landingpage/feature3.png")
                .desc
                    h2 3rd Party API Integration #[span.wordset Made Easy]
                    p Skapi provides the simplest solution to make secure requests to your 3rd-party APIs.

            br
            .explain.four
                .image
                    img(src="@/assets/img/landingpage/frameworks.png")
                .desc
                    h2 Compatible with #[span.wordset Any Frameworks]
                    p Skapi is compatible with vanilla HTML as well as any frontend framework, #[span.wordset including React,] Vue, Angular, and more.
    
    br

    .dynamo-section(style='align-items: flex-start;')
        .intact
            .icoHead
                //- .material-symbols-outlined.notranslate.yellow construction
                svg
                    use(xlink:href="@/assets/img/material-icon.svg#icon-construction")
                h2 Build Anything Fast
            p.
                Skapi is a JavaScript library designed for #[span.wordset client-side] HTML. 
                #[br]
                Painstakingly developed to be simple yet powerful, enabling you to build any type of #[span.wordset web application.]
                #[br]
                #[br]
                Whether it's a real-time chat, #[span.wordset e-commerce,] your next SaaS, or a cool new AI product,
                #[span.wordset you can now create] it all directly from your client-side HTML without needing any backend engineering.
            
            br
            br

            .icoHead
                //- .material-symbols-outlined.notranslate.yellow.fill eco
                svg
                    use(xlink:href="@/assets/img/material-icon.svg#icon-eco-fill")
                h2 Save Time, Cost, #[span.wordset and Energy]
            p.
                We’ve designed Skapi’s backend infrastructure to be lightweight, while our #[span.wordset client-side] library is built to take on more responsibility.
                Saving #[span.wordset data center] energy, helping the environment, and most importantly, reducing your development time and costs.
                #[br]
                #[br]
                Plus, Skapi is designed to protect you from developer mistakes that can cost millions.

            br

            h4
                | Check out our&nbsp;
                a(href='https://docs.skapi.com' target='_blank' style='color:yellow') Documentation
                | &nbsp;
                span.wordset for more information
            a(href="https://docs.skapi.com" target="_blank")    
                button.final(style='background-color:white;color:black;width:170px')
                    //- .material-symbols-outlined.notranslate  menu_book
                    svg(width="24" height="24")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-menu-book")
                    | &nbsp;Read Docs
            
            br
            br

        section.intact
            h2(style='margin:0') Just One #[span.yellow.wordset(style='font-family:monospace') skapi.method()] Call Away...

            ul(style='padding-left: 1.5em;')
                .li
                    //- .material-symbols-outlined.notranslate encrypted
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-encrypted")
                    h3 Secure User Authentication
                    p.
                        Not just log-in or sign-up, but also #[span.wordset data security,] #[span.wordset password recovery,] #[span.wordset email confirmation,] and more. 
                        #[br]
                        Experience how effortless it is to implement all these features with Skapi.
                        
                .li
                    //- .material-symbols-outlined.notranslate database
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-database")
                    h3 User-Centric Database
                    p.
                        Worried about scalability, database schema, or costly errors?
                        #[br]
                        Our new database design has thrown these problems out the window.
                        #[br]
                        Read and write data freely, with no worries.
                
                .li
                    //- .material-symbols-outlined.notranslate router
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-router")
                    h3 Realtime, WebSocket
                    p.
                        Real-time chat, live updates, notifications—
                        #[br]
                        everything is just one method call away. We’ve done the hard work so you can focus on your business.

                .li
                    //- .material-symbols-outlined.notranslate webhook
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-webhook")
                    h3 3rd Party API Integration
                    p.
                        Building an app with third-party APIs?
                        #[br]
                        Skapi hosts your API keys for FREE, so you don’t need a server to manage them.

                .li
                    //- .material-symbols-outlined.notranslate cloud_upload
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-cloud-upload")
                    h3 CDN & File Storage
                    p.
                        Hosting files, images, or videos? Skapi has got you covered
                        #[br]
                        with secure and reliable file storage, served through a global CDN by default.

                .li
                    //- .material-symbols-outlined.notranslate outgoing_mail
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-outgoing-mail")
                    h3 Email System
                    p.
                        Need to send newsletters? Skip the hassle of setting up an SMTP server. 
                        #[br]
                        Skapi provides a simple and reliable email system with no extra configuration needed.

                .li
                    //- .material-symbols-outlined.notranslate public
                    svg
                        use(xlink:href="@/assets/img/material-icon.svg#icon-public")
                    h3 Static Website Hosting
                    p.
                        With Skapi, you can build complex web applications using just static HTML.
                        #[br]
                        Our easy file hosting system lets you host your HTML files effortlessly.
                        #[br]
                        In fact, this entire website is built and hosted with Skapi as well.

    .dynamo-section
        
        div(v-if='user.user_id' style='text-align:center;')
            img.symbol(src="@/assets/img/logo/symbol-logo-white.svg" style="image-orientation: none;width:5em;")
            h2 Start Skapi
            p
                span.wordset
                    | Go to&nbsp;
                    router-link(to='my-services' style='color:yellow') My Services
                | &nbsp;and start building!
            router-link(to="my-services")
                button.final(style='background-color:white;color:black;width:170px') My Services
        div(v-else style='text-align:center;')
            img.symbol(src="@/assets/img/logo/symbol-logo-white.svg" style="image-orientation: none;width:5em;")
            h2 Start Skapi
            p   
                span.wordset
                    router-link(to='signup' style='color:yellow') Sign-up
                    | &nbsp;today for FREE
                | &nbsp;and start building!
            router-link(to="signup")
                button.final(style='background-color:white;color:black;width:170px') Sign-Up

    br
    br
    br
    br

</template>

<script setup lang="ts">
import Code from "@/components/code.vue";
import { user } from "@/code/user";
import {npmVersion} from "@/main.ts";
</script>

<style lang="less" scoped>
main {
    // background: linear-gradient(32deg, #293fe6, rgba(255, 0, 0, 0) 80%),
    //     linear-gradient(229deg, #293fe6, rgba(0, 255, 0, 0) 80%),
    //     linear-gradient(151deg, rgba(0, 255, 170, 1), rgba(252, 208, 75, 0.8) 80%);
    background-color: #1D2939;
    border-bottom: 1px solid #475467;
}
.icoHead {
    position: relative;
    display: flex;
    // align-items: center;
    .material-symbols-outlined {
        position: absolute;
        font-size: 2em;
        color: yellow;
        text-shadow: 1px 1px 1px black;
        top: -4px;
    }
    svg {
        fill:yellow;
        filter: drop-shadow(1px 1px 1px black;);
        width: 2em;
        height: 2em;
    }
    h2 {
        padding-left: 0.5em;
        margin: 0;
    }
    margin-bottom: 1.5rem;
}

.li {
    position: relative;
    .material-symbols-outlined {
        font-size: 1.17em;
        color: yellow;
        position: absolute;
        left: -1.33em;
        top: 2px;
        text-shadow: 1px 1px 1px black;
    }
    h3 {
        margin-bottom: 0;
    }
    p {
        margin-bottom: 2em;
    }
    svg {
      position: absolute;
      width: 1.17em;
      height: 1.17em;
      transform: translateX(-130%) translateY(10%);
      fill:yellow;
      filter: drop-shadow(1px 1px 1px black;);
    }
}

h2,
h3 {
    margin-bottom: 1rem;
}
p {
    font-size: 1.12rem;
}
.dynamo-section {
    .yellow {
        color: yellow;
    }
    .underline {
        text-decoration: underline;
    }
    header {
        color: white;
        width: 800px;
    }

    & > * {
        max-width: 100%;
    }

    header > * {
        color: white;
    }

    p,
    li,
    h1,
    h2,
    h3,
    h4 {
        color: white;
        text-shadow: 1px 1px 2px #000;
    }

    p {
        font-weight: 500;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 3rem;

    padding: 14rem 1rem;
    margin: 0 auto;
    max-width: 80rem;
}

.intact {
    width: 800px;
}

section {
    .image {
        width: 30%;

        img {
            width: 200px;
            max-width: 100%;
        }
    }

    .desc {
        width: 640px;
        z-index: 1;
    }
}

.explain {
    display: flex;
    position: relative;
    gap: 1rem;
}

@media (max-width: 600px) {
    .explain {
        position: relative;

        &::before {
            pointer-events: none;
            position: absolute;
            content: "";
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            background-repeat: no-repeat;
            background-position: right top;
            opacity: 0.2;
        }

        &.one {
            &::before {
                background-size: 9rem;
                background-image: url("@/assets/img/landingpage/feature2.png");
            }
        }

        &.two {
            &::before {
                background-image: url("@/assets/img/landingpage/feature1.png");
                background-size: 10rem;
            }
        }

        &.three {
            &::before {
                background-image: url("@/assets/img/landingpage/feature3.png");
                background-size: 10rem;
            }
        }

        &.four {
            &::before {
                background-size: 9rem;
                background-image: url("@/assets/img/landingpage/frameworks.png");
            }
        }

        .image {
            display: none;
        }
    }
}
</style>
