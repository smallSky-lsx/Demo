/*
 * @Author: lsx
 * @Date:   2021-04-19 12:03:23
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-04-19 17:28:40
 */

// 单个管道类
class Pipe extends Rect {
    // 管道运动速度与大地相同
    constructor(height, top, speedX, dom) {
        super(Param.pipe.width, height, Param.pipe.left, top, speedX, 0, dom);
        this.addPage();
    }
    // 创建invalid访问器属性, 只读
    get invalid() {
        return this.left <= -this.width;
    }
    // pipe失效，从DOM树中删除
    onMove() {
        this.invalid && this.dom.remove(); // 从所属的DOM树中删除
    }
    // 添加到DOM树
    addPage() {
        Param.container.dom.appendChild(this.dom);
    }
}

// 一对管道类
class PairPipe {
    constructor(speedX = -100) {
        const pipeStyle = Param.pipe;
        const maxHeight = pipeStyle.maxY - pipeStyle.fixedSpace;
        const upHeight = Tool.getRandomInt(pipeStyle.minHeight, maxHeight - pipeStyle.minHeight);
        // 上管道
        const upDom = document.createElement('div');
        upDom.className = 'pipe up';
        this.upPipe = new Pipe(upHeight, 0, speedX, upDom);

        const downHeight = maxHeight - upHeight;
        const downTop = pipeStyle.maxY - downHeight;
        // 下管道
        const downDom = document.createElement('div');
        downDom.className = 'pipe down';
        this.downPipe = new Pipe(downHeight, downTop, speedX, downDom);
    }
    // 对管道是否失效, 只读
    get invalid() {
        return this.upPipe.invalid && this.downPipe.invalid;
    }
    // 一对管道运动
    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

// 生产一对管道生产车间
class ProductPairPipe {
    constructor(speedX = -100, hz = 1500) {
        this.pairs = []; // 存储生产的对管道
        this.timer = null; // 生产定时器标识
        this.hz = hz; // 生产速度, ms/次
        this._speedX = speedX; // 管道水平运行速度，性能定义
    }
    // 只读
    get speedX() {
        return this._speedX;
    }
    // 开始生产
    start() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs = this.pairs.filter(pair => {
                return !pair.invalid;
            });
            this.pairs.push(new PairPipe(this.speedX));
        }, this.hz);
    }
    // 停止生产
    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

// bug: 一对管道之间的间隔是通过