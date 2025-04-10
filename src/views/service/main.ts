import { ref } from 'vue';
import { serviceList } from '@/views/service-list';
import Service from '@/code/service';

export let currentService: Service = null;
export let currentServiceId = ref('');
export let serviceMainLoaded = ref(false);
export let serviceUsers: any = {};
export let serviceRecords: any = {};
export let serviceBins: any = {};
export let serviceAutoMails: any = {};
export let serviceBulkMails: any = {};

const serviceChangedEvent = new Event('serviceChanged');

export let setService = (id: string) => {
  currentService = serviceList[id];
  currentServiceId.value = id;
  serviceMainLoaded.value = true;
  window.dispatchEvent(serviceChangedEvent);
  console.log('setService')
};

export let serviceLoggers: any = {};