/***
 * 类型保护
 * typeof instanceOf
 */
export {}

//typeof
function add(val:string|number){
    if(typeof val === 'string'){

    }else if(typeof val === "number"){

    }
}

//instanceOf
class Animal{}
class Bird extends Animal{}
class Dog extends Animal{}
function getName(animal:Animal){
    if(animal instanceof Bird){

    }else if (animal instanceof Dog){

    }
}

//null 保护
function getFirstLetter(s:string|null):string|null{
     s = s ||"";
    // return s?.charAt(0)
    return s.charAt(0)
}

//可辨识的联合类型
interface WarningButton{
    class :'waring',
    text:'修改'
}

interface DangerButton{
    class:"danger",
    text:"删除"
}
type Button = WarningButton | DangerButton;
function getButton(button:Button){
    if(button.class === "waring"){

    }else if(button.class === "danger"){

    }
}

//通过共同的type来定义的类型
interface User{
    userName:string
}
type Action = {
    type:'add',payload:User
} | {type:'delete',payload:number}

const reducer = (action:Action)=>{
    switch (action.type){
        case "add":
            //这里就定义好了
            action.payload.userName;
            break;
        case 'delete':
            let id:number = action.payload;
            break;
    }
}

//自定义的类型保护 难度🎃🎃
interface Bird{
    leg:number;//2
}
interface Dog{
    leg:number;//4
}
// function isType(type:Type1|Type2):type is Type1{
//
// }
//自定义判断它是哪个类型
function isBird(x:Bird|Dog):x is Bird{
    return x.leg === 2
}

function getAnimal(x:Bird|Dog){
    if(isBird(x)){
        console.log(x)
    }else{
        console.log(x)
    }
}

//unknown 是 any 的安全类型
//any 和 unknown 对比学习
//any 可以对any进行任何操作,而不做类型检查
let value:any;
value =1;
value = true;
value = '1'
value.foo();

//unknown 是顶级类型 任何类型可以赋值给unknown类型
let value2:unknown;
 value2 = true;
value2 = 1;
value2 = [];
//TS2339: Property 'foo2' does not exist on type 'unknown'.
// value2.foo2();

//如果想调用unKnown上的方法和属性
value2 = 'hello';
//断言
console.log((value2 as string).length)
//联合类型中的unknown,不管和谁联系,最后全都是unknown
type U1 = unknown|null;
type U2 = unknown|number;
type U3 = unknown|string;
type U4 = unknown|number[];

//交叉类型
interface A{name:string,c:number}
interface B{age:number,c:number}
type C = A & B ; //C 是 A 的子类型 也是 B 的子类型
let c:C = {name:'zhufeng',age:10,c:10}
let a:A;
let b:B;
//c 是 a 的子类 所以既可以给a 也可以给b
a = c;
b = c;

//交叉类型
type AA = string|number;
type BB = string|boolean;
//交叉类型并不是并集 它满足的是 它要既可以满足 AA 也可以满足 BB
type CC = AA & BB;

//never 是unknown 子类型
type isNever = never extends unknown ? true :false;
type keys = keyof unknown;

let aa:unknown;
let bb:unknown;
