import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "@/hooks";
import LinearGradient from "react-native-linear-gradient";
import { debounce } from "lodash";
import { Constants } from "@/theme/Constants";
import { useAddPostMutation } from "@/services/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { onTokenExpired } from "@/theme/Common";
import { Colors } from "@/theme/Variables";
import { URL } from "url";

const cheerio = require('cheerio');
const ShareLink = ({sheetRef}:any) => {
  const {
    Layout,
    Fonts,
    Gutters,
    darkMode: isDark,
  } = useTheme();
  const [error,setError]=useState('')
  const [link,setLink]=useState('')
  const [pinComment,setPinComment]=useState('')
  const [image,setImage]=useState('')
  const [loader,setLoader]=useState(false)
  const dispatch = useDispatch()
  const authData = useSelector((state:any)=>state.auth.authData) 
  const token = useSelector((state:any)=>state.auth.token) 
  const [addPost, { isLoading }] = useAddPostMutation();
  const fetchOGImage = async (targetUrl: string) => {
    try {
      setLoader(true)
      const response = await fetch(targetUrl);
      const htmlContent = await response.text();
      
      const $ = cheerio.load(htmlContent);
      const image = $("meta[property='og:image']").attr('content');
      
      if (image) {
        setLoader(false)
        setImage(image);
      } else {
        setLoader(false)
        // Handle case where OG image meta tag is not found
        console.log('OG Image meta tag not found');
      }
    } catch (error) {
      setLoader(false)
      console.error('Error fetching OG image:', error);
    }
  };
  const submitPost = async () =>{

    if (link == '' ) {
      setError('plese enter a Link')
    }else {

      const postData = {
        userId: authData._id,
        link,
        pinComment
      }
      const result: any = await addPost({ body: postData, token })
      if (result?.data?.statusCode === 200) {
        setLink('')
        setPinComment('')
        setImage('')
        setError('')
        Alert.alert('Link posted successfully')
        sheetRef?.current?.close()
      } else {
        if (result.error && result.error.status === 401) {
          onTokenExpired(dispatch)
        }
        if (result?.error?.data) {
          if(result?.error?.data?.message === 'URL type not supported.'){
            setError('Invalid Link, please recheck the link you would like to enter.')
          } else {
          Alert.alert(result?.error?.data?.message)
          }
          
        }
        if (result?.error?.error) {
          Alert.alert('Something went wrong !!')
        }
        
      }
    }
  }
  const debounceFun = debounce((e)=>{return fetchOGImage(e)},400)
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.cancelButton} onPress={()=>{
         setLink('')
         setPinComment('')
         setImage('')
         setError('')
         sheetRef.current?.close()
        }}>Cancel</Text>
      <Text style={styles.banner}>{Constants.shareLink}</Text>
      <Text style={styles.subbanner}>{Constants.linkInterested}</Text>
      <TextInput
        style={styles.LinkBar}
        placeholder="Enter or paste a link"
        placeholderTextColor={"white"}
        value={link}
        onChange={({ nativeEvent: { eventCount, target, text} }) => {            
          setLink(text)
          debounceFun(text)
          setError('')
        }}
      />
      {error&&<Text style={[Fonts.textRegular,Fonts.textError,Layout.alignSelfEnd,Gutters.tinyHMargin]}>{error}</Text>}
      <TouchableWithoutFeedback>
        <View style={styles.PostContainer}>
          {loader ? <ActivityIndicator style={styles.backgroundImage} color={Colors.blue} size={30}/> : 
          <ImageBackground
            source={({uri:image})}
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImage}
          ></ImageBackground>}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.CommentContainer}>
        <Text style={styles.title}>{Constants.addYourComment}</Text>
        <TextInput
          style={styles.input}
          placeholder="here"
          placeholderTextColor="#A0A0A0"
          maxLength={60}
          value={pinComment}
          onChangeText={(e)=>setPinComment(e)}
        />
        <View style={styles.line} />
        <View style={styles.characterCountContainer}>
          <Text style={styles.characterCountText}>{Constants.characters}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <TouchableOpacity onPress={()=>submitPost()}>
      <LinearGradient style={styles.button} colors={['rgba(70, 70, 70, 1)','rgba(0, 0, 0, 1)']}>
          <Text style={styles.buttonText}>{Constants.postLink}</Text>
      </LinearGradient>
        </TouchableOpacity>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ShareLink;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  banner: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  PostContainer: {
    width: Dimensions.get('screen').width - 40,
    height: 162,
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius:10
  },
  LinkBar: {
    backgroundColor: "#242424",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    color: "white",
    width: widthPercentageToDP("90%"),
    marginLeft: 20,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  CommentContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: 60,
    marginLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 5,
    color: "white",
  },
  line: {
    height: 1,
    backgroundColor: "black",
    width: "100%",
    marginTop: 15,
  },

  characterCountContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  characterCountText: {
    fontSize: 12,
    color: "#A0A0A0",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 40,
    width: widthPercentageToDP("90%"),
    marginLeft: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  subbanner:{
    color: "rgba(255, 255, 255, 0.60)",
    fontSize: 12,
    marginLeft: 20,
  },
  cancelButton:{
    color:'white',
    fontSize:16,
    textAlign:'right',
    marginEnd:20
}
});
