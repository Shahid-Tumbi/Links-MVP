import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const ThreeDotLoader = () => {
  const [dot1] = useState(new Animated.Value(0));
  const [dot2] = useState(new Animated.Value(0));
  const [dot3] = useState(new Animated.Value(0));

  const animateDots = () => {
    Animated.sequence([
      Animated.timing(dot1, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(dot2, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(dot3, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      dot1.setValue(0);
      dot2.setValue(0);
      dot3.setValue(0);
      animateDots();
    });
  };

  useEffect(() => {
    animateDots();
  }, []);

  const dot1Style = {
    opacity: dot1,
  };

  const dot2Style = {
    opacity: dot2,
  };

  const dot3Style = {
    opacity: dot3,
  };

  return (
    <View style={styles.loader}>
      <Animated.View style={[styles.dot, dot1Style]} />
      <Animated.View style={[styles.dot, dot2Style]} />
      <Animated.View style={[styles.dot, dot3Style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:10
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 3,
  },
});

export default ThreeDotLoader;
