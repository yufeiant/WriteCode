/**
 * 深度优先搜索 DOM
 * */
function visitNode(n){
    //注释
    if(n instanceof Comment){
        console.log('Comment node ---',n.textContent)
    }
    //文本
    if(n instanceof  Text){
        console.log('Text node ---',n.textContent)
    }
    //element
    if(n instanceof HTMLElement){
        console.log('Element node ---',`<${n.tagName.toLocaleLowerCase()}`)
    }
}

/**
 * 深入优先遍历
 * 深度优先搜索的原理:
 * 使用遍历的方式,按个通过depthFirstTraverse来获取数据.
 * 深入优先:递归 贪心
 * children 和 childNodes 不同
 * */
function depthFirstTraverse1(root){
    //判断节点是否为空
    if(!root){
        return ;
    }
    visitNode(root);
    //拿到所有的子节点
    const childNodes = root.childNodes;
    if(childNodes.length){
        //递归
        childNodes.forEach(item=>{
            depthFirstTraverse(item);
        })
    }
}

/**
* 深入优先搜索 ---不适用递归实现
 *
* */
function depthFirstTraverse2(root){
    //判断节点是否为空
    if(!root){
        return ;
    }
    //通过栈来模拟递归
    const stack = [];
    //根节点入栈
    stack.push(root);
    visitNode(root);
    while (stack.length>0){
        const node = stack.pop();
        visitNode(node);
        //子节点压栈
        const childNodes = node.childNodes;
        if(childNodes.length>0){
            //需要注意的点:反顺序压栈
            Array.from(childNodes).reverse().forEach(item=> stack.push(item))
        }
    }
}

/**
 * 广度优先搜索
 * 利用队列尾进头出的特性
 * 按个把它的所有的子节点都放入到队列里面
 * */
function breadthFirstTraverse(root){
    if(!root){
        return ;
    }
    //队列
    const queue = [];
    //根节点入队
    queue.unshift(root);
    //根节点入队列
     while (queue.length>0){
         const node = queue.pop();
         //不要搞混了,深度优先搜索 中的前序遍历,是先打印根节点的.
         visitNode(node);
         const childNodes = node.childNodes;
         if(childNodes.length>0){
             childNodes.forEach(child=>{
                 queue.unshift(child);
             })
         }
     }
}

/**
 * 递归和非递归
 * 递归逻辑更加清晰,但容易发生stack overflow 错误
 * 非递归效率更高,但逻辑比较复杂
 * */

const box = document.getElementById('box')
depthFirstTraverse2(box);
