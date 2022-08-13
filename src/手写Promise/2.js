/**
 * 2 -  resolve 与 reject 的封装
 * @type {Promise<unknown>}
 * Promise 自己有三个状态
 * pending 进行中
 * fulfilled 完成
 * rejected 失败
 *
 */

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
    //同步调用一下
    executor(resolve,reject);
}

PromiseA.prototype.then = function (onResolved,onRejected){

}

/**
 * 测试用例
 * */

let p1 = new Promise((resolve,reject)=>{
    throw "error"
});

console.log(p1)

let p = new Promise((resolve,reject)=>{
    resolve("ok");
});

p.then(value=>{
    console.log(value);
},reason => {
    console.log(reason)
});
