/***
 * 类装饰器
 */

export {}
//类装饰器
namespace A{
    //experimentalDecorators = true 开启装饰器功能
    function addNameEat(constructor:Function){
        constructor.prototype.name = "zhufeng";
        constructor.prototype.eat = function (){}
    }
    @addNameEat
    class Person{
        name:string
        constructor() {
        }
    }
    let p:Person = new Person()
    console.log(p.name)
}

//类的装饰器工厂
namespace B {
    function addNameEatFactory(name:string){
        return function addNameEat(x:Function){
            x.prototype.name = name;
            x.prototype.eat = function (){}
        }
    }
    @addNameEatFactory("鱼")
    class Person{
        name:string;
        eat:Function;
        constructor() {

        }
    }
    let p1:Person = new Person();
    console.log(p1.name)
}

namespace C{
    function replaceClass(constructor:Function){
        return class{
            name:string;
            age:number;
            money:number;
            constructor() {
            }
        }
    }
    // @replaceClass
    class Person{
        name:string;
        eat:Function;
        constructor() {
        }
    }
}
//类的属性的装饰器
namespace D{
    /**
     *
     * @param target 如果是实例属性,target是构造函数的原型
     * @param propertyKey
     * @private
     */
    function upperCase(target:any,propertyKey:string) {
        let value = target[propertyKey];
        const getter = () => value;
        const setter = (newValue: string) => value = newValue.toUpperCase()
        //删掉原来的属性
        if(delete target[propertyKey]){
            Object.defineProperty(target,propertyKey,{
                get:getter,
                set:setter,
                enumerable:true,
                configurable:true
            })
        }
    }

    //如果装饰的是静态属性的话,target是构造函数本身
    function staticPropertyDecorator(target:any,propertyKey:string){
        console.log("staticPropertyDecorator",target)
    }
    //target 是实例
    function noEnumerable(target:any,propertyKey:string,descriptor:PropertyDescriptor){
        console.log(target);
        console.log(propertyKey);
        descriptor.enumerable = false;//禁止遍历
    }
    //先把数据转换数字的装饰器
    function toNumber(target:any,propertyKey:string,descriptor:PropertyDescriptor){
        let oldMethod = descriptor.value;
        descriptor.value = function (...args:any[]){
            args = args.map(item=>parseFloat(item));
            return oldMethod.apply(this,args)
        }
    }

    class Person{
        @upperCase //针对属性的装饰器
        name:string = 'zhufeng';//实例属性
        @staticPropertyDecorator
        static age:number = 20;//静态属性
        @noEnumerable
        getName(){//实例方法
            console.log(this.name);
        }
        @toNumber
        sum(...args:any[]){//实例方法
            return args.reduce((prev:number,current:number)=>prev+current,0)
        }
    }
    let p = new Person();
    console.log(p.name)
   console.log( p.sum("1",2,"3"))
}

//参数装饰器
namespace E {
    //target 静态成员就是构造函数 非静态成员就是构造函数 方法的名称 参数的索引
    function addAge(target:any,methodName:string,paramIndex:number){
        console.log(target,methodName,paramIndex);
        target.age = 10;
    }
    class Person{
        login(userName:string,@addAge password:string){
            console.log(userName,password)
        }
    }
    let p = new Person();
    p.login('1','2')
}

//装饰器的执行顺序
namespace F {

    function classDecorator1() {
       return function (target:any){
           console.log("classDecorator1");
       }
    }

    function classDecorator2() {
       return function (target:any){
           console.log("classDecorator2");
       }
    }

    function PropertyDecorator(name:string){
        return function (target:any,propertyName:string){
            console.log('PropertyDecorator',propertyName,name)
        }
    }

    function MethodDecorator(name:string){
        return function (target:any,propertyName:string){
            console.log('MethodDecorator',propertyName,name)
        }
    }

    function ParameterDecorator(name:string){
        return function (target:any,methodName:string,paramIndex:number){
            console.log('ParameterDecorator',methodName,name)
        }
    }

    @classDecorator1()
    @classDecorator2()
    class Person{
        @PropertyDecorator("name")
        name:string = '';
        @PropertyDecorator("age")
        age:number = 10;
        @MethodDecorator("hello")
        hello(@ParameterDecorator('p1') p1:string,@ParameterDecorator('p2') p2:string){

        }
    }
}
/**
 * PropertyDecorator name name
 * PropertyDecorator age age
 * ParameterDecorator hello p2
 * ParameterDecorator hello p1
 * MethodDecorator hello hello
 * classDecorator2
 * classDecorator1
 * */
/***
 * 执行顺序的规律
 * 1.类装饰是最后执行,后写的类装饰器先执行
 * 2.方法和方法中的参数,参数的装饰器先执行,方法的装饰器后执行
 * 3.方法和属性装饰器,谁在前面谁先执行.
 *
 * 先内后外的执行 :先内后外 先上后下
 */