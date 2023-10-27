import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '@/theme/Variables';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CreatePost, News } from '@/theme/svg';
import { clearToken, setAuthData, verifiedUser } from '@/store/User';
import { useDispatch } from 'react-redux';

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
function ProfileScreen() {
  const dispatch = useDispatch()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'black' }}>
      <Text style={{color:'white'}}> ProfileScreen!</Text>
      <Button title='Logout' onPress={()=>{
        dispatch(clearToken())
        dispatch(verifiedUser(false))
        dispatch(setAuthData({}))
      }}></Button>
    </View>
  );
}
function CreatePostButton(){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'black' }}>
      <Text style={{color:'white'}}> CreatePost!</Text>
    </View>
  )
}
const TabNavigator = () => {
  const color = Colors.lightGray
  const size = 22
  return <Tab.Navigator screenOptions={{
    tabBarStyle:{backgroundColor:Colors.primary,borderTopColor:Colors.primary}}}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false, tabBarShowLabel:false,
        tabBarIcon: ({ focused, size }) => {
           return <MaterialCommunityIcons name={ focused ? 'home-variant'  : 'home-variant-outline'} color={color} size={size} />
          }}}   />
      <Tab.Screen name="Settings" component={SettingsScreen}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <News fill={focused ? color : ''} stroke={focused ? Colors.primary : ''}/>
          }}} />
      <Tab.Screen name='CreateButton' component={CreatePostButton} options={{headerShown: false, tabBarShowLabel:false,tabBarIcon:({ focused })=>{
        return <CreatePost  style={styles.createPostButton}/>
      }}}/>
      <Tab.Screen name="Message" component={MessageScreen}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <MaterialCommunityIcons name={ focused ? 'message'  : 'message-outline'} color={color} size={size} />
          }}} />
      <Tab.Screen name="Profile" component={ProfileScreen}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <MaterialCommunityIcons name={ focused ? 'account-circle'  : 'account-circle-outline'} color={color} size={size} />
          }}} />

  </Tab.Navigator>;
};

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Tab" component={TabNavigator} />
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
