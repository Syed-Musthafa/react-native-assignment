import { View, Text } from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackRoot from './src/navigation/StackRoot';
import { Provider } from 'react-redux'
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackRoot />
      </NavigationContainer>
    </Provider>
  )
}

export default App