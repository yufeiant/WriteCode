/***
 * 题目描述:实现一个 add 方法 使计算结果能够满足如下预期： add(1)(2)(3)()=6 add(1,2,3)(4)()=10
 *
 * 其实就是考函数柯里化
 *
 * 实现代码如下:
 *
 * 2022-8-12 22:06
 */
function add(...args) {
    let allArgs = [...args];
    function fn(...newArgs) {
        allArgs = [...allArgs, ...newArgs];
        return fn;
    }
    fn.toString = function () {
        if (!allArgs.length) {
            return;
        }
        return allArgs.reduce((sum, cur) => sum + cur);
    };
    return fn;
}

console.log(add(1)(2)(3)(4,5))

/**
 * 通过工具包装函数 来实现 柯里化
 * 它的原理是 传入的函数 用来包装的函数 我一直都传递,但是,我会对传入的参数进行扩展.
 * 如果传入的参数大于等于原始函数fn 的参数个数 则直接执行该函数
 * 如果传入的参数个数 小于原始函数fn的参数个数时
 * 就对当前的函数继续柯里化 返回一个接收所有参数的函数.
 * @param fn
 * @param args
 * @returns {any}
 */
const curry = (fn, ...args) =>
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    args.length >= fn.length // 这个判断很关键！！！
        // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
        ? fn(...args)
        /**
         * 传入的参数小于原始函数fn的参数个数时
         * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
         */
        : (..._args) => curry(fn, ...args, ..._args);

function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));