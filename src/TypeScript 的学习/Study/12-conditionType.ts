/***
 * 条件类型
 */
export {}
namespace A{
    interface Fish{
        name1:string
    }
    interface Water{
        name2:string
    }
    interface Bird{
        name3:string
    }
    interface Sky{
        name4:string
    }
    //如果 T 继承至 Fish 就使用 Water 这个类型,如果不是就使用 Sky 这个类型
    type Condition<T> = T extends Fish?Water:Sky;
    let con:Condition<Fish> = {name2:'水'}

    //条件类型的分发 -- Water和 Sky 两个都触发了,所以都可以写
    let con1:Condition<Fish|Bird> = {
        name2:"",
        name4:""
    }

    //z找出 T 中不包含 U 的部分
    type Diff<T,U> = T extends U ? never:T;
    type R = Diff<'a'|'b'|'c'|'d', 'a'|'b'|'c'>;
    type R2 = never|never|never|'d'; //前面几个判断都是true 最后d是 false

    type Filer<T,U> = T extends U?T:never;
    type R3 = Filer<'a'|'b'|'c'|'d', 'a'|'b'|'c'>;
    type R4 = 'a'|'b'|'c';
}

//内置条件类型
namespace B{
    //Exclude 排除 不包含在 U中的返回
    type Exclude<T,U> = T extends U ? never:T;
    type R = Exclude<'a'|'b'|'c'|'d', 'a'|'b'|'c'>;
    type R2 = never|never|never|'d'; //前面几个判断都是true 最后d是 false

    //Extract 包含在 U 中的返回
    type Extract<T,U> = T extends U?T:never;
    type R3 = Extract<'a'|'b'|'c'|'d', 'a'|'b'|'c'>;

    //NonNullable 判断这个值是否是null 或者undefined 如果是 就never ,如果不是
    //就是 T
    type NonNullable<T> = T extends null | undefined ? never : T;
    type R6 = NonNullable<'a'| null | undefined >;

    //ReturnType
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
    function getUser(a:string,b:number){
        return {name:'zhufeng',age:10}
    }
    //拿到函数的类型()=>{name:string,age:number}
    type GetUserType = typeof getUser;
    //从这个 函数Type中拿到它的返回值的type {name: string, age: number}
    type ReturnUser = ReturnType<GetUserType>;
    let u:ReturnUser = {
        name:'zf',
        age:10
    }

    //ParamsType [string, number]
    type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
    type ParamsType = Parameters<GetUserType>

    //ConstructorParameters
    type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
    class Person8{
        constructor(public name:string) {
        }
        getName(){
            console.log(this.name)
        }
    }
    type Params = ConstructorParameters<typeof Person8>;

    //InstanceType
    type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
    //拿到 拿到 Peron8 的构造函数的类型
    type Person8Instance = InstanceType<typeof Person8>;
    //符合
    let instance :Person8Instance = {
        name:"zf",
        getName() {
        }
    }
}

//infer 应用实例
//tuple 转union
namespace C{
    //E 代表元素的类型
    // infer 表示的是 这里定义的是变量 申明的变量
    // 表示它把这部分变量 概括进去了 存入了这个变量
    type ElementOf<T> = T extends Array< infer E> ? E : never;
    type Ttuple = [string,number,boolean];
    // string | number | boolean
    type TupleToUnion = ElementOf<Ttuple>;

    //参数=>返回值 参数:返回值 都表示的函数

    type First<T> = T extends {name:infer A}? A : never;
    type k11 = First<{ name:string }>

    //联合类型转成交叉类型
    //string | number => string & number
    type T1 = {name:string};
    type T2 = {age:number};
    //U 需要同时满足 T1 和 T2
    type ToInterSection<T> = T extends {a:(x:infer U)=>void,b:(x:infer U)=>void } ? U :never;
    // T3 = T1 & T2
    type T3 = ToInterSection<{ a:(x:T1)=>void,b:(x:T2)=>void }>
    let t33:T3 = {
        name:'张三',
        age:10
    }

}


