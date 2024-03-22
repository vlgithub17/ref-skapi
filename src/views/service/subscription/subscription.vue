<template lang="pug">
br
br
br

main#subscription
    .wrap
        //- RouterLink(:to="{name: 'home'}")
            img.logo(src="@/assets/img/logo/symbol-logo.png" style="width:40px")
        img(src="@/assets/img/logo/logo.png" style="width:193px;")
        //- .title Subscription

        //- .line

        br
        br
        br

        .smallTitle Service Plan
        .smallValue Trial

        .smallTitle Service Name
        .smallValue abcdefg

        .smallTitle Service ID
        .smallValue ap226E8TXhYtbcXRgi5D

        br
        br
        br

        .title Service Plan

        //- br

        .line 

        .planWrap
            .infoBox
                .mode Trial Mode
                .price $0

                br

                button.final.disabled Current Plan

                .line

                ul
                    li 
                        .material-symbols-outlined.fill check_circle
                        span Provides 10k user accounts
                    li 
                        .material-symbols-outlined.fill check_circle
                        span 4 GB of database
                    li 
                        .material-symbols-outlined.fill check_circle
                        span 50 GB of file storage
                    li 
                        .material-symbols-outlined.fill warning
                        span All the users and data will be deleted every 7 days
            .infoBox
                .mode Standard Mode
                .price $19

                br

                button.final Upgrade

                .line

                ul
                    li 
                        .material-symbols-outlined.fill check_circle
                        span Provides 10k user accounts
                    li 
                        .material-symbols-outlined.fill check_circle
                        span 4GB of database
                    li 
                        .material-symbols-outlined.fill check_circle
                        span 50GB each for file storage and hosting storage
                    li 
                        .material-symbols-outlined.fill check_circle
                        span Real-time data

                ul
                    li 
                        .material-symbols-outlined.fill check_circle
                        span Automated emails and sending newsletters
                    li 
                        .material-symbols-outlined.fill check_circle
                        span 1GB of email storage
                    li 
                        .material-symbols-outlined.fill check_circle
                        span Subdomain hosting
            .infoBox
                .mode Premium Mode
                .price $89

                br

                button.final Upgrade

                .line

                ul
                    li 
                        .material-symbols-outlined.fill check_circle
                        span 100k user accounts
                    li 
                        .material-symbols-outlined.fill check_circle
                        span 100GB of database
                    li 
                        .material-symbols-outlined.fill check_circle
                        span 1TB each for file storage and hosting storage
                    li 
                        .material-symbols-outlined.fill check_circle
                        span Real-time data

                ul
                    li 
                        .material-symbols-outlined.fill check_circle
                        span Automated emails and sending newsletters
                    li 
                        .material-symbols-outlined.fill check_circle
                        span 10GB of email storage
                    li 
                        .material-symbols-outlined.fill check_circle
                        span Subdomain hosting
                    li 
                        .material-symbols-outlined.fill check_circle
                        span unlimited use with pay-as-you-go when exceeding the limit
br
br
br
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

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
let serviceFetching = ref(false);
</script>

<style lang="less">
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

        li {
            // display: flex;
            // flex-wrap: nowrap;

            div:first-child {
                font-size: 14px;
                margin-right: 5px;
            }
            span {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.60);
                font-weight: 400;
            }
        }
    }
}
</style>