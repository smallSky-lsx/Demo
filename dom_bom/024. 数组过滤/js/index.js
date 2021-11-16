// 创建仓库, 并传递初始state
var Store = createStore({
    text: '',
    sex: 'a'
});
// 后台获取的数据
var personArr = [{
    name: '王港',
    src: './imgs/3.png',
    des: '颈椎不好',
    sex: 'm'
}, {
    name: '刘莹',
    src: './imgs/5.png',
    des: '我是谁',
    sex: 'f'
}, {
    name: '王秀莹',
    src: './imgs/4.png',
    des: '我很好看',
    sex: 'f'
}, {
    name: '刘金雷',
    src: './imgs/1.png',
    des: '你没有见过陌生的脸',
    sex: 'm'
}, {
    name: '刘飞翔',
    src: './imgs/2.png',
    des: '瓜皮刘',
    sex: 'm'
}];
// 获取元素
var oWrapper = document.getElementById('wrapper'),
    oUl = oWrapper.children[1].children[0],
    oFilter = oWrapper.children[0];
// 根据后台数据，渲染列表
function renderList(data) {
    var htmlArr = data.reduce(function(accumulator, item) {
        accumulator.push('<li class="item">' +
            '<img src="' + item.src + '">' +
            '<p class="name">' + item.name + '</p>' +
            '<p class="des">' + item.des + '</p>' +
            '</li>');
        return accumulator;
    }, []);
    oUl.innerHTML = htmlArr.join('');
}

// 更新页面列表
function update() {
    renderList(lastFilter(personArr, Store.getState()));
}
// 初始化
update();
// 订阅
Store.subscribe(update);
// 输入文本展示相应好友列表
oFilter.children[0].oninput = function() {
    Store.dispatch({
        type: 'text',
        value: this.value
    });
};
// 点击按钮，按性别展示好友列表
var filterArrBtn = Array.prototype.slice.call(oFilter.children, 1);
var lastActiveBtn = filterArrBtn[filterArrBtn.length - 1]; //上一次激活按钮元素
//选中按钮样式变化
function changeActive(ele) {
    ele.className = 'btn active';
    lastActiveBtn.className = 'btn';
    lastActiveBtn = ele;
}
// 按钮注册onclick事件
filterArrBtn.forEach(function(ele) {
    ele.onclick = function() {
        changeActive(this);
        Store.dispatch({
            type: 'sex',
            value: this.getAttribute('sex')
        });
    };
});