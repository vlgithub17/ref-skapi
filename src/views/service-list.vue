<template lang="pug">
main#serviceList
	//- section.infoBox
		h2 My Services

		hr
		
		br

		p Create a new service to get started.

		.error(v-if='!user?.email_verified' style='margin-bottom: 4px;')
			//- .material-symbols-outlined.notranslate.fill warning
			svg
				use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
			router-link(to="/account-setting") Please verify your email address to create services.
		form(@submit.prevent="createService" style='display: flex;gap: 8px;width: 480px;max-width: 100%;' :class='{disabled: !user?.email_verified}')
			input.big(placeholder="New service name (Max 40 chars)" maxlength="40" required v-model="newServiceName")
			button.final(type="submit" style='flex-shrink: 0;') Create
		
		br

	section.section
		.title.faktum My Services
		.desc Create a new service to get started.

		.error(v-if='!user?.email_verified' style='margin-bottom: 4px;')
			//- .material-symbols-outlined.notranslate.fill warning
			svg
				use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
			router-link(to="/account-setting") Please verify your email address to create services.

		form(@submit.prevent="createService" :class='{disabled: !user?.email_verified}')
			input.big(placeholder="New service name (Max 40 chars)" maxlength="40" required v-model="newServiceName")
			button.final(type="submit" style='width: 100%; margin-top:0.5rem') Create
		
	.tableWrap(style="margin-top:.5rem")
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
                    tr.serviceRow(v-if="serviceList[id]" @click="() => goServiceDashboard(serviceList[id])" @mousedown="(e) => e.currentTarget.classList.add('active')" @mouseleave="(e) => e.currentTarget.classList.remove('active')")
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

    if(service.plan === 'Unlimited') {
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
		font-size: 1.4rem;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.desc {
		margin-bottom: 1rem;
		line-height: 1.9;
		color: #333;
	}
}

// table style below

tbody tr.serviceRow {
	&:not(.active):hover {
		background-color: rgba(41, 63, 230, 0.05);
		cursor: pointer;
	}

	&.active {
		background-color: rgba(41, 63, 230, 0.10);
	}
}

td {
	.percent {
		display: inline-block;
		padding: 3px 12px;
		border-radius: 4px;
		box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
		color: #fff;
		font-weight: bold;

		&.green {
			background-color: #52D687;
		}

		&.orange {
			background-color: #FCA642;
		}

		&.red {
			background-color: var(--caution-color);
		}

		&.purple {
			background-color: #B881FF;
		}

		&.grey {
			background-color: #ccc;
		}
	}
}
</style>