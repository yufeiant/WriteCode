/**
 * 职责链模式
 *
 * */
/**
 *
 * @param orderType 订单类型:1 500 元定金用户 2 200 元定金用户 3 普通用户
 * @param pay 表示是否已经支付定金 true 或者 false
 * @param stock 表示当前用于普通购买的手机库存数量,已经支付过定金的用户不受此限制
 */
const order = function (orderType,pay,stock){
    //500元定金模式
    if(orderType === 1){
        //已支付定金
        if(pay === true){
            console.log("500元定金预购,得到 100 元优惠券")
        }else{
            //未支付定金,降级到普通用户,需要判断是否有库存
            if(stock > 0){
                console.log("普通购买,无优惠券")
            }
        }
    //200 元定金模式
    }else if(orderType === 2){
        //已支付定金
        if(pay === true){
            console.log("200元定金预购,得到 50 元优惠券")
        }else{
            //未支付定金,降级到普通用户,需要判断是否有库存
            if(stock > 0){
                console.log("普通购买,无优惠券")
            }
        }
    //普通用户模式
    }else{
        if(stock > 0){
            console.log("普通购买,无优惠券")
        }else{
            console.log("手机库存不足")
        }
    }
}

//抽取变的逻辑到函数中
const order500 = function (orderType,pay,stock){
    if(orderType === 1 && pay === true){
        console.log("500元定金预购,得到 100 元优惠券")
    }else{
        return 'nextSuccessor' ;//把执行权交给下一个
    }
}

//抽取变的到函数中
const order200 = function (orderType,pay,stock){
    if(orderType === 2 && pay === true){
        console.log("200元定金预购,得到 50 元优惠券")
    }else{
        return 'nextSuccessor' ;//把执行权交给下一个
    }
}

//抽取变的到函数中
const orderNormal = function (orderType,pay,stock){
    if(stock > 0){
        console.log("普通购买,无优惠券")
    }else{
        console.log("手机库存不足")
    }
}

//包装节点的职责链代码
const Chain = function (fn,name){
    this.name = name;
    this.fn = fn;
    this.successor = null;
}
//设置下一个节点
Chain.prototype.setNextSuccessor = function (successor){
   return  this.successor = successor;
}

Chain.prototype.passRequest = function (){
    //执行当前节点的逻辑
    const ret = this.fn.apply(this,arguments);
    //判断当前节点的逻辑是否把数据做了处理
    if(ret === 'nextSuccessor'){
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }
    return ret;
}

//添加抽取的业务数据到职责链的节点中
const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrderNormal = new Chain(orderNormal);

//指定节点在职责链中的顺序
chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal);

//最后把请求传递给第一个节点
chainOrder500.passRequest(1,true,500)
chainOrder500.passRequest(2,true,200)
chainOrder500.passRequest(3,true,500)
chainOrder500.passRequest(1,false,500)


/**
 * 异步职责链模式
 * */
//添加next方法,可以直接调用下一个职责链的节点
Chain.prototype.next = function (){
    //这里在调用时候不应该用apply调用吧,我已经确定了它的上下文就是this.successor,
    //为什么我还需要再传入进去一次呢? 它已经是隐式绑定了呀.
    // return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    return this.successor && this.successor.passRequest(arguments);
}


const fn1 = new Chain(()=>{
    console.log(1);
    return 'nextSuccessor'
},"fn1")

const fn2 = new Chain(function (){
    console.log(2);
    const self = this;
    setTimeout(()=>{
        self.next();
    },1000)
},"fn2")

const fn3 = new Chain(()=>{
    console.log(3)
},"fn3")

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();

/**
 * AOP实现职责链
 * 在函数上面添加一个after对象,然后调用了,
 * 在这个after函数中传入一个函数,来作为下一个函数.
 * 调用当前函数,判断该函数是否执行了处理了逻辑.
 * 如果没有处理,就判断执行传入after的这个函数.
 * */

Function.prototype.after = function (fn){
    const self = this;
    return function (){
        const ret = self.apply(this,arguments);
        if(ret === "nextSuccessor"){
            return fn.apply(this,arguments)
        }
        return ret;
    }
}

const order1 = order500.after(order200).after(orderNormal);

order1(1,true,500);
order1(2,true,200);
order1(3,true,-1);