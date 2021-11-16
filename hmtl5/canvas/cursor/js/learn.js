/*
 * @Author: lsx
 * @Date:   2020-12-16 13:33:18
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-03-23 15:54:50
 */
(function() {
    var canvas = document.getElementById('cursor');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function Circle(x, y) {
        this.x = x; //圆水平位置
        this.y = y; //圆垂直位置
        this.r = 15; // 圆半径
        this.color = 'rgb(' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ')';
        this.xs = getRandomInt(-50, 100) / 100 * 3; // 水平方向距离
        this.ys = getRandomInt(-50, 100) / 100 * 3; // 垂直方向距离
        this.alpha = 1; // 透明度
    }
    Circle.prototype = {
        constructor: Circle,
        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.globalCompositeOperation = 'lighter';
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, 0);
            ctx.fill();

            this.update();
        },
        update() {
            this.x += this.xs;
            this.y += this.ys;
            this.alpha *= 0.98;
        }
    };
    var circleArr = [];
    canvas.onmousemove = function(e) {
        var circle = new Circle(e.clientX, e.clientY);
        circle.draw();
        circleArr.push(circle);
    };

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circleArr.forEach(function(circle, i) {
            if (circle.alpha <= 0.05) {
                circleArr.splice(i, 1);
            } else {
                circle.draw();
            }
        });
        window.requestAnimationFrame(render);
    };
    render();
})();