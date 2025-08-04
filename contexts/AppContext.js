import React,{useState,createContext, useContext} from 'react';
const AppContext=createContext();
const AppContextProvider=({children})=>{
    const [username,setUsername]=useState(null);
    return (
        <AppContext.Provider value={{username,setUsername}}>
            {children}
        </AppContext.Provider>
    )
};
const useAppContext=()=>useContext(AppContext);
export {useAppContext};
export default AppContextProvider;