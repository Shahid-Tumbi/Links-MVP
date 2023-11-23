import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import {
  UpvoteNotification,
  TrendingNotification,
  DiscussionNotification,
} from "@/theme/svg";
import { ScrollView } from "react-native-gesture-handler";

const Notifications = () => {
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.New}>
          <Text style={styles.NewText}>New</Text>
        </View>
        <TouchableOpacity style={styles.container}>
          <UpvoteNotification />

          <View style={styles.verticalLine} />
          <View style={styles.content}>
            <View>
              <View style={styles.text}>
                <Text style={styles.name}>123 people upvoted your link</Text>
                <Text style={styles.NotificationContent}>
                  Billions of blue blistering barnacles, thundering typhoons on
                  salted seas
                </Text>
              </View>
              <Text style={styles.LowerNotification}>
                You don't wanna miss this!
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.New}>
          <Text style={styles.NewText}>Yesterday</Text>
        </View>
        <TouchableOpacity style={styles.container}>
          <DiscussionNotification />

          <View style={styles.verticalLine} />
          <View style={styles.content}>
            <View>
              <View style={styles.text}>
                <Text style={styles.name}>
                  250 people joined your discussion
                </Text>
                <Text style={styles.NotificationContent}>
                  Billions of blue blistering barnacles, thundering typhoons on
                  salted seas
                </Text>
              </View>
              <Text style={styles.LowerNotification}>
                You don't wanna miss this!
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <TrendingNotification />

          <View style={styles.verticalLine} />
          <View style={styles.content}>
            <View>
              <View style={styles.text}>
                <Text style={styles.name}>Your Link is trending at No. 1</Text>
                <Text style={styles.NotificationContent}>
                  Billions of blue blistering barnacles, thundering typhoons on
                  salted seas
                </Text>
              </View>
              <Text style={styles.LowerNotification}>
                You don't wanna miss this!
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.New}>
          <Text style={styles.NewText}>7 days ago</Text>
        </View>
        <TouchableOpacity style={styles.container}>
          <TrendingNotification />

          <View style={styles.verticalLine} />
          <View style={styles.content}>
            <View>
              <View style={styles.text}>
                <Text style={styles.name}>Your Link is trending at No. 1</Text>
                <Text style={styles.NotificationContent}>
                  Billions of blue blistering barnacles, thundering typhoons on
                  salted seas
                </Text>
              </View>
              <Text style={styles.LowerNotification}>
                You don't wanna miss this!
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "flex-start",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  // attachment: {
  //   position: 'absolute',
  //   right: 0,
  //   height: 50,
  //   width: 50,
  // },
  // separator: {
  //   height: 0.5,
  //   backgroundColor: '#999999',
  // },
  LowerNotification: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  name: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  verticalLine: {
    width: 0.5,
    height: "100%",
    backgroundColor: "#CCCCCC",
    marginRight: 10,
    marginLeft: 12,
  },
  NotificationContent: {
    color: "#1E90FF",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
  New: {
    marginLeft: 15,
    marginTop: 20,
  },
  NewText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
});

export default Notifications;
