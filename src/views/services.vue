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
                    //- th.th.center(style="width:140px;")
                    //-     | Locale
                    //-     .resizer(@mousedown="mousedown")
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
                        //- td
                        //-     .overflow {{ regions?.[service.region] || service.region }}
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
                                h6 Name
                                span(style="color:var(--primary-text);font-weight:700") {{ service.name }}
                            .info 
                                h6 Service ID 
                                span {{ service.service }}
                            .info 
                                h6 CORS 
                                span {{ service.cors }}
                            br
                            .info.inline
                                h6 # of Users 
                                span {{ service.users }}
                            .info.inline 
                                h6 Database Used
                                //- span {{ convertToMb(storageInfo?.[service.service]?.database) + '/4000MB' }}
                            .info.inline 
                                h6 Subscription Plan
                                router-link(:to="`/subscription/${service.service}`" style="color:var(--main-color);font-weight:700;")
                                    template(v-if="service.group == 1") Trial
                                    template(v-else-if="service.group == 2") Standard
                                    template(v-else-if="service.group == 3") Premium
                                    template(v-else-if="service.group == 50") Unlimited
                                    template(v-else-if="service.group == 51") Free Standard
                                    template(v-else) ...
                            .info.inline 
                                h6 Hosting Strorage
                                template(v-if="service?.subdomain")
                                    //- span {{ convertToMb(storageInfo?.[service.service]?.host) + '/50000MB' }}
                                template(v-else)
                                    span -
                            br
                            br
                            .info.inline 
                                h6 Locale
                                span {{ regions?.[service.region] || service.region }}
                            .info.inline 
                                h6 Cloud Storage Used
                                //- span {{ convertToMb(storageInfo?.[service.service]?.cloud) + '/50000MB' }}
                            .info.inline 
                                h6 Date Created
                                span {{ typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString() }}
                            .info.inline 
                                h6 Subdomain
                                template(v-if="service?.subdomain")
                                    span {{ service.subdomain }}
                                template(v-else)
                                    span -
                tr.noServices(v-else)
                    td(colspan="9" style="text-align:center; padding-top:20px;")
                        h3 No Services
                        br
                        p Get started by creating a new service.

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted, ref } from 'vue';

onMounted(() => {
    document.querySelector('body').classList.add('fa');
})
onBeforeUnmount(() => {
    document.querySelector('body').classList.remove('fa');
})

const router = useRouter();
let services = ref([
    {
        active: 1,
        api_key: "",
        cors: "*",
        created_locale: "KR",
        email: "kkb7528@broadwayinc.com",
        email_triggers: {
            template_setters: {
                invitation: "ap215YqmUTiOMJOKCmGr-tpca05252fb8227531be810e959d100136@mail.skapi.app",
                newsletter_subscription: "ap215YqmUTiOMJOKCmGr-tp75795a7ddc50c31d252afd5c7796a498@mail.skapi.app",
                signup_confirmation: "ap215YqmUTiOMJOKCmGr-tpd7cb9cc07adc726904fa48197b2b1b7f@mail.skapi.app",
                verification: "ap215YqmUTiOMJOKCmGr-tp886587461e82676d00368443c2176e4a@mail.skapi.app",
                welcome: "ap215YqmUTiOMJOKCmGr-tp80763d2756bcba239fde604716d48902@mail.skapi.app"
            }
        },
        group: 2,
        host: "eu71zettahertzesskpi",
        name: "newkkk",
        newsletter_subscribers: 0,
        owner: "5750ee2c-f7f7-43ff-b6a5-cce599d30101",
        region: "ap-northeast-1",
        service: "ap215YqmUTiOMJOKCmGr",
        subsInfo: {
            application: null,
            application_fee_percent: null,
            automatic_tax: {enabled: false, liability: null},
            billing_cycle_anchor: 1709104399,
            billing_cycle_anchor_config: null,
            billing_thresholds: null,
            cancel_at: null,
            cancel_at_period_end: false,
            canceled_at: null,
            cancellation_details: {comment: null, feedback: null, reason: null},
            collection_method: "charge_automatically",
            created: 1709104399,
            currency: "usd",
            current_period_end: 1711609999,
            current_period_start: 1709104399,
            customer: "cus_PW1FKUxikUZZ14",
            days_until_due: null,
            default_payment_method: "pm_1Ony4IHfHjKTnB396hlH4Hxf",
            default_source: null,
            default_tax_rates: [],
            description: "Subscription Plan of service ID: ap215YqmUTiOMJOKCmGr",
            discount: null,
            ended_at: null,
            id: "sub_1OohKNHfHjKTnB39OBN7zrBc",
            invoice_settings: {account_tax_ids: null, issuer: {type: 'self'}},
            items: {
                object: 'list', 
                data: [
                    {   
                        billing_thresholds: null,
                        created: 1709104399,
                        id: "si_PdzIWXUPqtiBHB",
                        metadata: {},
                        object: "subscription_item",
                        plan: {
                            active: true,
                            aggregate_usage: null,
                            amount: 1900,
                            amount_decimal: "1900",
                            billing_scheme: "per_unit",
                            created: 1704220828,
                            currency: "usd",
                            id: "price_1OUCt6HfHjKTnB39IwJasJEy",
                            interval: "month",
                            interval_count: 1,
                            livemode: false,
                            metadata: {},
                            nickname: null,
                            object: "plan",
                            product: "prod_PIoWQwwkbSIBHu",
                            tiers_mode: null,
                            transform_usage: null,
                            trial_period_day: null,
                            usage_type: "licensed"
                        },
                        price: {
                            active: true,
                            billing_scheme: "per_unit",
                            created: 1704220828,
                            currency: "usd",
                            custom_unit_amount: null,
                            id: "price_1OUCt6HfHjKTnB39IwJasJEy",
                            livemode: false,
                            lookup_key: null,
                            metadata: {},
                            nickname: null,
                            object: "price",
                            product: "prod_PIoWQwwkbSIBHu",
                            recurring: {aggregate_usage: null, interval: 'month', interval_count: 1, trial_period_days: null, usage_type: 'licensed'},
                            tax_behavior: "unspecified",
                            tiers_mode: null,
                            transform_quantity: null,
                            type: "recurring",
                            unit_amount: 1900,
                            unit_amount_decimal: "1900"
                        },
                        quantity: 1,
                        subscription: "sub_1OohKNHfHjKTnB39OBN7zrBc",
                        tax_rates: []
                    }
                ],
                has_more: false, 
                total_count: 1, 
                url: '/v1/subscription_items?subscription=sub_1OohKNHfHjKTnB39OBN7zrBc'
            },
            latest_invoice: "in_1OohKNHfHjKTnB3958nizZVD",
            livemode: false,
            metadata: {owner: '5750ee2c-f7f7-43ff-b6a5-cce599d30101', service: 'ap215YqmUTiOMJOKCmGr'},
            next_pending_invoice_item_invoice: null,
            object: "subscription",
            on_behalf_of: null,
            pause_collection: null,
            payment_settings: {
                payment_method_options: {
                    acss_debit: null,
                    bancontact: null,
                    card: {network: null, request_three_d_secure: 'automatic'},
                    customer_balance: null,
                    konbini: null,
                    us_bank_account: null
                },
                payment_method_types: null,
                save_default_payment_method: "off"
            },
            pending_invoice_item_interval: null,
            pending_setup_intent: null,
            pending_update: null,
            plan: {
                active: true,
                aggregate_usage: null,
                amount: 1900,
                amount_decimal: "1900",
                billing_scheme: "per_unit",
                created: 1704220828,
                currency: "usd",
                id: "price_1OUCt6HfHjKTnB39IwJasJEy",
                interval: "month",
                interval_count: 1,
                livemode: false,
                metadata: {},
                nickname: null,
                object: "plan",
                product: "prod_PIoWQwwkbSIBHu",
                tiers_mode: null,
                transform_usage: null,
                trial_period_days: null,
                usage_type: "licensed"
            },
            quantity: 1,
            schedule: null,
            start_date: 1709104399,
            status: "active",
            test_clock: null,
            transfer_data: null,
            trial_end: null,
            trial_settings: {
                end_behavior: {missing_payment_method: 'create_invoice'}
            },
            trial_start: null
        },
        subs_id: "sub_1OohKNHfHjKTnB39OBN7zrBc#si_PdzIWXUPqtiBHB",
        timestamp: 1709102706561,
        users: 0
    }
]);
let showInfo = ref(false);

let goServiceDashboard = (e:Event, service:object) => {
    e.currentTarget.classList.add('active');

    setTimeout(() => {
        router.push('/my-services/' + service.service);
    }, 500);
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

                            h6 {
                                display: block;
                                margin-bottom: 8px;
                            }
                        }
                        h6 {
                            display: inline-block;
                            font-weight: 400;
                            color: rgba(0, 0, 0, 0.40);
                            margin-right: 10px;
                        }
                        span {
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