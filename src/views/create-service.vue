<template lang="pug">
main#create
    .step-wrap
        router-link(to="/my-services")
            img.symbol(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo")
            span.list service-list

        span >
        
        .route(@click="step = 1") create service

        template(v-if="step === 2") 
            span > 

            .route choose plan

    .form(v-if="step === 1")
        .infoValue(style="flex-grow:1")
            .smallTitle Service Name
            input.big(placeholder="New service name (Max 40 chars)" maxlength="40" required v-model="newServiceName" style="width: 100%;")
        button.final(type="button" :class="{'disabled': !newServiceName}" @click="step++") Next

    .plan-wrap.card-wrap(v-else-if="step === 2")
        .plan(:class="{'selected' : serviceMode == 'trial' && promiseRunning, 'disabled' : serviceMode !== 'trial' && promiseRunning}")
            .card
                .title Trial
                .option 
                    TabMenu(v-model="activeTabs.trial" :tabs="['basic']")
                .price
                    .faktum {{ '$' + planSpec['Trial'].price }}
                    span /mo
                .desc Suits best for hobby use #[span.wordset for small projects #[span.wordset or businesses.]]
                button.final(type="button" :class="{'disabled': promiseRunning}" @click="selectedPlan('trial')") 
                    template(v-if="serviceMode == 'trial' && promiseRunning")
                        .loader(style="--loader-color:white; --loader-size: 12px")
                    template(v-else) Select
            ul.provides
                li(v-for="(des) in planSpec['Trial'].description") {{ des }}
                li.warning(v-for="(des) in planSpec['Trial'].description_warning") {{ des }}
        .plan(:class="{'selected' : (serviceMode == 'standard' || serviceMode == 'standard-perpetual') && promiseRunning, 'disabled' : (serviceMode !== 'standard' && serviceMode !== 'standard-perpetual') && promiseRunning}")
            .card
                .title Standard 
                .option 
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
                button.final(type="button" :class="{'disabled': promiseRunning}" @click="selectedPlan('standard')")
                    template(v-if="(serviceMode == 'standard' || serviceMode == 'standard-perpetual') && promiseRunning")
                        .loader(style="--loader-color:white; --loader-size: 12px")
                    template(v-else) Select
            ul.provides
                li(v-for="(des) in planSpec['Standard'].description") {{ des }}
        .plan(:class="{'selected' : (serviceMode == 'premium' || serviceMode == 'premium-perpetual') && promiseRunning, 'disabled' : (serviceMode !== 'premium' && serviceMode !== 'premium-perpetual') && promiseRunning}")
            .card
                .title Premium 
                .option 
                    TabMenu(v-model="activeTabs.premium" :tabs="['basic', 'perpetual']")
                .price
                    template(v-if="activeTabs.premium === 0") 
                        .faktum {{ '$' + planSpec['Premium'].price }}
                        span /mo
                    template(v-else)
                        .faktum {{ '$' + planSpec['Premium (Perpetual License)'].price }}
                        span /only-once
                .desc Empower your business with formcarry, #[span.wordset for big businesses]
                button.final(type="button" :class="{'disabled': promiseRunning}" @click="selectedPlan('premium')")
                    template(v-if="(serviceMode == 'premium' || serviceMode == 'premium-perpetual') && promiseRunning")
                        .loader(style="--loader-color:white; --loader-size: 12px")
                    template(v-else) Select
            ul.provides
                li(v-for="(des) in planSpec['Premium'].description") {{ des }}

br
br
br
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { serviceIdList, serviceList } from '@/views/service-list'
import { skapi } from '@/main';
import { customer } from '@/code/user';
import { planSpec } from "@/views/service/service-spec";

import Service from '@/code/service';
import TabMenu from '@/components/tab.vue';

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
let newServiceName = ref('');
let activeTabs = ref({
    trial: 0,
    standard: 0,
    premium: 0,
});
let step = ref(1);

let createSubscription = async (ticket_id, service_info, isPerpetual=false) => {
    if(serviceMode.value.includes('perpetual')) {
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
        alert(response.error.message);
        return;
    }

    window.location = response.url;
}

let createService = () => {
    promiseRunning.value = true;

    Service.create({ name: newServiceName.value })
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

let selectedPlan = (plan: string) => {
    if(plan !== 'trial') {
        if (activeTabs.value[plan] == 1) {
            plan = plan + '-perpetual';
        }
    }

    serviceMode.value = plan;
    createService();
}
</script>

<style scoped lang="less">
#create {
    max-width: 1000px;
    padding: 0 8px;
    margin: 0 auto;
    padding-top: 10px;
}

.smallTitle {
    font-size: 0.8rem;
    color: #333;
    margin-bottom: 0.5rem;
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

.form {
    max-width: 570px;
    width: 100%;
    height: calc((100vh - var(--footer-height) - 50px) / 2);
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    gap: 1rem;
}

input {
    width: unset;
    flex-grow: 1;
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
    align-items: start;
    padding-top: 7rem;

    .plan {
        width: 31%;
        min-width: 250px;
        flex-grow: 1;
        transition: all .3s;
        scale: 1;

        &.selected {
            scale: 1.05;
            
            .card {
                box-shadow: 1px 1px 10px rgba(0,0,0, 0.05);
            }
        }
        &.disabled {
            opacity: 0.5;
            pointer-events: none;
            cursor: default;
        }
        &:hover {
            scale: 1.05;
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
    .step-wrap {
        .list {
            display: none;
        }
    }
    .form {
        height: unset;
        padding: 0 10px;
        padding-top: 20px;

        button {
            width: 100%;
        }
    }
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