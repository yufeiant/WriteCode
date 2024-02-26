//Proxy 代理 高级

namespace A {

    type Proxy<T> = {
        get():T,
        set(value:T):void
    }
    type Proxify<T> = {
        [P in keyof T]:Proxy<T>
    }

    function proxify<T>(obj:T){
        let result:any = {};
        for(const key in obj){
            result[key] = {
                get:()=>{
                    console.log('get',key);
                    return obj[key];
                },
                set:(value:any)=>{
                    console.log('set',key,value)
                    obj[key] = value;
                }
            }
        }
        return result;
    }
    interface Props{
        name:string;
        age:number
    }
    let props:Props = {
        name:'zhufeng',
        age:10
    }
    let proxyProps:any = proxify<Props>(props)
    console.log(proxyProps);
    console.log(proxyProps.name);
    proxyProps.name = "jiagou";
    console.log(proxyProps.name)
}


