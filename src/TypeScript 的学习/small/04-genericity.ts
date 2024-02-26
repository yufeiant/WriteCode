/***
 * 泛型
 */
export {}

type Factory<T> = T | number |string;


//泛型的本质其实 就是一个参数 而类型别名其实就是一个参数 如果用了泛型 那么就是带了一个参数而已

/**
 * 逻辑解释:
 * keyof T 拿到 T 的所有的属性名称数组
 * K in keyof T  就相当于 for( let value in array) 遍历所有的属性名称
 * 遍历的值就是K
 * 接着右边的就是string 赋值操作.
 *
 * 把一个对象类型的所有属性类型置为string.
 */
type Stringify<T> = {
    [K in keyof T]:string;
}

/***
 * 逻辑解释:
 * keyof T 拿到 T 的所有的属性名称数组
 * K in keyof T  就相当于 for( let value in array) 遍历所有的属性名称
 * 遍历的值就是K
 * T[k] 拿到它的值
 * 连起来 就是 对对象类型进行完全的复制
 */
type Clone<T> = {
    [K in keyof T]:T[K];
}

interface IFoo {
    prop1:string;
    prop2:number;
    prop3:boolean;
}

type TFoo = Clone<IFoo>;

/**
 * 它正好是 结合上面 Clone 然后 加了一个括号来实现的.
 * 完全复制一份所有的类型,然后 把所有的类型改成非必填的
 */
type Partial<T> = {
    [P in keyof T]?:T[P]
}

type PartialFoo = Partial<IFoo>;//{prop1?: string, prop2?: number, prop3?: boolean}

/**
 * 条件类型
 */

type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<true>;//1
type B = IsEqual<false>;//2
type C = IsEqual<'nonono'>;//2


/**
 * 泛型约束与默认值
 */

namespace A {
    //我们给泛型添加默认值 是 boolean
    type Factory<T = boolean> = T | number | string;
    //所以在使用的时候 它就不需要设置了. 就好像函数使用了默认值一样
    const foo:Factory = false;
    const foo1:Factory<string> = "string";
    const foo2:Factory<symbol> = Symbol("");


    //我们可以通过extends 来进行泛型约束 强制要求传入的泛型必须 是符合我们条件的
    type ResStatus<ResCode extends number> = ResCode extends 10000 | 20000 | 30000 ?
        'success'
        :
        'failure';
    type Res1 = ResStatus<10000>;
    type Res2 = ResStatus<20000>;
    //TS2344: Type 'string' does not satisfy the constraint 'number'.
    // type Res3 = ResStatus<'20000'>;
}

namespace B{
    //同样我们也可以使用 默认值来实现
    type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 20000 | 30000 ?
        'success'
        :
        'failure';
}

namespace C {
    // 一共定义了 4 个泛型参数  如果第一个参数 符合 第二个参数的子类型 就返回 第三个参数 不是就返回第四个---和函数一样了
    type Conditional<Type ,Condition,TruthyResult,FalsyResult> = Type extends Condition ? TruthyResult : FalsyResult;
}


namespace D {
   //场景：我们定义了两个单位   美元 和 人民币
    type USD = number;
    type CNY = number;

    const CNYCount: CNY = 200;
    const USDCount: USD = 200;

    function addCNY(source: CNY, input: CNY) {
        return source + input;
    }

    addCNY(CNYCount, USDCount)
    //但是他的问题是 两个居然可以相加 ？
}

namespace E {
    export declare class TagProtector<T extends string> {
        protected __tag__: T;
    }

    export type Nominal<T, U extends string> = T & TagProtector<U>;
    
    type USD = Nominal<number, "USD">;
    type CNY = Nominal<number, "CNY">;

    const CNYCount = 200 as CNY;
    const USDCount = 300 as USD;

    function addCNY(source: CNY, input: CNY) {
        return (source + input) as CNY;
    }

    function addUSD(source: USD, input: USD){
        return (source + input) as USD;
    }

    //可以看到这里报错了
    // addCNY(CNYCount,USDCount);
    // addUSD(CNYCount,USDCount);
    addUSD(USDCount,USDCount);

}

namespace F {

}