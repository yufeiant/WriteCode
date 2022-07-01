//01-实例的公共字段
class InstPublicClass {
    instancePublicField = 0;
    constructor(value) {
        this.property = value;
    }
}

const inst = new InstPublicClass('constrArg');

//02-静态的公共成员
const computedFieldKey = Symbol("computedFieldKey");
class StaticPublicFieldClass {
    static identifierFieldKey = 1;
    static 'quoted field key' = 2;
    static [computedFieldKey] = 3;
}

console.log(StaticPublicFieldClass.identifierFieldKey)
console.log(StaticPublicFieldClass["quoted field key"])
console.log(StaticPublicFieldClass[computedFieldKey])

//03-私有变量
class InstPrivateClass1{
    #privateField1 = 'private field 1';
    #privateField2 ;
    constructor(value) {
        this.#privateField2 = value;
    }
    
    checkPrivateValues(){
        console.log(this.#privateField1)
        console.log(this.#privateField2)
    }
}

const inst1 = new InstPrivateClass1("constructor argument");
inst1.checkPrivateValues();

console.log('inst',Object.keys(inst1).length === 0)

//04-实例私有字段和静态私有字段

class InstPrivateClass{
    #privateField1 = 'private field 1';
    #privateField2 ;
    static #staticPrivateField = "hello";
    constructor(value) {
        this.#privateField2 = value;
    }
    
    checkPrivateValues(){
        console.log(this.#privateField1)
        console.log(this.#privateField2)
    }
    
    static #twice(){
        return this.#staticPrivateField + " " + this.#staticPrivateField
    }
    
    static getResultTwice(){
        return this.#twice()
    }
}

const instt = new InstPrivateClass("constructor argument");
instt.checkPrivateValues();

console.log("instt",Object.keys(instt).length === 0);
console.log(InstPrivateClass.getResultTwice())

//05-私有方法和访问器
class MyClass {
    #privateMethod() {}
    static check() {
        const inst = new MyClass();
        
        console.log(#privateMethod in inst) // output-> true
        
        console.log(#privateMethod in MyClass.prototype) // output-> false
        
        console.log(#privateMethod in MyClass) // output-> false
    }
}
MyClass.check();

//06-类中的静态初始化块。对于静态数据，我们有在创建类时执行的静态字段和静态块。

class Translator {
    static translations = {
        yes: 'ja',
        no: 'nein',
        maybe: 'vielleicht',
    };
    static englishWords = [];
    static germanWords = [];
    static { // (A)
        for (const [english, german] of Object.entries(this.translations)) {
            this.englishWords.push(english);
            this.germanWords.push(german);
        }
    }
}


console.log(Translator.englishWords, Translator.germanWords)
//Output -> ["yes", "no", "maybe"], ["ja", "nein", "vielleicht"]
//07- 私有曹检查
class C1 {
    #priv() {}
    static check(obj) {
        return #priv in obj;
    }
}

console.log(C1.check(new C1())) // output true