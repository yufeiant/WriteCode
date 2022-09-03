


/**
 * 4.手写 instanceof
 * instanceof 的原理是 不断的判断追溯 原型链上的对象是否对象的原型相同,
 * 所以需要获取对象的原型和 构造函数的原型
 *
 * 这里关于 instanceof的疑惑, 我们在拿到 object的原型 后,它的原型就不会在变.
 * 而是构造函数的原型对象进行迭代更新判断,所以不会出现 说,对象的原型最后和构造函数的原型在
 * object相会的情况.
 * */
function myInstanceof(object,constructor){
    //获取对象的原型
    let proto = Reflect.getPrototypeOf(object);
    //获取构造函数的原型对象
    let prototype = constructor.prototype;
    
    //通过类似遍历链表的方式来迭代构造函数的原型
    while (true){
        //判断proto是否为空
        if(!proto){
            return false;
        }
        //判断是否相同,如果相同就返回true
        if(proto === prototype){
            return true;
        }
        //如果没有找到,就继续往原型链上找 链表迭代
        proto = Reflect.getPrototypeOf(proto);
    }
}
/**
 * 调用__proto__版本
 * */
function myInstanceof(left, right) {
    while (true) {
        if (left === null) {
            return false;
        }
        if (left.__proto__ === right.prototype) {
            return true;
        }
        left = left.__proto__;
    }
}


//实现一个寄生式组合继承 验证一下
function Father(name){
    this.name = name;
}

Father.prototype.getName = function (){
    return this.name;
}

function Child(name){
    Father.call(this,name)
}

Child[Symbol.hasInstance]=function (){
    return false;
}
//浅拷贝 复制 父类的prototype
Child.prototype = Object.create(Father.prototype);
Child.prototype.constructor = Child;

//判断
let child = new Child("张三");
console.log(child instanceof Child)
