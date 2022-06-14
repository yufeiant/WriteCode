/**
 * 2 -  throw 的处理和修改内部的状态
 * @type {Promise<unknown>}
 */
// let p = new Promise((resolve,reject)=>{
//     resolve("ok");
// });
//
// p.then(value=>{
//     console.log(value);
// },reason => {
//     console.log(reason)
// });

/**
 * 我们的实现
 * */
function PromiseA(executor){
    //添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    //预先保存实例对象的this值
    const self = this;
    
    //resolve函数
    function resolve(data){
        //1.修改对象的状态(PromiseState)
        self.PromiseState = "fulfilled";
        //2.设置对象的结果值(PromiseResult)
        self.PromiseResult = data;
    }
    
    function reject(data){
        //1.修改对象的状态(PromiseState)
        self.PromiseState = "rejected";
        //2.设置对象的结果值(PromiseResult)
        self.PromiseResult = data;
    }
    
    try{
        //同步调用一下
        executor(resolve,reject);
    }catch (e){
        //通过调用reject函数,它的内部可以修改状态的和赋值
        //所以我们这里可以把错误直接传进去就可以了.
        reject(e);
    }
}

PromiseA.prototype.then = function (onResolved,onRejected){

}

/**
 * 测试用例
 * */

let p1 = new PromiseA((resolve,reject)=>{
    throw "error"
});

console.log(p1)