/*
 * @Author: lsx
 * @Date:   2021-06-03 20:57:49
 * @Last Modified by:   smallsky
 * @Last Modified time: 2021-06-03 21:10:49
 */
// 生成数字
export default class GeneratorNumber {
    constructor(duration = 500) {
        this.duration = duration; // 生成数字的时间间隔
        this.num = 1; // 存储数字
        this.timerId = null; // 存储定时器标识
        this.onNumberHandler = null; // 处理数字回调函数
    }
    // 开始生成数字
    start() {
        if (this.timerId) {
            return;
        }
        this.timerId = setInterval(() => {
            this.onNumberHandler && this.onNumberHandler(this.num);
            this.num++;
        }, this.duration);
    }
    // 停止生成数字
    stop() {
        clearInterval(this.timerId);
        this.timerId = null;
    }
};