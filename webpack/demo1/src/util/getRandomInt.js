/*
 * @Author: lsx
 * @Date:   2021-06-03 20:48:02
 * @Last Modified by:   smallsky
 * @Last Modified time: 2021-06-03 20:50:24
 */
// 获取指定范围的随机整数
export default function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}