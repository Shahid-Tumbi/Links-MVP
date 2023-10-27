import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Colors } from '@/theme/Variables';
import { TouchableHighlight } from 'react-native-gesture-handler';

const CommonButton = ({
  activeopacity,
  fontcolor,
  fontweight,
  paddingHorizontalView,
  margintop,
  backgroundcolor,
  text,
  paddinghorizontal,
  paddingvertical,
  borderradius,
  fontsize,
  marginstart,
  marginbottom,
  onPressData,
  borderwidth,
} : any) => {
  return (
    <TouchableHighlight
      activeOpacity={activeopacity ? activeopacity : 0}
      onPress={() => {
        onPressData != undefined ? onPressData() : null;
      }}
      style={{
        marginTop: margintop ? margintop : 10,
        marginStart: marginstart ? marginstart : 0,
        marginBottom: marginbottom ? marginbottom : 0,
      }}>
      <View
        style={[
          styles.buttonContainer,
          {
            backgroundColor: backgroundcolor ? backgroundcolor : Colors.error,
            borderRadius: borderradius ? borderradius : 8,
            borderWidth: borderwidth ? borderwidth : 0,
            paddingHorizontal: paddingHorizontalView
              ? paddingHorizontalView
              : 0,
          },
        ]}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: fontsize ? fontsize : 12,
            color: fontcolor ? fontcolor : Colors.white,
            paddingVertical: paddingvertical ? paddingvertical : 10,
            fontWeight: fontweight ? fontweight : '600',
            paddingHorizontal: paddinghorizontal ? paddinghorizontal : 10,
            textAlign: 'center',
          }}>
          {text ? text : ' '}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommonButton;
