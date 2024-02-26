"use strict";
/***
 * 内置工具类型
 */
Object.defineProperty(exports, "__esModule", { value: true });
//Partial 把必选项 转为 可选项
var A;
(function (A) {
    var a = {
        a: "",
        b: 11,
        c: true
    };
    var p = {
        id: 1,
        name: "珠峰",
        company: {
            //它里面的内容还是必选的
            id: 1,
            name: ''
        }
    };
    var p2 = {
        id: 2,
        name: "珠峰 2",
        company: {
        //现在里面的内容也已经是可选的了
        }
    };
})(A || (A = {}));
//Required 反过来 把可选项转为 必选项
var B;
(function (B) {
    var p = {
        name: "zhufeng"
    };
    var p1 = {
        name: "zhufeng",
        age: 11
    };
})(B || (B = {}));
//Readonly 使所有属性都变成只读的
var C;
(function (C) {
    var p1 = {
        name: 'zhufeng',
        age: 11
    };
    var p2 = {
        age: 11,
        name: "zhufeng"
    };
    // name 现在是只读属性
    // p2.name ='1';
})(C || (C = {}));
//Pick 摘取某一项返回
var D;
(function (D) {
    var person = {
        name: 'zhufeng',
        age: 11,
        gender: 1
    };
})(D || (D = {}));
