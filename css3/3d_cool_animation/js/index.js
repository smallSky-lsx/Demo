/*
 * @Author: Admin_CXx
 * @Date:   2021-03-10 18:47:43
 * @Last Modified by:   Admin_CXx
 * @Last Modified time: 2021-03-11 15:09:03
 */
var Box = {
    content: document.getElementById('content'),
    boxs: function() {
        return this.content.querySelectorAll('.box');
    },
    // 为盒子每一面添加背景
    addBoxBg: function(bgArr) {
        var boxBgArr = bgArr.reduce(function(accuor, prev, index) {
            accuor.push(`#content .wrap .box:nth-of-type(${index+1}) div {background-color: ${prev};background-image: url(images/${index+1}.png);}`);
            return accuor;
        }, []);
        var oStyle = document.createElement('style');
        oStyle.innerText = boxBgArr.join('');
        document.head.appendChild(oStyle);
    },
    // 根据进入盒子方向旋转、改变body背景颜色
    boxRotate: function(bodyBgArr, rotateClassArr) {
        var that = this;
        that.boxs().forEach(function(box, index) {
            // 获取盒子大小及其相对视口距离
            box.info = box.getBoundingClientRect();
            // 绑定鼠标进入盒子事件
            box.onmouseenter = mouseEnterBox.bind(box);
            // 绑定鼠标离开盒子事件
            box.onmouseleave = mouseLeaveBox.bind(box);
        });

        function mouseEnterBox(e) {
            // 判断进入盒子的方向,并旋转
            this.direction = that.mouseEnterDir(e, this);
            this.classList.add(rotateClassArr[this.direction]);
            // 随机改变body，背景颜色
            var rNum = Math.floor(Math.random() * bodyBgArr.length); //[0, bodyBgArr.length-1]
            document.body.style.backgroundColor = bodyBgArr[rNum];
        }

        function mouseLeaveBox() {
            this.classList.remove(rotateClassArr[this.direction]);
        }
    },
    // 获取进入盒子方向
    mouseEnterDir: function(e, box) {
        var info = box.info,
            x = e.clientX - info.left - info.width / 2,
            y = e.clientY - info.top - info.height / 2,
            direction = Math.round(((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
        return direction;
    },
    // content盒子跟随鼠标旋转
    contentRotate: function() {
        var clientInfo = document.documentElement.getBoundingClientRect();
        document.onmousemove = function(e) {
            var x = Math.round((e.clientX / clientInfo.width - 0.5) * 20),
                y = Math.round((0.5 - e.clientY / clientInfo.height) * 20);
            this.content.style.transform = 'rotateX(' + y + 'deg) rotateY(' + x + 'deg)';
        }.bind(this);
    }

};
(function() {
    var BOX_BG = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f'], //box背景色
        BODY_BG = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#616161'], //body背景色
        ROTATE_DIR_CLASS = ['rotate-top', 'rotate-right', 'rotate-bottom', 'rotate-left']; //0: top,1:right, 2:bottom, 3:left
    // 为盒子添加背景
    Box.addBoxBg(BOX_BG);
    // 根据进入盒子方向旋转、改变body背景颜色
    Box.boxRotate(BODY_BG, ROTATE_DIR_CLASS);
    // content盒子跟随鼠标旋转
    Box.contentRotate();
}());