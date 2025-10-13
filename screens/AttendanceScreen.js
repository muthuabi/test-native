import {View,Text,Alert, Platform} from 'react-native';
import {useState,useEffect} from 'react';
import {Button,Card,Dialog} from 'react-native-paper';
import { useApp } from '../contexts/AppContext';
import { FlatList } from 'react-native';
import StudentItemCard from '../components/StudentItemCard';
export default function Attendance({navigation})
{
    const {styles,updateStatus,data,stats}=useApp();
//     const [absentCount,setAbsentCount]=useState(0);
    const updateAttendance=(val,studentId)=>{
//         console.log(val,studentId);
        const status=val?"present":"absent";
        updateStatus(studentId,status);
//         if(Platform.OS=="web")
//                 alert("Marked Attendance")
//         else
//         Alert.alert("Save Attendance");
    }
    const saveAttendance=()=>  {
      if(Platform.OS=="web")
                 alert("Attendance Saved")
      else
         Alert.alert("Attendance","Attendance Saved");
    }

    return(
        <View style={styles.studentPageContainer}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={{flexDirection:'row',gap:5}}>
                <Text style={styles.boldText}>Absentees - {stats.absents}</Text>
                <Text style={styles.boldText}>Presents - {stats.presents}</Text>
            </View>
                <Button mode="contained" onPress={saveAttendance} >Save</Button>
            </View>
            <FlatList  
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=><StudentItemCard studentData={item} markAttendance={(val)=>updateAttendance(val,item.id) }
                />}

            />
        </View>
    );
}
