<template lang="pug">
main
	.dynamo-section.main.center.wide
		//- p(style="color:var(--main-color); font-weight:500; font-size:14px;") BACKEND API
		img.symbol(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo" style="height: 44px;")

		br
		br

		.title.faktum 
			| Serverless #[span.wordset Backend API]
			br 
			| for HTML Frontend

		p.desc Skapi is a fully serverless backend API that just works seamlessly with #[span.wordset plain HTML and JavaScript] — #[span.wordset no complex installations], #[span.wordset no backend configurations], and no database #[span.wordset management required.]

		br

		.vscode(style="border: 1px solid #2b2b2b; height: 240px")
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
					#[span(style="color:#999") &lt;]#[span(style="color:#33adff") script] #[span(style="color:#44E9FF") src]=#[span(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]#[span(style="color:#999") &gt;&lt;/]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]
					#[span(style="color:#999") &lt;]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]
						#[span(style="color:#33adff") const] skapi = #[span(style="color:#33adff") new] Skapi(#[span(style="color:#FFED91") "your_service_id"], #[span(style="color:#FFED91") "your_owner_id"]);
					#[span(style="color:#999") &lt;/]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]

			.copied Copied! 👏

	.dynamo-section.center
		.title.faktum 
			| Works Seamlessly
			br
			| with Pure HTML

		.desc No need for complex JavaScript to handle user input data — #[span.wordset Skapi fully] embraces pure HTML forms, making backend interaction as simple as submitting a form.

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
						#[span(style="color:#999") &lt;]#[span(style="color:#33adff") form ]#[span(style="color:#9CDCFE") onsubmit]=#[span(style="color:#CE9178") "]
							#[span(style="color:#CE9178") skapi.postRecord(event, { table: 'my_photos' })]
							#[span(style="color:#CE9178") .then(res => alert('Photo uploaded!') )]
						#[span(style="color:#CE9178") "]#[span(style="color:#999") &gt;]
							#[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") name]=#[span(style="color:#CE9178") "picture" ]#[span(style="color:#9CDCFE") type]=#[span(style="color:#CE9178") "file"]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
							#[span(style="color:#999") &lt;]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]
								Description#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
								#[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") name]=#[span(style="color:#CE9178") "description" ]#[span(style="color:#999") &gt;]
							#[span(style="color:#999") &lt;/]#[span(style="color:#33adff") label]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
							#[span(style="color:#999") &lt;]#[span(style="color:#33adff") input ]#[span(style="color:#9CDCFE") type]=#[span(style="color:#CE9178") "submit" ]#[span(style="color:#9CDCFE") value]=#[span(style="color:#CE9178") "Upload"]#[span(style="color:#999") &gt;]
						#[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]
			.copied Copied! 👏
	.dynamo-section.center.wide
		.title.faktum Everything You Need in One API

		.desc Skapi simplifies backend development by bundling essential services into a single JavaScript library, dramatically reducing development time and costs.

		.slide-wrap
			ul.slide-inner
				li
					.icon
						svg
							use(xlink:href="@/assets/img/material-icon.svg#icon-encrypted-fill")
					.content
						.title.faktum Authentication
						.desc Secure, AWS Cognito-based user management
				li
					.icon
						svg
							use(xlink:href="@/assets/img/material-icon.svg#icon-database-fill")
					.content
						.title.faktum Database
						.desc Scalable, auto-indexing database
				li
					.icon
						svg
							use(xlink:href="@/assets/img/material-icon.svg#icon-cloud-upload-fill")
					.content
						.title.faktum File Storage
						.desc Reliable, S3-based storage
				li
					.icon
						svg
							use(xlink:href="@/assets/img/material-icon.svg#icon-public")
					.content
						.title.faktum CDN
						.desc Deliver content globally with ease
				li
					.icon
						svg
							use(xlink:href="@/assets/img/material-icon.svg#icon-wifi-fill")
					.content
						.title.faktum Realtime Data
						.desc Instant WebRTC and WebSocket implementation
				li
					.icon
						svg
							use(xlink:href="@/assets/img/material-icon.svg#icon-graph-fill")
					.content
						.title.faktum API Bridge
						.desc Connect external APIs effortlessly
				li
					.icon
						svg
							use(xlink:href="@/assets/img/material-icon.svg#icon-mail-fill")
					.content
						.title.faktum Automated Emails
						.desc Built-in email automation & sending bulk emails
				li
					.icon
						svg
							use(xlink:href="@/assets/img/material-icon.svg#icon-language")
					.content
						.title.faktum Website Hosting
						.desc Easy file & website hosting
			
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

		.title.faktum 
			| Built with TypeScript,
			br
			| Compatible #[span.wordset with Any #[span.wordset JS Framework]]

		.desc Skapi is compatible with Vue.js, React, Angular, and more, providing pre-built templates for various frameworks. It also works seamlessly with plain HTML without requiring any dependencies.

		.card-wrap
			.card(@mouseenter="hoverFramework = 'react'" @mouseleave="hoverFramework = null")
				a(href="https://github.com/broadwayinc/getting-started-template-react" target="_blank")
					img.icon(src="@/assets/img/icon/react.png" alt="React logo")
					.content
						p.big React
						p.small Javascript
			.card(@mouseenter="hoverFramework = 'angular'" @mouseleave="hoverFramework = null")
				a(href="https://github.com/broadwayinc/getting-started-template-angular" target="_blank")
					img.icon(src="@/assets/img/icon/angular.png" alt="Angular logo")
					.content
						p.big Angular
						p.small Javascript
			.card(@mouseenter="hoverFramework = 'vue'" @mouseleave="hoverFramework = null")
				a(href="https://github.com/broadwayinc/getting-started-template-vue" target="_blank")
					img.icon(src="@/assets/img/icon/vue.png" alt="Vue logo")
					.content
						p.big Vue
						p.small Javascript
			.card(@mouseenter="hoverFramework = 'html'" @mouseleave="hoverFramework = null")
				a(href="https://github.com/broadwayinc/skapi-auth-html-template" target="_blank")
					img.icon(src="@/assets/img/icon/html.png" alt="Html logo")
					.content
						p.big Html
						p.small Html

	.dynamo-section.center
		.title.faktum Pricing Plans

		//- TabMenu(v-model="activeTabs.plan" :tabs="['Monthly', 'Limited']")

		.plan-wrap.card-wrap
			.plan
				.card
					.title Standard 
					.option 
						TabMenu(v-model="activeTabs.standardPlan" :tabs="['Monthly', 'Perpetual']")
					.price
						template(v-if="activeTabs.standardPlan === 0") 
							.faktum {{ '$' + planSpec['Standard'].price.monthly }}
							span /mo
						template(v-else)
							.faktum {{ '$' + planSpec['Standard'].price.perpetual }}
							span /only-once
					.desc 
						template(v-if="activeTabs.standardPlan === 0") Suits best for small businesses, #[span.wordset MVPs, small projects, etc.]
						template(v-else) Get lifetime access to the Standard plan for just $300—upgrade anytime as your needs grow.
					button.final(type="button") Get
				ul.provides
					li(v-for="(des) in planSpec['Standard'].description") {{ des }}
			.plan
				.card
					.title Premium 
					.option 
						TabMenu(v-model="activeTabs.premiumPlan" :tabs="['Monthly', 'Perpetual']")
					.price
						template(v-if="activeTabs.premiumPlan === 0") 
							.faktum {{ '$' + planSpec['Premium'].price.monthly }}
							span /mo
						template(v-else)
							.faktum {{ '$' + planSpec['Premium'].price.perpetual }}
							span /only-once
					.desc
						template(v-if="activeTabs.premiumPlan === 0") Suits best for huge projects, #[span.wordset SaaS, social media, etc.]
						template(v-else) Get lifetime access to the Premium plan for just $1399—upgrade anytime as your needs grow.
					button.final(type="button") Get
				ul.provides
					li(v-for="(des) in planSpec['Premium'].description") {{ des }}
			//- .card
				.title 🚀 Limited-Time Offer
				.price
					.faktum $300
					span /only-once
				.desc Get lifetime access #[span.wordset to the Standard plan] #[span.wordset for just $300—upgrade anytime #[span.wordset as your needs grow.]]
				button.final(type="button") Get

	.dynamo-section.center
		.title.faktum Try Skapi for Free!
		.plan-wrap.card-wrap(style="max-width: 400px")
			.plan
				.card
					.title Trial
					.price
						.faktum FREE
						span /mo
					.desc Best for development and testing
					button.final(type="button") Get
				ul.provides
					li(v-for="(des) in planSpec['Trial'].description") {{ des }}
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

		.desc 
			| Experience #[span.wordset the serverless backend development.]
			br
			| 🚀 No servers. No deployment. #[strong.wordset Just pure HTML & JavaScript.]

		a(href='https://docs.skapi.com' target='_blank')
			button.final(type="button") Get Started

	//- .dynamo-section.center
		.title.faktum Explore More

</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { npmVersion } from "@/main.ts";
import { user } from "@/code/user";
import { planSpec } from "@/views/service/service-spec";

import Code from "@/components/code.vue";
import TabMenu from '@/components/tab.vue';

let activeTabs = ref({
	pureHTML: 0,
	plan: 0,
	standardPlan: 0,
	premiumPlan: 0,
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

onMounted(() => {
	const slideInner = document.querySelector(".slide-inner");
	const clone = slideInner.cloneNode(true); // 복제본 생성

	document.querySelector(".slide-wrap").appendChild(clone); // 복제본 추가
	document.querySelector(".slide-inner").offsetWidth + "px"; // 원본, 복제본 위치 지정

	slideInner.classList.add("original");
	clone.classList.add("clone");
});
</script>

<style lang="less" scoped>
.dynamo-section {
	max-width: 1200px;
	margin: 0 auto;
	padding: 6rem 20px;
	background-color: #fff;

	&.center {
		text-align: center;

		.desc {
			margin: 0 auto;
			margin-bottom: 1rem;
		}
	}

	&.wide {
		max-width: unset;
		background-color:rgb(247, 249, 252);
		margin: 0 10px;
		border-radius: 18px;
		padding: 5rem 20px;

		&.main {
			margin-top: 10px;
			background-color: #060A23;
			color: #D9DADD;

			.desc {
				color: #A6A8B1;
			}
		}
	}

	&.main {
		padding: 11rem 20px;

		.title {
			font-size: 3rem;
			margin-bottom: 1rem;
			background: linear-gradient(to right bottom, #fff, #ccc);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}

	.title {
		font-size: 2.4rem;
		margin-bottom: 1rem;
		line-height: 1.5;
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
	max-width: 640px;
	height: 360px;
	margin: 0 auto;
	border-radius: 12px;
	background-color: #181818;
	overflow: hidden;

	display: flex;
	flex-direction: column;

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
			text-align: center;
		}

		.copy {
			position: absolute;
			right: 16px;
			// bottom: calc(0px - 24px - 0.8rem);

			fill: #fff;
			cursor: pointer;
			transition: all .3s;

			&:hover {
				transform: scale(1.1);
			}

			@media (min-width: 600px) {
				&::before {
					color: #fff;
					content: 'copy';
					font-size: 0.6rem;
					vertical-align: middle;
					font-family: monospace;
				}
			}
		}
	}
	.body {
		// height: 300px;
		flex-grow: 1;
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
		bottom: -40px;
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

@keyframes slide01 { 
	0% { transform: translateX(0); }
	50% { transform: translateX(-100%); }
	50.01% { transform: translateX(100%); }
	100% { transform: translateX(0); }
}

@keyframes slide02 { 
	0% { transform: translateX(0); }
	100% { transform: translateX(-200%); }
}

.slide-wrap { 
	display: flex;
	position: relative;
	top: 0;
	left: 0;
	height: 300px;
	overflow: hidden;

	.slide-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 0;
		gap: 1rem;

		&.original { animation: 50s linear 0s infinite normal forwards running slide01; }
		&.clone { animation: 50s linear 0s infinite normal none running slide02; }

		li {
			display: inline-block;
			list-style: none;
			// width: 220px;
			// height: 250px;
			width: 13em;
			height: 15em;
			// line-height: 220px;
			// margin-right: 4vw;
			border: 1px solid #F0F2FA;
			background-color: #fff;
			border-radius: 24px;
			padding: 1rem;
			text-align: left;

			&:last-child {
				margin-right: 1rem;
			}
			.icon {
				display: inline-block;
				border-radius: 50%;
				border: 1px solid #F0F2FA;
				padding: 0.5rem;
				// background-color: #fff;
				margin-bottom: 1rem;
				box-shadow: 0px 0px 14px #e4e7f4;
				cursor: default;

				svg {
					width: 2rem;
					height: 2rem;
					fill: var(--main-color);
				}
			}
			.content {
				.title {
					font-size: 1.2rem;
					margin-bottom: 0.5rem;
				}
				.desc {
					font-size: 0.8rem;
					color: #777;
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

.card-wrap {
	max-width: 800px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	// text-align: center;

	.card {
		flex-grow: 1;
		width: 48%;
		min-width: 250px;
		border: 1px solid rgba(0,0,0,0.1);
		border-radius: 12px;
		padding: 1rem;
		transition: all .3s;
		cursor: pointer;
		background-color: #fff;

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

.plan-wrap {
	align-items: start;

	.plan {
		width: 31%;
		min-width: 250px;
		flex-grow: 1;
	}
	.card {
		width: 100%;
		cursor: default;
	}
	.title {
		font-size: 1rem;
	}
	.option {
		position: relative;
		height: 2rem;
		margin-bottom: 1rem;

		.tab-menu {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-55%, -50%);
			scale: 0.9;
			margin: 0;
		}
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

@media (max-width: 576px) {
	.dynamo-section {
		&.center {
			text-align: left;
		}
		
		&.main {
			padding: 6rem 20px;

			.title {
				font-size: 48px;
			}

			.symbol {
				display: none;
			}
		}

		.title {
			line-height: 1.4;
		}
	}

	.plan-wrap {
		.price {
			justify-content: start;
		}

		.option {
			height: 2.3rem;

			.tab-menu {
				top: unset;
				left: -8px;
				// transform: translate(0, 0);
				transform: unset;
			}
		}
	}
}
</style>