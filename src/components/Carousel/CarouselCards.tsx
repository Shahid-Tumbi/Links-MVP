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
        layout={'default'}
        ref={isCarousel}
        data={data}
        renderItem={({ item, index }) => <CarouselCardItem item={item} index={index} data={data} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        contentContainerCustomStyle={{ paddingHorizontal: 30 }}
      />
    </View>
  )
}

export default CarouselCards;