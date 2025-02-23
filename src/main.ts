import './assets/less/main.less';
import './assets/less/uistruct.less';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { ref } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Skapi } from 'skapi-js';
import { userLoginCallback } from './code/user';

let autoLogin = window.localStorage.getItem('remember') === 'true';

const SERVICE_ID = import.meta.env.VITE_ADMIN;
const ETC_CONFIG = JSON.parse(import.meta.env.VITE_ETC);

export const connected = ref(false);

// build date
console.log('deploy:' + import.meta.env.VITE_DATE);

const app = createApp(App);

// Get the latest version number of skapi-js from npm
let verAPI = 'https://registry.npmjs.org/skapi-js/latest';
export const npmVersion = ref('...');

fetch(verAPI)
  .then((res) => res.json())
  .then((data) => {
    npmVersion.value = data.version;
  });

export const skapi = new Skapi(
  SERVICE_ID,
  'skapi',
  {
    autoLogin,
    eventListener: {
      onLogin: (user) => {
        userLoginCallback(user);

        if (connected.value) {
          return;
        }

        connected.value = true;

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
      }
    }
  },
  ETC_CONFIG
);

skapi.version();
