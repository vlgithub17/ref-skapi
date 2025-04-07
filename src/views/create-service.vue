<template lang="pug">
br
br
br

main#create
    router-link(to="/my-services")
        img(src="@/assets/img/logo/logo.png" style="height: 2rem;")

    .bottomLineTitle Create a New Service

    //- p
    //-     | Choose a plan for your service "
    //-     span(style='font-weight:500') {{newServiceName}}
    //-     | "

    .section
        router-link(to="/my-services")
            img.symbol(src="@/assets/img/logo/symbol-logo.png" alt="Skapi logo" style="height: 44px;margin-bottom: 0.5rem;")
        .title.faktum Create a New Service
        .desc Choose a plan for your service #[span.wordset.newname {{newServiceName}}]

    .plan-wrap.card-wrap
        .plan(:class="{'selected' : serviceMode == 'trial'}")
            .card
                .title Trial
                //- .option 
                    TabMenu(v-model="activeTabs.trialPlan" :tabs="['basic']")
                .price
                    .faktum $0
                    span /mo
                .desc Suits best for hobby use #[span.wordset for small projects #[span.wordset or businesses.]]
                button.final(type="button" :class="{'disabled': promiseRunning}" @click="selectedPlan('trial')") 
                    template(v-if="serviceMode == 'trial' && promiseRunning")
                        .loader(style="--loader-color:white; --loader-size: 12px")
                    template(v-else) Select
            ul.provides
                li 10K User Accounts
                li 4GB Database Storage
                li 50GB File Storage
                li.warning Sending bulk emails not included
                li.warning All user data is deleted every 30 days
        .plan(:class="{'selected' : serviceMode == 'standard'}")
            .card
                .title Standard 
                //- .option 
                    TabMenu(v-model="activeTabs.standardPlan" :tabs="['basic', 'limited']")
                .price
                    template(v-if="activeTabs.standardPlan === 0") 
                        .faktum $19
                        span /mo
                    template(v-else)
                        .faktum $300
                        span /only-once
                .desc 
                    template(v-if="activeTabs.standardPlan === 0") Suits best for hobby use #[span.wordset for small projects #[span.wordset or businesses.]]
                    template(v-else) Get lifetime access to the Standard plan for just $300—upgrade anytime as your needs grow.
                button.final(type="button" :class="{'disabled': promiseRunning}" @click="selectedPlan('standard')")
                    template(v-if="serviceMode == 'standard' && promiseRunning")
                        .loader(style="--loader-color:white; --loader-size: 12px")
                    template(v-else) Select
            ul.provides
                li 10K User Accounts
                li User Invitation System
                li Website Hosting
                li 8GB Database Storage
                li 100GB File Storage & Subdomain Hosting
                li Automated Emails & Sending Bulk Emails
                li 1GB Email Storage
        .plan(:class="{'selected' : serviceMode == 'premium'}")
            .card
                .title Premium 
                //- .option 
                    TabMenu(v-model="activeTabs.premiumPlan" :tabs="['basic']")
                .price
                    .faktum $89
                    span /mo
                .desc Empower your business with formcarry, #[span.wordset for big businesses]
                button.final(type="button" :class="{'disabled': promiseRunning}" @click="selectedPlan('premium')")
                    template(v-if="serviceMode == 'premium' && promiseRunning")
                        .loader(style="--loader-color:white; --loader-size: 12px")
                    template(v-else) Select
            ul.provides
                li Includes all Standard Plan features
                li 100K User Accounts
                li 100GB Database Storage
                li 1TB File Storage & Subdomain Hosting
                li 10GB Email Storage
    
    //- section.planWrap(:class="{'disabled' : promiseRunning}")
        .infoBox(:class="{'checked' : serviceMode == 'trial'}" @click="serviceMode='trial'")
            .mode Trial Mode
            .price $0

            hr

            ul
                li 10K User Accounts
                li 4GB Database Storage
                li 50GB File Storage
                li.warning Sending bulk emails not included
                li.warning All user data is deleted every 30 days
        .infoBox(:class="{'checked' : serviceMode == 'standard'}" @click="serviceMode='standard'")
            .mode Standard Mode
            .price $19

            hr

            ul
                li 10K User Accounts
                li User Invitation System
                li Website Hosting
                li 8GB Database Storage
                li 100GB File Storage & Subdomain Hosting
                li Automated Emails & Sending Bulk Emails
                li 1GB Email Storage
        .infoBox(:class="{'checked' : serviceMode == 'premium'}" @click="serviceMode='premium'")
            .mode Premium Mode
            .price $89

            hr

            ul
                li Includes all Standard Plan features
                li 100K User Accounts
                li 100GB Database Storage
                li 1TB File Storage & Subdomain Hosting
                li 10GB Email Storage

    br

    //- p(style='font-size: 16px;display: flex;justify-content: center;') Selected Plan:&nbsp; #[b(style='color:var(--main-color)') {{serviceMode.charAt(0).toUpperCase() + serviceMode.slice(1)}}]
    //- .inputWrap(@submit.prevent="createService")
        div(v-if="promiseRunning" style="text-align:center")
            .loader(style="--loader-color:blue; --loader-size: 12px")
        template(v-else)
            button.final(type="submit" @click='createService') Create {{serviceMode.charAt(0).toUpperCase() + serviceMode.slice(1)}}

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

let selectedPlan = (plan: string) => {
    serviceMode.value = plan;
    createService();
}
</script>

<style scoped lang="less">
#create {
    max-width: 1000px;
    padding: 0 8px;
    margin: 0 auto;
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

.newname {
    font-weight: bold;
    color: var(--main-color);
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
        padding: 20px;
        flex-grow: 1;
        user-select: none;
        cursor: pointer;
        box-shadow: 0 0 0 4px rgba(0,0,0,0.1) inset;
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
    align-items: start;

    .plan {
        width: 31%;
        min-width: 250px;
        flex-grow: 1;
        opacity: 0.5;
        transition: all .3s;

        &.selected {
            scale: 1.05;
            opacity: 1;
            
            .card {
                box-shadow: 1px 1px 10px rgba(0,0,0, 0.05);
            }
            .provides {
                li {
                    // &::before {
                    // 	background: url('@/assets/img/icon/check.svg') no-repeat;
                    // 	background-size: cover;
                    // 	width: 16px;
                    // 	height: 16px;
                    // 	opacity: 1;
                    // }
                }
            }
        }

        &:hover {
            opacity: 1;
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