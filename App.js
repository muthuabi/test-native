import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider,MD3LightTheme as light,MD3DarkTheme as dark } from 'react-native-paper';
import AppProvider from './contexts/AppContext';
import Home from './screens/HomeScreen';
import Attendance from './screens/AttendanceScreen';
export default function App() {
  const Stack=createNativeStackNavigator();
  return (
    <PaperProvider theme={light}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Attendance'>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Attendance" component={Attendance}/>
        </Stack.Navigator>
      </NavigationContainer>
      </AppProvider>
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
