<template lang="pug">
br
br

main#serviceList
    div(style='padding:8px;')
        h1 My Services
        p Create and manage your web services.

    br

    .createButton
        router-link.material-symbols-outlined.fill(to="/create" style="text-decoration:none;font-size:1.5rem") add_circle
        span(style="font-size: 0.8rem;font-weight:bold") &nbsp;&nbsp;Create New Service

    br
    br

    .loadingWrap(v-if="callServiceList")
        img.loading(src="@/assets/img/loading.png")

    .tableWrap(v-else)
        Table(v-if="Object.keys(serviceIdList).length")
            template(v-slot:head)
                tr
                    th.th.overflow(style="width:166px;")
                        | Service Name
                        span.resizer
                    th.th.center.overflow(style="width:128px;")
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
                    th.th.center.overflow(style="width:166px;")
                        | Created
                        span.resizer

            template(v-slot:body)
                template(v-for="(id, index) in serviceIdList")
                    template(v-if="serviceList[id]")
                        tr.serviceRow(ref="tr" @click="(e) => goServiceDashboard(e, serviceList[id])" @mousedown="(e) => e.currentTarget.classList.add('active')" @mouseleave="(e) => e.currentTarget.classList.remove('active')")
                            td.overflow {{ serviceList[id].service.name }}
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
                                .percent(v-else-if="Math.ceil(serviceList[id].service.users/10000*100)" :class='{"green": 0 <= Math.ceil(serviceList[id].service.users/10000*100) && Math.ceil(serviceList[id].service.users/10000*100) < 51, "orange": 51 <= Math.ceil(serviceList[id].service.users/10000*100) && Math.ceil(serviceList[id].service.users/10000*100) < 81, "red": 81 <= Math.ceil(serviceList[id].service.users/10000*100) && Math.ceil(serviceList[id].service.users/10000*100) < 101}') {{ Math.ceil(serviceList[id].service.users/10000*100) + '%' }}
                                .percent.green(v-else) 0%
                            td.center
                                .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                                .percent(v-else-if="Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100)" :class='{"green": 0 <= Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) && Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) < 51, "orange": 51 <= Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) && Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) < 81, "red": 81 <= Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100)}') {{ Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) + '%' }}
                                .percent.green(v-else) 0%
                            td.center
                                .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                                .percent(v-else-if="Math.ceil(serviceList[id].storageInfo.database/4294967296*100)" :class='{"green": 0 <= Math.ceil(serviceList[id].storageInfo.database/4294967296*100) && Math.ceil(serviceList[id].storageInfo.database/4294967296*100) < 51, "orange": 51 <= Math.ceil(serviceList[id].storageInfo.database/4294967296*100) && Math.ceil(serviceList[id].storageInfo.database/4294967296*100) < 81, "red": 81 <= Math.ceil(serviceList[id].storageInfo.database/4294967296*100)}') {{ Math.ceil(serviceList[id].storageInfo.database/4294967296*100) + '%' }}
                                .percent.green(v-else) 0%
                            td.center.overflow {{ typeof serviceList[id].service.timestamp === 'string' ? serviceList[id].service.timestamp : new Date(serviceList[id].service.timestamp).toDateString() }}
        .noData(v-else)
            .title No Services
            br
            .desc Get started by creating a new service.

    br

    .plus
        router-link.material-symbols-outlined.hover.fill(to="/create" style="text-decoration:none") add_circle
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted, ref, nextTick, watch } from 'vue';
// import { skapi } from '@/code/admin';
import { loginState } from '@/code/user';
import { callServiceList, serviceList, serviceIdList } from '@/views/service-list';
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
</script>

<style lang="less" scoped>
#serviceList {
    max-width: 1200px;
    margin: 0 auto;
}

.createButton {
    display: inline-block;    
    color: var(--main-color);
    cursor: pointer;
    padding: 0 8px;

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

.noData {
    .title {
        font-size: 1rem;
        font-weight: 400;
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

// table style below

tbody tr {
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
        font-weight: 400;

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