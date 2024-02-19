import React from 'react';
import ReduxHooksStore from "./ReduxHooksStore";
export {default as useConnect} from "./useConnect";
//用于保存store的context
export const ReduxContext = React.createContext(null);

//用于产生reduxHooks的store
export function useCreateStore(reducer,initState){
     const store = React.useRef(null);
     /** 如果存在--就不需要重新实例化Store**/
     if(!store.current){
         store.current = new ReduxHooksStore(reducer,initState).exportStore();
     }
     return store.current;
}

