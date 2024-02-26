// 接口
export {}
interface Speakable{
    name:string;
    speak():void
}

//功能一:描述对象的形状
let speakMan:Speakable = {
    name:'zhufeng',
    speak(){}
}

//功能二:行为的抽象
//同名的接口可以写多个,它们的类型会自动合并
interface Speakable{
    speak():void
}
interface Eatable{
    eat():void
}
//类可以实现多个接口
class Person implements Speakable,Eatable{
    name: string;
    eat(): void {
    }
    speak(): void {
    }
}

//场景一: 如何对对象进行必须的约束,同时可以保持它的扩展性呢?  使用任意属性
interface Person2{
    //表示对象必须要包含的内容
    //表示属性是只读的
    readonly id:number;
    name:string;
    //可以包含任意属性 表示对象的可以任意扩展
    [key:string]:any
}

let p:Person2 = {
    id:1,
    name:"zhufeng",
    //只能定义已经定义的属性
    //Type '{ id: number; name: string; age: number; }' is not assignable to type 'Person2'.   Object literal may only specify known properties, and 'age' does not exist in type 'Person2'.
    // age:10
    //设置了[key:string]:any 后
    age:10,
    home:11,
}

//场景二:如何扩展之前的约束 而又不影响呢 ? 使用接口的继承
interface SpeakAble{
    speak():void
}

interface SpeakChinese extends SpeakAble{
    speakChinese():void
}

class ChineseMan implements SpeakChinese{
    speak(): void {
    }
    speakChinese(): void {
    }
}

//场景三:如何让属性不可以修改 ? 使用 readonly 只读属性
interface Person3{
    readonly id:number;
}

let p3:Person3={
    id:1
}
// p3.id = 2;无法修改
//场景四: 如何对函数进行约束?  函数类型的接口
interface Discount{
    (price:number):number
}

const discount:Discount = (price:number):number=>{
    return price * 8;
}

//场景五:如何对数组进行约束 ? 使用可索引接口
//如何对数组和对象进行约束
interface User{
    [index:number]:string
}
let user:User = {
    1:'1',2:'2',3:'3'
}

let arr:User = ['1','2','3']

//如何用接口约束我们的类
interface SpeakAble{
    speak():void
}

//场景六: 如何对构造函数进行约束 ? 在接口中添加 new 类型的函数约束
class Animal{
    constructor(public name:string) {
    }
}
//构造函数类型 如何对构造函数进行约束
//加上 New 之后就是对构造函数的约束
interface WithNameClass{
    new(name:string):any
}
//用来描述构造函数的约束
let wc:WithNameClass = Animal;
function createAnimal(clazz:WithNameClass,name:string){
    return new clazz(name);
}

let a = createAnimal(Animal,'zhufeng');

namespace A {
    /***
     * 场景七:如何对类进行约束 ? 除了接口 还可以使用类进行
     * 场景八:如何对类的实例进行约束 ? 类和接口
     *
     * 类有两种用途 既可以描述类本身 也可以描述类的实例
     * 1.描述的是类的类型是什么,就是说它对类的本身进行了约束
     * 2.描述的是类的实例的约束
     */

    class Component{
        static myName:string = "静态名称属性";
        myName:string = '实例名称属性';
    }

    let com = Component;
    //Component 类名本身表示的是实例的类型
    //ts 一个类类型 一个叫值
    //冒号后面的是类型 放在=后面的则是值
    //对类的实例对象进行约束
    let c:Component = new Component();
    //对类进行约束
    let f: Component = com;
    // 获取 Component 的类型
    let d:typeof Component = com;
    console.log(typeof Component)
}


namespace B {
    //技巧:接口描述函数的时候,它并不需要写成实际的函数样子,但是如果对象中的函数就需要
    //描述的是一个函数--如果就是描述一个函数 那么它的主体就是这个函数
    interface Type1{
        (name:string):any
    }
//描述的是一个对象中有一个a的函数
    interface Type2{
        a:(name:string)=>any
    }

    let t1:Type1 = (name:string)=>{};
    let t2:Type2 = {
        a:t1
    }
}

namespace C{
    //描述的是一个函数--如果就是描述一个函数 那么它的主体就是这个函数,
    interface Type1{
        (name:string):any
         //描述的是函数的属性
         age:number
    }
//描述的是一个对象中有一个a的函数
    interface Type2{
        a:Type1
    }
    //建立一个函数
    let t:any = (name:string)=>{};
    t.age= 20;
    let t1:Type1 = t;
    let t2:Type2 = {
        a:t1
    }
}