import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/MainScreen/Home';
import CreatePage from '../screens/MainScreen/CreatePage';
import Splash from '../screens/onBoarding/Splash';


const Stack = createStackNavigator();

const StackRoot = () => {
  return (
    <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="CreatePage" component={CreatePage} />
    </Stack.Navigator>
  )
}

export default StackRoot