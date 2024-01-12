import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Text, Alert, Keyboard, TextInput, TouchableOpacity, } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Image } from "react-native";
import { useCommentListMutation, useCommentPostMutation } from "@/services/modules/post";
import { defaultAvatar, profileAssetUrl, logToCrashlytics, onTokenExpired } from "@/theme/Common";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/hooks";
import { Constants } from "@/theme/Constants";
import { capitalize } from "lodash";
import { Icon } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ShareButton } from "@/theme/svg";

const CommentBottomSheet = React.forwardRef((props: any, ref) => {
  const { Layout, Fonts, Gutters, darkMode: isDark } = useTheme();
  const dispatch = useDispatch()
  const sheetRef = useRef<BottomSheet>(null);
  const inputRef = useRef<TextInput>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const [postData,setPostData] = useState()
  const token = useSelector((state: any) => state.auth.token)
  const authData = useSelector((state: any) => state.auth.authData)
  const [commentList, { isLoading }] = useCommentListMutation()
  const [commentSubmit] = useCommentPostMutation()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [refreshing, setRefreshing] = useState(false)
  const [list, setList] = useState([])
  const [comment, setComment] = useState('')
  const [sheetIndex, setSheetIndex] = useState(-1);
  const { onCommentSubmit, onNewComment } = props;
  const pinnedComment = list.find(item => item?.is_pinned);


  const handleTextInputFocus = (data:any) => {
    setPostData(data)
    setSheetIndex(2); // Snap to 90%
    getList(1,data?._id)
  };
  React.useImperativeHandle(ref, () => ({
    handleTextInputFocus,
  }));
  const getList = async (page: number,id:any) => {
    setPage(page)
    const result: any = await commentList({ id, page, limit, token })
    if (result?.data?.statusCode === 200) {
      setRefreshing(false)
      logToCrashlytics('on comment list api call')
      // let allComments = result.data?.result?.rows;
      // let recentComments = allComments.slice(0,2);
      // onNewComment(recentComments)
      if (page == 1) {
        setList(result?.data?.result?.rows)
      } else {
        setList(prevList => [...prevList, ...result?.data?.result?.rows])
      }
    } else {
      setRefreshing(false)
      if (result?.error?.data) {
        Alert.alert(result?.error?.data?.message)
      }
      if (result?.error?.error) {
        logToCrashlytics('on comment list api error', result?.error?.error)
        Alert.alert('Something went wrong !!')
      }
      if (result.error && result.error.status === 401) {
        onTokenExpired(dispatch)
      }
    }
  }
  const onComment = async () => {
    if (comment.trim()) {
      let commentData = {
        userId: authData?._id,
        postId: postData?._id,
        content: comment
      }
      
      const result: any = await commentSubmit({ body: commentData, token })
      if (result?.data?.statusCode === 200) {
        setRefreshing(false)
        logToCrashlytics('on comment submit api call')
        getList(1,postData?._id)
        setComment('')
        onCommentSubmit(postData?._id);
      } else {
        setRefreshing(false)
        if (result?.error?.data) {
          Alert.alert(result?.error?.data?.message)
        }
        if (result?.error?.error) {
          logToCrashlytics('On comment submit api error', result?.error?.error)
          Alert.alert('Something went wrong !!')
        }
        if (result.error && result.error.status === 401) {
          onTokenExpired(dispatch)
        }
      }
    }
  }
  const handleSheetChange = useCallback((index: number) => {    
    if (index === -1) {
      Keyboard.dismiss()
      setSheetIndex(-1)
    } else {
      setSheetIndex(index);
    }

  }, []);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={sheetIndex}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      style={styles.BS}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: 'white', borderRadius: 10 }}
      backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
    >
      <View style={[styles.header]}>
        <Image source={{ uri: postData?.user_info?.profileImage ? `${profileAssetUrl}${postData?.user_info?.profileImage}` : defaultAvatar}} style={styles.commentAvatar} />
        <View style={styles.commentTextContainer}>
          <Text style={styles.headerAuthor}>{capitalize(postData?.user_info?.name)} started the conversation.</Text>
          <Text style={styles.headerText}>{pinnedComment ? pinnedComment?.content : ''}</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={[Layout.flex09, Gutters.tinyBMargin]}>
        <BottomSheetFlatList
          nestedScrollEnabled={true}
          data={list}
          keyExtractor={(item: any) => item._id.toString()}
          renderItem={({ item }: any) => (
           !item?.is_pinned && <View style={styles.commentContainer}>
              <Image source={{ uri: item?.user_info[0]?.profileImage ?`${profileAssetUrl}${item?.user_info[0]?.profileImage}` : defaultAvatar}} style={styles.commentAvatar} />
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentAuthor}>{capitalize(item?.user_info[0]?.name)}</Text>
                <Text style={styles.commentText}>{item?.content}</Text>
              </View>
            </View>
          )}
          onEndReached={() => getList(page + 1,postData._id)}
          onEndReachedThreshold={0.4}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
      <View style={[styles.commentZone,styles.footerContainer]}>
        <Image source={{ uri: authData?.profileImage ? `${profileAssetUrl}${authData?.profileImage}` : defaultAvatar}} style={styles.yourAvatar} />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={Constants.addComments}
          placeholderTextColor="white"
          value={comment}
          onChangeText={(text) => {
            setComment(text)
          }}
          onSubmitEditing={() => onComment()} />
           <TouchableOpacity style={styles.roundButton} onPress={() => onComment()}>
           {/* <FontAwesome name="paper-plane" size={24} color="white" /> */}
           <ShareButton />
      </TouchableOpacity>
      </View>
      </View>
     
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    // backgroundColor: "black",
  },
  commentContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
  },
  commentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray'
  },
  commentTextContainer: {
    marginLeft: 10,
    flex:0.9,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  commentText: {
    fontSize: 15,
    color: 'white'
  },
  commentZone: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20
  },
  yourAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 20,
    backgroundColor: 'gray'
  },
  input: {
    flex: 1,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(36, 36, 36, 1)',
    // width: '70%',
    marginLeft: 5,
    marginRight: 5,
    color: 'white'
  },
  header: {
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 20,
  },
  headerAuthor: {
    fontSize: 12,
    color: 'white'
  },
  headerText: {
    fontSize: 15,
    color: 'white'
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 10,
  },
  BS: {
    flex: 1,
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#333333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default CommentBottomSheet;