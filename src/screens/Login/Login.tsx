import { CommonTextInput, Loader, PasswordInput } from "@/components";
import { useTheme } from "@/hooks";
import { useAppConfigMutation, useLoginUserMutation } from "@/services/modules/users";
import { setAppConfig, setAuthData, setToken, verifiedUser } from "@/store/User";
import { logToCrashlytics, validatePassword } from "@/theme/Common";
import { Constants } from "@/theme/Constants";
import { globalStyles } from "@/theme/GlobalStyles";
import ErrorMessages from "@/theme/errorMessages";
import { Apple, Facebook, Google, Logo, RightArrow, Twitter } from "@/theme/svg";
import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { ApplicationScreenProps } from "types/navigation";
import messaging from "@react-native-firebase/messaging";
import crashlytics from '@react-native-firebase/crashlytics';

const getFCMToken = (async () => {
  try {
    const token = await messaging().getToken();
    console.log(token);
  } catch (e) {
    console.log(e);
  }
})();


const Login = ({ navigation }: ApplicationScreenProps) => {
    const {
        Layout,
        Fonts,
        Gutters,
        Variables
    } = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorUserEmail, setErrorUserEmail] = useState('')
    const [errorUserPassword, setErrorUserPassword] = useState('')
    const [passVisible, setPassVisible] = useState(false)
    const [loginUser, { isLoading }] = useLoginUserMutation()
    const [appConfig] = useAppConfigMutation()
    const [buttonError, setButtonError] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        logToCrashlytics('Login Screen')
        checkApplicationPermission()
        getAppConfig()
    }, [])
    const checkApplicationPermission = async () => {
        logToCrashlytics('Check Notification permission')

        if (Platform.OS === 'android') {
          try {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
          } catch (error:any) {
            logToCrashlytics('Check Notification permission error',error)
          }
        }
      };
    const getAppConfig = async () => {
        logToCrashlytics('App config on Login Screen')
        const result: any = await appConfig({})
        if (result?.data?.statusCode === 200) {
            dispatch(setAppConfig(result?.data?.result))
        } else {
            if (result?.error?.data) {
                console.log('Error in app conifg', result?.error?.data?.message);
            }
            if (result?.error?.error) {
                console.log('app conifg error', result?.error?.error);
            }
        }
    }
    const makeVisible = () => {
        setPassVisible(!passVisible);
    };
    const onLogin = async () => {
        logToCrashlytics('On User Login')
        try {
            setButtonError(false)
            setErrorUserEmail('')
            setErrorUserPassword('')
            if (email == '') {
                setErrorUserEmail(ErrorMessages.emailId.empty);
                setButtonError(true)
            } else if (password == '') {
                setErrorUserPassword(ErrorMessages.password.empty)
                setButtonError(true)
            } else {
                const userData: any = {
                    deviceToken: 'asd',
                    user: email,
                    password,
                };
                const result: any = await loginUser(userData);
                logToCrashlytics('On User Login api call')
                if (result?.data?.statusCode === 200) {
                    logToCrashlytics('On User Login api call success')
                    await Promise.all([
                        crashlytics().setUserId(result?.data?.result?.profile?._id),
                        crashlytics().setAttributes({
                          email: result?.data?.result?.profile?.email,
                          username: result?.data?.result?.profile?.userName,
                        }),
                      ]);
                    dispatch(setToken(result?.data?.result?.token))
                    dispatch(setAuthData(result?.data?.result?.profile))
                    if (result?.data?.result?.profile.isPhoneVerified === false) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'OtpScreen' }]})
                    } else {
                        dispatch(verifiedUser(true))
                    }
                } else {
                    if (result?.error?.data) {
                        if (result?.error?.data?.message === 'Oops! This Email ID isn’t registered with Us') {
                            setErrorUserEmail(result?.error?.data?.message)
                            setButtonError(true)
                        } else if (result?.error?.data?.message === 'Oops! This doesn’t seem like a correct password') {
                            setErrorUserPassword(result?.error?.data?.message)
                            setButtonError(true)
                        } else {
                            Alert.alert(result?.error?.data?.message)
                            setButtonError(true)
                        }
                    }
                    if (result?.error?.error) {
                     logToCrashlytics('On User Login api call error',result?.error?.error)
                        Alert.alert('Something went wrong !!')
                    }
                    
                }
            }
        } catch (error: any) {
            logToCrashlytics('On User Login error',error)
            Alert.alert(error)
            console.log('error', error);

        }

    }
    return (
        <View style={[globalStyles.container]}>
            <View style={[Layout.fill, Gutters.smallMargin]}>
                {isLoading ? <Loader state={isLoading} /> : null}

                <View style={[Gutters.largeTMargin]}>
                    <Logo />
                    <Text style={[Fonts.textLarge, Gutters.largeTMargin]}>
                        {Constants.emailAddress}
                    </Text>
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
                    <Text style={[Fonts.textLarge, Gutters.largeTMargin]}>
                        {Constants.password}
                    </Text>
                    <PasswordInput
                        errorUserName={
                            errorUserPassword
                                ? errorUserPassword
                                : null
                        }
                        marginTop={1}
                        data={password}
                        secureEntry={true}
                        updateMasterState={(value: string) => {
                            validatePassword(value);
                            setPassword(value)
                            if (value == '') {
                                setErrorUserPassword(ErrorMessages.password.empty);
                            } else if (!validatePassword(value)) {
                                setErrorUserPassword('')
                            } else {
                                setErrorUserPassword('')
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
                        <Text style={[Fonts.textTiny]} onPress={() => navigation.navigate('ForgotPassword')}>
                            {Constants.forgotPassword}
                        </Text>
                        <View style={[Layout.fill, Layout.row, Layout.justifyContentEnd, Layout.alignItemsCenter]}>
                            <Text style={[Fonts.textRegular, Layout.alignItemsEnd, Gutters.tinyRMargin]}>
                                {Constants.signin}
                            </Text>
                            <TouchableOpacity onPress={() => onLogin()} >
                                <RightArrow error={buttonError} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.saperation}>
                        <View style={styles.line} />
                        <Text style={styles.text}>or</Text>
                        <View style={styles.line} />
                    </View>
                    <View style={[Layout.row, Layout.justifyContentCenter, Gutters.tinyTMargin]}>
                        <Facebook />
                        <Google />
                        <Twitter />
                        <Apple />
                    </View>
                    <Text style={[Fonts.textRegular, Fonts.textCenter, Gutters.regularTMargin]}>{Constants.dontHaveAcc}
                        <Text style={[Fonts.textLarge]} onPress={() => navigation.navigate('Signup')}>Sign up</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    saperation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
    },
    line: {
        flex: 1,
        height: 1,
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.60)',
    },
    text: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
});
export default Login;
