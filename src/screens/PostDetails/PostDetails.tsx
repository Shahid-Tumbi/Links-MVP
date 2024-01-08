import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "@/hooks";
import { Colors } from "@/theme/Variables";
import UserCard from "@/components/UserCard";
import { globalStyles } from "@/theme/GlobalStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { UrlLink } from "@/theme/svg";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { SheetManager } from "react-native-actions-sheet";
import debounce from "lodash/debounce";
import { widthPercentageToDP } from "react-native-responsive-screen";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import CommentBottomSheet from "@/components/ModalBottomSheet/BottomSheet";
import { Constants } from "@/theme/Constants";
import { usePostDetailMutation } from "@/services/modules/post";
import {
  defaultAvatar,
  profileAssetUrl,
  logToCrashlytics,
  onTokenExpired,
  postImageAssetUrl,
} from "@/theme/Common";
import { Loader } from "@/components";
import { capitalize } from "lodash";
import {
  useFollowSomeoneMutation,
  useUnfollowSomeoneMutation,
} from "@/services/modules/users";
const PostDetailScreen = ({ navigation, route }: ApplicationScreenProps) => {
  const { Layout, Fonts, Gutters, darkMode: isDark } = useTheme();
  const authData = useSelector((state) => state.auth.authData);
  const token = useSelector((state) => state.auth.token);
  const [postData, setPostData] = useState();
  const [getDetail, { isLoading }] = usePostDetailMutation();
  const dispatch = useDispatch();
  const userAvatar = defaultAvatar;
  const userName = "";
  const score = "0000 Score";
  const imageUrl = "";
  const postTitle = "";
  const postLink = " ";
  const [commentCount, setCommentCount] = useState(0);

  const commentBottomSheetRef = useRef(null);
  const [followSomeone, { isLoadingFollow }] = useFollowSomeoneMutation();
  const [unfollowSomeone, { isLoadingUnfollow }] = useUnfollowSomeoneMutation();
  const [refreshing, setRefreshing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { postFollowData } = route?.params;
  const followUserId = postFollowData?.userId;
  const [recentComments, setRecentComments] = useState([]);
  const myUserId = useSelector((state: any) => state.auth.authData._id);
  const FollowBody = {
    followerId: followUserId,
    followingId: myUserId,
  };
  const incrementCommentCount = (postId) => {
    getpostDetail(postId);
  };
  const openActionSheet = debounce(() => {
    return SheetManager.show("NewsSheet", {
      payload: { linkUrl: postData.link, summary: postData?.gpt_summary },
    });
  }, 300);
  // Method to trigger text input focus in CommentBottomSheet
  const focusTextInputInCommentBottomSheet = () => {
    if (commentBottomSheetRef?.current?.handleTextInputFocus) {
      commentBottomSheetRef?.current?.handleTextInputFocus(postData);
    }
  };
  const getpostDetail = async (postId) => {
    logToCrashlytics("get post detail api call");
    const result: any = await getDetail({ id: postId, token });
    if (result?.data?.statusCode === 200) {
      setPostData(result?.data?.result);
    } else {
      if (result?.error?.data) {
        Alert.alert(result?.error?.data?.message);
      }
      if (result?.error?.error) {
        logToCrashlytics("get post detail api error", result?.error?.error);
        Alert.alert("Something went wrong !!");
      }
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch);
      }
    }
  };
  useEffect(() => {
    getpostDetail(route?.params?.id);
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={"height"}
      style={[Layout.fill, { backgroundColor: Colors.primary }]}
    >
      {isLoading ? <Loader state={isLoading} /> : null}
      <View
        style={[
          globalStyles.header,
          Gutters.regularRMargin,
          Gutters.regularTMargin,
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name={"chevron-left"}
            color={Colors.white}
            size={28}
          />
        </TouchableOpacity>
        <UserCard
          userAvatar={
            postData?.user_info?.profileImage
              ? `${profileAssetUrl}${postData?.user_info?.profileImage}`
              : userAvatar
          }
          userName={capitalize(postData?.user_info?.name || userName)}
          score={postData?.user_info?.score || score}
          menu={true}
          id={postData?.userId}
          isFollowed={postData?.isFollowed}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[globalStyles.screenMargin]}
      >
        <Text style={[Fonts.textRegular, Fonts.textWhite]}>
          {postData?.description || ""}
        </Text>
        <Text style={[Fonts.textTiny, Fonts.textGray]}>
          {`${postData?.readingTime || "0"} min read`}
          <View>
            <Text style={{ color: Colors.textGray400 }}> .</Text>
          </View>{" "}
          {moment(postData?.createdAt).format("MMMM YYYY")}
        </Text>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={openActionSheet}
        >
          <Image
            source={
              postData?.image
                ? { uri: `${postImageAssetUrl}${postData?.image}` }
                : require("../../../assets/pexels-daniel-absi-952670.jpg")
            }
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{postData?.title || postTitle}</Text>
            <View
              style={[Layout.row, Layout.alignItemsCenter, Gutters.tinyRMargin]}
            >
              <View style={[Gutters.tinyTMargin]}>
                <UrlLink />
              </View>
              <Text style={[Fonts.textTiny, Fonts.textGray]}>
                {postData?.link || postLink}
              </Text>
            </View>
            <LinearGradient
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
              style={styles.titleGradient}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.CommentBox}>
          <View style={styles.CommentHeader}>
            <Text style={styles.CommentHeaderText}>Comments</Text>
            <Text style={styles.CommentHeaderNumber}>
              {postData?.totalComments || "0"}
            </Text>
          </View>
          <ScrollView>
            {recentComments.map((comment: any) => {
              const truncatedComment =
                comment.content.split(" ").slice(0, 10).join(" ") + " ...";
              return (
                <View key={comment._id} style={styles.commentRow}>
                  <Image
                    source={{
                      uri: comment.user_info[0]?.profileImage
                        ? `${profileAssetUrl}${comment.user_info[0]?.profileImage}`
                        : defaultAvatar,
                    }}
                    style={styles.profilePic}
                  />
                  <View style={styles.commentInfo}>
                    <Text style={styles.username}>
                      {comment.user_info[0]?.name}
                    </Text>
                    <Text style={styles.commentText}>{truncatedComment}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.ContentInCommentBox}>
            <Image
              source={{
                uri: authData?.profileImage
                  ? `${profileAssetUrl}${authData?.profileImage}`
                  : defaultAvatar,
              }}
              style={styles.avatar}
            />
            <Pressable
              onPress={focusTextInputInCommentBottomSheet}
              style={[styles.CommentInput]}
            >
              <Text style={[Fonts.textWhite]}> {Constants.addComments}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <CommentBottomSheet
        ref={commentBottomSheetRef}
        onCommentSubmit={incrementCommentCount}
        onNewComment={setRecentComments}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "rgba(41, 41, 41, 0.8)",
  },
  titleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  tag: {
    backgroundColor: "#373737",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 6,
  },
  tagText: {
    color: "white",
    fontSize: 14,
  },
  CommentBox: {
    height: 200,
    borderRadius: 20,
    width: widthPercentageToDP("90%"),
    marginTop: 20,
    backgroundColor: "#222222",
    flexDirection: "column",
    padding: 20,
    marginBottom: 10,
  },
  CommentHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  CommentHeaderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  CommentHeaderNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 5,
  },
  ContentInCommentBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  CommentInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentInfo: {
    flex: 1,
  },
  username: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  commentText: {
    color: "white",
    fontSize: 14,
  },
});

export default PostDetailScreen;
