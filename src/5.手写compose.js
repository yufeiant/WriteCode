
/**
 * 6.手写 compose
 * 原理:
 *
 * */

function compose(...fns){
    if(fns.length === 0){
        return (v)=>v;
    }
    if(fns.length === 1){
        return fns[0];
    }
    return fns.reduce((pre,cur)=>((...args)=>pre(cur(...args))))
}

// 用法如下:
function fn1(x) {
    console.log(1)
    return x + 1;
}
function fn2(x) {
    console.log(2)
    return x + 2;
}
function fn3(x) {
    console.log(3)
    return x + 3;
}
function fn4(x) {
    console.log(4)
    return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11
