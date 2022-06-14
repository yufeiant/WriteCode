/**
 * 8.同步任务 then 返回结果
 * @type {Promise<unknown>}
 */
function PromiseA(executor){
    //添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    this.callbacks = [];
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
        self.callbacks.forEach(item=>{
            item.onResolved(data);
        })
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
        
        //调用失败的回调函数
        self.callbacks.forEach(item=>{
            item.onRejected(data);
        })
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
    const self = this;
    //这个就是返回外部的结果Promise ,它的内部状态由 then方法的回调决定
    return new PromiseA((resolve,reject)=>{
        //调用 成功 回调函数
        if(self.PromiseState === "fulfilled"){
            try{
                let result = onResolved(self.PromiseResult);
                //判断 result 是 Promise 对象
                if(result instanceof PromiseA){
                    //如果是Promise对象,我们需要知道这个对象的状态是成功还是失败的?
                    //Promise对象如果成功,它一定会回调 onResolved 失败 会回调 onRejected
                    result.then(v=>{
                        //在它的内部调用 resolve 来修改外部 我们创建的那个Promise对象的状态
                        resolve(v);
                    },r=>{
                        reject(r);
                    })
                }else{
                    //非Promise 数据 则成功,通过调用resolve来修改
                    resolve(result);
                }
            }catch (e){
                reject(e);
            }
        }
        //调用失败的回调函数
        if(self.PromiseState === "rejected"){
            onRejected(self.PromiseResult);
        }
    
        //添加pending状态的处理
        if(self.PromiseState === "pending"){
            //保存回调函数
            self.callbacks.push({
                onResolved,
                onRejected
            });
        }
    })
}

/**
 * 测试用例
 * */

let p = new PromiseA((resolve,reject)=>{
    resolve("OK");
});
const result = p.then(value=>{
   throw "error"
},reason => {
    console.log(reason)
})
console.log(result)