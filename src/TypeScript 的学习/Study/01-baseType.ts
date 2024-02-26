let a:string  = "1111";
let married:boolean = true;
let age:number = 20;
let first_name:string = 'zf';
let arr1:number[] = [1,2,3];
let arr2:Array<number> = [12,3,4];
let arr3:Array<string> = ["1"];
//元组类型tuple 数量和类型已知的数组
let zhufeng:[string,number] = ["zhufeng",10];

//普通 枚举类型
enum Gender{
    GIRL,
    BOY
}

console.log(Gender.GIRL);
console.log(Gender.BOY)
console.log(Gender)

//常量枚举
const enum Colors{
    RED,YELLOW,BLUE
}
let myColor = [Colors.RED,Colors.YELLOW,Colors.BLUE]

//任何类型
// let root:any = document.getElementById("root");
// root.start.color = 'red';

// let element:(HTMLElement|null) = document.getElementById('root');
// element!.style.color = "blue"; //非空断言

//null undefined 是其他类型的子类型, strictNullChecks = true 就不能设置为其他类型
let x:number ;
x = 1;
// x = undefined;
// x = null;

//联合类型
let y:number|number|undefined|null;
y = 1;
y = undefined;
y = null;

//never 代表不会出现的值
//1.作为不会返回的函数的返回值类型
function error(message:string):never{
    throw new Error("报错了");
    console.log("ddd")
}

function loop():never{
    while (true){

    }
    console.log('ok')
}

function fn(x:number|string){
    if(typeof x === 'number'){
        console.log(x)
    }else if(typeof x === "string"){
        console.log(x)
    }else{
        console.log(x);//这里就是never
    }
}

//void 代表没有返回值 没有任何类型
// 函数没有返回,那么就是void类型
//可以返回undefined 而不能是null
// strictNullChecks = false null 可以赋值为 void,
//true的时候就不行
function greeting():void{
    return undefined;
}
function greeting1():void{
    // return null
}

//void never 的区别
//void 可以又被赋值为 Null undefined,
//never 不能包含任何类型
//返回类型为void的函数能执行,但是返回never的函数无法正常执行,比如只能报错

//Symbol
const s1 = Symbol('key');
const s2 = Symbol('key')
// console.log(s1 === s2)

//BigInt
// const max = Number.MAX_SAFE_INTEGER;//2**53-1
const max = BigInt(Number.MAX_SAFE_INTEGER);
// console.log(max +1n === max+2n)

//BigInt 和 Number 并不兼容
let foo:number ;
let bar:bigint;

//类型推导
let uname;
uname = 1;
uname = '1';
uname = undefined;

let uname2 = "1";
// uname2 =1; //这个时候他就推导出来了

//包装对象 wrapper object 自动装箱
//原始类型 对象类型
//原始类型 string

let name2 = "zhufeng";
//会自动装箱 原始类型转换成对象类型,然后又瞬间变回来
console.log(name2.toLowerCase());

//联合类型 如果没有赋值的时候,只能访问公共的属性
let name3:string | number;
console.log(name3!.toString());
name3 = 3;
console.log(name3.toString(2));
name3 = "zhufeng";
console.log(name3!.length)

//类型断言
let name4:string|number;
console.log((name4! as number).toString())
console.log((name4! as string).length)
//双重断言 先断言成any 然后再断言成boolean
console.log(name4! as any as  boolean);

//字面量类型和类型字面量
const up:'UP' = 'UP';
const down:'down' = 'down';
const left:'left' = 'left';
const right:'right' = 'right';

//申明一个类型
type Direction  = "up" | "down" | "left" | "right";
//可以实现枚举的效果
function move(direction:Direction){

}
move("up");
//类型字面量
type Person = {
    name:string,
    age:number
}

let p1 :Person = {
    name:"张三",
    age:20
}

//字符串字面量和联合类型
type T1 = '1' | '2' | '3';
//联合类型 注意他们两个的区别 一个的值它只能是定义的值,而另外一个则可以其中一种类型之一
type T2 = string|number|boolean;
