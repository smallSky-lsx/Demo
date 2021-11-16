/*
 * @Author: lsx
 * @Date:   2021-06-03 20:51:21
 * @Last Modified by:   smallsky
 * @Last Modified time: 2021-06-03 21:19:51
 */
import getRandomInt from './getRandomInt';
const colors = ["#f26395", "#62efab", "#ef7658", "#ffe868", "#80e3f7", "#d781f9"];
// 获取随机颜色
export default function getRandomColor() {
    return colors[getRandomInt(0, colors.length - 1)];
};