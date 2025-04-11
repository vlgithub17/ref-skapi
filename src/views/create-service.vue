<template lang="pug">
main#create
	//- router-link(to="/my-services")
		img(src="@/assets/img/logo/logo.png" style="height: 2rem;")

	//- .bottomLineTitle Create a New Service

	//- p
	//-     | Choose a plan for your service "
	//-     span(style='font-weight:500') {{newServiceName}}
	//-     | "

	.section
		router-link(to="/my-services")
			img.symbol(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo" style="height: 44px;margin-bottom: 0.5rem;")
		.title.faktum Create a New Service
		.desc Choose a plan for your service #[span.wordset.newname {{newServiceName}}]

	.plan-wrap.card-wrap
		.plan(:class="{'selected' : serviceMode == 'trial', 'hovered': hoverPlan == 'trial'}" @mouseover="hoverPlan = 'trial'" @mouseleave="hoverPlan = serviceMode")
			.card
				.title Trial
				//- .option 
					TabMenu(v-model="activeTabs.trialPlan" :tabs="['basic']")
				.price
					.faktum {{ '$' + planSpec['Trial'].price.monthly }}
					span /mo
				.desc Suits best for hobby use #[span.wordset for small projects #[span.wordset or businesses.]]
				button.final(type="button" :class="{'disabled': promiseRunning}" @click="selectedPlan('trial')") 
					template(v-if="serviceMode == 'trial' && promiseRunning")
						.loader(style="--loader-color:white; --loader-size: 12px")
					template(v-else) Select
			ul.provides
				li(v-for="(des) in planSpec['Trial'].description") {{ des }}
				li.warning(v-for="(des) in planSpec['Trial'].description_warning") {{ des }}
		.plan(:class="{'selected' : serviceMode == 'standard', 'hovered': hoverPlan == 'standard'}" @mouseover="hoverPlan = 'standard'" @mouseleave="hoverPlan = serviceMode")
			.card
				.title Standard 
				//- .option 
					TabMenu(v-model="activeTabs.standardPlan" :tabs="['basic', 'limited']")
				.price
					template(v-if="activeTabs.standardPlan === 0") 
						.faktum {{ '$' + planSpec['Standard'].price.monthly }}
						span /mo
					template(v-else)
						.faktum {{ '$' + planSpec['Standard'].price.perpetual }}
						span /only-once
				.desc 
					template(v-if="activeTabs.standardPlan === 0") Suits best for hobby use #[span.wordset for small projects #[span.wordset or businesses.]]
					template(v-else) Get lifetime access to the Standard plan for just $300—upgrade anytime as your needs grow.
				button.final(type="button" :class="{'disabled': promiseRunning}" @click="selectedPlan('standard')")
					template(v-if="serviceMode == 'standard' && promiseRunning")
						.loader(style="--loader-color:white; --loader-size: 12px")
					template(v-else) Select
			ul.provides
				li(v-for="(des) in planSpec['Standard'].description") {{ des }}
		.plan(:class="{'selected' : serviceMode == 'premium', 'hovered': hoverPlan == 'premium'}" @mouseover="hoverPlan = 'premium'" @mouseleave="hoverPlan = serviceMode")
			.card
				.title Premium 
				//- .option 
					TabMenu(v-model="activeTabs.premiumPlan" :tabs="['basic']")
				.price
					.faktum {{ '$' + planSpec['Premium'].price.monthly }}
					span /mo
				.desc Empower your business with formcarry, #[span.wordset for big businesses]
				button.final(type="button" :class="{'disabled': promiseRunning}" @click="selectedPlan('premium')")
					template(v-if="serviceMode == 'premium' && promiseRunning")
						.loader(style="--loader-color:white; --loader-size: 12px")
					template(v-else) Select
			ul.provides
				li(v-for="(des) in planSpec['Premium'].description") {{ des }}

br
br
br
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { serviceIdList, serviceList } from '@/views/service-list'
import { skapi } from '@/main';
import { customer } from '@/code/user';
import { planSpec } from "@/views/service/service-spec";

import Service from '@/code/service';
import TabMenu from '@/components/tab.vue';

const router = useRouter();
const route = useRoute();

let service = {
	active: 1,
	name: 'service name',
	cors: 'service cors',
	timestamp: 1709102706561,
	group: 1,
	service: 'ap226E8TXhYtbcXRgi5D',
	users: 10
}
let promiseRunning = ref(false);
let serviceMode = ref('standard');
let hoverPlan = ref('standard');
let newServiceName = route.params.name as string;
let activeTabs = ref({
	trialPlan: 0,
	standardPlan: 0,
	premiumPlan: 0,
});

let createSubscription = async (ticket_id, service_info) => {
	let resolvedCustomer = await customer;
	let product = JSON.parse(import.meta.env.VITE_PRODUCT);
	let customer_id = resolvedCustomer.id;
	let currentUrl = window.location;

	let response = await skapi.clientSecretRequest({
		clientSecretName: 'stripe_test',
		url: 'https://api.stripe.com/v1/checkout/sessions',
		method: 'POST',
		headers: {
			Authorization: 'Bearer $CLIENT_SECRET',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			client_reference_id: service_info.owner,
			customer: customer_id,
			'customer_update[name]': 'auto',
			'customer_update[address]': 'auto',
			'subscription_data[metadata][service]': service_info.id,
			'subscription_data[metadata][owner]': service_info.owner,
			'mode': 'subscription',
			'subscription_data[description]': 'Subscription plan for service ID: "' + service_info.id + '"',
			cancel_url: currentUrl.origin + '/my-services',
			"line_items[0][quantity]": 1,
			'line_items[0][price]': product[ticket_id],
			"success_url": currentUrl.origin + '/my-services/' + service_info.id,
			'tax_id_collection[enabled]': true,
		}
	});
	if (response.error) {
		alert(response.error.message);
		return;
	}

	window.location = response.url;
}

let createService = () => {
	promiseRunning.value = true;

	Service.create({ name: newServiceName })
		.then(async (s) => {
			if (serviceMode.value == 'trial') {
				serviceIdList.push(s.id);
				serviceList[s.id] = s;
				location.href = '/my-services/' + s.id;
			} else {
				let service_info = s;
				let ticket_id = serviceMode.value;
				await createSubscription(ticket_id, service_info);
			}
		}).catch(err => {
			promiseRunning.value = false;
			alert(err.message);
		})
}

let selectedPlan = (plan: string) => {
	serviceMode.value = plan;
	createService();
}
</script>

<style scoped lang="less">
#create {
	max-width: 1000px;
	padding: 0 8px;
	margin: 0 auto;
}

.section {
	max-width: 570px;
	margin: 0 auto;
	padding: 4rem 20px;
	text-align: center;

	.title {
		font-size: 2rem;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.desc {
		margin-bottom: 1rem;
		line-height: 1.9;
		color: #333;
	}
}

.newname {
	font-weight: bold;
	color: var(--main-color);
}

.inputWrap {
	display: flex;
	gap: 8px;
	margin-top: 8px;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
}

input {
	width: unset;
	flex-grow: 1;
}

.card-wrap {
	max-width: 100%;
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
		opacity: 0.5;
		transition: all .3s;

		&.selected {
			opacity: 1;
			
			.card {
				box-shadow: 1px 1px 10px rgba(0,0,0, 0.05);
			}
			.provides {
				li {
					// &::before {
					// 	background: url('@/assets/img/icon/check.svg') no-repeat;
					// 	background-size: cover;
					// 	width: 16px;
					// 	height: 16px;
					// 	opacity: 1;
					// }
				}
			}
		}

		&.hovered {
			scale: 1.05;
		}

		&:hover {
			opacity: 1;
		}
	}
	.card {
		width: 100%;
		cursor: default;
	}
	.title {
		font-size: 1rem;
		margin-bottom: 1rem;
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
		margin-bottom: 1rem;
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

@media (max-width: 480px) {
	button {
		width: 100%;
	}
}
</style>