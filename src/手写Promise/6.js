/**
 * 6.--异步任务 then的实现
 * @type {Promise<unknown>}
 */
function PromiseA(executor){
    //添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    this.callback = {};
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
        
        //调用成功的回调函数
        if(self.callback.onResolved){
            //参数是成功的结果
            self.callback.onResolved(data);
        }
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
        //调用成功的回调函数
        if(self.callback.onRejected){
            //参数是成功的结果
            self.callback.onRejected(data);
        }
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
    
    //添加pending状态的处理
    if(this.PromiseState === "pending"){
        //保存回调函数
        this.callback = {
            onResolved,
            onRejected
        };
    }
}

/**
 * 测试用例
 * */

let p = new PromiseA((resolve,reject)=>{
    //异步调用
    setTimeout(()=>{
        resolve("OK");
    },100)
});
p.then(value=>{
    console.log(value)
},reason => {
    console.log(reason)
})

