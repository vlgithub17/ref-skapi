import { ref } from "vue";
import Service from "@/code/service";
import { serviceList } from "@/views/service-list";

export let currentService: Service = null;
export let serviceMainLoaded = ref(false);
export let serviceUsers = ref([]);

export let setService = (id: string) => {
    console.log('setService');
    currentService = serviceList[id];
    serviceMainLoaded.value = true;
}