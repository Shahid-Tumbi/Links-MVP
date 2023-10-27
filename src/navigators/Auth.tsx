import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GetStartedScreen } from '../screens';

const Stack = createStackNavigator();

// @refresh reset
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='StartScreen' component={GetStartedScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
