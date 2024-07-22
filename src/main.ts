import './assets/less/main.less'
import './assets/less/uistruct.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
console.log('deploy:' + import.meta.env.VITE_DATE)
const app = createApp(App)
app.use(router)
app.mount('#app')