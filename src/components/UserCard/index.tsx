import { useTheme } from '@/hooks';
import { Colors } from '@/theme/Variables';
import { Follow, Following, Menu } from '@/theme/svg';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFollowSomeoneMutation, useUnfollowSomeoneMutation } from "@/services/modules/users"
import { useDispatch, useSelector } from 'react-redux';
import { logToCrashlytics, onTokenExpired } from '@/theme/Common';
import { ApplicationScreenProps } from 'types/navigation';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';


const UserCard = ({
    data,
    userAvatar,
    userName,
    score,
    menu,
    id,
    isFollowed,
    setIsFollowed
}:any, {route}: ApplicationScreenProps ) => {
  
    const {
        Fonts,
        Layout,
        Gutters
    } = useTheme()
    const navigation = useNavigation();
    const authData = useSelector((state:any)=> state.auth.authData)
    const [followSomeone, { isLoadingFollow }] = useFollowSomeoneMutation();
    const [unfollowSomeone, { isLoadingUnfollow }] = useUnfollowSomeoneMutation();
    const [refreshing, setRefreshing] = useState(false);
    const [following, setFollowing] = useState(isFollowed)
    const dispatch = useDispatch();
    const token = useSelector((state:any) => state.auth.token)
    const myUserId = useSelector((state:any) => state.auth.authData._id);
    const FollowBody = {
        followerId: myUserId,
        followingId: id
    }
    useEffect(() => {
      setFollowing(isFollowed);
    }, [isFollowed]);    

    const follow = async() => {
        setRefreshing(true)
        const result: any = await followSomeone({ body: FollowBody, token})
        if(result?.data?.statusCode === 200){
          setRefreshing(false);
          setFollowing(true)
          setIsFollowed(true);
        } else {
          setRefreshing(false);
          if(result?.error?.data){
            Alert.alert(result?.error?.data.message);
          }
          if(result?.error?.error){
            logToCrashlytics('Error! Could not follow user', result?.error?.error); 
            Alert.alert('Something went wrong!')
          }
          if(result?.error?.error && result.error.status === 401){
            onTokenExpired(dispatch);
          }
        }
      }
    
      /* unfollow a user */
    
      const unfollow = async() => {
        setRefreshing(true)
        const result: any = await unfollowSomeone({ body: FollowBody, token })
        if(result?.data?.statusCode === 200){
          setRefreshing(false);
          setFollowing(false)
          setIsFollowed(false);
        } else {
          setRefreshing(false);
          if(result?.error?.data){
            Alert.alert(result?.error?.data.message);
          }
          if(result?.error?.error){
            logToCrashlytics('Error! Could not unfollow user', result?.error?.error); 
            Alert.alert('Something went wrong!')
          }
          if(result?.error?.error && result.error.status === 401){
            onTokenExpired(dispatch);
          }
        }
      }

  const onPress = () => {
    
    navigation.navigate('UserProfile2', {id: id,isFollowed:route?.params?.isFollowed}) 
  }
    return (
        <View style={styles.userContainer}>
            <View style={Layout.flex02}>
            <TouchableOpacity onPress={onPress} >

                <Image source={{ uri: userAvatar }} style={styles.userAvatar} />
            </TouchableOpacity>
            </View>
            <View style={[Layout.flex08, Layout.alignItemsStart]}>
                <TouchableOpacity onPress={onPress} >
                <Text style={[styles.userName, Fonts.textWhite]}>{userName}</Text>
                {/* <Text style={styles.score}>{score}</Text> */}
                </TouchableOpacity>
            </View>
            <View style={[Layout.flex02,Layout.row,Layout.justifyContentEnd]}>
                {authData?._id !== id && 
                <View style={styles.followButton} >
                    {refreshing ? <ActivityIndicator size={18} style={{alignSelf:'center'}}/> : 
                    following ?
                    <TouchableOpacity onPress={() => unfollow()}>
                     <Following /> 
                     </TouchableOpacity>:
                     <TouchableOpacity onPress={() => follow()}>
                     <Follow />
                     </TouchableOpacity>}

                </View> }
                {menu ?
                <TouchableOpacity style={styles.followButton} >
                    <Menu />    
                </TouchableOpacity> : null
                }
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: "rgba(41, 41, 41, 0.6)",
    },
    score: {
        fontSize: 10,
        color: '#7D7D7D'
    },
    userName: {
        fontWeight: 'bold',
        marginRight: 10,
        color: Colors.white,
    },
    followButton: {
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
});

export default UserCard;
