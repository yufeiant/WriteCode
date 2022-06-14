export default function getType(value){
    return Object.prototype.toString.call(value).replaceAll(new RegExp(/\[|\]|object/g),"")
}

console.log(getType([]));
