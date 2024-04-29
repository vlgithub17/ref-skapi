import './assets/less/main.less'
import './assets/less/uistruct.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')