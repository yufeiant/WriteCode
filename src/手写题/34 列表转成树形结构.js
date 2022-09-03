/***
 * 题目描述:
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
 *
 * 转成
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
 */
const data = [
    {
        id: 1,
        text: '节点1',
        parentId: 0 //这里用0表示为顶级节点
    },
    {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个字段来确定子父级
    }
]

const disposeData=(arr)=>{
    const map = new Map();
    let top = arr[0];
    map.set(top.id,top)
    for(let i = 1;i<arr.length;i++){
        const item = arr[i];
        const parentNode = map.get(item.parentId);
        parentNode.children = parentNode.children || [];
        parentNode.children.push(item);
        map.set(item.id,item);
    }
    return top;
}

console.log(disposeData(data))