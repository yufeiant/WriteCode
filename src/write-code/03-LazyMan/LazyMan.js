/**
 * 写一个链式调用的task,同时这个task需要提供sleep的功能.
 * 实现思路:
 * 可以通过 class 或者是函数闭包的方式来包装数据,提供函数来实现
 * */
var Task = /** @class */ (function () {
    function Task(name) {
        this.tasks = []; //任务列表
        this.name = name;
        setTimeout(()=>{
            this.next();
        },0)
    }
    Task.prototype.next = function () {
        if (this.tasks.length > 0) {
            var task_1 = this.tasks.shift();
            task_1();
        }
    };
    /***
     * 添加吃的任务 在添加的时候函数里面用函数对数据进行一下包装
     * @param food
     */
    Task.prototype.eat = function (food) {
        var _this = this;
        var task = function () {
            //利用闭包保存数据
            console.log(_this.name + " eat " + food);
            //立即执行下一个任务
            _this.next();
        };
        this.tasks.push(task);
        return this;
    };
    /**
     * 休息几秒,然后自动执行下一个任务
     * */
    Task.prototype.sleep = function (seconds) {
        var _this = this;
        var task = function () {
            //
            console.log(_this.name + " \u5F00\u59CB\u7761\u89C9\u4E86");
            setTimeout(function () {
                if (_this.tasks.length > 0) {
                    var task_2 = _this.tasks.shift();
                    task_2();
                }
            }, seconds * 1000);
        };
        this.tasks.push(task);
        return this;
    };
    return Task;
}());
var task = new Task("小猫");
task.eat("小鱼").eat("小鱼1").sleep(5).eat("小鱼干");
