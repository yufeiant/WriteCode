/***
 * 兼容性处理
 */
//泛型在判断兼容性的时候会先判断具体的类型,然后在进行兼容性判断
//接口为空的时候,没用到泛型的时候是可以的
export {}
namespace A{
    interface Empty<T>{}
    let x:Empty<string>;
    let y:Empty<number>;
    x = y;
}

//2.接口内容不为空的时候就不可以了
namespace B{
    interface NotEmpty<T>{
        data:T
    }
    let x:NotEmpty<string>;
    let y:NotEmpty<number>;
    //TS2322: Type 'NotEmpty<number>' is not assignable to type 'NotEmpty<string>'.   Type 'number' is not assignable to type 'string'.
    // x = y;
}

//3.具体实现原理如下:先判断具体的类型,然后判断兼容性
namespace C{
    interface NotEmptyString{
        data:string
    }
    interface NotEmptyNumber{
        data:number
    }
    let xx2!:NotEmptyNumber;
    let yy2!:NotEmptyString;
    // xx2 = yy2;
}