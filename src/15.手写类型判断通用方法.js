/**
 * 类型判断的通用方法
 * */
function getType(obj){
    return Object.prototype.toString.call(obj).replaceAll(new RegExp(/\[|\]|object/g),"")
}

console.log(getType(null))
console.log(getType(undefined))
console.log(getType("111"))
console.log(getType(111))
console.log(getType(new Set()))
console.log(getType(new Map()))
console.log(getType(new Date()))
console.log(getType(Symbol()))
console.log(getType(new RegExp()))
console.log(getType(1n))