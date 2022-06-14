/**
 * 9.归并排序的思想
 *  先把左边排好序,再把右边排好序.最后合并到一块就可以了.
 *
 * **/



function sort(nums,lo,hi){
    let temp = new Array(nums.length);
    if(lo === hi){
        return ;
    }
    //获取中间节点
    let mid = lo + Math.floor((hi-lo)/2);
    //先把左边排好序
    sort(nums,lo,mid);
    //再把右边排好序
    sort(nums,mid+1,hi);
    //最后合并到一块.
    merge(nums,lo,mid,hi,temp);
}
//合并两个数组到一个数组里面.
function merge(nums,lo,mid,hi,temp){
    //在合并之前,我们先把nums[lo,...hi]复制到temp中
    //以便合并后的结果能够直接存入到nums中
    for(let i = lo;i<=hi;i++){
        temp[i] = nums[i];
    }
    //利用数组双指针的技巧,合并两个有序数组
    //两个指针,分别指向左数组的起点和右数组的起点,
    //for循环遍历原来的数组,
    //我们判断左指针指向的元素和右指针指向的元素 大于还是小于
    //如果是 左 > 右 那么 nums[p] = temp[j++]
    //如果是 左 < 右 那么 nums[p] = temp[i++]
    //如果是 i = mid +1 就表示左边数组合并完了,直接添加右边吧
    //如果是 i = hi +1  就表示右边数组合并完了,直接添加左边吧
    let i = lo,j = mid+1;
    for(let p = lo;p<=hi;p++){
        //如果是 i = mid +1 就表示左边数组合并完了,直接添加右边吧
        if (i === mid + 1) {
            // 左半边数组已全部被合并
            nums[p] = temp[j++];
            //如果是 i = hi  就表示右边数组合并完了,直接添加左边吧
        } else if (j === hi + 1) {
            // 右半边数组已全部被合并
            nums[p] = temp[i++];
        //如果是 左 > 右 那么 nums[p] = temp[j++]
        } else if (temp[i] > temp[j]) {
            nums[p] = temp[j++];
        //如果是 左 < 右 那么 nums[p] = temp[i++]
        } else {
            nums[p] = temp[i++];
        }
    }
}

let arr = [1,3,4,20,4,6,9,11,3,2,5,7,19,17,16,15,14];

sort(arr,0,arr.length-1);
console.log(arr)