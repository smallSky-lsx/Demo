/*
 * @Author: lsx
 * @Date:   2021-04-25 12:19:17
 * @Last Modified by:   Administrator
 * @Last Modified time: 2021-04-26 23:43:42
 */
// 手写Promise
const MyPromise = (() => {
    const PENDING = 'pending',
        FULFILLED = 'fulfilled',
        REJECTED = 'rejected',
        PromiseState = Symbol('PromiseState'), // Promise状态
        PromiseResult = Symbol('PromiseResult'), // Promise状态数据
        stateChange = Symbol('stateChange'), // 改变Promise对象状态
        fulfilledList = Symbol('fulfilledList'), // thenable作业队列
        catchList = Symbol('catchList'), // catchable作业队列
        taskHandler = Symbol('taskHandler'), // 后续处理
        linkPromise = Symbol('linkPromise'); // 创建Promise对象，Promise串联

    return class MyPromise {
        constructor(prepare) { // 创建一个Promise对象，unsettled，同步代码
                // 最初状态为pending，状态数据为undefined
                this[PromiseState] = PENDING;
                this[PromiseResult] = undefined;
                // 初始化作业队列, 需要等待Promise状态变为fulfilled或rejected的后续处理，会加入相应的作业队列
                // 执行到后续处理，Promise的状态正好为fulfilled或rejected，会立即将后续加入到微队列中等待执行，不需要再加入相应作业队列。
                this[fulfilledList] = [];
                this[catchList] = [];

                const resolve = data => { // 改变Promise对象状态为fulfilled
                    if (data instanceof MyPromise) {
                        data.then(d => {
                            this[stateChange](FULFILLED, d, this[fulfilledList]);
                        }, err => {
                            this[stateChange](REJECTED, err, this[catchList]);
                        });
                    }else {
                        this[stateChange](FULFILLED, data, this[fulfilledList]);
                    }
                };
                const reject = err => { // 改变Promise对象状态为rejected
                    this[stateChange](REJECTED, err, this[catchList]);
                };
                /*执行prepare回调函数, 若是回调函数中出现未捕获的错误，则会将Promise对象状态推向为rejected.
                状态数据为抛出的数据，停止后续代码的执行*/
                try {
                    prepare(resolve, reject); //同步代码
                } catch (err) {
                    reject(err);
                }
            }
            [stateChange](state, data, taskQueue) {
                // Promise对象状态只能从pending改变为fulfilled或rejected，且不可逆，单向的
                // Promise对象状态发生改变后，即可以将后续处理函数立即加入到事件队列的微队列中等待执行
                if (this[PromiseState] !== PENDING) { // Promise对象状态不为pending，则不能改变
                    return;
                }
                this[PromiseState] = state;
                this[PromiseResult] = data;
                // 状态改变后，立即将相应状态的作业队列中的后续处理函数加入到微队列中等待执行
                setTimeout(() => {
                    taskQueue.forEach(handler => handler(data));
                }, 0);
            }
            [taskHandler](handler, currentState, taskQueue) {
                if (typeof handler !== 'function') {
                    return;
                }
                if (this[PromiseState] === currentState) { // 立即加入到微队列中等待执行，无需加入到作业队列中
                    setTimeout(() => {
                        handler(this[PromiseResult]);
                    }, 0);
                } else {
                    // 加入到作业队列中等待执行
                    taskQueue.push(handler);
                }
            }
            [linkPromise](thenable, catchable) {
                /**
                 * 1. 新的Promise对象的最初状态为pending。
                 * 2. 前一个Promise对象的后续处理函数执行完，新的Promise对象状态才会发生改变。
                 * 3. 新的Promise对象状态及状态数据：
                 *     a. 前一个Promise对象的后续处理函数正常执行完，新的Promise对象状态推向为fulfilled，
                 *     状态数据为返回值。
                 *     b. 前一个Promise对象的后续处理函数出现未捕获错误，新的Promise对象状态推向为rejected，
                 *     状态数据为抛出的错误数据。
                 *     c. 前一个Promise对象相应状态没有后续处理，则后续处理由新的Promise对象完成。
                 *     新的Promise对象的状态与前一个Promise对象状态和状态数据一致。
                 *     d. 前一个Promise对象的后续处理函数返回一个Promise对象，
                 *     则新的Promise对象的状态和状态数据与返回的Promise对象的状态和状态数据一致。
                 *     当返回的Promise对象的状态发生改变后，则新的Promise也跟着改变，状态数据一致。
                 *     如何判断上一个Promise对象的当前后续处理执行完，执行完并得到返回值，立即能改变新的Promise对象
                 *     的状态.
                 *     拿到
                 */
                const exec = function(data, handler, resolve, reject) {
                    try {
                        const result = handler(data); //thenable执行完，并返回执行结果
                        if (result instanceof MyPromise) {
                            result.then(d => {
                                resolve(d);
                            }, err => {
                                reject(err);
                            });
                        } else {
                            resolve(result);
                        }
                    } catch (err) {
                        reject(err);
                    }
                };
                return new MyPromise((resolve, reject) => {
                    // 将上一个Promise对象当前后续处理函数是否执行完，放入到新的Promise对象创建中判断
                    // 在函数调用时。可以向函数内传递回调函数，获奖函数进行包装
                    this[taskHandler](data => {
                        if (typeof thenable !== 'function') {
                            // 前一个Promise对象fulfilled状态未做后续处理，由新的Promise对象处理，状态与数据一致
                            resolve(data);
                            return;
                        }
                        exec(data, thenable, resolve, reject);
                    }, FULFILLED, this[fulfilledList]);
                    this[taskHandler](err => {
                        if (typeof catchable !== 'function') {
                            // 前一个Promise对象的rejected状态未做后续处理，由新的Promise对象处理
                            reject(err);
                            return;
                        }
                        exec(err, catchable, resolve, reject);
                    }, REJECTED, this[catchList]);
                });
            }
        // thenable后续处理, then返回一个新的Promise对象，既能注册thenable后续处理，也能注册catchable后续处理
        // 执行到此处时，Promise的状态正好为fulfilled，则会立即将thenable后续处理函数加入到微队列中等待执行
        // 执行到此处时，Promise的状态正好为rejected，则会立即将catchable后续处理函数加入到微队列中等待执行
        // 执行到此处时，Promise的状态为pending，则会将thenable或catchbale后续处理函数加入到相应的作业队列中等待状态到达fulfilled或rejected时，将其加入到时间微队列中等待执行。在浏览器环境，无法将其加入到微队列，将其加入到宏队列模拟
        then(thenable, catchable) {
            return this[linkPromise](thenable, catchable);
        }
        catch (catchable) {
            return this[linkPromise](undefined, catchable);
        }
        /**
         * 若是data为非Promise对象，则创建一个fulfilled状态的Promise对象
         * 若是data为Promise对象，则返回传递的Promise对象
         */
        static resolve(data) {
            if (data instanceof MyPromise) {
                return data;
            }
            return new MyPromise((resolve, reject) => {
                resolve(data);
            });
        }
        /**
         * 创建一个状态为rejected的Promise对象
         */
        static reject(data) {
            return new MyPromise((resolve, reject) => {
                reject(data);
            });
        }
        /**
         * 返回一个新的Promise对象，新的Promise对象的最初状态为pending，新的Promise对象状态变化即状态数据：
         * 若是多个Promise对象，状态都推向为fulfilled，则新的Promise对象状态推向为fulfilled，状态数据为每个Promise对象状态数据组成的数组，数组的顺序与Promise对象的顺序一致。
         * 若是多个Promise对象，一旦出现状态推向为rejected，则新的Promise对象状态立即推向为rejected，状态数据为此。
         * 向all传递的是由Promise对象组成的可迭代对象，可以是数组
         */
        static all(proms) {
            return new MyPromise((resolve, reject) => { // 返回一个新的Promise对象
                // 将proms中的状态数据与状态存储在一个新的数组中，用于判断
                const arr = proms.reduce((arr, p) => {
                    const obj = {
                        isFulfilled: false,
                        result: undefined
                    };
                    arr.push(obj);
                    p.then(data => { // 当前Promise对象状态变为fulfilled，状态数据为data
                        obj.isFulfilled = true;
                        obj.result = data;
                        const flag = arr.every(item => item.isFulfilled);
                        if (flag) {
                            resolve(arr.map(item => item.result));
                        }
                    }, err => {
                        reject(err);
                    });
                    return arr;
                }, []);
                console.log(arr);
            });
        }
        /**
         * 返回一个新的Promise对象，最初状态为pending，状态数据为undefined
         * 多个Promise对象中，第一个发生状态改变的Promise对象，决定新的Promise对象的状态以及状态数据
         */
        static race(proms) {
            return new MyPromise((resolve, reject) => {
                proms.forEach(p => {
                    p.then(data => {
                        resolve(data);
                    }, err => {
                        reject(err);
                    });
                });
            });
        }
    };
})();