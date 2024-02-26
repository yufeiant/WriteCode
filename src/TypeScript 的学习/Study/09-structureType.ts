/***
 * 结构类型系统
 */

//接口的兼容性
export {}

namespace A {
    interface IAnimal{
        //使用 IAnimal 的约束就是必须要有name和age
        name:string;
        age:number
    }
//而 IPerson 中的属性已经包含了 name和age 所以可以兼容IAnimal
    interface IPerson{
        name:string;
        age:number;
        gender:number
    }

    function getName(instance:IAnimal):string{
        return instance.name;
    }

    let cat:IAnimal = {
        name:"猫儿",
        age:1
    }
    getName(cat);
    let person:IPerson = {
        name:"张三",
        age:20,
        gender:0
    }
//为什么IPerson 可以兼容 IAnimal ?
    getName(person);
}

namespace B{
    //基本数据类型的兼容性
    let num:string | number;
    let str:string = "zhufeng";
    num = str;

    let num2:{
        toString():string
    }
    //你要的我有就兼容 你要的我没有就不兼容
    let str2:string = 'jiagou';
    num2 = str2;
}

namespace C{
    //类的兼容性
    class Animal{name:string}
    class Bird extends Animal{age:number}
    let a:Animal;
    let b:Bird;
    a = b;
    //TS2741: Property 'age' is missing in type 'Animal' but required in type 'Bird'.
    // b = a;
    //这个关键是看形状 而不是看原型
}

namespace D{
    //函数的兼容性 难点 五颗星🎃🎃🎃🎃🎃
    //比较参数 比较返回值
    type Func = (a:number,b:number)=>void;
    let sum:Func;
    function f1(a:number,b:number):void{}
    //这种的就符合 Func的形状 考察的是参数和返回值 参数只可以少,不可以多
    sum = f1;
    //参数少一个可以
    function f2(a:number):void{}
    sum = f2;
    //少两个参数也可以
    function f3():void{}
    sum = f3;
    //多个参数呢?就不可以
    function f4(a:number,b:number,c:number):void{}
    // TS2322: Type '(a: number, b: number, c: number) => void' is not assignable to type 'Func'.
    // sum = f4;
}

//比较返回值
namespace E{
    //这是一个类型定义,并不是一个箭头函数
    type GetPerson = ()=>{name:string,age:number}
    let getPerson:GetPerson;
    function g1(){
        return {name:'zhufeng',age:10}
    }
    //返回值它要求是必须包含name和 age 这两个属性
    getPerson = g1;
    function g2(){
        return {name:'zhufeng',age:20,gender:0}
    }
    //可以多,但是不可以少
    getPerson = g2;
    function g3(){
        return {name:'zhufeng'}
    }
    //不可以少
    //TS2322: Type '() => { name: string; }' is not assignable to type 'GetPerson'.   Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'.
    // getPerson = g3;
}

//一切的一切是为了类型安全

//函数的协变与逆变
//A <= B 意味着 A 是 B的子类型
//A --> B 指的是以 A 为参数类型,以 B为返回值类型的函数类型
//返回值类型是协变,而参数类型是逆变的

//返回值类型可以传子类,参数可以传父类
//参数逆变父类,返回值协变子类 馋你父,反鞋子

namespace F{
    class Animal{}
    class Dog extends Animal{
        public name:string = 'Dog'
    }
    class BlackDog extends Dog{
        public age:number = 10;
    }
    class WhiteDog extends Dog{
        public home:string = '北京'
    }
    let animal:Animal;
    let dog:Dog;
    let blackDog:BlackDog;
    let whiteDog:WhiteDog;
    type Callback = (dog:Dog)=>Dog;
    function exec(callback:Callback):void{
        //TS2345: Argument of type 'Animal' is not assignable to parameter of type 'Dog'.   Property 'name' is missing in type 'Animal' but required in type 'Dog'.
        // callback(animal);
        // callback(dog);
        // callback(blackDog);
        // callback(whiteDog);
    }

    /***
     * 参数可以传自己和自己的父类
     * 返回值可以传自己和自己的子类
     * 四种情况
     * 1.参数传子类返回值子类
     * 2.参数是子类返回值是父类
     * 3.参数是父类返回值是父类
     * 4.参数是父类返回值是子类
     */
    //1.参数传子类    返回值子类
    //参数可以传自己和自己的父类 而我们这里的参数是 Dog的子类 BlackDog 所以报错
    //
    type ChildToChild = (blackDog:BlackDog)=>BlackDog; //Y
    let childToChild:ChildToChild;
    // exec(childToChild); //n
    //2.参数是子类    返回值是父类
    // 参数可以传自己和自己的父类 所以参数是子类的话就会报错
    type ChildTOParent = (blackDog:BlackDog)=>Animal;//N
    let childToParent :ChildTOParent;
    // exec(childToParent)//n
    //3.参数是父类  返回值是父类
    //参数可以传自己和自己的父类 满足
    //返回值是自己或者自己的子类 而现在返回值是父类 所以报错
    type ParentToParent = (animal:Animal)=>Animal;//Y
    let parentToParent:ParentToParent;
    // exec(parentToParent)//n
    //4.参数是父类返回值是子类
    //参数可以传自己和自己的父类 满足
    //返回值可以是自己或自己的子类 满足
    //所以没有报错
    type ParentToChild = (animal:Animal)=>BlackDog;//Y
    let parentToChild:ParentToChild;
    exec(parentToChild)//y

}

namespace G{
    /***
     *
     * 这里和上面有一个区别是:
     * 基本类型的父类的表现是 多的那个父类 少的那个是子类
     * 比如 type Father = string | number | boolean
     *     type Child = string
     *
     * 参数可以传自己和自己的父类
     * 返回值可以传自己和自己的子类
     * 四种情况
     * 1.参数传子类返回值子类
     * 2.参数是子类返回值是父类
     * 3.参数是父类返回值是父类
     * 4.参数是父类返回值是子类
     */
    type Callback = (a:string|number)=>string|number;
    function exec(callback:Callback){

    }
    //1.子 --> 子 不可以
    type ChildToChild = (a:string)=>string;
    let childToChild:ChildToChild;
    // exec(childToChild);
    //2.子-->父 不可以
    type ChildTOParent = (a:string)=>string|number|boolean;//N
    let childToParent :ChildTOParent;
    // exec(childToParent)//n
    //3.父-->父 不可以
    type ParentToParent = (a:string|number|boolean)=>string|number|boolean;//Y
    let parentToParent:ParentToParent;
    // exec(parentToParent)//n
    //4.父-->子
    type ParentToChild = (a:string|number|boolean)=>string
    let parentToChild:ParentToChild;
    exec(parentToChild)//y
}






















