<template lang="pug">
#users
    section.infoBox

    br

    section.infoBox
        .tableHeader 
            .actions
                .material-symbols-outlined.clickable.refresh cached
                .material-symbols-outlined.clickable.fill.create(@click="inviteDialog.showModal();") mail
                .material-symbols-outlined.clickable.fill.create(@click="!account.email_verified ? false : createUserShow=true") person_add
                .menu(@click.stop="showUserSetting = !showUserSetting")
                    .material-symbols-outlined.mid.clickable more_vert
                        #moreVert(v-if="showUserSetting" @click.stop style="--moreVert-left: 0")
                            .inner
                                .more(@click="()=>{stateText='Block'; showBlockUser=true; showUserSetting=false;}")
                                    .material-symbols-outlined.fill account_circle_off
                                    span Block
                                .more(@click="()=>{stateText='Unblock'; showUnblockUser=true; showUserSetting=false;}")
                                    .material-symbols-outlined.fill account_circle
                                    span Unblock
                                .more(@click="()=>{stateText='Delete'; showDeleteUser = true; showUserSetting = false;}")
                                    .material-symbols-outlined.fill delete
                                    span Delete
            .pagenator
                .material-symbols-outlined.clickable.prevPage(style="font-size:1rem") arrow_back_ios
                .material-symbols-outlined.clickable.nextPage(style="font-size:1rem") arrow_forward_ios

Invite(ref="inviteDialog" @close="inviteDialog.close();" @load="(e)=>inviteDialog = e")
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Invite from '@/views/service/users/dialog/invite.vue'

let inviteDialog = ref(null);
let showUserSetting = ref(false);
onMounted(() => {
//    console.log(inviteDialog.value)
})
</script>

<style lang="less" scoped>
.tableHeader {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    .actions {
        .refresh {
            margin-right: 0.5rem;
        }
        .create {
            margin-right: 0.5rem;
            color: var(--main-color);
        }
        .menu {
            position: relative;
            display: inline-block;
        }
    }
    .pagenator {
        font-size: 1rem !important;
    }
}
</style>