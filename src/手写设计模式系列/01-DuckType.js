/**
 * 鸭子类型：
 * 如果它走起来像鸭子，叫起来像鸭子，那么它就是鸭子。
 *
 * 国王要听到的是鸭子的声音，至于这个声音到底是鸡发出来的，还是鸭子发出来的，
 * 都不重要，鸭子类型指导我们只需要关注对象的行为，而不是关注对象本身。
 *
 * 它关注的是你提供了什么，而非你是什么，比如我要鸭子的叫声，对于它具体是什么并不重要，我只要一样的行为就可以。
 *
 抽象工厂模型中对行为的抽象，关注事件的运行模型，我们规定了事件的运行节点，必须要有这几个步骤完成，但是它并不要求是谁去执行。
 * */

var duck = {
    name:"鸭子",
    duckSinging:function (){
        console.log("嘎嘎嘎")
    }
}
var chicken = {
    name:"小鸡",
    duckSinging:function (){
        console.log("嘎嘎嘎")
    }
}
var choir = [];
var joinChoir = function (animal){
    //判断这个动物如果有发出鸭子的叫声的方法
    if(animal && typeof animal.duckSinging === "function"){
        choir.push(animal);
        console.log("恭喜"+animal.name+"加入合唱团");
        console.log("合唱团的数量有："+choir.length)
    }
}
joinChoir(duck);
joinChoir(chicken);



