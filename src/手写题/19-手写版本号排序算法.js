/**
 * 19--版本号排序算法
 * 题目描述:
 * 有一组版本号如下
 * ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。
 * 现在对其进行排序,排序的结果为:
 * ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']
 * */

/***
 * 关键点是寻找差异值进行对比
 * 先找第一位,如果第一位不相同 就使用第一位的值
 * 如果第一位相同,就继续向下查找,continue 寻找不一样的值
 * 如果有一个值为undefined 那就用它们的长度来计算
 * @type {string[]}
 */
const arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];

arr.sort((a, b) => {
    let i = 0;
    const arr1 = a.split(".");
    const arr2 = b.split(".");
    while (true) {
        const s1 = arr1[i];
        const s2 = arr2[i];
        i++;
        if (s1 === undefined || s2 === undefined) {
            return arr2.length - arr1.length;
        }
        if (s1 === s2) continue;
        return s2 - s1;
    }
});
console.log(arr);
