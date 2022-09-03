/**
* 10.寄生组合的关键
 * 1.通过call来调用父类的构造函数来初始化子类
 * 2.浅拷贝父类的原型对象给子类的原型对象
* **/

function Father(name){
    this.name = name;
}

Father.prototype.getName=function (){
    return this.name;
}

function Child(name){
    Father.call(this,name);
}

Child.prototype = Object.create(Father.prototype);
Child.prototype.constructor = Child;

