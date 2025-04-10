import { reactive, watch, ref, type Ref } from 'vue';
import { skapi } from '@/main';
import { currentServiceId, currentService } from '@/views/service/main';
import Service from '@/code/service';

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
		cloud: null,
		database: null,
		email: null,
		host: null,
	});
	servicePlans: {
		[plan: string]: {
			price: number | string
			product_price?: { development: string; production: string }
			users: number | string
			storage: {
				database: number | string
				cloud: number | string
				host?: number | string
				email?: number | string
			}
			description: string
		}
	} = {
		'Trial': {
			price: 0,
			users: this.getUserSize(10000), // 10K
			storage: {
				database: this.getDataSize(4294967296), // 4GB -> Bytes
				cloud: this.getDataSize(53687091200), // 50GB -> Bytes
			},
			description: 'Trial Plan',
		},
		'Standard': {
			price: 19,
			product_price: {
				development: 'price_1OUCt6HfHjKTnB39IwJasJEy',
				production: 'price_1OlIoyHfHjKTnB393KyKOkU5',
			},
			users: this.getUserSize(10000), // 10K
			storage: {
				database: this.getDataSize(8589934592), // 8GB -> Bytes
				cloud: this.getDataSize(107374182400), // 100GB -> Bytes
				host: this.getDataSize(107374182400), // 100GB -> Bytes
				email: this.getDataSize(1073741824), // 1GB -> Bytes
			},
			description: 'Standard Plan',
		},
		'Free Standard': {
			price: 19,
			users: this.getUserSize(10000), // 10K
			storage: {
				database: this.getDataSize(8589934592), // 8GB -> Bytes
				cloud: this.getDataSize(107374182400), // 100GB -> Bytes
				host: this.getDataSize(107374182400), // 100GB -> Bytes
				email: this.getDataSize(1073741824), // 1GB -> Bytes
			},
			description: 'Standard Plan',
		},
		'Premium': {
			price: 89,
			product_price: {
				development: 'price_1OeZSqHfHjKTnB395Ai9fY4m',
				production: 'price_1OlIqCHfHjKTnB39wcQVEmyj',
			},
			users: this.getUserSize(100000), // 100K
			storage: {
				database: this.getDataSize(107374182400), // 100GB -> Bytes
				cloud: this.getDataSize(1099511627776), // 1TB -> Bytes
				host: this.getDataSize(1099511627776), // 1TB -> Bytes
				email: this.getDataSize(10737418240), // 10GB ->
			},
			description: 'Premium Plan',
		},
		'Unlimited': {
			price: 89,
			users: 'Unlimited',
			storage: {
				database: 'Unlimited',
				cloud: 'Unlimited',
				host: 'Unlimited',
				email: 'Unlimited',
			},
			description: 'Premium Plan',
		}
	}
	dataSize: { [key: string]: string } = reactive({
		users: '',
		database: '',
		cloud: '',
		host: '',
		email: '',
	})
	dataPercent: { [key: string]: number } = reactive({
		users: 0,
		database: 0,
		cloud: 0,
		host: 0,
		email: 0,
	})

	constructor(service:Service) {
		this.service = service;
		this.plan = this.service.plan;

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

	getUserPercent(): number {
		if (this.plan === 'Unlimited') {
			return 0;
		}

		let users = this.service.service.users;
		let planUserSize = this.servicePlans[this.plan].users as number;

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

	getDataPercent(type: string): number {
		if (this.plan === 'Unlimited') {
            return 0;
        }

		const resource = this.storage[type];
        const planLimit = this.servicePlans[this.plan].storage[type];

		return Math.ceil((resource / planLimit) * 100);
	}
}

watch(currentServiceId, (nv) => {
	console.log('currentServiceId changed:', nv);

	if (nv && currentService.id === nv) {
		console.log('currentService updated:', nv, currentService);
		// 새로운 ServiceSpec 인스턴스 생성
		currentServiceSpec.value = new ServiceSpec(currentService);
	} else {
		currentServiceSpec.value = null;
	}

	console.log('currentServiceSpec updated:', currentServiceSpec.value);
}, { immediate: true });