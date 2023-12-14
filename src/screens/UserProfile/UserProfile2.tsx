import WhiteLine from "@/components/WhiteLine/WhiteLine";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Alert, ActivityIndicator, RefreshControl } from "react-native";
import ProfileView from "../../components/SinglePost/SinglePostItem";
import { globalStyles } from "@/theme/GlobalStyles";
import { BackButton, FollowIcon, FollowedIcon } from "@/theme/svg";
import { useTheme } from "@/hooks";
import { ApplicationScreenProps } from "types/navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGetUserWisePostListMutation } from "@/services/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { logToCrashlytics, onTokenExpired } from "@/theme/Common";
import { Colors } from "@/theme/Variables";
import { useFollowSomeoneMutation, useGetFollowerListMutation, useUnfollowSomeoneMutation } from "@/services/modules/users";


const ProfileDetail = ({ navigation, route }: ApplicationScreenProps) => {
  const {
    Layout,
    Fonts,
    Gutters,
    darkMode: isDark,
  } = useTheme();
  const [Follow,setFollow] = useState(false)
  const profiles = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      avatarUrl: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
      backgroundImageUrl:
        "https://www.istockphoto.com/photo/circuit-board-background-computer-data-technology-artificial-intelligence-gm1435226158-476624682?utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fbackgrounds&utm_medium=affiliate&utm_source=unsplash&utm_term=backgrounds%3A%3A%3A",
      tweets: 1234,
      following: 123,
      followers: 456,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },

    {
      id: 2,
      name: "John Doe",
      username: "johndoe",
      avatarUrl: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
      backgroundImageUrl: "https://via.placeholder.com/500",
      tweets: 1234,
      following: 123,
      followers: 456,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },

    {
      id: 3,
      name: "John Doe",
      username: "johndoe",
      avatarUrl: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
      backgroundImageUrl: "https://via.placeholder.com/500",
      tweets: 1234,
      following: 123,
      followers: 456,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  
  const ItemSeparator = () => <View style={styles.separator} />;
  const renderProfile = ({ item }) => <ProfileView {...item} />;
  const renderProfileDynamic = ({ item,index }:any) => <ProfileView data={item} number={index+1} navigation={navigation}/>;
  const onSubmit = () => { setFollow(!Follow)}
  // const onSubmit = () => {
  //   if(isFollowing) {
  //     unfollow();
  //   } else {
  //     follow();
  //   }
  // }  
  
  
  const[getUserWisePostList, { isLoading }] = useGetUserWisePostListMutation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const authData = useSelector((state:any) => state.auth.authData)
  const userName = useSelector((state:any) => state.auth.authData.name)
  const token = useSelector((state:any) => state.auth.token)
  const userId = useSelector((state:any) => state.auth.authData._id)
  const [refreshing, setRefreshing] = useState(false);
  const [userPostList, setUserPostList] = useState([]);
  const dispatch = useDispatch();
  const [getFollowerList, { isLoadingFollowers }] = useGetFollowerListMutation();
  const  [userFollowerList, setUserFollowerList] = useState([]);
  const  [userFollowerCount, setUserFollowerCount] = useState(0);
  const [followSomeone, { isLoadingFollow }] = useFollowSomeoneMutation();
  const [unfollowSomeone, { isLoadingUnfollow }] = useUnfollowSomeoneMutation();
  const [isFollowing, setIsFollowing] = useState(false);
  const {postData} = route?.params;
  const followUserId = postData?.userId;
  const myUserId = useSelector((state:any) => state.auth.authData._id);
  const FollowBody = {
    followerId: followUserId,
    followingId: myUserId
  }


/* get User Wise Post List */

  const getUserWisePostListMethod = async(page: any) => {

    setPage(page);
    const result: any = await getUserWisePostList({page, limit, token, userId })
    if(result?.data?.statusCode === 200){
      console.log('in if block of getUserWisePostList');
      setRefreshing(false);
      logToCrashlytics('fetching requested user posts');
      if(page === 1) {
        console.log('Fetching user posts');
        console.log(result?.data?.result?.rows);
        setUserPostList(result?.data?.result?.rows);
      
      } else {
        setUserPostList(prevState => [...prevState, ...result?.data?.result?.rows]);
      }
    } else {
      console.log('in else block of getUserWisePostList');
      setRefreshing(false);
      if(result?.error?.data){
        Alert.alert(result?.error?.data.message);
      }
      if(result?.error?.error){
        logToCrashlytics('Error fetching user posts. Please try again, or try again later.', result?.error?.error);
        Alert.alert('Something went wrong!!');
      }
      if(result.error && result.error.status === 401){
        onTokenExpired(dispatch);
      }

    }
  }

  useEffect(() => {
    getUserWisePostListMethod(1)
    getFollowerCountMethod(1);
  }, [])

  

  const onComplete = () => {
    getUserWisePostListMethod(page + 1);
  }

  const refreshFunction = () => {
    setRefreshing(true);
    setUserPostList([]);
    setUserFollowerList([]);
    setUserFollowerCount(0);
    getUserWisePostListMethod(1);
    setIsFollowing(false);
  }

  /* get Follower Count */
  const getFollowerCountMethod = async(page: any) => {
    setPage(page);
    const result: any = await getFollowerList({ userId, token, page, limit })
    if(result?.data?.statusCode == 200){
      setRefreshing(false);
      logToCrashlytics('fetching follower list')
      if(page == 1){
        console.log(result?.data?.result?.count);
        setUserFollowerCount(result?.data?.result?.count);
        setUserFollowerList(result?.data?.result?.rows);
      } else {
        setUserFollowerCount(0);
        setUserFollowerList(prevState => [...prevState, result?.data?.result?.rows]);
      }
    } else {
      setRefreshing(false);
      if(result?.error?.data){
        Alert.alert(result?.error?.data.message);
      }
      if(result?.error?.error){
        logToCrashlytics('Error! Could not get user follower list', result?.error?.error); 
        Alert.alert('Something went wrong!')
      }
      if(result.error && result.error.status === 401){
        onTokenExpired(dispatch);
      }
    }
  }

  /* Follow user */

  const follow = async() => {
    const result: any = await followSomeone({ body: FollowBody, token})
    if(result?.data?.statusCode === 200){
      setIsFollowing(true);
      setRefreshing(false);
      console.log('You have successfully followed this user');
      console.log('result');
    } else {
      setRefreshing(false);
      setIsFollowing(false);
      if(result?.error?.data){
        Alert.alert(result?.error?.data.message);
      }
      if(result?.error?.error){
        logToCrashlytics('Error! Could not follow user', result?.error?.error); 
        Alert.alert('Something went wrong!')
      }
      if(result.error && result.error.status === 401){
        onTokenExpired(dispatch);
      }
    }
  }

  /* unfollow a user */

  const unfollow = async() => {
    const result: any = await unfollowSomeone({ body: FollowBody, token })
    if(result?.data?.statusCode === 200){
      setIsFollowing(false);
      setRefreshing(false);
      console.log('You have successfully unfollowed this user');
      console.log('result');
    } else {
      setRefreshing(false);
      setIsFollowing(false);
      if(result?.error?.data){
        Alert.alert(result?.error?.data.message);
      }
      if(result?.error?.error){
        logToCrashlytics('Error! Could not unfollow user', result?.error?.error); 
        Alert.alert('Something went wrong!')
      }
      if(result.error && result.error.status === 401){
        onTokenExpired(dispatch);
      }
    }
  }



  return (


    <View style={[globalStyles.container]}>
        <ScrollView>
          <View style={[globalStyles.screenMargin]}>
          <View style={[globalStyles.header]}>
            <BackButton style={[Gutters.tinyTMargin]} onPress={() => navigation.goBack()} />
            <TouchableOpacity onPress={()=>onSubmit()}>
            {Follow ? <FollowIcon onPress={() => follow()}/> : <FollowedIcon onPress={() => unfollow()}/> }
            {/*isFollowing ? <FollowIcon> : <FollowedIcon /> */}
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}></Text>
            </View>
            <View style={styles.reference}>
              <Text style={styles.referredBy}>Referred by Nikhil Kamath</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{postData?.user_info?.name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Credibility Score:</Text>
              <Text style={styles.infoText}>1234</Text>
            </View>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{userFollowerCount}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.verticalLine}></View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>123</Text>
                <Text style={styles.statLabel}> Links Uploaded</Text>
              </View>
              <View style={styles.verticalLine}></View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>456</Text>
                <Text style={styles.statLabel}>Discussions Hosted</Text>
              </View>
            </View>
          </View>
          </View>
          <WhiteLine />
          <View style={[globalStyles.screenMargin]}>
          <View style={styles.recentLinksContainer}>
            <Text style={styles.recentLinks}>Recent Links</Text>
          </View>
          <FlatList
            data={userPostList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderProfileDynamic}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onComplete}
            onEndReachedThreshold={0.1}
            nestedScrollEnabled
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshFunction}
              />
            }
            ListEmptyComponent={()=>userPostList.length > 1 ? <ActivityIndicator size={25} color={Colors.blue}  />:<Text style={[Fonts.textLarge,Fonts.textWhite]}>No data found </Text>}

          />
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 89,
    height: 89,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 72,
    fontWeight: "700",
  },
  nameContainer: {
    marginTop: 0,
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "bold",
    marginRight: 5,
  },
  reference: {
    marginTop: 8,
    alignItems: "center",
  },
  referredBy: {
    color: "#999999",
    fontSize: 8,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
  },
  statValue: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  recentLinksContainer: {
    justifyContent: "flex-start",
  },
  recentLinks: {
    fontWeight: "bold",
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  separator: {
    height: 20,
    backgroundColor: 'transparent'
  },
  verticalLine:{
    backgroundColor:'rgba(255, 255, 255, 0.4)',
    width:1,
    height:'120%',
    marginTop:30
  }
});

export default ProfileDetail;
