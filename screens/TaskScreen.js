import { View, Text } from 'react-native';
import { useApp } from '../contexts/AppContext';
import { Modal, FAB, TextInput, Dialog, Button, Portal, RadioButton } from 'react-native-paper';
import { useState } from 'react';
import { FlatList } from 'react-native-web';
import TaskItemCard from '../components/TaskItemCard';
import { DatePickerModal } from 'react-native-paper-dates';
// import { DateTimePicker } from '@react-native-community/datetimepicker';
export default function Tasks({ navigation }) {
    const { styles, data, editTask, addTask, deleteTask, updateTask, updateStatus,reloadSource } = useApp();
    const [visible, setVisible] = useState(false);
    const [dateVisible, setDateVisible] = useState(false);
    const [taskData, setTaskData] = useState({
        title: "", task: "", status: "", endOn: ""
    });
    const toggleModal = () => {
        setVisible((prev) => !prev);
    }
    const toggleDateModal = () => {
        setDateVisible(prev => !prev)
    }
    const addNewTask = () => {
        addTask(taskData);
        setVisible(false);
        setTaskData({});
    }
    const removeTask = (taskID) => {
        deleteTask(taskID);
    }
    const updateTheTask = () => {
        // console.log(taskData);
        updateTask(taskData.id, taskData);
        setVisible(false);
        setTaskData({});
    }
    const editTheTask = (task) => {
        setTaskData(task);
        setVisible(true);
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
                            <TextInput mode='outlined' onChangeText={(text) => setTaskData((prev) => { return { ...prev, title: text } })} value={taskData.title} label="Title" />
                        </View>
                        <View>
                            <TextInput mode='outlined' onChangeText={(text) => setTaskData((prev) => { return { ...prev, task: text } })} value={taskData.task} label="Task" />
                        </View>
                        <View>
                            <Text style={styles.boldText}>Status</Text>
                            <RadioButton.Group style={{ flexDirection: 'row' }} onValueChange={(value) => setTaskData((prev) => { return { ...prev, status: value } })} value={taskData.status}>
                                {taskData?.status!='overdue' &&  
                                <RadioButton.Item label="Pending" value="pending"></RadioButton.Item>}
                                <RadioButton.Item label="Completed" value="completed"></RadioButton.Item>
                                <RadioButton.Item label="Overdue" value="overdue"></RadioButton.Item>
                            </RadioButton.Group>
                        </View>
                        <View>
                            <Button mode='elevated' onPress={toggleDateModal}>Select EndOn</Button>
                            <Text>
                                {taskData?.endOn
                                    ? new Date(taskData.endOn).toLocaleDateString('en-IN', {
                                        weekday: 'short',
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })
                                    : 'No date selected'}
                            </Text>

                            <DatePickerModal
                                visible={dateVisible}
                                mode='single'
                                date={taskData.endOn}
                                onConfirm={({ date }) => {
                                    setTaskData((prev) => {
                                        return { ...prev, endOn: date }
                                    })
                                    toggleDateModal();
                                }}
                            />
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={toggleModal} >Cancel</Button>
                        {taskData?.id ? (<Button onPress={updateTheTask} >Update</Button>) :
                            (<Button onPress={addNewTask} >Add</Button>)
                        }
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
            <FAB style={{left:0,position:'absolute',bottom:5}} onPress={updateStatus} icon="sync" ></FAB>
        </View>
    );
}
