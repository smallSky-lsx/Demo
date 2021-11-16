/**
 * 功能：合并过滤
 */
function combineFilterFunc(config) {
    return function(data, state) {
        var lastData = data;
        for (var prop in config) {
            lastData = config[prop](lastData, state[prop]);
        }
        return lastData;
    };
}

var lastFilter = combineFilterFunc({
    text: filterArrByText,
    sex: filterArrBySex
});