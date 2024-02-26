"use strict";
/**
 * 函数
 * */
function hello(name) {
    console.log("name", name);
}
var getName = function (firstName, lastName) {
    return firstName + lastName;
};
//定义一个可选参数
function print(name, age) {
    console.log(name, age);
}
print("zhufeng");
function ajax(url, method) {
    if (method === void 0) { method = "GET"; }
    console.log(url, method);
}
ajax('/');
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (val, item) { return item + val; }, 0);
}
console.log(sum(1, 2, 3, 4));
//函数的重载
var obj = {};
function attr(val) {
    if (typeof val === "string") {
        obj.name = val;
    }
    else if (typeof val === 'number') {
        obj.age = val;
    }
}
attr('zhufeng');
attr(11);
function add(a, b) {
    console.log(a, b);
}
var mySearch;
mySearch = function (source, subString) {
    return true;
};
