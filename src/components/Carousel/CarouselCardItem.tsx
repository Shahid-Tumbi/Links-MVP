import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import SinglePostItem from "../SinglePost/SinglePostItem";
import LinearGradient from "react-native-linear-gradient";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({ item, index }) => {

  return (
    <LinearGradient
      colors={["rgba(151, 71, 255, 0.65)", "rgba(0, 0, 0, 1)"]}
      style={styles.container}
      key={index}
    >
      <SinglePostItem data={item} number={index + 1} carouselView={true} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    width: ITEM_WIDTH,
    paddingBottom: 20,
  },
});

export default CarouselCardItem;
