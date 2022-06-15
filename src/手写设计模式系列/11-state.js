/**
 * 状态模式
 * */

/** 第一个例子: 点灯程序*/
// const Light = function (){
//     //给点灯设置初始状态off
//     this.state = "off";
//     //点灯开关按钮
//     this.button = null;
// }
// // 建立一个真实的按钮,点击开关触发
// Light.prototype.init=function (){
//     const button = document.createElement("button"),
//         self = this;
//     button.innerHTML = "开关";
//     this.button = document.body.appendChild(button);
//     this.button.onclick = function (){
//         self.buttonWasPressed();
//     }
// }
//点击开关实际改变点灯的状态
// Light.prototype.buttonWasPressed = function () {
//     //如果当前状态是关
//     if(this.state === "off"){
//         console.log("开灯");
//         this.state = "on";
//     }else if(this.state === "on") {
//         console.log("关灯");
//         this.state = "off";
//     }
// }

// Light.prototype.buttonWasPressed = function () {
//     //如果当前状态是关
//     if(this.state === "off"){
//         console.log("弱光");
//         this.state = "weakLight";
//     }
//     else if(this.state === "weakLight"){
//         console.log("强光");
//         this.state = 'strongLight'
//     }
//     else if(this.state === "strongLight") {
//         console.log("关灯");
//         this.state = "off";
//     }
// }
// const light = new Light();
// light.init();

//定义关灯状态的类
class OffLightState{
    constructor(light) {
        this.light = light;
    }
    buttonWasPressed(){
        console.log('弱光');
        //切换到下一个状态 对象的行为知道它发生以后对应的是哪个状态
        this.light.setState(this.light.weakLightState);
    }
}
//定义弱光状态的类
class WeakLightState{
    constructor(light) {
        this.light = light;
    }
    buttonWasPressed(){
        console.log('强光');
        //切换到下一个状态 对象的行为知道它发生以后对应的是哪个状态
        this.light.setState(this.light.strongLightState);
    }
}
//定义强光状态的类
class StrongLightState{
    constructor(light) {
        this.light = light;
    }
    buttonWasPressed(){
        console.log('超级光');
        //切换到下一个状态 对象的行为知道它发生以后对应的是哪个状态
        this.light.setState(this.light.superLightState);
    }
}

//定义超级光的状态类
class SuperLightState{
    constructor(light) {
        this.light = light;
    }
    buttonWasPressed(){
        console.log('关灯');
        //切换到下一个状态 对象的行为知道它发生以后对应的是哪个状态
        this.light.setState(this.light.offLightState);
    }
}

//定义开关
class Light{
    constructor() {
        this.offLightState = new OffLightState(this);
        this.weakLightState = new WeakLightState(this);
        this.strongLightState = new StrongLightState(this);
        this.superLightState = new SuperLightState(this);
        this.currState = null;
    }
    
    init(){
        const button = document.createElement("button"),
            self = this;
        //设置当前的状态 为关灯
        self.currState = self.offLightState;
        button.innerHTML = "开关";
        this.button = document.body.appendChild(button);
        this.button.onclick = function (){
            //调用当前的状态(对象)对应的行为.
            self.currState.buttonWasPressed();
        }
    }
    setState(newState){
        this.currState = newState;
    }
}

const light = new Light();
light.init();


