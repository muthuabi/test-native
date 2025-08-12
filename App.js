import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Clock from './components/Clock';
import Timer from './components/Timer';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import {PaperProvider} from 'react-native-paper';
import ThemeProvider from './contexts/ThemeContext';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
    <PaperProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Clock}             
          options={{
              headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="time-outline" size={size} color={color} />
              )
            }} />
          <Tab.Screen name="Timer" component={Timer} 
                      options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="hourglass-outline" size={size} color={color} />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </PaperProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
