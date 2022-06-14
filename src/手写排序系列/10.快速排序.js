
/**
 * 基础快速排序的实现.
 * 找到一个基准点,把大于它的放在右边,小于它的放在左边.
 * 实际上快速排序就是一个前序遍历,我们在对左子树和右子树递归的前面 对节点进行处理.
 * */
function quickSort(nums){
    sort(nums,0,nums.length-1)
}

function sort(nums,lo,hi){
    if(lo >= hi){
        return ;
    }
    //对nums[lo,..hi]进行切分
    let p = partition(nums,lo,hi);
    sort(nums,lo,p-1);
    sort(nums,p+1,hi);
}

function partition(nums,lo,hi){
    //拿到切分节点
    let pivot = nums[lo];
    //关于区间的边界控制需要格外小心，稍有不慎就会出错。
    //这里把i,j 定义为开区间，同时定义
    //[lo,i) <= pivot; (j,hi] > pivot; 包括边界，但是需要去掉 切分点的标杆值
    //之后都要正确维护这个边界区间的定义
    let i = lo+1;j = hi;
    //当i > j 时结束循环，以保证区间【lo,hi】都被覆盖
    
    //通过双指针的技巧，从两边向中间 来迭代遍历，当分别发现大于和小于标杆的时候就给他们进行交换
    while(i <= j){
        //如果小于高边界，同时 小于标杆值
        while( i < hi && nums[i] <= pivot){
            i++;
            //在结束的时候正好是 nums[i] > pivto
        }
        while(j > lo && nums[j] > pivot){
            j--;
            //此时结束的时候，正好是nums[j] < pivto
        }
        if(i >= j){
            break;
        }
        swap(nums,i,j);
    }
    swap(nums,lo,j);
    return j;
}

function swap(nums,i,j){
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}