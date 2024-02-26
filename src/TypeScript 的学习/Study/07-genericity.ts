/***
 * 泛型
 */
export {}

namespace A {
    //创建一个长度为length的数组,里面的值用value进行填充
    function createArray(length:number,value:any):Array<any>{
        let result:any[] = [];
        for(let i = 0;i<length;i++){
            result[i] = value
        }
        return result;
    }

    let result = createArray(3,'1');
    console.log("A",result)
}

namespace B{
    //传入什么类型,返回的就应该是什么类型,但是现在它现在却是自由的
    //也就是类型它应该在使用的时候确定
    function createArray<T>(length:number,value:T):Array<T>{
        let result:T[] = [];
        for(let i = 0;i<length;i++){
            result[i] = value
        }
        return result;
    }
    let result1 = createArray(3,'1');
    let result2 = createArray(4,0);
    console.log("B",result1)
    console.log("B",result2)
}

namespace C{
    //类数组--这里有点问题
    function sum(...args:[]){
        // let args:IArguments = arguments;
        for(let v of args){

        }
    }
    // sum(1,2,3)
}

namespace D {
    //泛型类--所有数据的类型都是相同的
    class MyArray<T>{
        private list: T[] = [];
        add(value:T):void{
            this.list.push(value);
        }
        getMax():T{
            return this.list[0]
        }
    }
    let array = new MyArray<number>();
    array.add(1);
    array.add(2);
    array.add(3);
    array.add(4);
    console.log(array.getMax())
}

namespace E {
    //与new 和约束构造函数相结合
    function factory<T>(type:{new():T}):T{
        return new type();
    }
    class Person{
        name:string = '1';
    }
   let p =  factory<Person>(Person)
    console.log(p.name)
}

namespace F {
    //泛型接口
    interface Calculate<T>{
        (a:T,b:T):T
    }
    let twoSum:Calculate<number> = function (a:number,b:number):number{
        return a+b;
    }
    console.log(twoSum(1,2))

    interface Calculate2{
        <T>(a:T,b:T):T
    }
    let sum2:Calculate2 = function <T>(a:T,b:T):T{
        return a;
    }
    //调用时 确定类型
    sum2<number>(1,2)

    interface Calcuate3<T>{
        <U>(a:T,b:T):U
    }
    //柯里化的实现 两个泛型是分量词确定的 T 是在定义函数的时候确定,而 U则是在使用函数的时候确定
    let sum3:Calcuate3<number> = function<U>(a:number,b:number):U {
        return a as any;
    }
    sum3<number>(1,2)
}

namespace G{
    //泛型可以写过个
    function swap<A,B>(tuple:[A,B]):[B,A]{
            return [tuple[1],tuple[0]]
    }
}

namespace H{
    //默认泛型 和默认参数的用法一样
    function createArray<T = number>(length:number,value:T):Array<T>{
        let result:T[] = [];
        for(let i = 0;i<length;i++){
            result[i] = value
        }
        return result;
    }
    let array1 = createArray<String>(3,"0");
    let array2 = createArray(3,0);
    console.log("H",array1)
    console.log("H",array2)

    interface T2<T = string>{

    }
    //TS2314: Generic type 'T2 ' requires 1 type argument(s).
    type T22 = T2;
}

namespace I{
    //泛型约束 TS 的奥义就是对所有的东西都要加上约束
    //看到什么都想给它来一锤子
    //而这里对泛型的约束 则使用extends的方式
    interface LengthWise{
        length:number
    }
    function logger2<T extends LengthWise>(val:T){
        console.log("I",val.length)
    }
    logger2<string>('abc');
    let obj = {
        length:10
    }
    type Obj = typeof obj;
    logger2<Obj>(obj);

    class GrandFather{}
    class Father extends GrandFather{}
    class Child extends Father{}
    //T 继承了 Father
    function get<T extends Father>(){

    }
    //可以是爷爷
    get<GrandFather>();
    //可以是父亲
    get<Father>();
    //可以是孩子
    get<Child>();
    //它们的判断主要是取决于 形状 和谁继承谁 没有一丁点关系 因为他们三个都是空对象,所以都可以兼容
}

namespace G{
    class GrandFather{
        grandFather:string
        father:string
    }
    class Father extends GrandFather{
        father:string
    }
    class Child {
        child:string
        father:string
        grandFather:string
    }
    //T 继承了 Father
    function get<T extends Father>(){

    }
    //现在它要求必须是包含 father和grandFather
    get<GrandFather>();
    //可以是父亲
    get<Father>();
    //可以是孩子
    get<Child>();
}

namespace H{
    interface Calculate{
        <T extends (number | string)>(a:T,B:T):void
    }
    let sum:Calculate = function<T>(a:T,b:T) :void{
    }
    sum<string>("1","2");
    //如果是 想让 a,b 是同样的类型,就必须我们传入的类型是一起 描述的话应该是联合类型
}