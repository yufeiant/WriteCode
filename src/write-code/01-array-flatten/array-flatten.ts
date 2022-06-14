/**
 * 题目要求:实现数组 一层扁平化
 * 实现原理:可以通过迭代判断如果是数组就展开,不是输入就加入
 * */

export function flatten1(arr:any[]) : any[]{
    //定义数组
    const res:any[] = [];

    arr.forEach(item=>{
        if(Array.isArray(item)){
            item.forEach(n=>res.push(n))
        }else{
            res.push(item)
        }
    })
    return res;
}

/**
 * 更加简便的方法:使用concat
 * 它的特性是:如果不是数组就添加,如果是数组就展开,再添加
 *
 * concat 不会修改  原数组
 * */

export function flatten2(arr:any[]) : any[]{
    const res:any[] = [];
    arr.forEach(item=>{
        res.concat(item)
    })
    return res;
}