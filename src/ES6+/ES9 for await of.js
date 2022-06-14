/**
 * 当我们想遍历异步的数据的时候
 * */

function Gen(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [Gen(2000), Gen(100), Gen(3000)]
    for await (let item of arr) {
        console.log(Date.now(), item)
    }
}

test()
// 1560092345730 2000
// 1560092345730 100
// 1560092346336 3000

// const asyncIteratorObj = new Object();
// asyncIteratorObj[Symbol.asyncIterator] = async function *(){
//     yield "hello";
//     yield "world";
//     yield "Symbol.asyncIterator"
// }
//
// (async () => {
//     for await (const x of asyncIteratorObj) {
//         console.log(x);
//         // expected output:
//         //    "hello"
//         //    "async"
//         //    "iteration!"
//     }
// })();

async function* asyncGenerator() {
    let i = 0;
    while (i < 3) {
        yield i++;
    }
}

(async () => {
    for await (const num of asyncGenerator()) {
        console.log(num);
    }
})();
// 0
// 1
// 2