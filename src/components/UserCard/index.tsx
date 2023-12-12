import { useTheme } from '@/hooks';
import { Colors } from '@/theme/Variables';
import { Follow, Following, Menu } from '@/theme/svg';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const UserCard = ({
    userAvatar,
    userName,
    score,
    menu
}:any) => {
    const [following, setFollowing] = useState(false)
    const {
        Fonts,
        Layout,
        Gutters
    } = useTheme()
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
