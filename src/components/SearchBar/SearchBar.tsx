import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

const SearchBarComponent: React.FC = ({style=[],onFocus,onBlur,onCancel}:any) => {
  const [searchText, setSearchText] = useState<string>('');

  const onCancelSearch = () => {
    
    setSearchText('');
    onCancel()
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={[styles.inputContainer,...style]}
        style={[styles.placeHolderContainer]}
        searchIcon={<Icon name="search" size={16} type="font-awesome" color={'rgba(255, 255, 255, 0.5)'} />}
        clearIcon={<Icon name="cancel" type="MaterialCommunityIcons" color={'rgba(255, 255, 255, 0.5)'} onPress={onCancelSearch} />}
        onFocus={onFocus}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeHolderContainer:{
    fontSize:16,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  inputContainer: {
    backgroundColor: 'rgba(30, 30, 32, 1)',
    height:36,
    fontSize:14
  },
});

export default SearchBarComponent;
