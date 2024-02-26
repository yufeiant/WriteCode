/***
 * 内置工具类型
 */

export {}
//Partial 把必选项 转为 可选项
namespace A {
    type Partial<T> = {
        [P in keyof T]?: T[P];
    }
    interface A{
        a:string
        b:number
        c:boolean
    }
    //拿到这个类型的所有可选项
    //虽然原类型都不是可选项,但是可以通过Partial 来拿到所有的
    type PartialA = Partial<A>;
    let a:A = {
        a:"",
        b:11,
        c:true
    }

    interface Company{
        id:number,
        name:string
    }
    interface Person{
        id:number
        name:string
        company:Company
    }
    //深度递归遍历所有数据
    type DeepPartial<T> = {
        [U in keyof T]? :T[U] extends object ? DeepPartial<T[U]> : T[U]
    }
    type PartialPerson = Partial<Person>;
    type DeepPartialPerson = DeepPartial<Person>;
    let p:PartialPerson = {
        id:1,
        name:"珠峰",
        company:{
            //它里面的内容还是必选的
            id:1,
            name:''
        }
    }
    let p2:DeepPartialPerson = {
        id:2,
        name:"珠峰 2",
        company:{
            //现在里面的内容也已经是可选的了
        }
    }
}
//Required 反过来 把可选项转为 必选项
namespace B{
    //-? 就是不可以 可选 --> 必选
    type Required<T> = {
        [P in keyof T]-?: T[P];
    };
    interface Person{
        name:string;
        age?:number
    }
    let p:Person ={
        name:"zhufeng"
    }
    type RequiredPerson = Required<Person>;
    let p1:RequiredPerson = {
        name:"zhufeng",
        age:11
    }
}
//Readonly 使所有属性都变成只读的
namespace C{
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    };
    interface Person{
        name:string
        age?:number
    }
    type ReadOnlyPerson = Readonly<Person>;
    let p1:ReadOnlyPerson = {
        name:'zhufeng',
        age:11
    }
    // p1.name = 'jiagou';
    // p1.age = 11;
    //变动需求:需要仅有一个属性为只读属性
    type ReadOnlyPersonName = Person & {
        readonly name:string
    }
    let p2:ReadOnlyPersonName = {
       age:11,
        name:"zhufeng"
    }
    // name 现在是只读属性
    // p2.name ='1';

}
//Pick 摘取某一项返回
namespace D{
    interface Person{
        name:string
        age:number
        gender:number
    }
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
    let person:Person = {
        name:'zhufeng',
        age:11,
        gender:1
    }
    type KeyOfPerson = keyof Person;
    //取出 Person 中 后面的几个属性 构成一个新的对象
    type PickPerson = Pick<Person, 'name'|'age'>;
}
//Record ?😂😂😂😂😂 记录
namespace E{
    /**
     * Construct a type with a set of properties K of type T
     */
    type Record<K extends keyof any, T> = {
        //[] 表示任意属性
        //[key:string]:string
        //[key:number]:string
        [P in K]: T;
    };

    // let k:Record<string |number,string> = {name:'zhufeng',age:"11"}
    //
    // function map<K extends string|number,T,U>(obj,map){
    //     let result:any = {};
    //     for(const key in obj){
    //         result[key] = map(obj[key]);
    //     }
    //     return result;
    // }
}

//自定义类型
//utility-types
namespace F{

}