/*
 * @Author: lsx
 * @Date:   2021-05-14 13:35:16
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-05-14 14:48:19
 */
// 工具模块
module.exports = {
    PICKER_COLOR: ['♠', '♥', '♣', '♦'], // 扑克花色
    PICKER_NUMBER: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'joker', 'JOKER'], // 扑克数字
    /**
     * 对数组内容乱序
     * @param  {array} arr [数组]
     */
    sortRandom(arr) {
        arr.sort((a, b) => Math.random() - 0.5);
    },
    /**
     * 打印数组内容
     * @param  {[type]} arr [description]
     * @return {[type]}     [description]
     */
    print(arr, separator = '  ') {
        return arr.reduce((newArr, item) => {
            newArr.push(item.toString());
            return newArr;
        }, []).join(separator);
    },
    /**
     * 对数组升序排序
     * @param  {[array]} arr [数组]
     */
    sortAsc(arr) {
        return arr.sort(({ number: a }, { number: b }) => a - b);
    }
};