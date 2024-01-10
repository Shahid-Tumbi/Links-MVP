import React, { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import CarouselCards from "./CarouselCards";

export default function CarouselMain({ data }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <CarouselCards data={data} />
    </SafeAreaView>
  );
}
