/*
 * @Author: lsx
 * @Date:   2021-06-03 21:49:04
 * @Last Modified by:   smallsky
 * @Last Modified time: 2021-06-03 21:53:59
 */
import GeneratorNumber from '../util/generatorNumber';
import appendNum from './appendNum';

const gn = new GeneratorNumber();
gn.onNumberHandler = function(num) {
    appendNum(num);
};

// 注册事件
let isStart = false;
window.onclick = function() {
    if (isStart) {
        gn.stop();
        isStart = false;
    } else {
        gn.start();
        isStart = true;
    }
};