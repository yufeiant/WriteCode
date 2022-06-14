/**
 * 写一个链式调用的task,同时这个task需要提供sleep的功能.
 * 实现思路:
 * 可以通过 class 或者是函数闭包的方式来包装数据,提供函数来实现
 * 关键点:
 * 任务队列
 * 触发next
 * sleep 异步触发
 * */

class Task{
    private name:string;
    private tasks:Function [] = [];//任务列表

    constructor(name:string) {
        this.name = name;
        setTimeout(()=>{
            this.next();
        })
    }

    private next(){
        if(this.tasks.length>0){
            const task = this.tasks.shift();
            task();
        }
    }

    /***
     * 添加吃的任务 在添加的时候函数里面用函数对数据进行一下包装
     * @param food
     */
    eat(food:string){
        const task = ()=>{
            //利用闭包保存数据
            console.log(`${this.name} eat ${food}`);
            //立即执行下一个任务
            this.next();
        }
        this.tasks.push(task);
        return this;
    }
    /**
     * 休息几秒,然后自动执行下一个任务
     * */
    sleep(seconds:number){
        const task = ()=>{
            //
            console.log(`${this.name} 开始睡觉了`)
            setTimeout(()=>{
                this.next();
            },seconds * 1000)
        }
        this.tasks.push(task);
        return this;
    }
}

const task = new Task("小猫")
task.eat("小鱼").sleep(5).eat("小鱼干")
