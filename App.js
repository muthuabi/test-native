import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SinglePageAttendance from './screens/SinglePageAttendance';
import { PaperProvider,MD2DarkTheme as dark,MD2LightTheme as light } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const Stack=createNativeStackNavigator();
  return (
    <PaperProvider theme={light}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Attendance'>
            <Stack.Screen name="Home" component={()=>(<View><Text>Home</Text></View>)} />
            <Stack.Screen name="Attendance" component={SinglePageAttendance} />
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
