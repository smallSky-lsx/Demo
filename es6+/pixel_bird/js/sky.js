/*
* @Author: lsx
* @Date:   2021-04-19 09:39:29
* @Last Modified by:   Administrator
* @Last Modified time: 2021-04-19 15:54:06
*/
// 天空类
class Sky extends Rect {
    // 预设速度 -50
    constructor(speedX = -50){
        super(Param.sky.width, Param.sky.height, 0, 0, speedX, 0, Param.sky.dom);
    }
    // 控制sky向左运动范围
    onMove(){
        this.left %= -Param.container.clientWidth;
    }
}
