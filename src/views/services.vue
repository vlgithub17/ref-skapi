<template lang="pug">
br
br
br

//- router-link.service(:to="`/my-services/abcdefghijklmnopqrstuvwxyz`") abcdefghijklmnopqrstuvwxyz
//- router-link.service(:to="`/my-services/hijklmn`") hijklmn

main#services
    .sentenceButton(@click="createService")
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
                template(v-if="services.length" v-for="(service, index) in services")
                    tr(ref="tr" @click="(e) => goServiceDashboard(e, service)")
                        td(style="display:flex;align-items:center;height:60px")
                            .material-symbols-outlined.hover.nohover.upArrow(:class="{ hide: currentServiceIndex !== index }" @click.stop="(e) => toggleServiceInfo(e, index)") arrow_forward_ios
                            .material-symbols-outlined.hover.nohover.downArrow(:class="{ hide: currentServiceIndex === index }" @click.stop="(e) => toggleServiceInfo(e, index)") arrow_forward_ios
                            .serviceActive(:class="{'active': service.active == 1 }")
                                .material-symbols-outlined.power.nohover power_settings_new
                        td
                            .overflow {{ service.name }}
                        td
                            .overflow {{ service.cors }}
                        td.center(style="white-space:nowrap") {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                        td.center
                            template(v-if="service.group == 1") Trial
                            template(v-else-if="service.group == 2") Standard
                            template(v-else-if="service.group == 3") Premium
                            template(v-else-if="service.group == 50") Unlimited
                            template(v-else-if="service.group == 51") Free Standard
                            template(v-else) ...
                        td.center
                            template(v-if="service?.subscription") 
                                .state(v-if="service?.subscription?.cancel_at_period_end" style="color:var(--caution-color)") Canceled
                                .state(v-else-if="new Date().getTime() < service?.subscription?.canceled_at" style="color:#FCA642") Suspended
                                .state(v-else style="color:#52D687") Running
                            template(v-else)
                                .state(style="color:#52D687") Running
                        td.center
                            .percent.purple(v-if="service.group == 50") Unlimited
                            .percent(v-else-if="service.group !== 50 && Math.ceil(service.users/10000*100)" :class='{"green": 0 <= Math.ceil(service.users/10000*100) && Math.ceil(service.users/10000*100) < 51, "orange": 51 <= Math.ceil(service.users/10000*100) && Math.ceil(service.users/10000*100) < 81, "red": 81 <= Math.ceil(service.users/10000*100) && Math.ceil(service.users/10000*100) < 101}') {{ Math.ceil(service.users/10000*100) + '%' }}
                            .percent.green(v-else) 0%
                        td.center
                            .percent.purple(v-if="service.group == 50") Unlimited
                            //- .percent(v-else-if="service.group !== 50 && Math.ceil(storageInfo?.[service]?.cloud/53687091200*100)" :class='{"green": 0 <= Math.ceil(storageInfo?.[service]?.cloud/53687091200*100) && Math.ceil(storageInfo?.[service]?.cloud/53687091200*100) < 51, "orange": 51 <= Math.ceil(storageInfo?.[service]?.cloud/53687091200*100) && Math.ceil(storageInfo?.[service]?.cloud/53687091200*100) < 81, "red": 81 <= Math.ceil(storageInfo?.[service]?.cloud/53687091200*100)}') {{ Math.ceil(storageInfo?.[service]?.cloud/53687091200*100) + '%' }}
                            .percent.green(v-else) 0%
                        td(style="padding-left:20px;")
                            .percent.purple(v-if="service.group == 50") Unlimited
                            //- .percent(v-else-if="service.group !== 50 && Math.ceil(storageInfo?.[service]?.database/4294967296*100)" :class='{"green": 0 <= Math.ceil(storageInfo?.[service]?.database/4294967296*100) && Math.ceil(storageInfo?.[service]?.database/4294967296*100) < 51, "orange": 51 <= Math.ceil(storageInfo?.[service]?.database/4294967296*100) && Math.ceil(storageInfo?.[service]?.database/4294967296*100) < 81, "red": 81 <= Math.ceil(storageInfo?.[service]?.database/4294967296*100)}') {{ Math.ceil(storageInfo?.[service]?.database/4294967296*100) + '%' }}
                            .percent.green(v-else) 0%
                    tr.cont(ref="trCont" :class="{ active: currentServiceIndex === index }")
                        td(colspan="9")
                            .info
                                .title Name
                                .value(style="color:var(--black-8);font-weight:700") {{ service.name }}
                            .info 
                                .title Service ID 
                                .value {{ service.service }}
                            .info 
                                .title CORS 
                                .value {{ service.cors }}
                            br
                            .info.inline
                                .title # of Users 
                                .value {{ service.users }}
                            .info.inline 
                                .title Database Used
                                .value -
                            .info.inline 
                                .title Subscription Plan
                                router-link(:to="`/subscription/${service.service}`" style="color:var(--main-color);font-weight:700;")
                                    template(v-if="service.group == 1") Trial
                                    template(v-else-if="service.group == 2") Standard
                                    template(v-else-if="service.group == 3") Premium
                                    template(v-else-if="service.group == 50") Unlimited
                                    template(v-else-if="service.group == 51") Free Standard
                                    template(v-else) ...
                            .info.inline 
                                .title Hosting Strorage
                                .value -
                            br
                            br
                            .info.inline 
                                .title Locale
                                .value -
                            .info.inline 
                                .title Cloud Storage Used
                                .value -
                            .info.inline 
                                .title Date Created
                                .value {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                            .info.inline 
                                .title Subdomain
                                .value(v-if="service?.subdomain") {{ service.subdomain }}
                                .value(v-else) -
                tr.noData(v-else)
                    td(colspan="9" style="text-align:center; padding-top:20px;")
                        br
                        br
                        .title No Services
                        br
                        .desc Get started by creating a new service.

    .loadingWrap(v-if="serviceFetching")
        img.loading(src="@/assets/img/loading.png")

    br

    .plus(v-if="!serviceFetching")
        .material-symbols-outlined.hover.fill(@click="createService" style="") add_circle
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted, ref, nextTick } from 'vue';

const router = useRouter();

onMounted(() => {
    document.querySelector('body').classList.add('fa');
})
onBeforeUnmount(() => {
    document.querySelector('body').classList.remove('fa');
})

let prevX, prevW, nextW = 0;
let prevCol, nextCol = null;
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

document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
});

let services = [
    {
        active: 1,
        name: 'service name',
        cors: 'service cors',
        timestamp: 1709102706561,
        group: 1,
        service: 'ap226E8TXhYtbcXRgi5D',
        users: 10
    }
];
let serviceFetching = ref(false);
let currentServiceIndex = ref(null);

let goServiceDashboard = (e:any, service:Object) => {
    e.currentTarget.classList.add('active');

    setTimeout(() => {
        router.push('/my-services/' + service.service);
    }, 500);
}

let toggleServiceInfo = (e:any, index:number) => {
    if (currentServiceIndex.value === index || e.target.classList.contains('upArrow')) {
        currentServiceIndex.value = null;
    } else {
        currentServiceIndex.value = index;
    }
}

</script>

<style lang="less" scoped>
#services {
    padding: 0 20px;
}
.service {
    display: block;
    text-decoration: none;
    color: var(--black-8);
    padding: 10px 0;
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