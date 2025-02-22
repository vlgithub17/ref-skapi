
export let dateFormat = (timestamp: number) => {
    let currentDate = new Date(timestamp);
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let day = ('0' + currentDate.getDate()).slice(-2);
    let dateStr = `${year}-${month}-${day}`;

    return dateStr;
}

export const getFileSize = (s: any) => {
    if (s <= 0 || s == null) {
        return '0 bytes'
    }
    else {
        let unit = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
        let e = Math.floor(Math.log(s) / Math.log(1024));
        return (s / Math.pow(1024, e)).toFixed(2) + " " + unit[e];
    }
};