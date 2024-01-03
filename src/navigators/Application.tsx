import React, { useEffect } from 'react';
import { Linking, SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Startup } from '../screens';
import { useTheme } from '../hooks';
import MainNavigator from './Main';
import { ApplicationStackParamList } from '../../@types/navigation';
import AuthNavigator from './Auth';
import { useSelector } from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const isVerified = useSelector((state:any) => state.auth.isVerified)

  const navigationRef = useNavigationContainerRef();

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
    if(url.includes('/shared-post')) {
      const id = url.split('id=')[1];
      navigationRef.navigate('PostDetailScreen',{id})
    }   
  };
  useEffect( () => {
    changeNavigationBarColor('#000000');
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
        <StatusBar backgroundColor='#000000' barStyle='light-content'/>
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled:true, gestureDirection:"horizontal", cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}>
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
