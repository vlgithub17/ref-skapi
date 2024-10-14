<template lang="pug">
h1 Testing Page

//freeze_schema
button(@click="currentService.setServiceOption({freeze_schema: !currentService.service.freeze_schema}).then(r => console.log(r))") freeze_schema


</template>

<script setup>
import { currentService } from '@/views/service/main';

console.log(currentService.service);
</script>

<style scoped>
button {
    color: black;
}
</style>