// 서비스 plan 별 가격, 용량 등 spec을 정의하는 파일
// let spec: {
// 	[plan: string]: {
// 		price: number | string
// 		product_price?: { development: string; production: string }
// 		users: number | string
// 		storage: {
// 			database: number | string
// 			file: number | string
// 			subdomain?: number | string
// 			email?: number | string
// 		}
// 		description: string
// 	}
// } = {
// 	'Trial': {
// 		price: 0,
// 		users: 10000, // 10K
// 		storage: {
// 			database: 4294967296, // 4GB -> Bytes
// 			file: 53687091200, // 50GB -> Bytes
// 		},
// 		description: 'Trial Plan'
// 	},
// 	'Standard': {
// 		price: 19,
// 		product_price: {
// 			development: 'price_1OUCt6HfHjKTnB39IwJasJEy',
// 			production: 'price_1OlIoyHfHjKTnB393KyKOkU5',
// 		},
// 		users: 10000, // 10K
// 		storage: {
// 			database: 8589934592, // 8GB -> Bytes
// 			file: 107374182400, // 100GB -> Bytes
// 			subdomain: 107374182400, // 100GB -> Bytes
// 			email: 1073741824, // 1GB -> Bytes
// 		},
// 		description: 'Standard Plan'
// 	},
// 	'Free Standard': {
// 		price: 19,
// 		users: 10000, // 10K
// 		storage: {
// 			database: 8589934592, // 8GB -> Bytes
// 			file: 107374182400, // 100GB -> Bytes
// 			subdomain: 107374182400, // 100GB -> Bytes
// 			email: 1073741824, // 1GB -> Bytes
// 		},
// 		description: 'Standard Plan'
// 	},
// 	'Premium': {
// 		price: 89,
// 		product_price: {
// 			development: 'price_1OeZSqHfHjKTnB395Ai9fY4m',
// 			production: 'price_1OlIqCHfHjKTnB39wcQVEmyj',
// 		},
// 		users: 100000, // 100K
// 		storage: {
// 			database: 107374182400, // 100GB -> Bytes
// 			file: 1099511627776, // 1TB -> Bytes
// 			subdomain: 1099511627776, // 1TB -> Bytes
// 			email: 10737418240, // 10GB -> Bytes
// 		},
// 		description: 'Premium Plan'
// 	},
// 	'Unlimited': {
// 		price: 89,
// 		users: 'Unlimited',
// 		storage: {
// 			database: 'Unlimited',
// 			file: 'Unlimited',
// 			subdomain: 'Unlimited',
// 			email: 'Unlimited',
// 		},
// 		description: 'Premium Plan'
// 	}
// }

import { type Reactive } from 'vue';
import { skapi } from '@/main';
import Service, { ServiceObj, SubscriptionObj } from '@/code/service';

// type Service = {
// 	id: string;
// 	owner: string;
// 	admin_private_endpoint: string;
// 	record_private_endpoint: string;
// 	admin_public_endpoint: string;
// 	service: ServiceObj;
// 	dateCreated: string;
// 	plan: string;
// 	planCode: { [key: number]: string }
// 	subscription: SubscriptionObj;
// 	storageInfo: Reactive<{
// 		cloud: number;
// 		database: number;
// 		email: number;
// 		host: number;
// 	}>

// 	subscriptionFetched: boolean;
// 	_orgPlan: string;
// 	_subsPromise: Promise<SubscriptionObj>
// 	newsletterSender: Promise<string>[]
// 	reserved_key: string;
// }

export class ServiceSpec {
	service: Service
	plan: string
	storage: Reactive<{
		cloud: number;
		database: number;
		email: number;
		host: number;
	}>
	servicePlans: {
		[plan: string]: {
			price: number | string
			product_price?: { development: string; production: string }
			users: number | string
			storage: {
				database: number | string
				file: number | string
				subdomain?: number | string
				email?: number | string
			}
			description: string
		}
	} = {
		'Trial': {
			price: 0,
			users: 10000, // 10K
			storage: {
				database: 4294967296, // 4GB -> Bytes
				file: 53687091200, // 50GB -> Bytes
			},
			description: 'Trial Plan',
		},
		'Standard': {
			price: 19,
			product_price: {
				development: 'price_1OUCt6HfHjKTnB39IwJasJEy',
				production: 'price_1OlIoyHfHjKTnB393KyKOkU5',
			},
			users: 10000, // 10K
			storage: {
				database: 8589934592, // 8GB -> Bytes
				file: 107374182400, // 100GB -> Bytes
				subdomain: 107374182400, // 100GB -> Bytes
				email: 1073741824, // 1GB -> Bytes
			},
			description: 'Standard Plan',
		},
		'Free Standard': {
			price: 19,
			users: 10000, // 10K
			storage: {
				database: 8589934592, // 8GB -> Bytes
				file: 107374182400, // 100GB -> Bytes
				subdomain: 107374182400, // 100GB -> Bytes
				email: 1073741824, // 1GB -> Bytes
			},
			description: 'Standard Plan',
		},
		'Premium': {
			price: 89,
			product_price: {
				development: 'price_1OeZSqHfHjKTnB395Ai9fY4m',
				production: 'price_1OlIqCHfHjKTnB39wcQVEmyj',
			},
			users: 100000, // 100K
			storage: {
				database: 107374182400, // 100GB -> Bytes
				file: 1099511627776, // 1TB -> Bytes
				subdomain: 1099511627776, // 1TB -> Bytes
				email: 10737418240, // 10GB ->
			},
			description: 'Premium Plan',
		},
		'Unlimited': {
			price: 89,
			users: 'Unlimited',
			storage: {
				database: 'Unlimited',
				file: 'Unlimited',
				subdomain: 'Unlimited',
				email: 'Unlimited',
			},
			description: 'Premium Plan',
		}
	}
	dataSize: { [key: string]: string } = {
		users: '0K',
		database: '0GB',
		file: '0GB',
		subdomain: '0GB',
		email: '0GB',
	}
	dataPercent: { [key: string]: number } = {
		users: 0,
		database: 0,
		file: 0,
		subdomain: 0,
		email: 0,
	}

	constructor(service:Service) {
		this.service = service;
		this.plan = this.service.plan;
		// this.storage = this.service.storageInfo;
		// this.dataSize = {
		// 	users: this.getUserSize(),
		// 	database: this.getDataSize('database'),
		// 	file: this.getDataSize('cloud'),
		// 	subdomain: this.getDataSize('host'),
		// 	email: this.getDataSize('email'),
		// }
		// this.dataPercent = {
		// 	users: this.getUserSize(true),
		// 	database: this.getDataSize('database', true),
		// 	file: this.getDataSize('cloud', true),
		// 	subdomain: this.getDataSize('host', true),
		// 	email: this.getDataSize('email', true),
		// }

		this.getStorage();
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

	getUserSize(percent: boolean = false): string | number {
		if (this.plan === 'Unlimited' && percent) {
            return 0;
        }

		let users = this.service.service.users;
		let planUserSize = this.servicePlans[this.plan].users as number;

		if (percent) {
            return ((users / planUserSize) * 100).toFixed(2);
        }

		// Convert to human-readable format
        const units = ['', 'K', 'M', 'B', 'T'];
        let unitIndex = 0;
        let value = users;

        while (value >= 1000 && unitIndex < units.length - 1) {
            value /= 1000;
            unitIndex++;
        }

        const formattedValue = value.toFixed(2).replace(/\.00$/, '');
        return `${formattedValue}${units[unitIndex]}`;
	}

	getDataSize(type: string, percent: boolean = false): string | number {
		if (this.plan === 'Unlimited' && percent) {
            return 0;
        }

        const resource = this.service?.storageInfo[type];
        const planLimit = this.servicePlans[this.plan].storage[type];

		console.log(this.storage);
		// console.log({resource});

        if (percent) {
            return Math.ceil((resource / planLimit) * 100);
        }

        // Convert bytes to KB, MB, GB, or TB
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
        return `${resource}Bytes`;
	}
}