import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors } from '@/theme/Variables';
import { StyleSheet, Text, View } from 'react-native';
import { EditProfile, ProfileScreen } from '@/screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'black'}}>
      <Text style={{color:'white'}}>HomeScreen!</Text>
    </View>
  );
}
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'black'}}>
      <Text style={{color:'white'}}>Settings!</Text>
    </View>
  );
}
function MessageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'black'}}>
      <Text style={{color:'white'}}>MessageScreen!</Text>
    </View>
  );
}
const TabNavigator = () => {
  const color = Colors.lightGray
  const blueColor = Colors.blue
  const size = 25
  return <Tab.Navigator screenOptions={{
    tabBarStyle:{backgroundColor:Colors.primary,borderTopColor:Colors.primary}}}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false, tabBarShowLabel:false,
        tabBarIcon: ({ focused, size }) => {
           return <Octicons name={ 'home' } color={focused ? blueColor : color} size={size} />
          }}}   />
      <Tab.Screen name="Settings" component={SettingsScreen}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <Octicons name={ 'search' } color={focused ? blueColor : color} lineBreakMode='middle' size={size} />
          }}}   />
      <Tab.Screen name="Message" component={MessageScreen}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <MaterialCommunityIcons name={ 'comment-outline' } color={focused ? blueColor : color} size={size} />
          }}} />
      <Tab.Screen name="Profile" component={ProfileScreen}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <MaterialCommunityIcons name={ 'account-circle-outline' } color={focused ? blueColor : color} size={size} />
          }}} />

  </Tab.Navigator>;
};

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Tab" component={TabNavigator} />
       <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  createPostButton:{
    position: 'absolute',
    bottom: 20,
    borderRadius: 50, 
    padding: 24,
    backgroundColor:'black'
  }
})
export default MainNavigator;