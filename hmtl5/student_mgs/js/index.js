/*
 * @Author: lsx
 * @Date:   2021-03-23 16:37:25
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-03-26 07:56:55
 */
(function() {
    init();
    // 初始化
    function init() {
        // 绑定事件
        bindEvent();
        // 根据地址栏初始化Tab
        changeTab(window.location.hash || '#stu-list');
    }

    // 根据url中hash改变，切换Tab
    function changeTab(hashValue) {
        // Tab切换
        $('.tab-content-item.show-tab').removeClass('show-tab');
        $(hashValue).addClass('show-tab');
        // menu切换
        $('.aside-menu .list-item.show-list').removeClass('show-list');
        $('.aside-menu ' + hashValue.replace('#', '.')).addClass('show-list');
    }

    function bindEvent() {
        var list = $('.wrapper .drop-list');
        // 绑定click事件，点击btn，上拉、下拉菜单
        $('.wrapper header .btn').click(function() {
            list.slideToggle();
        });
        // 绑定click事件，点击list-item，上拉菜单
        list.on('click', '.list-item', function() {
            $('.wrapper header .btn').triggerHandler('click');
            $('.aside-list .' + $(this).data('id')).trigger('click');
        });
        // 绑定hashchange事件，地址栏hash改变切换相应Tab
        $(window).on('hashchange', function() {
            var hashValue = window.location.hash;
            changeTab(hashValue);
        });
        // 绑定click事件，点击list-item切换到相应Tab
        $('.wrapper .aside-list').on('click', '.list-item', function() {
            var hashValue = $(this).data('id');
            window.location.hash = hashValue;
        });
    }
}());