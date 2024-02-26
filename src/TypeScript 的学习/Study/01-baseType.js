"use strict";
var a = "1111";
var married = true;
var age = 20;
var first_name = 'zf';
var arr1 = [1, 2, 3];
var arr2 = [12, 3, 4];
var arr3 = ["1"];
//元组类型tuple 数量和类型已知的数组
var zhufeng = ["zhufeng", 10];
//普通 枚举类型
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
console.log(Gender.GIRL);
console.log(Gender.BOY);
console.log(Gender);
var myColor = [0 /* Colors.RED */, 1 /* Colors.YELLOW */, 2 /* Colors.BLUE */];
//任何类型
// let root:any = document.getElementById("root");
// root.start.color = 'red';
// let element:(HTMLElement|null) = document.getElementById('root');
// element!.style.color = "blue"; //非空断言
//null undefined 是其他类型的子类型, strictNullChecks = true 就不能设置为其他类型
var x;
x = 1;
// x = undefined;
// x = null;
//联合类型
var y;
y = 1;
y = undefined;
y = null;
//never 代表不会出现的值
//1.作为不会返回的函数的返回值类型
function error(message) {
    throw new Error("报错了");
    console.log("ddd");
}
function loop() {
    while (true) {
    }
    console.log('ok');
}
function fn(x) {
    if (typeof x === 'number') {
        console.log(x);
    }
    else if (typeof x === "string") {
        console.log(x);
    }
    else {
        console.log(x); //这里就是never
    }
}
//void 代表没有返回值 没有任何类型
// 函数没有返回,那么就是void类型
//可以返回undefined 而不能是null
// strictNullChecks = false null 可以赋值为 void,
//true的时候就不行
function greeting() {
    return undefined;
}
function greeting1() {
    // return null
}
//void never 的区别
//void 可以又被赋值为 Null undefined,
//never 不能包含任何类型
//返回类型为void的函数能执行,但是返回never的函数无法正常执行,比如只能报错
//Symbol
var s1 = Symbol('key');
var s2 = Symbol('key');
// console.log(s1 === s2)
//BigInt
// const max = Number.MAX_SAFE_INTEGER;//2**53-1
var max = BigInt(Number.MAX_SAFE_INTEGER);
// console.log(max +1n === max+2n)
//BigInt 和 Number 并不兼容
var foo;
var bar;
//类型推导
var uname;
uname = 1;
uname = '1';
uname = undefined;
var uname2 = "1";
// uname2 =1; //这个时候他就推导出来了
//包装对象 wrapper object 自动装箱
//原始类型 对象类型
//原始类型 string
var name2 = "zhufeng";
//会自动装箱 原始类型转换成对象类型,然后又瞬间变回来
console.log(name2.toLowerCase());
//联合类型 如果没有赋值的时候,只能访问公共的属性
var name3;
console.log(name3.toString());
name3 = 3;
console.log(name3.toString(2));
name3 = "zhufeng";
console.log(name3.length);
//类型断言
var name4;
console.log(name4.toString());
console.log(name4.length);
//双重断言 先断言成any 然后再断言成boolean
console.log(name4);
//字面量类型和类型字面量
var up = 'UP';
var down = 'down';
var left = 'left';
var right = 'right';
//可以实现枚举的效果
function move(direction) {
}
move("up");
var p1 = {
    name: "张三",
    age: 20
};
