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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var A;
(function (A) {
    //创建一个长度为length的数组,里面的值用value进行填充
    function createArray(length, value) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    var result = createArray(3, '1');
    console.log("A", result);
})(A || (A = {}));
var B;
(function (B) {
    //传入什么类型,返回的就应该是什么类型,但是现在它现在却是自由的
    //也就是类型它应该在使用的时候确定
    function createArray(length, value) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    var result1 = createArray(3, '1');
    var result2 = createArray(4, 0);
    console.log("B", result1);
    console.log("B", result2);
})(B || (B = {}));
var C;
(function (C) {
    //类数组--这里有点问题
    function sum() {
        var e_1, _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            // let args:IArguments = arguments;
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var v = args_1_1.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    // sum(1,2,3)
})(C || (C = {}));
var D;
(function (D) {
    //泛型类--所有数据的类型都是相同的
    var MyArray = /** @class */ (function () {
        function MyArray() {
            this.list = [];
        }
        MyArray.prototype.add = function (value) {
            this.list.push(value);
        };
        MyArray.prototype.getMax = function () {
            return this.list[0];
        };
        return MyArray;
    }());
    var array = new MyArray();
    array.add(1);
    array.add(2);
    array.add(3);
    array.add(4);
    console.log(array.getMax());
})(D || (D = {}));
var E;
(function (E) {
    //与new 和约束构造函数相结合
    function factory(type) {
        return new type();
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = '1';
        }
        return Person;
    }());
    var p = factory(Person);
    console.log(p.name);
})(E || (E = {}));
var F;
(function (F) {
    var twoSum = function (a, b) {
        return a + b;
    };
    console.log(twoSum(1, 2));
    var sum2 = function (a, b) {
        return a;
    };
    //调用时 确定类型
    sum2(1, 2);
    //柯里化的实现 两个泛型是分量词确定的 T 是在定义函数的时候确定,而 U则是在使用函数的时候确定
    var sum3 = function (a, b) {
        return a;
    };
    sum3(1, 2);
})(F || (F = {}));
var G;
(function (G) {
    //泛型可以写过个
    function swap(tuple) {
        return [tuple[1], tuple[0]];
    }
})(G || (G = {}));
var H;
(function (H) {
    //默认泛型 和默认参数的用法一样
    function createArray(length, value) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    var array1 = createArray(3, "0");
    var array2 = createArray(3, 0);
    console.log("H", array1);
    console.log("H", array2);
})(H || (H = {}));
var I;
(function (I) {
    function logger2(val) {
        console.log("I", val.length);
    }
    logger2('abc');
    var obj = {
        length: 10
    };
    logger2(obj);
    var GrandFather = /** @class */ (function () {
        function GrandFather() {
        }
        return GrandFather;
    }());
    var Father = /** @class */ (function (_super) {
        __extends(Father, _super);
        function Father() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Father;
    }(GrandFather));
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Child;
    }(Father));
    //T 继承了 Father
    function get() {
    }
    //可以是爷爷
    get();
    //可以是父亲
    get();
    //可以是孩子
    get();
    //它们的判断主要是取决于 形状 和谁继承谁 没有一丁点关系 因为他们三个都是空对象,所以都可以兼容
})(I || (I = {}));
(function (G) {
    var GrandFather = /** @class */ (function () {
        function GrandFather() {
        }
        return GrandFather;
    }());
    var Father = /** @class */ (function (_super) {
        __extends(Father, _super);
        function Father() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Father;
    }(GrandFather));
    var Child = /** @class */ (function () {
        function Child() {
        }
        return Child;
    }());
    //T 继承了 Father
    function get() {
    }
    //现在它要求必须是包含 father和grandFather
    get();
    //可以是父亲
    get();
    //可以是孩子
    get();
})(G || (G = {}));
(function (H) {
    var sum = function (a, b) {
    };
    sum("1", "2");
    //如果是 想让 a,b 是同样的类型,就必须我们传入的类型是一起 描述的话应该是联合类型
})(H || (H = {}));
