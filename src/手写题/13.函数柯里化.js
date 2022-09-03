/**
 * 13.柯里化
 * 函数柯里化（curry）是函数式编程里面的概念。curry的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
 * 重点是它的后半句,返回一个函数,我们通过闭包的方式把上一次传递进来的参数保存在闭包里,
 * 然后在返回的函数中引用它.
 * */

const add1 = (x,y)=>x+y;
add1(1,2);

//改造为 add(1)(2);
const add2 = x=>y=>x+y;
add2(1)(2);

//改造为 add(1)(2)(3)
const add3 = x=>y=>z=>x+y+z;
add3(1)(2)(3);

//但是如果需求变成这样呢?

// add(1, 2, 3);
// add(1, 2)(3);
// add(1)(2, 3);

//我们上面的代码就不行了
const curry = (fn,...args)=>
    //函数的参数个数可以直接通过函数数的.length属性来访问
    args.length >= fn.length //这个判断是关键
    //如果传入的参数个数超过函数参数的个数,就直接执行该函数
        ?
        fn(...args)
        :
        //传入的参数小于原始参数fn的参数个数时
        //则继续对当前函数进行柯里化,返回一个接收所有参数(当前函数和剩余参数)的函数
        (..._args)=>curry(fn,...args,..._args);

function add4(x,y,z){
    return x+y+z;
}

const add5 = curry(add4);

console.log(add5(1, 2, 3))
console.log(add5(1, 2)(3))
console.log(add5(1)(2, 3))

/**
 * 升级版
 * */
function argsSum(args){
    return args.reduce((pre, cur) => {
        return pre + cur
    })
}
function add(...args1){
    let sum1 = argsSum(args1)
    let fn = function(...args2){
        let sum2 = argsSum(args2)
        return add(sum1 + sum2)
    }
    fn.toString = function(){
        return sum1
    }
    return fn
}