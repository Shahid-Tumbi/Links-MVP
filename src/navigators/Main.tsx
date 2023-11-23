import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors } from '@/theme/Variables';
import { StyleSheet, Text, View } from 'react-native';
import { EditProfile, ProfileScreen } from '@/screens';
import CommentList, { CommentScreen } from '@/screens/CommentScreen/CommentScreen';
import ShareLink from '@/screens/ShareLink/ShareLink';
import HomeFeed from '@/screens/HomeFeed/HomeFeed';
import SinglePostItem from '@/components/SinglePost/SinglePostItem';
import DiscoverCurator from '@/screens/DiscoverCurator/DiscoverCurator';
import SingleCurator from '@/components/SingleCurator/SingleCurator';
import Notifications from '@/screens/Notifications/Notifications';

import PostDetailScreen from '@/screens/PostDetails/PostDetails';
import CarouselMain from '@/components/Carousel/CarouselMain';
import ShareLinkComment from '@/screens/ShareLink/ShareLinkComment';
import BS from '@/components/ModalBottomSheet/BS';
import CommentItem from '@/components/CommentItem/CommentItem';
import SearchBarComponent from '@/components/SearchBar/SearchBar';
import CommentInput from '@/screens/ShareLink/test';
import test2 from '@/screens/ShareLink/test2';
import UserProfile2 from '@/screens/UserProfile/UserProfile2';
import NotificationsTwo from '@/screens/Notifications/NotificationsTwo';

// import HomeFeed from '@/screens/HomeFeed/HomeFeed';
// import ShareLink from '@/screens/ShareLink/ShareLink';
// import PostDetails from '@/screens/PostDetails/PostDetails';

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
      <Tab.Screen name="HomeScreen" component={HomeFeed} options={{headerShown: false, tabBarShowLabel:false,
        tabBarIcon: ({ focused, size }) => {
           return <Octicons name={ 'home' } color={focused ? blueColor : color} size={size} />
          }}}   />
      <Tab.Screen name="SettingsScreen" component={DiscoverCurator}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <Octicons name={ 'search' } color={focused ? blueColor : color} lineBreakMode='middle' size={size} />
          }}}   />
      <Tab.Screen name="Message" component={HomeFeed}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
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
