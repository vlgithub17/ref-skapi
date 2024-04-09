<template lang="pug">
br
br
br
br
br

main#serviceList
    //- router-link.sentenceButton(to="/create" style="text-decoration:none;margin: 8px;")
    //-     .material-symbols-outlined add
    //-     span &nbsp;Create Service
    router-link.createButton(to="/create")
        .material-symbols-outlined.fill(style="text-decoration:none;font-size:1.5rem") add_circle
        span(style="font-size: 0.8rem;font-weight:bold") &nbsp;&nbsp;Create New Service

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
    // padding: 0 20px;
}

.createButton {
    padding: 0 20px;
    color: var(--main-color);
    text-decoration: none;
    cursor: pointer;

    &:hover .material-symbols-outlined::before {
        background-color: rgba(41, 63, 230, 0.1);
    }

    .material-symbols-outlined {
        position: relative;
        font-size: 1.6rem;
        padding: 4px;
        color: var(--main-color);
        cursor: pointer;

        &::before {
            position: absolute;
            content: '';
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            background-color: unset;
            border-radius: 50%;
        }
    }
}

.service {
    display: block;
    text-decoration: none;
    color: var(--black-8);
    padding: 10px 0;
}

.noData {
    color: var(--black-4);

    .title {
        font-size: 1rem;
        font-weight: 700;
    }
}

.loadingWrap {
    text-align: center;
    padding-top: 1rem;
}

.plus {
    display: block;
    text-align: center;
    padding-bottom: 2rem;

    .material-symbols-outlined {
        font-size: 1.6rem;
        padding: 4px;
        color: var(--main-color);
        cursor: pointer;
    }
}
</style>