<template lang="pug">
header#navBar 
    .left 
        router-link.logo(to="/")
            template(v-if="route.name == 'home'")
                img.full(src="@/assets/img/logo/logo-white.svg")
                img.symbol(src="@/assets/img/logo/symbol-logo-white.png" style="image-orientation: none;")
            template(v-else-if="route.name == 'myservices' || route.name == 'accountSettings'")
                img.full(src="@/assets/img/logo/logo.png")
                img.symbol(src="@/assets/img/logo/symbol-logo.png" style="image-orientation: none;")
            img.small(v-else src="@/assets/img/logo/symbol-logo.png")
    .right
        ul
            li(style="margin-right:1rem;margin-top:3px;")
                a(href="https://twitter.com/skapijs" target="_blank")
                    img(src="@/assets/img/icon/twitter.svg")
            li(style="margin-top:3px;")
                a(href="https://discord.com/invite/thqvysPnQt" target="_blank")
                    img(src="@/assets/img/icon/discord.svg")
        ul
            li
                a.doc(href="https://docs.skapi.com" target="_blank") Documentation
            template(v-if="loginState")
                li
                    router-link.ser(to="/my-services") My Services
                li
                    .prof F
                li(@click="logout") logout
            template(v-else)
                li
                    router-link.ser(to="/login") login
                li
                    router-link.ser(to="/login") sign-up
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { skapi } from '@/code/admin';
import { loginState, user } from '@/code/user';

const router = useRouter();
const route = useRoute();

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
    position: relative;
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: unset;
    top: unset;
    background-color: unset;
    color: var(--black-6);
    
    &.home {
        position: fixed;
        width: 100%;
        background-color: #262626;
        left: 0;
        top: 0;
        color: #fff;

        .right {
            ul {
                &:first-child {
                    &::after {
                        background-color: #fff;
                    }
                }
                img {
                    filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(355deg) brightness(107%) contrast(106%) !important;
                }
            }
        }

        a {
            color: #fff;
        }
    }
    .left {
        width: 11rem;

        .logo {
            display: block;
            height: 32px;

            img {
                height: 100%;
                
                &.symbol {
                    height: 85%;
                    display: none;
                }
                &.small {
                    height: 85%;
                    vertical-align: middle;
                }
            }
        }
    }
    .right {
        display: flex;
        align-items: center;

        ul {
            position: relative;
            display: flex;

            &:first-child {
                &::after {
                    position: absolute;
                    content: '';
                    top: 50%;
                    right: -1rem;
                    transform: translateY(-50%);
                    width: 1px;
                    height: 50%;
                    background-color: var(--black-6);
                }
            }
            li {
                list-style: none;

                img {
                    width: 20px;
                    height: 20px;
                    filter: invert(37%) sepia(0%) saturate(0%) hue-rotate(92deg) brightness(97%) contrast(89%);
                }
            }
        }
        .ser {
            padding: 0 1rem;
        }
        .prof {
            display: inline-block;
        }
    }
    a {
        text-decoration: none;
        color: var(--black-6);
        display: inline-block;
        font-weight: 700;
    }
}
.service {
    font-size: 1rem;
    font-weight: 700;
    color: var(--main-color) !important;
}

@media (max-width:1023px) {
    #navBar {
        .left {
            width: 2.5rem;
        }
    }
}

@media (max-width:767px) {
    #navBar {
        .right {
            .doc, .prof {
                display: none !important;
            }
            .ser {
                padding-right: 0;
            }
        }
    }
}

@media (max-width:479px) {
    #navBar {
        .left {
            .logo {
                img {
                    &.full {
                        display: none;
                    }
                    &.symbol {
                        display: block;
                    }
                }
            }
        }
    }
}
</style>