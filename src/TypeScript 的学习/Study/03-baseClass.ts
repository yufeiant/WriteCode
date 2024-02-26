/**
 * class 如何定义类
 * */
export {}
class Person{
    name:string = "";
    getName():void{
        console.log(this.name)
    }
}
let person = new Person();
person.name = "zhufeang";
person.getName();

//定义存取器

class User{
    myName:string;
    constructor(myName:string) {
        this.myName = myName;
    }

    get name(){
        return this.myName
    }

    set name(myName){
        this.myName = myName
    }
}

let user = new User('zhufeng');
user.name = "jiagou";
console.log(user.name)
//现在每一次建立实例都需要输入初始化的参数,我们可以设置一个public
//public 相当于这个属于对于实例的修改和读取是公开的
class User1{
    // myName:string;
    constructor(public myName:string) {
        // this.myName = myName;
    }

    get name(){
        return this.myName
    }

    set name(myName){
        this.myName = myName
    }
}

let user1 = new User1("张三");
console.log(user1.myName)

//readonly 只读的
class Animal{
    //只读的,不能修改名字
    public readonly name:string;
    constructor(name:string) {
        this.name = name;
    }
    changeName(name:string){
        // Cannot assign to 'name' because it is a read-only property.
        // this.name = name;
    }
}

//public protected private 修饰符属性

class Father{
    static fatherName:string = 'fatherName';
    public name:string; //public 自己的子类和其他类都能访问
    protected age:number;//protected 受保护的 自己和自己的子类能访问
    private money:number;//private 自己能访问,子类和其他类不能访问
    constructor(name:string,age:number,money:number) {
        this.name = name;
        this.age = age;
        this.money = money;
    }
    getName():string{
        return this.name
    }
}

class Child extends Father{
    //子类会继承父类的静态数据和方法
    static ChildName:string = 'ChildName'
    constructor(name:string,age:number,money:number) {
        //先创建父类的实例
        super(name,age,money);
        this.name = "l李四"
    }
    desc(){
        console.log(this.name);
        console.log(this.age);
        //Property 'money' is private and only accessible within class 'Father'.
        // console.log(this.money);
    }
}

let s1 = new Child("张三",20,1);
console.log(s1.name);
// Property 'age' is protected and only accessible within class 'Father' and its subclasses.
// s1.age
console.log(Child.fatherName);
console.log(Child.ChildName);


