import {unstable_batchedUpdates} from 'react-dom';
//store 的核心类 用于状态的分发管理
export default class ReduxHooksStore {
    constructor(reducer,initState) {
        this.name = "__ReduxHooksStore__";
        this.id = 0;
        this.reducer = reducer;
        this.state = initState;
        this.mapConnnects = {};
    }
    
    /***
     * 需要对外传递的接口
     */
    exportStore=()=>{
        return {
            dispatch:this.dispatch,
            subscribe:this.subscribe,
            unSubscribe:this.unSubscribe,
            getInitState:this.getInitState
        }
    }
    //获取初始化state
    getInitState=(mapStoreToState)=>{
        return mapStoreToState(this.state)
    }
    publicRender=()=>{
        unstable_batchedUpdates(()=>{
            Object.keys(this.mapConnnects).forEach(name=>{
                const {update} = this.mapConnnects[name];
                update(this.state)
            })
        })
    }
    //更新state
    dispatch=(action)=>{
        console.log("action",action)
        this.state = this.reducer(this.state,action);
        //触发批量更新
        this.publicRender();
    }
    //注册每个connect
    subscribe=(connectCurrent)=>{
        const connectName = this.name+(++this.id);
        this.mapConnnects[connectName] = connectCurrent;
        return connectName
    }
    //接触绑定
    unSubscribe=(connectName)=>{
        delete this.mapConnnects[connectName]
    }
}