(function(window) {
    var Square = window.Square,
        Tools = window.Tools,
        container = Tools.$id('container'); //容器

    var init = function() {
        // 生成十个小方块
        var arr = []; //存储生成的小方块
        for (var i = 0, count = 50; i < count; i++) {
            arr.push(new Square(container, {
                width: 10,
                height: 10
            }));
        }
        // 随机生成背景颜色、位置
        var randomParam = function() {
            arr.forEach(function(ele) {
                // 随机生成位置
                var pos = Tools.getRandomPos(ele.row, ele.col);
                ele.left = pos.left * ele.width;
                ele.top = pos.top * ele.height;
                // 随机生成背景颜色
                ele.backgroundColor = Tools.getRandomBgc(0, 255);
                // 重新渲染
                ele.renderChange();
            });
        };
        randomParam(); //打开页面立即加载
        // 每一秒钟，随机
        var timerId = window.setInterval(randomParam, 500);
        container.onmouseenter = function() {
            window.clearInterval(timerId);
        };
        container.onmouseleave = function() {
            timerId = window.setInterval(randomParam, 500);
        };
    };
    init(); //初始化
})(window);