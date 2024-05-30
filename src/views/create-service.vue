<template lang="pug">
br
br
br

main#create
    router-link(to="/my-services")
        img(src="@/assets/img/logo/logo.png" style="width: 193px;")

    .bottomLineTitle Create a New Service

    p
        | Choose a plan for your service "
        span(style='font-weight:normal') {{newServiceName}}
        | "

    section.planWrap(:class="{'disabled' : promiseRunning}")
        .infoBox(:class="{'checked' : serviceMode == 'trial'}" @click="serviceMode='trial'")
            .mode Trial Mode
            .price $0

            hr

            ul
                li Provides 10k user accounts
                li 4 GB of database
                li 50 GB of file storage
                li.warning All the users and data will be deleted every 7 days
        .infoBox(:class="{'checked' : serviceMode == 'standard'}" @click="serviceMode='standard'")
            .mode Standard Mode
            .price $19

            hr

            ul
                li 10k user accounts
                li User invitations
                li 4GB of database
                li 50GB each for file storage and hosting storage
                li Real-time data

            ul
                li Automated emails and sending bulk email
                li 1GB of email storage
                li Subdomain hosting
        .infoBox(:class="{'checked' : serviceMode == 'premium'}" @click="serviceMode='premium'")
            .mode Premium Mode
            .price $89

            hr

            ul
                li 100k user accounts
                li User invitations
                li 100GB of database
                li 1TB each for file storage and hosting storage
                li Real-time data

            ul
                li Automated emails and sending bulk email
                li 10GB of email storage
                li Subdomain hosting
                li Unlimited use with pay-as-you-go when exceeding the limit


    p(style='font-size: 16px;display: flex;justify-content: center;') Selected Plan:&nbsp; #[b(style='color:var(--main-color)') {{serviceMode.charAt(0).toUpperCase() + serviceMode.slice(1)}}]
    .inputWrap(@submit.prevent="createService")
        div(v-if="promiseRunning" style="width:108px;display:flex;align-items:center")
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.final(type="submit" @click='createService') Create

br
br
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { serviceIdList, serviceList } from '@/views/service-list'
import { skapi } from '@/code/admin';
import { customer } from '@/code/user';
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
let newServiceName = route.params.name as string;

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
            client_reference_id: service_info.owner,
            customer: customer_id,
            'customer_update[name]': 'auto',
            'customer_update[address]': 'auto',
            'subscription_data[metadata][service]': service_info.id,
            'subscription_data[metadata][owner]': service_info.owner,
            'mode': 'subscription',
            'subscription_data[description]': 'Subscription plan for service ID: "' + service_info.id + '"',
            cancel_url: currentUrl.origin + '/my-services',
            "line_items[0][quantity]": 1,
            'line_items[0][price]': product[ticket_id],
            "success_url": currentUrl.origin + '/my-services/' + service_info.id,
            'tax_id_collection[enabled]': true,
        }
    });
    if (response.error) {
        alert(response.error.message);
        return;
    }

    window.location = response.url;
}

let createService = () => {
    promiseRunning.value = true;

    Service.create({ name: newServiceName })
        .then(async (s) => {
            if (serviceMode.value == 'trial') {
                serviceIdList.push(s.id);
                serviceList[s.id] = s;
                location.href = '/my-services/' + s.id;
            } else {
                let service_info = s;
                let ticket_id = serviceMode.value;
                await createSubscription(ticket_id, service_info);
            }
        }).catch(err => {
            promiseRunning.value = false;
            alert(err.message);
        })
}
</script>

<style scoped lang="less">
#create {
    max-width: 1000px;
    padding: 0 8px;
    margin: 0 auto;
}

.inputWrap {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

input {
    width: unset;
    flex-grow: 1;
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

@media (max-width: 480px) {
    button {
        width: 100%;
    }
}
</style>