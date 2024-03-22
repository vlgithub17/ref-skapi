<template lang="pug">
br
br
br

#subscription
    nav.left 
        router-link.router(:to="`/my-services/${service.service}`")
            span.material-symbols-outlined.back.nohover arrow_back_ios
            span.name Dashboard

    main.right 
        section.infoBox 
            .row
                .smallTitle Service Name
                .smallValue {{ service.name }}

            .row 
                .smallTitle Service ID
                .smallValue {{ service.service }}

            .row 
                .smallTitle Service Plan
                span(v-if="serviceFetching") ...
                template(v-else-if="service.group == 1") 
                    span Trial
                template(v-else-if="service.group == 2 || service.group == 51") 
                    span Standard
                template(v-else-if="service.group == 3") 
                    span Premium
                template(v-else-if="service.group == 50") 
                    span Unlimited
                template(v-else="service.group == 51") 
                    span Free Standard

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

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
let serviceFetching = ref(false);
</script>

<style lang="less">
#subscription {
    position: relative;
    max-width: 100%;
    display: flex;
    flex-wrap: nowrap;

    .left {
        padding-left: 20px;
    }
    .right {
        width: 50%;
        flex-grow: 1;
        padding: 0 20px;

        > div {
            max-width: 1200px;
            margin: 0 auto;
        }
    }
}
.router {
    display: block;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    color: var(--main-color);
    white-space: nowrap;

    span {
        vertical-align: middle;
    }
    .back {
        font-size: 1rem;
        margin-left: 9px;
    }
    .name {
        font-size: 1rem;
        font-weight: 500;
        margin-left: 13px;
        padding-right: 60px;
    }
}

@media (max-width:1023px) {
    .router {
        .name {
            display: none;
        }
    }
}
</style>