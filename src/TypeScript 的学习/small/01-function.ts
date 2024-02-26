/***
 * 给函数声明类型的方式
 */
export {}
//场景一:普通函数

function foo1(name:string):number{
    return name.length
}
//场景二:函数表达式
const foo2 = function (name:string):number{
    return name.length
}
//场景三:像变量进行类型标注
const foo3:(name:string)=>number = function (name){
    return name.length
}
//场景四:箭头函数 方式一
const foo4=(name:string):number=>{
    return name.length
}

//场景五:箭头函数 方式二 可读性也太差了
const foo5:(name:string)=>number = (name)=>{
    return name.length
}

//场景六:type 单独定义函数类型 然后赋值给函数使用
type FuncFoo = (name:string)=>number
const foo6:FuncFoo = (name)=>{
    return name.length
}
//场景七:interface单独定义函数
interface FuncFoo1 {
    (name:string):number
}
const foo7 : FuncFoo1 = name => {
    return name.length
}

//场景八:void 类型
function foo8():void{

}
//调用了return ,但是没有返回值
function bar():void{
    return ;
}
//可以使用undefined来表示返回空的情况
function bar1():undefined{
    //可以用在确实需要返回空的场景中
    return ;
}
//场景九-1:可选参数 和rest 参数
function foo9(name:string,age?:number):number{
    const inputAge = age || 38;
    return name.length + inputAge;
}
//场景九-2 :直接给可选参数添加默认值 也可以达到同样的效果
function foo10(name:string,age = 18):number{
    return name.length + age;
}
//场景九-3:rest 类型 剩余参数是rest类型
function foo11(arg1:string,...args:any[]){

}
//场景九-4:直接定义rest参数 表示参数可能是任意情况
function foo12(...args:any[]){

}
//场景十:重载
//伪重载 它关注的是 入参和返回值的关联关系 而不是具体的实现.
//初始情况 - number 要返回number 类型,boolean 要返回 string
//入参要和返回数据联动
function func(foo:number,bar?:boolean):number | string{
    if(bar){
        return String(foo);
    }else{
        return foo * 599
    }
}

//使用重载来定义这种情况
//bar 是 true 情况下 应该返回的是string类型
function func1(foo:number,bar:true):string;
//bar 不填写 或者 传入的是false 就进入了另外一个判断分支 返回的是number
function func1(foo:number,bar?:false):number;
//兜底函数 处理所有的情况,它需要兼容上面所有定义的重载类型
function func1(foo:number,bar?:boolean):number | string{
    if(bar){
        return String(foo);
    }else{
        return foo * 599
    }
}

//场景十一:异步函数,generator函数

async function asyncFunc():Promise<void>{}
function *genFunc():Iterable<void>{}
async function* asyncGenFunc(): AsyncIterable<void> {}

