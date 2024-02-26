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
//typeof
function add(val) {
    if (typeof val === 'string') {
    }
    else if (typeof val === "number") {
    }
}
//instanceOf
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
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
function getName(animal) {
    if (animal instanceof Bird) {
    }
    else if (animal instanceof Dog) {
    }
}
//null 保护
function getFirstLetter(s) {
    s = s || "";
    // return s?.charAt(0)
    return s.charAt(0);
}
function getButton(button) {
    if (button.class === "waring") {
    }
    else if (button.class === "danger") {
    }
}
var reducer = function (action) {
    switch (action.type) {
        case "add":
            //这里就定义好了
            action.payload.userName;
            break;
        case 'delete':
            var id = action.payload;
            break;
    }
};
// function isType(type:Type1|Type2):type is Type1{
//
// }
//自定义判断它是哪个类型
function isBird(x) {
    return x.leg === 2;
}
function getAnimal(x) {
    if (isBird(x)) {
        console.log(x);
    }
    else {
        console.log(x);
    }
}
//unknown 是 any 的安全类型
//any 和 unknown 对比学习
//any 可以对any进行任何操作,而不做类型检查
var value;
value = 1;
value = true;
value = '1';
value.foo();
//unknown 是顶级类型 任何类型可以赋值给unknown类型
var value2;
value2 = true;
value2 = 1;
value2 = [];
//TS2339: Property 'foo2' does not exist on type 'unknown'.
// value2.foo2();
//如果想调用unKnown上的方法和属性
value2 = 'hello';
//断言
console.log(value2.length);
var c = { name: 'zhufeng', age: 10, c: 10 };
var a;
var b;
//c 是 a 的子类 所以既可以给a 也可以给b
a = c;
b = c;
var aa;
var bb;
