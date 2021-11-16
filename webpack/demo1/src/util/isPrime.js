/*
 * @Author: lsx
 * @Date:   2021-06-03 21:12:58
 * @Last Modified by:   smallsky
 * @Last Modified time: 2021-06-03 21:16:14
 */
// 判断数字是否是素数
export default function isPrime(num) {
    for(let i = 2, len = num/2; i <= len; i++){
        if(num % i === 0){
            return false;
        }
    }
    return num >= 2;
};