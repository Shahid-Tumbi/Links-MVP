import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from "react-native";
import { globalStyles } from "@/theme/GlobalStyles";
import { Constants } from "@/theme/Constants";
import { CommonButton, CommonTextInput, Loader, PasswordInput } from "@/components";
import ErrorMessages from "@/theme/errorMessages";
import { Colors, FontSize } from "@/theme/Variables";
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from "types/navigation";
import { logToCrashlytics, validateEmailId, validatePassword, validateUserName } from "@/theme/Common"
import { useRegisterUserMutation } from "@/services/modules/users";
import { setAuthData, setToken } from "@/store/User";
import { useDispatch } from "react-redux";
import { Logo, RightArrow } from "@/theme/svg";
import crashlytics from '@react-native-firebase/crashlytics';

const Signup = ({ navigation,route }: ApplicationScreenProps) => {
    logToCrashlytics('Signup Screen')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [userNameValid, setUserNameValid] = useState(false)
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('+91')
    const {
        Fonts,
        Layout,
        Gutters,
        darkMode: isDark,
    } = useTheme();
    const [errorName, setErrorName] = useState('')
    const [errorUserName, setErrorUserName] = useState('')
    const [errorUserEmail, setErrorUserEmail] = useState('')
    const [errorUserPassword, setErrorUserPassword] = useState('')
    const [errorUserPhone, setErrorUserPhone] = useState('')
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const dispatch = useDispatch();
    const [passVisible, setPassVisible] = useState(false)
    const [userNameInvalid, setUserNameInvalid] = useState(false)
    const [buttonError, setButtonError] = useState(false)   
    const [apiLoader, setApiLoader] = useState(false);

    const makeVisible = () => {
        setPassVisible(!passVisible);
    };


    const handleRegistration = async () => {
        logToCrashlytics('On register api call')

        try {
            const newUser: any = {
                name,
                email,
                phoneNumber,
                countryCode,
                password,
                userName
            };
            const result: any = await registerUser(newUser);
            if (result?.data?.statusCode === 200) {
                logToCrashlytics('On register api call success')
                dispatch(setToken(result?.data?.result?.token))
                dispatch(setAuthData(result?.data?.result?.profile))
                await Promise.all([
                    crashlytics().setUserId(result?.data?.result?.profile?._id),
                    crashlytics().setAttributes({
                      email: result?.data?.result?.profile?.email,
                      username: result?.data?.result?.profile?.userName,
                    }),
                  ]);
                if(route?.params?.curator){
                    navigation.navigate('ReferralScreen')
                } else {
                navigation.navigate('OtpScreen')
                }
            } else {
                if (result?.error?.data) {
                    if (result?.error?.data?.message === 'Oops! This Email ID is already registered with Us') {
                        setErrorUserEmail(result?.error?.data?.message)
                        setButtonError(true)

                    } else if (result?.error?.data?.message === 'Oops! Entered username is already taken') {
                        setErrorUserName(result?.error?.data?.message)
                        setUserNameInvalid(true)
                        setUserNameValid(false)
                        setButtonError(true)

                    } else if (result?.error?.data?.message === 'Oops! This Phone no is already registered with Us') {
                        setErrorUserPhone(result?.error?.data?.message)
                        setButtonError(true)

                    } else {
                        Alert.alert(result?.error?.data?.message)
                    }
                }
                if (result?.error?.error) {
                    logToCrashlytics('On register api call error',result?.error?.error)
                    Alert.alert('Something went wrong !!')
                }
            }
        } catch (error: any) {
            logToCrashlytics('On register api error',error)            
            Alert.alert(error)
            console.log('error', error);

        }
    };
    const getStarted = () => {
        logToCrashlytics('On register')
        setButtonError(false)
        let isValid = true;
        if (email == '') {
            setErrorUserEmail(ErrorMessages.emailId.empty);
            isValid = false;
        } else if (!validateEmailId(email.trim())) {
            setErrorUserEmail(ErrorMessages.emailId.valid);
            isValid = false;
        }
        if (name == '') {
            setErrorName(ErrorMessages.name.empty);
            isValid = false;
        }
        // if (userName == '') {
        //     setUserNameInvalid(true)
        //     setErrorUserName(ErrorMessages.userName.empty);
        //     isValid = false;
        // } else if (!validateUserName(userName)) {
        //     setUserNameInvalid(true)
        //     setErrorUserName(ErrorMessages.userName.pattern);
        //     isValid = false;
        // }
        if (password == '') {
            setErrorUserPassword(ErrorMessages.password.empty);
            isValid = false;
        } else if (!validatePassword(password)) {
            setErrorUserPassword(ErrorMessages.password.valid);
            isValid = false;
        }
        if (phoneNumber == '') {
            setErrorUserPhone(ErrorMessages.phoneNumber.empty);
            isValid = false;
        }
        if(isValid == false){
            setButtonError(true)
        }
        if (isValid) {
            handleRegistration()
        }

    }
    return (
        <View
            style={[globalStyles.container]} >
            {isLoading ? <Loader state={isLoading} /> : null}
            <View style={[globalStyles.screenMargin, Gutters.tinyBMargin]}>
                <ScrollView style={[Layout.flex08]} keyboardShouldPersistTaps="always" >
                    <Logo style={[Gutters.tinyTMargin]} />
                    <View style={[Gutters.largeTMargin]}>
                        <Text style={[Fonts.textVeryLarge, Fonts.textWhite, Fonts.textBold]}>{Constants.setUpAccount}</Text>
                        <Text style={[globalStyles.titleSub]}>{Constants.provideDetails}</Text>
                    </View>
                    <Text style={styles.emailAddress}>{Constants.email}</Text>
                    <CommonTextInput
                        errorUserName={
                            errorUserEmail ? errorUserEmail : ''
                        }
                        marginTop={8}
                        marginStart={0}
                        data={email}
                        keyboardtype={Constants.keyboardType.email}
                        updateMasterState={(value: string) => {
                            setEmail(value);
                            if (value == '') {
                                setErrorUserEmail(ErrorMessages.emailId.empty);
                            } else if (
                                !validateEmailId(value.trim())
                            ) {
                                setErrorUserEmail(ErrorMessages.emailId.valid)
                            } else {
                                setErrorUserEmail('')
                            }
                        }}
                    />
                    {errorUserEmail ? (
                        <Text
                            style={[Fonts.textError]}>
                            {errorUserEmail}
                        </Text>
                    ) : null}

                    <Text style={styles.emailAddress}>{Constants.fullName}</Text>
                    <CommonTextInput
                        errorUserName={
                            errorName ? errorName : ''
                        }
                        marginTop={8}
                        marginStart={0}
                        data={name}
                        updateMasterState={(value: string) => {
                            setName(value);
                            if (value == '') {
                                setErrorName(ErrorMessages.name.empty);
                            } else {
                                setErrorName('');
                            }
                        }}
                    />
                    {errorUserName ? (
                        <Text
                            style={[Fonts.textError]}>
                            {errorName}
                        </Text>
                    ) : null}
                   
                    <Text style={styles.emailAddress}>{Constants.phoneNo}</Text>
                    <CommonTextInput
                        errorUserName={
                            errorUserPhone ? errorUserPhone : ''
                        }
                        marginTop={8}
                        marginStart={0}
                        data={phoneNumber}
                        keyboardtype={Constants.keyboardType.phone}
                        updateMasterState={(value: string) => {
                            setPhoneNumber(value);
                            if (value == '') {
                                setErrorUserPhone(ErrorMessages.phoneNumber.empty);
                            } else {
                                setErrorUserPhone('');
                            }
                        }}
                    />
                    {errorUserPhone ? (
                        <Text
                            style={[Fonts.textError]}>
                            {errorUserPhone}
                        </Text>
                    ) : null}
                    <Text style={[Fonts.textRegular, Fonts.textRight, Gutters.tinyTMargin]} >{Constants.otpSent}</Text>
                    {/* <Text style={styles.emailAddress}>{Constants.userName}</Text>
                    <CommonTextInput
                        errorUserName={
                            errorUserName ? errorUserName : ''
                        }
                        marginTop={8}
                        marginStart={0}
                        data={userName}
                        updateMasterState={(value: string) => {
                            setUserName(value);
                            if (value == '') {
                                setUserNameValid(false)
                                setUserNameInvalid(true)
                                setErrorUserName(ErrorMessages.userName.empty);
                            }else if (!validateUserName(value)) {
                                setUserNameValid(false)
                                setUserNameInvalid(true)
                                setErrorUserName(ErrorMessages.userName.pattern);
                            } else {
                                setErrorUserName('');
                                setUserNameInvalid(false)
                                setUserNameValid(true)
                            }
                        }}
                        success={userNameValid}
                        error={userNameInvalid}
                    />
                    {errorUserName ? (
                        <Text
                            style={[Fonts.textError]}>
                            {errorUserName}
                        </Text>
                    ) : null} */}
                    <Text style={styles.emailAddress}>{Constants.password}</Text>
                    <PasswordInput
                        errorUserName={
                            errorUserPassword ? errorUserPassword : ''
                        }
                        marginTop={8}
                        marginStart={0}
                        data={password}
                        secureEntry={true}
                        updateMasterState={(value: string) => {
                            setPassword(value);
                            if (value == '') {
                                setErrorUserPassword(ErrorMessages.password.empty);
                            } else if (!validatePassword(value.trim())) {
                                setErrorUserPassword(ErrorMessages.password.valid);
                            } else {
                                setErrorUserPassword('');
                            }
                        }}
                        passVisible={passVisible}
                        isVisible={makeVisible}
                    />
                    {errorUserPassword ? (
                        <Text
                            style={[Fonts.textError]}>
                            {errorUserPassword}
                        </Text>
                    ) : null}

                    <View style={[Layout.row, Layout.alignItemsCenter, Gutters.largeTMargin]}>

                        <View style={[Layout.fill, Layout.row, Layout.justifyContentEnd, Layout.alignItemsCenter]}>
                            <Text style={[Fonts.textRegular, Layout.alignItemsEnd, Gutters.tinyRMargin]}>
                                {Constants.getStarted}
                            </Text>
                            <TouchableOpacity onPress={() => getStarted()}>
                                <RightArrow error={buttonError}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    emailAddress: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: FontSize.large,
        marginTop: '10%'
    }
});

export default Signup;
