<template lang="pug">
#serviceMain(v-if="serviceMainLoaded")
    Sticky(fix-width)
        br
        nav.left
            router-link.router(:to="`/my-services/${currentService.id}`" :class="{'active': route.name == 'service'}")
                span.material-symbols-outlined.icon.fill.nohover home
                span.name Dashboard
            router-link.router(:to="`/my-services/${currentService.id}/users`" :class="{'active': route.name == 'users'}")
                span.material-symbols-outlined.icon.fill.nohover supervisor_account
                span.name Users
            router-link.router(:to="`/my-services/${currentService.id}/records`" :class="{'active': route.name == 'records'}")
                span.material-symbols-outlined.icon.fill.nohover database
                span.name Database
            router-link.router(:to="`/my-services/${currentService.id}/clientsecret`" :class="{'active': route.name == 'clientsecret'}")
                span.material-symbols-outlined.icon.fill.nohover key
                span.name Client Secret
            router-link.router(:to="`/my-services/${currentService.id}/mail`" :class="{'active': route.name == 'mail'}")
                span.material-symbols-outlined.icon.fill.nohover email
                span.name Mail
            router-link.router(:to="`/my-services/${currentService.id}/hosting`" :class="{'active': route.name == 'hosting'}")
                span.material-symbols-outlined.icon.fill.nohover language
                span.name Hosting
    main.right 
        router-view
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
import { loginState } from '@/code/user';
import { serviceList } from '@/views/service-list';
import { currentService, setService, serviceMainLoaded } from '@/views/service/main';
import Sticky from '@/components/sticky.vue';

const router = useRouter();
const route = useRoute();
serviceMainLoaded.value = false;

let serviceId = route.path.split('/')[2];

watch(loginState, nv => {
    if (!nv) {
        router.push('/login');
    }
}, { immediate: true });

watch(serviceList, nv => {
    if (nv[serviceId] && currentService?.id !== serviceId) {
        try {
            setService(serviceId);
        }
        catch (err) {
            router.push('/my-services');
        }
    } else if (nv[serviceId] && currentService?.id === serviceId && !serviceMainLoaded.value) {
        serviceMainLoaded.value = true;
    }
}, { immediate: true });

</script>

<style lang="less" scoped>
#serviceMain {
    position: relative;
    max-width: 1200px;
    display: flex;
    flex-wrap: nowrap;
    margin: 0 auto;

    .left {
        margin-right: 1rem;
        margin-left: 8px;
    }

    .right {
        width: 50%;
        flex-grow: 1;
        padding: 8px;
    }
}

.router {
    display: block;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    color: var(--main-color);
    white-space: nowrap;

    &.active {
        background: #293FE60D;
        box-shadow: -1px -1px 0px 0px rgba(0, 0, 0, 0.15) inset;

        .name {
            font-weight: 700;
        }
    }

    span {
        vertical-align: middle;
    }

    .icon {
        font-size: 32px;
    }

    .name {
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

@media (max-width:767px) {
    #serviceMain {
        .left {
            display: none;
        }
    }
}
</style>