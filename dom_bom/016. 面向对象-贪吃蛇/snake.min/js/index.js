(function methodName(b){var a={$id:function(c){return document.getElementById(c)},getRandomInt:function(d,c){return Math.floor(Math.random()*(c-d+1))+d},getRandomBgc:function(e,d){var h=this.getRandomInt(e,d),f=this.getRandomInt(e,d),c=this.getRandomInt(e,d);return"rgb("+h+","+f+","+c+")"},getRandomPos:function(d,c){return{left:this.getRandomInt(0,c),top:this.getRandomInt(0,d)}},inherit:function(c,e){var d=function(){};return function(){d.prototype=e.prototype;c.prototype=new d();c.prototype.constructor=c;c.prototype.__uber__=e.prototype}}};b.Tools=a})(window);(function(c){var a=c.Tools;var b=function(d,e){e=e||{};this.container=d;this.position=e.position||"absolute";this.top=e.top||0;this.left=e.left||0;this.width=e.width||20;this.height=e.height||20;this.zIndex=e.zIndex||0;this.color=e.color||"#00f"};b.prototype={constructor:b,getCol:function(){return Math.floor(this.container.clientWidth/this.width)-1},getRow:function(){return Math.floor(this.container.clientHeight/this.height)-1},render:function(){var d=this.current.style;d.position=this.position;d.width=this.width+"px";d.height=this.height+"px";d.zIndex=this.zIndex;this.renderChange();this.container.appendChild(this.current)},renderChange:function(){var d=this.current.style;d.top=this.top*this.height+"px";d.left=this.left*this.width+"px";d.backgroundColor=this.color},create:function(d){return document.createElement(d||"div")}};c.Base=b})(window);(function(d){var a=d.Tools,b=d.Base;var c=function(e,f){f=f||{};b.call(this,e,f);this.current=this.create(f.tagName)};a.inherit(c,b)();c.prototype.generatorFood=function(f){var g=a.getRandomPos(this.getRow(),this.getCol()),e=(f&&f.length)?!(f.some(function(h){return h.left===g.left&&h.top===g.top})):true;if(e){this.left=g.left;this.top=g.top;this.color=a.getRandomBgc(0,255);this.render();return}this.generatorFood(f)};d.Food=c})(window);(function(g){var c=g.Tools,f=g.Food,d=g.Base,e=null,a=[{top:4,left:4,zIndex:1,color:"#f40"},{top:4,left:3,color:"#00f"},{top:4,left:2,color:"#00f"}];var b=function(i,j){j=j||{};this.container=i;this.width=j.width||20;this.height=j.height||20;this.snake=[];this.speed=j.speed||1;this.direction=j.direction||"ltr";e=this};b.getPosData=function(){if(a&&a.length){return a.map(function(i){return{left:i.left,top:i.top}})}return[]};b.setData=function(i,k){if(i<a.length&&k){for(var j in k){if(k.hasOwnProperty(j)){a[i][j]=k[j]}}}};c.inherit(b,d)();b.prototype.remove=function(){this.snake.forEach(function(i){i.container.removeChild(i.current)});this.snake.length=0};b.prototype.render=function(){a.forEach(function(i){this.addSnakeNode(i)},this)};b.prototype.renderChange=function(){a.forEach(function(j,i){var k=this.snake[i];d.call(k,this.container,j);k.renderChange()},this)};var h=function(i){var k=1,j=function(l,m){return{left:l,top:m}};switch(i){case"rtl":return j(-k,0);case"btt":return j(0,-k);case"ltr":return j(k,0);case"ttb":return j(0,k)}};b.prototype.move=function(){var j=h(e.direction);var i=function(){var l=a[0];for(var k=a.length-1;k>0;k--){a[k].left=a[k-1].left;a[k].top=a[k-1].top}l.left+=j.left;l.top+=j.top;e.renderChange()};return i};b.prototype.setDirection=function(i){var j=function(k){if(e.direction!==k){e.direction=i}};switch(i){case"rtl":j("ltr");break;case"btt":j("ttb");break;case"ltr":j("rtl");break;case"ttb":j("btt");break}};b.prototype.eat=function(k){var j=this.snake[0];if(j.left===k.left&&j.top===k.top){var i=a[a.length-1],l={left:i.left,top:i.top,color:"#00f"};a.push(l);this.addSnakeNode(l);k.generatorFood(b.getPosData())}};b.prototype.addSnakeNode=function(j){j.width=j.width||this.width;j.height=j.height||this.height;var i=new d(this.container,j);i.current=i.create();this.snake.push(i);i.render()};g.Snake=b})(window);(function(e){var b=e.Tools,d=e.Food,a=e.Snake,c=null;var f=function(g){c=this;this.food=new d(g);this.snake=new a(g);this.startBtn=b.$id("start");this.pauseBtn=b.$id("pause");this.reloadBtn=b.$id("reload");this.timerId=null;this.isStart=false;this.isPause=true;this.isEnd=false;this.food.generatorFood(a.getPosData());this.snake.render()};f.prototype.ruler=function(){var i=this.snake,l=i.snake[0],k=l.left,j=l.top;var h=null;if(k<0&&j>=0){h={left:-1}}else{if(j<0&&k>=0){h={top:-1}}else{if(k>i.getCol()&&j>=0){h={left:i.getCol()+1}}else{if(j>i.getRow()&&k>=0){h={top:i.getRow()+1}}}}}var m=a.getPosData();m.shift();var g=m.length?!(m.some(function(n){return n.left===k&&n.top===j})):true;if(h||!g){e.clearInterval(this.timerId);this.timerId=null;console.log("游戏结束，请重新开始！");this.startBtn.onclick=null;this.pauseBtn.onclick=null;this.isEnd=true}};f.prototype.init=function(){var h=function(){c.snake.move()();c.snake.eat(c.food);c.ruler()};var g={37:"rtl",38:"btt",39:"ltr",40:"ttb"};document.onkeydown=function(i){i=i||e.event;c.snake.setDirection(g[i.keyCode])};this.startBtn.onclick=function(){if(c.isPause){console.log("游戏开始!");c.timerId=e.setInterval(h,250/c.snake.speed);c.isStart=true;c.isPause=false}};this.pauseBtn.onclick=function(){if(!c.isPause){console.log("游戏暂停!");
e.clearInterval(c.timerId);c.timerId=null;c.isPause=true}};this.reloadBtn.onclick=function(){var i=false;c.isEnd&&(i=true);!i&&c.isStart&&e.confirm("正在游戏是否要重新开始？")&&(i=true);if(i){console.log("重新载入游戏...");e.location.reload()}}};f.start=function(){var g=new f(b.$id("map"));g.init()};f.start()})(window);