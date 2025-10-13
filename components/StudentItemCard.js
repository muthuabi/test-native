import {Card,Switch} from 'react-native-paper';
import {View,Text} from 'react-native';
import { useApp } from '../contexts/AppContext';
export default function StudentItemCard({studentData,markAttendance})
{
    const {styles}=useApp();
    return(
    <View style={{marginVertical:10}}>
        <Card>
            <Card.Title title={studentData.regno} subtitle={studentData.name}>
            </Card.Title>
            <Card.Content>
                <Text style={styles.boldText}>{studentData.department}</Text>
                <Text style={styles.boldText}>{studentData.status}</Text>
            </Card.Content>
            <Card.Actions>
                <Switch value={studentData.status=='present'} onValueChange={markAttendance}/>
            </Card.Actions>
        </Card>
    </View>
    );
}
