/***
 * 11- 类型推断
 */
export {}

//1.从右向左推断出来
let foo = 1;
//TS2322: Type 'string' is not assignable to type 'number'.
// foo = 'st';
//2.从底流出 从返回值推断出来
function add(a:number,b:number){
    return a+b;
}

let c = add(1,2);

//3.从左向右
type Sum  =(a:number,b:number)=>number;
//根据Sum 推断出来类型
let sum:Sum =(a,b)=>{
    return a+b;
}
//类似于 对象
let person = {
    name:"zhufeng",
    age:11
}
// let name = person.name;
// let age = person.age;
//类似于 数组
let {name,age} = person;

interface DefaultProps{
    name?:string,
    age?:number
}

let defaultProps : DefaultProps= {
    name:"珠峰",
    age:11
}

let props = {
    ...defaultProps,
    home:'北京'
}
//typeof 拿到值的类型 也就是它的约束 它对自己的描述
//其中有一部分是defaultProps的类型,所以它也拿了过来,
type propsType = {
    name?:string, //他们两个不是必须的
    age?:number,//他们两个不是必须的
    home:string//它是必须的
}
type Props = typeof props;

//交叉类型
//交叉类型 (intersection Types) 是将多个类型合并成为一个类型
//这让我们可以将现有的多个类型叠加在一起成为一种类型,它包含了所需的所有类型的特性

interface Bird{
    name:string,
    fly():void
}

interface Person{
    talk():void
}

type BirdPerson = Bird & Person;
let p1:BirdPerson = {
    name:"珠峰",
    fly(){},
    talk() {}
}

interface X {
    a:string | number;
    b:string
}
interface Y{
    a:number|boolean;
    c:string
}

type XY = X & Y;
type YX = Y & X;

let xy:XY = {a:1,b:"",c:""};

type T1 = string | number;
type T2 = number | boolean;
type T3 = T1 & T2;//Initial type:number 交叉类型
type T4 = T1 | T2; //Initial type:string | number | boolean 联合类型

//mixin 混入
interface AnyObject{
    [props:string]:any
}

function mixin<T,U>(one:T,two:U){
    type TU = T & U;
    const result:TU = <TU>{};
    for(let key in one){
        //这里做一个强转
        (<T>result)[key] = one[key];
    }
    for(let key in two){
        //这里做一个强转
        (<U>result)[key] = two[key];
    }
    return result;
}

const x = mixin({name:"zhufeng"},{age:11});

//typeof type
//先定义类型,再定义变量
namespace A{
    type Person3={
        name:string
    }
    let p3:Person3={
        name:'zhufeng'
    }
    let p4 = {
        name:"zhufeng"
    }
    //反推类型
    type P4 = typeof p4;

    //索引访问操作符
    interface Person5{
        name:string;
        age:number;
        job:{
            name:string
        }
    }
    let person:Person5 = {
        name:"张三",
        age:10,
        job:{
            name:"程序员"
        }
    }

}












