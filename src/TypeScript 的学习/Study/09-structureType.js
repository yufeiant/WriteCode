"use strict";
/***
 * 结构类型系统
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var A;
(function (A) {
    function getName(instance) {
        return instance.name;
    }
    var cat = {
        name: "猫儿",
        age: 1
    };
    getName(cat);
    var person = {
        name: "张三",
        age: 20,
        gender: 0
    };
    //为什么IPerson 可以兼容 IAnimal ?
    getName(person);
})(A || (A = {}));
var B;
(function (B) {
    //基本数据类型的兼容性
    var num;
    var str = "zhufeng";
    num = str;
    var num2;
    //你要的我有就兼容 你要的我没有就不兼容
    var str2 = 'jiagou';
    num2 = str2;
})(B || (B = {}));
var C;
(function (C) {
    //类的兼容性
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bird;
    }(Animal));
    var a;
    var b;
    a = b;
    //TS2741: Property 'age' is missing in type 'Animal' but required in type 'Bird'.
    // b = a;
    //这个关键是看形状 而不是看原型
})(C || (C = {}));
var D;
(function (D) {
    var sum;
    function f1(a, b) { }
    //这种的就符合 Func的形状 考察的是参数和返回值 参数只可以少,不可以多
    sum = f1;
    //参数少一个可以
    function f2(a) { }
    sum = f2;
    //少两个参数也可以
    function f3() { }
    sum = f3;
    //多个参数呢?就不可以
    function f4(a, b, c) { }
    // TS2322: Type '(a: number, b: number, c: number) => void' is not assignable to type 'Func'.
    // sum = f4;
})(D || (D = {}));
//比较返回值
var E;
(function (E) {
    var getPerson;
    function g1() {
        return { name: 'zhufeng', age: 10 };
    }
    //返回值它要求是必须包含name和 age 这两个属性
    getPerson = g1;
    function g2() {
        return { name: 'zhufeng', age: 20, gender: 0 };
    }
    //可以多,但是不可以少
    getPerson = g2;
    function g3() {
        return { name: 'zhufeng' };
    }
    //不可以少
    //TS2322: Type '() => { name: string; }' is not assignable to type 'GetPerson'.   Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'.
    // getPerson = g3;
})(E || (E = {}));
//一切的一切是为了类型安全
//函数的协变与逆变
//A <= B 意味着 A 是 B的子类型
//A --> B 指的是以 A 为参数类型,以 B为返回值类型的函数类型
//返回值类型是协变,而参数类型是逆变的
//返回值类型可以传子类,参数可以传父类
//参数逆变父类,返回值协变子类 馋你父,反鞋子
var F;
(function (F) {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = 'Dog';
            return _this;
        }
        return Dog;
    }(Animal));
    var BlackDog = /** @class */ (function (_super) {
        __extends(BlackDog, _super);
        function BlackDog() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.age = 10;
            return _this;
        }
        return BlackDog;
    }(Dog));
    var WhiteDog = /** @class */ (function (_super) {
        __extends(WhiteDog, _super);
        function WhiteDog() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.home = '北京';
            return _this;
        }
        return WhiteDog;
    }(Dog));
    var animal;
    var dog;
    var blackDog;
    var whiteDog;
    function exec(callback) {
        //TS2345: Argument of type 'Animal' is not assignable to parameter of type 'Dog'.   Property 'name' is missing in type 'Animal' but required in type 'Dog'.
        // callback(animal);
        // callback(dog);
        // callback(blackDog);
        // callback(whiteDog);
    }
    var childToChild;
    var childToParent;
    var parentToParent;
    var parentToChild;
    exec(parentToChild); //y
})(F || (F = {}));
var G;
(function (G) {
    function exec(callback) {
    }
    var childToChild;
    var childToParent;
    var parentToParent;
    var parentToChild;
    exec(parentToChild); //y
})(G || (G = {}));
