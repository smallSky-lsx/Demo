/*
 * @Author: lsx
 * @Date:   2021-03-24 11:59:11
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-03-24 21:19:44
 */
// 工具包
(function(tool) {
    tool.formatURL = function(url) {
        var queryStr = decodeURIComponent(url).split('?')[1],
            queryArr = queryStr.split('&'),
            result = queryArr.reduce(function(accuor, prev) {
                var arr = prev.split('='),
                    key = arr[0],
                    value = arr[1];
                accuor[key] = value;
                return accuor;
            }, {});
        return result;
    };
})(window.Tools || (window.Tools = {}));
// 扩展jQuery.fn
(function($) {
    function Page(options, wrap) {
        this.total = options.total || 1; //总页数
        this.current = options.current || 1; //当前页
        this.wrap = wrap;
        this.loadPage = options.loadPage || function() {};
    }
    Page.count = 3; //当前页前后显示的页数
    Page.prototype.init = function() {
        // 结构
        this.renderPage();
        // 样式-CSS
        // 功能
        this.bindEvent();
    };
    Page.prototype.renderPage = function() {
        // 先删除已存在的，再重新构建
        $(this.wrap).find('.page-wrapper').remove();
        var pageWrapper = $('<ul class="page-wrapper" />');
        // 上一页
        (this.current > 1) && pageWrapper.append('<li class="pre-page">上一页</li>');
        // 第一页
        $('<li class="num-page">1</li>').appendTo(pageWrapper).addClass((this.current == 1) ? 'current' : '');
        // 左边省略号
        (this.current - (Page.count + 2) > 0) && $('<li class="page-omit">...</li>').appendTo(pageWrapper);
        for (var i = 2, len = this.total - 1; i <= len; i++) {
            if (i >= this.current - Page.count && i <= this.current + Page.count) {
                $('<li class="num-page">' + i + '</li>').appendTo(pageWrapper).addClass((this.current == i) ? 'current' : '');
            }
        }
        // 右边省略号
        (this.total - this.current - (Page.count + 1) > 0) && $('<li class="page-omit">...</li>').appendTo(pageWrapper);
        // 最后一页
        $('<li class="num-page">' + (this.total) + '</li>').appendTo(pageWrapper).addClass((this.current == this.total) ? 'current' : '');
        // 下一页
        (this.current != this.total) && pageWrapper.append('<li class="next-page">下一页</li>');
        $(this.wrap).append(pageWrapper);
    };
    Page.prototype.bindEvent = function() {
        var that = this;
        // 上一页
        $('.pre-page', that.wrap).on('click', function() {
            if (that.current != 1) {
                that.current--;
                that.loadPage(that.current);
            }
        });
        // 页数点击
        $('.page-wrapper', that.wrap).on('click', '.num-page', function() {
            that.current = Number($(this).text());
            $(this).addClass('current').siblings('.num-page').removeClass('current');
            that.loadPage(that.current);
        });
        // 下一页
        $('.next-page', that.wrap).on('click', function() {
            if (that.current != that.total) {
                that.current++;
                that.loadPage(that.current);
            }
        });
    };
    $.fn.turnPage = function(options) {
        var page = new Page(options, this);
        page.init();
    };
})(jQuery);