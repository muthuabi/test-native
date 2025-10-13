import {View,Text} from 'react-native';
import { Button } from 'react-native-paper';
import { useApp } from '../contexts/AppContext';
export default function Home({navigation})
{
    const {styles}=useApp();
    return(
    <View style={[styles.container,{gap:5}]}>
        <Text style={[styles.heading,styles.boldText]}>Welcome to Student Attendance</Text>
        <Button mode="contained" onPress={navigation.navigate("Attendance")} >Mark Attendance</Button>
    </View>)
}