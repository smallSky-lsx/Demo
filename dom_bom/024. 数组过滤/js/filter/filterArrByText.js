// 通过文本过滤数组
function filterArrByText(data, text) {
    // 文本为空字符串与非空字符串
    return !text ? data : data.filter(function(item) {
        return item.name.indexOf(text) > -1;
    });
}