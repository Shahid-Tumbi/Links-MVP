
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Layout from "@/theme/Layout";
import {
  DownvoteButton,
  Menu,
  MinusGray,
  Plus,
  ShareButton,
  UpvoteButton,
} from "@/theme/svg";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/theme/Variables";
import { Constants } from "@/theme/Constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const SinglePostItem = ({
  userAvatar,
  userName,
  postTitle,
  postImage,
  score,
  timeToRead,
  date,
  likes,
  dislikes,
  comment,
  onPostPress,
  enableComment,
}: any) => {
  const { Fonts, Layout, Gutters } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={require("../../../assets/pexels-daniel-absi-952670.jpg")}
          style={styles.backImage}>
            <View style={styles.UpperOverlayText}>
                <Text style={styles.topLeftCorner}>7 min Read</Text>
                <Text style={styles.topLeftCorner}>25 Oct 2023</Text>
                <Menu />
            </View>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>NCERT blablalbla blablalbla blablalbla blablalbla blablalbla.</Text>
            </View>
          </ImageBackground>
          
        
        <Image
          source={require("../../../assets/Ellipse38.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomContainer}>
      <View style={styles.detailsContainer}>
        <Text style={styles.username}>Tanmay Bhat</Text>
        {/* <Text style={styles.time}>3 hours ago</Text>
          <Text style={styles.count}>0000</Text> */}
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioDetails}>
          Investor, Comedian, Influencer, amongst other things. Live and let
          live.
        </Text>
      </View>
      <View style={styles.interactionsContainer}>
        <View
          style={[
            styles.commentBox,
            Layout.row,
            Gutters.tinyPadding,
            Layout.alignItemsCenter,
            Gutters.smallTMargin,
          ]}
        >
          <Text style={[Fonts.textSmall, Fonts.textGray, Gutters.tinyLMargin]}>
            {Constants.addComments}
          </Text>
        </View>
        <View style={[Layout.flex03, Layout.row, Layout.alignItemsCenter]}>
          <TouchableOpacity>
            <UpvoteButton fill={likes > 0 ? Colors.success : ""} />
          </TouchableOpacity>
          <Text
            style={[
              Fonts.textLittle,
              Fonts.textGray,
              { color: likes > 0 ? Colors.success : Colors.primary },
            ]}
          >
            {"  "}
            {likes}
          </Text>
          <TouchableOpacity style={[Gutters.tinyLMargin]}>
            <DownvoteButton fill={dislikes > 0 ? Colors.error : ""} />
          </TouchableOpacity>
          <Text
            style={[
              Fonts.textLittle,
              Fonts.textGray,
              Layout.alignItemsCenter,
              { color: dislikes > 0 ? Colors.error : Colors.primary },
            ]}
          >
            {"  "}
            {dislikes}
          </Text>
          <TouchableOpacity style={[Gutters.tinyLMargin]}>
            <ShareButton />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderRadius: 60,

  },
  header: {},
  backImage: {
    width: '100%',
    aspectRatio: 5 / 2,
    marginBottom: -30,
  },
  image: {
    width: 300,
    height: 100,
    marginLeft: 0,
    aspectRatio: 1,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
  },
  detailsContainer: {

    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: -60,
    wp: ('80%')
  
  },
  username: {
    marginLeft: 120,
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 20,
    color: 'white'
  },
  bioContainer: {
    width: 234,
    marginLeft: 120,
    backgroundColor: 'black',
    color: 'white',
 
  },
  bioDetails: {
    color: 'white'
  },
  interactionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: 'black',
    color: 'white',


  },
  commentBox: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    width: 270,
    marginLeft: 10
  },
  bottomContainer: {
    color: 'white',
    backgroundColor: 'black'
  },
  UpperOverlayText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: 'white'
  },
  topLeftCorner: {
    marginLeft: 10, 
    marginTop: 5,
    color: 'white',
    fontSize: 10
  },
  banner: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  bannerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  }
});

export default SinglePostItem;
