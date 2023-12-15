import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,  Alert,  SafeAreaView, SectionList } from 'react-native'
import { UpvoteNotification, TrendingNotification, DiscussionNotification, Logo, FocusedNotificaionIcon } from '@/theme/svg'
import { globalStyles } from '@/theme/GlobalStyles'
import { useTheme } from '@/hooks'
import { useNotificationListMutation } from '@/services/modules/notification'
import { useDispatch, useSelector } from 'react-redux'
import { logToCrashlytics, onTokenExpired } from '@/theme/Common'
import { ActivityIndicator } from 'react-native-paper'
import { Colors, FontSize } from '@/theme/Variables'

const Notifications = () => {
  const {
    Layout,
    Fonts,
    Gutters,
    darkMode: isDark,
  } = useTheme();
  const authData = useSelector((state: any) => state.auth.authData)
  const token = useSelector((state: any) => state.auth.token)
  const dispatch = useDispatch()
  const [getList, { isLoading }] = useNotificationListMutation()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)
  const [notificationList, setNotificationList] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const [empty, setEmpty] = useState(false)
  const getNotifiList = async (page: number) => {
    setPage(page)
    let body = {
      page: page,
      limit: limit,
      toUser: authData?._id
    }
    const result: any = await getList({ data: body, token })
    if (result?.data?.statusCode === 200) {
      setIsRefresh(false);
      logToCrashlytics('On notification list api success');
      
      const notifications = result?.data?.result?.rows || [];
      const categorizedNotifications = categorizeNotifications(notifications);
      
      if (page === 1) {        
        if(notifications.length == 0 ){
          setEmpty(true)
        } else {
        setNotificationList(categorizedNotifications);
        }
      } else {
        const mergedNotifications = [...notificationList];
      
        for (const category of categorizedNotifications) {
          const existingCategoryIndex = mergedNotifications.findIndex(
            (item) => item.title === category.title
          );
      
          if (existingCategoryIndex !== -1) {
            mergedNotifications[existingCategoryIndex].data.push(...category.data);
          } else {
            mergedNotifications.push(category);
          }
        }
        setNotificationList(mergedNotifications);
      } 
    }else {
      setIsRefresh(false)
      if (result?.error?.data) {
        Alert.alert(result?.error?.data?.message)
      }
      if (result?.error?.error) {
        logToCrashlytics('On notification list api error', result?.error?.error)
        Alert.alert('Something went wrong !!')
      }
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch)
      }
    }
  }
  useEffect(() => {
    getNotifiList(1)
  }, [])
  const onEndreach = () => {
    
    getNotifiList(page + 1)
  }
  const categorizeNotifications = (notificationList:any) => {
    const currentTime = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  
    const today: any[] = [];
    const yesterday: any[] = [];
    const past7Days: any[] = [];
  
    for (let i = 0; i < notificationList.length; i++) {
      const notificationTime = new Date(notificationList[i].createdAt).getTime();
      const startOfToday = new Date().setHours(0, 0, 0, 0);
      const startOfYesterday = new Date().setHours(0, 0, 0, 0) - oneDay;
  
      if (notificationTime >= startOfToday && notificationTime <= currentTime) {
        today.push(notificationList[i]);
      } else if (notificationTime >= startOfYesterday && notificationTime < startOfToday) {
        yesterday.push(notificationList[i]);
      } else {
        past7Days.push(notificationList[i]);
      }
    }
  
    return [
      { title: 'Today', data: today },
      { title: 'Yesterday', data: yesterday },
      { title: 'Past 7 Days', data: past7Days }
    ];
  };
  const renderItem = ({ item }) => {
    return ( <View style={styles.container}>
          <View style={[Layout.row]}>
          {item?.notificationType == 2 ?
            <UpvoteNotification /> :
            item?.notificationType == 3 ?
              <DiscussionNotification /> :
              <TrendingNotification />
          }
          <Text style={styles.name}>{item?.content || ''}</Text>
          </View>
          <View style={[Layout.row]}>
            <View style={styles.verticalLine} />
            <View style={styles.content}>
                <View style={styles.text}>
                  <Text style={styles.LowerNotification}>{item?.postData?.title?.trim() || ''}</Text>
                  {/* <Text style={styles.NotificationContent}>{item?._id || ''}</Text> */}
                </View>
            </View>
          </View>
        </View>
    )
  }
  return (
    <View style={styles.root}>
        <View style={[Layout.row, Layout.justifyContentBetween, globalStyles.screenMargin,Gutters.regularTMargin, Layout.flex01]}>
          <Logo />
          <FocusedNotificaionIcon />
        </View>
        <SafeAreaView style={[Layout.flex09]}>
          { empty ? 
          <View style={[Layout.center,Layout.flex09]}>
            <Text style={[Fonts.textLarge,Fonts.textWhite]}>No new notification</Text>
          </View> :
          <SectionList
            sections={notificationList}
            keyExtractor={(item, index) => item + index}
            style={[Layout.fill]}
            renderItem={renderItem}
            onEndReached={({ distanceFromEnd })=>{
                onEndreach()
              }}
            onEndReachedThreshold={0.4}
            onRefresh={() =>{ 
              setIsRefresh(true)
              getNotifiList(1)}}
            refreshing={isRefresh}
            renderSectionHeader={({section: {data,title}}) => (data.length > 0 && <View style={styles.New}>              
              <Text style={styles.NewText}>{title}</Text>
            </View>)}
            ListEmptyComponent={()=>isLoading ? <ActivityIndicator size={25} color={Colors.blue}/> :<Text>No new notification</Text>}
          /> }
        </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex:1,
    height :'100%',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'flex-start',
  },
  text: {
    marginBottom: 5,
  },
  content: {
    flex:0.9,
    marginStart:10
  },
  LowerNotification: {
    fontSize: 12,
    color: "white",
    marginTop: 5,
  },
  name: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginStart:10
  },
  verticalLine: {
    width: 0.5,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginRight: 10,
    marginStart: 35,
  },
  NotificationContent: {
    color: "white",
    fontSize: 10,
    marginTop: 10,
  },
  New: {
    marginLeft: 20,
    marginTop: 20,
  },
  NewText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
});

export default Notifications;
