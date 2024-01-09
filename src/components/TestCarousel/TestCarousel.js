import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";

import { views1 } from "./viewdata";

const renderItem1 = ({ item }) => {
   return (
      <View style={styles.renderItem1_parentView}>
         <Image source={{ uri: item.imgUrl }} style={styles.renderItem1_img} />
         <View style={styles.renderItem1_view1}>
            <Text style={styles.renderItem1_text1}>OFFERS</Text>
         </View>
         <View style={styles.renderItem1_view2}>
            <Text style={styles.renderItem1_text2}>{item.title}</Text>
            <TouchableOpacity>
               <Text style={styles.renderItem1_text3}>EXPLORE OFFERS</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const TestCarousel = () => {
   return (
      <View
         style={{
            flex: 1,
            backgroundColor: "#f2f2f2",
            alignItems: "center",
            padding: 20,
         }}>
         <Carousel
            layout={"default"}
            data={views1}
            renderItem={renderItem1}
            sliderWidth={400}
            itemWidth={350}
         />
      </View>
   );
};

export default TestCarousel;

const styles = StyleSheet.create({
   renderItem1_parentView: {
      backgroundColor: "#ffffff",
      borderRadius: 18,
      height: 250,
      width: 350,
      justifyContent: "space-around",
      alignItems: "center",
      overflow: "hidden",
   },
   renderItem1_view1: {
      width: 80,
      position: "absolute",
      fontSize: 20,
      top: 10,
      right: 20,
      backgroundColor: "#ffffff",
      borderRadius: 18,
      alignItems: "center",
   },
   renderItem1_view2: {
      width: 350,
      flexDirection: "row",
      justifyContent: "space-around",
   },
   renderItem1_img: {
      width: 350,
      height: 200,
   },
   renderItem1_text1: {
      fontWeight: "700",
      color: "#000000",
   },
   renderItem1_text2: {
      marginVertical: 10,
      fontSize: 20,
      fontWeight: "bold",
   },
   renderItem1_text3: {
      marginVertical: 12,
      color: "blue",
      fontWeight: "bold",
   },
});
