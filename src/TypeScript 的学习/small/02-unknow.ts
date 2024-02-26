/**
 * 一个unknown类型的变量可以再次赋值为其他类型,但是只能赋值给any与unknown类型的变量
 */
namespace A {
    let unknownVar:unknown = "linbudu";
    unknownVar = false;
    unknownVar = "linbudu";
    unknownVar = {
        site:"juejin"
    };

    unknownVar = ()=>{}
//不可以赋值为其他的变量--只能赋值unknown和 any 和 {} 它居然没有报错,和小册上的不一样 哈哈
    const val1:string = unknownVar; //ERROR
    const val2:number = unknownVar;//ERROR
    const val3:()=>{} = unknownVar;//ERROR
    const val4:{} = unknownVar;
    const val5:any = unknownVar;
    const val6:unknown = unknownVar;
}

namespace B {
  let unknownVar:unknown;
  //把它断言为一个foo的函数
    (unknownVar as {foo:()=>{}}).foo();
}

namespace C{
    let v1:never;
    let v2:void;
    v1 = v2; //类型void不能赋值给类型never
    v2 = v1;
}

declare const strOrNumberOrBool:string|number|boolean;
if(typeof strOrNumberOrBool === "string"){
    console.log("str!")
}else if(typeof strOrNumberOrBool === "number"){
    console.log("num!")
}else if(typeof strOrNumberOrBool === "boolean"){
    console.log("bool!")
}else {
    //通过利用never类型只能赋值给never类型这个特性
    //我们可以判断 如果有新的类型没有进行处理 这里就会报错  在类型推断的时候
    const _exhaustiveCheck:never = strOrNumberOrBool;
    throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}

const str:string = "string";
// (str as unknown as number).toFixed(2)
(<{handler:()=>{}}>(<unknown>str)).handler();