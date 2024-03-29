import type { ServiceObj } from "@/code/service";
import { serviceList } from "@/code/service"

import { reactive, ref } from "vue";

export let currentService: ServiceObj | { [key: string]: any } = null;
export let serviceLoaded = ref(false);

export let setService = (id:string) => {
    if(!serviceList?.[id]) {
        throw 'No Service'
    }
    currentService = reactive(serviceList[id])
    serviceLoaded.value = true;
}