import { View, Text } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { Modal, FAB, TextInput, Dialog, Button, Portal,RadioButton } from 'react-native-paper';
import { useState } from 'react';
import { FlatList } from 'react-native-web';
import TaskItemCard from '../components/TaskItemCard';
import { DateTimePicker } from '@react-native-community/datetimepicker';
export default function Tasks({ navigation }) {
    const { styles, data, editTask, addTask, deleteTask, updateTask, reloadSource } = useApp();
    const [visible, setVisible] = useState(false);
    const [taskData, setTaskData] = useState({
        title: "", task: "", status: "", endOn: ""
    });
    const toggleModal = () => {
        setVisible((prev) => !prev);
    }
    const addNewTask = () => {

    }
    const removeTask = (taskID) => {
        deleteTask(taskID);
    }
    const editTheTask = (task) => {

    }
    return (
        <View style={[styles.taskPageContainer]}>
            <Portal>
            <Dialog visible={visible} >
                <Dialog.Title>
                    <Text>Task Form</Text>
                </Dialog.Title>
                <Dialog.Content>
                <View>
                    <TextInput mode='outlined' onChangeText={(text)=>setTaskData((prev)=>{return {...prev,title:text} }) } value={taskData.title} label="Title" />
                </View>
                <View>
                    <TextInput mode='outlined' onChangeText={(text)=>setTaskData((prev)=>{return {...prev,task:text} }) } value={taskData.task} label="Task" />
                </View>
                <View>
                    <Text style={styles.boldText}>Status</Text>
                    <RadioButton.Group  style={{flexDirection:'row'}} onValueChange={(value)=>setTaskData((prev)=>{return {...prev,status:value}})} value={taskData.status}>
                        <RadioButton.Item label="Pending" value="pending"></RadioButton.Item>
                        <RadioButton.Item label="Completed" value="completed"></RadioButton.Item>
                        <RadioButton.Item label="Overdue" value="overdue"></RadioButton.Item>
                    </RadioButton.Group>
                </View>
                <View>
                </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={toggleModal} >Cancel</Button>
                    <Button onPress={addNewTask} >Add</Button>
                </Dialog.Actions>
            </Dialog>
            </Portal>
            {/* <Text style={styles.boldText}>Tasks Page</Text> */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={
                    ({ item }) => <TaskItemCard
                        data={item}
                        editTask={() => { editTheTask(item) }}
                        deleteTask={() => removeTask(item.id)}
                    />}
                ListEmptyComponent={<View style={{ alignItems: 'center' }}><Text style={styles.boldText}>No Tasks Found</Text></View>}
            />
            <FAB style={styles.newTaskFAB} onPress={toggleModal} icon="plus" ></FAB>
        </View>
    );
}
