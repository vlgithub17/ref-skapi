<template lang="pug">
dialog.cardBox(ref='dialog')
    .header 
        h4 Invite User
    .content 
        p Invitation Email includes a temporary password and the acception link. User must accept the invitation within 7 days.
        p For more information, refer:&nbsp;
            a(href="https://docs.skapi.com/email/email-templates.html" target="_blank" style='white-space: nowrap') E-Mail Templates

        input(hidden name="service" :value="currentService.service")

        .input
            label.label User's Email 
            input(
                type="email"
                @input="e => email = e.target.value"
                title="Please enter a valid email address." 
                placeholder="anonymous@anonymous.com"
                required
            )
        br

        .input
            label.label Name 
            input(
                @input="e => name = e.target.value"
                placeholder="User's Name" 
                required
            )

        br

        .input
            label.label Redirect URL 
            input(
                @input="e => redirect = e.target.value"
                placeholder="URL to redirect when accepted. (optional)"
                type='url'
            )

        .error(v-if="error")
            .material-symbols-outlined.mid error
            span {{ error }}

        button.noLine(@click="emits('close')") cancel
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { currentService } from '@/data.js';

let emits = defineEmits(['close', 'load']);
let error = ref('');
let promiseRunning = ref(false);
let email = '';
let name = '';
let redirect = '';
let dialog:HTMLDialogElement | null=null;
onMounted(()=>{
    emits('load', dialog);
})
</script>

<style lang="less">

</style>