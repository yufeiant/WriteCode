//类型别名
type Cart<T> = {list:T[]}|T[];
let c1:Cart<string> = {list:['1']};
let c2:Cart<number> = [1,2,3]

//Interface和 Type的区别
//接口创建了一个新的名字,它可以在其他任意地方被调用,而类型别名并不创建新的名字,例如报错信息就不会使用别名
//类型别名不能被extends 和implements 这个时候我们应该尽量使用接口来代替类型别名
//当我们需要使用联合类型或者元祖类型的时候,类型别名会更合适

//能用接口的实现的不要用type

type Func<T extends any[], R> = (...a: T) => R


export default function compose(): <R>(a: R) => R

export default function compose<F extends Function>(f: F): F

/* two functions */
export default function compose<A, T extends any[], R>(
    f1: (a: A) => R,
    f2: Func<T, A>
): Func<T, R>

/* three functions */
export default function compose<A, B, T extends any[], R>(
    f1: (b: B) => R,
    f2: (a: A) => B,
    f3: Func<T, A>
): Func<T, R>

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
    f1: (c: C) => R,
    f2: (b: B) => C,
    f3: (a: A) => B,
    f4: Func<T, A>
): Func<T, R>

/* rest */
export default function compose<R>(
    f1: (a: any) => R,
    ...funcs: Function[]
): (...args: any[]) => R

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R

export default function compose(...funcs: Function[]) {
    if (funcs.length === 0) {
        // infer the argument type so it is usable in inference down the line
        return <T>(arg: T) => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce(
        (a, b) =>
            (...args: any) =>
                a(b(...args))
    )
}
