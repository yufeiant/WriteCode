/***
 * LRU算法:
 * 使用链表来实现 LRU算法会非常方便,这样 不需要考虑元素移动的问题
 * 1.假如我们只能存储 6 个元素的东西
 * 2.
 *
 */
/**
 思考：LRU
 * @param {number} capacity
 */
class LRUCache {
    constructor(capacity) {
        this.secretKey = new Map();
        this.capacity = capacity;
    }
    get(key) {
        if (this.secretKey.has(key)) {
            let tempValue = this.secretKey.get(key);
            this.secretKey.delete(key);
            this.secretKey.set(key, tempValue);
            return tempValue;
        } else return -1;
    }
    put(key, value) {
        // key存在，仅修改值
        if (this.secretKey.has(key)) {
            this.secretKey.delete(key);
            this.secretKey.set(key, value);
        }
        // key不存在，cache未满
        else if (this.secretKey.size < this.capacity) {
            this.secretKey.set(key, value);
        }
        // 添加新key，删除旧key
        else {
            this.secretKey.set(key, value);
            // 删除map的第一个元素，即为最长未使用的
            this.secretKey.delete(this.secretKey.keys().next().value);
        }
    }
}