/**
 * [
 *     {
 *         id: 1,
 *         text: '节点1',
 *         parentId: 0,
 *         children: [
 *             {
 *                 id:2,
 *                 text: '节点1_1',
 *                 parentId:1
 *             }
 *         ]
 *     }
 * ]
 * 转成
 * [
 *     {
 *         id: 1,
 *         text: '节点1',
 *         parentId: 0 //这里用0表示为顶级节点
 *     },
 *     {
 *         id: 2,
 *         text: '节点1_1',
 *         parentId: 1 //通过这个字段来确定子父级
 *     }
 *     ...
 * ]
 * */

let data = [
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id:2,
                text: '节点1_1',
                parentId:1
            }
        ]
    }
]

const disposeData=(data)=>{
    //首先需要一个数组来存放数据
    //需要把原来的数据递归迭代到数组中
    const res = [];
    const dfs=(arr)=>{
        arr.forEach(item=>{
           if(item.children){
               dfs(item.children);
               delete item.children;
           }
           res.push(item);
        })
    }
    dfs(data);
    return res;
}

console.log(disposeData(data))