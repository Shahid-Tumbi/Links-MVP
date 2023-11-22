import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProfileView from "../../components/SinglePost/SinglePostItem";
import CarouselMain from "@/components/Carousel/CarouselMain";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const HomeFeed: React.FC = () => {
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
  const renderProfile = ({ item }) => <ProfileView {...item} />;

  return (
    <View style={styles.container}>
        <Text style={styles.textStyle}>OUR TOP 10 LINKS</Text>
    
      <ScrollView contentContainerStyle={{marginTop: 30}}>
      <CarouselMain />
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProfile}
        ItemSeparatorComponent={ItemSeparator}
      />
      </ScrollView>
    </View>
      
   
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    flex: 1,
  },
  textStyle: {
    marginTop: 10,
    color: 'white',
    fontSize: 30,
    fontWeight: "bold"
  },
  separator: {
    height: 20,
    backgroundColor: 'transparent'
  }
})

export default HomeFeed;

