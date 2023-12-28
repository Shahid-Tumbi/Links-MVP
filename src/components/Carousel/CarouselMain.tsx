import React, { useContext, useEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet } from 'react-native'
import CarouselCards from './CarouselCards'
import LikeDislikeContext from '@/Context/UpdateLikeDislikeContext';



export default function CarouselMain({data}:any) {
 
  return (
    <SafeAreaView>
      <CarouselCards data={data}/>
      </SafeAreaView>
    
  );
}

