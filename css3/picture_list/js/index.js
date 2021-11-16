/*
 * @Author: Admin_CXx
 * @Date:   2021-03-09 20:01:18
 * @Last Modified by:   Admin_CXx
 * @Last Modified time: 2021-03-10 10:22:16
 */
var oWrap = document.getElementById('wrap');
var oUl = oWrap.children[0];
var oUlis = oUl.children;
var oCloses = oUl.querySelectorAll('.inner .close');
// 延迟200ms，再去掉init类
var timer = setTimeout(function() {
    oUl.classList.remove('init');
}, 200);
// 放大、、缩小
var lastActive = null;
Array.from(oUlis).forEach(function(prev, index) {
    // 展开图片
    prev.onclick = openPicture.bind(prev);
    // 关闭图片
    oCloses[index].onclick = closePicture.bind(prev);
});

function openPicture() {
    if (!this.classList.contains('active')) {
        oUl.setAttribute('id', 'displayImg');
        lastActive && lastActive.classList.remove('active');
        this.classList.add('active');
        lastActive = this;
    }
}

function closePicture(e) {
    if (this.classList.contains('active')) {
        oUl.removeAttribute('id', 'displayImg');
        this.classList.remove('active');
        lastActive = null;
        e.stopPropagation();
    }
}