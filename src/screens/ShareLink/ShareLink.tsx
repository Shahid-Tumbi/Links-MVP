// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {LinkPreview} from '@flyerhq/react-native-link-preview';

// const App = () => {
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

// export default App;




import React, { useState } from 'react';
import { View, TextInput, Image, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import LinkPreview from '@flyerhq/react-native-link-preview';

export default function ShareLink() {
  const [url, setUrl] = useState<string>('');
  const [linkPreview, setLinkPreview] = useState<any>();

  const handleUrlChange = (text: string) => {
    setUrl(text);
    if (text) {
      LinkPreview.getPreview(text)
        .then(preview => {
          setLinkPreview(preview);
        })
        .catch(() => {
          setLinkPreview(null);
        });
    } else {
      setLinkPreview(null);
    }
  };

  return (
    <KeyboardAvoidingView>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter URL"
        value={url}
        onChangeText={handleUrlChange}
      />

      {linkPreview && (
        <View style={styles.preview}>
          <Image source={{ uri: linkPreview.image }} style={styles.image} />
        </View>  
      )}

      <Button
        title="POST Link"
        disabled={!linkPreview}
        onPress={() => console.log('Link posted!')}
      />
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16
  },
  preview: {
    alignItems: 'center'
  },
  image: {
    height: 200,
    width: '100%'
  }
});
