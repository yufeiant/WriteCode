/**
 * 17.使用Promise 实际上就是 返回一个Promise, 在失败的时候调用reject,
 * 在成功的时候调用resolve
 * */
function getJSON(url){
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        //新建一个http请求
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function (){
            if (this.readyState !== 4) return;
            // 当请求成功或失败时，改变 promise 的状态
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        xhr.onerror = function (){
            reject(new Error(this.statusText));
        };
        // 设置响应的数据类型
        xhr.responseType = "json";
        // 设置请求头信息
        xhr.setRequestHeader("Accept", "application/json");
        // 发送 http 请求
        xhr.send(null);
    })
}