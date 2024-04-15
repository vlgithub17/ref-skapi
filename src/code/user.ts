import { computed, reactive, watch } from "vue";
import { skapi } from "./admin";
import { callServiceList, serviceList, serviceIdList } from '@/views/service-list';
import Service from "./service";

export let user: { [key: string]: any } = reactive({});
export let loginState = computed(() => !!user?.user_id);

export let customer = null;

watch(() => user?.user_id, (u, ou) => {
    while(serviceIdList.length > 0) {
        serviceIdList.pop();
    }
    for (let k in serviceList) {
        delete serviceList[k];
    }
    callServiceList.value = true;

    if (u) {
        if (u !== ou) {        
            skapi.getUsers({
                searchFor: "user_id",
                value: u
            }).then(async uInfo => {
                if (uInfo.list[0].services) {
                    for(let k of uInfo.list[0].services.reverse()) {
                        serviceIdList.push(k);
                    }

                    for (let serviceId of serviceIdList) {
                        Service.load(serviceId).then(serviceObj => {
                            serviceList[serviceId] = serviceObj;
                            callServiceList.value = false;
                        })
                    }
                }
                else {
                    callServiceList.value = false;
                }
            });
        }
    }
    else {
        callServiceList.value = false;
    }
}, { immediate: true });

export let updateUser = () => {
    return skapi.getProfile().then(u => {
        for (let k in user) {
            delete user[k]
        }
        if (u) {
            for (let k in u) {
                user[k] = u[k]
            }

            let getCustomer = async () => {
                let misc = JSON.parse(user?.misc || null);
            
                if (misc?.stripe_customer_id) {
                    // stripe_customer_id exists
            
                    let customer_id = misc.stripe_customer_id;
            
                    // get customer info, and update customer.value
                    customer = skapi.clientSecretRequest({
                        clientSecretName: 'stripe_test',
                        url: `https://api.stripe.com/v1/customers/${customer_id}`,
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer $CLIENT_SECRET'
                        }
                    });
                }
            
                else {
                    // stripe_customer_id does not exist
            
                    // create customer, save customer id in user misc
                    customer = skapi.clientSecretRequest({
                        clientSecretName: 'stripe_test',
                        url: 'https://api.stripe.com/v1/customers',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: 'Bearer $CLIENT_SECRET'
                        },
                        data: {
                            name: user.name || user.email,
                            email: user.email
                        }
                    })
            
                    // update customer id in user misc
                    user = await skapi.updateProfile({
                        misc: JSON.stringify({ stripe_customer_id: (await customer).id })
                    });
                }
            };
            getCustomer();
        }
    });
}