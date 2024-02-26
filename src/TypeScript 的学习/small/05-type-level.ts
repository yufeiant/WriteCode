/**
 * 类型层级
 */
export {}

/**
 * 基础类型的判断
 */
namespace A {
    type Result1 = "jiafieyu" extends string ? 1 : 2; // 1
    type Result2 = 1 extends number ? 1 : 2;// 1
    type Result3 = true extends boolean ? 1 : 2;// 1
    type Result4 = {name:string} extends object? 1 : 2;// 1
    type Result5 = {name:"jiafieyu"} extends object ? 1 : 2;// 1
    type Result6 = [] extends object ? 1 : 2;// 1

    //结论： 字面量类型 < 对应的原始类型。
}
/**
 * 联合类型
 */
namespace B {
     type Result7 = 1 extends 1 | 2 | 3 | 4 ? 1 : 2;// 1
     type Result8 = 'jia' extends 'jia' | 'fei' | 'yu' ? 1 : 2;// 1
     type Result9 = true extends true | false ? 1 : 2;// 1

     type Result10 = string extends string | false | number ? 1 : 2;// 1
     type Result11 = 'jia' extends string | number | boolean ? 1 : 2;// 1
    //结论：字面量类型 < 包含此字面量类型的联合类型，原始类型 < 包含此原始类型的联合类型
}

namespace C {
    type Result11 = 'jia' | 'fei' | 'yu' extends string ? 1 : 2;// 1
    type Result12 = {} | (()=>void) | [] extends object ? 1 : 2;// 1
    type Result13 = 1 | 2 | 3 | 4 extends number ? 1 : 2;// 1
    type Result14 = false | true extends boolean ? 1 : 2;// 1
    //如果联合类型都是同样的类型字面量组成 那么 它对应的 原始类型其实是一样的 都是 原始类型的小弟

    //结论：同一基础类型的字面量联合类型 < 此基础类型
    //统一的结论： 字面量类型 < 包含此字面量类型的联合类(同一基础类型) < 对应的原始类型
}

/**
 * 装箱类型
 */
namespace D {
    type Result1 = string extends String ? 1 : 2;// 1
    type Result2 = String extends {} ? 1 : 2;// 1
    type Result3 = {} extends object ? 1 : 2;// 1
    type Result4 = object extends Object ? 1 : 2;// 1

    //为什么 String类型 会是 {} 它的子类型 ？
    //假如 我们把String看作一个普通的对象，上面存在一些方法
    // interface String {
    //     replace: // ...
    //     replaceAll: // ...
    //     startsWith: // ...
    //      endsWith: // ...
    //     includes: // ...
    // }

    //可以看作 String继承了 {}这个空对象 ，然后我们自己实现了这些方法
}

//那些矛盾的地方
namespace E{
    type Tmp = string extends  object ? 1 : 2; //2
    //为啥这里是 2 我们通过上面的 string < {} < object 得到的类型链为什么是错误的呢 ？
    //因为上面比较的时候  它是通过结构化类型系统进行比较的 。{} 作为一个空的一无所有的对象 ，几乎可以视作是所有类型的基类。

    //由于结构化类型系统这一特性的存在
    type Result1 = {} extends object ? 1 : 2; // 1
    type Result2 = object extends {} ? 1 : 2; // 1

    type Result3 = object extends Object ? 1 : 2;//1
    type Result4 = Object extends object ? 1 : 2;//1

    type Result5 = Object extends {} ? 1 : 2;//1
    type Result6 = {} extends Object ? 1 : 2;//1

    //这里的 {} extends 和 extends {} 实际上是两种完全不同的比较方式。
    // {} extends object 和 {} extends Object 意味着， {} 是 object 和 Object 的字面量类型，
    // 是从类型信息的层面出发的，即字面量类型在基础类型之上提供了更详细的类型信息。
    // object extends {} 和 Object extends {} 则是从结构化类型系统的比较出发的，
    // 即 {} 作为一个一无所有的空对象，几乎可以被视作是所有类型的基类，万物的起源。
    // 如果混淆了这两种类型比较的方式，就可能会得到 string extends object 这样的错误结论。

    //结论：原始类型 < 原始类型对应的装箱类型 < Object 类型。
}

/**
 * 顶级类型
 */
namespace F {
    type Result1 = Object extends any ? 1 : 2; // 1
    type Result2 = Object extends unknown ? 1 : 2; // 2

    //any类型代表的是所有的类型
    type Result3 = any extends 'jiafieyu' ? 1 : 2; // 1 | 2
    type Result4 = any extends 1 ? 1 : 2; // 1 | 2
    type Result5 = any extends false ? 1 : 2; // 1 | 2
    type Result6 = any extends never ? 1 : 2; // 1 | 2

    //为什么它的类型变成了  1 或者 2 呢 ？
    //因为any 它代表了 所有的情况 也就是 它 包含了条件成立的部分 也包含了 条件不成立的部分
    //所以变成了这样

    type Result7 = any extends unknown ? 1 : 2;// 1 | 2
    type Result8 = unknown extends any ? 1 : 2;// 1

    //结论：Object < any / unknown。
}

/**
 * 底层类型
 */
namespace G {
    type Result33 = never extends 'linbudu' ? 1 : 2; // 1
    type Result34 = undefined extends 'linbudu' ? 1 : 2; // 2
    type Result35 = null extends 'linbudu' ? 1 : 2; // 2
    type Result36 = void extends 'linbudu' ? 1 : 2; // 2

    //结论：never < 字面量类型。
}

/**
 * 类型层级链
 */
namespace H {
    type TypeChain = never extends 'jiafeiyu'
        ? "jiafeiyu" extends 'jiafeiyu' | 599
            ? 'jiafeiyu' | '599' extends string
                ? string extends String
                    ? String extends Object
                        ? Object extends any
                            ? any extends  unknown
                                ? unknown extends  any
                                    ? 8
                                    : 7
                                : 6
                            : 5
                        : 4
                    : 3
                : 2
            : 1
        : 0

    // 8 | 6
}

namespace I {
    type VerboseTypeChain = never extends 'linbudu'
        ? 'linbudu' extends 'linbudu' | 'budulin'
            ? 'linbudu' | 'budulin' extends string
                ? string extends {}
                    ? string extends String
                        ? String extends {}
                            ? {} extends object
                                ? object extends {}
                                    ? {} extends Object
                                        ? Object extends {}
                                            ? object extends Object
                                                ? Object extends object
                                                    ? Object extends any
                                                        ? Object extends unknown
                                                            ? any extends unknown
                                                                ? unknown extends any
                                                                    ? 8
                                                                    : 7
                                                                : 6
                                                            : 5
                                                        : 4
                                                    : 3
                                                : 2
                                            : 1
                                        : 0
                                    : -1
                                : -2
                            : -3
                        : -4
                    : -5
                : -6
            : -7
        : -8
}

