/*
 * @Author: Admin_CXx
 * @Date:   2020-12-16 13:33:18
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-03-22 13:43:12
 */

(function() {
    // 获取元素
    var videoPlayer = document.getElementsByClassName('video-player')[0],
        video = videoPlayer.getElementsByTagName('video')[0],
        menu = videoPlayer.getElementsByClassName('menu')[0],
        play = menu.getElementsByClassName('play')[0],
        time = menu.getElementsByClassName('time')[0],
        progressBar = menu.getElementsByClassName('progress-bar')[0],
        playLen = progressBar.getElementsByClassName('play-len')[0],
        circle = progressBar.getElementsByClassName('circle')[0],
        quickPlay = menu.getElementsByClassName('quick-play')[0],
        quickPlayItemList = menu.getElementsByClassName('quick-play-items')[0],
        quickPlayItems = quickPlayItemList.getElementsByClassName('item'),
        addVolume = menu.getElementsByClassName('add-volume')[0],
        reduceVolume = menu.getElementsByClassName('reduce-volume')[0],
        fullScreen = menu.getElementsByClassName('full-screen')[0];
    // 鼠标移入事件
    videoPlayer.onmouseenter = function() {
        this.classList.add('controls');
    };
    // 鼠标移出事件
    videoPlayer.onmouseleave = function() {
        this.classList.remove('controls');
    };
    // 播放、暂停
    play.onclick = function() {
        if (video.paused) { // 判断是否暂停状态
            video.play(); // 播放
            this.innerText = '暂停';
        } else {
            video.pause(); // 暂停
            this.innerText = '播放';
        }
    };
    document.onfullscreenchange = function(){
        if(this.fullscreenElement){
            setTimeout(function(){
                videoPlayer.onmouseleave();
            }, 500);
            menu.onmouseenter = function(){
                videoPlayer.onmouseenter();
            };
            menu.onmouseleave = function(){
                videoPlayer.onmouseleave();
            };
        }else {
            setTimeout(function(){
                videoPlayer.onmouseenter();
            }, 500);
            menu.onmouseenter = null;
            menu.onmouseleave = null;
        }
    };
    // 跳转到指定播放时间
    progressBar.onclick = function(e) {
        var client = this.getBoundingClientRect(),
            left = e.clientX - client.left,
            len = (left / client.width) * video.duration;
        video.currentTime = len;

    };
    quickPlay.onclick = function() {
        quickPlayItemList.classList.toggle('show-list');
    };
    quickPlayItemList.onclick = function(e) {
        var targetELe = e.target,
            rate = 1,
            txt = '正常';
        if (targetELe.dataset.quick !== undefined) {
            switch (targetELe.dataset.quick) {
                case '0':
                    break;
                case '1':
                    rate = 1.25;
                    txt = 'x1.25';
                    break;
                case '2':
                    rate = 1.5;
                    txt = 'x1.5';
                    break;
                case '3':
                    rate = 2;
                    txt = 'x2.0';
                    break;
            }
            video.playbackRate = rate;
            quickPlay.innerText = txt;
            quickPlay.onclick();
        }
    };
    var volume = 100, //音量
        count = 5;
    addVolume.onclick = function() {
        volume += count;
        volume = volume > 100 ? 100 : volume;
        video.volume = volume / 100;
        console.log(video.volume);
    };
    reduceVolume.onclick = function() {
        volume -= count;
        volume = volume < 0 ? 0 : volume;
        video.volume = volume / 100;
        console.log(video.volume);
    };
    // 全屏
    fullScreen.onclick = function() {
        if(document.fullscreenElement){ // 获取文档中全屏元素
            document.exitFullscreen();
        }else {
            videoPlayer.requestFullscreen();
        }
    };
    var timer = setInterval(function() {
        var total = video.duration, //总时间，秒数
            cTtime = video.currentTime; //当前时间
        time.innerText = zeroFill(cTtime) + ' / ' + zeroFill(total);
        var width = (cTtime / total) * progressBar.clientWidth;
        playLen.style.width = width + 'px';
        circle.style.left = width + 'px';
        if (total === cTtime) {
            video.pause();
            play.innerText = '播放';
        }
    }, 1000);

    function zeroFill(num) {
        var s = parseInt(num % 60),
            m = parseInt(num / 60);
        s = s > 9 ? s : '0' + s;
        m = m > 9 ? m : '0' + m;
        return m + ':' + s;
    }
}());