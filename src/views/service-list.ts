import type Service from "@/code/service";
import { ServiceSpec } from "@/views/service/service-spec";
import { reactive, ref } from "vue";

export let serviceIdList: string[] = [];
export let serviceList: { [key: string]: Service } = reactive({});
export let serviceSpecList: { [key: string]: ServiceSpec } = reactive({});
export let fetchingServiceList = ref(false);