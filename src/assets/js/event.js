let showDropDown = (e) => {
    let getCustomSelect = document.getElementsByClassName('customSelect');
    let currentTarget = e.currentTarget;
    for (let i = 0; i < getCustomSelect.length; i++) {
        if(currentTarget.isEqualNode(getCustomSelect[i])) {
            continue;
        }

        let getMoreVert = getCustomSelect[i].lastChild;
        getMoreVert.style.display = 'none'
        // console.log('a')
    }
    
    let getMoreVert = currentTarget.lastChild;
    if (getMoreVert.style.display === 'none') {
        getMoreVert.style.display = 'block';
        // console.log('b')
    } else {
        getMoreVert.style.display = 'none'
        // console.log('c')
    }
}

let hideMoreVert = (e) => {
    // let moreVert = document.querySelector('.moreVert');

    // console.log(moreVert)

    // if(!moreVert.contains(e.target)) {
    //     console.log('hideMoreVert');
    //     moreVert.style.display = 'none';
    // }
    let getMoreVert = document.getElementsByClassName('moreVert');

    for (let i = 0; i < getMoreVert.length; i++) {
        if(getMoreVert[i].style.display == 'block' && !getMoreVert[i].contains(e.target)) {
            // console.log('hideMoreVert');
            console.log(getMoreVert[i].contains(e.target))
            getMoreVert[i].style.display = 'none';
        }
    }
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