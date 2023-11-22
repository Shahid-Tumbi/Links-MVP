import React, { useEffect } from 'react';
import { Linking, SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Startup } from '../screens';
import { useTheme } from '../hooks';
import MainNavigator from './Main';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from '../../@types/navigation';
import AuthNavigator from './Auth';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const isVerified = useSelector((state:any) => state.auth.isVerified)

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);
  const linking = {
    prefixes: [
      'wtfnewsapp://',
      'https://dev-api.wtfnewsapp.com/v1/users/'
    ],
    config: {
      screens: {
        ResetPassword: {
          path: 'reset-password',
          screens:{

          }
        }
      },
    },
  };
  const handleDeepLink = ({ url }:any) => {
    if (url.includes('/reset-password')) {
      const tokenIndex = url.indexOf('token=');
      const token = url.substring(tokenIndex + 6);
      if(!token){
        console.log('Token not found');        
      }   
      navigationRef.navigate('ResetPassword',{token})
    }    
  };
  useEffect( () => {
    Linking.getInitialURL().then((url) => {
      if(url) handleDeepLink({url});
    });
    Linking.addEventListener('url', handleDeepLink);
    return () => {
      Linking.removeAllListeners('url');
    };
  },[])

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef} linking={linking}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Startup" component={Startup} /> */}
          { !isVerified ?  
            <Stack.Screen name="Auth" component={AuthNavigator} /> : 
          <Stack.Screen name="Main" component={MainNavigator} />  }
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
