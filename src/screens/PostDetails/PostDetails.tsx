import React, { useState } from "react";
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from "react-native";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "@/hooks";
import { Colors, FontSize } from "@/theme/Variables";
import NewsSheet from "@/components/NewsSheet";
import UserCard from "@/components/UserCard";
import { globalStyles } from "@/theme/GlobalStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Menu, MinusGray, Plus, UrlLink } from "@/theme/svg";
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { SheetManager } from "react-native-actions-sheet";
import debounce from "lodash/debounce";
import { widthPercentageToDP } from "react-native-responsive-screen";
const PostDetailScreen = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Fonts, Gutters, darkMode: isDark } = useTheme();
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

  const openActionSheet = debounce(() => {
    return SheetManager.show("NewsSheet");
  }, 300);

  const hideActionSheet = () => {
    SheetManager.hide("NewsSheet");
  };
  return (
    <View style={[Layout.fill, { backgroundColor: Colors.primary }]}>
      <View style={[globalStyles.header, Gutters.regularRMargin]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name={"chevron-left"}
            color={Colors.white}
            size={28}
          />
        </TouchableOpacity>
        <UserCard
          userAvatar={userAvatar}
          userName={userName}
          score={score}
          menu={true}
        />
      </View>
      <View style={[Layout.flex08, globalStyles.screenMargin]}>
        <Text style={[Fonts.textRegular, Fonts.textWhite]}>
          {"I think we are headed in the right direction."}
        </Text>
        <Text style={[Fonts.textTiny, Fonts.textGray]}>
          {"5 min read"}
          <View>
            <Text style={{ color: Colors.textGray400 }}> .</Text>
          </View>{" "}
          {"September, 2023"}
        </Text>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={openActionSheet}
        >
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
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
              style={styles.titleGradient}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.CommentBox}>
          <View style={styles.CommentHeader}>
            <Text style={styles.CommentHeaderText}>Comments</Text>
            <Text style={styles.CommentHeaderNumber}>112</Text>
          </View>
          <KeyboardAvoidingView style={styles.ContentInCommentBox}>
            <Image source={require("../../../assets/Ellipse38.jpg")} style={styles.avatar}/>
            <TextInput
              style={styles.CommentInput}
              placeholder="Add Your Comment"
              placeholderTextColor="white"
            />
          </KeyboardAvoidingView>
        </View>
      </View>

      <NewsSheet
        // content={newsContent}
        onCancel={hideActionSheet}
      />
    </View>
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
    height: 150,
    borderRadius: 20,
    width: widthPercentageToDP('90%'),
    marginTop: 20,
    backgroundColor: '#222222',
    flexDirection: 'column',
    padding: 20,
  },
  CommentHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  CommentHeaderText: {
    color:'white',
    fontWeight:'bold',
    fontSize: 20,

  },
  CommentHeaderNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
    marginLeft: 5

  },
  ContentInCommentBox: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25
  }
});

export default PostDetailScreen;
