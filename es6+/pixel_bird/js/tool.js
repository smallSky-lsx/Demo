/*
 * @Author: lsx
 * @Date:   2021-04-19 08:58:42
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-04-19 17:47:02
 */
// 工具类，没有隐式原型
((Tool) => {
    /**
     * 获取[min, max]随机整数
     * @param  {number} min [最小值]
     * @param  {number} max [最大值]
     * @return {number}     [随机整数]
     */
    Tool.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min); // [min, max]
    };
    // 获取元素参数
    Tool.style = selector => {
        const dom = document.querySelector(selector);
        const skyStyle = getComputedStyle(dom);
        return {
            dom: dom,
            domStyle: skyStyle,
            width: parseFloat(skyStyle.width),
            clientWidth: dom.clientWidth,
            clientHeight: dom.clientHeight,
            height: parseFloat(skyStyle.height),
            left: parseFloat(skyStyle.left),
            top: parseFloat(skyStyle.top),
        };
    };
    // 两个矩形碰撞检测，传递两个矩形
    Tool.isHit = function(recta, rectb) {
        // 检测矩形是否碰撞原理：
        /**
         * A: 两矩形水平中心点距离，a: 矩形宽度一半，b: 矩形宽度一半
         * B: 两矩形垂直中心点距离，c: 矩形高度一半，d: 矩形高度一半
         * a + b > A && c + d > B
         */
        const a = recta.width / 2;
        const b = rectb.width / 2;
        const A = Math.abs((recta.left + a) - (rectb.left + b));
        const c = recta.height / 2;
        const d = rectb.height / 2;
        const B = Math.abs((recta.top + c) - (rectb.top + d));
        if (a + b >= A && c + d > B) {
            return true;
        }
        return false;
    };
})(window.Tool || (window.Tool = Object.create(null)));