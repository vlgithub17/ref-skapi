import { computed, reactive } from "vue";
import { skapi } from "./admin";

export let user: { [key: string]: any } = reactive({});
export let loginState = computed(() => !!user?.user_id);