import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {View,StyleSheet,Text,FlatList,Alert,Platform,ScrollView} from 'react-native';
import { Button,Card,Switch } from 'react-native-paper';

const KEY='DATA';
const staticData = [
    {
        id: 1,
        name: "Muthukrishnan M",
        regno: "24Y008",
        department:"MCA - Department of Comptuter Applications",
        status: "present",
        markedOn: new Date(),
        createdOn: new Date()
    },
    {
        id: 2,
        name: "Priya S",
        regno: "24Y009",
        department:"MCA - Department of Comptuter Applications",
        status: "present",
        markedOn: new Date(),
        createdOn: new Date()
    },
    {
        id: 3,
        name: "Arjun K",
        regno: "24Y010",
        department:"MCA - Department of Comptuter Applications",
        status: "present",
        markedOn: new Date(),
        createdOn: new Date()
    },
    {
        id: 4,
        name: "Nisha R",
        regno: "24Y011",
        department:"MCA - Department of Comptuter Applications",
        status: "present",
        markedOn: new Date(),
        createdOn: new Date()
    },
    {
        id: 5,
        name: "Vikram L",
        regno: "24Y012",
        department:"MCA - Department of Comptuter Applications",
        status: "present",
        markedOn: new Date(),
        createdOn: new Date()
    },
        {
        id: 6,
        name: "Vikram L",
        regno: "24Y012",
        department:"MCA - Department of Comptuter Applications",
        status: "present",
        markedOn: new Date(),
        createdOn: new Date()
    }
];

const setStaticStorage=async()=>
{
    await AsyncStorage.setItem(KEY,JSON.stringify(staticData))
}
const getStorage=async()=>{
    var strData=await AsyncStorage.getItem(KEY);
    if(!strData || strData=='[]')
    {
        setStaticStorage();
        strData=await AsyncStorage.getItem(KEY);
    }
    return JSON.parse(strData);
    
}
const setStorage=async(data)=>{
    const strData=JSON.stringify(data);
    await AsyncStorage.setItem(KEY,strData);
}
const deleteStorage=async()=>{
    await AsyncStorage.removeItem(KEY);
}
const ListItemCard=({student,onMarkAttendance})=>{
    
    return(
        <View style={{marginVertical:5}}>
        <Card style={[student.status=='absent' && {backgroundColor:'#FFCCCC'}]}>
            <Card.Title title={student.name} subtitle={student.regno}/>
            <Card.Content>
                <Text>{student.department}</Text>
                <Text style={styles.boldText}>{student.status}</Text>
            </Card.Content>
            <Card.Actions>
                    <Switch value={student.status=='present'} onValueChange={onMarkAttendance}></Switch>
            </Card.Actions>
        </Card>
        </View>
    );
}
export default function SinglePageAttendance({navigation})
{
    const [data,setData]=useState([]);
    const [stats,setStats]=useState({total:0,present:0,absent:0});
    const fetchAsync=async()=>
    {
            const storedData=await getStorage();
            setData(storedData);
    }
    const updateStatus=(studentId,status)=>
    {
        const value=status?"present":"absent";
        if(value=='present')
            setStats((stat)=>{return {...stat,present:stat.present+1,absent:stat.absent-1}});
        else  
            setStats((stat)=>{return {...stat,present:stat.present-1,absent:stat.absent+1}});

        setData((dt)=>dt.map((val)=>{
            if(val.id==studentId)
                return {...val,status:value};
            return val;
        }));

    }
    const updateStats=()=>{
        let present=0,absent=0;
        data.map(item=>{
            if(item.status=='present')
                present++;
            else    
                absent++;
        })
        setStats({total:data.length,present:present,absent:absent});
    }
    const purgeStorage=()=>{
        setData([]);
        deleteStorage();
    }
    useEffect(()=>{
        updateStats();
    },[data])
    useEffect(()=>{
        fetchAsync();
    },[]);
    
    const saveAttendance=()=>{
        if(Platform.OS=='web')
        {
            setStorage(data);
            alert("Attendance Saved");
            return;
        }
        Alert.alert(
            "Attendance",
            "Are you sure to Save?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", onPress: () => { setStorage(data).then(() => Alert.alert("Attendance","Attendance Saved")); } }
            ],
            { cancelable: false }
        );
    }
    const onMarkAttendance=(val,studentId)=>{
        updateStatus(studentId,val);
    }
    return(
    <View style={styles.container}>
        <View style={styles.topInfoSection}>
            <View style={{flexDirection:'row',gap:5}}>
                <Text style={styles.boldText}>Present - {stats.present}</Text>
                <Text style={styles.boldText}>Absentees - {stats.absent}</Text>
            </View>
            <View style={{flexDirection:'row',gap:3}}>
            <Button mode="contained" onPress={saveAttendance} >Save</Button>
             <Button mode="contained" onPress={purgeStorage} >Purge</Button>
             </View>
        </View>
        {/* <ScrollView> */}
        {/* Don't know why Flatlist is not scrolling */}
        <FlatList 
            data={data}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(<ListItemCard student={item} onMarkAttendance={(val)=>onMarkAttendance(val,item.id)} />)}
            ListEmptyComponent={()=>(<View style={{marginTop:25,gap:10,flexDirection:'column',justifyContent:'center',alignItems:'center'}}><Text style={styles.boldText}>Oops! No Data Found</Text><Button mode="outlined" onPress={fetchAsync}>Load Data</Button></View>)}
        />
        {/* </ScrollView> */}
    </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:5,
        height:'90%'
    },
    boldText:
    {
        fontWeight:'bold',
    },
    topInfoSection:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
});