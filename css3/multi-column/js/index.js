/**
 * @Author: Admin_CXx
 * @Date:   2020-12-16 13:33:18
 * @Last Modified by:   Admin_CXx
 * @Last Modified time: 2021-03-01 23:11:45
 */

// 实现左右翻页功能
(function() {
    var oWrapper = document.getElementsByClassName('wrapper')[0],
        oContent = oWrapper.getElementsByClassName('content')[0],
        oAlert = oWrapper.getElementsByClassName('alert')[0];
    var moveLength = oContent.offsetWidth + parseInt(getComputedStyle(oContent)['columnGap']), //oContent盒子宽度+每列间的间距
        totalCount = Math.ceil(oContent.scrollWidth / moveLength); //oContent滚动宽度 / 移动宽度
    console.log(totalCount, oContent.scrollWidth, oContent.offsetWidth);
    var count = 0, //计数张数
        flag = true, //节流
        timer = null;
    touch(oWrapper, oContent, function() {
        console.log(flag);
        if (flag) {
            clearTimeout(timer);
            flag = false;
            count++;
            if (count < totalCount) {
                oAlert.classList.remove('show');
                oContent.style.transform = 'translateX(calc(' + (-moveLength * count) + 'px))';
            } else {
                oAlert.innerText = '已是最后一张，到头了！';
                oAlert.classList.add('show');
                count = totalCount - 1;
            }
            timer = setTimeout(function() {
                flag = true;
            }, 1100);
        }
    }, function() {
        console.log(flag);
        if (flag) {
            clearTimeout(timer);
            falg = false;
            count--;
            if (count >= 0) {
                oAlert.classList.remove('show');
                oContent.style.transform = 'translateX(calc(' + (-moveLength * count) + 'px))';
            } else {
                // 滚动到第一张
                oAlert.innerText = '前面没有了，向右滑吧！';
                oAlert.classList.add('show');
                count = 0;
            }
            timer = setTimeout(function() {
                flag = true;
            }, 1100);
        }
    });
}());
/*按下鼠标，移动鼠标，松开鼠标*/
function touch(wrap, content, leftSlide, rightSlide) {
    wrap.onmousedown = function(ev) {
        // 开始记录起始位置和起始时间戳
        var startPos = ev.pageX, //开始位置
            endPos = 0, //结束位置
            startTime = +new Date(), //开始时间戳
            endTime = 0; //结束时间戳
        document.onmouseup = function(ev) {
            // 记录结束位置与结束时间戳
            endPos = ev.pageX;
            endTime = +new Date();
            var len = endPos - startPos,
                duration = endTime - startTime;
            // 检测有效向左或向右滑动时间：150-500ms
            // 检测有效向左或向右滑动距离：50-盒子宽度
            if ((Math.abs(len) >= 50 && Math.abs(len) <= wrap.clientWidth) && (duration >= 150 && duration <= 500)) {
                if (len > 0) {
                    // 向右有效滑动
                    console.log('right');
                    rightSlide();
                } else {
                    // 向左有效滑动
                    console.log('left');
                    leftSlide();
                }
            }
            this.onmouseup = null;
        };
    };
}