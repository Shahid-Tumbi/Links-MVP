import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Dimensions,  KeyboardAvoidingView,  PermissionsAndroid, Platform, RefreshControl, StyleSheet, Text, View } from "react-native";
import ProfileView from "../../components/SinglePost/SinglePostItem";
import CarouselMain from "@/components/Carousel/CarouselMain";
import { useTheme } from "@/hooks";
import { Logo, NotificationIcon } from "@/theme/svg";
import { globalStyles } from "@/theme/GlobalStyles";
import Welcome from "../Welcome/Welcome";
import { ApplicationScreenProps } from "types/navigation";
import messaging from "@react-native-firebase/messaging";
import { logToCrashlytics, onTokenExpired } from "@/theme/Common";
import { useDispatch, useSelector } from "react-redux";
import { setWelcomeScreen } from "@/store/User";
import { useUpdateUserMutation } from "@/services/modules/users";
import { usePostListMutation } from "@/services/modules/post";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/theme/Variables";
import { FlashList } from "@shopify/flash-list";
import CommentBottomSheet from "@/components/ModalBottomSheet/BottomSheet";
export const FocusedInputContext = React.createContext(null);
const HomeFeed = ({ navigation,route }: ApplicationScreenProps) => {
  const { Layout, Fonts, Gutters, darkMode: isDark } = useTheme();
  const dispatch = useDispatch()  
  const welcomeScreen = useSelector((state:any) => state.auth.welcomeScreen)
  const authData = useSelector((state:any) => state.auth.authData)
  const token = useSelector((state:any) => state.auth.token)
  const [updateUser] = useUpdateUserMutation()
  const [postList, { isLoading }] = usePostListMutation()
  const [page,setPage]= useState(1)
  const [limit,setLimit]= useState(10)
  const [refreshing,setRefreshing]= useState(false)
  const [carouselList,setCarouselList]= useState([])
  const [topfeedList,setTopFeedList]= useState([])
  const [bottomsheetData,setBottomsheetData]= useState()

  const getFCMToken = async () => {
    try {
      const deviceToken = await messaging().getToken();
      updateUser({ id: authData._id, body: {deviceToken} , token })
    } catch (e) {
      console.log(e);
    }
  };
  const checkApplicationPermission = async () => {
    logToCrashlytics('Check Notification permission')

    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error:any) {
        logToCrashlytics('Check Notification permission error',error)
      }
    }
  };
  const getPostList = async (page:any) => { 
    setPage(page)   
    const result:any = await postList({page,limit,token})
    if (result?.data?.statusCode === 200) {
      setRefreshing(false)
      logToCrashlytics('On update profile api success')
      if(page === 1){
        setCarouselList(result?.data?.result?.rows)
      } else {
        setTopFeedList(prevList => [...prevList,...result?.data?.result?.rows])
      }
    } else {
      setRefreshing(false)
      if (result?.error?.data) {
        Alert.alert(result?.error?.data?.message)
      }
      if (result?.error?.error) {
        logToCrashlytics('On update profile api error', result?.error?.error)
        Alert.alert('Something went wrong !!')
      }
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch)
      }
    }
    
  }
  useEffect(()=>{
    checkApplicationPermission()
    getFCMToken()
    getPostList(1)
    getPostList(2)
  },[])
  
  
  const commentBottomSheetRef = useRef(null);

  // Method to trigger text input focus in CommentBottomSheet
  const focusTextInputInCommentBottomSheet = (data:any) => {
    if (commentBottomSheetRef?.current?.handleTextInputFocus) {
      commentBottomSheetRef?.current?.handleTextInputFocus(data);
    }
  };
  const ItemSeparator = () => <View style={styles.separator} />;
  const renderProfile = ({ item,index }:any) => {return (
  <FocusedInputContext.Provider value={focusTextInputInCommentBottomSheet}> 
    <ProfileView data={item} number={index+1} navigation={navigation}/>
  </FocusedInputContext.Provider>)}

  const onPress =() => {
    dispatch(setWelcomeScreen(false))
  }
  const refereshFun = () => {
    setRefreshing(true)
    setTopFeedList([])
    setCarouselList([])
    getPostList(1)
    getPostList(2)
  }
  const onEndreach = () => {
    if(topfeedList.length > limit - 1 ){
      getPostList(page+1)
    }
  }
  const ListHeaderComponent = () => {
    return (
      <>
       { carouselList.length > 0 && <><Text style={styles.textStyle}>OUR TOP 10 LINKS</Text><FocusedInputContext.Provider value={focusTextInputInCommentBottomSheet}>
          <CarouselMain data={carouselList} refreshing={refreshing} />
        </FocusedInputContext.Provider><Text
          style={[
            Fonts.textLarge,
            Fonts.textBold,
            Fonts.textWhite,
            Gutters.smallBMargin,
          ]}
        >
            Your Feed
          </Text></>
      }
      </>
      )
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container]}>
      {welcomeScreen ? <Welcome navigation={navigation} route={route} onPress={onPress} /> : 
      <View style={[globalStyles.screenMargin]}>
        <View style={[Gutters.smallTMargin, Layout.fill]}>
          <View style={[Layout.row, Layout.flex01,Layout.justifyContentBetween]}>
            <Logo />
            <NotificationIcon onPress={()=>navigation.navigate('Notifications')}/>
          </View>
            <View  style={[Layout.flex09]}>
              <FlashList
                data={topfeedList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderProfile}
                ItemSeparatorComponent={ItemSeparator}
                onEndReached={onEndreach}
                estimatedItemSize={50}
                onEndReachedThreshold={0.4}
                refreshing={refreshing}
                onRefresh={()=>refereshFun()}
                nestedScrollEnabled={true}
                ListHeaderComponent={()=><ListHeaderComponent />  }
                ListEmptyComponent={()=>isLoading ? <ActivityIndicator size={25} color={Colors.blue}  />:<Text style={[Fonts.textLarge,Fonts.textWhite]}>No data found </Text>}
                
              />
              </View>
        </View>
      </View> }

    <CommentBottomSheet ref={commentBottomSheetRef} data={bottomsheetData} />        
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  textStyle: {
    marginVertical: 10,
    marginEnd: 40,
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  separator: {
    height: 20,
    backgroundColor: "transparent",
  },
});

export default HomeFeed;
