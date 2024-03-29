
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
  Share,
  Pressable,
  Platform,
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
import { useCommentPostMutation, useDislikePostMutation, useLikePostMutation, usePostDetailMutation, useSharePostMutation } from "@/services/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { defaultAvatar, profileAssetUrl, onTokenExpired, postImageAssetUrl, logToCrashlytics } from "@/theme/Common";
import { FocusedInputContext } from "@/screens/HomeFeed/HomeFeed";
import { Button, Divider, Menu, PaperProvider } from "react-native-paper";
import { FocusedInputContextUserProfile } from "@/screens/UserProfile/UserProfile2";

const SinglePostItem = ({
  data,
  number,
  carouselView,
  onLikeDislikeSubmit
}: any, {props}: any) => {
  const navigation = useNavigation()
  const { Fonts, Layout, Gutters } = useTheme();
  const authData = useSelector((state:any)=>state.auth.authData) 
  const token = useSelector((state:any)=>state.auth.token)
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();
  const [sharePost] = useSharePostMutation();
  const dispatch = useDispatch()
  const [upVote,setUpvote] =useState(data?.isLikedByUser)
  const [downVote,setDownvote] =useState(data?.isDislikedByUser)
  const [getDetail, { isDetailLoading }] = usePostDetailMutation()
  const [likes, setLikes] = useState(data?.likes)
  const [dislikes, setDislikes] = useState(data?.dislikes)
  const postData = {
    userId: authData?._id,
    postId: data?._id,
  }
  const [visible, setVisible] = React.useState(false);
  // console.log(data);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const focusedInput = React.useContext(FocusedInputContext) || React.useContext(FocusedInputContextUserProfile) ;

  const updateLikeAndDislikeCount = (postId) => {
    console.log('calling updateLikeAndDislikeCount');
    getpostDetail(postId)

  }
  


  const openActionSheet = debounce(() => {
    return SheetManager.show("NewsSheet",{payload:{linkUrl:data.link,summary:data?.gpt_summary}});
  }, 300);
  const onUpvote = async () => {
    // setUpvote((prevUpVote) => !prevUpVote);
    if(!upVote) {
    const result: any = await likePost({ body: postData, token })
    if (result?.data?.statusCode === 200) {
      setUpvote(true)
      // setDislikes((prev) => (downVote ? prev - 1 : prev));
      setDownvote(false)
      setLikes((prev) => prev + 1 )
      if(downVote){
        setDislikes(dislikes-1)
      }
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
    
  } else {
    setUpvote(false)
    setLikes((prev) => prev - 1)
  }
}
  const onDownvote = async () => {
    // setDownvote((prevDownVote) => !prevDownVote); 
    if(!downVote) {
    const result: any = await dislikePost({ body: postData, token })
    if (result?.data?.statusCode === 200) {
      setUpvote(false)
      // setUpvote((prev) => (upVote ? prev - 1 : prev));
      setDownvote(true)
      setDislikes((prev) => prev + 1)
      if(upVote){
        setLikes(likes - 1)
      }
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
  } else {
    setDownvote(false)
    setDislikes((prev) => prev - 1)
  }
}
  const onShare = async () => {
    try {
    const shareResult = await Share.share({
      message:
        `Please check this out ${Constants.DEV_URL}/shared-post/id=${data?._id}`
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
  
  const capitalizeSecondName = (fullName) => {
    const names = fullName.split(' ');
    if(names.length > 1){
      names[1] = names[1].charAt(0).toUpperCase() + names[1].slice(1);
    }
    return names.join(' ');
  }

  return (
    <PaperProvider><View style={[styles.container,{backgroundColor:!carouselView ? Colors.primary : ''}]}>
      <View style={[carouselView && { margin: 6, height: 258 }]}>
        <TouchableWithoutFeedback onPress={openActionSheet}>
          <>
            <ImageBackground
              source={data?.image ? { uri: `${postImageAssetUrl}${data?.image}` } : require("../../../assets/pexels-daniel-absi-952670.jpg")}
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
                  {/* <Menu
                        style={{backgroundColor:'rgba(255, 255, 255, 1)'}}
                        visible={visible}
                        onDismiss={closeMenu}
                        statusBarHeight={-150 }
                        anchor={<TouchableOpacity><MenuIcon onPress={openMenu}/></TouchableOpacity>}>
                        <Menu.Item trailingIcon={'content-copy'} onPress={() => {closeMenu()}} title="Follow" />
                        <Divider />
                        <Menu.Item trailingIcon={'eye-off-outline'} onPress={() => {closeMenu()}} title="Hide" />
                        <Divider />
                        <Menu.Item trailingIcon={'alert'} onPress={() => {closeMenu()}} title="Report" />
                        <Divider />
                        <Menu.Item titleStyle={{color:'red'}} theme={{ colors: { primary: 'green' } }}  trailingIcon={'delete'} onPress={() => {closeMenu()}} title="Delete" />
                  </Menu> */}
                </View>
              </View>
              <View style={styles.banner}>
                <Text style={carouselView ? styles.carouselBanner : styles.bannerText}>{data?.title || ''}</Text>
              </View>
            </ImageBackground>
            {carouselView && <TouchableOpacity onPress={() => navigation.navigate('UserProfile2', {id: data?.userId,isFollowed:data?.isFollowed})}>
              <Image
              source={{ uri: data?.user_info?.profileImage ? `${profileAssetUrl}${data?.user_info?.profileImage}` : defaultAvatar}}
              style={styles.carouselProfile} />
              </TouchableOpacity>}
            {carouselView && <Text style={[styles.carouselNumbers]}>{number}</Text>}
          </>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('PostDetailScreen', { id: data?._id, isFollowed:data?.isFollowed })}>
          <View style={styles.detailsContainer}>
            {!carouselView && <View style={[Layout.flex02]}>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile2', {id: data?.userId,isFollowed:data?.isFollowed})}>
              <Image
                source={ {uri:data?.user_info?.profileImage ? `${profileAssetUrl}${data?.user_info?.profileImage}` : defaultAvatar} }
                style={styles.image}
              />
              </TouchableOpacity>
            </View>}

            <View style={[carouselView ? Layout.fill : Layout.flex08, Gutters.tinyVMargin, carouselView && Gutters.regularTMargin]}>
              <TouchableOpacity onPress={() => navigation.navigate('UserProfile2', {id: data?.userId,isFollowed:data?.isFollowed})}>
              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <View style={[carouselView && Layout.row]}>
                  <Text style={styles.username}>{capitalizeSecondName(data?.user_info?.name) || ''}</Text>
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
                {likes || '0'} upvotes <Text style={styles.bullet}>{"\u2022"}</Text> {dislikes || '0'} downvotes <Text style={styles.bullet}>{"\u2022"}</Text> {data?.totalComments || '0'} comments
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
    paddingBottom:10
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
    bottom: Platform.OS === 'ios' ? 155 : 165,
    marginEnd:10,
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
    backgroundColor:'#003566',
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
