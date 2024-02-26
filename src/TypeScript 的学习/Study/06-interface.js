"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//功能一:描述对象的形状
var speakMan = {
    name: 'zhufeng',
    speak: function () { }
};
//类可以实现多个接口
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.eat = function () {
    };
    Person.prototype.speak = function () {
    };
    return Person;
}());
var p = {
    id: 1,
    name: "zhufeng",
    //只能定义已经定义的属性
    //Type '{ id: number; name: string; age: number; }' is not assignable to type 'Person2'.   Object literal may only specify known properties, and 'age' does not exist in type 'Person2'.
    // age:10
    //设置了[key:string]:any 后
    age: 10,
    home: 11,
};
var ChineseMan = /** @class */ (function () {
    function ChineseMan() {
    }
    ChineseMan.prototype.speak = function () {
    };
    ChineseMan.prototype.speakChinese = function () {
    };
    return ChineseMan;
}());
var p3 = {
    id: 1
};
var discount = function (price) {
    return price * 8;
};
var user = {
    1: '1', 2: '2', 3: '3'
};
var arr = ['1', '2', '3'];
//场景六: 如何对构造函数进行约束 ? 在接口中添加 new 类型的函数约束
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
//用来描述构造函数的约束
var wc = Animal;
function createAnimal(clazz, name) {
    return new clazz(name);
}
var a = createAnimal(Animal, 'zhufeng');
var A;
(function (A) {
    /***
     * 场景七:如何对类进行约束 ? 除了接口 还可以使用类进行
     * 场景八:如何对类的实例进行约束 ? 类和接口
     *
     * 类有两种用途 既可以描述类本身 也可以描述类的实例
     * 1.描述的是类的类型是什么,就是说它对类的本身进行了约束
     * 2.描述的是类的实例的约束
     */
    var Component = /** @class */ (function () {
        function Component() {
            this.myName = '实例名称属性';
        }
        Component.myName = "静态名称属性";
        return Component;
    }());
    var com = Component;
    //Component 类名本身表示的是实例的类型
    //ts 一个类类型 一个叫值
    //冒号后面的是类型 放在=后面的则是值
    //对类的实例对象进行约束
    var c = new Component();
    //对类进行约束
    var f = com;
    // 获取 Component 的类型
    var d = com;
    console.log(typeof Component);
})(A || (A = {}));
var B;
(function (B) {
    var t1 = function (name) { };
    var t2 = {
        a: t1
    };
})(B || (B = {}));
var C;
(function (C) {
    //建立一个函数
    var t = function (name) { };
    t.age = 20;
    var t1 = t;
    var t2 = {
        a: t1
    };
})(C || (C = {}));
