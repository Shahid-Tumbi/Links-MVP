import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

const SearchBarComponent: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');

  const onCancelSearch = () => {
    
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
        searchIcon={<Icon name="search" type="font-awesome" />}
        clearIcon={<Icon name="cancel" type="font-awesome" onPress={onCancelSearch} />}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  inputContainer: {
    backgroundColor: '#EDEDED',
  },
});

export default SearchBarComponent;
