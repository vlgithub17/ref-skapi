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

    let getMoreVert = document.getElementsByClassName('moreVert');
    for (let i = 0; i < getMoreVert.length; i++) {
        getMoreVert[i].style.display = 'none'
    }
})

let showDropDown = (e) => {
    if (e.currentTarget.lastChild.style.display === 'none') {
        e.currentTarget.lastChild.style.display = 'block';
    } else {
        e.currentTarget.lastChild.style.display = 'none'
    }
}

app.use(router)

app.mount('#app')

export { showDropDown }
