"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A;
(function (A) {
    var x;
    var y;
    x = y;
})(A || (A = {}));
//2.接口内容不为空的时候就不可以了
var B;
(function (B) {
    var x;
    var y;
    //TS2322: Type 'NotEmpty<number>' is not assignable to type 'NotEmpty<string>'.   Type 'number' is not assignable to type 'string'.
    // x = y;
})(B || (B = {}));
//3.具体实现原理如下:先判断具体的类型,然后判断兼容性
var C;
(function (C) {
    var xx2;
    var yy2;
    // xx2 = yy2;
})(C || (C = {}));
