import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const test2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Comment</Text>
      <TextInput style={styles.input} placeholder="Add a comment" placeholderTextColor="#A0A0A0" />
      <View style={styles.line} />
      <View style={styles.characterCountContainer}>
        <Text style={styles.characterCountText}>60 characters</Text>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
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
        fontSize: 12
    }
});

export default test2;