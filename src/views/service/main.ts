import { ref, watch } from "vue";
import { skapi } from '@/code/admin';
import { serviceList } from "@/views/service-list";
import Service from "@/code/service";
import Pager from "@/code/pager";

export let currentService: Service = null;
export let serviceMainLoaded = ref(false);
// export let callUserList = ref(false);
// export let userPager = await Pager.init({
//     id: 'user_id',
//     sortBy: 'timestamp',
//     order: 'desc',
//     resultsPerPage: 10
// })
export let serviceUsers = {};
export let setService = (id: string) => {
    currentService = serviceList[id];
    serviceMainLoaded.value = true;
    // resetUserList();
}

// let resetUserList = () => {
//     if (callUserList.value) {
//         return;
//     }

//     callUserList.value = true;

//     skapi.getUsers({
//         service: currentService.id,
//         searchFor: 'timestamp',
//         condition: '<=',
//         value: new Date().getTime()
//     }, { limit: 50 }).then(u => {
//         // console.log(u)
//         console.log('reset')
//         serviceUsers.insertItems(u.list).then((r) => {
//             serviceUsers.getPage(1);
//             callUserList.value = false;
//         })
//     })
// }