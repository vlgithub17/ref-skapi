let showDropDown = (e) => {
    let getCustomSelect = document.getElementsByClassName('customSelect');
    let currentTarget = e.currentTarget;
    for (let i = 0; i < getCustomSelect.length; i++) {
        if(currentTarget.isEqualNode(getCustomSelect[i])) {
            continue;
        }

        let getMoreVert = getCustomSelect[i].lastChild;
        getMoreVert.style.display = 'none'
    }
    
    let getMoreVert = currentTarget.lastChild;
    if (getMoreVert.style.display === 'none') {
        getMoreVert.style.display = 'block';
    } else {
        getMoreVert.style.display = 'none'
    }
}

let hideMoreVert = () => {
    document.addEventListener('click', (e) => {
        let getMoreVert = document.getElementsByClassName('moreVert');
        for (let i = 0; i < getMoreVert.length; i++) {
            getMoreVert[i].style.display = 'none'
        }
    })
}

let hideDialog = () => {
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
}

export { showDropDown, hideMoreVert, hideDialog }