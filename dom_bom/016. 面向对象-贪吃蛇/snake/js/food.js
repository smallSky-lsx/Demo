(function(window) {
    var Tools = window.Tools,
        Base = window.Base;
    var Food = function(container, options) {
        options = options || {};
        Base.call(this, container, options);
        this.current = this.create(options.tagName); //当前元素
    };
    Tools.inherit(Food, Base)(); //Food ==> Base
    // 随机生成未在蛇身上食物
    Food.prototype.generatorFood = function(notPos) {
        // 获取随机生成的位置，位置不能在蛇上
        var pos = Tools.getRandomPos(this.getRow(), this.getCol()),
            flag = (notPos && notPos.length) ? !(notPos.some(function(item) {
                return item.left === pos.left && item.top === pos.top;
            })) : true;
        if (flag) {
            this.left = pos.left;
            this.top = pos.top;
            // 随机生成背景颜色
            this.color = Tools.getRandomBgc(0, 255);
            this.render();
            return;
        }
        this.generatorFood(notPos);
    }
    window.Food = Food;
})(window);