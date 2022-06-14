/**
 * 策略模式
 * 策略模式的思想：
 * 定义一系列的算法，把他们一个一个封装起来，并且使他们可以相互替换。
 * */

/***
 * 场景：他们有公共的逻辑，有统一的目标出口，比如一段公共的业务逻辑，比如算奖金这个事儿，这个是一个统一的目标，
 * 但是基于他们的需求场景，需要应对一个场景来出现一个算法的情况。
 *
 * 区分变和不变的地方在哪里？
 *
 * 不变的是，我调用这个算法的时候，都是需要拿到奖金。
 * 变的是，我希望通过不同的类别拿到不同的奖金。
 * 所以这个统一调度的函数，只需要根据不同的类型返回不同的数据就可以了。
 */

/**
 * 普通的情况：
 * if else
 * 根据不同的情况判断if else 或者把这个写成switch，但是并没有解决
 * 变和不变的分离。我们的各种业务逻辑还是写在一起。
 * 如果其中一个求奖金的逻辑修改，那么其他的需要冲突新测试。
 * */

const calculateBonus = function (performanceLevel,salary){
    if(performanceLevel === "S"){
        return salary * 4;
    }
    if(performanceLevel === "A"){
        return salary * 3;
    }
    if(performanceLevel === "B"){
        return salary * 2;
    }
}

/**
 * 思考：
 * 既然我们需要把变和不变的分离，那么我们各种求奖金的逻辑都抽取出来，放在函数里，
 * 然后调用不同的函数不就可以了。
 *
 * 缺陷：我们虽然把他们的逻辑抽取了出来，但是calculateBonus1 函数还是会越来越大。
 * 系统的变化也缺乏弹性。
 * */
const performanceS = function (salary){
    return salary * 4;
}
const performanceA = function (salary){
    return salary * 3;
}
const performanceB = function (salary){
    return salary * 2;
}

const calculateBonus1 = function (performanceLevel,salary){
    if(performanceLevel === "S"){
        return performanceS(salary)
    }
    if(performanceLevel === "A"){
        return performanceA(salary)
    }
    if(performanceLevel === "B"){
        return performanceB(salary)
    }
}

/**
 * 策略模式的实现：
 * 将变和不变的分离是每个设计莫的主题，都是他们思考的方向。
 * 这里我们直接实现javascript版本的
 * */

const strategies = {
    "s":function (salary){
        return salary * 4;
    },
    "A":function (salary){
        return salary * 3;
    },
    "B":function (salary){
        return salary * 2;
    },
}

const calculateBonus2 = function (performanceLevel,salary){
    return strategies[performanceLevel](salary);
}

/**
 * 策略模式 优化表单验证
 * */
//策略类
const strategies1 = {
    isNonEmpty:(value,errorMsg = "不可以为空")=>{
        if(value === "" || value === undefined || value === null ){
            return errorMsg;
        }
    },
    minLength:(value,length,errorMsg)=>{
        if(value.length < length){
            return errorMsg;
        }
    },isMobile:(value,errorMsg)=>{
        if(value){
            return errorMsg
        }
    }
}

//Validator类
class Validator {
    constructor() {
        this.cache = [];
    }
    add=(dom,rules)=>{
       for(let rule of rules){
           //拿到每一条的策略
           const strategyAry = rule.strategy.split(":");
           const errorMsg = rule.errorMsg;
           //把数据放到闭包里
           this.cache.push(()=>{
               const strategy = strategyAry.shift();
               //第一参数是value，所以要添加上去
               strategyAry.unshift(dom.value);
               strategyAry.push(errorMsg);
               return strategies1[strategy].apply(dom,strategyAry)
           })
       }
    }
    start=()=>{
        for(const fn of this.cache){
            const errorMsg = fn();
            if(errorMsg){
                return errorMsg
            }
        }
    }
}
//需要验证的表单
const registerForm = document.getElementById("registerForm");


const validFunc = function (){
    const validator = new Validator();
    validator.add(registerForm.userName,[
        {
            strategy:"isNonEmpty",
            errorMsg:"用户名不能为空"
        },
        {
            strategy:"minLength:10",
            errorMsg:"用户名长度不能少于10位"
        },
    ]);
    
    validator.add(registerForm.password,[{
        strategy:"minLength:6",
        errorMsg:"用户名长度不能少于6位"
    }])
    
    validator.add(registerForm.phoneNumber,[{
        strategy:"isMobile",
        errorMsg:"手机格式不正确！"
    }])
    
    return validator.start();
}

registerForm.onsubmit=function (){
    const errorMsg = validFunc();
    if(errorMsg){
        alert(errorMsg);
        return false;
    }
}