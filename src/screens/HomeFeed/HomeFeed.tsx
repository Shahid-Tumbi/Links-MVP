import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProfileView from "../../components/SinglePost/SinglePostItem";
import CarouselMain from "@/components/Carousel/CarouselMain";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useTheme } from "@/hooks";
import { Logo, NotificationIcon } from "@/theme/svg";
import { globalStyles } from "@/theme/GlobalStyles";
import { SheetManager } from "react-native-actions-sheet";
import NewsSheet from "@/components/NewsSheet";
import debounce from 'lodash/debounce';
import Welcome from "../Welcome/Welcome";
import { ApplicationScreenProps } from "types/navigation";

const HomeFeed = ({ navigation,route }: ApplicationScreenProps) => {
  const { Layout, Fonts, Gutters, darkMode: isDark } = useTheme();
  const [welcomeScrern,setWelcomeScreen] = useState(true)
  // Sample data for user profiles
  const profiles = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      avatarUrl: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
      backgroundImageUrl:
        "https://www.istockphoto.com/photo/circuit-board-background-computer-data-technology-artificial-intelligence-gm1435226158-476624682?utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fbackgrounds&utm_medium=affiliate&utm_source=unsplash&utm_term=backgrounds%3A%3A%3A",
      tweets: 1234,
      following: 123,
      followers: 456,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },

    {
      id: 2,
      name: "John Doe",
      username: "johndoe",
      avatarUrl: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
      backgroundImageUrl: "https://via.placeholder.com/500",
      tweets: 1234,
      following: 123,
      followers: 456,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },

    {
      id: 3,
      name: "John Doe",
      username: "johndoe",
      avatarUrl: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
      backgroundImageUrl: "https://via.placeholder.com/500",
      tweets: 1234,
      following: 123,
      followers: 456,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const ItemSeparator = () => <View style={styles.separator} />;
  const renderProfile = ({ item }) => <ProfileView {...item} navigation={navigation}/>;

  const openActionSheet = debounce(() => {
    return SheetManager.show("NewsSheet");
  }, 300);

  const hideActionSheet = () => {
    SheetManager.hide("NewsSheet");
  };
  const onPress =() => {
    setWelcomeScreen(false)
  }
  return (
    <View style={[globalStyles.container]}>
      {welcomeScrern ? <Welcome navigation={navigation} route={route} onPress={onPress} /> : 
      <View style={[globalStyles.screenMargin]}>
        <View style={[Gutters.smallTMargin, Layout.fill]}>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <Logo />
            <NotificationIcon onPress={()=>navigation.navigate('NotificationsTwo')}/>
          </View>
          <ScrollView style={[Gutters.regularTMargin]}>
            <Text style={styles.textStyle}>OUR TOP 10 LINKS</Text>
            <CarouselMain />
            <Text
              style={[
                Fonts.textLarge,
                Fonts.textBold,
                Fonts.textWhite,
                Gutters.smallVMargin,
              ]}
            >
              Top Feed
            </Text>
            
              <FlatList
                data={profiles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProfile}
                ItemSeparatorComponent={ItemSeparator}
              />
            <NewsSheet
              // content={newsContent}
              onCancel={hideActionSheet}
            />
          </ScrollView>
        </View>
      </View> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  textStyle: {
    marginVertical: 10,
    marginEnd: 40,
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  separator: {
    height: 20,
    backgroundColor: "transparent",
  },
});

export default HomeFeed;
