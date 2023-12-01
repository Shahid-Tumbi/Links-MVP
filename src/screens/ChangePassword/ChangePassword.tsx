import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/hooks';
import { Constants } from '@/theme/Constants';
import { ApplicationScreenProps } from 'types/navigation';
import { BackButton, Logo, RightArrow, True } from '@/theme/svg';
import { globalStyles } from '@/theme/GlobalStyles';
import { Loader, PasswordInput } from '@/components';
import { useDispatch } from 'react-redux';
import { useResetPasswordMutation } from '@/services/modules/users';
import { logToCrashlytics, validatePassword } from '@/theme/Common';
import { setAuthData, setToken } from '@/store/User';
import crashlytics from '@react-native-firebase/crashlytics';
import ErrorMessages from '@/theme/errorMessages';


const ChangePassword = ({navigation}: ApplicationScreenProps) => {
    const {
        Layout,
        Fonts,
        Gutters,
        darkMode: isDark,
    } = useTheme();
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errorCurrentPassword, setCurrentErrorPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorNewPassword, setErrorNewPassword] = useState('')
    const [passVisible, setPassVisible] = useState(false)
    const [buttonError, setButtonError] = useState(false)
    const dispatch = useDispatch();
    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const makeVisible = () => {
        setPassVisible(!passVisible);
    };
    const doResetPassword = async () => {
        logToCrashlytics('On reset password api call')
        const userData: any = {
            token: route.params.token,
            password: newPassword
        };
        const result: any = await resetPassword(userData);
        if (result?.data?.statusCode === 200) {
            logToCrashlytics('reset password api call success')
            dispatch(setToken(result?.data?.result?.token))
            dispatch(setAuthData(result?.data?.result?.profile))
            if (result?.data?.result?.profile.isPhoneVerified === false) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'OtpScreen' }]})
                } else {
                    await Promise.all([
                        crashlytics().setUserId(result?.data?.result?.profile?._id),
                        crashlytics().setAttributes({
                          email: result?.data?.result?.profile?.email,
                          username: result?.data?.result?.profile?.userName,
                        }),
                      ]);
                    dispatch(verifiedUser(true))
                }
            } else {
                if (result?.error?.data) {
                    Alert.alert(result?.error?.data?.message)
                    setButtonError(true)
                }
                if (result?.error?.error) {
                    logToCrashlytics('reset password api call error',result?.error?.error)
                    Alert.alert('Something went wrong !!')
                }        }
    }
    const getConfirm = () => {
        logToCrashlytics('on confirm reset password')
        setButtonError(false)
        let isValid = true;
        if (password == '') {
            setCurrentErrorPassword(ErrorMessages.password.empty);
            isValid = false;
        }
        if (password == '') {
            setErrorPassword(ErrorMessages.password.empty);
            isValid = false;
        } else if (!validatePassword(password)) {
            setErrorPassword(ErrorMessages.emailId.valid);
            isValid = false;
        }
        if (newPassword == '') {
            setErrorNewPassword(ErrorMessages.password.empty);
            isValid = false;
        }
        if (password !== newPassword) {
            setErrorNewPassword(ErrorMessages.password.match);
            isValid = false;
        }
        if (isValid == false) {
            setButtonError(true)
        }
        if (isValid) {
            // doResetPassword()
        }
    }
  return (
    <View style={[globalStyles.container]}>
            {/* {isLoading && <Loader state={isLoading} />} */}
            <View style={[globalStyles.screenMargin]}>
                <View style={[globalStyles.header,Layout.flex02]}>
                    <BackButton style={[Gutters.tinyTMargin]} onPress={() => navigation.goBack()} />
                    <View>
                        <Text style={[Fonts.textVeryLarge, Fonts.textWhite]}>{Constants.changePassword}</Text>
                    </View>
                    <True style={[Gutters.tinyTMargin]} onPress={() => getConfirm()} />
                </View>
                <View style={[Gutters.largeTMargin]}>
                    <Text style={[Fonts.textLarge, Gutters.regularTMargin]}>
                        {Constants.enterCurrentPassword}
                    </Text>
                    <PasswordInput
                        secureEntry={false}
                        errorUserName={
                            errorCurrentPassword ? errorCurrentPassword : ''
                        }
                        marginTop={8}
                        marginStart={0}
                        data={currentPassword}
                        keyboardtype={Constants.keyboardType.email}
                        updateMasterState={(value: string) => {
                            setCurrentPassword(value);
                            if (value == '') {
                                setCurrentErrorPassword(ErrorMessages.password.empty);
                            } else if (!validatePassword(value)) {
                                setCurrentErrorPassword(ErrorMessages.password.valid);
                            } else {
                                setCurrentErrorPassword('')
                            }
                        }}
                    />
                    {errorPassword ? (
                        <Text
                            style={[Fonts.textError]}>
                            {errorCurrentPassword}
                        </Text>
                    ) : null}
                    <Text style={[Fonts.textLarge, Gutters.regularTMargin]}>
                        {Constants.newPassword}
                    </Text>
                    <PasswordInput
                        secureEntry={false}
                        errorUserName={
                            errorPassword ? errorPassword : ''
                        }
                        marginTop={8}
                        marginStart={0}
                        data={password}
                        keyboardtype={Constants.keyboardType.email}
                        updateMasterState={(value: string) => {
                            setPassword(value);
                            if (value == '') {
                                setErrorPassword(ErrorMessages.password.empty);
                            } else if (!validatePassword(value)) {
                                setErrorPassword(ErrorMessages.password.valid);
                            } else {
                                setErrorPassword('')
                            }
                        }}
                    />
                    {errorPassword ? (
                        <Text
                            style={[Fonts.textError]}>
                            {errorPassword}
                        </Text>
                    ) : null}
                    <Text style={[Fonts.textLarge, Gutters.regularTMargin]}>
                        {Constants.reenterPassword}
                    </Text>
                    <PasswordInput
                        errorUserName={
                            errorNewPassword
                                ? errorNewPassword
                                : null
                        }
                        marginTop={1}
                        data={newPassword}
                        secureEntry={true}
                        updateMasterState={(value: string) => {
                            validatePassword(value);
                            setNewPassword(value)
                            if (value == '') {
                                setErrorNewPassword(ErrorMessages.password.empty);
                            } else {
                                setErrorNewPassword('')
                            }
                        }}
                        passVisible={passVisible}
                        isVisible={makeVisible}
                    />
                    {errorNewPassword ? (
                        <Text
                            style={[Fonts.textError]}>
                            {errorNewPassword}
                        </Text>
                    ) : null}
                </View>
                </View>
                </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})