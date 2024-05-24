export let listFiles = (files:FileList) => {
    for(let f of files) {
        console.log(f);
    }
}