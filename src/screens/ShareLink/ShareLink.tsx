// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const CommentBox = () => {
//   const [comment, setComment] = useState('');

//   const handleCommentChange = (text) => {
//     setComment(text);
//   };

//   const handlePostComment = () => {
//     // Implement logic to post the comment
//     console.log('Posting comment:', comment);
//     // You can send the comment to your backend or perform any other necessary action
//     // Reset the comment input
//     setComment('');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Add a public comment..."
//         value={comment}
//         onChangeText={handleCommentChange}
//         multiline
//       />
//       <TouchableOpacity onPress={handlePostComment}>
//         <Icon name="send" size={30} color="#606060" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   input: {
//     flex: 1,
//     marginRight: 10,
//     minHeight: 40,
//     maxHeight: 120,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 8,
//     fontSize: 16,
//   },
// });

// export default CommentBox;
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "@/hooks";
import { UrlLink } from "@/theme/svg";
import LinearGradient from "react-native-linear-gradient";

const ShareLink = () => {
  // const {
  //   Layout,
  //   Fonts,
  //   Gutters,
  //   darkMode: isDark,
  // } = useTheme();

  const userAvatar =
    "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg";
  const userName = "Nikhil Kamath";
  const score = "2050 Score";
  const imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXk9RJzuijLiEaognmD64tPjSIWPWHARvv55R-QDILxw&s";
  const postTitle =
    "Canada a haven for gangsters Goldy Brar, Arsh Dalla & Landa";
  const postLink = "medium.com";
  const tags = ["Fitness", "Fashion", "Adventure", "Food", "Travel", "Nature"];
  const likes = 3;
  const dislikes = 2;
  return (
    <View style={styles.container}>
      <Text style={styles.banner}>Share a Link</Text>
      <TextInput
        style={styles.LinkBar}
        placeholder="Enter or paste a link"
        placeholderTextColor={"white"}
      />
      {/* <TouchableWithoutFeedback style={styles.PostContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{postTitle}</Text>
            <View style={[Layout.row, Layout.alignItemsCenter]}>
              <View style={[Gutters.tinyTMargin]}>
                <UrlLink />
              </View>
              <Text style={[Fonts.textTiny, Fonts.textGray]}>{postLink}</Text>
            </View>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
              style={styles.titleGradient}
            />
          </View>
        </TouchableWithoutFeedback> */}
      <View style={styles.PostContainer}>
        <ImageBackground
          source={require("../../../assets/pexels-steve-johnson-1509534.jpg")}
          style={styles.backgroundImage}
        ></ImageBackground>
      </View>
      <View style={styles.CommentContainer}>
        <Text style={styles.title}>Add Your Comment(Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="here"
          placeholderTextColor="#A0A0A0"
        />
        <View style={styles.line} />
        <View style={styles.characterCountContainer}>
          <Text style={styles.characterCountText}>60 characters</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Post Link</Text>
        </Pressable>
      </TouchableOpacity>
    </View>
  );
};

export default ShareLink;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  // PostContainer: {
  //   backgroundColor: 'white',
  //   borderTopLeftRadius: 10,
  //   borderTopRightRadius: 10,
  //   marginVertical: 10,
  //   shadowColor: 'black',
  //   shadowOpacity: 0.2,
  //   shadowOffset: { width: 0, height: 2 },
  //   elevation: 2,
  // },
  banner: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  PostContainer: {
    width: 324,
    height: 162,
    flexShrink: 0,
    borderRadius: 10,
    marginLeft: 30,
    marginTop: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  LinkBar: {
    backgroundColor: "#242424",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    color: "white",
    width: widthPercentageToDP("90%"),
    marginLeft: 15,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  // titleContainer: {
  //   backgroundColor: 'rgba(0, 0, 0, 0.8)',
  //   padding: 10,
  // },
  // title: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  // titleGradient: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   height: 50,
  // },
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
});
