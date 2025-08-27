import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PaperProvider } from 'react-native-paper';
import ThemeProvider from './contexts/ThemeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Books from './pages/Books';
import Home from './pages/Home';
import DataProvider from './contexts/DataContext';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <DataProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar />
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name="Home" component={Home}
                options={{
                  headerShown:false,
                }}
              />
              <Stack.Screen name="Books" component={Books}
                options={{
                  // headerShown: false,

                  // tabBarIcon: ({ color, size }) => (
                  //   <Ionicons name="time-outline" size={size} color={color} />
                  // )

                }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
        </DataProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
