/*
* @Author: lsx
* @Date:   2021-04-19 10:55:07
* @Last Modified by:   Administrator
* @Last Modified time: 2021-04-19 15:52:50
*/

// land类-运动 与 管道速度相同
class Land extends Rect {
    // speedX默认值为-100
    constructor(speedX = -100){
        super(Param.land.width, Param.land.height, 0, Param.land.top, speedX, 0, Param.land.dom);
    }
    // 控制land向左运动范围
    onMove(){
        this.left %= -Param.container.clientWidth;
    }
}