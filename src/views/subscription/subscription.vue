<template lang="pug">
br
br
br

main#subscription
    .wrap
        img(src="@/assets/img/logo/logo.png" style="width:193px;")

        br
        br
        br

        section
            .title Current Subscription

            .line 
            
            .smallTitle Service Plan
            .smallValue Trial

            br

            .smallTitle Service Name
            .smallValue abcdefg

            br

            .smallTitle Service ID
            .smallValue ap226E8TXhYtbcXRgi5D

        br
        br
        br

        section
            .title Subscription Plans

            .line 

            .planWrap
                .infoBox
                    .mode Trial Mode
                    .price $0

                    br

                    button.final.disabled Current Plan

                    .line

                    ul
                        li Provides 10k user accounts
                        li 4 GB of database
                        li 50 GB of file storage
                        li All the users and data will be deleted every 7 days
                .infoBox
                    .mode Standard Mode
                    .price $19

                    br

                    button.final Upgrade

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

                    button.final Upgrade

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
br
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { serviceFetching } from '@/code/service'

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
</script>

<style scoped lang="less">
#subscription {
    width: 100%;
    padding: 0 20px;

    .wrap {
        max-width: 900px;
        margin: 0 auto 0;
    }
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
        }
    }
}
</style>