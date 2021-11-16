// 通过id获取元素
function $id(id) {
    return document.getElementById(id);
}
// 集中管理事件
function bindEvent() {
    // 切换菜单项行为
    var selectedEle = document.querySelector('.selected'),
        showEle = document.querySelector('.stu-show');
    $id('menu').onclick = function(e) {
        var targetEle = e.target;
        if (targetEle.tagName === 'DD') {
            // 显示选中菜单、取消未选中菜单状态
            selectedEle.classList.remove('selected');
            targetEle.classList.add('selected');
            selectedEle = targetEle;
            // 显示对应id的元素，隐藏其他元素
            showEle.classList.remove('stu-show');
            var stuEle = $id(targetEle.dataset.id);
            stuEle.classList.add('stu-show');
            showEle = stuEle;
            // 点击学生列表查询所有学生
            if (targetEle.dataset.id === 'stu-list') {
                //更新学生列表
                updateStudentList();
            }
        }
    };
    // 新增学生行为
    $id('submit-stu').onclick = function(e) {
        // 取消元素事件默认行为
        e.preventDefault();
        // 获取表单数据，并校验
        var returnData = getFormData($id('stu-add').children[0]);
        if (returnData.status === 'success') {
            // 表单数据校验成功-添加数据
            addOneStudent(returnData.data);
        } else {
            // 表单数据校验失败
            alert(returnData.msg);
        }
    };
    // 根据学号删除、编辑学生
    $id('stu-list').children[0].children[1].onclick = function(e) {
        var targetEle = e.target;
        // 根据学号删除学生
        if (targetEle.dataset.func == 'del') {
            var sNo = targetEle.dataset.sno;
            confirm('是否删除学号为' + sNo + '的学生?') && delOneStudent(sNo);
        }
        // 编辑学生
        if (targetEle.dataset.func == 'edit') {
            // 显示模态框
            var cover = $id('cover');
            cover.classList.add('active');
            // 回填表单数据
            var index = targetEle.dataset.index;
            listData && backFillFormData(cover.children[0], listData[index]);
            // 点击修改表单外的元素，隐藏模态框
            cover.onclick = function(e) {
                if (e.target === this) {
                    cover.classList.remove('active');
                }
            };

        }
    };
    // 根据学号修改学生信息
    $id('alter-stu').onclick = function(e) {

        // 取消元素事件默认行为
        e.preventDefault();
        var alterData = getFormData(document.querySelector('.modal'));
        if (alterData.status == 'success') {
            alterOneStudent(alterData.data);
        } else {
            console.log(alterData.msg);
        }
    };

}
bindEvent();

// 获取表单数据并校验
function getFormData(form) {
    // 获取数据
    var name = form.name.value,
        sex = form.sex.value,
        email = form.email.value,
        sNo = form.sNo.value,
        birth = form.birth.value,
        phone = form.phone.value,
        address = form.address.value;
    //校验数据
    var success = {
            status: 'success',
            data: { name, sex, email, sNo, birth, phone, address } //对象同名省略
        },
        fail = {
            status: 'fail',
            msg: ''
        };
    // 姓名：不能为空、地址: 不能为空
    if (!name || !sex || !email || !sNo || !birth || !phone || !address) {
        fail.msg = '内容为空';
        return fail;
    }
    // 性别: 0或1
    var sexReg = /^[01]$/;
    if (!sexReg.test(sex)) {
        fail.msg = '性别只能为0或1';
        return fail;
    }
    // 邮箱: 
    var emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!emailReg.test(email)) {
        fail.msg = '邮箱格式不正确';
        return fail;
    }
    // 学号: 4到8数
    var sNoReg = /^\d{4,6}$/
    if (!sNoReg.test(sNo)) {
        fail.msg = '学号4-6位';
        return fail;
    }
    // 出生年: 10~80岁, 1941~2011
    if (birth < 1941 || birth > 2011) {
        fail.msg = '出生年月在1941-2011间';
        return fail;
    }
    // 手机: 11位数，第一位为1，第二位不能是1、0
    var phoneReg = /^1[2-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
        fail.msg = '手机号为11位数';
        return fail;
    }
    return success;
}
// 表单数据回填
function backFillFormData(form, data) {
    if (data) {
        for (var prop in data) {
            if (form[prop]) {
                form[prop].value = data[prop];
            }
        }
    }
}
/**
 * @param {String} method 请求方式  需要大写
 * @param {String} url    请求地址(数据接口)  
 * @param {String} data     请求数据(queryString)
 * @param {Function} success 成功的回调函数
 * @param {Boolean} isAsync 是否异步 true：异步(不阻塞其他程序执行) false：同步(阻塞其他程序执行)
 */
function ajax(method, url, data, success, isAsync) {
    // get  url+'?'+data
    // post
    var xhr = null;
    if (window.XMLHttpRequest) { //检测浏览器是否兼容XMLHttpRequest
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    method = method.toUpperCase();
    if (method === 'GET') {
        xhr.open(method, url + '?' + data, isAsync);
        xhr.send();
    } else if (method === 'POST') {
        xhr.open(method, url, isAsync);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    // xhr.readyState   1-4     监听是否有响应
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) { //请求成功
            if (xhr.status == 200) { //响应成功
                success(JSON.parse(xhr.responseText));
            }
        }
    };
}
// 渲染列表
function renderList(data) {
    var stuListBody = $id('stu-list').children[0].children[1],
        htmlStr = data.reduce(function(accu, item, index) {
            // 利用ES6模板字符串：`${变量或表达式}`
            accu += `<tr>
                        <td>${item.sNo}</td>
                        <td>${item.name}</td>
                        <td>${item.sex == '1'?'女':'男'}</td>
                        <td>${item.email}</td>
                        <td>${new Date().getFullYear() - item.birth}</td>
                        <td>${item.phone}</td>
                        <td>${item.address}</td>
                        <td>
                            <button class="btn edit" data-func="edit" data-index="${index}">编辑</button>
                            <button class="btn remove" data-func="del" data-sno="${item.sNo}">删除</button>
                        </td>
                    </tr>`;
            return accu;
        }, '');
    stuListBody.innerHTML = htmlStr;
}
var appkey = 'cenxi_1612142272813',
    method = 'get',
    host = 'open.duyiedu.com',
    isAsync = true, // true, 异步；false，同步
    listData = null; //存储列表数据
// 封装ajax请求数据
function transferData(method, url, data, callback, isAsync) {
    var queryStr = '';
    if (typeof data == 'object') {
        // 对象合并
        Object.assign(data, { appkey });
        var queryStrArr = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                queryStrArr.push(key + '=' + data[key]);
            }
            queryStr = queryStrArr.join('&');
        }
    } else if (typeof data == 'string') {
        queryStr = data;
    }
    ajax(method, 'http://' + host + url, queryStr, function(data) {
        if (data.status === 'success') {
            callback(data);
        } else {
            console.log(data.msg);
        }
    }, isAsync);
}
// 查询所有学生
function queryAllStudent() {
    transferData(method, '/api/student/findAll', {}, function(data) {
        // 渲染到页面
        listData = data.data;
        renderList(listData);
    }, isAsync);
}
// 新增学生
function addOneStudent(requestData) {
    transferData(method, '/api/student/addStudent', requestData, function(data) {
        // 添加成功
        alert(data.msg);
        document.querySelector('dd[data-id=stu-list]').click();
    }, isAsync);
}
// 根据学号修改该学生
function alterOneStudent(alterData) {
    transferData(method, '/api/student/updateStudent', alterData, function(data) {
        // 修改成功
        alert(data.msg);
        updateStudentList();
        // 隐藏cover
        $id('cover').classList.remove('active');
    }, isAsync);
}
// 根据学号删除学生
function delOneStudent(sNo) {
    transferData(method, '/api/student/delBySno', { sNo }, function(data) {
        // 删除成功
        alert(data.msg);
        updateStudentList();
    }, isAsync);
}
// 更新学生列表
function updateStudentList() {
    queryAllStudent();
}
updateStudentList(); //初始化