

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import SingleCurator from '../../components/SingleCurator/SingleCurator';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '@/theme/svg';
import { useTheme } from '@/hooks';
import SearchBarComponent from '@/components/SearchBar/SearchBar';
import UserCard from '@/components/UserCard';
import { Colors } from '@/theme/Variables';
import { useGetCuratorListMutation } from '@/services/modules/users';
import { useDispatch, useSelector } from 'react-redux';
import { logToCrashlytics, onTokenExpired } from '@/theme/Common';


const CuratorList = () => {
  const {
    Layout,
    Fonts,
    Gutters,
    darkMode: isDark,
  } = useTheme();
  const [curators, setCurators] = useState([
    { id: '1', userName: 'Tanmay Bhat', count: '0000' },
    { id: '2', userName: 'Tanmay Bhat', count: '0000' },
    { id: '3', userName: 'Tanmay Bhat', count: '0000' },
    { id: '4', userName: 'Tanmay Bhat', count: '0000' },
    { id: '5', userName: 'Tanmay Bhat', count: '0000' },
    { id: '6', userName: 'Tanmay Bhat', count: '0000' },
    // Add more curator data as needed
  ]);

  const [curatorList, setCuratorList] = useGetCuratorListMutation();
  const authData = useSelector((state:any) => state.auth.authData)
  const token = useSelector((state:any) => state.auth.token)
  const [refreshing, setRefreshing] = useState(false);
  const [displayCuratorList, setDisplayCuratorList] = useState([]);
  const dispatch = useDispatch();

  const getCuratorList = async() => {
    const result: any = await curatorList({token})
    if(result?.data?.statusCode === 200){
      setRefreshing(false);
      logToCrashlytics('fetching curator list')
      setDisplayCuratorList(prevState => [...prevState, ...result?.data?.result?.rows?.name]);

    }else {
      setRefreshing(false);
      if(result?.error?.data){
        Alert.alert(result?.error?.data.message);
      }
      if(result?.error?.error){
        logToCrashlytics('Error fetching user posts. Please try again, or try again later.', result?.error?.error);
        Alert.alert('Something went wrong!!');
      }
      if(result.error && result.error.status === 401){
        onTokenExpired(dispatch);
      }

    }
  }

  useEffect(() => {
    getCuratorList();
  }, []);

  const refreshFunction = () => {
    setRefreshing(true);
    setDisplayCuratorList([]); //
  }
 
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigation = useNavigation();

  const renderItem = ({ item }) => <SingleCurator {...item} />;
  const renderFocusedItem = ({ item }) => <UserCard userAvatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkms62ywj8noI96YorLX4kg6qHaHcq5lhoj_VYj9I0-A&s'} userName={item.userName} score={item.count} menu={false}/>;

  const ItemSeparator = () => <View style={styles.separator} />;

  const filteredCurators = curators.filter((curator) =>
    curator.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFocused = () => {
    setFocused(true)
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={[Layout.row, Gutters.regularMargin]}>
        <Logo style={[Gutters.tinyTMargin]} />
        <SearchBarComponent style={[Gutters.tinyLMargin]} onFocus={handleFocused} onBlur={()=>setFocused(false)} onCancel={()=>setFocused(false)}/>
      </View>
      <View style={[Gutters.regularHMargin]}>
        {focused ? <View>
          <View style={[Layout.row,Layout.scrollSpaceBetween]}>
          <Text style={[Fonts.textRegular, Fonts.textBold, Fonts.textWhite]}>Recent</Text>
          <Text style={[Fonts.textRegular, Fonts.textBold,{color:Colors.blue}]}>See All</Text>
          </View>
          <FlatList
              contentContainerStyle={{ marginTop: 30 }}
              data={filteredCurators}
              keyExtractor={(item) => item.id}
              renderItem={renderFocusedItem}
              ItemSeparatorComponent={ItemSeparator}
            />
          
        </View>
          :
          <View>
            <Text style={[Fonts.textRegular, Fonts.textBold, Fonts.textWhite]}>Explore Our Top Club Curators</Text>
            <FlatList
              contentContainerStyle={{ marginTop: 30 }}
              data={filteredCurators}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemSeparator}
            />
          </View>}
      </View>
    </KeyboardAvoidingView>
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

