/*
 * @Author: lsx
 * @Date:   2021-06-03 21:19:09
 * @Last Modified by:   smallsky
 * @Last Modified time: 2021-06-04 09:22:47
 */
import isPrime from '../util/isPrime';
import getRandomColor from '../util/getRandomColor';
import getRandomInt from '../util/getRandomInt';
// 向页面添加一个数字
const divContainer = document.getElementById('divContainer');
const divCenter = document.getElementById('divCenter');
export default function appendNum(num) {
    const flag = isPrime(num);
    const color = getRandomColor();
    // divContainer
    appendToContainer(num, flag, color);
    // divCenter
    appendToCenter(num, flag, color);
};

function appendToContainer(num, flag, color) {
    const span = document.createElement('span');
    span.innerText = num;
    flag && (span.style.color = color);
    divContainer.appendChild(span);
}
const centers = [];

function appendToCenter(num, flag, color) {
    if (flag) {
        const div = document.createElement('div');
        // 添加到centers存储
        centers.push(div);
        div.className = 'center';
        div.style.color = color;
        div.innerText = num;
        document.body.appendChild(div);
        deleteOpacityDiv();
        // 强制重新渲染:获取元素尺寸或位置
        getComputedStyle(div).left;
        div.style.transform = `translate(${getRandomInt(-150,150)}px,${getRandomInt(-150,150)}px)`;
        div.style.opacity = 0;
    } else {
        divCenter.innerText = num;
    }
}

function deleteOpacityDiv() {
    centers.forEach((ele) => getComputedStyle(ele).opacity == 0&&ele.remove());
}