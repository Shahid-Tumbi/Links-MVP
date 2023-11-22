// import React from 'react';
// import { FlatList } from 'react-native';
// import ProfileView from '../../components/SinglePost/SinglePostItem';

// const HomeFeed: React.FC = () => {
//   // Sample data for user profiles
//   const profiles = [
//     {
//       id: 1,
//       name: 'John Doe',
//       username: 'johndoe',
//       avatarUrl: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
//       backgroundImageUrl: 'https://www.istockphoto.com/photo/circuit-board-background-computer-data-technology-artificial-intelligence-gm1435226158-476624682?utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fbackgrounds&utm_medium=affiliate&utm_source=unsplash&utm_term=backgrounds%3A%3A%3A',
//       tweets: 1234,
//       following: 123,
//       followers: 456,
//       bio:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     },

//     {
//       id: 2,
//       name: 'John Doe',
//       username: 'johndoe',
//       avatarUrl: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
//       backgroundImageUrl: 'https://via.placeholder.com/500',
//       tweets: 1234,
//       following: 123,
//       followers: 456,
//       bio:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     },

//     {
//       id: 3,
//       name: 'John Doe',
//       username: 'johndoe',
//       avatarUrl: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
//       backgroundImageUrl: 'https://via.placeholder.com/500',
//       tweets: 1234,
//       following: 123,
//       followers: 456,
//       bio:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     },

//   ];

//   const renderProfile = ({ item }) => <ProfileView {...item} />;

//   return (
//     <FlatList
//       data={profiles}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderProfile}
//     />
//   );
// };

// export default HomeFeed;

import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import ProfileView from "../../components/SinglePost/SinglePostItem";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";

interface Entry {
  title: string;
  subtitle: string;
  illustration: string;
}

const ENTRIES1: Entry[] = [
  {
    title: "Beautiful and dramatic Antelope Canyon",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: require("../../../assets/pexels-pixmike-413195.jpg"),
  },
  {
    title: "Earlier this morning, NYC",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: require("../../../assets/pexels-pixmike-413195.jpg"),
  },
  {
    title: "White Pocket Sunset",
    subtitle: "Lorem ipsum dolor sit amet et nuncat ",
    illustration: require("../../../assets/pexels-pixmike-413195.jpg"),
  },
  {
    title: "Acrocorinth, Greece",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: require("../../../assets/pexels-pixmike-413195.jpg"),
  },
  {
    title: "The lone tree, majestic landscape of New Zealand",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: require("../../../assets/pexels-pixmike-413195.jpg"),
  },
];

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

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  // const carouselRef = useRef<Carousel<Entry> | null>(null);

  // const goForward = () => {
  //   carouselRef.current?.snapToNext();
  // };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = (
    { item, index }: { item: Entry; index: number },
    parallaxProps: any
  ) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item.illustration}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  const renderProfile = ({ item }) => <ProfileView {...item} />;

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={goForward}>
        <Text>go to next slide</Text>
      </TouchableOpacity> */}
      <View>
      <Carousel
        //ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
      </View>
      <View style={styles.listContainer}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProfile}
      />
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginTop: 20,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  title: {
    color: "black", // Adjust the color as needed
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});

export default MyCarousel;
