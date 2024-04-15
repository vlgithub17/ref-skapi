<template lang="pug">
br
br
br

main#subscription
    img(src="@/assets/img/logo/logo.png" style="width:193px;")

    br
    br
    br

    section
        .title Current Subscription

        .line 

        template(v-if="serviceList[serviceId]")
            .smallTitle Service Plan
            .smallValue {{ serviceList[serviceId].plan }}

            br

            .smallTitle Service Name
            .smallValue {{ serviceList[serviceId].service.name }}

            br

            .smallTitle Service ID
            .smallValue {{ serviceList[serviceId].id }}

        template(v-else)
            div(style="text-align:center")
                br
                br
                img.loading(src="@/assets/img/loading.png")

    br
    br
    br

    section(v-if="serviceList[serviceId]")
        .title Subscription Plans

        .line 

        .planWrap
            //- .infoBox
                .mode Trial Mode
                .price $0

                br

                button.final.disabled(v-if="serviceList[serviceId].plan == 'Trial'") Current Plan
                div(v-else style="height:44px")

                .line

                ul
                    li Provides 10k user accounts
                    li 4 GB of database
                    li 50 GB of file storage
                    li.warning All the users and data will be deleted every 7 days
            .infoBox
                .mode Standard Mode
                .price $19

                br

                button.final.disabled(v-if="serviceList[serviceId].plan == 'Standard'") Current Plan
                button.final(v-else-if="serviceList[serviceId].plan == 'Trial'" @click="changeMode='standard';openUpgrade=true;console.log(serviceList[serviceId])") Upgrade
                button.final(v-else-if="serviceList[serviceId].plan == 'Premium'" @click="changeMode='standard';openDowngrade=true;") Downgrade

                .line

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
                .mode Premium Mode
                .price $89

                br

                button.final.disabled(v-if="serviceList[serviceId].plan == 'Premium'") Current Plan
                button.final(v-else @click="changeMode='premium';openUpgrade=true;") Upgrade

                .line

                ul
                    li 100k user accounts
                    li 100GB of database
                    li 1TB each for file storage and hosting storage
                    li Real-time data

                ul
                    li Automated emails and sending newsletters
                    li 10GB of email storage
                    li Subdomain hosting
                    li unlimited use with pay-as-you-go when exceeding the limit

Modal(:open="openUpgrade")
    h4(style='margin:.5em 0 0;') Upgrade Plan

    hr

    div(style='font-size:.8rem;')
        p Do you truly wish to upgrade your plan?

    br

    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        template(v-if='promiseRunning')
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine(@click="openUpgrade = false") Cancel
            button.final(@click="upgrade") Upgrade

Modal(:open="openDowngrade")
    h4(style='margin:.5em 0 0;') Downgrade Plan

    hr

    div(style='font-size:.8rem;')
        p. 
            Do you really want to downgrade your plan? 
            #[br]
            #[br]
            If you downgrade, 
            #[br]
            you won't have access to some features of your current plan. 
            #[br]
            #[br]
            Plan changes are only possible once per day.

    br

    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        template(v-if='promiseRunning')
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine(@click="openDowngrade = false") Cancel
            button.final(@click="downgrade") Downgrade
br
br
br
br
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { serviceList } from '@/views/service-list'
import Modal from '@/components/modal.vue';
import { user, customer } from '@/code/user';
import { skapi } from '@/code/admin';

const router = useRouter();
const route = useRoute();

let serviceId = route.path.split('/')[2];
let openUpgrade = ref(false);
let openDowngrade = ref(false);
let promiseRunning = ref(false);
let changeMode = ''

let upgrade = () => {
    promiseRunning.value = true;

    if(serviceList[serviceId].plan == 'Trial' || serviceList[serviceId].plan == 'Standard' || serviceList[serviceId].plan == 'Free Standard') {
        createSubscription(changeMode, serviceList[serviceId]);
    } else {
        if(serviceList[serviceId].service.active == -1) {
            createSubscription(changeMode, serviceList[serviceId]);
        } else {
            updateSubscription(changeMode);
        }
    }
}

let downgrade = () => {
    promiseRunning.value = true;

    if(serviceList[serviceId].service.users > 10000 || serviceList[serviceId].storageInfo.email > 1073741824 || serviceList[serviceId].storageInfo.host > 53687091200 || serviceList[serviceId].storageInfo.cloud > 53687091200 || serviceList[serviceId].storageInfo.database > 4294967296) {
        promiseRunning.value = false;
        return false;
    }

    if(serviceList[serviceId].service.active == -1) {
        createSubscription(changeMode, serviceList[serviceId]);
    } else {
        updateSubscription(changeMode);
    }
}

let createSubscription = async (ticket_id, service_info) => {
    let resolvedCustomer = await customer;
    let product = JSON.parse(import.meta.env.VITE_PRODUCT);
    let customer_id = resolvedCustomer.id;
    let currentUrl = window.location;

    console.log(product)
    console.log(ticket_id)

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
            // "success_url": currentUrl.origin + '/my-services/' + service_info.id + '?checkout_id={CHECKOUT_SESSION_ID}&service_id=' + service_info.id + '&ticket_id=' + ticket_id,
            "success_url": currentUrl.origin + '/my-services/' + service_info.id,
            'tax_id_collection[enabled]': true,
        }
    });
    if (response.error) {
        alert(response.error.message);
        return;
    }

    window.location = response.url;
    promiseRunning.value = false;
    if(openDowngrade.value) {
        location.href = '/my-services/' + service_info.id;
    }
}

let updateSubscription = async (ticket_id) => {
    let resolvedCustomer = await customer;
    let subs_id = serviceList[serviceId].service.subs_id.split('#');

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

    if(serviceList[serviceId]?.subscription?.cancel_at_period_end) {
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
        alert(response.error.message);
        return;
    }

    if(openDowngrade.value) {
        promiseRunning.value = false;
        location.href = '/my-services/' + serviceList[serviceId].id;
    }
}
</script>

<style scoped lang="less">
#subscription {
    max-width: 1000px;
    padding: 0 20px;
    margin: 0 auto;

    .title {
        color: rgba(0, 0, 0, 0.80);
        font-size: 28px;
        font-weight: 700;
        // margin-top: 28px;
    }
    .line {
        width: 100%;
        height: 1px;
        background: rgba(0, 0, 0, 0.10);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        margin: 28px 0;
    }
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