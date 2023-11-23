import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const CommentInput = () => {
  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Comment</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Type your comment here..."
          onChangeText={(text) => setComment(text)}
        />
        <Text style={styles.characterCount}>{comment.length}/60 characters</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 5,
    width: '100%', // Cover entire screen width
  },
  characterCount: {
    marginLeft: 10,
    color: 'gray',
  },
});

export default CommentInput;
