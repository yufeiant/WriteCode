// function timeoutPromise(interval){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve("done");
//         },interval)
//     })
// }
// async function timeTest() {
//     // await timeoutPromise(3000);
//     // await timeoutPromise(3000);
//     // await timeoutPromise(3000);
//     const timeoutPromise1 = timeoutPromise(3000);
//     const timeoutPromise2 = timeoutPromise(3000);
//     const timeoutPromise3 = timeoutPromise(3000);
//
//     let result = await timeoutPromise1;
//     await timeoutPromise2;
//     await timeoutPromise3;
//     console.log(result)
// }
//
// let startTime = Date.now();
// timeTest().then(() => {
//     let finishTime = Date.now();
//     let timeTaken = finishTime - startTime;
//     console.log(timeTaken)
// })


async function async1() {
    console.log( 'async1 start' )
    await async2()
    console.log( 'async1 end' )
}

async function async2() {
    console.log( 'async2' )
}

console.log( 'script start' )

setTimeout( function () {
    console.log( 'setTimeout' )
}, 0 )

async1();

new Promise( function ( resolve ) {
    console.log( 'promise1' )
    resolve();
} ).then( function () {
    console.log( 'promise2' )
} )

console.log( 'script end' )
