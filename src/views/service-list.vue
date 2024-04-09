<template lang="pug">
main#serviceList

    div(style='padding:0 8px;')
        h2
            | My Services
            br
            span(style='font-weight:normal;font-size:1rem;') Create and manage your services.

        
        router-link.createButton(to="/create" style='text-decoration:none;')
            .material-symbols-outlined.fill add_circle
            span(style="font-size: 0.8rem;font-weight:bold") &nbsp;&nbsp;Create New Service

        br
        br

    .tableWrap
        Table
            template(v-slot:head)
                tr
                    th.th.overflow(style="width:166px;")
                        | Service Name
                        span.resizer
                    th.th.center.overflow(style="width:166px;")
                        | Created
                        span.resizer
                    th.th.center.overflow(style="width:150px;")
                        | Plan
                        span.resizer
                    th.th.center.overflow(style="width:120px;")
                        | State
                        span.resizer
                    th.th.center.overflow(style="width:144px;")
                        | Accounts
                        span.resizer
                    th.th.center.overflow(style="width:144px;")
                        | Cloud Storage
                        span.resizer
                    th.th.center.overflow(style="width:144px;")
                        | Datebase
                        span.resizer
            
            template(v-slot:body v-if="!callServiceList")
                template(v-if="Object.keys(serviceIdList).length" v-for="(id, index) in serviceIdList")
                    template(v-if="serviceList[id]")
                        tr.serviceRow(ref="tr" @click="(e) => goServiceDashboard(e, serviceList[id])" @mousedown="(e) => e.currentTarget.classList.add('active')" @mouseleave="(e) => e.currentTarget.classList.remove('active')")
                            td.overflow {{ serviceList[id].service.name }}
                            td.center.overflow {{ typeof serviceList[id].service.timestamp === 'string' ? serviceList[id].service.timestamp : new Date(serviceList[id].service.timestamp).toDateString() }}
                            td.center(style="white-space:nowrap")
                                // plans
                                .state(:style="{color: serviceList[id].service.plan === 'Canceled' ? 'var(--caution-color)' : null}") {{ serviceList[id].service.plan }}
                            td.center
                                // active state
                                .state(v-if="serviceList[id].service.active > 0" style="color:#52D687") Running
                                .state(v-else-if="serviceList[id].service.active == 0") Disabled
                                .state(v-else style='color:var(--caution-color)') Suspended
                            td.center
                                .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                                .percent(v-else :class="getClass(serviceList[id], 'users')") {{ formatUserCount(serviceList[id].service.users) }}
                            td.center
                                .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                                .percent(v-else-if="serviceList[id].plan == 'Trial' || serviceList[id].plan == 'Standard' || serviceList[id].plan == 'Free Standard'" :class="getClass(serviceList[id], 'cloud')") {{ Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) + '%' }}
                                .percent(v-else-if="serviceList[id].plan == 'Premium'" :class="getClass(serviceList[id], 'cloud')") {{ Math.ceil(serviceList[id].storageInfo.cloud/1099511627776*100) + '%' }}
                            td.center
                                .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                                .percent(v-else-if="serviceList[id].plan == 'Trial' || serviceList[id].plan == 'Standard' || serviceList[id].plan == 'Free Standard'" :class="getClass(serviceList[id], 'database')") {{ Math.ceil(serviceList[id].storageInfo.database/4294967296*100) + '%' }}
                                .percent(v-else-if="serviceList[id].plan == 'Premium'" :class="getClass(serviceList[id], 'database')") {{ Math.ceil(serviceList[id].storageInfo.database/107374182400*100) + '%' }}
                            td.center.overflow {{ typeof serviceList[id].service.timestamp === 'string' ? serviceList[id].service.timestamp : new Date(serviceList[id].service.timestamp).toDateString() }}
                tr.noData(v-else)
                    td(colspan="7" style="text-align:center; padding:20px 0;")
                        br
                        br
                        .title No Services
                        br
                        .desc Get started by creating a new service.

    .loadingWrap(v-if="callServiceList")
        img.loading(src="@/assets/img/loading.png")

    br

    .plus
        router-link.material-symbols-outlined.hover.fill(to="/create" style="text-decoration:none") add_circle
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted, ref, nextTick, watch, computed } from 'vue';
import { callServiceList, serviceList, serviceIdList } from '@/views/service-list';
import { loginState } from '@/code/user';
import type Service from '@/code/service';
import Table from '@/components/table.vue';

const router = useRouter();

watch(loginState, nv => {
    if (!nv) {
        router.push('/login');
    }
}, { immediate: true });

let goServiceDashboard = (e: any, service: { [key: string]: any }) => {
    router.push('/my-services/' + service.id);
}

let formatUserCount = (users:number) => {
    if (users < 1000) {
        return users.toString();
    } else if (users < 1000000) {
        return Math.round(users / 1000) + 'K';
    } else {
        return Math.round(users / 1000000) + 'M';
    }
}

let calculateUserPercentage = (users:number, plan:string) => {
    switch (plan) {
        case 'Trial':
        case 'Standard':
            return Math.ceil(users / 10000);
        case 'Primium':
            return Math.ceil(users / 100000);
        default:
            return 0;
    }
}

let calculateCloudPercentage = (cloud:number, plan:string) => {
    switch (plan) {
        case 'Trial':
        case 'Standard':
            return Math.ceil(cloud / 53687091200);
        case 'Primium':
            return Math.ceil(cloud / 1099511627776);
        default:
            return 0;
    }
}

let calculateDatabasePercentage = (database:number, plan:string) => {
    switch (plan) {
        case 'Trial':
        case 'Standard':
            return Math.ceil(database / 4294967296);
        case 'Primium':
            return Math.ceil(database / 107374182400);
        default:
            return 0;
    }
}

let getClass = (serviceId:Service, what:string) => {
    let percentage;

    if (what == 'users') {
        percentage = calculateUserPercentage(serviceId.service.users, serviceId.plan);
    } else if (what == 'cloud') {
        percentage = calculateCloudPercentage(serviceId.storageInfo.cloud, serviceId.plan);
    } else if (what == 'database') {
        percentage = calculateDatabasePercentage(serviceId.storageInfo.database, serviceId.plan);
    } 

    if (percentage >= 0 && percentage < 51) {
        return 'green';
    } else if (percentage >= 51 && percentage < 81) {
        return 'orange';
    } else if (percentage >= 81 && percentage < 101) {
        return 'red';
    }
    return '';
}



console.log(serviceList)
</script>

<style lang="less" scoped>
#serviceList {
    max-width: 1200px;
    margin: 0 auto;
}

.createButton {
    display: inline-block;
    color: var(--main-color);
    text-decoration: none;
    cursor: pointer;

    &:hover .material-symbols-outlined::before {
        box-shadow: inset 0 0 0 4px rgba(41, 63, 230, 0.1);
    }

    .material-symbols-outlined {
        position: relative;
        font-size: 1.6rem;

        &::before {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
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
    }
}
</style>