/**
* 我以为它的执行时机会是 这次宏任务 执行完毕，或者微任务执行完毕，下次宏任务执行之前
*
* 更准确的说是 当前主线程中所有任务执行完毕后执行
* */

console.log("1")

requestIdleCallback(()=>{console.log("1.5")})

queueMicrotask(()=>{
    console.log("2")
})

setTimeout(()=>{
    console.log(3)
},0)