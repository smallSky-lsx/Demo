/*
 * @Author: lsx
 * @Date:   2021-05-14 13:34:57
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-05-14 14:49:18
 */
// 入口文件
// 1. 创建54张扑克牌
const pokers = [];
const Poker = require('./poker.js');
for (let i = 0; i < 13; i++) { // 牌面
    for (let j = 0; j < 4; j++) { // 花色
        pokers.push(new Poker(j, i));
    }
}
pokers.push(new Poker(-1, 13), new Poker(-1, 14));
// 2. 洗牌
const util = require('./util.js');
util.sortRandom(pokers);
// 3. 发牌
const player1 = util.sortAsc(pokers.slice(0, 17));
const player2 = util.sortAsc(pokers.slice(17, 34));
const player3 = util.sortAsc(pokers.slice(34, 51));
const desk = util.sortAsc(pokers.slice(51));

console.log('玩家1：');
console.log(util.print(player1));
console.log('玩家2：');
console.log(util.print(player2));
console.log('玩家3：');
console.log(util.print(player3));
console.log('桌面：');
console.log(util.print(desk));