/**
 * 5.手写 new
 * 我们回顾一下 new 的执行过程：
 * a.在内存中创建一个空对象
 * b.这个新对象的内部__proto__指向构造函数的原型对象Function.prototype
 * c.构造函数的内部this被赋值为这个对象。
 * d.执行初始化操作，给新对象添加属性啊什么的
 * e.如果构造函数没有返回对象，则默认返回该对象。
 *
 * 我们我们需要依据上面的过程来创建。
 * 需要用到Object.create(foo.prototype)。依据原形链构建一个对象
 * 执行构造方法，为为其绑定this。 foo.apply(obj,args)
 * 判断是否返回对象
 * */
// new是关键字,这里我们用函数来模拟,new Foo(args) <=> myNew(Foo, args)
function myNew(foo, ...args) {
    // 创建新对象,并继承构造方法的prototype属性, 这一步是为了把obj挂原型链上, 相当于obj.__proto__ = Foo.prototype
    let obj = Object.create(foo.prototype)
    
    // 执行构造方法, 并为其绑定新this, 这一步是为了让构造方法能进行this.name = name之类的操作, args是构造方法的入参, 因为这里用myNew模拟, 所以入参从myNew传入
    let result = foo.apply(obj, args)
    
    // 如果构造方法已经return了一个对象，那么就返回该对象，否则返回myNew创建的新对象（一般情况下，构造方法不会返回新实例，但使用者可以选择返回新实例来覆盖new创建的对象）
    // 如果它没有返回 或者返回null 在普通typeof null 的时候它也是object,所以直接使用Object.prototype.toString.call 来判断区分,
    // 在判断 undefined 和Null 的时候,值为 '[object Undefined]'和'[object Null]'
    return Object.prototype.toString.call(result) === '[object Object]' ? result : obj
}

// 测试：
function Foo(name) {
    this.name = name
}
const newObj = myNew(Foo, 'zhangsan')
console.log(newObj)                 // Foo {name: "zhangsan"}
console.log(newObj instanceof Foo)  // true