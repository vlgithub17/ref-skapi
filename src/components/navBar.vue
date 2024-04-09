<template lang="pug">
header#navBar 
    .left 
        template(v-if="route.path.split('/').length > 2 && route.path.split('/')[1] == 'my-services'")
            router-link.logo(to="/my-services")
                .material-symbols-outlined.nohover.back(style="font-size:32px") arrow_back_ios
                span.name My services
        template(v-else)
            router-link.logo(to="/")
                img.symbol(src="@/assets/img/logo/symbol-logo-white.png" style="image-orientation: none;")
                span Skapi
    .right
        ul
            li
                a.doc(href="https://docs.skapi.com" target="_blank") Docs
            template(v-if="loginState")
                li(v-if="route.name == 'home' || route.name == 'accountsetting'" style="margin-left:1rem")
                    router-link(to="/my-services") My services
                li
                    .prof(@click.stop="(e)=>{showDropDown(e)}")
                        .material-symbols-outlined.fill.nohover(style="margin-left:1rem") person
                        .moreVert.profile(ref="moreVert" @click.stop style="--moreVert-right:0;display:none")
                            .inner(style="padding:0")
                                .account {{ user.email }}
                                ul.menu 
                                    li
                                        .material-symbols-outlined.fill.nohover credit_card
                                        span Billing
                                    li(@click="navigateToPage")
                                        .material-symbols-outlined.fill.nohover settings
                                        span Account Settings
                                    li(@click="logout")
                                        .material-symbols-outlined.fill.nohover logout
                                        span Logout
                                .policy
                                    router-link(to="public/pp.html" target="_blank") terms of service ● privacy policy
            template(v-else)
                li
                    router-link.ser(to="/login") login
                li
                    router-link.sign(to="/signup") sign-up
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { skapi } from '@/code/admin';
import { loginState, user } from '@/code/user';
import { showDropDown } from '@/assets/js/event.js'

const router = useRouter();
const route = useRoute();

console.log(route.path.split('/')[1])

let moreVert = ref(null);

let navigateToPage = () => {
    moreVert.value.style.display = 'none';
    router.push({ path: '/account-setting' });
}

let logout = () => {
    skapi.logout().then(()=>{
        for(let k in user) {
            delete user[k];
        }
    })
}
</script>

<style lang="less" scoped>
#navBar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    width: 100%;
    padding: 12px 20px;
    display: flex;
    background-color: #262626;
    font-size: 18px;
    color: #fff;
    
    .left {
        display: inline-block;
        vertical-align: middle;

        .logo {
            display: block;
            text-decoration: none;

            * {
                vertical-align: middle;
            }

            img {
                height: 30px;
                margin-right: 1rem;
            }
            span {
                font-weight: bold;
            }
        }
    }
    .right {
        display: inline-block;
        vertical-align: middle;
        flex-grow: 1;
        font-weight: bold;

        ul {
            position: relative;
            text-align: right;
            margin: 0;
            
            li {
                display: inline-block;
                vertical-align: middle;
                list-style: none;
                user-select: none;
                cursor: pointer;

                img {
                    width: 20px;
                    height: 20px;
                    // filter: invert(37%) sepia(0%) saturate(0%) hue-rotate(92deg) brightness(97%) contrast(89%);
                    filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(355deg) brightness(107%) contrast(106%) !important;
                }
            }
        }
        .ser {
            padding: 0 1rem;
        }
        .sign {
            color: #fff;
            padding: 0 20px;
            border-radius: 8px;
            background: var(--main-color);
        }
        .prof {
            .material-symbols-outlined {
                font-size: 32px;
            }
        }
    }
    .profile {
        color: #000;
        font-weight: 500;
        margin-top: 20px;
        user-select: none;

        ul {
            text-align: left;
            li {
                display: block;
            }
        }

        .account {
            padding: 10px 20px;
            border-bottom: 1px solid rgba(0, 0, 0, .15);
        }
        .menu {
            display: block;
            padding: 10px 20px;
            color: var(--main-color);

            .material-symbols-outlined {
                color: var(--main-color);
                margin-right: 8px;
            }
        }
        .policy {
            border-top: 1px solid rgba(0, 0, 0, .15);
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            padding: 10px 30px;
            white-space: nowrap;
            
            a {
                text-decoration: none;
                color: var(--black-4);

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
    a:not(.policy a) {
        color: #fff;
        text-decoration: none;
        display: inline-block;

        &:not(.logo):hover {
            text-decoration: underline;
        }
    }
}
.service {
    font-size: 1rem;
    color: var(--main-color) !important;
}

</style>