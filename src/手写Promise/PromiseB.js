/**
 * 第一步:搭建基础框架 class then
 * 第二步:添加构造函数 
 *     - 定义三个状态
 *     - resolve 修改 成功
 *     - reject  修改 失败
 *     - 同步调用 executor 把定义的函数 resolve reject 作为参数传进去
 * 第三步:处理 报错的情况
 *     在报错的情况下,我们自己调用this.reject 把内部的状态修改为失败
 * 第四步: 添加 状态只能被修改一次
 *     在修改状态为成功和失败的两个方法中,我们添加对状态的判断
 * 第五步: 添加then 方法的逻辑处理
 *     判断状态是成功还是失败
 *     如果是成功 就调用第一个回调函数
 *     如果是失败 就调用第二个回调函数
 * 第六步:添加对异步任务的支持
 *     我们的构造函数在执行的时候,执行了构造函数中传入的回调函数,如果它同步调用了resolve 或者reject 那么
 *     状态就会改变.
 *     但是如果我们的执行函数中使用的是异步呢?那么就会同步执行下去,执行到then方法的时候,它的状态还没有改变,这个时候就
 *     需要挂起当前的回调函数,等待 Promise 内部的状态真正完成转变以后 在去执行.
 *     所以我们需要一个临时变量来保存then方法的回调函数.
 * 第七步: then 指定多个回调的实现
 *     上面的那一步我们支持了一步的操作,但是如果我们有多个then方法会怎么办呢?
 *     所以我们的回调函数存储在一个数组里面,在执行完毕以后调用数组中的方法.
 *     注意这里区别是 多个回调而不是链式调用
 * 第八步:
 *
 *
 */

class PromiseB {
    
    /**
     * 定义PromiseB 的构造函数, 进行初始化 ,定义三个状态 ,并且把初始状态设定为PENDING.
     * Promise在构造函数执行的时候就会运行传进来的函数,所以写在回调函数里面的代码它是同步执行的.
     *
     * 在resolve 的时候把状态修改为  this.FULFILLED
     * 在reject 的时候把状态修改为   this.REJECTED
     *
     * @param executor
     */
    constructor(executor) {
        //定义三个状态
        this.PENDING = Symbol("pending");   //进行中  初始状态
        this.FULFILLED = Symbol("fulfilled");//成功
        this.REJECTED = Symbol("rejectd");//失败
        
        //添加属性
        this.PromiseState = this.PENDING;
        this.PromiseResult = null;
        // then方法的回调函数
        this.callbacks = [];
        
        //绑定一下this
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        
        
        try {
            //调用回调函数
            executor(this.resolve,this.reject)
        }catch (e){
            //通过调用reject函数,它的内部可以修改状态的和赋值
            //所以我们这里可以把错误直接传进去就可以了.
            this.reject(e);
        }
        
    }
    
    resolve(data) {
        // 判断状态是否为 初始状态
        if(this.PromiseState !== this.PENDING){
            return ;
        }
        this.PromiseState = this.FULFILLED;
        this.PromiseResult = data;
        //如果有未执行的回调函数
        queueMicrotask(()=> {
            this.callbacks.forEach(callback=>callback.onResolved(data));
        })
    }
    
    reject(data) {
        // 判断状态是否为 初始状态
        if(this.PromiseState !== this.PENDING){
            return ;
        }
        this.PromiseState = this.REJECTED;
        this.PromiseResult = data;
        //如果有未执行的回调函数
        queueMicrotask(()=> {
            this.callbacks.forEach(callback=>callback.onRejected(data));
        })
    }
    
    /**
     * then 方法 返回一个新的 Promise
     * @param onResolved
     * @param onRejected
     */
    then(onResolved,onRejected) {
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
        
        //返回一个新的 Promise
        return new PromiseB((resolve,reject)=>{
            function callback(type){
                try {
                    const result = type(self.PromiseResult);
                    if(result  instanceof PromiseB){
                        //如果是 PromiseB 的对象 那么执行结果就由这个 PromiseB 的对象决定了.
                        // 那么怎么拿到它的状态呢? 我们可以通过给这个对象添加一个then的回调函数来实现.
                        result.then(
                            v=>{
                                //promise 的状态是成功的话,我们拿到它的回调中的数据,然后调用我们自己的resolve函数
                                //来改变我们要返回的 Promise的状态
                                resolve(v),
                                    e=>{
                                        reject(e)
                                    }
                            })
                    }else{
                        //非Promise 数据 则成功,通过调用resolve来修改
                        resolve(result);
                    }
                }catch (e){
                    reject(e);
                }
            }
            
            // 状态为 成功的情况
            if(self.PromiseState === self.FULFILLED){
                //微任务执行回调
                queueMicrotask(()=> {
                    //调用成功的回调函数
                    callback(onResolved)
                })
                // 状态为 失败的情况
            }else if(self.PromiseState === self.REJECTED){
                //微任务执行回调
                queueMicrotask(()=> {
                    //调用成功的回调函数
                    callback(onRejected)
                })
                // 状态为 进行中的情况 也就是说 同步代码执行完毕的时候,Promise  内部的状态
                // 还没有来得及改变 所以我们需要在它未来改变状态的时候 再调用then方法中的回调.
            }else {
                this.callbacks.push({
                    onResolved:function (){
                        //微任务执行回调
                        queueMicrotask(()=> {
                            //调用成功的回调函数
                            callback(onResolved)
                        })
                    },
                    onRejected:function (){
                        //微任务执行回调
                        queueMicrotask(()=> {
                            //调用成功的回调函数
                            callback(onRejected)
                        })
                    }
                })
            }
        })
    }
}


//添加catch方法
PromiseB.prototype.catch = function (onRejected){
    return this.then(undefined,onRejected)
}

//添加 resolve 方法
PromiseB.resolve = function (value){
    //返回Promise
    return new PromiseB((resolve,reject)=>{
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
PromiseB.reject = function (value){
    //返回Promise
    return new PromiseB((resolve,reject)=>{
        reject(value)
    })
}

//添加 all 方法
PromiseB.all = function (promises){
    //返回结果为Promise的对象
    return new PromiseB((resolve,reject)=>{
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

PromiseB.race = function (promises){
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


/**
 * 测试用例
 * */

let p = new PromiseB((resolve,reject)=>{
    throw "error"
});
p.then(value=>{
    console.log(value)
},reason => {
    console.log(reason)
})

console.log(p)
// 第六需求:测试用例
let p6 = new PromiseB((resolve,reject)=>{
    //异步调用
    setTimeout(()=>{
        resolve("OK");
    },100)
});
p6.then(value=>{
    console.log(value)
},reason => {
    console.log(reason)
})

console.log(p6)

//第七需求:测试用例 指定多个回调

let p7 = new PromiseB((resolve,reject)=>{
    //异步调用
    setTimeout(()=>{
        resolve("7 OK");
    },100)
});
p7.then(value=>{
    console.log("p7",value)
})

p7.then(value=>{
    console.log("value2",value)
})

console.log("p7",p7)

//第八个需求: 同步任务 then 中回调函数的处理
let p8 = new PromiseB((resolve,reject)=>{
    resolve("OK");
});
const result8 = p8.then(value=>{
    throw "error"
},reason => {
    console.log("p8",reason)
})
console.log("p8",result8)

//第九个需求:异步任务 then 中回调函数的处理
let p9 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("p9 OK");
    })
});
const result9 = p9.then(value=>{
    console.log(value,111)
},reason => {
    console.log(reason)
})
console.log("p9",result9)
