import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import SinglePostItem from '../SinglePost/SinglePostItem';
import LinearGradient from 'react-native-linear-gradient';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({item, index}) => {
  return (
    <LinearGradient colors={["rgba(151, 71, 255, 0.65)","rgba(0, 0, 0, 1)"]} style={styles.container} key={index}>
      <SinglePostItem data={item} number={index+1} carouselView={true} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    color: 'white',
    borderRadius: 30,
    width: ITEM_WIDTH,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
    borderRadius: 30,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    marginTop: -80,
    marginLeft: 10
  },
  header: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
    marginTop: -17,
    marginLeft: -10,
  },
  body: {
    marginTop: 5,
    color: "white",
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: -10
  }
})

export default CarouselCardItem