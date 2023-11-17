import { View, Text } from 'react-native'
import React, { forwardRef, useMemo } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';

interface Props {
    title: string;
}

type Ref = BottomSheet;

const UseBS = forwardRef<Ref, Props>((props, ref) => {
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
  return (
    <View>
      <Text>UseBS</Text>
    </View>
  )
}
)

export default UseBS;