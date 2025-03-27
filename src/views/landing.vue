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
                .copy
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

    .dynamo-section.center
        .title.faktum Works Seamlessly
        .title.faktum with Pure HTML

        .desc No need for complex JavaScript just to handle user input—Skapi fully embraces pure HTML forms, making backend interaction as simple as submitting a form.

        .tab-menu
            ul
                li(ref="tab1" @click="(e) => {activeMenu = e.target}") User Login
                li(ref="tab2" @click="(e) => {activeMenu = e.target}") Uploading Data & Files
                .active-menu(ref="activeTabMenu")

        br

        .vscode
            .header
                .circle
                    .cir
                    .cir
                    .cir
                .route 
                    span(style="color:#E37834; margin-right:4px") <>
                    template(v-if="activeMenu === tab1")
                        span login.html
                    template(v-if="activeMenu === tab2")
                        span upload.html
            .body
                template(v-if="activeMenu === tab1")
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
                template(v-if="activeMenu === tab2")
                    pre.
                        #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form ]#[span(style="color:#9CDCFE") onsubmit]=#[span(style="color:#CE9178") "skapi.postRecord(event, { table: 'my_photos' }).then(res => alert('Success!') )"]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") name]=#[span(style="color:#CE9178") "picture" ]#[span(style="color:#9CDCFE") type]=#[span(style="color:#CE9178") "file"]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
                                Description#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") name]=#[span(style="color:#CE9178") "description" ]#[span(style="color:#9CDCFE") placeholder]=#[span(style="color:#CE9178") "Enter description"]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                            #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") type]=#[span(style="color:#CE9178") "submit" ]#[span(style="color:#9CDCFE") value]=#[span(style="color:#CE9178") "Upload"]#[span(style="color:#999") &gt;]
                        #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

    .dynamo-section.center
        .title.faktum Built with TypeScript,
        .title.faktum Compatible with Any JS Framework

        .desc Skapi is compatible with Vue.js, React, Angular, and more, providing pre-built templates for various frameworks. It also works seamlessly with plain HTML without requiring any dependencies.

        .card-wrap
            //- .icon-card 
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    img.icon(src="@/assets/img/icon/react.png" alt="React logo")
                    .content
                        p.big React
                        p.small Javascript
            .icon-card(style="padding: 0.5rem")
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    .change-toggle
                        img.skapi(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo")
                        svg.rotate(style="fill:var(--main-color); height: 15px; width: 15px")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-cached")
                        //- .dot-wrap
                            span.dot .
                            span.dot .
                            span.dot .
                        img(src="@/assets/img/icon/react.png" alt="React logo")
                    .content
                        p.big React
                        p.small Javascript
            .icon-card
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    img.icon(src="@/assets/img/icon/angular.png" alt="Angular logo")
                    .content
                        p.big Angular
                        p.small Javascript
            .icon-card
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    img.icon(src="@/assets/img/icon/vue.png" alt="Vue logo")
                    .content
                        p.big Vue
                        p.small Javascript
            .icon-card
                a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
                    img.icon(src="@/assets/img/icon/html.png" alt="Html logo")
                    .content
                        p.big Html
                        p.small Html

    

</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { npmVersion } from "@/main.ts";
import { user } from "@/code/user";

import Code from "@/components/code.vue";

let tab1 = ref(null);
let tab2 = ref(null);
let activeMenu = ref(null);
let activeTabMenu = ref(null);

watch(activeMenu, (nv) => {
    if (nv) {
        activeTabMenu.value.style.width = `${nv.offsetWidth}px`;
        activeTabMenu.value.style.left = `${nv.offsetLeft}px`;
    }
}, { immediate: true });

onMounted(() => {
    activeMenu.value = tab1.value;
});
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
    max-width: 570px;
    margin: 0 auto;
    border-radius: 12px;
    background-color: #181818;

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
}

.tab-menu {
    ul {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 4px;
        background-color: rgba(0,0,0,0.05);
        border-radius: 24px;

        li {
            position: relative;
            list-style: none;
            padding: 8px 16px;
            font-size: 0.9rem;
            cursor: pointer;
            z-index: 2;
        }

        .active-menu {
            position: absolute;
            content: '';
            height: calc(100% - 8px);
            border-radius: 20px;
            background-color: rgb(255, 255, 255);
            box-shadow: rgba(113, 116, 152, 0.1) 0px 18px 31px, rgba(113, 116, 152, 0.067) 0px 8px 16.2244px, rgba(113, 116, 152, 0.05) 0px 8px 8.46625px;
            transition: left 200ms cubic-bezier(0.6, 0.6, 0, 1), 350ms cubic-bezier(0.6, 0.6, 0, 1);
        }
    }
    // display: flex;
    // align-items: center;
    // justify-content: center;

    // ul {
    // 	position: relative;
    // 	padding: 4px;
    // 	display: flex;
    // 	align-items: center;
    // 	justify-content: center;
    // 	background-color: rgba(0,0,0,0.05);
    // 	border-radius: 24px;

    // 	li {
    // 		position: relative;
    // 		display: flex;
    // 		height: 40px;
    // 		align-items: center;
    // 		justify-content: center;

    // 		list-style: none;
    // 		// padding: 8px 24px;
    // 		font-size: 0.9rem;
    // 		cursor: pointer;
    // 		z-index: 2;
    // 	}

    // 	.active-menu {
    // 		position: absolute;
    // 		top: 4px;
    // 		left: 4px;
    // 		height: 40px;
    // 		border-radius: 20px;
    // 		background-color: rgb(255, 255, 255);
    // 		box-shadow: rgba(113, 116, 152, 0.1) 0px 18px 31px, rgba(113, 116, 152, 0.067) 0px 8px 16.2244px, rgba(113, 116, 152, 0.05) 0px 8px 8.46625px;
    // 		transition: left 200ms cubic-bezier(0.6, 0.6, 0, 1), 350ms cubic-bezier(0.6, 0.6, 0, 1);
    // 	}
    // }
}

.card-wrap {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    @keyframes scaleBounce{
        from {transform:scale(1)}
        to {transform:scale(1.08)}
    }

    @keyframes rotateBounce {
        0% {
            transform: rotate(0deg) scale(1);
            opacity: 0.3;
        }
        50% {
            transform: rotate(180deg) scale(1.3);
            opacity: 1;
        }
        100% {
            transform: rotate(360deg) scale(1);
            opacity: 0.3;
        }
    }

    .change-toggle {
        display: flex;
        align-items: center;
        background-color: rgba(0,0,0,0.03);
        border-radius: 12px;
        padding: 0.7rem;
        gap: 0.8rem;

        img {
            width: 2.5rem;

            &.skapi {
                width: 2rem;
            }
        }
    }

    .icon-card {
        flex-grow: 1;
        width: 48%;
        min-width: 250px;
        border: 1px solid rgba(0,0,0,0.05);
        border-radius: 12px;
        padding: 1rem;
        transition: all .3s;
        cursor: pointer;

        &:hover {
            // border-color: var(--main-color);
            box-shadow: 1px 1px 10px rgba(0,0,0, 0.05);

            .change-toggle {
                img {
                    animation: scaleBounce .5s alternate infinite;
                }
                .rotate {
                    animation: rotateBounce 1s infinite ease-in-out;
                    // animation: scaleBounce .5s alternate infinite;
                }
            }
        }
        
        a {
            display: flex;
            align-items: center;
            gap: 1rem;
            text-decoration: none;
            color: #333;
        }

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

// .icoHead {
//     position: relative;
//     display: flex;
//     // align-items: center;
//     .material-symbols-outlined {
//         position: absolute;
//         font-size: 2em;
//         color: yellow;
//         text-shadow: 1px 1px 1px black;
//         top: -4px;
//     }
//     svg {
//         fill:yellow;
//         filter: drop-shadow(1px 1px 1px black;);
//         width: 2em;
//         height: 2em;
//     }
//     h2 {
//         padding-left: 0.5em;
//         margin: 0;
//     }
//     margin-bottom: 1.5rem;
// }

// .li {
//     position: relative;
//     .material-symbols-outlined {
//         font-size: 1.17em;
//         color: yellow;
//         position: absolute;
//         left: -1.33em;
//         top: 2px;
//         text-shadow: 1px 1px 1px black;
//     }
//     h3 {
//         margin-bottom: 0;
//     }
//     p {
//         margin-bottom: 2em;
//     }
//     svg {
//       position: absolute;
//       width: 1.17em;
//       height: 1.17em;
//       transform: translateX(-130%) translateY(10%);
//       fill:yellow;
//       filter: drop-shadow(1px 1px 1px black;);
//     }
// }

// h2,
// h3 {
//     margin-bottom: 1rem;
// }

// p {
//     font-size: 1.12rem;
// }

// .dynamo-section {
//     font-family: 'Radio Canada', serif;
//     margin: 11rem 0;

//     .yellow {
//         color: #FFED91;
//     }
//     .underline {
//         text-decoration: underline;
//     }

//     .sec-wrapper {
//         color: #fff;
//         margin: 0 auto;
//         padding: 0 1rem;
//         max-width: 55rem;
//     }

//     .title {
//         font-size: 3.625rem;
//         font-weight: 700;
//         margin-bottom: 8px;
//         line-height: 1.3;
//     }

//     .desc {
//         font-size: 1.2rem;
//         font-weight: 500;
//         margin-bottom: 3.25rem;
//         // max-width: 890px;
//     }

//     .sub-title {
//         font-size: 2.5rem;
//         font-weight: 700;
//         margin-bottom: 1.5rem;
//     }

//     .sub-desc {
//         font-size: 1.2rem;
//         color: #D0D5DD;
//         margin-bottom: 2.5rem;
//     }

//     & > * {
//         max-width: 100%;
//     }

//     p,
//     li,
//     h1,
//     h2,
//     h3,
//     h4 {
//         color: white;
//         text-shadow: 1px 1px 2px #000;
//         margin: 0;
//         padding: 0;
//     }

//     p {
//         font-weight: 500;
//         text-shadow: none;
//     }

//     em {
//         font-style: normal;
//     }

//     small {
//         display: block;
//         font-size: 0.9rem;
//         font-weight: 300;
//         margin-bottom: 12px;
//         color: #D0D5DD;
//     }

//     ._codeWrap {
//         margin-bottom: 38px;
//         fill: #fff;

//         .code {
//             pre {
//                 display: block;
//             }
//         }
//     }

//     .btn-wrap {
//         margin-top: 4rem;
//         display: flex;
//         gap: 1.2rem;
//     }

//     .final {
//         // background-color: #7c5273;
//         // background-color: #437964;
//         background-color: #fff;
//         font-size: 1rem;
//         font-weight: 700;
//         color: #293FE6;
//         min-width: 10.5rem;
//     }

//     .feature {
//         display: flex;
//         gap: 1.5rem;
//         margin-bottom: 1.5rem;

//         &:last-of-type {
//             margin-bottom: 0;
//         }
//     }

//     .feature-card {
//         display: block;
//         padding: 30px 24px;
//         border: 1px solid #475467;
//         border-radius: 12px;
//         background-color: transparent;
//         min-height: 357px;
//         position: relative;
//         flex: 1;
//         overflow: hidden;
//         transition: all 0.2s ease-in-out;

//         &:hover {
//             border-color: #fff;
//             text-decoration: none;
//             transform: translateY(-4px);
//         }

//         .card-top {
//             display: flex;
//             align-items: center;
//             gap: 1rem;
//             margin-bottom: 1.6rem;

//             img {
//                 height: 2.4rem;
//             }
//         }

//         .text {
//             font-size: 1.1rem;
//             font-weight: 700;
//             color: #fff;
//         }

//         .desc {
//             font-size: 0.9rem;
//             font-weight: 500;
//             color: rgba(225, 225, 225, 0.8);
//             position: relative;
//             z-index: 1;
//             margin-bottom: 0;
//         }

//         .img-feature {
//             position: absolute;
//         }
//     }

//     &.main {
//         .sec-wrapper {
//             padding: 10rem 1rem;
//         }

//         ._codeWrap {
//             max-width: 950px;

//             .code {
//                 pre {
//                     display: flex;
//                     padding: 0 1rem;
//                 }
//             }
//         }
//     }

//     &:nth-last-of-type(2) {
//         margin-bottom: 5rem;
//     }
// }

// .intact {
//     width: 800px;
// }

// section {
//     .image {
//         width: 30%;

//         img {
//             width: 200px;
//             max-width: 100%;
//         }
//     }

//     .desc {
//         width: 640px;
//         z-index: 1;
//     }
// }

// .explain {
//     display: flex;
//     position: relative;
//     gap: 1rem;
// }

// @media (max-width: 992px) {
//     .dynamo-section {
//         .feature {
//             gap: 1.2rem;
//             margin-bottom: 1.2rem;
//         }

//         .feature-card {
//             min-height: fit-content;
//             padding: 24px 18px;

//             &:hover {
//                 border-color: #475467;
//                 transform: translateY(0);
//             }

//             .img-feature {
//                 display: none;
//             }
//         }
//     }
// }

// @media (max-width: 800px) {
//     .dynamo-section {
//         .sec-wrapper {
//             .title {
//                 font-size: 2.625rem;

//                 &:nth-of-type(2) {
//                     font-size: 1.75rem;
//                 }
//             }
//         }

//         .feature {
//             flex-direction: column;
//         }

//         .feature-card {
//             max-width: 100% !important;

//             .card-top {
//                 margin-bottom: 1rem;
//             }
//         }

//         &.main {
//             .sec-wrapper {
//                 padding: 4rem 1rem;
//             }
//         }
//     }
// }

// @media (max-width: 600px) {
//     .explain {
//         position: relative;

//         &::before {
//             pointer-events: none;
//             position: absolute;
//             content: "";
//             right: 0;
//             top: 0;
//             left: 0;
//             bottom: 0;
//             background-repeat: no-repeat;
//             background-position: right top;
//             opacity: 0.2;
//         }

//         &.one {
//             &::before {
//                 background-size: 9rem;
//                 background-image: url("@/assets/img/landingpage/feature2.png");
//             }
//         }

//         &.two {
//             &::before {
//                 background-image: url("@/assets/img/landingpage/feature1.png");
//                 background-size: 10rem;
//             }
//         }

//         &.three {
//             &::before {
//                 background-image: url("@/assets/img/landingpage/feature3.png");
//                 background-size: 10rem;
//             }
//         }

//         &.four {
//             &::before {
//                 background-size: 9rem;
//                 background-image: url("@/assets/img/landingpage/frameworks.png");
//             }
//         }

//         .image {
//             display: none;
//         }
//     }

//     .dynamo-section {
//         margin: 5rem 0;

//         &:nth-last-of-type(2) {
//             margin-bottom: 0;
//         }
        
//         .final {
//             min-width: 144px;
//         }

//         .text-small {
//             font-size: 12px;
//         }
//     }
// }
</style>
