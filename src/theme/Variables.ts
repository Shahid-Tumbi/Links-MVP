/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { ThemeNavigationColors } from '../../@types/theme';

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#1B1C21',
  white: '#ffffff',
  gray: "#1c1c22",
  dimGray: "#525866",
  lightGray:"#7F7F7F",
  yellow:'#FFDB1F',
  green:'#008000',
  blue:'#3252E8',
  //Typography
  textGray800: '#000000',
  textGray400: "rgba(255, 255, 255, 0.6)",
  textGray200: "#1c1c22",
  primary: "#000",
  success: '#28a745',
  error: '#FF0000',
  //ComponentColors
  blueButtonColor:'#3252E8',
  grayButtonColor:'#373737',
  circleButtonBackground: '#E1E1EF',
  circleButtonColor: '#44427D',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: '#EFEFEF',
  card: '#EFEFEF',
};
/* fonts family */
export const FontFamily = {
  sFPro: "SF Pro",
};

/**
 * FontSize
 */
export const FontSize = {
  little:10,
  tiny: 12,
  small: 14,
  regular: 16,
  large: 20,
  veryLarge: 30
};

/**
 * Metrics Sizes
 */
const tiny = 10;
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const large = 50; // 60
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
