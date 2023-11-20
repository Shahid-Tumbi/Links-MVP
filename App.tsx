import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ApplicationNavigator from './src/navigators/Application';
import { persistor, store } from './src/store';
import messaging  from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from "@notifee/react-native";

const App = () => {
  useEffect(()=>{
    messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
      onMessageReceived(remoteMessage)
    });
    
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("onNotificationOpenedApp: ", JSON.stringify(remoteMessage));
    });
    
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            JSON.stringify(remoteMessage)
          );
        }
      });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      // onMessageReceived(remoteMessage)
    });
  })
  const onMessageReceived = async(message:any) => {
    await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        importance: AndroidImportance.HIGH,
    });
    try {
        notifee.displayNotification({...JSON.parse(message.data.notifee),
            title: message.notification.title,
            body: message.notification.body,
            android: {
                channelId: "default",
                // importance: AndroidImportance.HIGH,
                // smallIcon: "ic_launcher",
                color: "#a75531",
                //largeIcon: require('../../assets/images/apple-touch-icon.png'),
                
            },
        });
    } catch (error) {
        console.log('Error notification:',error);
    }
}
  return (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
    </PersistGate>
  </Provider>
);
}
export default App;
