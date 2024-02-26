/**
 * 类型别名
 * */
export {}

type A = string;

//抽离一组联合类型
type StatusCode = 200 | 300|400|500|502;
type PossibleDataTypes = string|number|(()=>unknown);

//抽离一个函数类型
type Handler = (e:Event)=>void;
const clickHandler:Handler = (e)=>{};
const moveHandler:Handler = (e)=>{};
const dragHandler:Handler = (e)=>{};

//声明一个对象类型
type ObjectType = {
    name:string;
    age:string;
}

//泛型坑位
type Factory<T> = T | number | string;
//使用的时候
const foo:Factory<boolean> = true;
const foo1:Factory<string> = "string";
const foo2:Factory<number> = 111;

//实际上我们可以把这个泛型直接定义好
type FactorWithBool = Factory<boolean>;
type FactorWithString = Factory<string>;
type FactorWithNumber = Factory<number>;

const foo3:FactorWithBool = true;
const foo4:FactorWithString = "string";
const foo5:FactorWithNumber = 1111;

//我们不仅仅可以使用 T 还可以使用大写的 T / K /U / V / M /O 实际上它就是个形参
//或者干脆驼峰命名
type Factory1<NewType> = NewType | number | string;

//现在我们声明一个简单而有实际意义的工具类型:
//接受一个类型--并返回一个包括null的联合类型
type MayBeNull<T> = T | null;
//等等 我好像不设置null也是这样
function process(input:MayBeNull<{handler:()=>{}}>){
    input?.handler()
}

//可能是数组
type MaybeArray<T> = T | T[];
function ensureArray<T>(input:MaybeArray<T>):T[]{
    return Array.isArray(input) ? input:[input]
}

const array1 = ensureArray<number>(1);
const array2 = ensureArray<number>([1,2,3]);
const array3 = ensureArray<string>("name");
const array4 = ensureArray<string>(["1","2","3","4"]);
const array5 = ensureArray<boolean>(true);
const array6 = ensureArray<boolean>([true,false,false]);

//声明一个交叉类型

//对象类型
interface NameStruct{
    name:string;
}

interface AgeStruct{
    age:number
}

type ProfileStruct = NameStruct & AgeStruct;

const proFile:ProfileStruct = {
    name:"juejin",
    age:20
}
//普通类型
type StrAndNum = string & number;
//对象类型的同名属性类型
type Struct1 = {
    primitiveProp: string;
    objectProp: {
        name: string;
    }
}

type Struct2 = {
    primitiveProp: number;
    objectProp: {
        age: number;
    }
}

//联合类型 的交叉类型
type Composed = Struct1 & Struct2;
type PrimitivePropType = Composed['primitiveProp']; // never
type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }

type UnionIntersection1 = (1|2|3) & (1|2);
type UnionIntersection2 = (string|number|symbol) & string;

//索引类型
//索引签名类型主要指的是在接口或类型别名中，通过以下语法来快速声明一个键值类型一致的类型结构：
interface AllStringTypes {
    [key:string]:string;
}

type AllStringType = {
    [key:string]:string;
}

//声明的索引类型可以通过一个键的 value 拿到我们声明的类型
type PropType1 = AllStringTypes["899"];

//只可以声明一个索引类型,其他的类型也需要遵守索引类型的声明
interface AllStringTypess  {
    // propA:number; //ERROR TS2411: Property 'propA' of type 'number' is not assignable to 'string' index type 'string'.
    [key:string]:string
}

//我们可以设置成联合类型来视频这种情况
interface StringOrBooleanTypes{
    propA:number;
    propB:boolean;
    [key:string]:number|boolean;
}

//同样我们可以设置一个 any 来
interface AnyTypeHere {
    [key:string]:any;
}
const foo10: AnyTypeHere['linbudu'] = 'any value';

//索引类型访问
//我们可以通过obj[expression]的方式来动态访问一个对象的类型,而在ts中我们可以通过 属性来访问属性 牛逼不?

namespace B{
    interface NumberRecord{
        [key:string]:number;
    }
    //这里我们拿到的就是 类型
    type PropType = NumberRecord[string];//number

    //更直观的方式
    interface Foo{
        propA:number;
        propB:number;
    }

    //这里是使用的字符串字面量类型,而不是一个javascript的字符串值.
    type PropAType = Foo["propA"];//number
    type PropBType = Foo["propB"];//number
    //索引类型查询的本质,通过键的字面量类型('propA')访问这个键对应的键值类型(number)

    //我们可以通过keyof 一次获取所有的属性
    interface Foo1{
        propA:number;
        propB:string;
        propC:boolean;
    }
    //这里不要和上面的搞混了
    type PropTypeUnion = Foo1[keyof Foo1]; //string | number | boolean


}

namespace C{
    //映射类型
    type Stringify <T> = {
        [k in keyof T] : string;
    }
    //解释一下上面的逻辑:
    //我们通过keyof拿到 T 这个对象类型中所有的健名组成的字面量联合类型 比如上面的 keyof Foo1 它的值就是 propA | propB | propC
    //接着通过 in 这个关键字 映射类型 将这个联合类型的每一个成员映射出来 ,其实就是遍历出来,然后把每一个遍历的值 都赋值为右边的那个.

    interface Foo {
        prop1: string;
        prop2: number;
        prop3: boolean;
        prop4: () => void;
    }

    type StringifiedFoo = Stringify<Foo>;

    // 等价于
    interface StringifiedFoo1 {
        prop1: string;
        prop2: string;
        prop3: string;
        prop4: string;
    }
}

//类型查询的操作符
namespace D{
    const str = "xxx";
    const obj  ={name:"xxxx"};
    const nullVal:any = null;
    const undefinedVal:any = undefined;
    const func = (input:string)=>{
        return input.length >10;
    }
    //现在我们可以通过typeof来拿到这些值的类型了
    type Str = typeof str;//"xxx"
    type Obj = typeof obj;//{name: string}
    type Null = typeof nullVal;//any 因为我们规定了
    type Undefined = typeof undefined; // undefined
    type Func = typeof func; // (input: string) => boolean

    //通过typeof拿到func它的类型
    const func2:typeof func = (name:string)=>{
        return name === "linddd"
    }
    //它拿到的是最小的推导类型
    //不需要担心和typeof 混用
}
//类型守卫
// 它会随着你的代码逻辑不断尝试收窄类型
namespace D {
    function foo(input:string|number){
        if(typeof input === "string"){

        }
        if(typeof input === "number"){

        }
    }

    declare const strOrNumOrBool: string | number | boolean;

    if (typeof strOrNumOrBool === "string") {
        // 一定是字符串！
        strOrNumOrBool.charAt(1);
    } else if (typeof strOrNumOrBool === "number") {
        // 一定是数字！
        strOrNumOrBool.toFixed();
    } else if (typeof strOrNumOrBool === "boolean") {
        // 一定是布尔值！
        strOrNumOrBool === true;
    } else {
        // 要是走到这里就说明有问题！
        const _exhaustiveCheck: never = strOrNumOrBool;
        throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
    }
}
//把if 语句 分离出去呢
namespace E{
    function isString(input:unknown):boolean{
        return typeof input === "string";
    }
    function foo(input:string|number){
        //使用它判断以后 我们还是不能推导出来 它是一个string类型
        //TS2339: Property 'replace' does not exist on type 'string | number'.
        // Property 'replace' does not exist on type 'number'.
        if(isString(input)){
            // (input).replace("linbudu", "linbudu599")
        }
        if (typeof input === 'number') {}
    }
}

//如何解决上面 控制流中断的问题呢? 那就是使用 is 关键字
namespace F{
    function isString(input:unknown):input is string{
        return typeof input === "string"
    }

    function foo(input: string | number) {
        //现在这里没有问题了  可以正确的拿到 判断后input 的类型
        if (isString(input)) {
            // 正确了
            (input).replace("linbudu", "linbudu599")
        }
        if (typeof input === 'number') { }
        // ...
    }
}

//类型守卫函数中并不会对判断逻辑和实际类型的关联进行检查
namespace G{
    function isString(input:unknown):input is number{
        return typeof input === "string"
    }

    function foo(input: string | number) {
        //现在这里没有问题了  可以正确的拿到 判断后input 的类型
        if (isString(input)) {
            // 正确了
            // (input).replace("linbudu", "linbudu599")
        }
        if (typeof input === 'number') { }
        // ...
    }
}
//常见的类型守卫
namespace H{
    export type Falsy = false | "" | 0 | null | undefined;
    //判断是不是 false
    export const isFalsy = (val:unknown):val is Falsy => !val;
    //判断是不是 常用的值
    export type Primitive = string|number|boolean|undefined;
    export const isPrimitive = (val:unknown):val is Primitive=>['string', 'number', 'boolean' , 'undefined'].includes(typeof val);
}

namespace I{
    interface Foo{
        foo:string;
        fooOnly:boolean;
        shared:number;
    }
    interface Bar{
        bar:string;
        barOnly:boolean;
        shared:number;
    }
    function handle(input:Foo|Bar){
        if('foo' in input){
            input.fooOnly;
        }else{
            input.barOnly;
        }
    }
}