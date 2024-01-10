import React from "react";
import { View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { SLIDER_WIDTH, ITEM_WIDTH} from "./CarouselConstants";

import CarouselCardItem from "./CarouselCardItem";

const CarouselCards = ({ data }: any) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center' }} >
      <Carousel
        layout={'default'}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        contentContainerCustomStyle={{ paddingHorizontal: 30 }}
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={1}
      />
    </View>
  );
};

export default CarouselCards;
