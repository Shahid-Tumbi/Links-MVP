import React, { useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Alert, TouchableOpacity, Platform, ScrollView } from "react-native";
import { globalStyles } from "@/theme/GlobalStyles";
import { BackButton, True } from "@/theme/svg";
import { Constants } from "@/theme/Constants";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "@/hooks";
import { CommonTextInput, Loader } from "@/components";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "@/services/modules/users";
import { clearToken, setAuthData } from "@/store/User";
import { defaultAvatar, logToCrashlytics, onTokenExpired } from "@/theme/Common";

const EditProfile = ({ navigation }: ApplicationScreenProps) => {
    logToCrashlytics('Edit profile screen')
    const {
        Layout,
        Fonts,
        Gutters,
        darkMode: isDark,
    } = useTheme();
    const authData = useSelector((state: any) => state.auth.authData);
    const token = useSelector((state: any) => state.auth.token)    
    const [userName, setUserName] = useState(authData?.userName)
    const [fullName, setFullName] = useState(authData?.name)
    const [bio, setBio] = useState(authData?.bio)
    const [imageUri, setImageUri] = useState(authData?.profileImage || defaultAvatar)
    const [updateUser, { isLoading }] = useUpdateUserMutation()
    const dispatch = useDispatch()
    const onSubmit = async () => {
        logToCrashlytics('On update profile api call')
        const userData = {
            name: fullName,
            bio: bio
        }
        const result: any = await updateUser({ id: authData._id, body: userData , token })
        
        if (result?.data?.statusCode === 200) {
            logToCrashlytics('On update profile api success')
            dispatch(setAuthData(result?.data?.result))
            Alert.alert('Updated Successfully')
        } else {
            if (result?.error?.data) {
                Alert.alert(result?.error?.data?.message)
            }
            if (result?.error?.error) {
                logToCrashlytics('On update profile api error',result?.error?.error)
                Alert.alert('Something went wrong !!')
            }
            if (result.error && result.error.status === 401) {
                onTokenExpired(dispatch)
              }
        }
    }
    return (
        <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[globalStyles.container]}>
            {isLoading && <Loader state={isLoading} />}
            <View style={[globalStyles.screenMargin]}>
                <View style={[globalStyles.header,{position: 'absolute', top: 0, left: 0, right: 0}]}>
                    <BackButton style={[Gutters.tinyTMargin]} onPress={() => navigation.goBack()} />
                    <View>
                        <Text style={[Fonts.textVeryLarge, Fonts.textWhite]}>{Constants.editProfile}</Text>
                    </View>
                    <True style={[Gutters.tinyTMargin]} onPress={() => onSubmit()} />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[Layout.flex09, Gutters.largeTMargin]}>
                    <View style={[Layout.center]}>
                        <Avatar.Image size={80} source={{ uri: imageUri }} />
                        <Text style={[Fonts.textLarge, Fonts.textWhite, Gutters.tinyTMargin]}>{Constants.editPicture}</Text>
                    </View>
                    <View style={[Layout.row, Gutters.largeTMargin]}>
                        <View style={[Layout.flex04, Layout.justifyContentCenter]}>
                            <Text style={[Fonts.textLarge, Fonts.textWhite]}>{Constants.userName}</Text>
                        </View>
                        <View style={[Layout.flex06]}>
                            <CommonTextInput
                                marginTop={8}
                                marginStart={0}
                                data={userName}
                                editTrueFalse={false}
                                keyboardtype={Constants.keyboardType.default}
                                updateMasterState={(value: string) => {
                                    setUserName(value);
                                }}
                            />
                        </View>
                    </View>
                    <View style={[Layout.row, Gutters.tinyVMargin]}>
                        <View style={[Layout.flex04, Layout.justifyContentCenter]}>
                            <Text style={[Fonts.textLarge, Fonts.textWhite]}>{Constants.fullName}</Text>
                        </View>
                        <View style={[Layout.flex06]}>
                            <CommonTextInput
                                marginTop={8}
                                marginStart={0}
                                data={fullName}
                                keyboardtype={Constants.keyboardType.default}
                                updateMasterState={(value: string) => {
                                    setFullName(value);
                                }}
                            />
                        </View>
                    </View>
                    <View style={[Layout.row]}>
                        <View style={[Layout.flex04, Layout.justifyContentCenter]}>
                            <Text style={[Fonts.textLarge, Fonts.textWhite]}>{Constants.bio}</Text>
                        </View>
                        <View style={[Layout.flex06]}>
                            <CommonTextInput
                                marginTop={8}
                                marginStart={0}
                                data={bio}
                                keyboardtype={Constants.keyboardType.default}
                                updateMasterState={(value: string) => {
                                    setBio(value);
                                }}
                            />
                        </View>
                    </View>
                        <View style={[]}>
                            <View style={[Layout.row,Gutters.regularTMargin, Layout.scrollSpaceBetween]}>
                            <Text style={[Fonts.textSmall]} onPress={()=>navigation.navigate('ChangePassword')}>{Constants.changePassword}</Text>
                            <Text style={[Fonts.textSmall, styles.logoutBtn]} onPress={() => {
                                Alert.alert('Logout', 'Do you want to Logout?', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    { text: 'OK', onPress: () =>  dispatch(clearToken())},
                                ])
                            }}>{Constants.logout}</Text>
                            </View>
                        </View>
                </KeyboardAvoidingView>
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
logoutBtn:{
    padding:10,
    color:'#f5f5f5',
    borderRadius:10,
    backgroundColor:'#3F51B5'
}
});

export default EditProfile;
