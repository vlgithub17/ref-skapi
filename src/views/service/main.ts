import type { ServiceObj } from "@/code/service";
import { reactive } from "vue";

export let currentService: ServiceObj | {[key:string]:any} = reactive({});