import { useTheme } from '@/hooks';
import { Colors } from '@/theme/Variables';
import { Follow, Following, Menu } from '@/theme/svg';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFollowSomeoneMutation, useUnfollowSomeoneMutation } from "@/services/modules/users"
import { useDispatch, useSelector } from 'react-redux';
import { logToCrashlytics, onTokenExpired } from '@/theme/Common';
import { ApplicationScreenProps } from 'types/navigation';
import { useNavigation } from '@react-navigation/native';


const UserCard = ({
    userAvatar,
    userName,
    score,
    menu
}:any, {route, navigation} : ApplicationScreenProps) => {
    const [following, setFollowing] = useState(false)
    const {
        Fonts,
        Layout,
        Gutters
    } = useTheme()
  
  //   const [followSomeone, { isLoadingFollow }] = useFollowSomeoneMutation();
  //   const [unfollowSomeone, { isLoadingUnfollow }] = useUnfollowSomeoneMutation();
  //   const [refreshing, setRefreshing] = useState(false);
  //   const [isFollowing, setIsFollowing] = useState(false);
  //   const dispatch = useDispatch();
  // const {postData} = route?.params;
  // const followUserId = postData?.userId;
  // const token = useSelector((state:any) => state.auth.token)
  // const myUserId = useSelector((state:any) => state.auth.authData._id);
  // const FollowBody = {
  //   followerId: followUserId,
  //   followingId: myUserId
  // }

  //   const follow = async() => {
  //       const result: any = await followSomeone({ body: FollowBody, token})
  //       if(result?.data?.statusCode === 200){
  //         setIsFollowing(true);
  //         setRefreshing(false);
  //         console.log('You have successfully followed this user');
  //         console.log('result');
  //       } else {
  //         setRefreshing(false);
  //         setIsFollowing(false);
  //         if(result?.error?.data){
  //           Alert.alert(result?.error?.data.message);
  //         }
  //         if(result?.error?.error){
  //           logToCrashlytics('Error! Could not follow user', result?.error?.error); 
  //           Alert.alert('Something went wrong!')
  //         }
  //         if(result.error && result.error.status === 401){
  //           onTokenExpired(dispatch);
  //         }
  //       }
  //     }
    
  //     /* unfollow a user */
    
  //     const unfollow = async() => {
  //       const result: any = await unfollowSomeone({ body: FollowBody, token })
  //       if(result?.data?.statusCode === 200){
  //         setIsFollowing(false);
  //         setRefreshing(false);
  //         console.log('You have successfully unfollowed this user');
  //         console.log('result');
  //       } else {
  //         setRefreshing(false);
  //         setIsFollowing(false);
  //         if(result?.error?.data){
  //           Alert.alert(result?.error?.data.message);
  //         }
  //         if(result?.error?.error){
  //           logToCrashlytics('Error! Could not unfollow user', result?.error?.error); 
  //           Alert.alert('Something went wrong!')
  //         }
  //         if(result.error && result.error.status === 401){
  //           onTokenExpired(dispatch);
  //         }
  //       }
  //     }

      
    return (
        <View style={styles.userContainer}>
            <View style={Layout.flex02}>
                <Image source={{ uri: userAvatar }} style={styles.userAvatar} />
            </View>
            <View style={[Layout.flex08, Layout.alignItemsStart]}>
                <Text style={[styles.userName, Fonts.textWhite]}>{userName}</Text>
                <Text style={styles.score}>{score}</Text>
            </View>
            <View style={[Layout.flex02,Layout.row,Layout.justifyContentEnd]}>
                <TouchableOpacity style={styles.followButton} onPress={() => setFollowing(!following)}>
                    {following ? <Following /> : <Follow />}
                </TouchableOpacity>
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
