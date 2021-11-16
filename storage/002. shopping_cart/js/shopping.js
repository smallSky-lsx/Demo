/*
 * @Author: Admin_CXx
 * @Date:   2021-02-11 16:30:51
 * @Last Modified by:   Admin_CXx
 * @Last Modified time: 2021-02-12 11:01:25
 */
var shoppingCart = {}; //存储购物车中所有商品
// 初始化购物车中已存在商品
function init() {
    shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || {};
    // 注意：若是本地存储中没有此键名，返回null
    renderCartDom();
}
init();
ajax({
    url: './data/shoppingData.json', //	./:表示根目录
    success: function(data) {
        // 渲染商品到页面
        renderGoodsDom(data);
        // 注册事件
        bindEvent();
        // console.log(data);
    }
});

// 渲染商品到页面:一起渲染
function renderGoodsDom(data) {
    function goodsColor(colors) {
        return colors.reduce(function(arr, goods, index) {
            arr.push(`<span data-id="${goods.id}" data-no="${index+1}">${goods.color}</span>`);
            return arr;
        }, []);
    }
    var htmlArr = data.reduce(function(arr, item) {
        // 遍历商品颜色
        var colors = goodsColor(item.list),
            str = `<tr>
                    	<td><img src="${item.list[0].img}" alt=""></td>
                    	<td>
                        	<p>${item.name}</p>
                        	<div class="color">${colors.join('')}</div>
                    	</td>
                    	<td>${Number(item.list[0].price).toFixed(2)} 元</td>
                    	<td>
                        	<span data-func="-">-</span>
                        	<strong>0</strong>
                        	<span data-func="+">+</span>
                    	</td>
                    	<td><button>加入购物车</button></td>
                	</tr>`;
        arr.push(str);
        return arr;
    }, []);
    document.querySelector('.shopping .product tbody').innerHTML = htmlArr.join('');
}
// 根据每行注册事件
function bindEvent() {
    var trs = document.querySelectorAll('.shopping .product tbody tr');
    for (var i = 0, len = trs.length; i < len; i++) {
        action(trs[i], i);
    }

    function action(tr, n) {
        // 注册事件、本地存储
        var tds = tr.children, //当前行里所有的td元素
            img = tds[0].children[0], //图片元素
            imgSrc = img.src, //图片地址
            gName = tds[1].children[0].innerText, //商品名
            colorParent = tds[1].children[1], //所有颜色选项的父元素
            price = parseFloat(tds[2].innerText), //商品价格
            spans = tds[3], //加减按钮的父元素
            numEle = spans.children[1], //承载商品数量容器
            joinc = tds[4].children[0]; //加入购物车按钮
        var goodsNum = 0, //商品数量
            lastSelected = null, //上一个被选中元素
            selectedColor = '', //被选中的商品颜色
            goodsId = ''; //被选中的商品id
        // 鼠标选中颜色，只能选中一个，双击取消
        colorParent.onclick = function(e) {
            var spanEle = e.target
            if (spanEle.tagName === 'SPAN') {
                // 清除上一个状态
                lastSelected && lastSelected != spanEle && (lastSelected.className = '');
                // 设置当前状态
                spanEle.className = spanEle.className ? '' : 'active';
                // 赋值为最后一个状态
                lastSelected = spanEle;
                // 图片颜色变化
                imgSrc = spanEle.className ? 'images/img_0' + (n + 1) + '-' + spanEle.dataset.no + '.png' : 'images/img_0' + (n + 1) + '-1.png';
                img.src = imgSrc;
                // 选中商品的颜色
                selectedColor = spanEle.className ? spanEle.innerText : '';
                // 选中商品的id
                goodsId = spanEle.className ? spanEle.dataset.id : '';
            }
        };
        // 加减商品数
        spans.onclick = function(e) {
            var targetEle = e.target;
            targetEle.tagName === 'SPAN' && func();

            function func() {
                var funcId = targetEle.dataset.func;
                if (funcId === '+') {
                    goodsNum++;
                } else if (funcId === '-') {
                    goodsNum--;
                    goodsNum < 0 && (goodsNum = 0);
                }
                numEle.innerText = goodsNum;
            };
        };
        // 加入购物车
        joinc.onclick = function() {
            //验证是否选中商品颜色、商品数量
            if (!selectedColor) {
                return alert('请选择商品颜色');
            }
            if (!goodsNum) {
                return alert('请选择商品数量');
            }
            if (shoppingCart[goodsId]) {
                window.confirm('购物车中已有此商品，是否修改？') && addCart();
            } else {
                addCart();
            }

        };

        function addCart() {
            shoppingCart[goodsId] = {
                "id": goodsId, //商品id
                "name": gName, //商品名
                "img": imgSrc, //商品图片地址
                "price": price, //商品价格
                "color": selectedColor, //商品颜色
                "num": goodsNum, //商品数量
                "time": new Date().getTime() //用于排序
            };
            // 本地化存储
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            // 回到默认状态
            img.src = 'images/img_0' + (n + 1) + '-1.png';
            lastSelected.className = '';
            numEle.innerText = goodsNum = 0;
            selectedColor = '';
            lastSelected = null;
            // 渲染购物车
            renderCartDom();
            // console.log(shoppingCart);
        }
    }
}

// 渲染购物车
function renderCartDom() {
    var tbody = document.querySelector('.shopping .cart tbody'),
        goods = Object.values(shoppingCart),
        totalEle = document.querySelector('.shopping .cart thead strong'),
        sumPrice = 0;
    // 排序
    goods.sort(function(g1, g2) {
        return g2.time - g1.time;
    });
    // 先清再一起渲染
    tbody.innerHTML = '';
    tbody.innerHTML = goods.reduce(function(arr, item) {
        var str = `<tr>
                    <td><img src="${item.img}" alt=""></td>
                    <td>
                        <p>${item.name}</p>
                    </td>
                    <td>${item.color}</td>
                    <td>${Number(item.price*item.num).toFixed(2)}元</td>
                    <td>x${item.num}</td>
                    <td><button data-id="${item.id}" data-func="del">删除</button></td>
                </tr>`;
        sumPrice += item.price * item.num;
        arr.push(str);
        return arr;
    }, []).join('');
    // 总额
    totalEle.innerText = Number(sumPrice).toFixed(2) + ' 元';
    // 删除购物车商品
    deleteCartGoods();
};

// 根据商品唯一id删除：删除DOM+删除数据+更新本地存储+更新总额
function deleteCartGoods() {
    var tbody = document.querySelector('.shopping .cart tbody');
    tbody.onclick = function(e) {
        var targetEle = e.target;
        if (targetEle.dataset.func === 'del') {
            var goodsId = targetEle.dataset.id,
                goods = shoppingCart[goodsId],
                price = goods.price * goods.num;
            // 删除shoppingCart中对应属性
            delete shoppingCart[goodsId];
            // 更新本地存储
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            // 删除DOM
            tbody.removeChild(targetEle.parentNode.parentNode);
            // 更新总金额
            var totalEle = document.querySelector('.shopping .cart thead strong');
            totalEle.innerText = Number(parseFloat(totalEle.innerText) - price).toFixed(2) + ' 元';
        }
    }
}

// onstorage事件，监听本地存储变化，在其他具有同样监听本地存储的页面响应，当前操作页面无响应
window.addEventListener('storage', function(e) {
    // console.log(e);
    init();
}, false);