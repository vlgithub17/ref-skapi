import { ref } from "vue";
import { serviceList } from "@/views/service-list";
import Service from "@/code/service";
import Pager from "@/code/pager";

export let currentService: Service = null;
export let serviceMainLoaded = ref(false);
export let serviceUsers = await Pager.init({
    id: 'user_id',
    sortBy: 'timestamp',
    order: 'desc',
    resultsPerPage: 10
})

export let setService = (id: string) => {
    currentService = serviceList[id];
    serviceMainLoaded.value = true;
}