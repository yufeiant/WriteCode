
/**
 * 7.手写防抖
 * 什么是防抖 ？
 * 如果是节流是 间隔执行，那么防抖就是延迟执行，区别就变成了 在判断如果非空的时候，清空任务，重新执行
 * 然后重新计算
 * */
function debounced(func,wait){
    //建立哨兵
    let timeout = null;
    return function (...args){
        //保存当前的执行上下文
        let context = this;
        if(!timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>{
            func.apply(context,args)
        },wait)
    }
}

/**
 * 8.手写节流
 * 什么是节流？
 * 就是一定时间内只能执行一次，它卡的是时间，间隔执行。
 * 利用闭包来保存上下文，利用哨兵节点来做判断，时间间隔内只能有一个排队任务。
 * 和防抖的区别是,它是始终如一,记录的第一个任务,后面来的任我我都不支持,在这个时间间隔内,我只会执行这个人.
 * 所以在判断那里并不会在有哨兵的时候清空数据
 * */
function throttle (func,internal){
    //建立哨兵
    let timeout = null;
    return function (...args){
        //保存当前的上下文
        let context = this;
        //判断哨兵节点是否存在 不存在就建立任务
        if(!timeout){
            timeout = setTimeout(()=>{
                func.apply(context,args);
            },internal)
        }
    }
}

/**
 * 防抖有一个问题是如果一直有输入,那么它会一直向后延迟执行,我们可以通过节流给它做一个优化.
 * 我可以等你,但是我也有原则,不会没有节制的等你.
 * 原理是:
 * 我们在判定的时候如果发现 小于delay的话,我们就把之前的事件取消掉,然后重新设置一个值,而
 * 设置的这个函数中我们在执行的时候last = now.
 *
 * 而如果判断发现已经超过了delay的话,那么就直接调用执行就可以了.
 *
 * */

function debounced(fn,delay){
    //last 为上一次触发回调的时间,timer是定时器
    let last = 0,timer = null;
    //将throttle 处理结果当做函数返回
    return function (...args){
        //保留调用时的this上下文
        let context = this;
        //记录本次触发回调的时间
        let now = +new Date();
        
        //判断上次触发的时间和本地触发的时间差是否小于时间间隔的阈值
        if(now - last < delay){
            //如果时间间隔小于我们设定的时间间隔阈值,则为本次触发操作设立一个新的定时器
            clearTimeout(timer);
            timer = setTimeout(function (){
                last = now;
                fn.apply(context,args)
            },delay)
        }else{
            //如果时间间隔超出了我们设定的时间间隔阈值,那就不等了,无论如何也高给用户一次响应.
            last = now;
            fn.apply(context,args);
        }
    }
}

// 用新的throttle包装scroll的回调
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)

document.addEventListener('scroll', better_scroll)