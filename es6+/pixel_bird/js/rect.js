/*
 * @Author: lsx
 * @Date:   2021-04-19 09:08:19
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-04-19 15:29:53
 */

/**
 * 可移动矩形
 * 属性：宽度、高度、水平位置、垂直位置、水平速度、垂直速度、DOM
 * 原型方法：渲染、移动
 */
class Rect {
    /**
     * [Rect构造器，只能使用new调用]
     * @param  {[type]} width  [宽度]
     * @param  {[type]} height [高度]
     * @param  {[type]} left   [水平位置]
     * @param  {[type]} top    [垂直位置]
     * @param  {[type]} speedX [水平速度，单位：px/ms]
     * @param  {[type]} speedY [垂直速度，单位：px/ms]
     * @param  {[type]} dom    [DOM元素]
     * @return {[type]}        [新创建的对象]
     */
    constructor(width, height, left, top, speedX, speedY, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.speedX = speedX;
        this.speedY = speedY;
        this.dom = dom;
        this.render();
    }
    // 渲染到页面
    render() {
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }
    /**
     * 移动矩形
     * @param  {[type]} duration 时间，单位：ms
     * @return {[type]}          无
     */
    move(duration) {
        // 移动距离 = 速度 * 时间;
        const disX = this.speedX * duration; // 水平移动距离
        const disY = this.speedY * duration; // 垂直移动距离
        // 矩形位置 = 当前位置 + 移动距离
        this.left += disX;
        this.top += disY;
        // 控制矩形移动范围，由子类决定
        this.onMove && this.onMove();
        // 重新渲染到页面
        this.render();
    }
}