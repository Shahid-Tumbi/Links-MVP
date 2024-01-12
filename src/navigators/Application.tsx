import React, { useEffect } from 'react';
import { Linking, Platform, SafeAreaView, StatusBar,useColorScheme } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { Colors } from '@/theme/Variables';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { setSharedLink, setSheetOpen } from '@/store/User';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const isVerified = useSelector((state:any) => state.auth.isVerified)
  const isCurator = useSelector((state:any) => state.auth.isCurator)
  const dispatch = useDispatch()
  const navigationRef = useNavigationContainerRef();
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark'; 
  const linking = {
    prefixes: [
      'wtfnewsapp://',
      'https://dev-api.wtfnewsapp.com/'
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
  const setStatusBarStyle = () => {
    if (Platform.OS === 'ios') {
      if (isDarkTheme) {
        StatusBar.setBarStyle('light-content');
      } else {
        StatusBar.setBarStyle('light-content');
      }
    } else if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#000000'); // Change the status bar color for dark theme
        StatusBar.setBarStyle('light-content');
    }
  };
  useEffect(()=>{
    ReceiveSharingIntent.getReceivedFiles((files: any[]) => {
      let weblinks = files.map(obj => obj.weblink);
      if(weblinks[0] && isCurator && isVerified){
        dispatch(setSharedLink(weblinks[0]))
        dispatch(setSheetOpen(true))
      }
    }, 
    (error) =>{
      console.log(error);
    }, 
    'wtfnewsapp'
    );
    return () =>{   
      ReceiveSharingIntent.clearReceivedFiles() 
    }
  },[])
  useEffect(() => {
    setStatusBarStyle(); // Set the initial status bar style
  }, [isDarkTheme]); // Re-run when the theme changes
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
    <SafeAreaView style={[Layout.fill, { backgroundColor: Colors.primary }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef} linking={linking}>
        <StatusBar backgroundColor='#000000' />
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
