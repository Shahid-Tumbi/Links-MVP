import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, OtpScreen, Signup } from '@/screens';

const Stack = createStackNavigator();

// @refresh reset
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='OtpScreen' component={OtpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
