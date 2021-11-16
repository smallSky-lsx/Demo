var canvas = document.getElementById('snow');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

function Snow(x, y, scale, rotate, speedX, speedY, speedR) {
    this.x = x; // 雪花水平位置
    this.y = y; // 雪花垂直位置
    this.r = 8; // 雪花半径
    this.scale = scale; // 缩放
    this.rotate = rotate; // 旋转
    this.speedX = speedX; //水平速度
    this.speedY = speedY; //垂直速度
    this.speedR = speedR; //旋转速度
}
Snow.prototype.render = function() {
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.translate(this.x, this.y); // 平移
    ctx.rotate(this.rotate * Math.PI / 180); // 旋转
    ctx.scale(this.scale, this.scale); // 缩放
    ctx.beginPath();
    ctx.moveTo(-this.r, 0);
    ctx.lineTo(this.r, 0);

    var disX = this.r * Math.sin(30 * Math.PI / 180),
        disY = this.r * Math.sin(60 * Math.PI / 180);
    ctx.moveTo(-disX, -disY);
    ctx.lineTo(disX, disY);
    ctx.moveTo(-disX, disY);
    ctx.lineTo(disX, -disY);

    ctx.stroke();
    ctx.restore();
};

function init() {
    // 创建雪花初始位置
    var amount = 100,
        snowArr = []; // 存储雪花
    for (var i = amount; i > 0; i--) {
        var x = getRandomInt(0, canvas.width), // 0-canvas.width
            y = getRandomInt(-100, 100), // -100-100
            scale = getRandomInt(50, 100) / 100, // 0.3-1
            rotate = getRandomInt(0, 60), // 0-60
            speedX = getRandomInt(10, 20) / 10, //1-2
            speedY = getRandomInt(30, 40) / 10, //5-6
            speedR = getRandomInt(20, 60) / 10; //2-6
        // 闭包
        (function(x, y, scale, rotate, speedX, speedY, speedR) {
            // 在0-8s生成100个雪花
            setTimeout(function() {
                var snow = new Snow(x, y, scale, rotate, speedX, speedY, speedR);
                snow.render();
                snowArr.push(snow);
            }, getRandomInt(0, 8000));
        }(x, y, scale, rotate, speedX, speedY, speedR));
    }
    snowing(snowArr);
}
init();

function snowing(snowArr) {
    function autoFall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowArr.forEach(function(snow) {
            snow.x = (snow.x + snow.speedX) % canvas.width;
            snow.y = (snow.y + snow.speedY) % canvas.height;
            snow.rotate += snow.speedR;
            snow.render();
        });
    }
    var timer = setInterval(autoFall, 30);
    document.addEventListener('visibilitychange', function() {
        if (this.hidden) {
            clearInterval(timer);
        } else {
            clearInterval(timer);
            timer = setInterval(autoFall, 30);
        }
    }, false);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
document.onclick = function(e) {
    if (!this.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        this.exitFullscreen();
    }
};