/*
 * @Author: lsx
 * @Date:   2021-04-19 09:37:09
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-04-19 16:29:34
 */
((Param) => {
    // 类参数
    Param.container = Tool.style('.game');
    Param.sky = Tool.style('.sky');
    Param.land = Tool.style('.land');
    Param.bird = {
        ...Tool.style('.bird'),
        maxY: Param.container.clientHeight - Param.land.clientHeight,
    };
    Param.pipe = {
        width: 52,
        left: Param.container.width,
        minHeight: 80,
        fixedSpace: 150,
        maxY: Param.bird.maxY,

    };
    // 游戏参数
    Param.game = {
        hz: 16, // 定时器时间间隔
        sky: {
            speedX: -50 //天空水平速度
        },
        land: {
            speedX: -100 //大地水平速度
        },
        bird: {
            g: 700, // 重力加速度
            wingState: 0, // 翅膀状态
            hz: 500, // 翅膀扇动频率， ms/次
            initSpeed: -230 //垂直方向初始速度
        },
        productPairPipe: {
            speedX: -100, // 管道水平速度
            hz: 1600 // 管道生产速度， ms/对
        }
    };
})(window.Param || (window.Param = Object.create(null)));