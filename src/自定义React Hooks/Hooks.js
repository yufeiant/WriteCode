import React, {useState} from 'react';
import ReactDom from 'react-dom';
function useXXX(){
    const value = React.useContext(defaultContext)
    /* .....用上下文中 value 一段初始化逻辑  */
    const newValue = initValueFunction(value) /* 初始化 value 得到新的 newValue  */
    /* ...... */
    return newValue
}

//所以我们可以加上缓冲判断.
function useXXX(){
    const newValue =  React.useRef(null)  /* 创建一个 value 保存状态。  */
    const value = React.useContext(defaultContext)
    if(!newValue.current){  /* 如果 newValue 不存在 */
        newValue.current = initValueFunction(value)
    }
    return newValue.current
}

//在考虑自定义hooks的事儿
function useXXX(){
    const value = React.useContext(defaultContext)
    const newValue = React.useMemo(()=> initValueFunction(value) ,[  value  ] )
    return  newValue
}

//闭包效应
function useCloser(){
    const [number,setNumber] = React.useState(1);
    const [age,setState] = React.useState(2);
    //我们没有把number纳入到监控体系里面,
    const value = React.useMemo(()=>{
        console.log(number);
        
    },[age])
    //操作
}