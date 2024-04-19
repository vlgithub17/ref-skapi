<template lang="pug">
br
br
br

main#subscription(v-if="serviceList[serviceId]?.subscriptionFetched")
    router-link(:to="'/my-services/' + serviceId ")
        img(src="@/assets/img/logo/logo.png" style="width:193px;")

    br
    br

    section
        .bottomLineTitle Subscription Plan

        p
            | Update your subscription plan for service&nbsp;
            span(style='font-weight:normal') "{{ serviceList[serviceId].service.name }}"
    br

    section
        .planWrap
            .infoBox
                .mode
                    | Standard
                    small(style='font-weight:300') {{availablePlans[0] === false ? '  (Current Plan)' : ''}}

                template(v-if="availablePlans[0]")
                    .price $19
                    br
                    button.final(@click="()=>{upgradeOpt=availablePlans[0]; changeMode='standard';openUpgrade=availablePlans[0] === 1 ? 'Downgrade' : 'Upgrade';}") {{availablePlans[0] === 1 ? 'Downgrade' : 'Upgrade'}}
                template(v-else-if="availablePlans[0] === null")
                    .price $19
                    br
                    button.final.disabled N/A

                hr

                ul
                    li Provides 10k user accounts
                    li 4GB of database
                    li 50GB each for file storage and hosting storage
                    li Real-time data

                ul
                    li Automated emails and sending newsletters
                    li 1GB of email storage
                    li Subdomain hosting
            .infoBox
                .mode
                    | Premium
                    small(style='font-weight:300') {{availablePlans[1] === false ? '  (Current Plan)' : ''}}

                template(v-if="availablePlans[1]")
                    .price $89
                    br
                    button.final(@click="()=>{changeMode='premium';openUpgrade='Upgrade';upgradeOpt=availablePlans[1];}") Upgrade
                template(v-if="availablePlans[1] === null")
                    .price $89
                    br
                    button.final.disabled N/A
                hr

                ul
                    li 100k user accounts
                    li 100GB of database
                    li 1TB each for file storage and hosting storage
                    li Real-time data

                ul
                    li Automated emails and sending newsletters
                    li 10GB of email storage
                    li Subdomain hosting
                    li unlimited use with pay-as-you-go when exceeding the limit (currently free for limited time)

div(v-else style="text-align:center")
    img.loading(src="@/assets/img/loading.png")

Modal(:open="openUpgrade" style='max-width: 640px;')
    h4(style='margin:.5em 0 0;') {{openUpgrade}} Plan

    hr

    div(style='font-size:.8rem;')
        p.
            Would you like to {{openUpgrade ? openUpgrade.toLowerCase() : ''}} your service plan to {{ changeMode }}?
            #[br]
            When the subscription plan is updated, proration of the remaining days will be calculated and the amount will be adjusted accordingly.

    br

    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        template(v-if='promiseRunning')
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine(@click="openUpgrade = false") Cancel
            button.final(@click="upgrade") {{openUpgrade}}
br
br
br
br
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { serviceList } from '@/views/service-list'
import Modal from '@/components/modal.vue';
import { user, customer } from '@/code/user';
import { skapi } from '@/code/admin';

const router = useRouter();
const route = useRoute();

let serviceId = route.path.split('/')[2];
let openUpgrade = ref(false);
let promiseRunning = ref(false);
let changeMode = ''
let upgradeOpt: any;
let availablePlans = computed(() => {
    // true = createSubs
    // 1 = upgrade
    // false = current plan
    // null = not avail

    // 1: 'Trial',
    // 2: 'Standard',
    // 3: 'Premium',
    // 50: 'Unlimited',
    // 51: 'Free Standard'

    if (serviceList[serviceId]?.service.plan == 'Canceled') {
        return [1, 1];
    }
    if (serviceList[serviceId]?.service.active === -1) { // suspended
        return [true, true];
    }
    if (serviceList[serviceId]?.service.plan == 'Trial') {
        return [true, true];
    }
    if (serviceList[serviceId]?.service.plan == 'Standard') {
        return [false, 1];
    }
    if (serviceList[serviceId]?.service.plan == 'Premium') {
        let notAvail = serviceList[serviceId].service.users > 10000 || serviceList[serviceId].storageInfo.email > 1073741824 || serviceList[serviceId].storageInfo.host > 53687091200 || serviceList[serviceId].storageInfo.cloud > 53687091200 || serviceList[serviceId].storageInfo.database > 4294967296
        return [notAvail ? null : 1, false];
    }

    return [null, null];
});

let upgrade = () => {
    if (!upgradeOpt) {
        return;
    }
    if (upgradeOpt === true) {
        return createSubscription(changeMode, serviceList[serviceId]);
    }

    updateSubscription(changeMode);
}

let createSubscription = async (ticket_id, service_info) => {
    let resolvedCustomer = await customer;
    let product = JSON.parse(import.meta.env.VITE_PRODUCT);
    let customer_id = resolvedCustomer.id;
    let currentUrl = window.location;
    promiseRunning.value = true;

    let response = await skapi.clientSecretRequest({
        clientSecretName: 'stripe_test',
        url: 'https://api.stripe.com/v1/checkout/sessions',
        method: 'POST',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            client_reference_id: user.user_id,
            customer: customer_id,
            'customer_update[name]': 'auto',
            'customer_update[address]': 'auto',
            'subscription_data[metadata][service]': service_info.id,
            'subscription_data[metadata][owner]': user.user_id,
            'mode': 'subscription',
            'subscription_data[description]': 'Subscription Plan of service ID: ' + service_info.id,
            cancel_url: currentUrl.origin + '/subscription/' + service_info.id,
            "line_items[0][quantity]": 1,
            'line_items[0][price]': product[ticket_id],
            "success_url": currentUrl.origin + '/my-services/' + service_info.id,
            'tax_id_collection[enabled]': true,
        }
    });

    if (response.error) {
        promiseRunning.value = false;
        alert(response.error.message);
    }
}

let updateSubscription = async (ticket_id) => {
    await customer;
    let subs_id = serviceList[serviceId].service.subs_id.split('#');
    promiseRunning.value = true;

    if (!serviceList[serviceId].service.subs_id) {
        alert('Service does not have a subscription');
        return;
    }

    if (subs_id.length < 2) {
        alert('Service does not have a subscription');
        return;
    }

    let SUBSCRIPTION_ID = subs_id[0];
    let SUBSCRIPTION_ITEM_ID = subs_id[1];
    let product = JSON.parse(import.meta.env.VITE_PRODUCT);
    let dataObj = {};

    if (serviceList[serviceId]?.subscription?.cancel_at_period_end) {
        dataObj = {
            'items[0][id]': SUBSCRIPTION_ITEM_ID,
            'items[0][price]': product[ticket_id],
            proration_behavior: 'create_prorations',
            'cancel_at_period_end': false
        }
    } else {
        dataObj = {
            'items[0][id]': SUBSCRIPTION_ITEM_ID,
            'items[0][price]': product[ticket_id],
            proration_behavior: 'create_prorations'
        }
    }

    let response = await skapi.clientSecretRequest({
        clientSecretName: 'stripe_test',
        url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
        method: 'POST',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: dataObj
    });

    if (response.error) {
        promiseRunning.value = false;
        alert(response.error.message);
    }
    else {
        location.href = '/my-services/' + serviceList[serviceId].id;
    }
}
</script>

<style scoped lang="less">
#subscription {
    max-width: 1000px;
    // padding: 0 20px;
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
        flex-grow: 1;
    }

    .price {
        position: relative;
        display: inline-block;
        font-size: 1.6rem;
        font-weight: 700;
        padding: 1rem 0;

        &::before {
            position: absolute;
            content: '/mo';
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
            color: rgba(0, 0, 0, 0.60);
            font-size: 0.8rem;
            font-weight: 400;
            padding-left: 24px;

            &::before {
                position: absolute;
                content: '';
                left: 0;
                top: 6px;
                background: url('@/assets/img/icon/check.svg') no-repeat;
                background-size: cover;
                width: 16px;
                height: 16px;
                opacity: 0.8;
            }

            &.warning {
                &::before {
                    background: url('@/assets/img/icon/warning.svg') no-repeat;
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