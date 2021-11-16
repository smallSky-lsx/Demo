/**
 * 创建仓库，仓库功能：
 * 1. 修改过滤状态。
 * 2. 执行功能。
 * 3. 订阅功能。
 */
function createStore(initialState) {
    var state = initialState || {},
        funcList = []; //功能列表
    return {
        getState: function() { //外部获取state预留接口
            return state;
        },
        dispatch: function(action) { //修改state+执行所有订阅功能
            // action = {type: 'text', value: 'aaa'};
            state[action.type] = action.value; //修改state中type值
            // 执行所有订阅功能
            funcList.forEach(function(func) {
                func();
            });
        },
        subscribe: function(func) { //订阅功能
            funcList.push(func);
        }
    };
}