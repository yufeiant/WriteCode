import React,{useState,useMemo,useCallback,useEffect,useRef,useContext} from 'react';
import ReactDom from "react-dom";
/**
 * 自动上报pv/click的埋点hooks—— useLog
 * 需求:
 * 1.点击click 完成上报卖点
 * 2.当context中的数据有发生变化的时候 需要及时的更新上报卖点的参数
 * */
//用于通知context
export const LogContext = React.createContext({})

export default function useLog(){
    /* 一些公共参数 */
    const message = useContext(LogContext);
    const listenDOM = useRef(null);
    //上报函数关心的是message ,用于接触闭包陷阱
    const reportMessage = useCallback((data,type)=>{
        if(type==='pv'){ // pv 上报
            console.log('组件 pv 上报',message)
        }else if(type === 'click'){  // 点击上报
            console.log('组件 click 上报',message,data)
        }
    },[message]);
    
    useEffect(()=>{
        //上报的点击
        const handleClick = function (e){
            reportMessage(e.target,'click')
        }
        //判断ref是否存在 如果存在就添加点击事件
        if(listenDOM.current){
            listenDOM.current.addEventListener('click',handleClick)
        }
        return ()=>{
            listenDOM.current && listenDOM.current.removeEventListener('click',handleClick)
        }
    
    },[reportMessage])
    return [listenDOM,]
}