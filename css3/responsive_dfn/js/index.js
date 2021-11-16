/*
 * @Author: Admin_CXx
 * @Date:   2021-03-11 20:48:16
 * @Last Modified by:   Admin_CXx
 * @Last Modified time: 2021-03-13 23:32:53
 */
(function() {
    var menuBtn = document.querySelector('.menu-btn'),
        ulNav = menuBtn.previousElementSibling;
    menuBtn.onclick = function() {
        ulNav.classList.toggle('show-ul');
    };
}());