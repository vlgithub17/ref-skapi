<template lang="pug">
main#serviceList
	section.section
		.title.faktum My Services

		.iconbutton(@click="router.push('/create')")
			svg.svgIcon
				use(xlink:href="@/assets/img/material-icon.svg#icon-add") 
			span &nbsp;&nbsp;Create New Service

	Table(resizable)
		template(v-slot:head)
			tr
				th.th.overflow(style="width:166px;")
					| Service Name
					.resizer
				th.th.overflow(style="width:150px;")
					| Plan
					.resizer
				th.th.overflow(style="width:120px;")
					| State
					.resizer
				th.th.overflow(style="width:144px;")
					| Users
					.resizer
				th.th.overflow(style="width:144px;")
					| Database
					.resizer
				th.th.overflow(style="width:144px;")
					| File Storage
					.resizer
				th.th.overflow(style="width:144px;")
					| File Hosting
					.resizer
				th.th.overflow(style="width:144px;")
					| Email

		template(v-slot:body)
			tr(v-if="fetchingServiceList")
				td(colspan="8").
					Loading ... &nbsp;
					#[.loader(style="--loader-color:black; --loader-size:12px")]
			tr(v-else-if="!Object.keys(serviceIdList).length")
				td(colspan="8") You have no services yet.

			template(v-else v-for="id in serviceIdList")
				tr.hoverRow(v-if="serviceList[id]" @click="() => goServiceDashboard(serviceList[id])" @mousedown="(e) => e.currentTarget.classList.add('active')" @mouseleave="(e) => e.currentTarget.classList.remove('active')")
					td.overflow {{ serviceList[id].service.name }}
					td.overflow(style="white-space:nowrap")
						// plans
						.state(v-if="serviceList[id].service.subs_id && !serviceList[id].subscription")
							.loader(style="--loader-color:black; --loader-size:12px")
						span(v-else :style="{fontWeight: serviceList[id].service.plan === 'Canceled' ? 'normal' : null, color: serviceList[id].service.plan === 'Canceled' ? 'var(--caution-color)' : null}") {{ serviceList[id].service.plan || serviceList[id].plan }}
					td.overflow
						// active state
						.state(v-if="serviceList[id].service.active > 0" style="color:var(--text-green);font-weight:normal;") Running
						.state(v-else-if="serviceList[id].service.active == 0") Disabled
						.state(v-else-if="serviceList[id].service.suspended" style='color:var(--caution-color);font-weight:normal') Suspended
						.state(v-else) -
					td.overflow
						// users
						.percent(:class="getClass(serviceSpecList[id], 'users')") {{ serviceSpecList[id]?.plan === 'Unlimited' ? 'Unlimited' : serviceSpecList[id]?.dataSize?.users + '/' + serviceSpecList[id]?.servicePlan?.users }}

					td.overflow
						// database
						.percent(:class="getClass(serviceSpecList[id], 'database')") {{ typeof(serviceSpecList[id]?.dataPercent?.database) === 'string' ? serviceSpecList[id]?.dataPercent?.database : serviceSpecList[id]?.dataPercent?.database + '%' }}

					td.overflow
						// cloud storage
						.percent(:class="getClass(serviceSpecList[id], 'cloud')") {{ typeof(serviceSpecList[id]?.dataPercent?.cloud) === 'string' ? serviceSpecList[id]?.dataPercent?.cloud : serviceSpecList[id]?.dataPercent?.cloud + '%' }}

					td.overflow
						// host storage
						.percent(:class="getClass(serviceSpecList[id], 'host')") {{ typeof(serviceSpecList[id]?.dataPercent?.host) === 'string' ? serviceSpecList[id]?.dataPercent?.host : serviceSpecList[id]?.dataPercent?.host + '%' }}

					td.overflow
						// email storage
						.percent(:class="getClass(serviceSpecList[id], 'email')") {{ typeof(serviceSpecList[id]?.dataPercent?.email) === 'string' ? serviceSpecList[id]?.dataPercent?.email : serviceSpecList[id]?.dataPercent?.email + '%' }}

	br
	br
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { watch, ref } from 'vue';
import { fetchingServiceList, serviceList, serviceIdList, serviceSpecList } from '@/views/service-list';
import { user } from '@/code/user';
import type Service from '@/code/service';
import Table from '@/components/table.vue';
import { ServiceSpec } from './service/service-spec';

const router = useRouter();

console.log('serviceList', serviceList);

let goServiceDashboard = (service: { [key: string]: any }) => {
	router.push('/my-services/' + service.id);
}

let newServiceName = ref('')
let createService = ()=>{
	let regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
	if (newServiceName.value.match(regex)) {
		alert('Special characters are not allowed');

		return
	}
	router.push('/create/' + newServiceName.value);
}

let getClass = (service: ServiceSpec, what: string) => {
	let percentage: number | string;

	if (!service) {
		return 'grey';
	}

	if(service?.plan === 'Unlimited') {
		return 'purple';
	}

	percentage = service.dataPercent[what];
	
	if (percentage === 'N/A') {
		return 'grey';
	} else if (typeof percentage === 'number') {
		if (percentage >= 0 && percentage < 51) {
			return 'green';
		}
		else if (percentage >= 51 && percentage < 81) {
			return 'orange';
		}
		else if (percentage >= 81 && percentage < 101) {
			return 'red';
		}
	}
	return 'grey';
}
</script>

<style lang="less" scoped>
#serviceList {
	max-width: 1200px;
	margin: 8px auto 0;
}

.section {
	max-width: 570px;
	margin: 0 auto;
	padding: 6rem 20px;
	text-align: center;

	.title {
		// font-size: 1.4rem;
		font-size: 2.4rem;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.desc {
		margin-bottom: 1rem;
		line-height: 1.9;
		color: #000;
	}
}

.tableMenu {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 5rem;
	padding: 0 10px;

	.pageName {
		font-size: 1.4rem;
		font-weight: 500;
	}
}

.iconbutton {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background-color: var(--main-color);
	color: #fff;
	font-weight: 500;
  	font-size: 0.8rem;
	border-radius: 12px;
	padding: 0.6rem 1.2rem;
	cursor: pointer;

	svg {
		width: 20px;
		height: 20px;
		fill: #fff;
	}
}

// table style below

td {
	.percent {
		position: relative;
		display: inline-block;
		padding: 3px 12px 3px 24px;
		border-radius: 8px;
		// box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
		border: 1px solid rgba(0, 0, 0, 0.15);
		color: #fff;
		font-size: 0.7rem;
		font-weight: 500;

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 11px;
			transform: translateY(-50%);
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background-color: #000;
		}

		&.green {
			color: #52D687;
			border-color: #52D687;
			background-color: #52d6870e;

			&::before {
				background-color: #52D687;
			}
		}

		&.orange {
			color: #FCA642;
			border-color: #FCA642;
			background-color: #FCA6420e;

			&::before {
				background-color: #FCA642;
			}
		}

		&.red {
			border-color: var(--caution-color);

			&::before {
				background-color: var(--caution-color);
			}
		}

		&.purple {
			color: #B881FF;
			border-color: #B881FF;
			background-color: #B881FF0e;

			&::before {
				background-color: #B881FF;
			}
		}

		&.grey {
			padding: 3px 12px;
			color: #bbb;
			border-color: #bbb;
			background-color: #cccccc0e;

			&::before {
				display: none;
			}
		}
	}
}
</style>