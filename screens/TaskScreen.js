import {View,Text} from 'react-native';
import { useApp } from '../contexts/AppContext';
import { Modal,FAB } from 'react-native-paper';
export default function Tasks({navigation})
{
    const {styles}=useApp();
    return(
        <View style={[styles.taskPageContainer]}>
            <Text style={styles.boldText}>Tasks Page</Text>
            <FAB style={styles.newTaskFAB}  icon="plus" ></FAB>
        </View>
    );
}
