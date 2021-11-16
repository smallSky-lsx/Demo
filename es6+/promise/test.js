/*
 * @Author: lsx
 * @Date:   2021-04-25 12:20:07
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-04-26 23:45:18
 */

const pro = new MyPromise((resolve, reject) => {
    reject(5);
});
// 等价于
function test1() {
    return new MyPromise((resolve, reject)=>{
        reject(pro);
    });
}
function test2() {
    return new MyPromise((resolve, reject)=>{
        resolve(pro);
    });
}
const pro1 = test1();
const pro2 = test2();