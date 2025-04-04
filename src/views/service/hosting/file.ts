import { reactive, ref } from "vue";
import { currentService } from '@/views/service/main';
import mime from 'mime';

export let fileToUpload = ref();
export let currentDirectory = ref('');
export let uploadGroups: FormData[] = [];
export let uploadCount = reactive([0, 0]); // fin / total
export let uploadProgress: any = reactive({});  // { name: fileName, progress: percent(number) }
export let serviceFolders: any = {}; // {serviceid: {dirname: {}}}

export let uploadFiles = async (files: File[], callback?: () => void, contentTypeMapping?: { [fname: string]: string }) => {
    // uploads one by one
    let sd = currentService.service.subdomain;
    if (!sd) {
        throw new Error('No subdomain found');
    }
    if (sd && sd[0] === '*' || sd[0] === '+') {
        throw new Error('Cannot upload files to pending subdomain');
    }

    uploadCount[1] += files.length;
    let currentDir = currentDirectory.value ? currentDirectory.value + '/' : '';
    for (let f of files) {
        uploadProgress.name = currentDir + (f.webkitRelativePath || f.name);
        uploadProgress.progress = 0;

        let form = new FormData();
        form.append('files[]', f);

        await currentService.uploadHostFiles(form, {
            contentTypeMapping,
            prefix: currentDir,
            progress: async (e) => {
                if (e.status !== 'progress') {
                    return
                }

                let percent = Math.floor(e.progress);
                uploadProgress.progress = percent;

                if (percent !== 100) {
                    return;
                }

                uploadCount[0]++;
                let fPathArr = (f.webkitRelativePath || f.name).split('/'); // [folder-filename, filename]
                let flName = fPathArr.pop();
                let fPath = currentDir + fPathArr.join('/');
                if (fPath.slice(-1) === '/') {
                    fPath = fPath.slice(0, -1);
                }

                let fileObj: any = {
                    name: flName,
                    size: f.size,
                    path: currentService.service.subdomain + (fPath === '' ? '' : '/' + fPath),
                    upl: new Date().getTime(),
                }

                let fPathSplit = fPath.split('/');

                if (fPathSplit.length === 1) {
                    if (fPathSplit[0] === '') {
                        let folder = serviceFolders[currentService.service.subdomain]['!'].pager;
                        if (folder.list?.[flName]) {
                            await folder.editItem(fileObj);
                        }
                        else {
                            await folder.insertItems(fileObj);
                        }
                    }
                    else {
                        let folder = serviceFolders[currentService.service.subdomain]['!'].pager;
                        if (!folder.list?.['#' + fPathSplit[0]]) {
                            let obj = Object.assign({}, fileObj, { name: '#' + fPathSplit[0], cnt: 0, size: 0, path: currentService.service.subdomain });
                            await folder.insertItems(obj);
                        }
                        else {
                            let obj = folder.list?.['#' + fPathSplit[0]];
                            obj.size = (obj.size || 0) + f.size;
                            obj.cnt = (obj.cnt || 0) + 1;
                            await folder.editItem(obj);
                        }

                        if (serviceFolders[currentService.service.subdomain][fPathSplit[0]]) {
                            let folder = serviceFolders[currentService.service.subdomain][fPathSplit[0]].pager;
                            if (folder.list?.[flName]) {
                                await folder.editItem(fileObj);
                            }
                            else {
                                await folder.insertItems(fileObj);
                            }
                        }
                    }
                }
                else {
                    // has nested folders
                    let pathIdx = fPathSplit.length;
                    let fp = fPathSplit.slice(0, pathIdx).join('/');
                    if (serviceFolders[currentService.service.subdomain][fp]) {
                        let folder = serviceFolders[currentService.service.subdomain][fp].pager;
                        if (folder.list?.[flName]) {
                            await folder.editItem(fileObj);
                        }
                        else {
                            await folder.insertItems(fileObj);
                        }
                    }
                    do {
                        if (pathIdx) {
                            fileObj = Object.assign({}, fileObj);
                            let fp = fPathSplit.slice(0, pathIdx);
                            let fldName = '#' + fp.pop();
                            let fpStr = fp.join('/') || '!';
                            fileObj.name = fldName;
                            if (serviceFolders[currentService.service.subdomain][fpStr]) {
                                let folder = serviceFolders[currentService.service.subdomain][fpStr].pager;
                                if (folder.list?.[fldName]) {
                                    let obj = folder.list?.[fldName];
                                    obj.size = (obj.size || 0) + f.size;
                                    obj.cnt = (obj.cnt || 0) + 1;
                                    obj.path = currentService.service.subdomain + (fpStr.replace('!', '') ? '/' + fpStr : '');
                                    await folder.editItem(obj);
                                }
                                else {
                                    fileObj.cnt = 1;
                                    fileObj.size = f.size;
                                    fileObj.path = currentService.service.subdomain + (fpStr.replace('!', '') ? '/' + fpStr : '');
                                    await folder.insertItems(fileObj);
                                }
                            }
                        }
                    } while (pathIdx--)
                }

                if (uploadCount[0] === uploadCount[1]) {
                    // all files uploaded
                    uploadCount[0] = 0;
                    uploadCount[1] = 0;
                    uploadProgress.name = '';
                    uploadProgress.progress = 0;
                    if (callback) {
                        callback();
                    }
                }
            }
        }).catch(err => {
            // initialize upload progress
            uploadCount[0] = 0;
            uploadCount[1] = 0;
            uploadProgress.name = '';
            uploadProgress.progress = 0;
            if (callback) {
                callback();
            }
            window.alert(err.message); // show error message
            throw err;
        });
    }
}

let contentTypeMapping: { [filename: string]: string } = {};

function traverseFileTree(item: { [key: string]: any }, path = '') {
    return new Promise((resolve) => {
        if (item.isFile) {
            item.file(function (file: { [key: string]: any }) {
                if (!file.type) {
                    function getExtensionOfFilename(filename: string) {
                        var _fileLen = filename.length;
                        var _lastDot = filename.lastIndexOf('.');
                        var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();
                        return _fileExt;
                    }
                    let type = getExtensionOfFilename(file.name);
                    contentTypeMapping[file.name] = mime.getType(type);
                }
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

export let onDrop = async (e: any, callback?: () => void) => {
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

    uploadFiles(formData.getAll('files[]') as File[], callback, contentTypeMapping);
}