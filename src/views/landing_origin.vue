<template lang="pug">
main
    .dynamo-section.main(style='min-height: 80vh; padding:0; margin:0; background-color: #1D2939; border-bottom:1px solid #475467;')
        .sec-wrapper(style='min-height: 80vh;')
            img(src='@/assets/img/logo/logo-white.svg' style='height:2.875rem; margin-bottom:32px;')
            h1.title #[span.yellow Serverless] Backend API
            h1.title(style='margin-bottom:46px;') for HTML Frontend
            p.desc Skapi is a powerful JavaScript library for client-side HTML, <br>enabling you to create fully scalable web applications without backend engineering.

            small For HTML Projects -
            Code
                pre.
                    &lt;#[span(style="color:#33adff") script ] #[span(style="color:#44E9FF") src]=#[span.text-small(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]&gt;&lt;/#[span(style="color:#33adff") script]&gt;

            small For SPA Projects -
            Code(style="margin-bottom: 0.5rem")
                pre npm i skapi-js@latest

            p(style='text-align:right; max-width:950px;')
                small Current Version: {{npmVersion}}

            div.btn-wrap
                a(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank")
                    button.final Read Docs

    .dynamo-section
        .sec-wrapper
            h2.sub-title(data-aos="zoom-out-right" style="font-size:3rem; color:#FFED91;") Build Anything, Fast!
            p.sub-desc(style="max-width:800px; margin-bottom: 3.5rem;") Painstakingly developed to be both simple and powerful, #[span.wordset Skapi empowers] you to build any type of web application, #[span.wordset whether it’s a] #[span.wordset chat app,] #[span.wordset e-commerce platform,] #[span.wordset or your next big SaaS product.]
            p.sub-desc(style="max-width:870px") Just import Skapi library into your project, and you're ready to go.

            small For HTML Projects -
            Code(data-aos="fade-up")
                pre.
                    #[div(style="color:#35B85E") &lt;!-- index.html --&gt;]
                    #[span &lt;!DOCTYPE html&gt;]
                    &lt;#[span(style="color:#33adff") script] #[span(style="color:#44E9FF") src]=#[span(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]&gt;&lt;/#[span(style="color:#33adff") script]&gt;
                    &lt;#[span(style="color:#33adff") script]&gt;
                        #[span(style="color:#44E9FF") const] skapi = #[span(style="color:#44E9FF") new] Skapi&lpar;'#[span(style="color:#FFED91") service_id]', '#[span(style="color:#FFED91") owner_id]'&rpar;;
                    &lt;/#[span(style="color:#33adff") script]&gt;

            small For SPA Projects -
            Code(style="margin-bottom:0" data-aos="fade-up")
                pre.
                    #[div(style="color:#35B85E") // main.js]
                    #[span(style="color:#44E9FF") import] { Skapi } #[span(style="color:#44E9FF") from] '#[span(style="color:#FFED91") skapi-js]';
                    #[span(style="color:#44E9FF") const] skapi = #[span(style="color:#44E9FF") new] Skapi&lpar;'#[span(style="color:#FFED91") service_id]', '#[span(style="color:#FFED91") owner_id]'&rpar;;
                    #[span(style="color:#44E9FF; margin-top:24px; display:inline-block;") export] { Skapi }
                    #[span.text-small(style="color:#35B85E; margin-top:24px; display:inline-block;") // Now you can import skapi from anywhere in your project.]

    .dynamo-section
        .sec-wrapper
            h2.sub-title Features
            p.sub-desc(style="max-width:820px; margin-bottom: 0;") Skapi packs all essential backend services into a single JavaScript library, reducing development time and costs.
            p.sub-desc(style="max-width:830px; margin-bottom: 3.5rem;") Your application will scale effortlessly to millions of users, providing security and flexibility—all accessible through a single #[span.yellow skapi.method( )] call.
            .feature(data-aos="fade-up")
                a.feature-card(href="https://docs.skapi.com/database/introduction.html" target="_blank")
                    .card-top
                        img(src='@/assets/img/landingpage/icon_feature1.svg')
                        span.text Data Storage
                    p.desc A simple, scalable, and flexible database solution at your fingertips, featuring robust, CDN-backed storage for any data size.
                    img.img-feature(src='@/assets/img/landingpage/img_feature1.svg' style="right:19px; bottom:17px")
                a.feature-card(href="https://docs.skapi.com/authentication/introduction.html" target="_blank" style="max-width:35%;")
                    .card-top
                        img(src='@/assets/img/landingpage/icon_feature2.svg')
                        span.text Security
                    p.desc Built-in security and user authentication, ready to deploy without complex configurations.
                    img.img-feature(src='@/assets/img/landingpage/img_feature2.svg' style="right:0; bottom:0;")
            .feature(data-aos="fade-up")
                a.feature-card(href="https://docs.skapi.com/realtime/connecting.html" target="_blank" style="max-width:35%;")
                    .card-top
                        img(src='@/assets/img/landingpage/icon_feature8.svg')
                        span.text Realtime Data
                    p.desc Real-time chat, live updates --everything is just one method call away.
                    img.img-feature(src='@/assets/img/landingpage/img_feature8.svg' style="right:0; bottom:-61px; width:446px;")
                a.feature-card(href="https://docs.skapi.com/api-bridge/introduction.html" target="_blank" )
                    .card-top
                        img(src='@/assets/img/landingpage/icon_feature7.svg')
                        span.text API Bridge
                    p.desc Integrate with 3rd-party APIs with ease, expanding your application’s functionality through secure custom APIs.
                    img.img-feature(src='@/assets/img/landingpage/img_feature7.svg' style="right:0; bottom:0")
            .feature(data-aos="fade-up")
                a.feature-card(href="https://docs.skapi.com/email/introduction.html" target="_blank" style="max-width:50%;")
                    .card-top
                        img(src='@/assets/img/landingpage/icon_feature6.svg')
                        span.text Automated E-Mail service
                    p.desc Simplify email automation and newsletters to stay connected with your users.
                    img.img-feature(src='@/assets/img/landingpage/img_feature6.svg' style="right:30px; bottom:25px; opacity:0.6;")
                a.feature-card(href="https://docs.skapi.com/hosting/hosting.html" target="_blank")
                    .card-top
                        img(src='@/assets/img/landingpage/icon_feature5.svg')
                        span.text Instant Hosting
                    p.desc Swiftly host your public files or HTML website directly with Skapi.
                    img.img-feature(src='@/assets/img/landingpage/img_feature5.svg' style="right:0; bottom:0; opacity:0.8;")

    .dynamo-section(style="padding:6rem 1rem; margin:0;")
        div(v-if='user.user_id' style='text-align:center;' data-aos="fade-up")
            img.symbol(src="@/assets/img/logo/symbol-logo-white.svg" style="image-orientation:none; width:3rem; margin-bottom:2rem;")
            h2(style="margin-bottom:0.6rem;") Start Skapi
            p(style="margin-bottom:2rem;")
                span.wordset
                    | Go to&nbsp;
                    router-link(to='my-services' style='color:#FFED91') My Services
                | &nbsp;and start building!
            router-link(to="my-services")
                button.final(style='background-color:white;width:170px') My Services
        div(v-else style='text-align:center;' data-aos="fade-up")
            img.symbol(src="@/assets/img/logo/symbol-logo-white.svg" style="image-orientation:none; width:3rem; margin-bottom:2rem;")
            h2(style="margin-bottom:0.6rem;") Start Skapi
            p(style="margin-bottom:2rem;")
                span.wordset
                    router-link(to='signup' style='color:#FFED91') Sign-up
                    | &nbsp;today for FREE
                | &nbsp;and start building!
            router-link(to="signup")
                button.final Sign-Up
</template>

<script setup lang="ts">
import Code from "@/components/code.vue";
import { user } from "@/code/user";
import {npmVersion} from "@/main.ts";
</script>

<style lang="less" scoped>
main {
    background-color: #101828;
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
    font-family: 'Radio Canada', serif;
    margin: 11rem 0;

    .yellow {
        color: #FFED91;
    }
    .underline {
        text-decoration: underline;
    }

    .sec-wrapper {
        color: #fff;
        margin: 0 auto;
        padding: 0 1rem;
        max-width: 55rem;
    }

    .title {
        font-size: 3.625rem;
        font-weight: 700;
        margin-bottom: 8px;
        line-height: 1.3;
    }

    .desc {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 3.25rem;
        // max-width: 890px;
    }

    .sub-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
    }

    .sub-desc {
        font-size: 1.2rem;
        color: #D0D5DD;
        margin-bottom: 2.5rem;
    }

    & > * {
        max-width: 100%;
    }

    p,
    li,
    h1,
    h2,
    h3,
    h4 {
        color: white;
        text-shadow: 1px 1px 2px #000;
        margin: 0;
        padding: 0;
    }

    p {
        font-weight: 500;
        text-shadow: none;
    }

    em {
        font-style: normal;
    }

    small {
        display: block;
        font-size: 0.9rem;
        font-weight: 300;
        margin-bottom: 12px;
        color: #D0D5DD;
    }

    ._codeWrap {
        margin-bottom: 38px;
        fill: #fff;

        .code {
            pre {
                display: block;
            }
        }
    }

    .btn-wrap {
        margin-top: 4rem;
        display: flex;
        gap: 1.2rem;
    }

    .final {
        // background-color: #7c5273;
        // background-color: #437964;
        background-color: #fff;
        font-size: 1rem;
        font-weight: 700;
        color: #293FE6;
        min-width: 10.5rem;
    }

    .feature {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;

        &:last-of-type {
            margin-bottom: 0;
        }
    }

    .feature-card {
        display: block;
        padding: 30px 24px;
        border: 1px solid #475467;
        border-radius: 12px;
        background-color: transparent;
        min-height: 357px;
        position: relative;
        flex: 1;
        overflow: hidden;
        transition: all 0.2s ease-in-out;

        &:hover {
            border-color: #fff;
            text-decoration: none;
            transform: translateY(-4px);
        }

        .card-top {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.6rem;

            img {
                height: 2.4rem;
            }
        }

        .text {
            font-size: 1.1rem;
            font-weight: 700;
            color: #fff;
        }

        .desc {
            font-size: 0.9rem;
            font-weight: 500;
            color: rgba(225, 225, 225, 0.8);
            position: relative;
            z-index: 1;
            margin-bottom: 0;
        }

        .img-feature {
            position: absolute;
        }
    }

    &.main {
        .sec-wrapper {
            padding: 10rem 1rem;
        }

        ._codeWrap {
            max-width: 950px;

            .code {
                pre {
                    display: flex;
                    padding: 0 1rem;
                }
            }
        }
    }

    &:nth-last-of-type(2) {
        margin-bottom: 5rem;
    }
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

@media (max-width: 992px) {
    .dynamo-section {
        .feature {
            gap: 1.2rem;
            margin-bottom: 1.2rem;
        }

        .feature-card {
            min-height: fit-content;
            padding: 24px 18px;

            &:hover {
                border-color: #475467;
                transform: translateY(0);
            }

            .img-feature {
                display: none;
            }
        }
    }
}

@media (max-width: 800px) {
    .dynamo-section {
        .sec-wrapper {
            .title {
                font-size: 2.625rem;

                &:nth-of-type(2) {
                    font-size: 1.75rem;
                }
            }
        }

        .feature {
            flex-direction: column;
        }

        .feature-card {
            max-width: 100% !important;

            .card-top {
                margin-bottom: 1rem;
            }
        }

        &.main {
            .sec-wrapper {
                padding: 4rem 1rem;
            }
        }
    }
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

    .dynamo-section {
        margin: 5rem 0;

        &:nth-last-of-type(2) {
            margin-bottom: 0;
        }
        
        .final {
            min-width: 144px;
        }

        .text-small {
            font-size: 12px;
        }
    }
}
</style>
