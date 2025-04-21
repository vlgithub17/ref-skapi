<template lang="pug">
main#subscription(v-if="serviceList[serviceId]?.subscriptionFetched")
    .step-wrap
        router-link(:to="'/my-services/' + serviceId")
            img.symbol(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo")
            span.list {{ serviceList[serviceId].service.name }}

        span >
        
        .route subscription plan

    //- .section
        router-link(:to="'/my-services/' + serviceId")
            img.symbol(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo" style="height: 44px;margin-bottom: 0.5rem;")
        .title.faktum Subscription Plan
        .desc 
            | Choose a plan for your service 
            span.wordset.servicename {{serviceList[serviceId].service.name}}
            br
            | When upgrade/downgrading your subscription plan, 
            span.wordset the remaining days will be prorated and the amount will be adjusted accordingly on your next payment.

    .plan-wrap.card-wrap
        .plan(:class="{'nohovered': availablePlans[0] === false || availablePlans[0] === null}")
            .card
                .title Standard 
                //- .option 
                    TabMenu(v-model="activeTabs.standard" :tabs="['basic', 'perpetual']")
                .price
                    template(v-if="activeTabs.standard === 0")
                        .faktum {{ '$' + planSpec['Standard'].price }}
                        span /mo
                    template(v-else)
                        .faktum {{ '$' + planSpec['Standard (Perpetual License)'].price }}
                        span /only-once
                .desc 
                    template(v-if="activeTabs.standard === 0") Suits best for hobby use #[span.wordset for small projects #[span.wordset or businesses.]]
                    template(v-else) Get lifetime access to the Standard plan for just $300—upgrade anytime as your needs grow.
                button.final(type="button" :class="{'disabled': promiseRunning || availablePlans[0] === false || availablePlans[0] === null}" @click="selectedPlan('standard')")
                    template(v-if="changeMode == 'standard' && promiseRunning")
                        .loader(style="--loader-color:white; --loader-size: 12px")
                    template(v-else-if="availablePlans[0]") {{ availablePlans[0] }}
                    template(v-else-if="availablePlans[0] === false") Current
                    template(v-else-if="availablePlans[0] === null") N/A
                    template(v-else) Select
            ul.provides
                li(v-for="(des) in planSpec['Standard'].description") {{ des }}
        .plan(:class="{'nohovered': availablePlans[1] === false || availablePlans[1] === null}")
            .card
                .title Premium 
                //- .option 
                    TabMenu(v-model="activeTabs.premium" :tabs="['basic', 'perpetual']")
                .price
                    template(v-if="activeTabs.premium === 0")
                        .faktum {{ '$' + planSpec['Premium'].price }}
                        span /mo
                    template(v-else)
                        .faktum {{ '$' + planSpec['Premium (Perpetual License)'].price }}
                        span /only-once
                .desc Empower your business with formcarry, #[span.wordset for big businesses]
                button.final(type="button" :class="{'disabled': promiseRunning || availablePlans[1] === false || availablePlans[1] === null}" @click="selectedPlan('premium')")
                    template(v-if="changeMode == 'premium' && promiseRunning")
                        .loader(style="--loader-color:white; --loader-size: 12px")
                    template(v-else-if="availablePlans[1]") {{ availablePlans[1] }}
                    template(v-else-if="availablePlans[1] === false") Current
                    template(v-else-if="availablePlans[1] === null") N/A
                    template(v-else) Select
            ul.provides
                li(v-for="(des) in planSpec['Premium'].description") {{ des }}

    br

    div(v-if="serviceList[serviceId]?.service.plan !== 'Canceled' && serviceList[serviceId]?.service.plan !== 'Trial'" style="text-align:right")
        span.iconClick(@click='()=>openCancelplan=true' style='color:var(--caution-color);font-size:0.66rem;')
            //- .material-symbols-outlined.notranslate.fill(style='font-size:24px;') cancel
            svg.svgIcon(style="fill:var(--caution-color);")
                use(xlink:href="@/assets/img/material-icon.svg#icon-cancel-fill")
            span &nbsp;Cancel Subscription

div(v-else style="text-align:center")
    .loader(style="--loader-color:blue; --loader-size:12px")

Modal(:open="subscrOpt" @close="subscrOpt=false" style='max-width: 640px;')
    h4(style='margin:.5em 0 0;') {{subscrOpt}} Plan

    hr

    div(style='font-size:.8rem;')
        p.
            Would you like to {{subscrOpt ? subscrOpt.toLowerCase() : ''}} your service plan to {{ changeMode }}?
            #[br]
            If the subscription plan is updated before the renewal date, proration of the remaining days will be calculated and the amount will be adjusted accordingly.

    br

    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        div(v-if='promiseRunning' style="width:100%; text-align:center")
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine(@click="subscrOpt = false") Cancel
            button.final(@click="upgrade") {{subscrOpt}}

Modal(:open="openCancelplan" @close="openCancelplan=false" style='max-width: 640px;')
    h4(style='margin:.5em 0 0;') Cancel Plan

    hr

    div(style='font-size:.8rem;')
        p.
            Would you like to cancel your service plan?
            #[br]
            When you cancel your subscription, the service will be available until the end of the current billing period, and the service will be terminated after the end of the period.

    br

    div(style='justify-content:space-between;display:flex;flex-direction:row-reverse; align-items:center;min-height:44px;flex-wrap:wrap;')
        div(v-if='promiseRunning' style="width:100%; text-align:center")
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.final.warning(@click="cancelSubs") Cancel Plan
            button.noLine.warning(@click="openCancelplan = false" style='padding: 0 0.5rem;') No, I don't want to cancel my plan
br
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { serviceList } from "@/views/service-list";
import { user, customer } from "@/code/user";
import { skapi } from "@/main";
import { currentServiceId, currentService } from '@/views/service/main';
import { planSpec, currentServiceSpec } from "@/views/service/service-spec";

import Modal from "@/components/modal.vue";
import TabMenu from '@/components/tab.vue';

const router = useRouter();
const route = useRoute();

let activeTabs = ref({
    standard: 0,
    premium: 0,
});

let serviceId = route.path.split("/")[2];
let subscrOpt = ref(false);
let promiseRunning = ref(false);
let changeMode = "";
let openCancelplan = ref(false);

onMounted(() => {
    console.log(currentServiceSpec.value)
    console.log(availablePlans.value)
    // 구독 변경 페이지로 바로 들어오거나 그 안에서 새로고침할 경우
    if(currentService === null) {
        router.push('/my-services/' + serviceId + '/dashboard');
    }
})

let availablePlans = computed(() => {
    // true = createSubs
    // 1 = upgrade
    // false = current plan
    // null = not avail
    // r = resume

    // 1: 'Trial',
    // 2: 'Standard',
    // 3: 'Premium',
    // 50: 'Unlimited',
    // 51: 'Free Standard'
    if (serviceList[serviceId]?.subscription?.status === "canceled") {
        return ["Subscribe", "Subscribe"];
    } else if (serviceList[serviceId]?.service.plan == "Canceled") {
        return ["Resume", "Resume"];
    }
    if (serviceList[serviceId]?.service.plan == "Trial") {
        return ["Subscribe", "Subscribe"];
    }
    if (serviceList[serviceId]?.service.plan == "Standard") {
        return [activeTabs.value.standard === 0 ? false : "Upgrade", "Upgrade"];
    }
    if (serviceList[serviceId]?.service.plan == "Premium") {
        let notAvail =
            currentServiceSpec.value.service.service.users > Number(planSpec['Premium'].users) ||
            currentServiceSpec.value.storage.database > Number(planSpec['Premium'].storage.database) ||
            currentServiceSpec.value.storage.cloud > Number(planSpec['Premium'].storage.cloud) ||
            currentServiceSpec.value.storage.host > Number(planSpec['Premium'].storage.host) ||
            currentServiceSpec.value.storage.email > Number(planSpec['Premium'].storage.email)

        return [notAvail ? null : "Downgrade", activeTabs.value.premium === 0 ? false : "Upgrade"];
    }

    return [null, null];
});

let selectedPlan = (plan) => {
    if (activeTabs.value[plan] == 1) {
        plan = plan + '-perpetual';
    }

    if(plan === 'standard') {
        subscrOpt.value = availablePlans.value[0];
    } else {
        subscrOpt.value = availablePlans.value[1];
    }
    
    changeMode = plan;
}

let cancelSubs = async () => {
    promiseRunning.value = true;
    await serviceList[serviceId].cancelSubscription();
    location.href = "/my-services/" + serviceList[serviceId].id + "/dashboard/";
};

let upgrade = () => {
    if (!subscrOpt.value) {
        return;
    }
    if (subscrOpt.value === "Subscribe") {
        return createSubscription(changeMode, serviceList[serviceId]);
    }

    updateSubscription(changeMode);
};

let createSubscription = async (ticket_id, service_info, isPerpetual=false) => {
    promiseRunning.value = true;

    if(changeMode.includes('perpetual')) {
        isPerpetual = true;
    }

    let resolvedCustomer = await customer;
    let product = JSON.parse(import.meta.env.VITE_PRODUCT);
    let customer_id = resolvedCustomer.id;
    let currentUrl = window.location;

    let data = {
        client_reference_id: service_info.owner,
        customer: customer_id,
        'customer_update[name]': 'auto',
        'customer_update[address]': 'auto',

        cancel_url: currentUrl.origin + '/my-services',
        "line_items[0][quantity]": 1,
        'line_items[0][price]': product[ticket_id],
        "success_url": currentUrl.origin + '/my-services/' + service_info.id,
        'tax_id_collection[enabled]': true,
    }

    if (isPerpetual) {
        Object.assign(data, {
            'metadata[service]': service_info.id,
            'metadata[owner]': service_info.owner,
            'metadata[price]': product[ticket_id],
            'mode': 'payment',
        })
    } else {
        Object.assign(data,{
            'subscription_data[metadata][service]': service_info.id,
            'subscription_data[metadata][owner]': service_info.owner,
            'mode': 'subscription',
            'subscription_data[description]': 'Subscription plan for service ID: "' + service_info.id + '"',
        })
    }

    let response = await skapi.clientSecretRequest({
        clientSecretName: 'stripe_test',
        url: 'https://api.stripe.com/v1/checkout/sessions',
        method: 'POST',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data	
    });

    if (response.error) {
        promiseRunning.value = false;
        alert(response.error.message);
    } else {
        location.href = response.url;
    }
};

let updateSubscription = async (ticket_id) => {
    await customer;
    let subs_id = serviceList[serviceId].service.subs_id.split("#");
    promiseRunning.value = true;

    if (!serviceList[serviceId].service.subs_id) {
        alert("Service does not have a subscription");
        return;
    }

    if (subs_id.length < 2) {
        alert("Service does not have a subscription");
        return;
    }

    let SUBSCRIPTION_ID = subs_id[0];
    let SUBSCRIPTION_ITEM_ID = subs_id[1];
    let product = JSON.parse(import.meta.env.VITE_PRODUCT);
    let dataObj = {};

    // if (serviceList[serviceId]?.subscription?.cancel_at_period_end) {
    dataObj = {
        "items[0][id]": SUBSCRIPTION_ITEM_ID,
        "items[0][price]": product[ticket_id],
        cancel_at_period_end: false,
    };
    
    if(!serviceList[serviceId]?.subscription?.canceled_at) {
        dataObj.proration_behavior = 'create_prorations';
    }

    let response = await skapi.clientSecretRequest({
        clientSecretName: "stripe_test",
        url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
        method: "POST",
        headers: {
            Authorization: "Bearer $CLIENT_SECRET",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: dataObj,
    });

    if (response.error) {
        promiseRunning.value = false;
        alert(response.error.message);
        return;
    }

    location.href = "/my-services/" + serviceList[serviceId].id + "/dashboard/";
};
</script>

<style scoped lang="less">
#subscription {
    max-width: 1000px;
    padding: 0 8px;
    margin: 0 auto;
    padding-top: 10px;

    .textIndent {
        padding: 0 12px; // = total 20px padding
    }
}

.section {
    max-width: 570px;
    margin: 0 auto;
    padding: 4rem 20px;
    text-align: center;

    .title {
        font-size: 2rem;
        margin-bottom: 1rem;
        line-height: 1.5;
    }

    .desc {
        margin-bottom: 1rem;
        line-height: 1.9;
        color: #333;
    }
}

.step-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;

    // max-width: 80rem;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    box-shadow: rgba(66, 62, 121, 0.25) 0px 0px 90px -14px;
    // margin: 0 var(--nav-top);
    border-color: #f7f9fc;

    a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #000;

        img {
            height: 30px;
        }
    }

    .route {
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
}

.servicename {
    font-weight: bold;
    color: var(--main-color);
}

.mode {
    font-weight: normal;
}

.smallValue {
    margin-top: 8px;
}

.card-wrap {
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    // text-align: center;

    .card {
        flex-grow: 1;
        width: 48%;
        min-width: 250px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 12px;
        padding: 1rem;
        transition: all .3s;
        cursor: pointer;
        background-color: #fff;

        &:hover {
            // border-color: var(--main-color);
            box-shadow: 1px 1px 10px rgba(0,0,0, 0.05);
        }

        &.dark {
            // background-color: var(--main-color);
            // background: linear-gradient(to right, rgb(11, 53, 218), rgb(172, 250, 5), rgb(172, 250, 5), rgb(11, 53, 218));
            // color: #fff;
        }
        
        a {
            display: flex;
            align-items: center;
            gap: 1rem;
            text-decoration: none;
            color: #333;
        }

        .icon {
            width: 3rem;
            height: 3rem;
        }
        .content {
            text-align: left;

            p {
                margin: 0;

                &.small {
                    font-size: 0.8rem;
                    color: rgba(0,0,0,0.5);
                }
            }
        }
    }
}

.plan-wrap {
    max-width: 680px;
    align-items: start;
    padding-top: 7rem;

    .plan {
        width: 31%;
        min-width: 250px;
        flex-grow: 1;
        transition: all .3s;

        &.nohovered {
            &:hover {
                scale: 1;

                .card {
                    box-shadow: unset;
                }
            }
        }
            
        &:hover {
            scale: 1.05;

            .card {
                box-shadow: 1px 1px 10px rgba(0,0,0, 0.05);
            }
        }
    }
    .card {
        width: 100%;
        cursor: default;
    }
    .title {
        font-size: 1rem;
        margin-bottom: 1rem;
    }
    .option {
        position: relative;
        height: 2rem;
        margin-bottom: 1rem;

        .tab-menu {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-55%, -50%);
            scale: 0.9;
            margin: 0;
        }
    }
    .price {
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin-bottom: 1rem;

        .faktum {
            font-size: 2.4rem;
            margin-right: 0.5rem;
        }
        span {
            color: #888
        }
    }
    .desc {
        margin: 0;
        line-height: 1.4;
        font-size: 0.8rem;
        color: #777;
        margin-bottom: 1rem;
    }
    button {
        width: 100% !important;
    }
}

.provides {
    li {
        position: relative;
        list-style: none;
        text-align: left;
        margin-bottom: 0.5rem;
        font-size: 0.8rem;

        &::before {
            position: absolute;
            content: '';
            left: -1.3rem;
            top: 0.1rem;
            background: url('@/assets/img/icon/check.svg') no-repeat;
            background-size: cover;
            width: 16px;
            height: 16px;
            opacity: 0.8;
        }
    }
}

@media (max-width: 576px) {
    .plan-wrap {
        padding-top: 20px;

        .plan {
            &:hover, &.selected {
                scale: 1;
            }
            &.disabled {
                scale: 0.95;
            }
        }
    }
}
</style>
