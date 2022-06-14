/***
 鸡尾酒排序是从冒泡排序又优化升级而来。
 比如如下场景：
 ```
 [2,3,4,5,6,7,8,1,9]
 ```
 如果使用冒泡排序，因为只需要移动`1`这一个位置，却需要轮回`8`次。
 
 冒泡排序的每一轮都是从左到右比较元素，进行单向的位置交换。
 
 而鸡尾酒排序则是双向交换，它先从左到右，接着又从右到左，然后在从左到右。
 
 好，废话不多说，上代码：
 * @param array
 * @constructor
 */
function CocktailSort(array){
    let tmp = 0;
    for(let i = 0;i<array.length / 2; i++){
        //有序标记，每一轮的初始值都是true
        let isSorted = true;
        //奇数轮，从左向右比较和交换
        for(let j = i;j<array.length-i-1;j++){
            if(array[j] > array[j+1]){
                tmp = array[j];
                array[j] = array[j+1];
                array[j+1] = tmp;
                //有元素交换，所以不是有序的，标记变为false
                isSorted = false;
            }
        }
        
        if(isSorted){
            break;
        }
        
        //在偶数轮之前，将isSorted重新标记为true
        isSorted = true;
        //偶数轮，从右向左重新标记为true.
        for(let j = array.length - i -1;j>i;j--){
            if(array[j] <array[j-1]){
                tmp = array[j-1];
                array[j] = array[j-1];
                array[j-1] = tmp;
                //因为元素交换，所以不是有序的，标记变为false
                isSorted = false;
            }
        }
        if(isSorted){
            break;
        }
        
    }
}