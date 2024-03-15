<template lang="pug">
dialog(ref='dialog' style="width:478px")
    .header 
        h4 Create User
    .content 
        br
        form(@submit.prevent="createUser")
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
                label.label Password 
                input(
                    @input="e => password = e.target.value"
                    placeholder="User's Password"
                    type='Password'
                    minlength="6"
                    required
                )

            br

            .error(v-if="error")
                .material-symbols-outlined.mid error
                span {{ error }}

            br

            .buttonWrap
                button.noLine(@click="emits('close')") Cancel 
                button.final(@click="emits('close')") Create User
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