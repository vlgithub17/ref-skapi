import { nextTick } from 'vue';

let prevX, prevW, nextW = 0;
let prevCol, nextCol = null;
let widthSum = 0;

export let tableSetting = () => {
    nextTick(() => {
        let ths = document.getElementsByTagName('th');
        let thsArr = Array.from(ths);
    
        thsArr.forEach((e) => {
            let widthStyle = window.getComputedStyle(e).width;
            e.style.width = widthStyle;
            widthSum += widthStyle;
        });
    })
}

export let mouseMoveHandler = function (e) {
    let dx = e.clientX - prevX;
    let ths = document.getElementsByTagName('th');
    let thsArr = Array.from(ths);

    thsArr.forEach((e) => {
        widthSum += e.offsetWidth;
    });

    if ((widthSum < window.innerWidth || dx < 0) && (prevW + dx > 100 && nextW - dx > 100)) {
        prevCol.style.width = `${prevW + dx}px`;
        nextCol.style.width = `${nextW - dx}px`;
    }
};

export let mousedown = function (e) {
    prevCol = e.target.parentNode;
    nextCol = prevCol.nextSibling;

    let prevStyles = window.getComputedStyle(e.target.parentNode);
    let nextStyles = window.getComputedStyle(prevCol.nextSibling);

    prevX = e.clientX;
    prevW = parseInt(prevStyles.width, 10);
    nextW = parseInt(nextStyles.width, 10);
    document.addEventListener('mousemove', mouseMoveHandler);
};