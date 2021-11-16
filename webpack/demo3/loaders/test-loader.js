/*
 * @Author: lsx
 * @Date:   2021-06-15 10:42:29
 * @Last Modified by:   smallsky
 * @Last Modified time: 2021-06-15 10:51:05
 */
const loaderUtils = require('loader-utils');
module.exports = function(sourceCode) {
    const options = loaderUtils.getOptions(this);
    const reg = new RegExp(options.changeVar, 'g');
    return sourceCode.replace(reg, 'var');
};