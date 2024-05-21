<template lang="pug">

.infoBox
    .infoTitle Hosting 

    hr

    p Please register a subdomain to host public files.
    form.register
        .subdomain
            input.big(pattern='^[a-z\\d](?:[a-z\\d\\-]{0,61}[a-z\\d])?$' :disabled="promiseRunning" placeholder="subdomain" required)
        button.final Register

</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { currentService } from '@/views/service/main';
import Code from '@/components/code.vue';
import { dateFormat } from '@/code/admin';
import Table from '@/components/table.vue';
import Modal from '@/components/modal.vue';
import Pager from '@/code/pager';
import { skapi } from '@/code/admin';

let subdomain = ref('');
let promiseRunning = ref(false);
</script>

<style lang="less" scoped>
form.register {
    display: flex;
    gap: 0.25rem;
    button.final {
        flex-shrink: 0;
    }
}
.subdomain {
    display: inline-block;
    position: relative;
    height: 44px;
    width: 400px;
    flex-shrink: 1;

    &::after {
        content: ".skapi.com";
        position: absolute;
        right: 10px;
        top: 12px;
        color: #999;
        font-size: 0.8rem;
        font-weight: 400;
        pointer-events: none;
        user-select: none;
        z-index: 1;
    }

    input {
        padding-right: 88px;
    }
}
</style>