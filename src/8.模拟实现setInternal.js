
/**
 * 11.
 * setTimeout模拟实现setInternal带清楚定时器的版本
 * */
function mySetInternal(fn,t){
    let timer = null;
    function internal(){
        fn();
        //关键代码 执行一次之后 在递归调用一次
        timer = setTimeout(internal,t)
    }
    internal();
    return {
        cancel:()=>{
            clearTimeout(timer);
        }
    }
}

/**
 * 12.反过来使用setInternal 模拟实现setTineout
 * */

function mySetTimeout (fn,time){
    const timer = setInterval(()=>{
        //关键代码--执行一次之后 取消事件
        clearInterval(timer);
        fn();
    },time);
    return {
        cancel: () => {
            clearInterval(timer);
        }
    }
}

function getName(){
    console.log("11111")
}

// mySetTimeout(getName,2000)
mySetInternal(getName,2000)

let timers = setTimeout(()=>{},0);
setTimeout(()=>{
    console.log(timers)
},100)