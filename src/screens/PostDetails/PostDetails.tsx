import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LinkPreview} from '@flyerhq/react-native-link-preview';

const App = () => {
  return (
    <View style={styles.container}>
      <LinkPreview
        containerStyle={styles.previewContainer}
        enableAnimation
        text="https://grishaev.me/en/ddd-lie"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: '80%',
    backgroundColor: '#f7f7f8',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default App;