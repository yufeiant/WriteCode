/**
 * 1.手写 call
 * 原理，利用对象的隐式绑定this来实现this的指向的更改
 * 通过使用Symbol 来设置key,以创建一个唯一的key避免和原环境中发生冲突.
 * */
Function.prototype.myCall=function (context,...args){
    //判断context 是否存在 不存在就使用window
    context = context || window;
    //建立一个唯一的key
    const fn = Symbol();
    //在指定的上下文中添加 key 为 fn,value是调用函数的对象
    context[fn] = this;
    //调用函数
    const result = context[fn](...args);
    //删除上下文中的属性
    delete context[fn];
    return result;
}

/**
 * 2.手写apply
 * 原理和call相同，区别只是 后面的参数变成了数组而已
 * */
Function.prototype.myApply = function (context,args){
    //判断context 不存在就使用window
    context = context || window;
    //建立唯一的key
    const fn = Symbol();
    //在指定的上下文中添加 key 为 fn,value是调用函数的对象
    context[fn] = this;
    //调用函数
    const result = context[fn](args);
    //删除上下文中的属性
    delete context[fn];
    return result;
}

/**
 * 3.手写 bind
 * a.返回的函数 依旧可以传入参数后绑定，我们需要返回一个参数，然后把this绑定在这个函数上。
 * b.同时需要考虑 两次函数调用的参数都需要，所以需要参数合并
 * c.考虑到绑定的参数有可能被作为 构造函数使用。所以 需要检测，如果传入的this是返回函数的实例，就使用该this .而不是 上面的那个
 * d.我们需要给它建立原型链
 * */

function isObject(it) {
    return typeof it == 'object' ? it !== null : typeof it == 'function';
};

Function.prototype.myBind = function (that,...args){
    if(typeof this !== "function"){
        throw new Error("调用的不是函数")
    }
    //当前的函数对象
    let F = this;
    let Prototype = F.prototype;
    //拿到当前函数对象的原型对象
    function boundFunction(...arr){
        return F.myApply(
            this instanceof boundFunction ? this : that,
            [...args,...arr]
        )
    }
    //维护原有的原型关系
    if(isObject(Prototype)){
        boundFunction.prototype = Prototype;
    }
    return boundFunction;
}


let o = {name:"aaaa"};
let b = {name:"bbbb"};
function cc(){
    console.log(this.name)
}
let c = cc.myBind(o);
console.log(c.name)
d = c.myBind(b)
console.log(d.name)
d();