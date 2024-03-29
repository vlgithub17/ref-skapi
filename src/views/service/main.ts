import type { ServiceObj } from "@/code/service";
import { serviceList } from "@/code/service"
import Service from "@/code/service"
import { reactive, ref } from "vue";

export let currentService: Service = null;
export let serviceLoaded = ref(false);

export let setService = (id:string) => {
    if(!serviceList?.[id]) {
        console.log(serviceList[id])
        throw 'No Service'
    }
    currentService = reactive(serviceList[id]) as Service;
    serviceLoaded.value = true;
}