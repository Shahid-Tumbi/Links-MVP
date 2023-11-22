import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const CommentInput = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a comment again"
        placeholderTextColor="#A0A0A0"
      />
      <View style={styles.line} />
      <View style={styles.characterCountContainer}>
        <Text style={styles.characterCountText}>60 characters</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
  },
  line: {
    height: 1,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 15,
  },
  characterCountContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
   
  },
  characterCountText: {
    color: 'black',
    fontSize: 12,
  },
});

export default CommentInput;
