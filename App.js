import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, Icon } from 'react-native-paper';
import Home from './pages/Home';
import Music from './pages/Music';
import AudioProvider from './contexts/AudioContext';
import DataProvider from './contexts/DataContext';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <DataProvider>
      <AudioProvider>
        <PaperProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#6200ee',
                tabBarInactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen
                name="Home"
                component={Home}
              />
              <Tab.Screen
                name="Music"
                component={Music}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AudioProvider>
    </DataProvider>
  );
}