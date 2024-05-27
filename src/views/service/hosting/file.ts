export let listFiles = (files:FileList) => {
    for(let f of files) {
        console.log(f);
    }
}

function traverseFileTree(item: {[key: string]: any}, path = '') {
    return new Promise((resolve) => {
        if (item.isFile) {
            item.file(function (file: {[key: string]: any}) {
                resolve([{ file, path: path + file.name }]);
            });
        } else if (item.isDirectory) {
            let dirReader = item.createReader();
            dirReader.readEntries(async function (entries: {[key: string]: any}[]) {
                let promises = entries.map(entry => traverseFileTree(entry, path + item.name + '/'));
                let results = await Promise.all(promises);
                resolve([].concat(...results));
            });
        }
    });
}

export let onDrop = async(e:any) => {
    e.preventDefault();

    let items = e.dataTransfer.items;
    let formData = new FormData();
    let allFiles = [];
    let filePromises = [];

    for (let i = 0; i < items.length; i++) {
        let item = items[i].webkitGetAsEntry();

        if (item) {
            filePromises.push(traverseFileTree(item));
        }
    }

    let allFileGroups = await Promise.all(filePromises);
    allFiles = [].concat(...allFileGroups);

    allFiles.forEach(({ file, path }) => {
        formData.append('files[]', file, path);
    });

    for (let value of formData.values()) {
        console.log(value);
  }
}