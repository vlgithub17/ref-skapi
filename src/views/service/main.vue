<template lang="pug">

#serviceMain(v-if="serviceMainLoaded")
    #leftNav(style='position:relative')
        div(style='position: sticky; top: calc(56px + var(--nav-top, 0));')
            br
            nav.left 
                router-link.router(:to="`/my-services/${currentService.id}`" :class="{'active': route.name == 'service'}")
                    //- span.material-symbols-outlined.notranslate.nohover(:class="{'fill': route.name == 'service'}") home
                    //- conditionally render svg
                    svg(v-if="route.name === 'service'")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-home-fill")
                    svg(v-else)
                        use(xlink:href="@/assets/img/material-icon.svg#icon-home")
                    //- render svg  
                    span.name Getting Started
                    
                router-link.router(:to="`/my-services/${currentService.id}/dashboard`" :class="{'active': route.name == 'dashboard'}")
                    //- span.material-symbols-outlined.notranslate.nohover(:class="{'fill': route.name == 'dashboard'}") settings
                    svg(v-if="route.name === 'dashboard'")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-settings-fill")
                    svg(v-else)
                        use(xlink:href="@/assets/img/material-icon.svg#icon-settings")
                    span.name Service Settings

                router-link.router(:to="`/my-services/${currentService.id}/users`" :class="{'active': route.name == 'users'}")
                    //- span.material-symbols-outlined.notranslatel.nohover(:class="{'fill': route.name == 'users'}") supervisor_account
                    svg(v-if="route.name === 'users'")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-supervisor-account-fill")
                    svg(v-else)
                        use(xlink:href="@/assets/img/material-icon.svg#icon-supervisor-account")
                    span.name Users
                
                router-link.router(:to="`/my-services/${currentService.id}/openid`" :class="{'active': route.name == 'openid'}")
                    //- span.material-symbols-outlined.notranslatel.nohover(:class="{'fill': route.name == 'users'}") supervisor_account
                    svg(v-if="route.name === 'openid'")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-openid-fill")
                    svg(v-else)
                        use(xlink:href="@/assets/img/material-icon.svg#icon-openid")
                    span.name OpenID Logger

                router-link.router(:to="`/my-services/${currentService.id}/clientsecret`" :class="{'active': route.name == 'clientsecret'}")
                    //- span.material-symbols-outlined.notranslatel.nohover(:class="{'fill': route.name == 'clientsecret'}") key
                    svg(v-if="route.name === 'clientsecret'")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-key-fill")
                    svg(v-else)
                        use(xlink:href="@/assets/img/material-icon.svg#icon-key")
                    span.name Client Secret Key

                router-link.router(:to="`/my-services/${currentService.id}/records`" :class="{'active': route.name == 'records'}")
                    //- span.material-symbols-outlined.notranslatel.nohover(:class="{'fill': route.name == 'records'}") database
                    svg(v-if="route.name === 'records'")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-database-fill")
                    svg(v-else)
                        use(xlink:href="@/assets/img/material-icon.svg#icon-database")
                    span.name Database

                router-link.router(:to="`/my-services/${currentService.id}/mail`" :class="{'active': route.name == 'mail'}")
                    //- span.material-symbols-outlined.notranslatel.nohover(:class="{'fill': route.name == 'mail'}") email
                    svg(v-if="route.name === 'mail'")
                        use(xlink:href="@/assets/img/material-icon.svg#icon-mail-fill")
                    svg(v-else)
                        use(xlink:href="@/assets/img/material-icon.svg#icon-mail")                        
                    span.name Automated Email

                div(v-if='currentService.service.group <= 1' @click='()=>openOffer=true')
                    .router.deact(:to="`/my-services/${currentService.id}/newsletter`" :class="{'active': route.name == 'newsletter'}")
                        //- span.material-symbols-outlined.notranslatel.nohover(:class="{'fill': route.name == 'newsletter'}") stacked_email
                        svg(v-if="route.name === 'newsletter'")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-stacked-email-fill")
                        svg(v-else)
                            use(xlink:href="@/assets/img/material-icon.svg#icon-stacked-email") 
                        span.name Bulk Email

                    .router.deact(:to="`/my-services/${currentService.id}/hosting`" :class="{'active': route.name == 'hosting'}")
                        //- span.material-symbols-outlined.notranslatel.nohover(:class="{'fill': route.name == 'hosting'}") language
                        svg(v-if="route.name === 'hosting'")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-language")
                        svg(v-else)
                            use(xlink:href="@/assets/img/material-icon.svg#icon-language") 
                        span.name File Hosting

                template(v-else)
                    router-link.router(:to="`/my-services/${currentService.id}/newsletter`" :class="{'active': route.name == 'newsletter'}")
                        //- span.material-symbols-outlined.notranslatel.nohover(:class="{'fill': route.name == 'newsletter'}") stacked_email
                        svg(v-if="route.name === 'newsletter'")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-stacked-email-fill")
                        svg(v-else)
                            use(xlink:href="@/assets/img/material-icon.svg#icon-stacked-email") 
                        span.name Bulk Email

                    router-link.router(:to="`/my-services/${currentService.id}/hosting`" :class="{'active': route.name == 'hosting'}")
                        //- span.material-symbols-outlined.notranslatel.nohover(:class="{'fill': route.name == 'hosting'}") language
                        svg(v-if="route.name === 'hosting'")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-language")
                        svg(v-else)
                            use(xlink:href="@/assets/img/material-icon.svg#icon-language") 
                        span.name File Hosting
    main.right
        router-view
        br
        br
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

    
    // upgrade service
    Modal(:open="openOffer" @close="openOffer=false")
        h4(style='margin:.5em 0 0;') Upgrade

        hr

        div(style='font-size:.8rem;')
            p.
                You can access more features like sending newsletters,
                #[br]
                inviting users and file hosting by upgrading your service.
                
            p Would you like you check out our service plans?


        br

        div(style="display: flex; align-items: center; justify-content: space-between;")
            button.noLine(type="button" @click="openOffer=false;") No
            router-link(:to='`/subscription/${currentService.id}`')
                button.final(type="button") Yes
div(v-else style='text-align: center;margin-top: 100px;')
    .loader(style="--loader-color:blue; --loader-size:12px")


</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { serviceList } from "@/views/service-list";
import { currentService, setService, serviceMainLoaded } from "@/views/service/main";
import Modal from "@/components/modal.vue";
import MaterialIcon from "@/assets/img/material-icon.svg"

const router = useRouter();
const route = useRoute();

let openOffer = ref(false);

let serviceId = route.path.split("/")[2];
let currentRouter = ref("");
let routerList = [
    "service",
    "dashboard",
    "users",
	"openid",
    "clientsecret",
    "records",
    "mail",
    "newsletter",
    "hosting",
];
let titleList = [
    "Getting Started",
    "Service Settings",
    "Users",
	"OpenID Logger",
    "Client Secret Key",
    "Database",
    "Automated Email",
    "Bulk Email",
    "File Hosting",
];

let index = 0;
let prevRouter = ref("");
let nextRouter = ref("");
let plan = ref("Trial");

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
    plan.value = currentService?.plan;

        if (plan.value == "Trial") {
            routerList = ["service", "dashboard", "users", "openid", "clientsecret", "records", "mail"];
            titleList = [
                "Getting Started",
                "Dashboard & Settings",
                "Users",
				"OpenID Logger",
                "Client Secret Key",
                "Database",
                "Automated Email"
            ];
        }

        if (index == -1) {
            nextRouter.value = "dashboard";
            titleList[0] = "Dashboard & Settings";
        } else if (index == 1) {
            prevRouter.value = "";
            titleList[0] = "Getting Started";
            nextRouter.value = routerList[index + 1];
        } else {
            prevRouter.value = routerList[index - 1];
            nextRouter.value = routerList[index + 1];
        }
    },
    { immediate: true, deep: true }
);
</script>

<style lang="less" scoped>
.deact {
    background-color: transparent !important;
    fill: rgba(0,0,0,0.5) !important;
    cursor: pointer;
    color: rgba(0,0,0,0.5) !important;
}
#serviceMain {
    position: relative;
    max-width: 1400px;
    display: flex;
    flex-wrap: nowrap;
    margin: 0 auto;
    gap: 1em;
    nav.left {
        margin-right: 8px;
        margin-left: 8px;
    }

    .right {
        width: 50%;
        flex-grow: 1;
        // padding: 8px 0;
    }

    .bottom {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        gap: 20px;
        // padding: 20px 8px 40px;
        padding: 20px 20px 40px;
        .link {
            // width: calc(50% - 10px);
            flex-grow: 1;
            flex-shrink: 0;
            min-width: 320px;
            width: 0; // flex 매직
            a {
                display: block;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 6px;
                padding: 11px 16px 13px;
                text-decoration: none;
                transition: all 0.25s;

                &:hover {
                    border: 1px solid rgba(41, 63, 230, 0.6);
                }
                &.next {
                    text-align: right;
                }
                .desc {
                    color: rgba(0, 0, 0, 0.4);
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
    // border-radius: 6px;
    text-decoration: none;
    color: var(--main-color);
    white-space: nowrap;
    fill: var(--main-color); // for svg icon
    
    // border-radius: 12px;
    // margin-bottom: 16px;

    &.active {
        background: #293fe60d;
        box-shadow: 0 0 0 1px var(--main-color) inset;

        // background-color: #344054;
        // color: #fff;
        // fill: #fff;

        .name {
            font-weight: 700;
        }

        // &:hover {
        //     background-color: #344054;
        // }
    }

    &:hover {
        background: #293fe60d;
        // background-color: #34405521;
        // box-shadow: -1px -1px 0px 0px rgba(0, 0, 0, 0.1) inset;
    }

    // &:last-child {
    //     margin-bottom: 0;
    // }

    span {
        vertical-align: middle;
    }

    .material-symbols-outlined {
        font-size: 32px;
    }

    svg {
        height: 32px;
        width: 32px;
    }

    .name {
        font-weight: 500;
        margin-left: 13px;
        padding-right: 0.25em;
    }
}

@media (max-width: 1023px) {
    .router {
        .name {
            display: none;
        }
    }
}

@media (max-width: 767px) {
    #serviceMain {
        #leftNav {
            display: none;
        }
    }
}
</style>
