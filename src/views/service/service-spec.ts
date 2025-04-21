import { reactive, watch, ref, type Ref } from 'vue';
import { skapi } from '@/main';
import { currentServiceId, currentService } from '@/views/service/main';
import Service from '@/code/service';

let product_price_code = JSON.parse(import.meta.env.VITE_PRODUCT);

export const planSpec: {
	[plan: string]: {
		// price: {
		// 	monthly: number
		// 	yearly?: number
		// 	perpetual?: number
		// }
		price: number
		product_price?: { development: string; production: string }
		users: number | string
		storage: {
			database: number | string
			cloud: number | string
			host?: number | string
			email?: number | string
		}
		description: string[]
		description_warning?: string[]
	}
} = {
	'Trial': {
		// price: {
		// 	monthly: 0,
		// 	yearly: 0,
		// },
		price: 0,
		users: 10000, // 10K
		storage: {
			database: 8589934592, // 8GB -> Bytes
			cloud: 107374182400, // 100GB -> Bytes
		},
		description: [
			'10K User Accounts',
			'8GB Database Storage',
			'100GB File Storage',
			'Automated Emails',
		],
		description_warning: [
			'All user data is deleted every 14 days'
		]
	},
	'Standard': {
		// price: {
		// 	monthly: 19,
		// 	perpetual: 300,
		// },
		price: 19,
		product_price: product_price_code['standard'],
		users: 10000, // 10K
		storage: {
			database: 8589934592, // 8GB -> Bytes
			cloud: 107374182400, // 100GB -> Bytes
			host: 107374182400, // 100GB -> Bytes
			email: 1073741824, // 1GB -> Bytes
		},
		description: [
			'10K User Accounts',
			'User Invitation System',
			'Website Hosting',
			'8GB Database Storage',
			'100GB File Storage & Subdomain Hosting',
			'Automated Emails & Sending Bulk Emails',
			'1GB Email Storage'
		],
	},
	'Standard (Perpetual License)': {
		// price: {
		// 	monthly: 19,
		// },
		price: 300,
		product_price: product_price_code['standard-perpetual'],
		users: 10000, // 10K
		storage: {
			database: 8589934592, // 8GB -> Bytes
			cloud: 107374182400, // 100GB -> Bytes
			host: 107374182400, // 100GB -> Bytes
			email: 1073741824, // 1GB -> Bytes
		},
		description: ['Standard-Perpetual'],
	},
	'Premium': {
		// price: {
		// 	monthly: 89,
		// 	perpetual: 1399,
		// },
		price: 89,
		product_price: product_price_code['premium'],
		users: 100000, // 100K
		storage: {
			database: 107374182400, // 100GB -> Bytes
			cloud: 1099511627776, // 1TB -> Bytes
			host: 1099511627776, // 1TB -> Bytes
			email: 10737418240, // 10GB ->
		},
		description: [
			'Includes all Standard Plan features',
			'100K User Accounts',
			'100GB Database Storage',
			'1TB File Storage & Subdomain Hosting',
			'10GB Email Storage'
		],
	},
	'Premium (Perpetual License)': {
		// price: {
		// 	monthly: 89,
		// 	perpetual: 1399,
		// },
		price: 1399,
		product_price: product_price_code['premium-perpetual'],
		users: 100000, // 100K
		storage: {
			database: 107374182400, // 100GB -> Bytes
			cloud: 1099511627776, // 1TB -> Bytes
			host: 1099511627776, // 1TB -> Bytes
			email: 10737418240, // 10GB ->
		},
		description: [
			'Includes all Standard Plan features',
			'100K User Accounts',
			'100GB Database Storage',
			'1TB File Storage & Subdomain Hosting',
			'10GB Email Storage'
		],
	},
	'Unlimited': {
		// price: {
		// 	monthly: 89,
		// },
		price: 89,
		users: 'Unlimited',
		storage: {
			database: 'Unlimited',
			cloud: 'Unlimited',
			host: 'Unlimited',
			email: 'Unlimited',
		},
		description: ['Premium Plan'],
	}
}

export const currentServiceSpec: Ref<ServiceSpec | null> = ref(null);

export class ServiceSpec {
	service: Service
	plan: string
	storage: {
		cloud: number;
		database: number;
		email: number;
		host: number;
	} = reactive({
		cloud: 0,
		database: 0,
		email: 0,
		host: 0,
	});
	servicePlan: {
		price: {
			monthly: number
			yearly?: number
			perpetual?: number
		};
		product_price?: { development: string; production: string } | {}
		users: number | string
		storage: {
			database: number | string
			cloud: number | string
			host?: number | string
			email?: number | string
		}
	} = reactive({
		price: null,
		product_price: {},
		users: 0,
		storage: {
			database: 0,
			cloud: 0,
			host: 0,
			email: 0,
		},
	})
	dataSize: { [key: string]: string } = reactive({
		users: '',
		database: '',
		cloud: '',
		host: '',
		email: '',
	})
	dataPercent: { [key: string]: number | string } = reactive({
		users: 0,
		database: 0,
		cloud: 0,
		host: 0,
		email: 0,
	})

	constructor(service:Service) {
		this.service = service;
		this.plan = this.service.plan;

		this.servicePlan.price = planSpec[this.plan].price;
		this.servicePlan.product_price = planSpec[this.plan]?.product_price || {};
		this.servicePlan.users = this.plan === 'Unlimited' ? 'Unlimited' : this.getUserSize(planSpec[this.plan].users as number);
		this.servicePlan.storage.database = this.plan === 'Unlimited' ? 'Unlimited' : this.getDataSize(planSpec[this.plan].storage.database as number);
		this.servicePlan.storage.cloud = this.plan === 'Unlimited' ? 'Unlimited' : this.getDataSize(planSpec[this.plan].storage.cloud as number);
		this.servicePlan.storage.host = this.plan === 'Unlimited' ? 'Unlimited' : this.getDataSize(planSpec[this.plan].storage.host as number);
		this.servicePlan.storage.email = this.plan === 'Unlimited' ? 'Unlimited' : this.getDataSize(planSpec[this.plan].storage.email as number);

		this.getStorage().then(() => {
			this.updateDataSizeAndPercent();
		});
	}

	async getStorage(): Promise<{
		cloud: number; // cloud storage used
		database: number; // database size
		email: number; // email storage used
		host: number; // host storage used
	}> {
		let wait = [];
	
		if (this.service.service.subdomain) {
			let subdomain = this.service.service.subdomain;
			let pendingSubdomain = subdomain[0] === '+' || subdomain[0] === '*';
			if (pendingSubdomain) {
				subdomain = subdomain.slice(1);
			}
		
			// get host storage info
			wait.push(
				skapi.util
				.request(this.service.admin_private_endpoint + 'host-directory', { service: this.service.id, owner: this.service.owner, info: true, dir: subdomain }, { auth: true })
				.then((r: any) => {
					this.storage.host = r?.size || 0;
				})
			);
		}
	
		wait.push(
		  skapi.util.request(this.service.record_private_endpoint + 'storage-info', { service: this.service.id, owner: this.service.owner }, { auth: true }).then((r) => {
			this.storage.cloud = r.cloud;
			this.storage.database = r.database;
			this.storage.email = r.email;
		  })
		);
	
		await Promise.all(wait);
	
		return this.storage;
	}

	updateDataSizeAndPercent() {
		this.dataSize.users = this.getUserSize(this.service.service.users);
        this.dataSize.database = this.getDataSize(this.storage.database);
        this.dataSize.cloud = this.getDataSize(this.storage.cloud);
        this.dataSize.host = this.getDataSize(this.storage.host);
        this.dataSize.email = this.getDataSize(this.storage.email);

        this.dataPercent.users = this.getUserPercent();
        this.dataPercent.database = this.getDataPercent('database');
        this.dataPercent.cloud = this.getDataPercent('cloud');
        this.dataPercent.host = this.getDataPercent('host');
        this.dataPercent.email = this.getDataPercent('email');
    }

	getUserSize(data: number): string {
		let users = data;

        const units = ['', 'K', 'M', 'B', 'T'];
        let unitIndex = 0;

        while (users >= 1000 && unitIndex < units.length - 1) {
            users /= 1000;
            unitIndex++;
        }

        const formattedValue = users.toFixed(2).replace(/\.00$/, '');
        return `${formattedValue}${units[unitIndex]}`;
	}

	getUserPercent(): number | string {
		if (this.plan === 'Unlimited') {
			return 'Unlimited';
		}

		let users = this.service.service.users;
		let planUserSize = planSpec[this.plan].users as number;

		return parseFloat(((users / planUserSize) * 100).toFixed(2));
	}

	getDataSize(data: number): string {
        const resource = data;

        const kb = resource / 1024; // Bytes to KB
        const mb = kb / 1024; // KB to MB
        const gb = mb / 1024; // MB to GB
        const tb = gb / 1024; // GB to TB

        if (tb >= 1) {
            return `${tb.toFixed(2)}TB`;
        } else if (gb >= 1) {
            return `${gb.toFixed(2)}GB`;
        } else if (mb >= 1) {
            return `${mb.toFixed(2)}MB`;
        } else if (kb >= 1) {
            return `${kb.toFixed(2)}KB`;
        }
        return `${resource}bytes`;
	}

	getDataPercent(type: string): number | string {
		if (this.plan === 'Unlimited') {
            return 'Unlimited';
        }

		const resource = this.storage[type];
        const planLimit = planSpec[this.plan].storage[type];

        if(!planLimit) {
            return 'N/A';
        }

        // console.log(resource, planLimit);

		return Math.ceil((resource / planLimit) * 100);
	}
}

watch(currentServiceId, (nv) => {
	console.log('currentServiceId changed:', nv);
	console.log(currentService);

	if (nv && currentService.id === nv) {
		console.log('currentService updated:', nv, currentService);
		// 새로운 ServiceSpec 인스턴스 생성
		currentServiceSpec.value = new ServiceSpec(currentService);
	} else {
		currentServiceSpec.value = null;
	}

	console.log('currentServiceSpec updated:', currentServiceSpec.value);
}, { immediate: true });



// 'Trial': {
// 	price: 0,
// 	users: this.getUserSize(10000), // 10K
// 	storage: {
// 		database: this.getDataSize(4294967296), // 4GB -> Bytes
// 		cloud: this.getDataSize(53687091200), // 50GB -> Bytes
// 	},
// 	description: 'Trial Plan',
// },
// 'Standard': {
// 	price: 19,
// 	product_price: {
// 		development: 'price_1OUCt6HfHjKTnB39IwJasJEy',
// 		production: 'price_1OlIoyHfHjKTnB393KyKOkU5',
// 	},
// 	users: this.getUserSize(10000), // 10K
// 	storage: {
// 		database: this.getDataSize(8589934592), // 8GB -> Bytes
// 		cloud: this.getDataSize(107374182400), // 100GB -> Bytes
// 		host: this.getDataSize(107374182400), // 100GB -> Bytes
// 		email: this.getDataSize(1073741824), // 1GB -> Bytes
// 	},
// 	description: 'Standard Plan',
// },
// 'Free Standard': {
// 	price: 19,
// 	users: this.getUserSize(10000), // 10K
// 	storage: {
// 		database: this.getDataSize(8589934592), // 8GB -> Bytes
// 		cloud: this.getDataSize(107374182400), // 100GB -> Bytes
// 		host: this.getDataSize(107374182400), // 100GB -> Bytes
// 		email: this.getDataSize(1073741824), // 1GB -> Bytes
// 	},
// 	description: 'Standard Plan',
// },
// 'Premium': {
// 	price: 89,
// 	product_price: {
// 		development: 'price_1OeZSqHfHjKTnB395Ai9fY4m',
// 		production: 'price_1OlIqCHfHjKTnB39wcQVEmyj',
// 	},
// 	users: this.getUserSize(100000), // 100K
// 	storage: {
// 		database: this.getDataSize(107374182400), // 100GB -> Bytes
// 		cloud: this.getDataSize(1099511627776), // 1TB -> Bytes
// 		host: this.getDataSize(1099511627776), // 1TB -> Bytes
// 		email: this.getDataSize(10737418240), // 10GB ->
// 	},
// 	description: 'Premium Plan',
// },
// 'Unlimited': {
// 	price: 89,
// 	users: 'Unlimited',
// 	storage: {
// 		database: 'Unlimited',
// 		cloud: 'Unlimited',
// 		host: 'Unlimited',
// 		email: 'Unlimited',
// 	},
// 	description: 'Premium Plan',
// }