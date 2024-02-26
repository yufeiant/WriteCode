
/**
 * 函数
 * */

function hello(name:string):void{
    console.log("name",name);
}
//定义一个函数的参数和返回值
type GetName = (firstName:string,lastName:string)=>string;

let getName:GetName = function (firstName, lastName):string{
    return firstName+lastName;
}

//定义一个可选参数
function print(name:string,age?:number):void{
    console.log(name,age)
}
print("zhufeng");

function ajax(url:string,method:string = "GET"):void{
    console.log(url,method)
}

ajax('/');

function sum(...numbers: number []){
    return numbers.reduce((val,item)=>item+val,0)
}

console.log(sum(1,2,3,4));

//函数的重载
let obj:any = {};

function attr(val:number):void;
function attr(val:string):void;
function attr(val:any):void{
    if(typeof val === "string"){
        obj.name = val;
    }else if(typeof val === 'number'){
        obj.age = val;
    }
}

attr('zhufeng');
attr(11)

//为什么会有函数重载的需求呢?它面对是什么样的使用场景?
//实际上它对函数的参数的约束,主要是并行约束,就是A 和 B 两个必须是 是什么类型,
function add(a:string,b:string):void;
function add(a:number,b:number):void;
function add(a:string|number,b:string|number):void{
    console.log(a ,b)
}
//在上面的场景中,a 和 b 两个参数是搭配好的,要不同时都是string,要不同时都是 Number

//用接口来约束函数
interface SearchFunc{
    (source:string,subString:string):boolean
}

let mySearch:SearchFunc;
mySearch = function (source:string, subString:string):boolean{
    return true;
}