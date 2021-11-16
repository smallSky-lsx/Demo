(function(window) {
    var Tools = window.Tools,
        Food = window.Food,
        Base = window.Base,
        that = null, //存储this
        snakeData = [{ //初始数据
            top: 4,
            left: 4,
            zIndex: 1,
            color: '#f40'
        }, {
            top: 4,
            left: 3,
            color: '#00f'
        }, {
            top: 4,
            left: 2,
            color: '#00f'
        }];
    var Snake = function(container, options) {
        options = options || {};
        this.container = container; //容器
        this.width = options.width || 20; //蛇节宽度
        this.height = options.height || 20; //蛇节高度
        this.snake = [];; // 蛇头+蛇节 ==> 蛇
        this.speed = options.speed || 1; //运动速度， 控制时间
        this.direction = options.direction || 'ltr'; //运动方向
        that = this;
    };
    // 外部获取蛇位置数据接口
    Snake.getPosData = function() {
        // snakeData数据有效性判断
        if (snakeData && snakeData.length) {
            return snakeData.map(function(item) {
                return {
                    left: item.left,
                    top: item.top
                };
            });
        }
        return [];
    };
    // 设置指定索引位置数据
    Snake.setData = function(index, option) {
        if (index < snakeData.length && option) {
            for (var key in option) {
                if (option.hasOwnProperty(key)) {
                    snakeData[index][key] = option[key];
                }
            }
        }
    };
    Tools.inherit(Snake, Base)(); //Snake ==> Base
    // 删除蛇
    Snake.prototype.remove = function() {
        // 删除页面元素
        this.snake.forEach(function(item) {
            item.container.removeChild(item.current);
        });
        // 清空对象存储数据
        this.snake.length = 0;
    };
    // 渲染蛇到页面显示
    Snake.prototype.render = function() {
        // 删除蛇-同步数据
        // this.remove();
        // 创建蛇、渲染到页面
        snakeData.forEach(function(option) {
            // option：蛇节数据
            this.addSnakeNode(option);
        }, this);
    };
    // 页面已存在，仅渲染变化样式到页面
    Snake.prototype.renderChange = function() {
        snakeData.forEach(function(option, index) {
            var snake = this.snake[index];
            Base.call(snake, this.container, option); //改变属性值
            snake.renderChange();
            // console.log(snake);
        }, this);
        // console.log(snakeData);
    };
    // 蛇头运动数据
    var sHeadMoveData = function(dire) {
        var moveCount = 1, //运动个数
            headChange = function(x, y) {
                return {
                    left: x,
                    top: y
                };
            };
        switch (dire) {
            case 'rtl': //从右往左
                /*return {
                    left:-moveCount,
                    top:0
                };*/
                return headChange(-moveCount, 0);
            case 'btt': //从下往上
                /*return {
                    left:0,
                    top:-moveCount
                };*/
                return headChange(0, -moveCount);
            case 'ltr': //从左到右
                /*return {
                    left:moveCount,
                    top:0
                };*/
                return headChange(moveCount, 0);
            case 'ttb': //从上往下
                /*return {
                    left:0,
                    top:moveCount
                };*/
                return headChange(0, moveCount);
        }
    };
    // 蛇移动
    Snake.prototype.move = function() {
        /**
         * 蛇默认移动方向：从左到右
         * 步骤：
         * 1. 蛇必须从后到前移动，最后蛇头移动。
         * 2. 蛇头控制移动的方向。
         */
        // 蛇头移动变化
        var sport = sHeadMoveData(that.direction);
        // 运动，只需要控制蛇头即可，下一节运动到上一节位置即可
        var snakeSport = function() {
            var sHead = snakeData[0];
            // 蛇身从后往前赋值
            for (var i = snakeData.length - 1; i > 0; i--) {
                snakeData[i].left = snakeData[i - 1].left;
                snakeData[i].top = snakeData[i - 1].top;
            }
            // 蛇头变化
            sHead.left += sport.left;
            sHead.top += sport.top;
            // console.log(snakeData);
            // 渲染到页面
            that.renderChange();
        };
        return snakeSport;
    };
    // 设置蛇运动方向，相反方向无效
    Snake.prototype.setDirection = function(dire) {
        var directionChange = function(reverseD) {
            if (that.direction !== reverseD) {
                that.direction = dire;
            }
        };
        /**
         * dire: 想要改变方向
         * that.direction: 当前运动方向
         * 改变方向满足条件： 当前运动方向不能等于要改变方向的相反方向
         */
        switch (dire) {
            case 'rtl': //从右往左
                /*if (that.direction !== 'ltr') {
                    that.direction = dire;
                }*/
                directionChange('ltr');
                break;
            case 'btt': //从下往上
                /*if (that.direction !== 'ttb') {
                    that.direction = dire;
                }*/
                directionChange('ttb');
                break;
            case 'ltr': //从左到右
                /*if (that.direction !== 'rtl') {
                    that.direction = dire;
                }*/
                directionChange('rtl');
                break;
            case 'ttb': //从上往下
                /*if (that.direction !== 'btt') {
                    that.direction = dire;
                }*/
                directionChange('btt');
                break;
        }
        // console.log(that.direction);
    };
    // 蛇吃食物(蛇移动时吃)
    Snake.prototype.eat = function(food) {
        // 蛇头跟食物位置相同时，蛇吃食物, 并在蛇尾添加一节
        var sHead = this.snake[0]; //蛇头
        if (sHead.left === food.left && sHead.top === food.top) {
            // 吃食物，蛇变长
            var snakeEnd = snakeData[snakeData.length - 1],
                snakeNode = Tools.clone(snakeEnd); //复制最后蛇节
            snakeData.push(snakeNode); //添加数据
            this.addSnakeNode(snakeNode); //添加蛇节
            // console.log(snakeData, this);
            // 重新生成一个食物
            food.generatorFood(Snake.getPosData()); //实质是改变位置
        }
    };
    // 添加蛇节
    Snake.prototype.addSnakeNode = function(option) {
        option.width = option.width || this.width;
        option.height = option.height || this.height;
        var snode = new Base(this.container, option); //生成蛇节
        snode.current = snode.create(); //当前元素
        this.snake.push(snode);
        snode.render();
    };
    window.Snake = Snake;
})(window);