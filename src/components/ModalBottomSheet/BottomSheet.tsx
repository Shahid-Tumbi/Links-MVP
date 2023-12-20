import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Text, Alert, Keyboard, TextInput, } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Image } from "react-native";
import { useCommentListMutation, useCommentPostMutation } from "@/services/modules/post";
import { defaultAvatar, logToCrashlytics, onTokenExpired } from "@/theme/Common";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/hooks";
import { Constants } from "@/theme/Constants";
import { capitalize } from "lodash";

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
  const { onCommentSubmit } = props;


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
        let user = {
          ...result?.data?.result,
          user_info: [{
            name: authData?.name,
            profileImage: authData?.profileImage
          }]
        }
        setList(prevList => [user, ...prevList])
        setComment('')
        onCommentSubmit();
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
        <Image source={{ uri: postData?.user_info?.profileImage || defaultAvatar}} style={styles.commentAvatar} />
        <View style={styles.commentTextContainer}>
          <Text style={styles.headerAuthor}>{capitalize(postData?.user_info?.name)} started the conversation.</Text>
          <Text style={styles.headerText}>{postData?.pinComment || ''}</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={[Layout.flex09, Gutters.tinyBMargin]}>
        <BottomSheetFlatList
          nestedScrollEnabled={true}
          data={list}
          keyExtractor={(item: any) => item._id.toString()}
          renderItem={({ item }: any) => (
            <View style={styles.commentContainer}>
              <Image source={{ uri: item?.user_info[0]?.profileImage || defaultAvatar}} style={styles.commentAvatar} />
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
        <Image source={{ uri: authData?.profileImage || defaultAvatar}} style={styles.yourAvatar} />
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
    flexWrap: 'wrap',
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
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(36, 36, 36, 1)',
    width: '70%',
    marginLeft: 10,
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
});

export default CommentBottomSheet;