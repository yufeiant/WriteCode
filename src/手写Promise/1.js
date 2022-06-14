
/**
 * 一步一步实现版
 * 1.搭建整体结构
 * */
function PromiseA(executor){

}

PromiseA.prototype.then = function (onResolved,onRejected){

}

/**
 * 测试用例
 * */

let p1 = new PromiseA((resolve,reject)=>{
    resolve("ok");
});

p1.then(value=>{
    console.log(value);
},reason => {
    console.log(reason)
});