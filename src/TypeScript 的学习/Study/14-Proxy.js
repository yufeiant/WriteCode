"use strict";
//Proxy 代理 高级
var A;
(function (A) {
    function proxify(obj) {
        var result = {};
        var _loop_1 = function (key) {
            result[key] = {
                get: function () {
                    console.log('get', key);
                    return obj[key];
                },
                set: function (value) {
                    console.log('set', key, value);
                    obj[key] = value;
                }
            };
        };
        for (var key in obj) {
            _loop_1(key);
        }
        return result;
    }
    var props = {
        name: 'zhufeng',
        age: 10
    };
    var proxyProps = proxify(props);
    console.log(proxyProps);
    console.log(proxyProps.name);
    proxyProps.name = "jiagou";
    console.log(proxyProps.name);
})(A || (A = {}));
