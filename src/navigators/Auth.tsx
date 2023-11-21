import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ForgotPassword, Login, OtpScreen, ResetPassword, Signup } from '@/screens';

const Stack = createStackNavigator();

// @refresh reset
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='OtpScreen' component={OtpScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='ResetPassword' component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
