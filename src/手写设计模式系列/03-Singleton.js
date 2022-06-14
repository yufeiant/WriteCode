/**
 * 03-Singleton 单例模式
 * 单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 * */

/**
 * 01-简单版：
 * 原理：利用函数对象的变量来保存实例对象，如果函数对象上有保存这个实例就返回没有就创建
 * 缺陷：不够透明，在使用之前就必须知道这个类是一个单例的类，需要通过Singleton.getInstance方法才可以拿到
 * 这个类的单例的实例。
 * */

//A--构造函数+静态函数的思想
const Singleton = function (name){
    this.name = name;
}

//给函数对象添加一个变量来存储构造函数的实例
Singleton.instance = null;
//返回
Singleton.prototype.getName = function (){
    console.log(this.name);
}

Singleton.getInstance = function (name){
    if(!this.instance){
        this.instance = new Singleton(name);
    }
    return this.instance;
}

const a = Singleton.getInstance("a");
const b = Singleton.getInstance("a");

console.log(a === b)

//B--使用类和静态函数实现
class Singleton1 {
    static instance = null;
    static getInstance (name){
        //这里的this是 函数对象
        if(this.instance === null){
            this.instance = new Singleton1(name)
        }
    }
    constructor(name) {
        this.name = name;
    }
}

const c = Singleton1.getInstance("c")
const d = Singleton1.getInstance("c")

console.log(c === d)

//C--使用闭包的方式实现
const Singleton2 = function (name){
    this.name = name;
}

Singleton2.prototype.getName = function (){
    console.log(this.name);
}

//这里边是一个立即执行函数---getInstance返回的值应该是里面的那个函数，
Singleton2.getInstance = (function (name){
    let instance = null;
    return function (){
        if(!instance){
            instance = new Singleton2(name);
        }
        return instance;
    }
})()

const e = Singleton2.getInstance("e");
const f = Singleton2.getInstance("f");

console.log(e === f)

/**
 * 02--透明的单例模式
 *
 * 原理：
 *
 * 利用闭包保存一个变量，在返回的构造函数中，判断如果有这个变量，就返回，
 * 如果没有就走构建流程。
 *
 * 缺陷：违反了单一指责原则
 * 可以看到实际上我们的构造函数中做了两件事儿：
 * 第一件事儿是维护实例只有一个，
 * 第二件事儿是构建实例。
 * 违反了单一职责原则。
 * 这段代码记得要在浏览器中执行
 * */
const CreateDiv = (function (){
    let instance ;
    const CreateDiv = function (html){
        if(instance){
            return instance
        };
        this.html = html;
        this.init();
        return instance = this;
    }
    CreateDiv.prototype.init = function (){
        const div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }
    return CreateDiv;
})();

const aa = new CreateDiv("sven1");
const bb = new CreateDiv("sven2");

console.log(aa === bb)

/**
 * 03-用代理的方式实现单例模式
 * 原理：
 * 把职责分开，要创建的对象就是一个普通的对象，而如果想要实现单例，只需要给它套上一个代理就可以。
 * 利用闭包的方式来存储变量，模式都是这样。
 * 缺陷：还是有一点繁琐，可以把这个单例的逻辑做进一步拆分吗？
 * */

const CreateDiv1 = function (html){
    this.html = html;
    this.init();
}
CreateDiv1.prototype.init = function (){
    const div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}

//引入代理类
const ProxySingletonCreateDiv = (function (){
    let instance = null;
    return function (html){
        if(!instance){
            instance = new CreateDiv1(html);
        }
        return instance;
    }
})()

const ab = new ProxySingletonCreateDiv("sv1");
const ac = new ProxySingletonCreateDiv("sv2");
console.log(ab === ac)

/**
 * 04--通用的惰性单例
 * 原理：利用闭包的方式，保存变量，保存的变量是返回的函数执行后的结果
 * */
const getSingle = function (fn){
    let result ;
    return function (){
        if(!result){
            result = fn.apply(this,arguments);
        }
        return result;
    }
}

const Person = function (name){
    this.name = name;
}

function CreatePerson (name){
    return new Person(name)
}

const createSingleInstance = getSingle(CreatePerson);
const abb = createSingleInstance("张三");
const abc = createSingleInstance("李四");

console.log( abb === abc )

/**
 * 单例模式的套路
 * */
const getSingle = function (fn){
    let result ;
    return function (){
        if(!result){
            result = new XXX();
        }
        return result;
    }
}