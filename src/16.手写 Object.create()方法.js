/**
 * 怎么实现手写Object.create方法呢?
 *
 * 这个方法的作用是,创建一个对象,
 * 这个对象的原型是传进来的对象
 * */

function objectCreate(obj){
    function F(){}
    F.prototype = obj;
    return new F();
}

