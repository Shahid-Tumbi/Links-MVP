import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";


const SingleCurator = ({data}: any) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
        <Pressable style={styles.header} onPress={()=>navigation.navigate('DiscoverCuratorPost', {postData: data})}>
            <Image source={data?.user_info?.profileImage ? {uri:data?.user_info?.profileImage } : require("../../../assets/Ellipse38.jpg")} style={styles.userImage} />
            <View>
                <Text style={styles.userName}>{data?.name.charAt(0).toUpperCase() + data?.name.slice(1) || 'Tanmay Bhat'}</Text>
            </View>
            <Text style={styles.count}>0000</Text>
        </Pressable>
        </View>
    )

    
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "gray",
        borderRadius: 10,
    },
    userName: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        color: 'white',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    count: {
        marginLeft: 100,
        color: 'white'
    }

});

export default SingleCurator;