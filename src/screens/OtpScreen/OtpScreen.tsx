import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity } from "react-native";
import { globalStyles } from "@/theme/GlobalStyles";
import { Logo, RightArrow } from "@/theme/svg";
import { Constants } from "@/theme/Constants";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "@/hooks";
import { Colors } from "@/theme/Variables";
import { Loader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { verifiedUser } from "@/store/User";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/services/modules/users";
import { firebaseOtpSent, logToCrashlytics, onTokenExpired } from "@/theme/Common";

const OtpScreen = ({ navigation, route }: ApplicationScreenProps) => {
  logToCrashlytics('Otp screen')
  const {
    Layout,
    Fonts,
    Gutters,
    darkMode: isDark,
  } = useTheme();
  const ref_input1: any = useRef();
  const ref_input2: any = useRef();
  const ref_input3: any = useRef();
  const ref_input4: any = useRef();
  const ref_input5: any = useRef();
  const ref_input6: any = useRef();
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation()
  const [resendOtp] = useResendOtpMutation()
  const token = useSelector((state: any) => state.auth.token);
  const authData = useSelector((state: any) => state.auth.authData);
  const dispatch = useDispatch()
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(50);
  const [buttonError, setButtonError] = useState(false)
  const [otpTimer, setOtpTimer] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [apiLoader, setApiLoader] = useState(false);
  const [confirmObj, setConfirmObj] = useState(route.params?.confirm)
  const configData = useSelector((state: any) => state.auth.appConfigData);

  let timerInterval: any;
  useEffect(() => {
    logToCrashlytics('Otp screen time interval')
    timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          setOtpTimer(true)
          clearInterval(timerInterval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [seconds, minutes]);
  useEffect(() => {
    otpSend(false)
  }, [])
  const otpSend = (resend:boolean) => {
    logToCrashlytics('Otp send')
    if (configData.firebase) {
      firebaseOtpSent(authData.countryCode, authData.phoneNumber).then((res: any) => {
       logToCrashlytics('Otp send through firebase')
        if(resend){Alert.alert('Otp resent on your number')}
        setApiLoader(false)
        setConfirmObj(res)
      }).catch((err: any) => {
        logToCrashlytics('Otp send through firebase error',err)
        setApiLoader(false)
        console.log('err', err);
      })
    }
  }
  const onOtpChange = (index: number) => {
    logToCrashlytics('Otp change fun')
    return (value: string) => {
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          ref_input2.current.focus();
        } else if (index === 1) {
          ref_input3.current.focus();
        }
        else if (index === 2) {
          ref_input4.current.focus();
        }
        else if (index === 3) {
          ref_input5.current.focus();
        }
        else if (index === 4) {
          ref_input6.current.focus();
        }
      }
    };
  };
  const refCallback = (textInputRef: any) => (node: any) => {
    textInputRef.current = node;
  };
  const onOtpKeyPress = (index: number) => {
    logToCrashlytics('On press of otp')
    return ({ nativeEvent: { key: value } }: any) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          ref_input1.current.focus();
        } else if (index === 2) {
          ref_input2.current.focus();
        }
        else if (index === 3) {
          ref_input3.current.focus();
        }
        else if (index === 4) {
          ref_input4.current.focus();
        }
        else if (index === 5) {
          ref_input5.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };
  const onCodeSubmit = async () => {
    logToCrashlytics('On Otp code submit')
    if (otpArray.includes('')) {
      Alert.alert('Please enter code properly');
      setButtonError(true)

    } else {
      if (confirmObj) {
        logToCrashlytics('Otp verifying')
        await confirmObj.confirm(otpArray.join('')).then(
          (resp: any) => {
            setApiLoader(false);
            console.log('resp', resp);
            verifyNumber()
          }
        ).catch((err: any) => {
        logToCrashlytics('Otp verifying error',err)
          setApiLoader(false);
          Alert.alert("Invalid code entered.");
          console.log("err", err)
        });
      } else {
        Alert.alert("OTP Expired! try to resend otp")
      }
    }
  }
  const verifyNumber = async () => {
    logToCrashlytics('verify otp api call')
    const result: any = await verifyOtp({ body: { otp: Constants.byPassOtp }, token })
    if (result?.data?.statusCode === 200) {
      dispatch(verifiedUser(true))
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      })
    } else {
      if (result?.error?.data) {
        setButtonError(true)
        setErrorMessage(result?.error?.data?.message)
        // Alert.alert(result?.error?.data?.message)
      }
      if (result?.error?.error) {
        logToCrashlytics('verify otp api error',result?.error?.error)
        Alert.alert('Something went wrong !!')
      }
    }
  }
  const onResendOtp = async () => {
    logToCrashlytics('verify otp api call')
    setOtpArray([])
    setSeconds(50)
    setOtpTimer(false)
    setButtonError(false)
    setErrorMessage('')
    const result: any = await resendOtp({ token })
    if (result?.data?.statusCode === 200) {
      if (configData.firebase) {
        otpSend(true)
      }
    } else {
      if (result?.error?.data) {
        setButtonError(true)
        // setErrorMessage(result?.error?.data?.message)
        Alert.alert(result?.error?.data?.message)
      }
      if (result?.error?.error) {
        Alert.alert('Something went wrong !!')
      }
      
    }
  }
  return (
    <KeyboardAvoidingView style={[Layout.fill, { backgroundColor: Colors.primary }]}>
      <View style={[globalStyles.screenMargin]}>
        {isLoading || apiLoader ? <Loader state={isLoading} /> : null}

        <View style={[Gutters.largeTMargin, Layout.flex08]}>
          <Logo />
          <Text style={[Fonts.textVeryLarge, styles.getStarted, Fonts.textWhite]}>{Constants.otpVerification}</Text>
          <Text style={[globalStyles.titleSub]}>{Constants.enterCode}</Text>
          <Text style={[globalStyles.titleSub, Fonts.textRegular]}>{`+91-${authData.phoneNumber}`}</Text>
          <Text style={[Fonts.textRegular, Gutters.regularTMargin, styles.timer]}> {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>

          <View style={[styles.otpContainer]}>
            {[ref_input1, ref_input2, ref_input3, ref_input4, ref_input5, ref_input6].map((item, index) => (
              <TextInput
                maxLength={1}
                key={index}
                value={otpArray[index]}
                keyboardType={Constants.keyboardType.phone}
                style={[styles.otpInput, buttonError && { borderColor: Colors.error }]}
                onChangeText={onOtpChange(index)}
                autoFocus={index === 0 ? true : undefined}
                ref={refCallback(item)}
                onKeyPress={onOtpKeyPress(index)}
                autoComplete="sms-otp"
              />
            ))}
          </View>
          {errorMessage ? (
            <Text
              style={[Fonts.textError, Gutters.tinyRMargin]}>
              {errorMessage}
            </Text>
          ) : null}
          <Text style={[Fonts.textRegular, Gutters.regularTMargin]}>{Constants.didntReceiveOtp}</Text>
          <Text style={[Fonts.textRegular, otpTimer ? Fonts.textWhite : Fonts.textLight]} onPress={() => otpTimer && onResendOtp()}>{Constants.resend}</Text>
          <View style={[Layout.row, Layout.alignItemsCenter, Gutters.largeTMargin]}>

            <View style={[Layout.fill, Layout.row, Layout.justifyContentEnd, Layout.alignItemsCenter]}>
              <Text style={[Fonts.textRegular, Layout.alignItemsEnd, Gutters.tinyRMargin]}>
                {Constants.proceed}
              </Text>
              <TouchableOpacity onPress={() => onCodeSubmit()}>
                <RightArrow error={buttonError} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  getStarted: {
    fontWeight: "700",
    alignSelf: "flex-start",
    marginTop: "5%",
  },
  otpContainer: {
    flexDirection: 'row',
    marginTop: '10%'
  },
  otpInput: {
    flex: 1,
    width: 45,
    height: 50,
    textAlign: 'center',
    color: Colors.white,
    borderRadius: 10,
    marginEnd: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: Colors.inputBackground
  },
  timer: {
    color: '#2D4988',
    textAlign: 'center'
  }
});

export default OtpScreen;
