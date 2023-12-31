


import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const UserProfile: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            style={styles.avatar}
            source={{uri: 'https://bootdey.com/img/Content/avatar/avatar2.png'}}  
          />
          <Text style={styles.name}>John Doe</Text>
        </View>
      </View>

      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Followers</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Links Uploaded</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Discussions Hosted</Text>
          <Text style={styles.count}>200</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 1</Text>
          </TouchableOpacity>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis,
            omittam deseruisse consequuntur ius an,  
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#00CED1',
  },

  headerContent: {
    padding: 30,
    alignItems: 'center' 
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63, 
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10
  },

  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600'
  },

  profileDetail: {
    alignSelf: 'center',
    marginTop: 200,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff'
  },

  detailContent: {
    margin: 10,
    alignItems: 'center'
  },

  title: {
    fontSize: 20,
    color: '#00CED1'
  },

  count: {
    fontSize: 18
  },

  body: {

  },

  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 40
  },

  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969'
  },

  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00CED1'
  },

  description: {
    fontSize: 20, 
    color: '#00CED1',
    marginTop: 10,
    textAlign: 'center'
  }

});

export default UserProfile;

