/**
 * 学习文章:https://backbencher.dev/articles/javascript-es2021-new-features
 * MDN在介绍这个新的 API 时有一句话是:能不用就尽量不用,原因是考虑到
 * 各个 JS 引擎在实现 GC 上的差距,在何时,如何以及是否发生垃圾回收取决于任何给定的 JavaScript 引擎的实现,
 * GC 在一个 JavaScript 引擎中的行为有可能在另一个 JavaScript 引擎中的行为大相径庭，或者甚至在同一类引擎，
 * 不同版本中 GC 的行为都有可能有较大的差距。
 *
 * WeakRef 代表弱引用.弱引用的主要用途是实现对大对象的缓冲或映射.在这种情况,我们不希望长时间保留大量内存来介绍这种很少使用的
 * 缓冲或映射.我们可以让内存很快被垃圾回收,如果我们再次需要它,我们可以生成一个新的缓冲.
 * */

/**
 * 演示一
 */
class Counter {
    constructor(element) {
        // Remember a weak reference to the DOM element
        this.ref = new WeakRef(element);
        this.start();
    }
    start() {
        if (this.timer) {
            return;
        }
        this.count = 0;
        const tick = () => {
            // Get the element from the weak reference, if it still exists
            const element = this.ref.deref();
            if (element) {
                element.textContent = ++this.count;
            } else {
                // The element doesn't exist anymore
                console.log("The element is gone.");
                this.stop();
                this.ref = null;
            }
        };
        tick();
        this.timer = setInterval(tick, 1000);
    }
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }
}
const counter = new Counter(document.getElementById("counter"));
counter.start();
setTimeout(() => {
    document.getElementById("counter").remove();
}, 5000);

/**
 * 演示二
 */
const callback = ()=>{
    const aBigObj = {
        name:"Backbencher"
    }
    console.log(aBigObj)
}

(async function (){
    await new Promise(resolve=>{
        setTimeout(()=>{
            callback();
            resolve()
        },2000)
    })
})()

//如果我们希望缓冲
const callback1 = ()=>{
    const aBigObj = new WeakRef({
        name:"Backbencher"
    })
    console.log(aBigObj.deref())
}

(async function () {
    await new Promise((resolve) => {
        setTimeout(() => {
            callback(); // Guaranteed to print "Backbencher"
            resolve();
        }, 2000);
    });
    
    await new Promise((resolve) => {
        setTimeout(() => {
            callback(); // No Gaurantee that "Backbencher" is printed
            resolve();
        }, 5000);
    });
})();
