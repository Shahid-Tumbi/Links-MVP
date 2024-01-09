import { Dimensions } from "react-native"

// export const SLIDER_WIDTH = Dimensions.get('window').width - 40
export const SLIDER_WIDTH = Dimensions.get('window').width;
// export const ITEM_WIDTH = Math.round(SLIDER_WIDTH)
const totalItemMargin = 60;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7) - totalItemMargin;