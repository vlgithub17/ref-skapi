<template lang="pug">
br
br
br

//- router-link.service(:to="`/my-services/abcdefghijklmnopqrstuvwxyz`") abcdefghijklmnopqrstuvwxyz
//- router-link.service(:to="`/my-services/hijklmn`") hijklmn

main#services
    .sentenceButton(@click="createService")
        .material-symbols-outlined.mid add
        span Create new service

    .tableWrap
        table#resizeMe.table
            thead
                tr
                    th.th.center(style="width:150px;")
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
                    tr(ref="tr" :class="{'active' : showInfo}" @click="(e) => goServiceDashboard(e, service)")
                        td(style="display:flex;align-items:center;")
                            .material-symbols-outlined.mid.upArrow.hide(ref="upArrow" @click.stop="(e) => showServiceInfo(e, index)") arrow_forward_ios
                            .material-symbols-outlined.mid.downArrow(ref="downArrow" @click.stop="(e) => showServiceInfo(e, index)") arrow_forward_ios
                            .serviceActive(:class="{'active': service.active == 1 }")
                                .material-symbols-outlined.sml.power power_settings_new
                        td
                            .overflow {{ service.service.name }}
                        td
                            .overflow {{ service.service.cors }}
                        td.center {{ typeof service.service.timestamp === 'string' ? service.service.timestamp : new Date(service.service.timestamp).toDateString() }}
                        td.center
                            template(v-if="service.service.group == 1") Trial
                            template(v-else-if="service.service.group == 2") Standard
                            template(v-else-if="service.service.group == 3") Premium
                            template(v-else-if="service.service.group == 50") Unlimited
                            template(v-else-if="service.service.group == 51") Free Standard
                            template(v-else) ...
                        td.center
                            template(v-if="service?.subscription") 
                                template(v-if="service?.subscription?.cancel_at_period_end") 
                                    .state(style="color:var(--caution-color)") Canceled
                                template(v-else-if="new Date().getTime() < service?.subscription?.canceled_at") 
                                    .state(style="color:#FCA642") Suspended
                                template(v-else style="color:#52D687") 
                                    .state(style="color:#52D687") Running
                            template(v-else)
                                .state(style="color:#52D687") Running
                        td.center
                            template(v-if="service.service.group == 50")
                                .percent.purple Unlimited
                            template(v-else-if="service.service.group !== 50 && Math.ceil(service.service.users/10000*100)")
                                .percent(:class='{"green": 0 <= Math.ceil(service.service.users/10000*100) && Math.ceil(service.service.users/10000*100) < 51, "orange": 51 <= Math.ceil(service.service.users/10000*100) && Math.ceil(service.service.users/10000*100) < 81, "red": 81 <= Math.ceil(service.service.users/10000*100) && Math.ceil(service.service.users/10000*100) < 101}') {{ Math.ceil(service.service.users/10000*100) + '%' }}
                            template(v-else)
                                .percent.green 0%
                        td.center
                            template(v-if="service.group == 50")
                                .percent.purple Unlimited
                            //- template(v-else-if="service.group !== 50 && Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100)")
                                .percent(:class='{"green": 0 <= Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) && Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) < 51, "orange": 51 <= Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) && Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) < 81, "red": 81 <= Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100)}') {{ Math.ceil(storageInfo?.[service.service]?.cloud/53687091200*100) + '%' }}
                            template(v-else)
                                .percent.green 0%
                        td(style="padding-left:40px;")
                            template(v-if="service.group == 50")
                                .percent.purple Unlimited
                            //- template(v-else-if="service.group !== 50 && Math.ceil(storageInfo?.[service.service]?.database/4294967296*100)")
                                .percent(:class='{"green": 0 <= Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) && Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) < 51, "orange": 51 <= Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) && Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) < 81, "red": 81 <= Math.ceil(storageInfo?.[service.service]?.database/4294967296*100)}') {{ Math.ceil(storageInfo?.[service.service]?.database/4294967296*100) + '%' }}
                            template(v-else)
                                .percent.green 0%
                    tr.cont(ref="trCont" :class="{'active' : showInfo}")
                        td(colspan="9")
                            .info
                                .title Name
                                .value(style="color:var(--primary-text);font-weight:700") {{ service.name }}
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
                                //- .value {{ convertToMb(storageInfo?.[service.service]?.database) + '/4000MB' }}
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
                                template(v-if="service?.subdomain")
                                    //- .value {{ convertToMb(storageInfo?.[service.service]?.host) + '/50000MB' }}
                                template(v-else)
                                    .value -
                            br
                            br
                            .info.inline 
                                .title Locale
                                //- .value {{ regions?.[service.region] || service.region }}
                            .info.inline 
                                .title Cloud Storage Used
                                //- .value {{ convertToMb(storageInfo?.[service.service]?.cloud) + '/50000MB' }}
                            .info.inline 
                                .title Date Created
                                .value {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                            .info.inline 
                                .title Subdomain
                                template(v-if="service?.subdomain")
                                    .value {{ service.subdomain }}
                                template(v-else)
                                    .value -
                tr.noServices(v-else)
                    td(colspan="9" style="text-align:center; padding-top:20px;")
                        h3 No Services
                        br
                        p Get started by creating a new service.

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { services } from '@/data.js'
import { tableSetting, mouseMoveHandler, mousedown } from '@/assets/js/table.js'

onMounted(() => {
    document.querySelector('body').classList.add('fa');
})
onBeforeUnmount(() => {
    document.querySelector('body').classList.remove('fa');
})

tableSetting();

document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
});

const router = useRouter();
let showInfo = ref(false);
let showMore = ref(false);
let downArrow = ref(null);
let upArrow = ref(null);
let trCont = ref(null);
let currentServiceIndex = null;

let goServiceDashboard = (e:Event, service:object) => {
    e.currentTarget.classList.add('active');

    setTimeout(() => {
        router.push('/my-services/' + service.service);
    }, 500);
}

let showServiceInfo = (e:Event, index:number) => {
    if(currentServiceIndex == index) {
        downArrow.value[index].classList.remove('hide');
        upArrow.value[index].classList.add('hide');
        trCont.value[index].classList.remove('active');
        currentServiceIndex = null;
        showMore.value = false;

        return;
    } else if(e.target.classList.contains('upArrow')) {
        downArrow.value[index].classList.remove('hide');
        upArrow.value[index].classList.add('hide');
        trCont.value[index].classList.remove('active');
        currentServiceIndex = null;
        showMore.value = false;

        return;
    }

    currentServiceIndex = index;
    downArrow.value[index].classList.add('hide');
    upArrow.value[index].classList.remove('hide');
    trCont.value[index].classList.add('active');
    showMore.value = false;
}

</script>

<style lang="less" scoped>
#services {
    padding: 0 20px;
}
.service {
    display: block;
    text-decoration: none;
    color: #000;
    padding: 10px 0;
}
.tableWrap {
    position: relative;
    margin-top: 16px;
    overflow-x: auto;

    .noServices {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        h3 {
            color: rgba(0, 0, 0, 0.40);
        }

        p {
            color: rgba(0, 0, 0, 0.40);
            font-weight: 500;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;

        thead {
            position: sticky;
            top: 0px;
            background-color: #fafafa;
            z-index: 10;
            text-align: left;

            tr {
                height: 60px;

                th {
                    position: relative;
                    color: rgba(0, 0, 0, 0.40);
                    font-size: 0.7rem;
                    font-weight: 500;
                    padding-left: 40px;

                    &::after {
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 1px;
                        left: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.1);
                        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
                    }

                    &:first-child {
                        padding-left: 0;
                    }

                    &:last-child {
                        .resizer {
                            display: none;
                        }
                    }

                    &.center {
                        padding: 0;
                        text-align: center;
                    }

                    .resizer {
                        position: absolute;
                        top: 50%;
                        right: 0px;
                        transform: translateY(-50%);
                        width: 4px;
                        height: 20px;
                        background-color: rgba(0, 0, 0, 0.1);
                        cursor: col-resize;

                        &.contrast {
                            background-color: #fff !important;
                        }
                    }

                    .resizable {
                        height: 100px;
                        width: 100px;
                        position: relative;
                    }
                }
            }
        }

        tbody {
            overflow-y: auto;
            font-weight: 400;

            tr {
                &:not(.cont, .active, .noServices):hover {
                    background-color: rgba(41,63,230,0.05);
                    cursor: pointer;
                }
                &.active {
                    background-color: rgba(41, 63, 230, 0.10);
                }
                &.cont {
                    height: 305px;
                    background-color: rgba(0, 0, 0, 0.02);
                    display: none;

                    &.active {
                        display: table-row;
                    }

                    td {
                        padding: 0 75px;
                    }

                    .info {
                        display: block;
                        margin-bottom: 10px;

                        &.inline {
                            display: inline-block;
                            width: 25%;

                            .title {
                                display: block;
                                margin-bottom: 8px;
                            }
                        }
                        .title {
                            display: inline-block;
                            font-weight: 400;
                            color: rgba(0, 0, 0, 0.40);
                            margin-right: 10px;
                        }
                        .value {
                            display: inline-block;
                            color: rgba(0, 0, 0, 0.60);
                        }
                    }
                }
                &.noServices {
                    td {
                        &::after {
                            display: none !important;
                        }
                    }
                }
            }

            td {
                position: relative;
                height: 60px;
                padding: 0 20px;
                font-size: 0.8rem;

                &::after {
                    position: absolute;
                    content: '';
                    width: 100%;
                    height: 1px;
                    left: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.1);
                    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
                }

                &.center {
                    padding: 0;
                    text-align: center;
                    font-size: 0.8rem;
                }

                .percent {
                    display: inline-block;
                    padding: 3px 12px;
                    border-radius: 4px;
                    box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.15) inset;
                    color: #fff;

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

                .upArrow, .downArrow {
                    display: inline-block;
                    vertical-align: middle;
                    padding: 10px;
                    border-radius: 50%;
                    font-size: 24px;
                    color: rgba(0,0,0,0.4);
                    cursor: pointer;

                    &:hover {
                        background-color: rgba(41, 63, 230, 0.10);
                    }
                    &.hide {
                        display: none;
                    }
                }

                .upArrow {
                    rotate: 270deg;
                }

                .downArrow {
                    rotate: 90deg;
                }

                .menu {
                    position: absolute;
                    right: 28px;
                    top: 50%;
                    padding: 10px;
                    text-align: center;
                    padding-top: 8px;
                    border-radius: 50%;
                    transform: translateY(-50%);
                    z-index: 1;

                    &:hover {
                        background-color: rgba(41, 63, 230, 0.10);
                    }

                }
                #moreVert {
                    &.hide {
                        display: none;
                    }

                    &.show {
                        display: block;
                    }
                }

                .serviceActive {
                    position: relative;
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    margin: 0 auto;
                    border-radius: 50%;
                    background-color: rgba(0,0,0,0.25);

                    &.active {
                        background-color: #5AD858;
                    }

                    .power {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        color: #fff;
                    }
                }

                > div:not(.material-symbols-outlined) {
                    font-size: 0.8rem;
                }

                .block {
                    color: rgba(0, 0, 0, 0.4);
                }

                .enable {
                    color: rgba(90, 216, 88, 1);
                }

                .disable {
                    color: rgba(240, 78, 78, 1);
                }

                .overflow {
                    position: relative;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    &::-webkit-scrollbar {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>