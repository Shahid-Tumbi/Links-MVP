import WhiteLine from "@/components/WhiteLine/WhiteLine";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ProfileView from "../../components/SinglePost/SinglePostItem";
import { globalStyles } from "@/theme/GlobalStyles";
import { BackButton, FollowIcon, FollowedIcon } from "@/theme/svg";
import { useTheme } from "@/hooks";
import { ApplicationScreenProps } from "types/navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGetUserWisePostListMutation } from "@/services/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { defaultAvatar, profileAssetUrl, logToCrashlytics, onTokenExpired } from "@/theme/Common";
import { Colors } from "@/theme/Variables";

import {
  useFollowSomeoneMutation,
  useGetFollowerListMutation,
  useUnfollowSomeoneMutation,
  useUserDetailMutation,
} from "@/services/modules/users";
import { Loader } from "@/components";
import { capitalize } from "lodash";
import { FocusedInputContext } from "../HomeFeed/HomeFeed";
import CommentBottomSheet from "@/components/ModalBottomSheet/BottomSheet";


const ProfileDetail = ({ navigation, route }: ApplicationScreenProps) => {
  const { Layout, Fonts, Gutters, darkMode: isDark } = useTheme();
  const [Follow, setFollow] = useState(route?.params?.isFollowed || false);
  const [getUserWisePostList, { isLoading }] = useGetUserWisePostListMutation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const authData = useSelector((state: any) => state.auth.authData);
  const userName = useSelector((state: any) => state.auth.authData.name);
  const token = useSelector((state: any) => state.auth.token);
  const userId = useSelector((state: any) => state.auth.authData._id);
  const [refreshing, setRefreshing] = useState(false);
  const [userPostList, setUserPostList] = useState([]);
  const dispatch = useDispatch();
  const [getFollowerList, { isLoadingFollowers }] =
  useGetFollowerListMutation();
  const [userFollowerList, setUserFollowerList] = useState([]);
  const [userFollowerCount, setUserFollowerCount] = useState(0);
  const [followSomeone, { isLoadingFollow }] = useFollowSomeoneMutation();
  const [unfollowSomeone, { isLoadingUnfollow }] = useUnfollowSomeoneMutation();
  const [UserDetail, { isUserLoading }] = useUserDetailMutation();
  const [isFollowing, setIsFollowing] = useState(false);
  const [bottomsheetData,setBottomsheetData]= useState()
  const [userDetail, setUserDetail] : any= useState();
  const { id } = route?.params;
  const myUserId = useSelector((state: any) => state.auth.authData._id);
  const FollowBody = {
    followerId: myUserId,
    followingId: id,
  };

 
 
  const onSubmit = () => {
    setFollow(!Follow);
  };
  const getUserDetail =  async () => {
    const result: any = await UserDetail({id,token});
    if (result?.data?.statusCode === 200) {
      setRefreshing(false);
      logToCrashlytics("fetching requested user posts");
      setUserDetail(result?.data?.result?.profile)

    } else {
      setRefreshing(false);
      if (result?.error?.data) {
        Alert.alert(result?.error?.data.message);
      }
      if (result?.error?.error) {
        logToCrashlytics(
          "Error fetching user posts. Please try again, or try again later.",
          result?.error?.error
        );
        Alert.alert("Something went wrong!!");
      }
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch);
      }
    }
  }
  useEffect(()=>{
    getUserDetail()
  },[])
  /* get User Wise Post List */
  const getUserWisePostListMethod = async (page: any) => {
    setPage(page);
    const result: any = await getUserWisePostList({
      page,
      limit,
      token,
      userId:id,
    });
    if (result?.data?.statusCode === 200) {
      setRefreshing(false);
      logToCrashlytics("fetching requested user posts");
      if (page === 1) {
        setUserPostList(result?.data?.result?.rows);
      } else {
        setUserPostList((prevState) => [
          ...prevState,
          ...result?.data?.result?.rows,
        ]);
      }
    } else {
      setRefreshing(false);
      if (result?.error?.data) {
        Alert.alert(result?.error?.data.message);
      }
      if (result?.error?.error) {
        logToCrashlytics(
          "Error fetching user posts. Please try again, or try again later.",
          result?.error?.error
        );
        Alert.alert("Something went wrong!!");
      }
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch);
      }
    }
  };

  useEffect(() => {
    getUserWisePostListMethod(1);
  }, []);

  const onComplete = () => {
    if(userPostList.length >= limit){
      getUserWisePostListMethod(page + 1);
    }
  };

  const refreshFunction = () => {
    setRefreshing(true);
    setUserPostList([]);
    setUserFollowerList([]);
    setUserFollowerCount(0);
    getUserWisePostListMethod(1);
    setIsFollowing(false);
  };



  /* Follow user */

  const follow = async () => {
    const result: any = await followSomeone({ body: FollowBody, token });
    if (result?.data?.statusCode === 200) {
      setIsFollowing(true);
      setRefreshing(false);
      getUserDetail()
    } else {
      setRefreshing(false);
      setIsFollowing(false);
      if (result?.error?.data) {
        Alert.alert(result?.error?.data.message);
      }
      if (result?.error?.error) {
        logToCrashlytics("Error! Could not follow user", result?.error?.error);
        Alert.alert("Something went wrong!");
      }
      if (result?.error?.error && result.error.status === 401) {
        onTokenExpired(dispatch);
      }
    }
  };

  /* unfollow a user */

  const unfollow = async () => {
    const result: any = await unfollowSomeone({ body: FollowBody, token });
    if (result?.data?.statusCode === 200) {
      setIsFollowing(false);
      setRefreshing(false);
      getUserDetail()
    } else {
      setRefreshing(false);
      setIsFollowing(false);
      if (result?.error?.data) {
        Alert.alert(result?.error?.data.message);
      }
      if (result?.error?.error) {
        logToCrashlytics(
          "Error! Could not unfollow user",
          result?.error?.error
        );
        Alert.alert("Something went wrong!");
      }
      if (result?.error?.error && result.error.status === 401) {
        onTokenExpired(dispatch);
      }
    }
  };
  const commentBottomSheetRef = useRef(null);
  const focusTextInputInCommentBottomSheet = (data:any) => {    
    if (commentBottomSheetRef?.current?.handleTextInputFocus) {
      commentBottomSheetRef?.current?.handleTextInputFocus(data);
    }
  };
  const ItemSeparator = () => <View style={styles.separator} />;

  const renderProfileDynamic = ({ item, index }: any) => {
    return (
      <FocusedInputContext.Provider value={focusTextInputInCommentBottomSheet}> 
      <ProfileView data={item} number={index + 1} navigation={navigation} />
      </FocusedInputContext.Provider>
    );
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container]}>
      <ScrollView>
        <View style={[globalStyles.screenMargin]}>
      {isUserLoading ? <Loader state={isUserLoading} /> : null}
          <View style={[globalStyles.header]}>
            <BackButton
              style={[Gutters.tinyTMargin]}
              onPress={() => navigation.goBack()}
            />
            {authData?._id !== id ?
            <TouchableOpacity onPress={() => onSubmit()}>
              {Follow ? (
                <FollowedIcon onPress={() => unfollow()} />
                ) : (
                <FollowIcon onPress={() => follow()} />
              )}
              {/*isFollowing ? <FollowIcon> : <FollowedIcon /> */}
            </TouchableOpacity> : null }
          </View>
          <View style={styles.body}>
            <View>
                <Image
                style={styles.avatarContainer}
                source={{uri:userDetail?.profileImage ? `${profileAssetUrl}${userDetail?.profileImage}`  : defaultAvatar}}  
              />
            </View>
            <View style={styles.reference}>
              <Text style={styles.referredBy}>Referred by Nikhil Kamath</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{capitalize(userDetail?.name) || ''}</Text>
            </View>
            {/* <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Credibility Score:</Text>
              <Text style={styles.infoText}>{userDetail?.score || '0000'}</Text>
            </View> */}
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{userDetail?.totalFollowers || '0'}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.verticalLine}></View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{userDetail?.totalLinksUploaded || '0'}</Text>
                <Text style={styles.statLabel}> Links Uploaded</Text>
              </View>
              <View style={styles.verticalLine}></View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>0</Text>
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
            contentContainerStyle={[Gutters.regularBMargin]}
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
            ListEmptyComponent={() =>
              isLoading ? (
                <ActivityIndicator size={25} color={Colors.blue} />
              ) : (
                <Text style={[Fonts.textLarge, Fonts.textWhite]}>
                  No data found{" "}
                </Text>
              )
            }
          />
        </View>
      </ScrollView>
      <CommentBottomSheet ref={commentBottomSheetRef} />        
    </KeyboardAvoidingView>
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
    marginLeft: 4,
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
    color: "white",
    marginBottom: 20,
  },
  separator: {
    height: 20,
    backgroundColor: "transparent",
  },
  verticalLine: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: 1,
    height: "120%",
    marginTop: 30,
  },
});

export default ProfileDetail;
