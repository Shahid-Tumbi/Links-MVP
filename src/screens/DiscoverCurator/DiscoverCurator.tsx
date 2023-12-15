

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import SingleCurator from '../../components/SingleCurator/SingleCurator';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '@/theme/svg';
import { useTheme } from '@/hooks';
import SearchBarComponent from '@/components/SearchBar/SearchBar';
import UserCard from '@/components/UserCard';
import { Colors } from '@/theme/Variables';
import { useGetCuratorListMutation, useGetCuratorSearchListMutation } from '@/services/modules/users';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAvatar, logToCrashlytics, onTokenExpired } from '@/theme/Common';

const CuratorList = () => {
  const {
    Layout,
    Fonts,
    Gutters,
    darkMode: isDark,
  } = useTheme();

  const [getCuratorList, setCuratorList] = useGetCuratorListMutation();
  const [getSearchList] = useGetCuratorSearchListMutation();
  const authData = useSelector((state:any) => state.auth.authData)
  const token = useSelector((state:any) => state.auth.token)
  const [refreshing, setRefreshing] = useState(false);
  const [displayCuratorList, setDisplayCuratorList] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchpage, setSearcgPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigation = useNavigation();

  const getCuratorListMethod = async(page: any) => {
    setPage(page)
    const result: any = await getCuratorList({token})
    console.log('making get curator call');
    console.log(result);
    if(result?.data?.statusCode === 200){
      setRefreshing(false);
      logToCrashlytics('fetching curator list')
      if(page === 1){
        setDisplayCuratorList(result?.data?.result?.rows)
      } else {
        // setDisplayCuratorList(prevState => [...prevState, ...result?.data?.result?.rows]);
      }
      
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
    getCuratorListMethod(1);
  }, []);
  useEffect(() => {
   getSearchCurators(searchQuery)
   
  }, [searchQuery]);

  const refreshFunction = () => {
    setRefreshing(true);
    setDisplayCuratorList([]); //
    getCuratorListMethod(1);
  }

  const onComplete = () => {
    getCuratorListMethod(page + 1);
  }
 

  const renderItem = ({ item }) => <SingleCurator {...item} />;
  const renderFocusedItem = ({ item }) => <UserCard userAvatar={item?.profileImage || defaultAvatar} userName={item.name} score={item.count} menu={false} id={item?._id}/>;
  const renderProfileDynamic = ({item, index}: any) => <SingleCurator data={item} number={index+1} navigation={navigation} />;

  const ItemSeparator = () => <View style={styles.separator} />;

  const filteredCurators = displayCuratorList.filter((curator) =>
    curator?.result?.rows[0]?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSearchCurators =  async (searchQuery) => {
    if(searchQuery){
    setFocused(true)
    const result: any = await getSearchList({string:searchQuery.toString(),token,page:searchpage,limit})
    if(result?.data?.statusCode === 200){
      setRefreshing(false);
      logToCrashlytics('fetching curator list')
      // if(page === 1){
        setFilteredResults(result?.data?.result?.rows)
      // } else {
        // setFilteredResults(prevState => [...prevState, ...result?.data?.result?.rows]);
      // }
      
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
  }

  const handleFocused = () => {
    // setFocused(true)
  }

 
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={[Layout.row, Gutters.regularMargin]}>
        <Logo style={[Gutters.tinyTMargin]} />
        <SearchBarComponent value={searchQuery} style={[Gutters.tinyLMargin]} onFocus={handleFocused} onBlur={()=>setFocused(false)} onCancel={()=>{
          setSearchQuery('') 
          setFocused(false)}} onChange={(e) => setSearchQuery(e)}/>
      </View>
      <View style={[Gutters.regularHMargin,Layout.fill]}>
        {focused ? <View>
          <View style={[Layout.row,Layout.scrollSpaceBetween]}>
            <Text style={[Fonts.textRegular, Fonts.textBold, Fonts.textWhite]}>Recent</Text>
            <Text style={[Fonts.textRegular, Fonts.textBold,{color:Colors.blue}]}>See All</Text>
          </View>
          <FlatList
              contentContainerStyle={{ marginTop: 30 }}
              data={ filteredResults }
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderFocusedItem}
              ItemSeparatorComponent={ItemSeparator}
              nestedScrollEnabled
              // onEndReached={onComplete}
              onEndReachedThreshold={0.1}
              ListEmptyComponent={ () => filteredCurators.length > 1 ? <ActivityIndicator size={25} color={Colors.blue} /> : <Text style={[Fonts.textSmall, Fonts.textWhite]}>No data found</Text>}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={refreshing}
              //     onRefresh={refreshFunction}
              //   />
              // }
              
            />
          
        </View>
          :
          <View style={[Layout.fill]}>
            <Text style={[Fonts.textRegular, Fonts.textBold, Fonts.textWhite]}>Explore Our Top Club Curators</Text>
            <FlatList
              contentContainerStyle={{ marginTop: 30 }}
              data={displayCuratorList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderProfileDynamic}
              ItemSeparatorComponent={ItemSeparator}
              onEndReached={onComplete}
              onEndReachedThreshold={0.4}
              ListEmptyComponent={ () => displayCuratorList.length > 1 ? <ActivityIndicator size={25} color={Colors.blue} /> : <Text style={[Fonts.textSmall, Fonts.textWhite]}>No data found</Text>}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refreshFunction}
                />
              }
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

