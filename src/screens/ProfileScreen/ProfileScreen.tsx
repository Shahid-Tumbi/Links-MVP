import React, { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Text, ActivityIndicator, TouchableHighlight } from "react-native";
import { globalStyles } from "@/theme/GlobalStyles";
import { PieChart, Setting, UpDownSelect, } from "@/theme/svg";
import { Constants } from "@/theme/Constants";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "@/hooks";
import { Colors } from "@/theme/Variables";
import { Avatar } from "react-native-paper";
import ThreeDotLoader from "@/components/ThreeDotLoader/ThreeDotLoader";
import { Path, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import { defaultAvatar, imageAssetUrl, logToCrashlytics } from "@/theme/Common";

const ProfileScreen = ({ navigation }: ApplicationScreenProps) => {
    logToCrashlytics('Profile screen')
    const {
        Layout,
        Fonts,
        Gutters,
        darkMode: isDark,
    } = useTheme();
    const [imageUri, setImageUri] = useState(defaultAvatar)
    const [page, setPage] = useState(1)
    const authData = useSelector((state: any) => state.auth.authData);
    
    useEffect(() => {
        handleChange()
    }, [])
    const handleChange = () => {
        let dataTimeout;
        if (dataTimeout) {
            clearTimeout(dataTimeout);
            dataTimeout = null;
        }

        dataTimeout = setTimeout(() => {
            setPage(2)
        }, 3000);
    };
    return (
        <KeyboardAvoidingView style={[globalStyles.container]}>
            <View style={[globalStyles.screenMargin]}>
                {
                    page == 1 ?
                        <View style={[Gutters.largeTMargin, Layout.flex05, Layout.center]}>
                            <Text style={[styles.title]}>{`Hey, ${authData?.name}`}</Text>
                            <Avatar.Image size={135} source={{ uri:authData?.profileImage ? `${imageAssetUrl}${authData?.profileImage}` : imageUri }} style={[Gutters.regularTMargin]} />
                            <Text style={[Fonts.textRegular, Gutters.largeTMargin]}>{Constants.analyseProfile}</Text>
                            <ThreeDotLoader />
                        </View>
                        :
                        <>
                            <View style={[globalStyles.header, Layout.justifyContentEnd]}>
                                <Setting onPress={() => navigation.navigate('EditProfile')} />
                            </View>
                            <View style={[Layout.row]}>
                                <Text style={[styles.title]}>{`Hey, ${authData?.name}`}</Text>                                
                            </View>
                            <Text style={[Fonts.textRegular]}>{Constants.interestBased}</Text>
                            <View style={[Layout.center]}>
                                <Svg width="392" height="32" viewBox="0 0 392 32" fill="none" style={[
                                    { position: 'absolute', top: 90, }
                                ]}>
                                    <Path d="M0 31.5002C151.284 -9.07657 236.954 -10.3224 391.5 31.5002" stroke="white" stroke-opacity="0.6" />
                                </Svg>
                                <Avatar.Image size={90} source={{ uri: authData?.profileImage ? `${imageAssetUrl}${authData?.profileImage}` : imageUri }} style={[styles.profile]} />

                            </View>
                            <View style={[Layout.fill, Layout.center]}>
                                <PieChart />
                                <Text style={[styles.textChartView]}>{Constants.sectionView}</Text>
                            </View>
                        </>
                }
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        color: Colors.white
    },
    profile: {
        width: 90,
        height: 90,
        borderRadius: 50,
        position: 'absolute',
        top: 50,
    },
    textChartView: {
        color: '#235DCF',
        fontSize: 16,
        marginTop: 30
    }

});

export default ProfileScreen;
