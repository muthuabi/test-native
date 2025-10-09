import { useState, useEffect, useContext, createContext } from 'react';
import { View, StyleSheet } from 'react-native';

const AppContext = createContext();
const staticStyles = StyleSheet.create({
    container:
    {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
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
    },
    taskItemCardContainer:
    {
        marginVertical:5
    }
})
/*
    task schema
    {
     id,title,task,status,endOn,createdOn
    }
*/
const staticTasks = [
    {
    id: 1, 
    title: 'RDBMS', 
    task: 'Finish the lab Exp',
    status:'pending', 
    createdOn: new Date(), 
    endOn: new Date(new Date().getTime() + 60 * 60 * 1000)
},
{
    id: 2, 
    title: 'DSA', 
    task: 'Finish the lab Exp',
    status:'pending',
    createdOn: new Date(), 
    endOn: new Date(new Date().getTime() + 60 * 60 * 1000)
},

]
const AppProvider = ({ children }) => {
    const [styles, setStyles] = useState(staticStyles);
    const [source, setSource] = useState(staticTasks);
    const [data, setData] = useState(source);
    const [taskID,setTaskID]=useState(0);
    useEffect(() => {
        setData(source);
    }, [source]);
    
    const reloadSource=()=>{
        setSource(staticTasks);
    }
    const getTaskID=()=>{
        const id=taskID;
        setTaskID(id=>id+1);
        return id;
    }
    const addTask=(taskData)=>{
        const now=new Date();
        const task={
            id:getTaskID(),
            title:taskData.title||"Untitled",
            task:taskData.task||"No Task Defined",
            status:taskData.task||"pending",
            endOn:taskData.endAt|| new Date(now.getTime()+24*60*60*1000),
            createdOn:now
        }
        setSource((src)=>[...src,task]);
    }
    const deleteTask=(taskID)=>{
        setSource((src)=>src.filter((task)=>task.id!==taskID));
    }
    const updateTask=(taskID,taskData)=>
    {
        setSource((src)=>src.map(task=>{
            if(task.id===taskID)
                return {...task,...taskData};
        }))
    }
    return (
        <AppContext.Provider value={{data,source, styles, reloadSource, setStyles,addTask,updateTask,deleteTask}}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
export const useApp = () => useContext(AppContext);