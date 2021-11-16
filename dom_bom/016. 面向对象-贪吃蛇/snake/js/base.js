(function(window) {
    var Tools = window.Tools;
    var Base = function(container, options) {
        options = options || {};
        this.container = container; //父容器
        this.position = options.position || 'absolute'; //定位
        this.top = options.top || 0; //垂直位置
        this.left = options.left || 0; //水平位置
        this.width = options.width || 20; //宽度
        this.height = options.height || 20; //高度
        this.zIndex = options.zIndex || 0; //层叠
        this.color = options.color || '#00f'; //背景
    };
    Base.prototype = {
        constructor: Base,
        getCol: function() { //获取列数
            return Math.floor(this.container.clientWidth / this.width) - 1;
        },
        getRow: function() { //获取行数
            return Math.floor(this.container.clientHeight / this.height) - 1;
        },
        render: function() { //固定样式渲染+变化样式渲染
            var that = this.current.style;
            that.position = this.position;
            that.width = this.width + 'px';
            that.height = this.height + 'px';
            that.zIndex = this.zIndex;
            this.renderChange();
            // 将当前元素追加到父容器中
            this.container.appendChild(this.current);
        },
        renderChange: function() { //变化样式渲染
            var that = this.current.style;
            that.top = this.top * this.height + 'px';
            that.left = this.left * this.width + 'px';
            that.backgroundColor = this.color;
        },
        create: function(tagName) { //创建元素
            return document.createElement(tagName || 'div');
        }
    };
    window.Base = Base;
})(window);