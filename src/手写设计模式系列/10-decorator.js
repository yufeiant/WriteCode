/**
 * 装饰器模式
 * */

//使用 AOP 切片的思想来实现装饰器模式
Function.prototype.before = function (beforeFn){
    //保存原有函数对象的引用
    const self = this;
    //返回包含了原函数和新函数的代理函数
    return function (){
        //执行新函数,且保证this不被劫持,新函数接收的参数也会被原封不动地传入原函数,
        //新函数在原函数之前执行
        beforeFn.apply(this,arguments);
        //执行原函数并返回结果. this 保证了原函数调用的时候实际上和现在是一样的.
        return self.apply(this,arguments);
    }
}

Function.prototype.after=function (afterFn){
    //保存原有函数对象的引用
    const self = this;
    //返回包含了原函数和新函数的代理函数
    return function (){
        //执行原函数并保存返回的结果
        const response = self.apply(this,arguments);
        //执行afterFn 函数
        afterFn.apply(this,arguments);
        return response;
    }
}

function add(){
    console.log(1);
}

add.before(()=>{
    console.log("before 1")
}).before(()=>{
    console.log("before 2")
}).after(()=>{
    console.log("after 3")
}).after(()=>{
    console.log("after 4")
})();