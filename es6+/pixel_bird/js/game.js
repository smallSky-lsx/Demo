/*
 * @Author: lsx
 * @Date:   2021-04-19 15:29:45
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-04-19 17:39:23
 */
/**
 * 游戏类：
 * 初始化：
 * 开始游戏
 * 暂停游戏
 * 游戏结束规则
 */
class Game {
    constructor() {
        const skyParam = Param.game.sky;
        const landParam = Param.game.land;
        const birdParam = Param.game.bird;
        const productPipeParam = Param.game.productPairPipe;
        const gameParam = Param.game;

        this.sky = new Sky(skyParam.speedX);
        this.land = new Land(landParam.speedX);
        this.bird = new Bird(birdParam.g, birdParam.wingState, birdParam.hz, birdParam.initSpeed);
        this.productPairPipe = new ProductPairPipe(productPipeParam.speedX, productPipeParam.hz);
        this.timer = null; // 游戏定时器标识
        this.hz = gameParam.hz; // 定时器时间间隔，ms
        this._gameover = false;
    }
    // 游戏结束标识, true表示结束游戏
    get gameover() {
        // 鸟与上下边界发生碰撞
        if (this.bird.top <= 0 || this.bird.top >= this.bird.maxY) {
            this._gameover = true;
            return true;
        }
        // 鸟与管道碰撞检测
        return this._gameover = this.productPairPipe.pairs.some(pair => {
            return Tool.isHit(pair.upPipe, this.bird) || Tool.isHit(pair.downPipe, this.bird);
        });
    }
    // 游戏初始化
    init() {
        this.regEvent();
    }
    // 游戏开始
    start() {
        if (this.timer) {
            return;
        }
        if (this._gameover) {
            window.location.reload();
            return;
        }
        this.productPairPipe.start();
        this.bird.startWing();
        const duration = this.hz / 1000;
        this.timer = setInterval(() => {
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.productPairPipe.pairs.forEach(pair => {
                pair.move(duration);
            });
            this.gameover && this.stop();
        }, this.hz);
    }
    // 游戏停止
    stop() {
        this.productPairPipe.stop();
        this.bird.stopWing();
        clearInterval(this.timer);
        this.timer = null;
    }
    // 事件注册
    regEvent() {
        // 按Enter键开始或暂停、游戏结束重启游戏
        // 按空格键暂停游戏
        let isStart = true;
        window.onkeydown = e => {
            if (e.keyCode === 13) { // Enter
                if (isStart || this._gameover) {
                    // 开始或重启
                    this.start();
                    isStart = false;
                } else {
                    // 暂停
                    this.stop();
                    isStart = true;
                }
            } else if (e.keyCode == 32) { //Space
                this.bird.jump();
            }
        };
    }
}
const game = new Game();
game.init();