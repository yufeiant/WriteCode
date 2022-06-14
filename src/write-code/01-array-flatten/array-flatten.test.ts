/**
 * @description 数组扁平化test
 * @author 飞雨
 * */

import {flatten1,flatten2} from './array-flatten.js'

describe('数组扁平化',()=>{
    it('空数组',()=>{
        const res = flatten1([]);
        expect(res).toEqual([])
    })

    it('非嵌套数组',()=>{
        const arr = [1,2,3];
        const res = flatten1(arr);
        expect(res).toEqual([1,2,3])
    })

    it("一级嵌套",()=>{
        const arr = [1,2,[3]];
        const res = flatten1(arr);
        expect(res).toEqual([1,2,3])
    })

    it('空数组',()=>{
        const res = flatten2([]);
        expect(res).toEqual([])
    })

    it('非嵌套数组',()=>{
        const arr = [1,2,3];
        const res = flatten2(arr);
        expect(res).toEqual([1,2,3])
    })

    it("一级嵌套",()=>{
        const arr = [1,2,[3]];
        const res = flatten2(arr);
        expect(res).toEqual([1,2,3])
    })
})
