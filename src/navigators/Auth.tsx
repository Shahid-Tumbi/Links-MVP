import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { ForgotPassword, GetStartedScreen, Login, OtpScreen, ReferralScreen, ResetPassword, Signup } from '@/screens';

const Stack = createStackNavigator();

// @refresh reset
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled:true, gestureDirection:"horizontal", cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}>
      <Stack.Screen name='GetStartedScreen' component={GetStartedScreen} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='OtpScreen' component={OtpScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='ResetPassword' component={ResetPassword} />
      <Stack.Screen name="ReferralScreen" component={ReferralScreen}/>   
    </Stack.Navigator>
  );
};

export default AuthNavigator;
