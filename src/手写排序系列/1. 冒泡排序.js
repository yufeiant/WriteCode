/**
 * 1.冒泡排序
 * 相邻的两个元素进行比较,大的那个移动到右侧,然后进行数组长度-1轮,就排好序了.
 * 就是前一个数比后一个数大,那么就应该交换都后面
 * 
 * 冒泡排序是稳定排序,只有不同才会交换,相同则不交换.
 * */
//交换元素的函数
function swap(arr,i,j){
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

function bubbleSort(arr){
    //第一个循环用来控制轮数 n-1轮
    for(let i = 0;i<arr.length-1;i++){
        for(let j = 0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1)
            }
        }
    }
}
/** 优化一: */
//数组有可能有提前排好序的情况,如果发现没有交换,就退出
function bubbleSort(arr){
    //第一个循环用来控制轮数 n-1轮
    for(let i = 0;i<arr.length-1;i++){
        //有序的标记，每一轮的初始值都是true
        let isSorted = true;
        for(let j = 0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1)
                isSorted = false;
            }
        }
        if(isSorted){
            break;
        }
    }
}
/** 优化二: */
//第三版：冒泡排序--如果数组已经有一部分数组是排好序的，但是还是会轮训那么多次。
//[5,3,4,2,1,6,7,8,9]
function BubbleSort(array){
    //记录最后一次交换的位置
    let lastExchangeIndex = 0;
    //无序数列的边界，每次比较只需要比到这里为止
    let sortBorder = array.length - 1;
    
    for(let i = 0; i<array.length - 1;i++){
        //有序标记，每一轮的初始值都是true
        let isSorted = true;
        for( let j = 0; j<sortBorder; j++){
            let tmp = 0;
            //判断是否大于下一位
            if(array[j]>array[j+1]){
                tmp = array[j];
                array[j] = array[j+1];
                array[j+1] = tmp;
                
                //因为有元素交换，所以不是有序的，标记变为false.
                isSorted = false;
                //更新为最后一次交换元素的位置
                lastExchangeIndex = j;
            }
        }
        //有序的边界更新
        sortBorder = lastExchangeIndex;
        if(isSorted){
            break;
        }
    }
}