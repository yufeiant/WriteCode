"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
//1.从右向左推断出来
var foo = 1;
//TS2322: Type 'string' is not assignable to type 'number'.
// foo = 'st';
//2.从底流出 从返回值推断出来
function add(a, b) {
    return a + b;
}
var c = add(1, 2);
//根据Sum 推断出来类型
var sum = function (a, b) {
    return a + b;
};
//类似于 对象
var person = {
    name: "zhufeng",
    age: 11
};
// let name = person.name;
// let age = person.age;
//类似于 数组
var name = person.name, age = person.age;
var defaultProps = {
    name: "珠峰",
    age: 11
};
var props = __assign(__assign({}, defaultProps), { home: '北京' });
var p1 = {
    name: "珠峰",
    fly: function () { },
    talk: function () { }
};
var xy = { a: 1, b: "", c: "" };
function mixin(one, two) {
    var result = {};
    for (var key in one) {
        //这里做一个强转
        result[key] = one[key];
    }
    for (var key in two) {
        //这里做一个强转
        result[key] = two[key];
    }
    return result;
}
var x = mixin({ name: "zhufeng" }, { age: 11 });
//typeof type
//先定义类型,再定义变量
var A;
(function (A) {
    var p3 = {
        name: 'zhufeng'
    };
    var p4 = {
        name: "zhufeng"
    };
    var person = {
        name: "张三",
        age: 10,
        job: {
            name: "程序员"
        }
    };
})(A || (A = {}));
