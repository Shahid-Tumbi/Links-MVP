

import React, { useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import SingleCurator from '../../components/SingleCurator/SingleCurator';
import { useNavigation } from '@react-navigation/native';

const CuratorList = () => {
  const [curators, setCurators] = useState([
    { id: '1', userName: 'Tanmay Bhat', count: '0000' },
    { id: '2', userName: 'Tanmay Bhat', count: '0000' },
    { id: '3', userName: 'Tanmay Bhat', count: '0000' },
    { id: '4', userName: 'Tanmay Bhat', count: '0000' },
    { id: '5', userName: 'Tanmay Bhat', count: '0000' },
    { id: '6', userName: 'Tanmay Bhat', count: '0000' },
    // Add more curator data as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const renderItem = ({ item }) => <SingleCurator {...item} />;

  const ItemSeparator = () => <View style={styles.separator} />;

  const filteredCurators = curators.filter((curator) =>
    curator.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     handleSearchBarOptions: {
  //       placeholder: 'Search users',
  //     },
  //   });
  // }, [navigation]);

  return (
    <View style={styles.container}>
      {<TextInput
        style={styles.searchBar}
        placeholder="Search Curators"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      /> }
      <FlatList
        contentContainerStyle={{ marginTop: 30 }}
        data={filteredCurators}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  searchBar: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    color: 'white',
  },
  separator: {
    height: 16,
    backgroundColor: 'transparent'
  }
});

export default CuratorList;

