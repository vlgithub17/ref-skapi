<template lang="pug">
br
br
br

main#create
    form.wrap
        img(src="@/assets/img/logo/logo.png" style="width:193px;")

        br
        br
        br

        section
            .title Subscription Plans
            .desc Choose one of the plans

            .line 
            
            label.smallTitle Name of Service
            input#serviceName(type="text" @input='(e)=>{newServiceName=e.target.value;error="";}' placeholder="Name of Service")

        br
        br

        section
            .planWrap
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
        br
        br

        div(style="width:100%;text-align:center")
            button.final(type="submit") Create

br
br
br
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { callServiceList } from '@/views/service-list'

const router = useRouter();
const route = useRoute();

// document.body.classList.add('fa');

let service = {
    active: 1,
    name: 'service name',
    cors: 'service cors',
    timestamp: 1709102706561,
    group: 1,
    service: 'ap226E8TXhYtbcXRgi5D',
    users: 10
}
let serviceMode = ref('standard');
</script>

<style scoped lang="less">
#create {
    width: 100%;
    padding: 0 20px;

    .wrap {
        max-width: 900px;
        margin: 0 auto 0;
    }
    .title {
        display: inline-block;
        color: rgba(0, 0, 0, 0.80);
        font-size: 28px;
        font-weight: 700;
        margin-right: 1rem;
    }
    .desc {
        display: inline-block;
        font-size: 0.9rem;
        color: var(--black-4);
        margin-top: 8px;
    }
    .line {
        width: 100%;
        height: 1px;
        background: rgba(0, 0, 0, 0.10);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        margin: 28px 0;
    }
}
input {
    display: block;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 0 1rem;
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
            background-color: rgba(41,63,230,0.02);
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