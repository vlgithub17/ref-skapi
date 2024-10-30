import './assets/less/main.less';
import './assets/less/uistruct.less';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { ref } from 'vue';
import { skapi } from '@/code/admin';
import AOS from 'aos';
import 'aos/dist/aos.css';

console.log('deploy:' + import.meta.env.VITE_DATE);
skapi.version();
const app = createApp(App);

// Get the latest version number of skapi-js from npm
let verAPI = 'https://registry.npmjs.org/skapi-js/latest';
export const npmVersion = ref('...');

fetch(verAPI)
  .then((res) => res.json())
  .then((data) => {
    npmVersion.value = data.version;
  });

app.use(router);
app.mount('#app');

// AOS 초기화
app.mixin({
  mounted() {
    AOS.init({
      offset: 50,
    }); // AOS 초기화
  },
});
