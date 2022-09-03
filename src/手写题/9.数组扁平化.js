/**
 * 实现一个方法使多维数组变成一维数组
 * */
const flatten=(arr)=>arr.concat()


/**
 * 无限深度的数组扁平化
 * */
function flatter1(arr){
    if(!arr.length){
        return [];
    }
    return arr.reduce((pre,cur)=>
        Array.isArray(cur) ? [...pre,...flatter1(cur)] : [...pre,cur]
        , [])
}

//2.使用迭代的版本实现
function flatter2(arr){
    if(!arr.length){
        return [];
    }
    //只要判断其中有 数组,就给它展开
    while (arr.some(item=>Array.isArray(item))){
        arr =[].concat(...arr);
    }
    return arr;
}


let arr = [[12,3,4],1,2,3,[[1,2,3,4],[1,2],[],[]]]

console.log(flatter2(arr))
