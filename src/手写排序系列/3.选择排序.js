/**
 * 3.选择排序
 * 每一轮选出最小元素直接交换到左侧.
 * 这种排序的最大优势就是,省去了多余的元素交换.
 *
 * 选择排序实际上是一个 双指针的引用技巧. 左边的指针控制有序的边界,右边的指针去探查剩余数组中最小的那个
 * */
//交换元素的函数
function swap(arr,i,j){
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

function selectionSort(arr){
    //最外层控制的就是有序的边界
    for( let i = 0;i < arr.length - 1 ; i++ ){
        let minIndex = i;
        //寻找最小值
        for(let j = i+1;j<arr.length;j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        //把最小值交换到左侧
        if(minIndex !== i){
            swap(arr,minIndex,i);
        }
    }
}
