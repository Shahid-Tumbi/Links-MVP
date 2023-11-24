
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import {
  DownvoteButton,
  Menu,
  ShareButton,
  UpvoteButton,
} from "@/theme/svg";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/theme/Variables";
import { Constants } from "@/theme/Constants";
import LinearGradient from "react-native-linear-gradient";
import { SheetManager } from "react-native-actions-sheet";
import { debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  carouselView
}: any) => {
  const navigation = useNavigation()
  const { Fonts, Layout, Gutters } = useTheme();
  const openActionSheet = debounce(() => {
    return SheetManager.show("NewsSheet");
  }, 300);
  return (
    <View style={styles.container}>
      <View style={[carouselView && { margin: 6 }]}>
        <TouchableWithoutFeedback onPress={openActionSheet}>
          <ImageBackground
            source={require("../../../assets/pexels-daniel-absi-952670.jpg")}
            style={carouselView ? styles.carouselImage : styles.backImage}
            imageStyle={[styles.imageRadius, !carouselView && styles.imageOpacity]}>
            <View style={styles.UpperOverlayText}>
              <View style={[Layout.flex07, Layout.row]}>
                <Text style={styles.topLeftCorner}>7 min read</Text>
                <Text style={styles.topLeftCorner}>25 Oct 2023</Text>
              </View>
              <View style={[Layout.flex03, Layout.alignItemsEnd, Gutters.tinyRMargin]}>
                <Menu />
              </View>
            </View>
            <View style={styles.banner}>
              <Text style={carouselView ? styles.carouselBanner : styles.bannerText}>NCERT clarifies on India to Bharat name change: ‘Too premature to comment’</Text>
            </View>
            {carouselView && <Image
              source={require("../../../assets/Ellipse38.jpg")}
              style={styles.carouselProfile}
            />}
            {carouselView && <Text style={[styles.carouselNumbers]}>1</Text>}
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('PostDetailScreen')}>
        <View style={styles.detailsContainer}>
            {!carouselView && <View style={[Layout.flex02]}>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile2')}>
              <Image
                source={require("../../../assets/Ellipse38.jpg")}
                style={styles.image}
              />
              </TouchableOpacity>
            </View>}

            <View style={[carouselView ? Layout.fill : Layout.flex08, Gutters.tinyVMargin, carouselView && Gutters.regularTMargin]}>
              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <View style={[carouselView && Layout.row]}>
                  <Text style={styles.username}>Tanmay Bhat</Text>
                  <Text style={[Fonts.textTiny, carouselView ? Gutters.tinyLMargin : Gutters.smallLMargin, carouselView && Layout.alignSelfEnd]}>0000</Text>
                </View>
                <View style={[Gutters.tinyRMargin, carouselView && Layout.alignSelfEnd]}>
                  <Text style={[Fonts.textTiny]}>3 hours ago</Text>
                </View>
              </View>
              <Text style={styles.bioDetails}>
                Investor, Comedian, Influencer, amongst other things. Live and let
                live.
              </Text>
              {carouselView && <Text style={styles.likeUpvotes}>
                333 upvotes . 334 downvotes . 12 comments
              </Text>}
            </View>
        </View>
          </TouchableOpacity>
        <View style={styles.interactionsContainer}>
          <View
            style={[
              styles.commentBox,
              Layout.row,
              Gutters.tinyPadding,
              Layout.alignItemsCenter,
              !carouselView && Gutters.smallTMargin,
              Layout.flex07
            ]}
          >
            <Text style={[Fonts.textSmall, Fonts.textGray, Gutters.tinyLMargin]}>
              {Constants.addComments}
            </Text>
          </View>
          <View style={[Layout.flex03, Layout.row, Layout.justifyContentCenter, Layout.alignItemsCenter, !carouselView && Gutters.tinyTMargin]}>
            <TouchableOpacity>
              <UpvoteButton fill={likes > 0 ? Colors.success : ""} />
            </TouchableOpacity>
            <TouchableOpacity style={[Gutters.tinyLMargin]}>
              <DownvoteButton fill={dislikes > 0 ? Colors.error : ""} />
            </TouchableOpacity>
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
    borderRadius: 20,

  },
  header: {},
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
    bottom: 40,
    textShadowColor: 'rgba(255, 219, 31, 1)',
    textShadowRadius: 2,
    color: 'black'
  },
  image: {
    width: 70,
    height: 70,
    bottom: 20,
    marginStart: 10,
    aspectRatio: 1,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
  },
  carouselProfile: {
    width: 70,
    height: 70,
    top: 90,
    marginStart: 10,
    aspectRatio: 1,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white"
  },
  imageRadius: {
    borderRadius: 20,
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
    marginHorizontal: 10
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
  banner: {
    justifyContent: 'center',
    marginLeft: 10,
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
    opacity: 0.7,
  }
});

export default SinglePostItem;
