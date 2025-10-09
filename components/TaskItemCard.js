import { Card,Button } from "react-native-paper";
import { View,Text } from "react-native";
import { useApp } from "../contexts/AppContext";
export default function TaskItemCard({data,editTask,deleteTask})
{
    const {styles}=useApp();
    return(
    <View style={styles.taskItemCardContainer}>
        <Card>
            <Card.Title title={data.title} subtitle={data.status}>
            </Card.Title>
            <Card.Content>
                <Text>{data.task}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={editTask}>Edit</Button>
                <Button onPress={deleteTask}>Delete</Button>
            </Card.Actions>
        </Card>
    </View>)
}