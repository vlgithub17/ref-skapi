<template lang="pug">
#users
    .infoBox
        button.final(@click="inviteDialog.showModal();") Invite User

Invite(ref="inviteDialog" @close="inviteDialog.close();" @load="(e)=>inviteDialog = e")
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Invite from '@/views/service/users/dialog/invite.vue'

let inviteDialog = ref(null);
onMounted(() => {
   console.log(inviteDialog.value)
})
</script>

<style lang="less" scoped>

</style>