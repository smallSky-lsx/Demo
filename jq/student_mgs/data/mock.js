/*
 * @Author: lsx
 * @Date:   2021-03-23 20:47:01
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-03-24 20:52:43
 */
// 学生表
var students = Mock.mock({
    "status": "success",
    "msg": "查询成功",
    "data|1000": [{
        "id|+1": 1,
        "name": "@cname",
        "birth": "@date('yyyy')",
        "sex|1": [0, 1],
        "sNo": "@integer(1000, 999999)",
        "email": "@email",
        "phone": "@integer(12000000000, 19000000000)",
        "address": "@county",
        "appkey": "@string(4)_@integer(18)",
        "ctime": "@date('T')",
        "utime": "@date('T')"
    }]
});
// 查询所有学生
Mock.mock(/\/api\/student\/findAll?[\w\W]*/, 'get', function(options) {
    var queryData = Tools.formatURL(options.url),
        page = queryData.page,
        pageSize = queryData.pageSize;
    var stuData = students.data.filter(function(stu, i) {
        return i >= (page - 1) * pageSize && i <= page * pageSize - 1;
    });
    return {
        status: 'success',
        msg: '查询成功',
        data: stuData,
        count: students.data.length
    };
});
// 修改指定学生
Mock.mock(/\/api\/student\/updateStudent?[\w\W]*/, 'get', function(options) {
    var updateStu = Tools.formatURL(options.url);
    var stu = students.data.find(function(stu) {
        return stu.sNo == updateStu.sNo;
    });
    var res = {
        status: 'success',
        msg: '修改成功'
    };
    if (stu) {
        Object.assign(stu, updateStu);
    } else {
        Object.assign(res, {
            status: 'fail',
            msg: '学生信息修改失败'
        });
    }
    return res;
});
// 删除指定学生
Mock.mock(/\/api\/student\/delBySno?[\w\W]*/, 'get', function(options) {
    var delStu = Tools.formatURL(options.url),
        index = students.data.findIndex(function(stu) {
            return delStu.sNo == stu.sNo;
        });
    var res = {
        status: 'success',
        msg: '删除成功'
    };
    if (index >= 0) {
        students.data.splice(index, 1);
    } else {
        Object.assign(res, {
            status: 'fail',
            msg: '删除失败'
        });
    }
    return res;
});
// 新增指定学生
Mock.mock(/\/api\/student\/addStudent?[\w\W]/, 'get', function(options) {
    var addStu = Tools.formatURL(options.url);
    // 检测学号是否相同
    var index = students.data.findIndex(function(stu) {
        return stu.sNo == addStu.sNo;
    });
    var res = {
        status: 'success',
        msg: '新增学生成功'
    };
    if (index === -1) {
        Object.assign(addStu, { id: students.data.length + 1, ctime: new Date().getTime(), ctime: +new Date() });
        students.data.push(addStu);
    } else {
        Object.assign(res, {
            status: 'fail',
            msg: '新增学生失败'
        });
    }
    return res;
});