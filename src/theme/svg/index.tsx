import React from 'react';
import { Svg, SvgProps, Path } from 'react-native-svg';

export const RightArrow = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="m18.66 17-7.012-7.012 2.003-2.004L22.667 17l-9.016 9.016-2.003-2.005L18.66 17V17Z"
    />
  </Svg>
)