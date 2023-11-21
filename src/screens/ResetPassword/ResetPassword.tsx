import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { globalStyles } from '@/theme/GlobalStyles';
import { Logo, RightArrow } from '@/theme/svg';
import { Constants } from '@/theme/Constants';
import { Loader, PasswordInput } from '@/components';
import { useDispatch } from 'react-redux';
import ErrorMessages from '@/theme/errorMessages';
import { validatePassword } from '@/theme/Common';
import { useResetPasswordMutation } from '@/services/modules/users';
import { setAuthData, setToken, verifiedUser } from '@/store/User';

const ResetPassword = ({ navigation, route }: ApplicationScreenProps) => {

    const {
        Layout,
        Fonts,
        Gutters,
        Variables
    } = useTheme()
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
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
        const userData: any = {
            token: route.params.token,
            password: newPassword
        };
        const result: any = await resetPassword(userData);
        if (result?.data?.statusCode === 200) {
            dispatch(setToken(result?.data?.result?.token))
            dispatch(setAuthData(result?.data?.result?.profile))
            if (result?.data?.result?.profile.isPhoneVerified === false) {
                navigation.navigate('OtpScreen', { pageFrom: 'Login' })
            } else {
                dispatch(verifiedUser(true))
            }
        } else {
            if (result?.error?.data) {
                Alert.alert(result?.error?.data?.message)
                setButtonError(true)
            }
            if (result?.error?.error) {
                Alert.alert('Something went wrong !!')
            }

        }
    }
    const getConfirm = () => {
        setButtonError(false)
        let isValid = true;
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
            doResetPassword()
        }
    }
    return (
        <View style={[globalStyles.container]}>
            <View style={[Layout.fill, Gutters.regularMargin]}>
            {isLoading ? <Loader state={isLoading} /> : null}
                <View style={[Gutters.largeTMargin]}>
                    <Logo />
                    <Text style={[Fonts.textVeryLarge, Fonts.textWhite, Gutters.largeTMargin, Fonts.textBold]}>
                        {Constants.newPassword}
                    </Text>
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
                    <View style={[Layout.row, Layout.alignItemsCenter, Gutters.largeTMargin]}>

                        <View style={[Layout.fill, Layout.row, Layout.justifyContentEnd, Layout.alignItemsCenter]}>
                            <Text style={[Fonts.textRegular, Layout.alignItemsEnd, Gutters.tinyRMargin]}>
                                {Constants.confirm}
                            </Text>
                            <TouchableOpacity onPress={() => getConfirm()}>
                                <RightArrow error={buttonError} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    );
};

export default ResetPassword;
