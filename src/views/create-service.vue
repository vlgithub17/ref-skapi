<template lang="pug">
br
br
br

main#create
    router-link(to="/my-services")
        img(src="@/assets/img/logo/logo.png" style="width: 193px;")

    .bottomLineTitle Create a New Service

    p
        span 1.&nbsp;
        span Choose a plan that suits your needs:

    br

    section.planWrap(:class="{'disabled' : promiseRunning}")
        .infoBox(:class="{'checked' : serviceMode == 'trial'}" @click="serviceMode='trial'")
            .mode Trial Mode
            .price $0

            .line

            ul
                li Provides 10k user accounts
                li 4 GB of database
                li 50 GB of file storage
                li.warning All the users and data will be deleted every 7 days
        .infoBox(:class="{'checked' : serviceMode == 'standard'}" @click="serviceMode='standard'")
            .mode Standard Mode
            .price $19

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
        .infoBox(:class="{'checked' : serviceMode == 'premium'}" @click="serviceMode='premium'")
            .mode Premium Mode
            .price $89

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

    p Selected Plan: #[b {{serviceMode.charAt(0).toUpperCase() + serviceMode.slice(1)}}]

    br

    p
        span 2.&nbsp;
        span Choose a name for your service and #[b create]:

    form.inputWrap(@submit.prevent="createService")
        input#serviceName(type="text" @input='(e)=>{newServiceName=e.target.value;}' :disabled="promiseRunning" placeholder="Your service name" required)
        div(v-if="promiseRunning" style="width:108px;display:flex;align-items:center")
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.final(type="submit") Create


br
br
br
br
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { nextTick, ref } from 'vue';
import { callServiceList, serviceIdList, serviceList } from '@/views/service-list'
import { skapi } from '@/code/admin';
import { user, customer } from '@/code/user';
import { currentService } from './service/main';
import Service from '@/code/service';

const router = useRouter();
const route = useRoute();

let service = {
    active: 1,
    name: 'service name',
    cors: 'service cors',
    timestamp: 1709102706561,
    group: 1,
    service: 'ap226E8TXhYtbcXRgi5D',
    users: 10
}
let promiseRunning = ref(false);
let serviceMode = ref('standard');
let newServiceName = '';

let createService = () => {
    promiseRunning.value = true;

    Service.create({ name: newServiceName })
    .then(async(s) => {
        if(serviceMode.value == 'trial') {
            newServiceName = '';
            serviceIdList.push(s.id);
            serviceList[s.id] = s;
            promiseRunning.value = false;
            location.href = '/my-services/' + s.id;
        } else {
            let service_info = s;
            let ticket_id = serviceMode.value;
            await createSubscription(ticket_id, service_info);
            // await getSubscription(service_info);
            // newServiceName = '';
            // promiseRunning.value = false;
            // router.push('/my-services/' + service_info.id);
        }
    }).catch(err => {
        promiseRunning.value = false;
        console.log(err);
    })
}

let getSubscription = async(service_info) => {
    if(service_info?.service?.subs_id) {
        let subs_id = service_info.service.subs_id.split('#');
    
        if (subs_id.length < 2) {
            alert('Service does not have a subscription');
            return;
        }
    
        let SUBSCRIPTION_ID = subs_id[0];
    
        skapi.clientSecretRequest({
            clientSecretName: 'stripe_test',
            url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
            method: 'GET',
            headers: {
                Authorization: 'Bearer $CLIENT_SECRET',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(res => {
            service_info.subscription = res;
            serviceList[s.id].subscription = res;
        }).catch(err => {
            console.log(err.message);
        });
    }
}

let createSubscription = async (ticket_id, service_info) => {
    let resolvedCustomer = await customer;
    let product = JSON.parse(import.meta.env.VITE_PRODUCT);
    let customer_id = resolvedCustomer.id;
    let currentUrl = window.location;

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
            cancel_url: currentUrl.origin + '/myServices',
            "line_items[0][quantity]": 1,
            'line_items[0][price]': product[ticket_id],
            // "success_url": currentUrl.origin + '/my-services?checkout_id={CHECKOUT_SESSION_ID}&service_id=' + service_info.id + '&ticket_id=' + ticket_id,
            "success_url" : currentUrl.origin + '/my-services/' + service_info.id,
            'tax_id_collection[enabled]': true,
        }
    });
    if (response.error) {
        alert(response.error.message);
        return;
    }

    window.location = response.url;
};
</script>

<style scoped lang="less">
#create {
    max-width: 1000px;
    padding: 0 20px;
    margin: 0 auto;

    .line {
        width: 100%;
        height: 1px;
        background: rgba(0, 0, 0, 0.10);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        margin: 28px 0;
    }
}

.inputWrap {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
}

input {
    display: block;
    flex-grow: 1;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 12px 15px;
}

p {
    display: flex;
    font-weight: normal;
}

.planWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

    .infoBox {
        width: 280px;
        flex-grow: 1;
        user-select: none;
        cursor: pointer;

        &:hover {
            li {
                &::before {
                    filter: brightness(0) saturate(100%) invert(12%) sepia(84%) saturate(6348%) hue-rotate(240deg) brightness(96%) contrast(87%);
                }
            }
        }

        &.checked {
            background-color: rgba(41, 63, 230, 0.02);
            box-shadow: 0 0 0 4px #A5AFFF inset !important;

            li {
                &::before {
                    filter: brightness(0) saturate(100%) invert(12%) sepia(84%) saturate(6348%) hue-rotate(240deg) brightness(96%) contrast(87%);
                }
            }
        }
    }

    .price {
        position: relative;
        display: inline-block;
        font-size: 1.6rem;
        font-weight: 700;
        padding-top: 1rem;

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
        line-height: 1.4rem;

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
                top: 0.25rem;
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