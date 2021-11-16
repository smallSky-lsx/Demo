(function(window) {
    var Tools = window.Tools,
        Food = window.Food,
        Snake = window.Snake,
        that = null;

    var Game = function(map) {
        that = this;
        // 食物对象
        this.food = new Food(map);
        // 蛇对象
        this.snake = new Snake(map);
        this.startBtn = Tools.$id('start');
        this.pauseBtn = Tools.$id('pause');
        this.reloadBtn = Tools.$id('reload');
        this.timerId = null; //没有定时器标识
        this.isStart = false; //未开始
        this.isPause = true; //初始状态，已暂停
        this.isEnd = false; //游戏是否结束
        // 生成食物
        this.food.generatorFood(Snake.getPosData());
        // 生成蛇
        this.snake.render();
        // console.log(this.snake);
    };
    // 游戏规则
    Game.prototype.ruler = function() {
        /**
         * 1. 蛇头撞上墙， 游戏结束，蛇头贴在墙上
         * 2. 蛇头撞上蛇身，游戏结束，蛇头贴在撞击点
         */
        var that = this.snake,
            snakeHead = that.snake[0],
            left = snakeHead.left,
            top = snakeHead.top;
        // 1. 蛇头撞墙上，left 或 top 小于 0, left 或 top大于 地图
        /**
         * 1. left < 0 && top >= 0
         * 2. top < 0 && left >= 0
         * 3. left > 列数-1 && top >= 0
         * 4. top > 行数-1 && left >= 0
         */
        var option = null;
        if (left < 0 && top >= 0) { //左墙
            option = {
                left: -1
            };
        } else if (top < 0 && left >= 0) { //顶墙
            option = {
                top: -1
            };
        } else if (left > that.getCol() && top >= 0) { //右墙
            option = {
                left: that.getCol() + 1
            };
        } else if (top > that.getRow() && left >= 0) { //底墙
            option = {
                top: that.getRow() + 1
            };
        }

        // 2. 蛇头撞上蛇身，蛇头当前位置与蛇头外蛇节比较
        var posData = Snake.getPosData();
        posData.shift(); //删除第一个数据
        var isMeet = posData.length ? !(posData.some(function(item) {
            return item.left === left && item.top === top;
        })) : true; //true，未遇到、false，遇到
        // 是否结束游戏
        if (option || !isMeet) {
            // Snake.setData(0, option);
            // that.renderChange();
            window.clearInterval(this.timerId);
            this.timerId = null;
            console.log('游戏结束，请重新开始！');
            // 开始、暂停点击无效
            this.startBtn.onclick = null;
            this.pauseBtn.onclick = null;
            this.isEnd = true;
        }
    };
    // 游戏初始化
    Game.prototype.init = function() {
        var run = function() {
            that.snake.move()(); //蛇移动
            that.snake.eat(that.food); //蛇吃食物
            that.ruler(); //游戏规则
        };
        var robj = {
            37: 'rtl',
            38: 'btt',
            39: 'ltr',
            40: 'ttb'
        };
        // 控制蛇方向
        document.onkeydown = function(e) {
            e = e || window.event;
            that.snake.setDirection(robj[e.keyCode]);
        };
        // 开始游戏
        this.startBtn.onclick = function() {
            if (that.isPause) { //暂停的，能开始
                console.log('游戏开始!');
                that.timerId = window.setInterval(run, 250 / that.snake.speed);
                that.isStart = true; //已开始
                that.isPause = false; //未暂停
            }
        };
        // 暂停游戏
        this.pauseBtn.onclick = function() {
            if (!that.isPause) { //未暂停， 能暂停
                console.log('游戏暂停!');
                window.clearInterval(that.timerId);
                that.timerId = null;
                that.isPause = true; //已暂停
            }
        };
        // 重载开始游戏
        this.reloadBtn.onclick = function() {
            var flag = false; //重新开始标识
            that.isEnd && (flag = true);
            !flag && that.isStart && window.confirm('正在游戏是否要重新开始？') && (flag = true);
            if (flag) {
                console.log('重新载入游戏...');
                window.location.reload(); //F5
            }
        };

    };
    Game.start = function() {
        var game = new Game(Tools.$id('map'));
        game.init();
    };
    // 载入游戏...
    Game.start();
})(window);