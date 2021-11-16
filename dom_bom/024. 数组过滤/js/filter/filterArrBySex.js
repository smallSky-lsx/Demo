// 通过性别过滤数组
function filterArrBySex(data, sexStr) {
    // 展示全部、根据男女展示
    if (sexStr === 'a') {
        return data;
    } else {
        return data.filter(function(item) {
            return sexStr.indexOf(item.sex) > -1;
        });
    }
}