import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import IndexScreen from './screens/IndexScreen'
import ResultsScreen from './screens/ResultsScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={IndexScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Results" component={ResultsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


