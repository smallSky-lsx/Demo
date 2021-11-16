/*
 * @Author: lsx
 * @Date:   2021-03-23 16:37:25
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-03-24 20:33:37
 */

(function() {
    var stuData,
        url = 'http://open.duyiedu.com', //接口协议+域名
        appkey = 'cenxi_1612142272813',
        index, //数据索引
        page = 1, //当前页
        pageSize = 10, // 每页数量
        totalPage = 1; //总页数

    function bindEvent() {
        // menu切换及对应块
        $('.menu').on('click', 'dd', function() {
            // menu切换
            $(this).addClass('selected').siblings('.dd').removeClass('selected');
            var id = $(this).data('id'); //块切换标识
            $('#' + id).fadeIn().siblings().fadeOut();
        });
        // 编辑按钮
        $('#stu-list tbody').on('click', '.edit', function() {
            $('#cover').slideDown();
            index = $(this).parents('tr').index();
            var stu = stuData[index];
            dataFillForm(stu);
        });
        // 修改学生信息
        $('#alter-stu').on('click', function(e) {
            e.preventDefault();
            var originStu = stuData[index];
            var stu = $('#cover .modal').serializeArray();
            if (verifyStuData(stu) && verifyEqual(stu, originStu)) {
                $.ajax({
                    url: '/api/student/updateStudent',
                    type: 'get',
                    data: stu,
                    dataType: 'json',
                    success: function(res) {
                        if (res.status === 'success') {
                            $('#cover').slideUp();
                            initData();
                        }
                    }
                });
            }
        });
        // 点击表单外的元素隐藏
        $('#cover').on('click', function(e) {
            if (e.target === this) {
                $(this).slideUp();
            }
        });
        // 删除学生信息
        $('#stu-list tbody').on('click', '.remove', function() {
            index = $(this).parents('tr').index(),
                sNo = stuData[index].sNo;
            if (confirm('确定删除学号为：' + stuData[index].sNo + '学生?')) {
                $.ajax({
                    url: '/api/student/delBySno',
                    type: 'get',
                    data: { appkey, sNo },
                    dataType: 'json',
                    success: function(res) {
                        if (res.status === 'success') {
                            initData();
                        }
                    }
                });
            }
        });
        // 新增学生信息
        $('#submit-stu').on('click', function(e) {
            e.preventDefault();
            var stu = $('#stu-add form').serializeArray();
            if (verifyStuData(stu)) {
                stu.push({ name: 'appkey', value: appkey });
                $.ajax({
                    url: '/api/student/addStudent',
                    type: 'get',
                    data: stu,
                    dataType: 'json',
                    success: function(res) {
                        if (res.status === 'success') {
                            $('#stu-add button[id!=submit-stu]').trigger('click');
                            $('.menu dd:first-of-type').trigger('click');
                            initData();
                        }
                    }
                });
            }
        });
    }
    // 查询所有学生、初始化数据
    function initData() {
        console.log(page);
        $.ajax({
            url: '/api/student/findAll',
            type: 'get',
            data: { appkey, page, pageSize },
            dataType: 'json',
            success: function(res) {
                if (res.status === 'success') {
                    stuData = res.data;
                    totalPage = Math.ceil(res.count / pageSize);
                    renderTableData(res.data);
                }
            }
        });
    }
    // 渲染数据到表格
    function renderTableData(data) {
        var str = data.reduce(function(accuor, stu) {
            return accuor + `<tr>
                        <td>${stu.sNo}</td>
                        <td>${stu.name}</td>
                        <td>${stu.sex == 1?'女':'男'}</td>
                        <td>${stu.email}</td>
                        <td>${new Date().getFullYear() - stu.birth}</td>
                        <td>${stu.phone}</td>
                        <td>${stu.address}</td>
                        <td>
                            <button class="btn edit" data-func="edit">编辑</button>
                            <button class="btn remove" data-func="del">删除</button>
                        </td>
                    </tr>`;
        }, '');
        $('#stu-list tbody').html(str);
        (totalPage > 1) && $('#stu-list').turnPage({
            total: totalPage,
            current: page,
            loadPage: function(current) {
                page = current;
                initData();
            }
        });
    }
    // 数据回填表单
    function dataFillForm(data) {
        var form = $('#cover .modal')[0];
        for (var key in data) {
            if (form[key]) {
                form[key].value = data[key];
            }
        }
    }
    // 验证数据不能为空
    function verifyStuData(data) {
        // 验证数据-不能为空
        return data.length != 0 && data.every(function(item) {
            return item.value != '';
        });
    }
    // 验证数据是否相等
    function verifyEqual(nowData, originData) {
        // 检测是否修改数据
        var flag = nowData.every(function(item) {
            return item.value == originData[item.name];
        });
        return !flag;
    }
    initData();
    bindEvent();
    console.log(totalPage);
})();