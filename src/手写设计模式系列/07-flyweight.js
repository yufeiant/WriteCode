/**
 * 享元模式
 * */

//上传对象
const Upload = function (uploadType){
    this.uploadType = uploadType;
}

Upload.prototype.delFile = function (id){
    uploadManager.setExternalState(id,this);
    //如果文件的大小小于 3000就直接删除
    if(this.fileSize < 3000){
        return this.dom.parentNode.removeChild(this.dom);
    }
    if(window.confirm("确定要删除该文件吗?"+this.fileName)){
        return this.dom.parentNode.removeChild(this.dom)
    }
}

/**
 * 工厂进行对象实例化
 * 定义一个工厂来创建upload对象,如果某种内部状态对应的对象存在就返回,没有就创建
 * @type {{create: (function(*=): *)}}
 */
const UploadFactory = (function (){
    const createFlyWeightObjs = {};
    return {
        //判断是否在缓冲中,如果不在就创建,在就返回
        create:function (uploadType){
            if(!createFlyWeightObjs[uploadType]){
                 createFlyWeightObjs[uploadType] = new Upload(uploadType);
            }
            return createFlyWeightObjs[uploadType];
        }
    }
})()

//管理封装外部状态
const uploadManager = (function (){
    const uploadDatabase = {};
    return {
        add(id,uploadType,fileName,fileSize){
            const flyWeightObj = UploadFactory.create(uploadType);
            const dom = document.createElement('div');
            dom.innerHTML = '<span> 文件名称:'+fileName+',文件大小:'+fileSize+'</span>'+'<button class="delFile">删除</button>'
            dom.querySelector('.delFile').onclick=function (){
                flyWeightObj.delFile(id)
            }
            document.body.appendChild(dom);
            return flyWeightObj
        },
        setExternalState(id,flyWeightObj){
            const uploadData = uploadDatabase[id];
            for(let i in uploadData){
                flyWeightObj[i] = uploadData[i]
            }
        }
    }
})()

//对象池的实现
const objectPoolFactory = function (createObjFn){
    //对象池
    const objectPool = [];
    return {
        create(){
            const obj = objectPool.length === 0 ?
                //创建这一步交给了外面,然后缓冲这一步也交给了外面
                createObjFn.apply(this,arguments) : objectPool.shift();
            return obj;
        },
        recover(obj){
            objectPool.push(obj);
        }
    }
}

const iframeFactory = objectPoolFactory(function (){
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    
    iframe.onload = function (){
        //防止iframe重复加载的 bug
        iframe.onload = null;
        //iframe加载完成之后回收节点
        iframeFactory.recover(iframe);
    }
    return iframe;
})

const ifrmae1 = iframeFactory.create();
ifrmae1.src = "xxxx";

const iframe2 = iframeFactory.create();
iframe2.src  = "xxxx";