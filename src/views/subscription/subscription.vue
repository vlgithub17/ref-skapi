<template lang="pug">
br
br
br

main#subscription(v-if="serviceList[serviceId]?.subscriptionFetched")
    router-link(:to="'/my-services/' + serviceId ")
        img(src="@/assets/img/logo/logo.png" style="height:2em;")

    .bottomLineTitle Subscription Plan

    p
        | Update your subscription plan for service "
        span(style='font-weight:500') {{ serviceList[serviceId].service.name }}
        | "
        
    p When upgrade/downgrading your subscription plan, the remaining days will be prorated and the amount will be adjusted accordingly on your next payment.

    section
        .planWrap
            .infoBox
                .mode
                    | Standard
                    small(style='font-weight:300') {{availablePlans[0] === false ? '  (Current Plan)' : ''}}

                template(v-if="availablePlans[0]")
                    .price {{ '$' + planSpec['Standard'].price.monthly }}
                    br
                    button.final(@click="()=>{changeMode='standard';subscrOpt=availablePlans[0];}") {{availablePlans[0]}}
                template(v-else-if="availablePlans[0] === null")
                    .price {{ '$' + planSpec['Standard'].price.monthly }}
                    br
                    button.final.disabled N/A

                hr

                ul
                    li(v-for="(des) in planSpec['Standard'].description") {{ des }}

            .infoBox
                .mode
                    | Premium
                    small(style='font-weight:300') {{availablePlans[1] === false ? '  (Current Plan)' : ''}}

                template(v-if="availablePlans[1]")
                    .price {{ '$' + planSpec['Premium'].price.monthly }}
                    br
                    button.final(@click="()=>{changeMode='premium';subscrOpt=availablePlans[1];}") {{ availablePlans[1] }}
                template(v-if="availablePlans[1] === null")
                    .price {{ '$' + planSpec['Premium'].price.monthly }}
                    br
                    button.final.disabled N/A
                hr

                ul
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
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { serviceList } from "@/views/service-list";
import { user, customer } from "@/code/user";
import { skapi } from "@/main";
import { planSpec } from "@/views/service/service-spec";

import Modal from "@/components/modal.vue";

const router = useRouter();
const route = useRoute();

let serviceId = route.path.split("/")[2];
let subscrOpt = ref(false);
let promiseRunning = ref(false);
let changeMode = "";
let openCancelplan = ref(false);

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
        return [false, "Upgrade"];
    }
    if (serviceList[serviceId]?.service.plan == "Premium") {
        let notAvail =
            serviceList[serviceId].service.users > 10000 ||
            serviceList[serviceId].storageInfo.email > 1073741824 ||
            serviceList[serviceId].storageInfo.host > 53687091200 ||
            serviceList[serviceId].storageInfo.cloud > 53687091200 ||
            serviceList[serviceId].storageInfo.database > 4294967296;
        return [notAvail ? null : "Downgrade", false];
    }

    return [null, null];
});

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

let createSubscription = async (ticket_id, service_info) => {
    let resolvedCustomer = await customer;
    let product = JSON.parse(import.meta.env.VITE_PRODUCT);
    let customer_id = resolvedCustomer.id;
    let currentUrl = window.location;
    promiseRunning.value = true;

    let response = await skapi.clientSecretRequest({
        clientSecretName: "stripe_test",
        url: "https://api.stripe.com/v1/checkout/sessions",
        method: "POST",
        headers: {
            Authorization: "Bearer $CLIENT_SECRET",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
            client_reference_id: user.user_id,
            customer: customer_id,
            "customer_update[name]": "auto",
            "customer_update[address]": "auto",
            "subscription_data[metadata][service]": service_info.id,
            "subscription_data[metadata][owner]": user.user_id,
            mode: "subscription",
            "subscription_data[description]":
                'Subscription plan for service ID: "' + service_info.id + '"',
            cancel_url: currentUrl.origin + "/subscription/" + service_info.id,
            "line_items[0][quantity]": 1,
            "line_items[0][price]": product[ticket_id],
            success_url: currentUrl.origin + "/my-services/" + service_info.id + "/dashboard/",
            "tax_id_collection[enabled]": true,
        },
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

    .textIndent {
        padding: 0 12px; // = total 20px padding
    }
}

.mode {
    font-weight: normal;
}

.smallValue {
    margin-top: 8px;
}

.planWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

    .infoBox {
        width: 280px;
        padding: 20px;
        flex-grow: 1;
        box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1) inset;
    }

    .price {
        position: relative;
        display: inline-block;
        font-size: 1.6rem;
        font-weight: 700;
        padding: 1rem 0;

        &::before {
            position: absolute;
            content: "/mo";
            right: -2rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.7rem;
            font-weight: 500;
            color: var(--black-4);
        }
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        line-height: 28px;

        li {
            position: relative;
            color: rgba(0, 0, 0, 0.6);
            font-size: 0.8rem;
            font-weight: 400;
            padding-left: 24px;

            &::before {
                position: absolute;
                content: "";
                left: 0;
                top: 6px;
                background: url("@/assets/img/icon/check.svg") no-repeat;
                background-size: cover;
                width: 16px;
                height: 16px;
                opacity: 0.8;
            }

            &.warning {
                &::before {
                    background: url("@/assets/img/icon/warning.svg") no-repeat;
                    background-size: cover;
                    width: 20px;
                    height: 20px;
                    left: -2px;
                }
            }
        }
    }
}
</style>
