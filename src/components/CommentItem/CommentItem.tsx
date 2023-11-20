
import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';



interface Props {
  avatar: string;
  text: string;
}

export default function Comment({ avatar, text }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.comment}>
        <Text>{text}</Text>
      </View>
    </View>
  );
}

const styles =  StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  comment: {
    marginLeft: 8,
    flex: 1
  }
});
