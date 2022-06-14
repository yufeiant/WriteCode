/**
 * 4.插入排序
 * 原理:
 左边维护一个有序的区间,右边拿到无序的元素和左边的所有元素进行比较,找到它自己的位置,然后插入进去.
 
 在比较的时候,可以通过冒泡排序的方式,大于就不用交换了,小于就交换.
 按个比较进去,当然这样的话会很多的无用的交换.
 
 所以可以优化一下,直接在比较的时候挪动位置,大于它的都挪动位置,找到它的位置以后,直接放入就可以了.
 * */

function insertSort(arr){
    for(let i = 1;i < arr.length;i++){
        //比较元素从1的位置开始---同时暂存当前元素
        let insertValue = arr[i];
        //有序元素的边界是 i - 1
        let j = i-1;
        //和有序区间的元素进行比较,如果小于该元素,就把该元素向右移动
        for(;(j>=0) && (insertValue < arr[j]);j--){
            arr[j+1] = arr[j];
        }
        //insertValue的值插入适当的位置
        arr[j+1] = insertValue;
    }
}

let array = [10,9,1,2,6,3,11,28,15];
insertSort(array);
console.log(array)