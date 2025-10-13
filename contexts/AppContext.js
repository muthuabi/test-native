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
    newStudentFAB:
    {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    studentPageContainer:
    {
        height: '100%',
        padding: 5,
    },
    studentItemCardContainer:
    {
        marginVertical: 5
    }
})

const staticStudents = [
    {
        id: 1,
        regno: "24Y001",
        name: "Muthukrishnan M",
        status: "present",
        department: "MCA - Master of Comptuer Applications",
        date: new Date(),
        markedOn: new Date(),
        markedBy: "Teacher"
    },
    {
        id: 2,
        regno: "24Y002",
        name: "Muthukrish M",
        status: "present",
        department: "MCA - Master of Comptuer Applications",
        date: new Date(),
        markedOn: new Date(),
        markedBy: "Teacher"
    },
    {
        id: 3,
        regno: "24Y003",
        name: "Muthukrishnana M",
        status: "present",
        department: "MCA - Master of Comptuer Applications",
        date: new Date(),
        markedOn: new Date(),
        markedBy: "Teacher"
    },
]
const AppProvider = ({ children }) => {
    const [styles, setStyles] = useState(staticStyles);
    const [source, setSource] = useState(staticStudents);
    const [data, setData] = useState(source);
    const [studentID, setStudentID] = useState(3);
    const [stats,setStats]=useState({
        total:source.length,
        presents:source.length,
        absents:0,
        ods:0,
    })
    useEffect(() => {
        setData(source);
    }, [source]);

    const reloadSource = () => {
        setSource(staticStudents);
    }
    const getStudentID = () => {
        const id = studentID;
        setStudentID(id => id + 1);
        return id;
    }
    const updateStatus = (studentID, statusD) => {
        console.log("IN updateStatus:",studentID,statusD);
        setStats((prev)=>{
            if(statusD=='absent')
                return {...prev,absents:prev.absents+1,presents:prev.presents-1}
             return {...prev,absents:prev.absents-1,presents:prev.presents+1}
        });
        setSource((src) => src.map(student => {
            if (student.id == studentID)
                return { ...student, status: statusD }
            return student
        }))
        console.log("end of updateStatus");
    }
    const saveAttendance = () => {
        setSource(data);
    }
    const addStudent = (studentData) => {
        const now = new Date();
        const student = {
            id: getStudentID(),
            name: studentData.name || "Untitled",
            regno: studentData.regno || "XXXX",
            status: studentData.status || "pending",
            date: studentData.date || now,
            createdOn: now
        }
        setSource((src) => [...src, student]);
    }
    const deleteStudent = (studentID) => {
        setSource((src) => src.filter((student) => student.id !== studentID));
    }
    const updateStudent = (studentID, studentData) => {
        setSource((src) => src.map(student => {
            if (student.id === studentID)
                return { ...student, ...studentData };
            return student;
        }))
    }
    return (
        <AppContext.Provider value={{ data,stats, source, styles, setData, setSource, updateStatus, reloadSource, setStyles, addStudent, updateStudent, deleteStudent }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
export const useApp = () => useContext(AppContext);
