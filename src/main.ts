import './assets/main.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

document.addEventListener('click', (e) => {
    let getDialog = document.getElementsByTagName('dialog');
    for (let i = 0; i < getDialog.length; i++) {
        getDialog[i].addEventListener('click', (e)=>{
            if (e.target.nodeName === 'DIALOG') {
                getDialog[i].close();
              }
        });
    }
})

app.use(router)

app.mount('#app')
