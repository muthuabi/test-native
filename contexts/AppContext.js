import { useState, useEffect, useContext, createContext } from 'react';
import { View, StyleSheet } from 'react-native';

const AppContext = createContext();
const staticStyles = StyleSheet.create({
    container:
    {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: "white"
    },
    boldText:
    {
        fontWeight: 'bold',
    },
    heading: {
        fontSize: 'large'
    },
    newTaskFAB:
    {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    taskPageContainer:
    {
        height: '100%',
        padding: 5,
    }
})
/*
    task schema
    {
     id,title,task,status,endTime,createdAt
    }
*/
const staticTasks = [
    {
    id: 1, 
    title: 'RDBMS', 
    task: 'Finish the lab Exp', 
    createdAt: new Date(), 
    endAt: new Date(new Date().getTime() + 60 * 60 * 1000)
},
{
    id: 2, 
    title: 'DSA', 
    task: 'Finish the lab Exp', 
    createdAt: new Date(), 
    endAt: new Date(new Date().getTime() + 60 * 60 * 1000)
},

]
const AppProvider = ({ children }) => {
    const [styles, setStyles] = useState(staticStyles);
    const [source, setSource] = useState([]);
    const [data, setData] = useState(source);
    useEffect(() => {
        setData(data);
    }, [source]);
    return (
        <AppContext.Provider value={{ styles, setStyles }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
export const useApp = () => useContext(AppContext);