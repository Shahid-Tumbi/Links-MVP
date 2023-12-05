import { Alert, FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/hooks';
import ProfileView from "../../components/SinglePost/SinglePostItem";
import SearchBarComponent from '@/components/SearchBar/SearchBar';
import { Logo } from '@/theme/svg';
import { Colors } from '@/theme/Variables';
import { useGetUserWisePostListMutation } from '@/services/modules/post';
import { useDispatch, useSelector } from 'react-redux';
import { logToCrashlytics, onTokenExpired } from '@/theme/Common';

const DiscoverCuratorPost = () => {
    const {
        Layout,
        Fonts,
        Gutters,
        darkMode: isDark,
      } = useTheme();

      const [searchQuery, setSearchQuery] = useState('');
      const [focused, setFocused] = useState(false);
      const handleFocused = () => {
        setFocused(true)
      }

      const profiles = [
        {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          avatarUrl: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
          backgroundImageUrl:
            "https://www.istockphoto.com/photo/circuit-board-background-computer-data-technology-artificial-intelligence-gm1435226158-476624682?utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fbackgrounds&utm_medium=affiliate&utm_source=unsplash&utm_term=backgrounds%3A%3A%3A",
          tweets: 1234,
          following: 123,
          followers: 456,
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
    
        {
          id: 2,
          name: "John Doe",
          username: "johndoe",
          avatarUrl: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
          backgroundImageUrl: "https://via.placeholder.com/500",
          tweets: 1234,
          following: 123,
          followers: 456,
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
    
        {
          id: 3,
          name: "John Doe",
          username: "johndoe",
          avatarUrl: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
          backgroundImageUrl: "https://via.placeholder.com/500",
          tweets: 1234,
          following: 123,
          followers: 456,
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      ];

  const ItemSeparator = () => <View style={styles.separator} />;
  const renderProfile = ({ item }) => <ProfileView {...item} />;

  const [userWisePostList, { isLoading }] = useGetUserWisePostListMutation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const authData = useSelector((state:any) => state.auth.authData)
  const token = useSelector((state:any) => state.auth.token)
  const [refreshing, setRefreshing] = useState(false);
  const [userPostList, setUserPostList] = useState([]);
  const dispatch = useDispatch();

  const getUserWisePostList = async(page: any) => {
    setPage(page);
    const result: any = await userWisePostList({page, limit, token})
    if(result?.data?.statusCode === 200){
      setRefreshing(false);
      logToCrashlytics('fetching requested user posts');
      if(page === 1) {
        setUserPostList(result?.data?.result?.rows);
      } else {
        setUserPostList(prevState => [...prevState, ...result?.data?.result?.rows]);
      }
    } else {
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
    getUserWisePostList(1)
  }, [])

  const onComplete = () => {
    getUserWisePostList(page + 1);
  }

  const refreshFunction = () => {
    setRefreshing(true);
    setUserPostList([]);
    getUserWisePostList(1);
  }
 



  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={[Layout.row, Gutters.regularMargin]}>
        <Logo style={[Gutters.tinyTMargin]} />
        <SearchBarComponent style={[Gutters.tinyLMargin]} onFocus={handleFocused} onBlur={()=>setFocused(false)} onCancel={()=>setFocused(false)}/>
      </View>
      <View style={[Gutters.regularHMargin]}>
       <View style={styles.cleanUp}>
          <View style={[Layout.row,Layout.scrollSpaceBetween]}>
          <Text style={[Fonts.textRegular, Fonts.textWhite]}>Results for #war</Text>
          <Text style={[Fonts.textRegular, Fonts.textBold,{color:Colors.blue}]}>See All</Text>
          </View>
          <View style={styles.flat}>
          <FlatList
              data={profiles}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProfile}
              ItemSeparatorComponent={ItemSeparator}
            />
            </View>
          </View>
          
          </View>
          </KeyboardAvoidingView>
  )
}

export default DiscoverCuratorPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
      },
    cleanUp: {
        marginTop: -25
    },
    flat: {
        marginTop: 20
    },
      searchBar: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        color: 'white',
      },
    separator: {
        height: 20,
        backgroundColor: 'transparent'
      },

})