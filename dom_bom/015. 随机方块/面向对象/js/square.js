(function(window) {
    var Tools = window.Tools;
    var Square = function(container, options) {
        options = options || {};
        // 方块具有的私有属性:
        this.current = document.createElement('div');
        this.container = container;
        this.position = options.position || 'absolute';
        this.left = options.left || 0;
        this.top = options.top || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.col = Math.floor(this.container.clientWidth / this.width) - 1;
        this.row = Math.floor(this.container.clientHeight / this.height) - 1;
        this.backgroundColor = options.backgroundColor || '#fff';
        this.container.appendChild(this.current); //追加到容器末尾
        this.render(); //渲染样式
    };
    Square.prototype = {
        // 方块具有的共有成员：
        constructor: Square,
        render: function() { //渲染固有样式+变化样式
            var that = this.current;
            that.style.position = this.position;
            that.style.width = this.width + 'px';
            that.style.height = this.height + 'px';
            this.renderChange();
        },
        renderChange: function() { //渲染变化样式
            var that = this.current;
            that.style.left = this.left + 'px';
            that.style.top = this.top + 'px';
            that.style.backgroundColor = this.backgroundColor;
        }
    };

    window.Square = Square; //暴露到外部
})(window);