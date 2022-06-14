
function PromiseA(executor){
    //添加属性 Promise的 状态
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    const self = this;
    //声明属性
    this.callbacks = [];
    
    //resolve 函数
    function resolve(data){
        //状态只能修改一次
        if(self.PromiseState !== "pending"){
            return ;
        }
        //1.修改 对象的 状态 promiseState
        self.PromiseState = 'fulfilled';//resolved
        //2.设置对象的结果 promiseResult
        self.PromiseResult = data;
        //调用成功的回调函数
        // if(self.callback.onResolved){
        //     self.callback.onResolved(data);
        // }
        self.callbacks.forEach(item=>{
            queueMicrotask(()=>{
                item.onResolved(data)
            })
        })
        
    }
    //reject
    function reject(data){
        //状态只能修改一次
        if(self.PromiseState !== "pending"){
            return ;
        }
        //1.修改 对象的 状态 promiseState
        self.PromiseState = 'rejected';//resolved
        //2.设置对象的结果 promiseResult
        self.PromiseResult = data;
        //调用失败的回调
        // if(self.callback.onResolved){
        //     self.callback.onResolved(data)
        // }
        //多个then方法都会调用
        self.callbacks.forEach(item=>{
           queueMicrotask(()=>{
               item.onRejected(data);
           })
        })
    }
    
    try{
        //执行器函数 是同步调用的
        executor(resolve,reject);
    }catch (e){
        //修改promise对象为失败状态
        reject(e);
    }
}

PromiseA.prototype.then=function (onResolved,onRejected){
    const self = this;
    //判断回调函数参数
    if(typeof onRejected !== 'function'){
        onRejected=reason=>{
            throw reason;
        }
    }
    
    if(typeof onResolved !== "function"){
        onRejected = value => value;
    }
    
    //需要返回一个Promise对象
    return new PromiseA((resolve,reject)=>{
        //封装函数
        function callback(type){
            //处理如果then执行中发生错误的情况
            try{
                //返回 结果
                //获取回调函数的执行结果
                let result = type(self.PromiseResult);
                //判断如果result是 promise
                if(result instanceof PromiseA){
                    //如果是Promise 类型的对象
                    result.then(v=>{
                        resolve(v)
                    },r=>{
                        reject(r);
                    })
                }else{
                    //结果的对象状态应该是成功的,如果不是promise
                    //通过调用对象实例的resolve方法来实现修改状态的修改
                    resolve(result);
                }
            }catch(e){
                reject(e);
            }
        }
        
        //这里是p 调用的, 隐式绑定了this = p;
        if(this.PromiseState === "fulfilled"){
            queueMicrotask(()=>{
                //处理如果then执行中发生错误的情况
                callback(onResolved)
            })
        }
        //当状态是rejected的时候
        if(this.PromiseState === "rejected"){
            queueMicrotask(()=>{
                callback(onRejected)
            })
        }
        //判断pending 状态
        if(this.PromiseState === "pending"){
            //保存回调函数
            this.callbacks.push({
                onResolved:function (){
                    callback(onResolved)
                },
                onRejected:function (){
                    callback(onRejected)
                }
            })
        }
    })
}

PromiseA.prototype.catch=function (onRejected){
    return this.then(undefined,onRejected);
}

PromiseA.resolve = function (value){
    //返回Promise对象
    return new PromiseA((resolve,reject)=>{
        if(value instanceof PromiseA){
            value.then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }else{
            resolve(value);
        }
    })
};

PromiseA.reject = function (value){
    //返回Promise对象
    return new PromiseA((resolve,reject)=>{
        reject(value);
    })
}

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
                reject();
            });
        }
    })
}

/**
 * 谁先运行完,谁就决定状态
 * @param promises
 * @returns {PromiseA}
 */
PromiseA.race = function (promises){
    return new PromiseA((resolve,reject)=>{
        for(let i = 0;i<promises.length;i++){
            promises[i].then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            });
        }
    })
}



const first = () => (new PromiseA((resolve, reject) => {
    console.log(3);
    let p = new PromiseA((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
            console.log(p)
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });
}));
first().then((arg) => {
    console.log(arg);
});
console.log(4);
