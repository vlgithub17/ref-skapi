<template lang="pug">
br
br

main#serviceList
    router-link.sentenceButton(to="/create" style="text-decoration:none;margin: 8px;")
        .material-symbols-outlined add
        span &nbsp;Create Service

    br
    br

    .tableWrap
        Table
            template(v-slot:head)
                tr
                    th.th.center.overflow(style="width:44px;padding:0;")
                        span.resizer
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
                            td.center(style="padding:0;")
                                .material-symbols-outlined.hover.nohover.upArrow(:class="{ hide: currentServiceIndex !== index }" @click.stop="(e) => toggleServiceInfo(e, index)") arrow_forward_ios
                                .material-symbols-outlined.hover.nohover.downArrow(:class="{ hide: currentServiceIndex === index }" @click.stop="(e) => toggleServiceInfo(e, index)") arrow_forward_ios
                            td.overflow {{ serviceList[id].service.name }}
                            td.overflow {{ typeof serviceList[id].service.timestamp === 'string' ? serviceList[id].service.timestamp : new Date(serviceList[id].service.timestamp).toDateString() }}
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
                        tr.cont(ref="trCont" :class="{ active: currentServiceIndex === index }")
                            td(colspan="8")
                                .info
                                    .title Name
                                    .value(style="color:var(--black-8);font-weight:700") {{ serviceList[id].service.name }}
                                .info 
                                    .title Service ID 
                                    .value {{ serviceList[id].id }}
                                .info 
                                    .title CORS 
                                    .value {{ serviceList[id].service.cors }}
                                br
                                .info.inline
                                    .title # of Users 
                                    .value {{ serviceList[id].service.users }}
                                .info.inline 
                                    .title Database Used
                                    .value {{ serviceList[id].storageInfo.database }}
                                .info.inline 
                                    .title Subscription Plan
                                    router-link(:to="`/subscription/${serviceList[id].id}`" style="color:var(--main-color);font-weight:700;") {{ serviceList[id].plan }}
                                .info.inline 
                                    .title Hosting Strorage
                                    .value 
                                        template(v-if="serviceList[id].service.subdomain") {{ serviceList[id].storageInfo.host }}
                                        template(v-else) -
                                br
                                br
                                .info.inline 
                                    .title Locale
                                    .value {{ serviceList[id].service.created_locale }}
                                .info.inline 
                                    .title Cloud Storage Used
                                    .value {{ serviceList[id].storageInfo.cloud }}
                                .info.inline 
                                    .title Date Created
                                    .value {{ serviceList[id].dateCreated }}
                                .info.inline 
                                    .title Subdomain
                                    .value(v-if="serviceList[id].service?.subdomain") {{ serviceList[id].service?.subdomain }}
                                    .value(v-else) -

                tr.noData(v-else)
                    td(colspan="8" style="text-align:center; padding:20px 0;")
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

// onMounted(() => {
//     document.querySelector('body').classList.add('fa');
// })
// onBeforeUnmount(() => {
//     document.querySelector('body').classList.remove('fa');
//     // document.removeEventListener('mouseup', mouseupEvent);
// })

let currentServiceIndex = ref(null);

let goServiceDashboard = (e: any, service: { [key: string]: any }) => {
    router.push('/my-services/' + service.id);
}

let toggleServiceInfo = (e: any, index: number) => {
    if (currentServiceIndex.value === index || e.target.classList.contains('upArrow')) {
        currentServiceIndex.value = null;
    } else {
        currentServiceIndex.value = index;
    }
}

</script>

<style lang="less" scoped>
#serviceList {
    max-width: 1200px;
    margin: 0 auto;
    // padding: 0 20px;
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