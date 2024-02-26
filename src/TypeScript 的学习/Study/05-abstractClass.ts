/***
 * 抽象类
 */

export {}
abstract class Animal{
    name:string;
    abstract speak():void
}

class Cat extends Animal{
    speak():void {
        console.log('喵喵喵')
    }
}

class Dog extends Animal{
    speak():void {
        console.log('汪汪汪')
    }
}

/**
 * 重写(override) 子类重写继承自父类的方法 有自己的一套实现
 * 重载(overload) 函数的重载 我们可以定义很多的实现
 * */
function double(val:string):string
function double(val:number):number
function double(val:any):any{
    if(typeof val === "number"){
        return  val * 2;
    }else if(typeof val === 'string'){
        return val+val
    }
}

double(2);
double('a');