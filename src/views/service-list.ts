import Service from "@/code/service";
import { reactive, ref } from "vue";

export let serviceIdList: string[] = [];
export let serviceList: { [key: string]: Service } = reactive({});
export let callServiceList = ref(false);