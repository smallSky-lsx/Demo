/*
 * @Author: lsx
 * @Date:   2021-06-15 14:59:51
 * @Last Modified by:   smallsky
 * @Last Modified time: 2021-06-15 15:12:08
 */
module.exports = function(sourceCode) {
    return `var styleEle = document.createElement('style');
    styleEle.innerText = \`${sourceCode}\`;
    document.head.appendChild(styleEle);module.exports=\`${sourceCode}\``;
};