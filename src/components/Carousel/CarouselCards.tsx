import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselConstants'

import CarouselCardItem from './CarouselCardItem'

const CarouselCards = ({data}:any) => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout="default"
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
    </View>
  )
}

export default CarouselCards;