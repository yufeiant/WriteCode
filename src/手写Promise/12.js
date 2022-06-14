/**
 * 12.Promise.all 的封装
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
    
    //判断回调函数参数
    if(typeof onRejected !== 'function'){
        onRejected = reason => {
            throw reason
        }
    }
    if(typeof onResolved !== "function"){
        onResolved = value => value;
    }
    
    //这个就是返回外部的结果Promise ,它的内部状态由 then方法的回调决定
    return new PromiseA((resolve,reject)=>{
        //抽象成一个函数
        function callback(type){
            try{
                let result = type(self.PromiseResult);
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
        
        //调用 成功 回调函数
        if(self.PromiseState === "fulfilled"){
            callback(onResolved);
        }
        //调用失败的回调函数
        if(self.PromiseState === "rejected"){
            callback(onRejected);
        }
        //添加pending状态的处理
        if(self.PromiseState === "pending"){
            //保存回调函数
            self.callbacks.push({
                onResolved:function (){
                    callback(onResolved);
                },
                onRejected:function (){
                    callback(onRejected);
                }
            });
        }
    })
}
//添加catch方法
PromiseA.prototype.catch = function (onRejected){
    return this.then(undefined,onRejected)
}
//添加 resolve 方法
PromiseA.resolve = function (value){
    //返回Promise
    return new PromiseA((resolve,reject)=>{
        try{
            if(value instanceof PromiseA){
                value.then(v=>{
                    resolve(v);
                },r=>{
                    reject(r);
                })
            }else{
                resolve(value);
            }
        }catch (e){
            reject(e);
        }
    })
}
//添加 reject 方法
PromiseA.reject = function (value){
    //返回Promise
    return new PromiseA((resolve,reject)=>{
        try{
            reject(value)
        }catch (e){
            reject(e);
        }
    })
}
//添加 all 方法
PromiseA.all = function (promises){
    //返回结果为Promise的对象
    return new PromiseA((resolve,reject)=>{
        //遍历
        let count = 0;
        let arr = [];
        for(let i = 0;i<promises.length;i++){
            promises[i].then(v=>{
                //得知对象的状态是成功
                //每个promise对象都成功
                count++;
                //将当前promise对象成功的结果 存入到数组中
                // arr.push(v);
                arr[i] = v;
                if(count === promises.length){
                    resolve(arr);
                }
            },r=>{
                reject(r);
            });
        }
    })
}

/**
 * 测试用例
 * */
let p = PromiseA.resolve("ok");
let p1 = PromiseA.resolve("111");
let p2 = new PromiseA((resolve,reject)=>{
    setTimeout(()=>{
        resolve("ccc")
    },1000)
})

let p3 = PromiseA.all([p,p1,p2]);
p3.then((data)=>{
    console.log(data);
})
