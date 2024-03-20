import './assets/main.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

document.addEventListener('click', (e) => {
    let getDialog = document.getElementsByTagName('dialog');
    for (let i = 0; i < getDialog.length; i++) {
        getDialog[i].addEventListener('click', (e)=>{
            if ((e.target as HTMLElement).nodeName === 'DIALOG') {
                getDialog[i].close();
              }
        });
    }

    let getMoreVert = document.getElementsByClassName('moreVert');
    for (let i = 0; i < getMoreVert.length; i++) {
        (getMoreVert[i] as HTMLDivElement).style.display = 'none'
    }
})

let showDropDown = (e: Event) => {
    let getCustomSelect = document.getElementsByClassName('customSelect');
    let currentTarget = e.currentTarget as HTMLDivElement;
    for (let i = 0; i < getCustomSelect.length; i++) {
        if(currentTarget.isEqualNode(getCustomSelect[i])) {
            continue;
        }

        let getMoreVert = getCustomSelect[i].lastChild;
        (getMoreVert as HTMLDivElement).style.display = 'none'
    }
    
    let getMoreVert = currentTarget.lastChild as HTMLDivElement;
    if (getMoreVert.style.display === 'none') {
        getMoreVert.style.display = 'block';
    } else {
        getMoreVert.style.display = 'none'
    }
}

app.use(router)

app.mount('#app')

export { showDropDown }
