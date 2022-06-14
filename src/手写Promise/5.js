/**
 * 5 -  then方法执行回调
 * @type {Promise<unknown>}
 */
function PromiseA(executor){
    //添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    //预先保存实例对象的this值
    const self = this;
    
    //resolve函数
    function resolve(data){
        //判断状态
        if(self.PromiseState !== "pending"){
            return ;
        }
        //1.修改对象的状态(PromiseState)
        self.PromiseState = "fulfilled";
        //2.设置对象的结果值(PromiseResult)
        self.PromiseResult = data;
    }
    
    function reject(data){
        //判断状态
        if(self.PromiseState !== "pending"){
            return ;
        }
        //1.修改对象的状态(PromiseState)
        self.PromiseState = "rejected";
        //2.设置对象的结果值(PromiseResult)
        self.PromiseResult = data;
    }
    
    //处理 throw 抛出的错误
    try{
        //同步调用一下
        executor(resolve,reject);
    }catch (e){
        //通过调用reject函数,它的内部可以修改状态的和赋值
        //所以我们这里可以把错误直接传进去就可以了.
        reject(e);
    }
}

//添加 then 方法
PromiseA.prototype.then = function (onResolved,onRejected){
    //调用 成功 回调函数
    if(this.PromiseState === "fulfilled"){
        onResolved(this.PromiseResult);
    }
    //调用失败的回调函数
    if(this.PromiseState === "rejected"){
        onRejected(this.PromiseResult);
    }
}

/**
 * 测试用例
 * */

let p = new Promise((resolve,reject)=>{
    throw "error"
});
p.then(value=>{
    console.log(value)
},reason => {
    console.log(reason)
})

console.log(p1)