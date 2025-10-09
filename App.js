import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppProvider from './contexts/AppContext';
import Home from './screens/HomeScreen';
import Tasks from './screens/TaskScreen';
import { PaperProvider,MD2LightTheme as lightTheme,MD2DarkTheme as darkTheme } from 'react-native-paper';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
     <PaperProvider theme={lightTheme}>
    <View style={styles.container}>
      <StatusBar style="auto" />
     
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Tasks'>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Tasks" component={Tasks} />
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
    padding: 5
  },
});
