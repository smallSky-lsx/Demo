/*
 * @Author: Admin_CXx
 * @Date:   2021-02-22 15:29:47
 * @Last Modified by:   Admin_CXx
 * @Last Modified time: 2021-02-22 17:47:50
 */
// 最好要放在ajax请求前
Mock.mock('data/stu_info.json', {
    "status": "success",
    "msg": "查询成功",
    "data|20": [{
        "id|+1": 1,
        "name": "@CNAME",
        "birth": "@DATE('yyyy')",
        "sex|0-1": 1,
        "sNo|+1": 10000,
        "email": "@EMAIL",
        "phone": "1@NATURAL(3000000000,9000000000)",
        "address": "@COUNTY(true)",
        "appkey": "@STRING(4,7)_@DATE('T')",
        "ctime": "@DATE('T')",
        "utime": "@DATE('T')"
    }]
});
// ajax拦截后，延时响应
Mock.setup({
    timeout: 500
});
$.ajax({
    url: 'data/stu_info.json',
    type: 'get',
    dataType: 'json',
    success: function(data) {
        // 请求成功，获取到数据
        console.log(data);
        // 渲染到页面
        renderStuInfoDom(data.data);
    },
    error: function(status) {
        // 请求错误
        console.log(status);
    }
});
// 将学生信息渲染到页面
function renderStuInfoDom(data) {
    var result = data.reduce(function(accuor, item) {
        var template = `<tr>
    		<td>${item.sNo}</td>
    		<td>${item.name}</td>
    		<td>${item.sex == 1?'男':'女'}</td>
    		<td>${item.email}</td>
    		<td>${new Date().getFullYear()-item.birth}</td>
    		<td>${item.phone}</td>
    		<td>${item.address}</td>
    		<td>
        		<button class="btn edit" data-func="edit">编辑</button>
        		<button class="btn remove" data-func="del" data-sno="${item.sNo}">删除</button>
    		</td>
		</tr>`;
        accuor.push(template);
        return accuor;
    }, []).join('');
    $('#stu-list tbody').html(result);
}