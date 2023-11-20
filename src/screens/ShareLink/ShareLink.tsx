// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {LinkPreview} from '@flyerhq/react-native-link-preview';

// const ShareLink = () => {
//   return (
//     <View style={styles.container}>
//       <LinkPreview
//         containerStyle={styles.previewContainer}
//         enableAnimation
//         text="https://pinterest.com"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewContainer: {
//     width: '80%',
//     backgroundColor: '#f7f7f8',
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
// });

// export default ShareLink;




// import React, { useState } from 'react';
// import { View, TextInput, Image, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
// import LinkPreview from '@flyerhq/react-native-link-preview';

// export default function ShareLink() {
//   const [url, setUrl] = useState<string>('');
//   const [linkPreview, setLinkPreview] = useState<any>();

//   const handleUrlChange = (text: string) => {
//     setUrl(text);
//     if (text) {
//       LinkPreview.onPreviewDataFetched(text)
//         .then(preview => {
//           setLinkPreview(preview);
//         })
//         .catch(() => {
//           setLinkPreview(null);
//         });
//     } else {
//       setLinkPreview(null);
//     }
//   };

//   return (
//     <KeyboardAvoidingView>
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter URL"
//         value={url}
//         onChangeText={handleUrlChange}
//       />

//       {linkPreview && (
//         <View style={styles.preview}>
//           <Image source={{ uri: linkPreview.image }} style={styles.image} />
//         </View>  
//       )}

//       <Button
//         title="POST Link"
//         disabled={!linkPreview}
//         onPress={() => console.log('Link posted!')}
//       />
//     </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16
//   },
//   input: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 16
//   },
//   preview: {
//     alignItems: 'center'
//   },
//   image: {
//     height: 200,
//     width: '100%'
//   }
// });

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Button, Alert } from 'react-native';
import { LinkPreview } from '@flyerhq/react-native-link-preview';

const ShareLink = () => {
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
    width: '80%',
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
});

export default ShareLink;

