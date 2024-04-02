<template lang="pug">
br
br
br

main#serviceList
    router-link.sentenceButton(to="/create" style="text-decoration:none")
        .material-symbols-outlined add
        span &nbsp;Create new service

    .tableWrap
        table#resizeMe.table
            thead
                tr
                    th.th.center(style="width:150px; padding-left: 0;")
                    th.th.center(style="width:128px;")
                        | Name of Service
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:160px;")
                        | Cors
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:168px;")
                        | Date Created
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:120px;")
                        | Plan
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:120px;")
                        | State
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:140px;")
                        | Users
                        .resizer(@mousedown="mousedown")
                    th.th.center(style="width:168px;")
                        | Cloud Storage
                        .resizer(@mousedown="mousedown")
                    th.th(style="width:240px;")
                        | Datebase
                        .resizer(@mousedown="mousedown")
            tbody
                template(v-if="serviceIdList" v-for="(id, index) in serviceIdList")
                    template(v-if="serviceList[id]")
                        tr.serviceRow(ref="tr" @click="(e) => goServiceDashboard(e, serviceList[id])" @mousedown="(e) => e.currentTarget.classList.add('active')" @mouseleave="(e) => e.currentTarget.classList.remove('active')")
                            td(style="display:flex;align-items:center;height:60px")
                                .material-symbols-outlined.hover.nohover.upArrow(:class="{ hide: currentServiceIndex !== index }" @click.stop="(e) => toggleServiceInfo(e, index)") arrow_forward_ios
                                .material-symbols-outlined.hover.nohover.downArrow(:class="{ hide: currentServiceIndex === index }" @click.stop="(e) => toggleServiceInfo(e, index)") arrow_forward_ios
                                .serviceActive(:class="{'active': serviceList[id].service.active == 1 }")
                                    .material-symbols-outlined.power.nohover power_settings_new
                            td
                                .overflow {{ serviceList[id].service.name }}
                            td
                                .overflow {{ serviceList[id].service.cors }}
                            td.center(style="white-space:nowrap") {{ typeof serviceList[id].service.timestamp === 'string' ? serviceList[id].service.timestamp : new Date(serviceList[id].service.timestamp).toDateString() }}
                            td.center(style="white-space:nowrap")
                                template(v-if="serviceList[id].plan") {{ serviceList[id].plan }}
                                template(v-else) ...
                            td.center
                                template(v-if="serviceList[id]?.subscription") 
                                    .state(v-if="serviceList[id]?.subscription?.cancel_at_period_end" style="color:var(--caution-color)") Canceled
                                    .state(v-else-if="new Date().getTime() < serviceList[id]?.subscription?.canceled_at" style="color:#FCA642") Suspended
                                    .state(v-else style="color:#52D687") Running
                                template(v-else)
                                    .state(style="color:#52D687") Running
                            td.center
                                .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                                .percent(v-else-if="serviceList[id].plan == 'Unlimited' && Math.ceil(serviceList[id].service.users/10000*100)" :class='{"green": 0 <= Math.ceil(serviceList[id].service.users/10000*100) && Math.ceil(serviceList[id].service.users/10000*100) < 51, "orange": 51 <= Math.ceil(serviceList[id].service.users/10000*100) && Math.ceil(serviceList[id].service.users/10000*100) < 81, "red": 81 <= Math.ceil(serviceList[id].service.users/10000*100) && Math.ceil(serviceList[id].service.users/10000*100) < 101}') {{ Math.ceil(serviceList[id].service.users/10000*100) + '%' }}
                                .percent.green(v-else) 0%
                            td.center
                                .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                                .percent(v-else-if="serviceList[id].plan == 'Unlimited' && Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100)" :class='{"green": 0 <= Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) && Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) < 51, "orange": 51 <= Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) && Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) < 81, "red": 81 <= Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100)}') {{ Math.ceil(serviceList[id].storageInfo.cloud/53687091200*100) + '%' }}
                                .percent.green(v-else) 0%
                            td(style="padding-left:20px;")
                                .percent.purple(v-if="serviceList[id].plan == 'Unlimited'") Unlimited
                                .percent(v-else-if="serviceList[id].plan == 'Unlimited' && Math.ceil(serviceList[id].storageInfo.database/4294967296*100)" :class='{"green": 0 <= Math.ceil(serviceList[id].storageInfo.database/4294967296*100) && Math.ceil(serviceList[id].storageInfo.database/4294967296*100) < 51, "orange": 51 <= Math.ceil(serviceList[id].storageInfo.database/4294967296*100) && Math.ceil(serviceList[id].storageInfo.database/4294967296*100) < 81, "red": 81 <= Math.ceil(serviceList[id].storageInfo.database/4294967296*100)}') {{ Math.ceil(serviceList[id].storageInfo.database/4294967296*100) + '%' }}
                                .percent.green(v-else) 0%
                        tr.cont(ref="trCont" :class="{ active: currentServiceIndex === index }")
                            td(colspan="9")
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
                tr.noData(v-else-if="!serviceIdList && !callServiceList")
                    td(colspan="9" style="text-align:center; padding:20px 0;")
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
import { skapi } from '@/code/admin';
import { loginState } from '@/code/user';
import { callServiceList, serviceList, serviceIdList } from '@/views/service-list';

const router = useRouter();

watch(loginState, nv => {
    if (!nv) {
        router.push('/login');
    }
}, { immediate: true });

onMounted(() => {
    document.querySelector('body').classList.add('fa');
})
let mouseupEvent = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
}
onBeforeUnmount(() => {
    document.querySelector('body').classList.remove('fa');
    document.removeEventListener('mouseup', mouseupEvent);
})

let prevX:number, prevW:number, nextW = 0;
let prevCol:HTMLElement, nextCol:HTMLElement = null;
let widthSum = 0;

nextTick(() => {
    let ths = document.getElementsByTagName('th');
    let thsArr = Array.from(ths);

    thsArr.forEach((e) => {
        let widthStyle = window.getComputedStyle(e).width;
        e.style.width = widthStyle;
        widthSum += widthStyle;
    });
})

let mouseMoveHandler = function (e) {
    let dx = e.clientX - prevX;
    let ths = document.getElementsByTagName('th');
    let thsArr = Array.from(ths);

    thsArr.forEach((e) => {
        widthSum += e.offsetWidth;
    });

    if ((widthSum < window.innerWidth || dx < 0) && (prevW + dx > 100 && nextW - dx > 100)) {
        prevCol.style.width = `${prevW + dx}px`;
        nextCol.style.width = `${nextW - dx}px`;
    }
};

let mousedown = function (e) {
    console.log(e)
    prevCol = e.target.parentNode;
    nextCol = prevCol.nextSibling;

    let prevStyles = window.getComputedStyle(e.target.parentNode);
    let nextStyles = window.getComputedStyle(prevCol.nextSibling);

    prevX = e.clientX;
    prevW = parseInt(prevStyles.width, 10);
    nextW = parseInt(nextStyles.width, 10);
    document.addEventListener('mousemove', mouseMoveHandler);
};

document.addEventListener('mouseup', mouseupEvent);

let currentServiceIndex = ref(null);

let goServiceDashboard = (e: any, service: Object) => {
    // e.currentTarget.classList.add('active');

    // setTimeout(() => {
    router.push('/my-services/' + service.id);
    // }, 500);
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
    padding: 0 20px;
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