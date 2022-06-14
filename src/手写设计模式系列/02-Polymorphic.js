
/**
 * 多态
 *
 * 同一个操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。
 *
 * 给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。
 *
 * 多态背后的思想是：做什么和 谁去做以及怎么样去做的分离。
 * */

// 初版
const makeSound = function (animal){
    if(animal instanceof Duck){
        console.log("嘎嘎嘎")
    }else if(animal instanceof Chicken){
        console.log("咯咯咯")
    }
}

const Duck = function (){};
const Chicken = function (){};

makeSound(new Duck());
makeSound(new Chicken());

// 利用多态的 做什么和 谁去做以及怎样做的 分离思想来处理。

const makeSound2 = function (animal){
    //动物发出叫声
    animal.sound();
}

Duck.prototype.sound = function (){
    console.log("嘎嘎嘎")
}

Chicken.prototype.sound = function (){
    console.log("咯咯咯")
}

makeSound2(new Duck());
makeSound2(new Chicken());

//当我们添加一个新的对象来实现这个操作的时候，只需要重新建立一个对象，

const Dog = function (){}
Dog.prototype.sound = function (){
    console.log("哇哇哇")
}
makeSound2(new Dog());

//************************************利用多态来消除条件语句**********************************

