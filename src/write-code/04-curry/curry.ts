/**
 * 函数柯里化
 *
 * 它的需求场景是什么?
 * 我传入一个函数,传入两个函数
 *
 * 注意的关键点:
 *
 * */

export function curry(fn:Function){
    const fnArgsLength = fn.length;//传入函数的参数长度
    let args:any[] = [];
    //ts 中独立的函数
    function calc(...newArgs){
        //合并旧的参数和新的参数
        args = [
            ...args,
            ...newArgs
        ];
        //核心逻辑:判断参数是否够了 原函数定义的参数
        if(args.length < fnArgsLength){
            //参数不够 ,返回函数,继续添加函数
            return calc;
        }else{
            //参数够了,返回执行结果
            return fn.apply(this,args.slice(0,fnArgsLength))
        }
    }
    return calc;
}

function add(a,b,c){
    return a + b + c;
}

let curry_add = curry(add);
curry_add(1);
curry_add(2);
curry_add(3);
curry_add();