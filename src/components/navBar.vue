<template lang="pug">
header#navBar 
    .left 
        router-link(to="/") logo
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
            li
                router-link.ser(to="/my-services") My Services
            li
                .prof F
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>

<style lang="less" scoped>
#navBar {
    position: relative;
    height: 60px;
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
            }
        }

        a {
            color: #fff;

            img {
                filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(355deg) brightness(107%) contrast(106%) !important;
            }
        }
    }
    .left {
        width: 11rem;
        padding-left: 20px;
    }
    .right {
        display: flex;
        align-items: center;
        padding: 0 20px;

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
</style>