import { useTheme } from "@/hooks";
import { Colors } from "@/theme/Variables";
import { CloseButton, Eye, Play, Stars } from "@/theme/svg";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import ActionSheet, { SheetManager, SheetProps,  } from "react-native-actions-sheet";
import LinearGradient from "react-native-linear-gradient";
import * as Progress from 'react-native-progress';
const NewsSheet = (props: any) => {
    const {
        Fonts,
        Layout,
        Gutters,
        darkMode: isDark,
    } = useTheme();
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const scrollHeight = event.nativeEvent.contentSize.height;
        const windowHeight = event.nativeEvent.layoutMeasurement.height;
        const progress = (offsetY / (scrollHeight - windowHeight)) * 100;
        setScrollPosition(progress);
    };
    const hideActionSheet = () => {
        SheetManager.hide('NewsSheet');
      };
    
    return (
        <ActionSheet id={props.sheetId}>
            <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(120,120,120,0.5)"]}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View>
                            <Text style={[Fonts.textRegular, Fonts.textWhite, Fonts.textBold]}>News</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity style={[Gutters.smallRPadding]}>
                                <Play />
                            </TouchableOpacity>
                            <TouchableOpacity style={[Gutters.smallRPadding]}>
                                <Stars />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={hideActionSheet}>
                                <CloseButton />
                            </TouchableOpacity >
                        </View>
                    </View>
                    <ScrollView
                        onScroll={handleScroll}
                        scrollEventThrottle={16} >
                        <View style={[Gutters.tinyMargin]}>
                            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXk9RJzuijLiEaognmD64tPjSIWPWHARvv55R-QDILxw&s' }} style={styles.image} />
                            <Text style={[Fonts.textSmall, Fonts.textWhite]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>
                            <Text style={[Fonts.textSmall, Fonts.textWhite]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>
                            <Text style={[Fonts.textSmall, Fonts.textWhite]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>
                        </View>
                    </ScrollView>
                    <View style={[Layout.row, Gutters.tinyMargin]}>
                        <Progress.Bar
                            progress={scrollPosition / 100}
                            width={Dimensions.get('screen').width - 60}
                            height={5}
                            style={styles.progressBar}
                            color={Colors.green}
                            useNativeDriver={true}
                        />
                        <Eye style={[Gutters.smallBMargin]} />
                    </View>
                </View>
            </LinearGradient>
        </ActionSheet>
    );
}
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height - 250,
        backgroundColor:'rgba(0,0,0,0.8)'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 60,
    },
    iconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    progressBar: {
        height: 5,
        marginBottom: 30,
        borderColor: 'transparent',
        alignSelf: 'center',
        marginEnd: 10
    }
})
export default NewsSheet;