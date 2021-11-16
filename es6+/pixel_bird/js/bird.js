/*
 * @Author: lsx
 * @Date:   2021-04-19 11:02:26
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-04-19 17:47:15
 */
/**
 * Bird类
 * 1. 鸟具有初始位置、没有初始速度(水平速度、垂直速度)、具有重力加速度
 * 2. 向上飞，给鸟一个向上飞的初速度。
 * 3. 鸟的飞翔是有一定范围的。
 * 4. 鸟扇翅膀状态：0/1/2
 * 5. 鸟实际上在上下运动，水平位置未运动
 */
class Bird extends Rect {
    constructor(g = 700, wingState = 0, hz = 500, initSpeed = -300) {
        super(Param.bird.width, Param.bird.height, Param.bird.left, Param.bird.top, 0, 0, Param.bird.dom);
        this.g = g; // 重力加速度
        this.maxY = Param.bird.maxY - this.height; // 最大飞翔最高
        this.wingState = wingState; //翅膀状态
        this.timer = null; //翅膀扇动定时器标识
        this.hz = hz; //扇动翅膀频率， 500ms/次
        this.initSpeed = initSpeed;
    }
    // 控制飞翔范围
    onMove() {
        // 飞翔范围：[0, this.maxY]
        if (this.top <= 0) {
            this.top = 0;
        }
        if (this.top >= this.maxY) {
            this.top = this.maxY;
        }
    }
    // 开始扇动翅膀
    startWing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.wingState = ++this.wingState % 3;
            // 渲染翅膀状态
            this.dom.className = 'bird wing' + this.wingState;
        }, this.hz);
    }
    // 暂停扇动翅膀
    stopWing() {
        clearInterval(this.timer);
        this.timer = null;
    }
    // 在重力加速度下自由落体运动
    move(duration) {
        super.move(duration);
        this.speedY += duration * this.g;
    }
    // 向上飞
    jump() {
        this.speedY = this.initSpeed;
    }
}