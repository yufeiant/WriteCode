/**
 * 题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个
 addTask(1000,"1");
 addTask(500,"2");
 addTask(300,"3");
 addTask(400,"4");
 的输出顺序是：2 3 1 4
 
 整个的完整执行流程：
 
 一开始1、2两个任务开始执行
 500ms时，2任务执行完毕，输出2，任务3开始执行
 800ms时，3任务执行完毕，输出3，任务4开始执行
 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
 1200ms时，4任务执行完毕，输出4
 
 实际上就是内部实现一个计数器,来控制,
 
 * */
class Scheduler{
    constructor(limit) {
        //Promise 队列
        this.queue = [];
        //每次并行运行的数量
        this.maxCount = limit;
        //当前运行的数量
        this.runCounts = 0;
    }
    add(time,order){
        const promiseCreator=()=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    console.log(order)
                    resolve();
                },time)
            })
        }
        this.queue.push(promiseCreator);
    }
    taskStart(){
        //按照当前最大并发数量进行调度
        for(let i = 0;i<this.maxCount;i++){
            this.request();
        }
    }
    request(){
        //判断是否有数据以及是否已经执行完毕
        if(!this.queue.length || this.runCounts >= this.maxCount){
            return ;
        }
        //运行数量加1
        this.runCounts++;
        //调用队列前面的,在它的回调中对运行数量减一
        this.queue.shift()().then(()=>{
            this.runCounts--;
            this.request();
        })
    }
}

const scheduler = new Scheduler(2);
scheduler.add(1000,"1")
scheduler.add(1000,"2")
scheduler.add(1000,"3")
scheduler.add(1000,"4")
scheduler.add(1000,"5")
scheduler.taskStart();