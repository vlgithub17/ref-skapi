<template lang="pug">
#users
    section.infoBox
        //- form(@submit.prevent="searchUsers")
        //- .selectBar
        //-     .customSelect
        //-         select(:value="searchFor" @change="searchForChange")
        //-             option(value="timestamp") Date Created
        //-             option(value="user_id") User ID
        //-             option(value="email") Email
        //-             option(value="phone_number") Phone
        //-             option(value="address") Address
        //-             option(value="gender") Gender
        //-             option(value="name") Name
        //-             option(value="locale") Locale
        //-             option(value="birthdate") Birth Date
        //-         .material-symbols-outlined.mid.search.selectArrowDown arrow_drop_down
        //- .searchBar
        //-     .material-symbols-outlined.mid.search search
        //-     input#searchInput(v-if="searchFor === 'timestamp'" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchText")
            //- input#searchInput(
            //-     v-else-if="searchFor === 'user_id'" 
            //-     placeholder="Search Users" 
            //-     v-model="searchText"
            //-     @input="e=>{e.target.setCustomValidity('');}"
            //-     pattern="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
            //- )
            //- input#searchInput(v-else-if="searchFor === 'email'" placeholder="Search public email address" v-model="searchText")
            //- input#searchInput(v-else-if="searchFor === 'phone_number'" placeholder="eg+821234567890" v-model="searchText")
            //- input#searchInput(v-else-if="searchFor === 'address'" placeholder="Address" v-model="searchText")
            //- input#searchInput(v-else-if="searchFor === 'gender'" placeholder="Gender" v-model="searchText")
            //- input#searchInput(v-else-if="searchFor === 'name'" placeholder="Name" v-model="searchText")
            //- input#searchInput(v-else-if="searchFor === 'locale'" placeholder="2 digit country code e.g. KR" v-model="searchText")
            //- input#searchInput(v-else-if="searchFor === 'birthdate'" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" v-model="searchText")
            //- input(hidden type='submit')
            //- .material-symbols-outlined.delete(v-if="searchText" @click="e=>{searchText = ''; if(fetchParams.searchFor !== 'timestamp') { fetchParams = defaultFetchParams; refresh(); }}") close
            //- .material-symbols-outlined.modalIcon(v-if="(searchFor === 'timestamp' || searchFor === 'birthdate') && !searchText" @click.stop="showCalendar = !showCalendar") calendar_today
            //- .material-symbols-outlined.modalIcon(v-if="searchFor === 'locale' && !searchText" @click.stop="showLocale = !showLocale") arrow_drop_down

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