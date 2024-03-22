import './assets/less/main.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { skapi } from './code/admin'

console.log(skapi)

const app = createApp(App)

app.use(router)

app.mount('#app')
