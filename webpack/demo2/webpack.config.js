const path = require('path');
const absPath = path.resolve('./', 'result');

module.exports = {
    mode: 'development', // 配置生成开发环境的代码
    // 入口配置
    entry: {
        main: './src/index.js',
        a: './src/a.js',
        b: './src/b.js'
    },
    // 出口配置
    output: {
        path: absPath, // 必须是绝对路径，指定输出文件的文件夹路径
        filename: 'abc-[name]-[hash:3]-[chunkhash:3]-[id].js'
    },
    // 配置开发调试工具,
    devtool: 'source-map',
};