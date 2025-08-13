import {useState,useEffect,createContext,useContext } from "react";
const DataContext = createContext();
const staticData = [
  {
    "id": 1734154500001,
    "name": "Linux Shell Scripting",
    "author": "Steve Parker",
    "price": "450",
    "isbn": "9781784396879",
    "tag": "Programming",
    "details": "A complete guide to shell scripting in Linux with practical examples."
  },
  {
    "id": 1734154500002,
    "name": "JavaScript: The Good Parts",
    "author": "Douglas Crockford",
    "price": "399",
    "isbn": "9780596517748",
    "tag": "Web Development",
    "details": "Covers the core, elegant features of JavaScript programming."
  },
  {
    "id": 1734154500003,
    "name": "Clean Code",
    "author": "Robert C. Martin",
    "price": "550",
    "isbn": "9780132350884",
    "tag": "Software Engineering",
    "details": "A handbook of agile software craftsmanship focusing on writing clean, maintainable code."
  },
  {
    "id": 1734154500004,
    "name": "The Pragmatic Programmer",
    "author": "Andrew Hunt, David Thomas",
    "price": "600",
    "isbn": "9780201616224",
    "tag": "Software Development",
    "details": "Tips, strategies, and approaches for becoming a more effective programmer."
  },
  {
    "id": 1734154500005,
    "name": "Python Crash Course",
    "author": "Eric Matthes",
    "price": "480",
    "isbn": "9781593276034",
    "tag": "Programming",
    "details": "A fast-paced introduction to Python programming with hands-on projects."
  }
];


const DataProvider=({children})=>{
    const [data,setData]=useState(staticData);
    const add=(newData)=>{
        setData(prevData=>[...prevData,{id:Date.now(),...newData}]);
    }
    const update=(id,newData)=>{
        setData(prevData=>prevData.map(val=> val.id==id?{...val,...newData}:val ));
    }
    const remove=(id)=>{
        setData(prevData=>prevData.filter(val=>val.id!=id));
    }
    const reloadStaticData=()=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                setData(staticData);
                resolve();
            },2000);
        });
    }
    return(
        <DataContext.Provider value={{data,setData,add,update,remove,reloadStaticData}}>
            {children}
        </DataContext.Provider>
    );
}
const useData=()=>useContext(DataContext);
export default DataProvider;
export {useData};
