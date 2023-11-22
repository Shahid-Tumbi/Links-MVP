import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function SingleCurator(){
    return (
        <View style={styles.container}>
        <Pressable style={styles.header}>
            <Image source={require('../../../assets/Ellipse38.jpg')} style={styles.userImage} />
            <View>
                <Text style={styles.userName}>Tanmay Bhat</Text>
                

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
        marginLeft: 30,
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
        marginRight: 10
    },
    count: {
        marginLeft: 100,
        color: 'white'
    }

});