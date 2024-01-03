import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Alert, TouchableOpacity, Platform, ScrollView, PermissionsAndroid } from "react-native";
import { globalStyles } from "@/theme/GlobalStyles";
import { BackButton, True } from "@/theme/svg";
import { Constants } from "@/theme/Constants";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "@/hooks";
import { CommonTextInput, Loader } from "@/components";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation, useUploadFileMutation } from "@/services/modules/users";
import { clearToken, setAuthData } from "@/store/User";
import { defaultAvatar, profileAssetUrl, logToCrashlytics, onTokenExpired } from "@/theme/Common";
import Permissions from 'react-native-permissions';
import { launchImageLibrary } from "react-native-image-picker";

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
    const [imageUri, setImageUri] = useState(authData?.profileImage ? `${profileAssetUrl}${authData?.profileImage}` : defaultAvatar)
    const [updateUser] = useUpdateUserMutation()
    const [uploadFile, { isLoading }] = useUploadFileMutation()
    const dispatch = useDispatch()
    
    const [filePath, setFilePath]:any = useState();
    let isReadGranted: string;
    const onSubmit = async () => {
        let newImage;
		if (filePath) {
			uploadImage();
			newImage = 'ProfileImage_' + `${authData._id}` + '.webp';
		} 
        logToCrashlytics('On update profile api call')
        let userData = {
            name: fullName,
            bio: bio,
        }
        if (newImage) {
            userData = { ...userData, ...{ profileImage: newImage } };
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
        
    
    };
    async function uploadImage() {

        var formdata = new FormData();
        formdata.append('file[]', {
            uri: filePath.uri,
            type: filePath.type,
            name:
                filePath.fileName.slice('.', 0) +
                'ProfileImage_' +
                `${authData._id}` +
                '.webp',
        });

       const uploadResult:any = await uploadFile({userData:formdata, token,folderPath:Constants.folderPath.profile});
       console.log(uploadResult);
       
       if (uploadResult?.data?.statusCode === 200) {
            logToCrashlytics('On upload file api success')
            
        } else {
            if (uploadResult?.error?.data) {
                Alert.alert(uploadResult?.error?.data?.message)
            }
            if (uploadResult?.error?.error) {
                logToCrashlytics('On upload file api error',uploadResult?.error?.error)
                Alert.alert('Something went wrong !!')
            }
            if (uploadResult.error && uploadResult.error.status === 401) {
                onTokenExpired(dispatch)
            }
        }
           
    }
    const reqPermission = async () => {
		if (Platform.OS === 'android') {
			isReadGranted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
			);
		} else if (Platform.OS === 'ios') {
			isReadGranted = await Permissions.request(
				Permissions.PERMISSIONS.IOS.PHOTO_LIBRARY
			);
			switch (isReadGranted) {
				case Permissions.RESULTS.UNAVAILABLE:
					isReadGranted = Permissions.RESULTS.GRANTED;
					break;
				default:
					break;
			}
			if (isReadGranted == Permissions.RESULTS.UNAVAILABLE) {
				console.log('Shahid', isReadGranted);
			}
		}
	};
    const chooseFile = async (type:string) => {
		let checkPermissionStatus=await Permissions.check(Permissions.PERMISSIONS.IOS.PHOTO_LIBRARY);
		if(checkPermissionStatus==Permissions.RESULTS.BLOCKED){
			await Permissions.openSettings()
			return true;
		}else{
			if (isReadGranted === 'denied') {
				reqPermission();
			} else {
				let options :any= {
					mediaType: type,
					maxWidth: 300,
					maxHeight: 550,
					quality: 1,
				};
				launchImageLibrary(options, (response:any) => {
					console.log('Response = ', response);

					if (response.assets) {
						setFilePath(response.assets[0]);
						// console.log("filePath",filePath)
					} else if (response.didCancel) {
						Alert.alert('User cancelled camera picker');
						return;
					} else if (response.errorCode == 'camera_unavailable') {
						Alert.alert('Camera not available on device');
						return;
					} else if (response.errorCode == 'permission') {
						Alert.alert('Permission not satisfied');
						return;
					} else if (response.errorCode == 'others') {
						Alert.alert(response.errorMessage);
						return;
					}
				});
			}
		}

	};
    useEffect(() => {
		reqPermission();
	}, []);
    return (
        <ScrollView style={[globalStyles.container]}>
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
                        <TouchableOpacity
									onPress={() => chooseFile('photo')}>
                        <Avatar.Image size={80} source={{ uri: filePath?.uri ? filePath.uri : imageUri }} />
                        </TouchableOpacity>
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
