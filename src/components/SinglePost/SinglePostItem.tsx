
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
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
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";

const SinglePostItem = ({
  data,
  number,
  carouselView
}: any) => {
  const navigation = useNavigation()
  const { Fonts, Layout, Gutters } = useTheme();
  const openActionSheet = debounce(() => {
    return SheetManager.show("NewsSheet",{payload:{linkUrl:data.link,summary:data?.gpt_summary}});
  }, 300);
  return (
    <View style={styles.container}>
      <View style={[carouselView && { margin: 6, height: 258 }]}>
        <TouchableWithoutFeedback onPress={openActionSheet}>
          <>
          <ImageBackground
            source={data?.image?{uri:data?.image}:require("../../../assets/pexels-daniel-absi-952670.jpg")}
            style={carouselView ? styles.carouselImage : styles.backImage}
            imageStyle={[styles.imageRadius, !carouselView && styles.imageOpacity]}>
            <View style={styles.UpperOverlayText}>
              <View style={[Layout.flex07, Layout.row]}>
                <Text style={styles.topLeftCorner}>{data?.readingTime || '0'} min read </Text>
                <Text style={styles.bullet}>.</Text>
                <Text style={styles.topLeftCornerDate}>{moment(data?.postPublished).format("DD MMM YYYY")}</Text>
              </View>
              <View style={[Layout.flex03, Layout.alignItemsEnd, Gutters.tinyRMargin]}>
                <Menu />
              </View>
            </View>
            <View style={styles.banner}>
              <Text style={carouselView ? styles.carouselBanner : styles.bannerText}>{data?.title || 'NCERT clarifies on India to Bharat name change: ‘Too premature to comment’'}</Text>
            </View>
          </ImageBackground>
          {carouselView && <Image
              source={data?.user_info?.profileImage ? {uri:data?.user_info?.profileImage }: require("../../../assets/Ellipse38.jpg")}
              style={styles.carouselProfile}
            />}
            {carouselView && <Text style={[styles.carouselNumbers]}>{number}</Text>}
            </>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('PostDetailScreen',{postData:data})}>
        <View style={styles.detailsContainer}>
            {!carouselView && <View style={[Layout.flex02]}>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile2')}>
              <Image
                source={data?.user_info?.profileImage ? {uri:data?.user_info?.profileImage } : require("../../../assets/Ellipse38.jpg")}
                style={styles.image}
              />
              </TouchableOpacity>
            </View>}

            <View style={[carouselView ? Layout.fill : Layout.flex08, Gutters.tinyVMargin, carouselView && Gutters.regularTMargin]}>
              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <View style={[carouselView && Layout.row]}>
                  <Text style={styles.username}>{data?.user_info?.name.charAt(0).toUpperCase() + data?.user_info?.name.slice(1) || 'Tanmay Bhat'}</Text>
                  <Text style={[Fonts.textTiny, carouselView ? Gutters.tinyLMargin : Gutters.smallLMargin, carouselView && Layout.alignSelfEnd]}>{data?.score || '0000'}</Text>
                </View>
                <View style={[Gutters.tinyRMargin, carouselView && Layout.alignSelfEnd]}>
                  <Text style={[Fonts.textTiny]}>{moment(data?.createdAt).fromNow()}</Text>
                </View>
              </View>
              <Text style={styles.bioDetails}>
               {data?.description || 'Investor, Comedian, Influencer, amongst other things. Live and let live.'}
              </Text>
              {carouselView && <Text style={styles.likeUpvotes}>
                {data?.likes || '0'} upvotes <Text style={styles.bullet}>{"\u2022"}</Text> {data?.dislikes || '0'} downvotes <Text style={styles.bullet}>{"\u2022"}</Text> {data?.totalComments || '0'} comments
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
              <UpvoteButton fill={data?.likes > 0 ? Colors.success : ""} />
            </TouchableOpacity>
            <TouchableOpacity style={[Gutters.tinyLMargin]}>
              <DownvoteButton fill={data?.dislikes > 0 ? Colors.error : ""} />
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
    bottom: 180,
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
    bottom: 55,
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
  topLeftCornerDate: {
    marginLeft: 5,
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
  },
  bullet: {
    fontSize: 12,
    color: "white",
  },
});

export default SinglePostItem;
