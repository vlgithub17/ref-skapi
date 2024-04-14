import { computed, reactive, watch } from "vue";
import { skapi } from "./admin";
import { callServiceList, serviceList, serviceIdList } from '@/views/service-list';
import Service from "./service";

export let user: { [key: string]: any } = reactive({});
export let loginState = computed(() => !!user?.user_id);

watch(() => user?.user_id, (u, ou) => {
    while(serviceIdList.length > 0) {
        serviceIdList.pop();
    }
    for (let k in serviceList) {
        delete serviceList[k];
    }
    callServiceList.value = true;

    if (u) {
        if (u !== ou) {        
            skapi.getUsers({
                searchFor: "user_id",
                value: u
            }).then(async uInfo => {
                if (uInfo.list[0].services) {
                    for(let k of uInfo.list[0].services.reverse()) {
                        serviceIdList.push(k);
                    }

                    for (let serviceId of serviceIdList) {
                        Service.load(serviceId).then(serviceObj => {
                            serviceList[serviceId] = serviceObj;
                            callServiceList.value = false;
                        })
                    }
                }
                else {
                    callServiceList.value = false;
                }
            });
        }
    }
    else {
        callServiceList.value = false;
    }
}, { immediate: true });

export let updateUser = () => {
    return skapi.getProfile().then(u => {
        for (let k in user) {
            delete user[k]
        }
        if (u) {
            for (let k in u) {
                user[k] = u[k]
            }
        }
    });
}