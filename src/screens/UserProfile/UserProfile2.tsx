import WhiteLine from "@/components/WhiteLine/WhiteLine";
import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import ProfileView from "../../components/SinglePost/SinglePostItem";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const ProfileDetail = () => {
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
        <ScrollView>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}></Text>
        </View>
        <View style={styles.reference}>
          <Text style={styles.referredBy}>Referred by Nikhil Kamath</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Tanmay Bhat</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Credibility Score:</Text>
          <Text style={styles.infoText}>1234</Text>
        </View>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>1234</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>123</Text>
            <Text style={styles.statLabel}> Links Uploaded</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>456</Text>
            <Text style={styles.statLabel}>Discussions Hosted</Text>
          </View>
        </View>
      </View>
      <WhiteLine />
      <View style={styles.recentLinksContainer}>
        <Text style={styles.recentLinks}>Recent Links</Text>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  body: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 89,
    height: 89,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 72,
    fontWeight: "700",
  },
  nameContainer: {
    marginTop: 0,
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "bold",
    marginRight: 5,
  },
  reference: {
    marginTop: 8,
    alignItems: "center",
  },
  referredBy: {
    color: "#999999",
    fontSize: 8,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
  },
  statValue: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  recentLinksContainer: {
    justifyContent: "flex-start",
  },
  recentLinks: {
    fontWeight: "bold",
    fontSize: 16,
    color: 'white',
    marginLeft: 20,
    marginBottom: 40,
  },
  separator: {
    height: 20,
    backgroundColor: 'transparent'
  }
});

export default ProfileDetail;
