import React, { useMemo, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors } from '@/theme/Variables';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { EditProfile, ProfileScreen } from '@/screens';
import ShareLink from '@/screens/ShareLink/ShareLink';
import HomeFeed from '@/screens/HomeFeed/HomeFeed';
import DiscoverCurator from '@/screens/DiscoverCurator/DiscoverCurator';
import PostDetailScreen from '@/screens/PostDetails/PostDetails';
import UserProfile2 from '@/screens/UserProfile/UserProfile2';
import Notifications from '@/screens/Notifications/Notifications';
import DiscoverCuratorPost from '@/screens/DiscoverCurator/DiscoverCuratorPost';
import CommentScreen from '@/screens/CommentScreen/CommentScreen';
import ChangePassword from '@/screens/ChangePassword/ChangePassword';
import { useSelector } from 'react-redux';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// import HomeFeed from '@/screens/HomeFeed/HomeFeed';
// import ShareLink from '@/screens/ShareLink/ShareLink';
// import PostDetails from '@/screens/PostDetails/PostDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function MessageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'black'}}>
      <Text style={{color:'white'}}>MessageScreen!</Text>
    </View>
  );
}
const PostScreenComponent = () => {
  return null
}
const TabNavigator = () => {
  const isCurator = useSelector((state:any) => state.auth.isCurator)
  const color = Colors.lightGray
  const blueColor = Colors.blue
  const size = 25
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  return <KeyboardAvoidingView style={{flex:1}}>
    <Tab.Navigator screenOptions={{
    tabBarStyle:{backgroundColor:Colors.primary,borderTopColor:Colors.primary}}}>
      <Tab.Screen name="HomeScreen" component={HomeFeed} options={{headerShown: false, tabBarShowLabel:false,

        tabBarIcon: ({ focused, size }) => {
           return <Octicons name={ 'home' } color={focused ? blueColor : color} size={size} />
          }}}   />
      <Tab.Screen name="SettingsScreen" component={DiscoverCurator}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <Octicons name={ 'search' } color={focused ? blueColor : color} lineBreakMode='middle' size={size} />
          }}}   />
          {isCurator && <Tab.Screen name="PostScreen" component={PostScreenComponent}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <MaterialCommunityIcons name={ 'plus' } color={focused ? blueColor : color} size={30} />
          }}} listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault(); // Prevent default behavior
              sheetRef.current?.snapToIndex(0)
            },
          })}
          /> }
      {/* <Tab.Screen name="Message" component={MessageScreen}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <MaterialCommunityIcons name={ 'comment-outline' } color={focused ? blueColor : color} size={size} />
          }}} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen}  options={{headerShown: false, tabBarShowLabel:false,tabBarIcon: ({ focused }) => {
           return <MaterialCommunityIcons name={ 'account-circle-outline' } color={focused ? blueColor : color} size={size} />
          }}} />

  </Tab.Navigator>
  <BottomSheet
    ref={sheetRef}
    snapPoints={snapPoints}
    index={-1}
    enablePanDownToClose={true}
    handleIndicatorStyle={{backgroundColor: 'white', borderRadius: 10}}
    backgroundStyle={{ backgroundColor: 'black'}}
    onClose={() => {
      Keyboard.dismiss();
    }}
  >
    <BottomSheetScrollView >
    <ShareLink sheetRef={sheetRef}/>
    </BottomSheetScrollView>
  </BottomSheet>
  </KeyboardAvoidingView>
};

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Tab" component={TabNavigator} />
       <Stack.Screen name="EditProfile" component={EditProfile} />
       <Stack.Screen name="HomeFeed" component={HomeFeed}/>      
       <Stack.Screen name="Notifications" component={Notifications} />      
       <Stack.Screen name="PostDetailScreen" component={PostDetailScreen}/>      
       <Stack.Screen name="DiscoverCuratorPost" component={DiscoverCuratorPost}/>      
       <Stack.Screen name="UserProfile2" component={UserProfile2}/>      
       <Stack.Screen name="CommentScreen" component={CommentScreen}/>      
       <Stack.Screen name="ChangePassword" component={ChangePassword}/>      
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
