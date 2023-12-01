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
import { setAuthData, setCurator, verifiedUser } from "@/store/User";
import { useUpdateUserMutation } from "@/services/modules/users";
import { logToCrashlytics, onTokenExpired } from "@/theme/Common";

const ReferralScreen = ({ navigation, route }: ApplicationScreenProps) => {
  logToCrashlytics('Referral screen')
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
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const token = useSelector((state: any) => state.auth.token);
  const authData = useSelector((state: any) => state.auth.authData);
  const dispatch = useDispatch()
  const [buttonError, setButtonError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [apiLoader, setApiLoader] = useState(false);
  const onReferralChange = (index: number) => {
    logToCrashlytics('referral change fun')
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
  const verifyCurator = async () => {
    logToCrashlytics('On update referral api call')
    const userData = {
        referrer:otpArray.join('')
    }
    const result: any = await updateUser({ id: authData._id, body: userData , token })
    
    if (result?.data?.statusCode === 200) {
        logToCrashlytics('On update profile api success')
        dispatch(setAuthData(result?.data?.result))
        dispatch(setCurator(true))
        navigation.navigate('OtpScreen')
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
  const onCodeSubmit = async () => {
    logToCrashlytics('On Otp code submit')
    if (otpArray.includes('')) {
      Alert.alert('Please enter code properly');
      setButtonError(true)

    } else {
      verifyCurator()
    }
  }
  
  return (
    <KeyboardAvoidingView style={[Layout.fill, { backgroundColor: Colors.primary }]}>
      <View style={[globalStyles.screenMargin]}>
        {isLoading || apiLoader ? <Loader state={isLoading} /> : null}

        <View style={[Gutters.largeTMargin, Layout.flex08]}>
          <Logo />
          <Text style={[Fonts.textVeryLarge, styles.getStarted, Fonts.textWhite]}>{Constants.referralCode}</Text>
          <Text style={[globalStyles.titleSub]}>{Constants.enterReferral}</Text>

          <View style={[styles.otpContainer]}>
            {[ref_input1, ref_input2, ref_input3, ref_input4, ref_input5, ref_input6].map((item, index) => (
              <TextInput
                maxLength={1}
                key={index}
                value={otpArray[index]}
                style={[styles.otpInput, buttonError && { borderColor: Colors.error }]}
                onChangeText={onReferralChange(index)}
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
          <Text style={[Fonts.textRegular, Gutters.regularTMargin]}>{Constants.havingTrouble}</Text>
          <Text style={[Fonts.textRegular,{color:Colors.blue,opacity:0.7}]} onPress={() => {}}>{Constants.contactTeam}</Text>
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

export default ReferralScreen;
