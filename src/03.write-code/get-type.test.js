
import getType from './get-type.js'

describe(()=>{
    it('should string', function () {
        expect(getType('abc')).toBe('string')
    });
})