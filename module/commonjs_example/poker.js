/*
 * @Author: lsx
 * @Date:   2021-05-14 13:35:27
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-05-14 14:35:54
 */
// 扑克构造函数
const {PICKER_COLOR, PICKER_NUMBER} = require('./util.js');
class Poker {
    /**
     * 扑克构造器
     * @param  {[number]} color  [扑克花色]
     * @param  {[number]} number [扑克牌面]
     * @return {[object]}        [一张扑克对象]
     */
    constructor(color, number) {
        if(color < 0 && number < 13) {
            throw new RangeError('color为负值，number值只能为13、14')
        }
        this.color = color; // 花色
        this.number = number; // 牌面
    }
    /**
     * 得到扑克牌的字符串
     * @return {[string]} [扑克牌字符串]
     */
    toString() {
        let str;
        // 花色: ♣、♥、♦、♠, 大小王没有花色, 为-1
        str = PICKER_COLOR[this.color] ?? '';
        // 牌面
        str += PICKER_NUMBER[this.number];
        return str;
    }
}
// 模块导出
module.exports = Poker;