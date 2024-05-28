import { reactive, ref } from "vue";
import { currentService } from '@/views/service/main';

export let fileToUpload = ref();
export let currentDirectory = ref('');
export let uploadGroups: FormData[] = [];
export let uploadCount = reactive([0, 0]); // fin / total
export let uploadProgress: any = reactive({});  // { name: fileName, progress: percent(number) }

export let uploadFiles = async (files: File[], callback?:()=>void) => {
    // uploads one by one

    uploadCount[1] += files.length;
    let currentDir = currentDirectory.value ? currentDirectory.value + '/' : '';
    for (let f of files) {
        uploadProgress.name = currentDir + (f.webkitRelativePath || f.name);
        uploadProgress.progress = 0;

        let form = new FormData();
        form.append('files[]', f);

        await currentService.uploadHostFiles(form, {
            prefix: currentDirectory.value,
            progress: (e) => {
                if(e.status !== 'progress') return
                // update progress
                let file = e.currentFile;
                let percent = Math.floor(e.progress);
                uploadProgress.progress = percent;

                if (percent === 100) {
                    uploadCount[0]++;
                }

                if (uploadCount[0] === uploadCount[1]) {
                    // all files uploaded
                    uploadCount[0] = 0;
                    uploadCount[1] = 0;
                    uploadProgress.name = '';
                    uploadProgress.progress = 0;
                    if(callback) callback();
                }
            }
        });
    }
}

function traverseFileTree(item: { [key: string]: any }, path = '') {
    return new Promise((resolve) => {
        if (item.isFile) {
            item.file(function (file: { [key: string]: any }) {
                resolve([{ file, path: path + file.name }]);
            });
        } else if (item.isDirectory) {
            let dirReader = item.createReader();
            dirReader.readEntries(async function (entries: { [key: string]: any }[]) {
                let promises = entries.map(entry => traverseFileTree(entry, path + item.name + '/'));
                let results = await Promise.all(promises);
                resolve([].concat(...results));
            });
        }
    });
}

export let onDrop = async (e: any, callback?:()=>void) => {
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

    uploadFiles(formData.getAll('files[]') as File[], callback);
}