/**
 * 学习文章:https://backbencher.dev/articles/javascript-es2021-new-features
 * 终结着 当一个对象被垃圾回收时,我们可以注册一个事件来专门处理这种情况
 * @type {FinalizationRegistry<unknown>}
 */
const registry = new FinalizationRegistry((value) => {
    console.log(value);
});

let obj = {};
registry.register(obj, "Backbencher");