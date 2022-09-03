/**
 * 14.二分查找
 *
 *
 * */

/**基础二分查找 递归实现*/

function search(arr,target){
    function findIndex(lo,hi){
        if(lo>=hi){
            return -1;
        }
        let mid = Math.floor((lo+hi)/2);
        //如果值 大于 Mid 就说明值在右边 就去mid的右边找
        if(arr[mid] < target){
            return findIndex(mid+1,hi);
        //如果是小于,则说明是在左区间 ,就去mid 的左边找
        }else if(arr[mid] > target){
            return findIndex(lo,mid-1);
        }else{
            //找到了
            return mid;
        }
    }
    return findIndex(0,arr.length-1)
}

let arr = [1,2,3,4,5,6,7,8,9,10];
// console.log(search(arr,11))

/**基础二分查找 迭代 实现*/
function search(arr,target){
    if(!Array.isArray(arr) || arr.length === 0){
        return -1
    }
    let lo = 0,hi = arr.length-1;
    while (lo <= hi){
        let mid = lo+ Math.floor((hi-lo)/2);
        //如果值 大于 Mid 就说明值在右边 就去mid的右边找
        if(arr[mid] < target){
            lo = mid+1;
        //如果值 小于 mid 就说明值在左边 就取mid的左边去找
        }else if(arr[mid] > target){
            hi = mid-1;
        }else{
            return mid;
        }
    }
    return -1;
}

let arr2 = [1,2,3,4,5,6,7,8,9,10];
// console.log(search(arr2,5))

/**
 * 第一个变体:查找第一个位置
 *
 * 原理:当找到以后别忙返回,先判断一下是不是在左边界,
 * 同时进一步判断,向左移动一位进行判断
 * */

function searchFirst(arr,target){
    function findIndex(lo,hi){
        if(lo>=hi){
            return -1;
        }
        let mid = Math.floor((lo+hi)/2);
        //如果值 大于 Mid 就说明值在右边 就去mid的右边找
        if(arr[mid] < target){
            return findIndex(mid+1,hi);
            //如果是小于,则说明是在左区间 ,就去mid 的左边找
        }else if(arr[mid] > target){
            return findIndex(lo,mid-1);
        }else{
            //这里意思是:如果我找到了,我就在判断一步
            //是不是边界
            // 左边的值是不是不相同了,如果不相同就说明找到了第一个
            //相同就去下面找
           if(mid === lo || (arr[mid-1] !== target)){
                return mid;
           }else{
               return findIndex(lo,mid-1);
           }
        }
    }
    return findIndex(0,arr.length-1)
}

let arr1 = [1,2,3,4,5,5,5,5,6,7,8,9,10];
console.log(searchFirst(arr1,5))

/**
 * 第二个变体:查找最后一个位置
 *
 * 原理:和上面的查找第一个边界的原理相同,在找到以后,先别忙返回
 * 判断一下是不是到了边界?
 * 判断一下右边是不是还有?
 * */

function searchLast(arr,target){
    function findIndex(lo,hi){
        if(lo>=hi){
            return -1;
        }
        let mid = Math.floor((lo+hi)/2);
        //如果值 大于 Mid 就说明值在右边 就去mid的右边找
        if(arr[mid] < target){
            return findIndex(mid+1,hi);
            //如果是小于,则说明是在左区间 ,就去mid 的左边找
        }else if(arr[mid] > target){
            return findIndex(lo,mid-1);
        }else{
            //这里意思是:如果我找到了,我就在判断一步
            //是不是边界
            // 左边的值是不是不相同了,如果不相同就说明找到了第一个
            //相同就去下面找
            if(mid === hi || (arr[mid+1] !== target)){
                return mid;
            }else{
                return findIndex(mid+1,hi);
            }
        }
    }
    return findIndex(0,arr.length-1)
}

let arr3 = [1,2,3,4,5,5,5,5,6,7,8,9,10];
console.log(searchLast(arr3,5))

/**
 * 第三个变体:查找第一个大于等于该元素
 * [1,2,3,4,5,6,7,8,9]
 * target 5
 * */

function searchBigFirst(arr,target){
    let lo = 0,hi = arr.length - 1;
    while (lo <= hi){
        let mid = Math.floor((lo+hi)/2);
        // 如果arr[mid] 大于目标值 就说明我们要找的目标值在左边[lo,mid-1]
        if(arr[mid] >= target){
            //判断如果已经达到边界
            //判断左边的元素已经是小于它的了
            if((mid === 0) || (arr[mid-1] < target)){
                return mid;
            }else{
                //去它的左侧继续查找
                hi = mid-1;
            }
        //如果arr[mid] 小于目标值 就说明我们它在[mid+1,hi] ,在右边
        }else{
            lo = mid+1;
        }
    }
    return -1;
}

let array =  [1,2,3,4,5,6,7,8,9];
console.log(searchBigFirst(array,5.5))

/**
 * 变体四:查找最后一个小于等于给定值的元素
 *
 * arr = [1,2,3,4,5,6,7,8,9]
 * target 7
 *
 * */

function lastSearch(arr,target){
    let lo = 0;
    let hi = target;
    while (lo <= hi){
        let mid = Math.floor((lo+hi)/2);
        //如果值 小于等于 目标值
        if(arr[mid] <= target){
            if(mid === lo || (arr[mid+1] >target )){
                return mid;
            }else{
                lo = mid+1;
            }
        }else{
            hi = mid-1;
        }
    }
    return -1;
}

let array1 =  [1,2,3,4,5,6,7,8,9];
console.log(lastSearch(array1,1.2))

