<template lang="pug">
#serviceMain(v-if="serviceMainLoaded")
    Sticky(fix-width)
        br
        nav.left
            router-link.router(:to="`/my-services/${currentService.id}`" :class="{'active': route.name == 'service'}")
                span.material-symbols-outlined.fill.nohover home
                span.name Getting Started
            router-link.router(:to="`/my-services/${currentService.id}/dashboard`" :class="{'active': route.name == 'dashboard'}")
                span.material-symbols-outlined.fill.nohover dashboard
                span.name Dashboard & Settings
            router-link.router(:to="`/my-services/${currentService.id}/users`" :class="{'active': route.name == 'users'}")
                span.material-symbols-outlined.fill.nohover supervisor_account
                span.name Users
            router-link.router(:to="`/my-services/${currentService.id}/clientsecret`" :class="{'active': route.name == 'clientsecret'}")
                span.material-symbols-outlined.fill.nohover key
                span.name Client Secret Key
            router-link.router(:to="`/my-services/${currentService.id}/records`" :class="{'active': route.name == 'records'}")
                span.material-symbols-outlined.fill.nohover database
                span.name Database
            router-link.router(:to="`/my-services/${currentService.id}/mail`" :class="{'active': route.name == 'mail', 'nonClickable' : currentService.service.group <= 1}")
                span.material-symbols-outlined.fill.nohover email
                span.name Automated Email
            router-link.router(:to="`/my-services/${currentService.id}/newsletter`" :class="{'active': route.name == 'newsletter', 'nonClickable' : currentService.service.group <= 1}")
                span.material-symbols-outlined.fill.nohover stacked_email
                span.name Bulk Email
            router-link.router(:to="`/my-services/${currentService.id}/hosting`" :class="{'active': route.name == 'hosting', 'nonClickable' : currentService.service.group <= 1}")
                span.material-symbols-outlined.fill.nohover language
                span.name File Hosting
    main.right
        router-view
        br
        //- br
        //- br
        //- hr
        nav.bottom 
            .link
                router-link.prev(v-if="currentRouter && titleList[index-1]" :to="`/my-services/${currentService.id}/${prevRouter}`")
                    .desc Prev Page
                    .title {{ titleList[index-1] }}
            .link
                router-link.next(v-if="currentRouter !== 'hosting' && titleList[index+1]" :to="`/my-services/${currentService.id}/${nextRouter}`")
                    .desc Next Page
                    .title {{ titleList[index+1] }}
        br
        br

    
div(v-else style='text-align: center;margin-top: 100px;')
    img.loading(src="@/assets/img/loading.png")
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { loginState } from '@/code/user';
import { serviceList } from '@/views/service-list';
import { currentService, setService, serviceMainLoaded } from '@/views/service/main';
import Sticky from '@/components/sticky.vue';

const router = useRouter();
const route = useRoute();

let serviceId = route.path.split('/')[2];
let currentRouter = ref('');
let routerList = ['service', 'dashboard', 'users', 'clientsecret', 'records', 'mail', 'newsletter', 'hosting'];
let titleList = ['Getting Started', 'Dashboard & Settings', 'Users', 'Client Secret Key', 'Database', 'Automated Email', 'Bulk Email', 'File Hosting'];

let index = 0;
let prevRouter = ref('');
let nextRouter = ref('');
let plan = ref('Trial');

watch(loginState, nv => {
    if (!nv) {
        router.push('/login');
    }
}, { immediate: true });

watch(serviceList, nv => {
    if (nv[serviceId] && currentService?.id !== serviceId) {
        try {
            setService(serviceId);
            plan.value = currentService?.plan;
        }
        catch (err) {
            router.push('/my-services');
        }
    } else if (nv[serviceId] && currentService?.id === serviceId && !serviceMainLoaded.value) {
        serviceMainLoaded.value = true;
    }
}, { immediate: true });

watch(() => route, nv => {
    currentRouter.value = nv.path.split('/')[3];
    index = routerList.indexOf(currentRouter.value);

    if(plan.value == 'Trial') {
        routerList = ['service', 'dashboard', 'users', 'clientsecret', 'records'];
        titleList = ['Getting Started', 'Dashboard & Settings', 'Users', 'Client Secret Key', 'Database'];
    }

    if(index == -1) {
        nextRouter.value = 'dashboard';
        titleList[0] = 'Dashboard & Settings';
    } else if(index == 1) {
        prevRouter.value = '';
        titleList[0] = 'Getting Started';
        nextRouter.value = routerList[index+1];
    } else {
        prevRouter.value = routerList[index-1];
        nextRouter.value = routerList[index+1];
    }
}, { immediate: true, deep: true});

</script>

<style lang="less" scoped>
#serviceMain {
    position: relative;
    max-width: 1600px;
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

    .bottom {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        gap: 20px;

        .link {
            // width: calc(50% - 10px);
            flex-grow: 1;
            flex-shrink: 0;
            min-width: 320px;
            width: 0; // flex 매직
            a {
                display: block;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 8px;
                padding: 11px 16px 13px;
                text-decoration: none;
                transition: all .25s;

                &:hover {
                    border: 1px solid rgba(41, 63, 230, 0.6);
                }
                &.next {
                    text-align: right;
                }
                .desc {
                    color: rgba(0,0,0,0.4);
                    font-size: 0.8rem;
                }
                .title {
                    color: var(--main-color);
                }
            }
        }   
    }
}

.router {
    display: block;
    padding: 12px;
    border-radius: 6px;
    text-decoration: none;
    color: var(--main-color);
    white-space: nowrap;

    &.active {
        background: #293FE60D;
        box-shadow: -1px -1px 0px 0px rgba(0, 0, 0, 0.1) inset;

        .name {
            font-weight: 700;
        }
    }

    span {
        vertical-align: middle;
    }

    .material-symbols-outlined {
        font-size: 32px;
    }

    .name {
        font-weight: 500;
        margin-left: 13px;
        padding-right: 1em;
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