
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
  Share,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DownvoteButton,
  Menu as MenuIcon,
  ShareButton,
  UpvoteButton,
} from "@/theme/svg";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/theme/Variables";
import { Constants } from "@/theme/Constants";
import { SheetManager } from "react-native-actions-sheet";
import { capitalize, debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import { useDeletePostMutation, useDislikePostMutation, useGetUserWisePostListMutation, useLikePostMutation, useSharePostMutation } from "@/services/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { defaultAvatar, imageAssetUrl, logToCrashlytics, onTokenExpired } from "@/theme/Common";
import { FocusedInputContext } from "@/screens/HomeFeed/HomeFeed";
import { Button, Divider, Menu, PaperProvider } from "react-native-paper";
import { FocusedInputContextUserProfile } from "@/screens/UserProfile/UserProfile2";
import PopoverButton from "./PopoverButton";
import { useUserDetailMutation } from "@/services/modules/users";

const SinglePostItem = ({
  data,
  number,
  carouselView,
  getPostList
}: any) => {
  const navigation = useNavigation()
  const { Fonts, Layout, Gutters, darkMode } = useTheme();
  const authData = useSelector((state:any)=>state.auth.authData) 
  const token = useSelector((state:any)=>state.auth.token)
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();
  const [sharePost] = useSharePostMutation();
  const dispatch = useDispatch()
  const [upVote,setUpvote] =useState(data?.isLikedByUser)
  const [downVote,setDownvote] =useState(data?.isDislikedByUser)
  const [ deletePostData, { isDeleting}] = useDeletePostMutation();
  const [ postDeleteData, setPostData] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [UserDetail, { isUserLoading }] = useUserDetailMutation();
  const [userDetail, setUserDetail] : any= useState();
  const [refreshing, setRefreshing] = useState(false);
  const [userPostList, setUserPostList] = useState([]);
  const [getUserWisePostList, { isLoading }] = useGetUserWisePostListMutation();
  const postData = {
    userId: authData?._id,
    postId: data?._id,
  }
 /* data here is same as postDetail */
 
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const focusedInput = React.useContext(FocusedInputContext) || React.useContext(FocusedInputContextUserProfile) ;

  const openActionSheet = debounce(() => {
    return SheetManager.show("NewsSheet",{payload:{linkUrl:data.link,summary:data?.gpt_summary}});
  }, 300);
  const onUpvote = async () => {
    const result: any = await likePost({ body: postData, token })
    if (result?.data?.statusCode === 200) {
      setUpvote(!upVote)
      setDownvote(false)
    } else {
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch)
      }
      if (result?.error?.data) {
        // Alert.alert(result?.error?.data?.message)
      }
      if (result?.error?.error) {
        Alert.alert('Something went wrong !!')
      }
      
    }
    
  }
  const onDownvote = async () => {
    const result: any = await dislikePost({ body: postData, token })
    if (result?.data?.statusCode === 200) {
      setUpvote(false)
      setDownvote(!downVote)
    } else {
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch)
      }
      if (result?.error?.data) {
        // Alert.alert(result?.error?.data?.message)
      }
      if (result?.error?.error) {
        Alert.alert('Something went wrong !!')
      }
      
    }
  }
  const onShare = async () => {
    try {
    const shareResult = await Share.share({
      message:
        `Please check this out ${Constants.DEV_URL}/shared-post/id=${data?._id}`,
        url:data?.link
    });   
    const result: any = await sharePost({ body: postData, token })
    if (result?.data?.statusCode === 200) {
     
    } else {
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch)
      }
      if (result?.error?.data) {
        // Alert.alert(result?.error?.data?.message)
      }
      if (result?.error?.error) {
        Alert.alert('Something went wrong !!')
      }
      
    }
  }catch (error: any) {
      Alert.alert(error.message);
    }
  }

  const deletePost = async(postId) => {
    const result: any = await deletePostData({id: postId, token})
    if (result?.data?.statusCode === 200) {
      setRefreshing(false);
      setPostData(result?.data?.result)
      getUserWisePostList(1);
    } else {
      setRefreshing(false);
      if (result?.error?.data) {
        Alert.alert(result?.error?.data?.message)
      }
      if (result?.error?.error) {
        logToCrashlytics('get post detail api error', result?.error?.error)
        Alert.alert('Something went wrong !!')
      }
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch)
      }
    }
  }

  const getUserDetail =  async () => {
    const result: any = await UserDetail({id: data?.userId,token});
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

  const getUserWisePostListMethod = async (page: any) => {
    setPage(page);
    const result: any = await getUserWisePostList({
      page,
      limit,
      token,
      userId:data?.userId,
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
  return (
    <PaperProvider><View style={styles.container}>
      <View style={[carouselView && { margin: 6, height: 258 }]}>
        <TouchableWithoutFeedback onPress={openActionSheet}>
          <>
            <ImageBackground
              source={data?.image ? { uri: data?.image } : require("../../../assets/pexels-daniel-absi-952670.jpg")}
              style={carouselView ? styles.carouselImage : styles.backImage}
              imageStyle={[styles.imageRadius, !carouselView && styles.imageOpacity]}>
              <View style={styles.UpperOverlayText}>
                <View style={[Layout.flex07, Layout.row]}>
                  <Text style={styles.topLeftCorner}>{data?.readingTime || '0'} min read </Text>
                  <Text style={styles.bullet}>.</Text>
                  <Text style={styles.topLeftCornerDate}>{moment(data?.postPublished || new Date()).format("DD MMM YYYY")}</Text>
                </View>
                <View style={[Layout.flex03, Layout.alignItemsEnd, Gutters.tinyRMargin]}> 
                  {/* <MenuIcon /> */}
                  {authData?._id === data?.userId && (
                  <Menu
                        // style={{backgroundColor:'rgba(255, 255, 255, 1)'}}
                        theme={{ colors: { primary: darkMode ? 'rgb(220, 184, 255)' : 'rgb(220, 184, 255)' } }}
                        contentStyle={{
                          borderRadius: 25,
                          backgroundColor: darkMode ? 'black' : 'black',
                          padding: 8,
                          elevation: 4, // Apply elevation for shadow on Android
                        }}
                        visible={visible}
                        onDismiss={closeMenu}
                        statusBarHeight={20} //was -150
                        anchor={<TouchableOpacity><MenuIcon onPress={openMenu}/></TouchableOpacity>}>
                        
                        
                    
                        <Menu.Item titleStyle={{ color: darkMode ? 'rgb(231, 225, 229)' : 'rgb(231, 225, 229)' }} trailingIcon={'delete'} onPress={() => {
                         Alert.alert(
                          'Confirm Action',
                          'Are you sure you want to delete this post?',
                          [
                            {
                              text: 'No',
                              style: 'cancel',
                              onPress: closeMenu,
                            },
                            { text: 'Yes', onPress: () => deletePost(data?._id) },
                          ],
                          { cancelable: false }
                        );
                        }
                       } title="Delete" 
                       style={{ borderRadius: 25, margin: 8 }}
                       />
                  </Menu> )}
                  {/* <PopoverButton /> */}
                </View>
              </View>
              <View style={styles.banner}>
                <Text style={carouselView ? styles.carouselBanner : styles.bannerText}>{data?.title || ''}</Text>
              </View>
            </ImageBackground>
            {carouselView && <TouchableOpacity onPress={() => navigation.navigate('UserProfile2', {id: data?.userId,isFollowed:data?.isFollowed})}>
              <Image
              source={{ uri: data?.user_info?.profileImage ? `${imageAssetUrl}${data?.user_info?.profileImage}` : defaultAvatar}}
              style={styles.carouselProfile} />
              </TouchableOpacity>}
            {carouselView && <Text style={[styles.carouselNumbers]}>{number}</Text>}
          </>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('PostDetailScreen', { id: data?._id })}>
          <View style={styles.detailsContainer}>
            {!carouselView && <View style={[Layout.flex02]}>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile2', {id: data?.userId,isFollowed:data?.isFollowed})}>
              <Image
                source={ {uri:data?.user_info?.profileImage ? `${imageAssetUrl}${data?.user_info?.profileImage}` : defaultAvatar} }
                style={styles.image}
              />
              </TouchableOpacity>
            </View>}

            <View style={[carouselView ? Layout.fill : Layout.flex08, Gutters.tinyVMargin, carouselView && Gutters.regularTMargin]}>
              <TouchableOpacity onPress={() => navigation.navigate('UserProfile2', {id: data?.userId,isFollowed:data?.isFollowed})}>
              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <View style={[carouselView && Layout.row]}>
                  <Text style={styles.username}>{capitalize(data?.user_info?.name) || ''}</Text>
                  {/* <Text style={[Fonts.textTiny, carouselView ? Gutters.tinyLMargin : Gutters.smallLMargin, carouselView && Layout.alignSelfEnd]}>{data?.score || '0000'}</Text> */}
                </View>
                <View style={[Gutters.tinyRMargin, carouselView && Layout.alignSelfEnd]}>
                  <Text style={[Fonts.textTiny]}>{moment(data?.createdAt).fromNow()}</Text>
                </View>
              </View>
              </TouchableOpacity>
              <Text style={styles.bioDetails}>
                {data?.description || ''}
              </Text>
              {carouselView && <Text style={styles.likeUpvotes}>
                {data?.likes || '0'} upvotes <Text style={styles.bullet}>{"\u2022"}</Text> {data?.dislikes || '0'} downvotes <Text style={styles.bullet}>{"\u2022"}</Text> {data?.totalComments || '0'} comments
              </Text>}
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.interactionsContainer}>
          <Pressable
            style={[
              styles.commentBox,
              Layout.row,
              Gutters.tinyPadding,
              Layout.alignItemsCenter,
              !carouselView && Gutters.smallTMargin,
              Layout.flex07
            ]}
            onPress={()=>focusedInput(data)}
          >
            <Text style={[Fonts.textSmall, Fonts.textGray, Gutters.tinyLMargin]} >
              {Constants.addComments}
            </Text>
          </Pressable>
          <View style={[Layout.flex03, Layout.row, Layout.justifyContentCenter, Layout.alignItemsCenter, !carouselView && Gutters.tinyTMargin]}>
            <TouchableOpacity onPress={() => onUpvote()}>
              <UpvoteButton fill={upVote ? Colors.success : ""} />
            </TouchableOpacity>
            <TouchableOpacity style={[Gutters.tinyLMargin]} onPress={() => onDownvote()}>
              <DownvoteButton fill={downVote ? Colors.error : ""} />
            </TouchableOpacity>
            <TouchableOpacity style={[Gutters.tinyLMargin]} onPress={() => onShare()}>
              <ShareButton />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,

  },
  backImage: {
    width: '100%',
    aspectRatio: 5 / 2,
  },
  carouselImage: {
    width: '100%',
    height: 258,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
  },
  carouselNumbers: {
    fontSize: 96,
    fontWeight: '400',
    alignSelf: 'flex-end',
    bottom: 180,
    textShadowColor: 'rgba(255, 219, 31, 1)',
    textShadowRadius: 2,
    color: 'black'
  },
  image: {
    width: 55,
    height: 55,
    bottom: 20,
    marginStart: 10,
    aspectRatio: 1,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "white",
  },
  carouselProfile: {
    width: 55,
    height: 55,
    bottom: 40,
    marginStart: 10,
    aspectRatio: 1,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "white"
  },
  imageRadius: {
    borderRadius: 20,
    backgroundColor:'#00000066',
    opacity:0.6
  },
  detailsContainer: {
    flexDirection: "row",
  },
  username: {
    marginStart: 20,
    fontWeight: "bold",
    fontSize: 16,
    color: 'white'
  },
  bioDetails: {
    marginTop: 10,
    fontSize: 12,
    marginHorizontal: 20,
    color: 'white'
  },
  likeUpvotes: {
    marginTop: 10,
    fontSize: 10,
    marginHorizontal: 20,
    color: 'white'
  },
  interactionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    color: 'white',
  },
  commentBox: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    width: '100%',
    marginStart: 10
  },
  bottomContainer: {
    color: 'white',
    borderRadius: 20,
  },
  UpperOverlayText: {
    flexDirection: 'row',
    marginTop: 10,
    color: 'white',
  },
  topLeftCorner: {
    marginLeft: 10,
    marginTop: 5,
    color: 'white',
    fontSize: 10
  },
  topLeftCornerDate: {
    marginLeft: 5,
    marginTop: 5,
    color: 'white',
    fontSize: 10
  },
  banner: {
    justifyContent: 'center',
    marginLeft: 10,
    opacity:0.9,
     
  },
  bannerText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    marginTop: 10
  },
  carouselBanner: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 20,
    color: 'white',
  },
  imageOpacity: {
    opacity: 0.6,
  },
  bullet: {
    fontSize: 12,
    color: "white",
  },
});

export default SinglePostItem;
