(function methodName(window) {
    var Tools = {
        $id: function(id) { //根据元素id获取元素
            return document.getElementById(id);
        },
        getRandomInt: function(min, max) { // 获取随机整数[min, max]
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        getRandomBgc: function(min, max) { //随机生成颜色值
            var r = this.getRandomInt(min, max),
                g = this.getRandomInt(min, max),
                b = this.getRandomInt(min, max);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        getRandomPos: function(row, col) { //随机生成位置
            return {
                left: this.getRandomInt(0, col),
                top: this.getRandomInt(0, row)
            };
        },
        inherit: function(Origin, Target) { //继承: Origin ==> Target
            var F = function() {}; //中间构造函数，私有
            return function() {
                F.prototype = Target.prototype;
                Origin.prototype = new F();
                Origin.prototype.constructor = Origin;
                Origin.prototype.__uber__ = Target.prototype;
            };
        },
        clone: function(origin, target) { //浅拷贝，拷贝origin
            // 若是用户未传递target, 由系统提供一个空对象
            target = target || {};
            var data;
            for (var key in origin) {
                data = origin[key];
                // 仅拷贝对象自身属性，不可是方法
                if (origin.hasOwnProperty(key) && typeof data !== 'function') {
                    target[key] = data;
                }
            }
            return target;
        }
    };
    window.Tools = Tools; //暴露到外部
})(window);