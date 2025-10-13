import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SinglePageAttendance from './screens/SinglePageAttendance';
import { PaperProvider,MD3DarkTheme as dark,MD3LightTheme as light } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DocumentPickerScreen from './screens/DocumentPickerSample';
const Home=({navigation})=>{
  return(
    (<View><Text>Home</Text></View>)
  );
}
export default function App() {
  const Stack=createNativeStackNavigator();
  return (
    <PaperProvider theme={light}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Document Picker'>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Attendance" component={SinglePageAttendance} />
            <Stack.Screen name="Document Picker" component={DocumentPickerScreen} />
          </Stack.Navigator>
      </NavigationContainer>
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5
  },
});
