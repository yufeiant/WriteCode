import React from 'react';

import {ReduxContext} from './useCreateStore';
export default function useConnect(mapStoreToState=()=>{}){
    /** 获取Store内部的重要函数*/
    const contextValue = React.useContext(ReduxContext);
    const { getInitState , subscribe ,unSubscribe , dispatch } = contextValue
    /** 用于传递给业务组件的state*/
    const stateValue = React.useRef(getInitState(mapStoreToState))
    /** 渲染函数 */
    const [,forceUpdate] = React.useState();
    /** 产生 */
    const connectValue = React.useMemo(()=>{
        const state = {
            /** 用于比较一次dispatch中,新的state和之前的state是否发生了变化 */
            cacheState:stateValue.current,
            /** 更新函数 */
            update:function (newState){
                /** 获取订阅的 state */
                const selectState = mapStoreToState(newState);
                /** 浅比较state 是否发生变化,如果发生变化*/
                const isEqual = shallowEqual(state.cacheState,selectState);
                state.cacheState = selectState;
                stateValue.current = selectState;
                if(!isEqual){
                    forceUpdate({})
                }
            }
        }
        return state;
    },[contextValue])
    React.useEffect(()=>{
        /** 组件挂载--注册connect */
        const name = subscribe(connectValue);
        //解绑 connect
        return function (){
            unSubscribe(name);
        }
    },[connectValue])
    return [stateValue.current,dispatch];
}
function shallowEqual(objA, objB) {
    if (Object.is(objA, objB)) {
        return true;
    }
    if (
        typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null
    ) {
        return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (let i = 0; i < keysA.length; i++) {
        if (
            !hasOwnProperty.call(objB, keysA[i]) ||
            !Object.is(objA[keysA[i]], objB[keysA[i]])
        ) {
            return false;
        }
    }
    return true;
}
