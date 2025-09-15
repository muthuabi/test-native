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
                name="Music"
                component={Home}
              // options={{
              //   tabBarIcon: ({ color, size }) => (
              //     <Icon name="home" color={color} size={size} />
              //   ),
              // }}
              />
              <Tab.Screen
                name="Player"
                component={Music}
              // options={{
              //   tabBarIcon: ({ color, size }) => (
              //     <Icon name="camera" color={color} size={size} />
              //   ),
              // }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AudioProvider>
    </DataProvider>
  );
}