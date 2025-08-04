import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeaderBackButton} from '@react-navigation/stack'
import LandingScreen from './pages/LandingScreen';
import HomeScreen from './pages/HomeScreen';
import Login from './components/Login';
import AppContextProvider from './contexts/AppContext';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppContextProvider>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen 
            name="Landing" 
            component={LandingScreen} 
            options={{headerShown:false}}
            // options={{ headerShown: false,headerLeft:(props)=>(
            //   <HeaderBackButton {...props} onPress={()=>{}} />
            // ) }} 
          />
          <Stack.Screen 
            name="Login"
            component={Login}
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Products Feedback' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </AppContextProvider>
  );
}