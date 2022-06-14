/**
 * 代理模式：
 *
 *  01-虚拟代理实现图片预加载
 * */

//本体
const myImage=(function (){
    const imgNode = document.createElement("img");
    document.body.appendChild(imgNode);
    return {
        setSrc:function (src){
            imgNode.src = src
        }
    }
})()

//代理
const ProxyImg = (function (){
    const img = new Image();
    img.onload=function (){
        myImage.setSrc(this.src);
    }
    return {
        setSrc:function (src){
            //在设置图片的时候先让直接展示图片的element展示加载中的loading
            myImage.src="file://loading.gif";
            //实际上先上代理把图片下载下来，当代理把图片加载好以后，在把这个图片设置给展示的元素
            img.src = src;
        }
    }
})()

/**
 * 场景二：虚拟代理合并HTTP请求
 * */

const  synchronousFile = function (id){
    console.log('开始同步文件：id为'+id)
}

const proxySynchronousFile=(function (){
    let cache = [];//保存一段时间内需要同步的ID
    let timer;
    return function (id){
        cache.push(id);
        //如果定时器存在了，就返回
        if(timer){
            return ;
        }
        timer = setTimeout(function (){
            synchronousFile(cache);
            clearTimeout(timer);
            cache.length = 0;
        },2)
    }
})()

/**
 * 场景三：按需加载JS文件
 * */

const minConsole = (function (){
    const cache = [];
    const handler = function (ev){
        if(ev.keyCode === 113){
            const script = document.createElement('script');
            script.onload = function (){
                cache.forEach(fn=>fn())
            }
            script.src = "minConsole.js";
            document.getElementById('head')[0].appendChild(script);
            document.body.removeEventListener('keydown',handler);
        }
    }
    
    document.body.addEventListener('keydown',handler,false);
    return {
        log:function (...args){
            cache.push(function (){
                return miniConsole.log.apply(minConsole,args);
            })
        }
    }
})()

minConsole.log(1);

miniConsole = {
    log:()=>{
        console.log(Array.prototype.join.call(arguments))
    }
}