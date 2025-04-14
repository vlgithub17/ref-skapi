import { reactive, ref } from "vue";
import { skapi } from "@/main";
import { ServiceSpec } from "@/views/service/service-spec";
import { fetchingServiceList, serviceList, serviceIdList, serviceSpecList } from '@/views/service-list';
import Service, { type PublicUser } from "./service";

export let user: { [key: string]: any } = reactive({});

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

let previousUserId = '';

export let userLoginCallback = (userIncoming: any) => {
    for (let k in user) {
        delete user[k]
    }
    if (userIncoming) {
        for (let k in userIncoming) {
            user[k] = userIncoming[k];
        }

        if (userIncoming.user_id === previousUserId) {
            // is attribute change
        }
        else {
            previousUserId = userIncoming.user_id;

            getStripeCustomer(userIncoming);

            if (emailSubscribed.value === null) {
                skapi.getNewsletterSubscription({
                    group: 'authorized'
                }).then(subs => {
                    emailSubscribed.value = !!subs.length
                });
            }

            // get service list
            while (serviceIdList.length > 0) {
                serviceIdList.pop();
            }
            for (let k in serviceList) {
                delete serviceList[k];
            }
            for (let k in serviceSpecList) {
                delete serviceSpecList[k];
            }

            fetchingServiceList.value = true;

            skapi.getUsers({
                searchFor: "user_id",
                value: userIncoming.user_id
            }).then(async uInfo => {
                let fetchedList = (uInfo.list[0] as PublicUser)?.services;
                if (Array.isArray(fetchedList)) {
                    for (let k of fetchedList.reverse()) {
                        // reverse to show the latest service first
                        serviceIdList.push(k);
                    }

                    for (let serviceId of serviceIdList) {
                        Service.load(serviceId).then(serviceObj => {
                            if (serviceObj) {
                                // can be null if service is deleted
                                serviceList[serviceId] = serviceObj;
                                serviceSpecList[serviceId] = new ServiceSpec(serviceObj);
                                fetchingServiceList.value = false; // when one of the service is loaded, set fetchingServiceList to false
                            }
                        })
                    }
                }

                else {
                    fetchingServiceList.value = false;
                }
            });
        }
    }
    else {
        emailSubscribed.value === null;

        while (serviceIdList.length > 0) {
            serviceIdList.pop();
        }
        for (let k in serviceList) {
            delete serviceList[k];
        }
        for (let k in serviceSpecList) {
            delete serviceSpecList[k];
        }
        fetchingServiceList.value = false;
    }
}

let getStripeCustomer = async (user: any) => {
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