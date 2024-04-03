import { computed, reactive, watch } from "vue";
import { skapi } from "./admin";
import { callServiceList, serviceList, serviceIdList } from '@/views/service-list';
import Service from "./service";
export let user: { [key: string]: any } = reactive({});
export let loginState = computed(() => !!user?.user_id);

watch(() => user.user_id, (u, ou) => {
    if (u && u !== ou) {
        skapi.getUsers({
            searchFor: "user_id",
            value: u
        }).then(async uInfo => {
            Object.assign(serviceIdList, uInfo.list[0].services.reverse());

            for (let serviceId of serviceIdList) {
                Service.load(serviceId).then(serviceObj => {
                    serviceList[serviceId] = serviceObj;
                    callServiceList.value = false;
                })
            }
        });
    }
}, {immediate: true});