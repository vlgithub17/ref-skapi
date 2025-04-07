// 서비스 plan 별 가격, 용량 등 spec을 정의하는 파일
let spec: {
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
		description: 'Trial Plan'
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
		description: 'Standard Plan'
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
		description: 'Standard Plan'
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
			email: 10737418240, // 10GB -> Bytes
		},
		description: 'Premium Plan'
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
		description: 'Premium Plan'
	}
}