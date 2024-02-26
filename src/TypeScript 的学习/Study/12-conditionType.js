"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A;
(function (A) {
    var con = { name2: '水' };
    //条件类型的分发 -- Water和 Sky 两个都触发了,所以都可以写
    var con1 = {
        name2: "",
        name4: ""
    };
})(A || (A = {}));
//内置条件类型
var B;
(function (B) {
    function getUser(a, b) {
        return { name: 'zhufeng', age: 10 };
    }
    var u = {
        name: 'zf',
        age: 10
    };
    var Person8 = /** @class */ (function () {
        function Person8(name) {
            this.name = name;
        }
        Person8.prototype.getName = function () {
            console.log(this.name);
        };
        return Person8;
    }());
    //符合
    var instance = {
        name: "zf",
        getName: function () {
        }
    };
})(B || (B = {}));
//infer 应用实例
//tuple 转union
var C;
(function (C) {
    var t33 = {
        name: '张三',
        age: 10
    };
})(C || (C = {}));
