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
        }
    };
    window.Tools = Tools; //暴露到外部
})(window);