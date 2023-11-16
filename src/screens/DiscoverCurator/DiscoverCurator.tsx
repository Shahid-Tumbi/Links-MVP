import React, {  useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
} from 'react-native'

export default ListWithSearchView = () => {
  const data = [
    {
      id: 1,
      icon: 'https://img.icons8.com/color/70/000000/cottage.png',
      description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
    },
    {
      id: 2,
      icon: 'https://img.icons8.com/color/70/000000/administrator-male.png',
      description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
    },
    {
      id: 3,
      icon: 'https://img.icons8.com/color/70/000000/filled-like.png',
      description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
    },
    {
      id: 4,
      icon: 'https://img.icons8.com/color/70/000000/facebook-like.png',
      description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
    },
    {
      id: 5,
      icon: 'https://img.icons8.com/color/70/000000/shutdown.png',
      description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
    },
    {
      id: 6,
      icon: 'https://img.icons8.com/color/70/000000/traffic-jam.png',
      description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
    },
    {
      id: 7,
      icon: 'https://img.icons8.com/dusk/70/000000/visual-game-boy.png',
      description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
    },
    {
      id: 8,
      icon: 'https://img.icons8.com/flat_round/70/000000/cow.png',
      description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
    },
    {
      id: 9,
      icon: 'https://img.icons8.com/color/70/000000/coworking.png',
      description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
    },
  ]

  const [results, setResults] = useState(data)
  const [query, setQuery] = useState()

  const showAlert = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId)
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <Image
            style={[styles.icon, styles.inputIcon]}
            source={{ uri: 'https://img.icons8.com/color/70/000000/search.png' }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Search..."
            underlineColorAndroid="transparent"
            onChangeText={name_address => setQuery({ name_address })}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => showAlert('search')}>
          <Image
            style={[styles.icon, styles.iconBtnSearch]}
            source={{ uri: 'https://img.icons8.com/color/70/000000/search.png' }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.notificationList}
        enableEmptySections={true}
        data={results}
        renderItem={({ item }) => {
          return (
            <View style={styles.notificationBox}>
              <Image style={styles.image} source={{ uri: item.icon }} />
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  saveButton: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 70,
    alignSelf: 'flex-end',
    backgroundColor: '#40E0D0',
    borderRadius: 30,
  },
  saveButtonText: {
    color: 'white',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
  },
  image: {
    width: 45,
    height: 45,
  },
  description: {
    fontSize: 18,
    color: '#3498db',
    marginLeft: 10,
  },
})