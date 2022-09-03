/***
 * 需要考虑的情况有:
 * 1.null
 * 2.时间
 * 3.正则表达式
 * 4.Symbol
 * 5.DOM元素
 * 6.Set
 * 7.Map
 * 8.循环引用 通过WeakMap
 * 9.数组
 * 10.对象
 * 涉及的知识点:
 * new target.constructor() 通过原型链调到原型对象上的constructor
 * Reflect.ownKeys  它是 Object.getOwnPropertyNames() 和 Object.getOwnPropertySymbols() 组合
 * @param target
 * @param map
 * @returns {RegExp|Set|Date|symbol|*|Map}
 */
function deepClone(target,map = new WeakMap()){
    //如果是null 就返回
    if(target === null) return target;
    //处理日期
    if(target instanceof Date)  return new Date(target);
    //处理正则表达式
    if(target instanceof RegExp)  return new RegExp(target);
    //处理值为Symbol的情况
    if(typeof target === 'symbol') return Symbol(target.toString());
    // // 处理 DOM元素
    // if (target instanceof HTMLElement) return target
    //处理引用类型 以免死循环
    if(typeof target !== 'object') return target;
    //从缓冲中读取
    if(map.has(target)) return target;
    // 处理对象和数组
    const cloneTarget = new target.constructor() // 创建一个新的克隆对象或克隆数组
    //保存原引用和拷贝引用的关系
    map.set(target,cloneTarget)
    //处理Map的情况
    if(target instanceof Map){
       for(let [key,value] of target){
           target.set(key,deepClone(value,map));
       }
       return target;
    }
    //处理set的情况
    if(target instanceof Set){
        for(let value of target){
            target.add(deepClone(value,map))
        }
        return target;
    }
    //通过Reflect来拿到所有可枚举和不可枚举的属性，以及Symbol的属性。
    Reflect.ownKeys(target).forEach(key=>{
        cloneTarget[key] = deepClone(target[key],map);
    })
    return cloneTarget;
}




let nameSymbol = Symbol("name");
const target = {
    0:NaN,
    1:Infinity,
    2:-Infinity,
    3:1n,
    a: true,
    b: 100,
    c: 'str',
    d: undefined,
    e: null,
    f:new Date(),
    g: /abc/,
    h:{
        a:'ccc',
        b:12
    },
    i:[1,2,3,4],
    j:Symbol("age"),
    k:new Set([1,2,3,4]),
    l:new Map([[1,2],[3,4]]),
    [nameSymbol]:"job",
};
// target.target = target;

// target.target = target;

let cloneObj = deepClone(target)

console.log(cloneObj)