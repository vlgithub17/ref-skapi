<template lang="pug">
main#serviceList
    section.infoBox
        h2 My Services

        hr
        
        br

        p Create a new service to get started.

        .error(v-if='!user?.email_verified' style='margin-bottom: 4px;')
            .material-symbols-outlined.notranslate.fill warning
            router-link(to="/account-setting") Please verify your email address to create services.
        form(@submit.prevent="createService" style='display: flex;gap: 8px;width: 480px;max-width: 100%;' :class='{disabled: !user?.email_verified}')
            input.big(placeholder="New service name (Max 40 chars)" maxlength="40" required v-model="newServiceName")
            button.final(type="submit" style='flex-shrink: 0;') Create
        
        br
        
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
                tr(v-if="callServiceList")
                    td(colspan="8").
                        Loading ... &nbsp;
                        #[img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")]
                tr(v-else-if="!Object.keys(serviceIdList).length")
                    td(colspan="8") You have no services yet.

                template(v-else v-for="id in serviceIdList")
                    tr.serviceRow(v-if="serviceList[id]" @click="() => goServiceDashboard(serviceList[id])" @mousedown="(e) => e.currentTarget.classList.add('active')" @mouseleave="(e) => e.currentTarget.classList.remove('active')")
                        td.overflow {{ serviceList[id].service.name }}
                        td.overflow(style="white-space:nowrap")
                            // plans
                            .state(v-if="serviceList[id].service.subs_id && !serviceList[id].subscription")
                                img.loading(style='filter: grayscale(1);' src="@/assets/img/loading.png")
                            span(v-else :style="{fontWeight: serviceList[id].service.plan === 'Canceled' ? 'normal' : null, color: serviceList[id].service.plan === 'Canceled' ? 'var(--caution-color)' : null}") {{ serviceList[id].service.plan || serviceList[id].plan }}
                        td.overflow
                            // active state
                            .state(v-if="serviceList[id].service.active > 0" style="color:var(--text-green);font-weight:normal;") Running
                            .state(v-else-if="serviceList[id].service.active == 0") Disabled
                            .state(v-else-if="serviceList[id].service.suspended" style='color:var(--caution-color);font-weight:normal') Suspended
                            .state(v-else) -
                        td.overflow
                            // users
                            .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                            .percent(v-else :class="getClass(serviceList[id], 'users')") {{ calculateUserPercentage(serviceList[id].service.users, serviceList[id].plan, true) }}

                        td.overflow
                            // database
                            .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                            .percent(v-else :class="getClass(serviceList[id], 'database')") {{ calculateDatabasePercentage(serviceList[id].storageInfo.database, serviceList[id].plan) + '%' }}

                        td.overflow
                            // cloud storage
                            .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                            .percent(v-else :class="getClass(serviceList[id], 'cloud')") {{ calculateCloudPercentage(serviceList[id].storageInfo.cloud, serviceList[id].plan) + '%' }}

                        td.overflow
                            // host storage
                            .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                            .percent(v-else :class="getClass(serviceList[id], 'host')") {{ serviceList[id].plan === 'Trial' ? 'N/A' : calculateHostPercentage(serviceList[id].storageInfo.host, serviceList[id].plan) + '%' }}

                        td.overflow
                            // email storage
                            .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                            .percent(v-else :class="getClass(serviceList[id], 'email')") {{ serviceList[id].plan === 'Trial' ? 'N/A' : calculateEmailPercentage(serviceList[id].storageInfo.email, serviceList[id].plan) + '%' }}

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { watch, ref } from 'vue';
import { callServiceList, serviceList, serviceIdList } from '@/views/service-list';
import { loginState, user } from '@/code/user';
import type Service from '@/code/service';
import Table from '@/components/table.vue';

const router = useRouter();

watch(loginState, nv => {
    if (!nv) {
        router.push('/login');
    }
}, { immediate: true });

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

let calculateUserPercentage = (users: number, plan: string, formatStr = false) => {
    let getUserUnit = (user:number) => {
        let units = ['k', 'M', 'B', 'T'];
        let result = '';

        for (let i = units.length - 1; i >= 0; i--) {
            let unitValue = Math.pow(10, (i + 1) * 3);
            if (user >= unitValue) {
                if (i === 0) {
                    result = user.toString();
                } else {
                    result = (user / unitValue).toFixed(2) + units[i];
                }
                break;
            }
        }

        if (result === '') {
            result = user.toString();
        }

        return result;
    }

    switch (plan) {
        case 'Trial':
        case 'Standard':
        case 'Free Standard':
            return formatStr ? `${getUserUnit(users)}/10k` : ((users / 10000) * 100).toFixed(2);
        case 'Premium':
            return formatStr ? `${getUserUnit(users)}/100k` : ((users / 100000) * 100).toFixed(2);
        default:
            return formatStr ? 'N/A' : 0;
    }
}

let calculateEmailPercentage = (email: number, plan: string) => {
    switch (plan) {
        case 'Trial':
            return null;
        case 'Standard':
        case 'Free Standard':
            // 1GB
            return Math.ceil(email / 1073741824);
        case 'Premium':
            // 10 GB
            return Math.ceil(email / 10737418240);
        default:
            return 0;
    }
}


let calculateHostPercentage = (host: number, plan: string) => {
    switch (plan) {
        case 'Trial':
            return null;
        case 'Standard':
        case 'Free Standard':
            return Math.ceil(host / 53687091200);
        case 'Premium':
            return Math.ceil(host / 1099511627776);
        default:
            return 0;
    }
}

let calculateCloudPercentage = (cloud: number, plan: string) => {
    switch (plan) {
        case 'Trial':
        case 'Standard':
        case 'Free Standard':
            return Math.ceil(cloud / 53687091200);
        case 'Premium':
            return Math.ceil(cloud / 1099511627776);
        default:
            return 0;
    }
}

let calculateDatabasePercentage = (database: number, plan: string) => {
    switch (plan) {
        case 'Trial':
        case 'Standard':
        case 'Free Standard':
            return Math.ceil(database / 4294967296);
        case 'Premium':
            return Math.ceil(database / 107374182400);
        default:
            return 0;
    }
}

let getClass = (serviceClass: Service, what: string) => {
    let percentage;

    if (what == 'users') {
        percentage = calculateUserPercentage(serviceClass.service.users, serviceClass.plan) as number;
    }
    else if (what == 'cloud') {
        percentage = calculateCloudPercentage(serviceClass.storageInfo.cloud, serviceClass.plan);
    }
    else if (what == 'host') {
        percentage = calculateHostPercentage(serviceClass.storageInfo.host, serviceClass.plan);
    }
    else if (what == 'database') {
        percentage = calculateDatabasePercentage(serviceClass.storageInfo.database, serviceClass.plan);
    }
    else if (what == 'email') {
        percentage = calculateEmailPercentage(serviceClass.storageInfo.email, serviceClass.plan);
    }
    if (percentage == null) {
        return 'grey';
    }
    if (percentage >= 0 && percentage < 51) {
        return 'green';
    }
    else if (percentage >= 51 && percentage < 81) {
        return 'orange';
    }
    else if (percentage >= 81 && percentage < 101) {
        return 'red';
    }
    return 'grey';
}
</script>

<style lang="less" scoped>
#serviceList {
    max-width: 1200px;
    margin: 8px auto 0;
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