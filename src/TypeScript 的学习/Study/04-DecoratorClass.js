"use strict";
/***
 * 类装饰器
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
//类装饰器
var A;
(function (A) {
    //experimentalDecorators = true 开启装饰器功能
    function addNameEat(constructor) {
        constructor.prototype.name = "zhufeng";
        constructor.prototype.eat = function () { };
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            addNameEat
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
})(A || (A = {}));
//类的装饰器工厂
var B;
(function (B) {
    function addNameEatFactory(name) {
        return function addNameEat(x) {
            x.prototype.name = name;
            x.prototype.eat = function () { };
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            addNameEatFactory("鱼")
        ], Person);
        return Person;
    }());
    var p1 = new Person();
    console.log(p1.name);
})(B || (B = {}));
var C;
(function (C) {
    function replaceClass(constructor) {
        return /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }());
    }
    // @replaceClass
    var Person = /** @class */ (function () {
        function Person() {
        }
        return Person;
    }());
})(C || (C = {}));
//类的属性的装饰器
var D;
(function (D) {
    /**
     *
     * @param target 如果是实例属性,target是构造函数的原型
     * @param propertyKey
     * @private
     */
    function upperCase(target, propertyKey) {
        var value = target[propertyKey];
        var getter = function () { return value; };
        var setter = function (newValue) { return value = newValue.toUpperCase(); };
        //删掉原来的属性
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
    //如果装饰的是静态属性的话,target是构造函数本身
    function staticPropertyDecorator(target, propertyKey) {
        console.log("staticPropertyDecorator", target);
    }
    //target 是实例
    function noEnumerable(target, propertyKey, descriptor) {
        console.log(target);
        console.log(propertyKey);
        descriptor.enumerable = false; //禁止遍历
    }
    //先把数据转换数字的装饰器
    function toNumber(target, propertyKey, descriptor) {
        var oldMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (item) { return parseFloat(item); });
            return oldMethod.apply(this, args);
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'zhufeng'; //实例属性
        }
        Person.prototype.getName = function () {
            console.log(this.name);
        };
        Person.prototype.sum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (prev, current) { return prev + current; }, 0);
        };
        Person.age = 20; //静态属性
        __decorate([
            upperCase //针对属性的装饰器
        ], Person.prototype, "name", void 0);
        __decorate([
            noEnumerable
        ], Person.prototype, "getName", null);
        __decorate([
            toNumber
        ], Person.prototype, "sum", null);
        __decorate([
            staticPropertyDecorator
        ], Person, "age", void 0);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
    console.log(p.sum("1", 2, "3"));
})(D || (D = {}));
//参数装饰器
var E;
(function (E) {
    //target 静态成员就是构造函数 非静态成员就是构造函数 方法的名称 参数的索引
    function addAge(target, methodName, paramIndex) {
        console.log(target, methodName, paramIndex);
        target.age = 10;
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.login = function (userName, password) {
            console.log(userName, password);
        };
        __decorate([
            __param(1, addAge)
        ], Person.prototype, "login", null);
        return Person;
    }());
    var p = new Person();
    p.login('1', '2');
})(E || (E = {}));
//装饰器的执行顺序
var F;
(function (F) {
    function classDecorator1() {
        return function (target) {
            console.log("classDecorator1");
        };
    }
    function classDecorator2() {
        return function (target) {
            console.log("classDecorator2");
        };
    }
    function PropertyDecorator(name) {
        return function (target, propertyName) {
            console.log('PropertyDecorator', propertyName, name);
        };
    }
    function MethodDecorator(name) {
        return function (target, propertyName) {
            console.log('MethodDecorator', propertyName, name);
        };
    }
    function ParameterDecorator(name) {
        return function (target, methodName, paramIndex) {
            console.log('ParameterDecorator', methodName, name);
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = '';
            this.age = 10;
        }
        Person.prototype.hello = function (p1, p2) {
        };
        __decorate([
            PropertyDecorator("name")
        ], Person.prototype, "name", void 0);
        __decorate([
            PropertyDecorator("age")
        ], Person.prototype, "age", void 0);
        __decorate([
            MethodDecorator("hello"),
            __param(0, ParameterDecorator('p1')),
            __param(1, ParameterDecorator('p2'))
        ], Person.prototype, "hello", null);
        Person = __decorate([
            classDecorator1(),
            classDecorator2()
        ], Person);
        return Person;
    }());
})(F || (F = {}));
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
