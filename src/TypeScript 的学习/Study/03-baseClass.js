"use strict";
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
var Person = /** @class */ (function () {
    function Person() {
        this.name = "";
    }
    Person.prototype.getName = function () {
        console.log(this.name);
    };
    return Person;
}());
var person = new Person();
person.name = "zhufeang";
person.getName();
//定义存取器
var User = /** @class */ (function () {
    function User(myName) {
        this.myName = myName;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this.myName;
        },
        set: function (myName) {
            this.myName = myName;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
var user = new User('zhufeng');
user.name = "jiagou";
console.log(user.name);
//现在每一次建立实例都需要输入初始化的参数,我们可以设置一个public
//public 相当于这个属于对于实例的修改和读取是公开的
var User1 = /** @class */ (function () {
    // myName:string;
    function User1(myName) {
        this.myName = myName;
        // this.myName = myName;
    }
    Object.defineProperty(User1.prototype, "name", {
        get: function () {
            return this.myName;
        },
        set: function (myName) {
            this.myName = myName;
        },
        enumerable: false,
        configurable: true
    });
    return User1;
}());
var user1 = new User1("张三");
console.log(user1.myName);
//readonly 只读的
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.changeName = function (name) {
        // Cannot assign to 'name' because it is a read-only property.
        // this.name = name;
    };
    return Animal;
}());
//public protected private 修饰符属性
var Father = /** @class */ (function () {
    function Father(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = money;
    }
    Father.prototype.getName = function () {
        return this.name;
    };
    Father.fatherName = 'fatherName';
    return Father;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name, age, money) {
        var _this = 
        //先创建父类的实例
        _super.call(this, name, age, money) || this;
        _this.name = "l李四";
        return _this;
    }
    Child.prototype.desc = function () {
        console.log(this.name);
        console.log(this.age);
        //Property 'money' is private and only accessible within class 'Father'.
        // console.log(this.money);
    };
    //子类会继承父类的静态数据和方法
    Child.ChildName = 'ChildName';
    return Child;
}(Father));
var s1 = new Child("张三", 20, 1);
console.log(s1.name);
// Property 'age' is protected and only accessible within class 'Father' and its subclasses.
// s1.age
console.log(Child.fatherName);
console.log(Child.ChildName);
