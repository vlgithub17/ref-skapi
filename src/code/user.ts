import { reactive, watch, ref } from "vue";
import { skapi } from "@/main";
import { callServiceList, serviceList, serviceIdList } from '@/views/service-list';
import Service from "./service";

export let user: { [key: string]: any } = reactive({});
// export let loginState = computed(() => !!user?.user_id);

export let customer: Promise<Customer> = null;
export let emailSubscribed = ref(null);
type Customer = {
    "id": string,
    "object": "customer",
    "address": {
        "city": string,
        "country": string,
        "line1": string,
        "line2": string,
        "postal_code": string,
        "state": string
    },
    "balance": number,
    "created": number,
    "currency": string,
    "default_source": any,
    "delinquent": boolean,
    "description": any,
    "discount": any,
    "email": string,
    "invoice_prefix": string,
    "invoice_settings": {
        "custom_fields": any,
        "default_payment_method": any,
        "footer": any,
        "rendering_options": any
    },
    "livemode": boolean,
    "metadata": {
        [key: string]: any
    },
    "name": string,
    "next_invoice_sequence": number,
    "phone": any,
    "preferred_locales": any[],
    "shipping": any,
    "tax_exempt": string,
    "test_clock": any
}

watch(() => user?.user_id, (u, ou) => {
    while (serviceIdList.length > 0) {
        serviceIdList.pop();
    }
    for (let k in serviceList) {
        delete serviceList[k];
    }
    callServiceList.value = true;

    if (u) {
        if (u !== ou) {
            emailSubscribed.value = null;
            skapi.getNewsletterSubscription({
                group: 'authorized'
            }).then(subs => {
                emailSubscribed.value = !!subs.length
            });
            skapi.getUsers({
                searchFor: "user_id",
                value: u
            }).then(async uInfo => {
                if (uInfo.list[0].services) {
                    for (let k of uInfo.list[0].services.reverse()) {
                        serviceIdList.push(k);
                    }

                    for (let serviceId of serviceIdList) {
                        Service.load(serviceId).then(serviceObj => {
                            if (serviceObj) {
                                // can be null if service is deleted
                                serviceList[serviceId] = serviceObj;
                                callServiceList.value = false;
                            }
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

export let updateUser = (customerCheck = false) => {
    return skapi.getProfile().then((u: any) => {
        for (let k in user) {
            delete user[k]
        }
        if (u) {
            for (let k in u) {
                user[k] = u[k];
            }

            if (emailSubscribed.value === null) {
                skapi.getNewsletterSubscription({
                    group: 'authorized'
                }).then(subs => {
                    emailSubscribed.value = !!subs.length
                });
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
                    skapi.updateProfile({
                        misc: JSON.stringify({ stripe_customer_id: (await customer).id })
                    });
                }
            };
            if (customerCheck) {
                getCustomer();
            }
        }
    });
}