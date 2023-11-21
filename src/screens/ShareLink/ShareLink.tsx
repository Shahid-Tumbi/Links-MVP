

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Button, Alert, Text } from 'react-native';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { ApplicationScreenProps } from 'types/navigation';
import useTheme from '@/hooks/useTheme';
import { globalStyles } from '@/theme/GlobalStyles';

const ShareLink = ({navigation}: ApplicationScreenProps) => {
  const {
    Layout,
    Fonts,
    Gutters,
    darkMode: isDark,
} = useTheme();
  const [link, setLink] = useState('');
  const [comment, setComment] = useState('');

  const handleLinkChange = (text) => {
    setLink(text);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const isUrlValid = (url) => {
    // Basic URL validation using a regular expression
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return urlRegex.test(url.trim());
  };

  const handlePostItem = () => {
    if (isUrlValid(link)) {
      // Perform actions for posting the item
      Alert.alert('Item Posted', `Link: ${link}\nComment: ${comment}`);
    } else {
      Alert.alert('Invalid URL', 'Please enter a valid URL');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        <Text style={styles.textStyle}>Share a Link</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter link here"
        value={link}
        onChangeText={handleLinkChange}
      />
      <View style={styles.previewContainer}>
        <LinkPreview
          containerStyle={styles.linkPreviewContainer}
          enableAnimation
          text={link}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={comment}
        onChangeText={handleCommentChange}
        multiline
      />
      <Button
        title="Post Item"
        onPress={handlePostItem}
        disabled={!isUrlValid(link)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
    width: '80%',
    color: 'white',
  },
  previewContainer: {
    width: '80%',
    backgroundColor: '#f7f7f8',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  linkPreviewContainer: {
    flex: 1,
  },
  textStyle: {
    color: 'white',
    
  }
});

export default ShareLink;

