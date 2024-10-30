<template lang="pug">
h1 Testing Page

//freeze_database
button(@click="currentService.setServiceOption({freeze_database: !currentService.service.freeze_database}).then(r => console.log(r))") freeze_database


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