import { StyleSheet,Text,View } from "react-native";
import { Button } from "react-native-paper";
import { useApp } from "../contexts/AppContext";
export default function Home({navigation})
{
    const {styles}=useApp();
    return(
        <View style={styles.container}>
            <Text style={[styles.boldText,styles.heading]}>Welcome To the To Do List Application </Text>
            <Button mode="contained" onPress={()=>navigation.navigate("Tasks")} >Get Started</Button>
        </View>
    )
}
