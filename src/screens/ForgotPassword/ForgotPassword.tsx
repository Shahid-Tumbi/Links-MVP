import React, { useState } from 'react';
import {  Alert, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { globalStyles } from '@/theme/GlobalStyles';
import { Logo, RightArrow } from '@/theme/svg';
import { Constants } from '@/theme/Constants';
import { CommonTextInput, Loader } from '@/components';
import ErrorMessages from '@/theme/errorMessages';
import { useForgotPasswordMutation } from '@/services/modules/users';
import { logToCrashlytics } from '@/theme/Common';

const ForgotPassword = ({ navigation }: ApplicationScreenProps) => {
    logToCrashlytics('Forgot password screen')
    const {
        Layout,
        Fonts,
        Gutters,
        Variables
    } = useTheme()
    const [email, setEmail] = useState('')
    const [errorUserEmail, setErrorUserEmail] = useState('')
    const [buttonError, setButtonError] = useState(false)
    const [forgotPassword, { isLoading }] =useForgotPasswordMutation()
    
  
   
  
    const sendLink = async () => {
        logToCrashlytics('On Forgot password link send')
        setButtonError(false)
        setErrorUserEmail('')
        if (email == '') {
            setErrorUserEmail(ErrorMessages.forgotPassword.empty);
            setButtonError(true)
        } else {
            const userData: any = {
                user: email,
            };
            const result: any = await forgotPassword(userData);
            logToCrashlytics('Forgot password link send api call')
            if (result?.data?.statusCode === 200) {
                logToCrashlytics('Forgot password link send api  success')
                Alert.alert(result?.data?.message)
            } else {
                if (result?.error?.data) {
                        Alert.alert(result?.error?.data?.message)
                        setButtonError(true)
                }
                if (result?.error?.error) {
                    logToCrashlytics('Forgot password link send api call error',result?.error?.error)
                    Alert.alert('Something went wrong !!')
                }
                
            }
        }
    }
  return (
    <View style={[globalStyles.container]}>
       <View style={[Layout.fill, Gutters.smallMargin]}>
       {isLoading ? <Loader state={isLoading} /> : null}
            <View style={[Gutters.largeTMargin]}>
                  <Logo />
                  <Text style={[Fonts.textVeryLarge, Fonts.textWhite,Gutters.largeTMargin,Fonts.textBold]}>
                      {Constants.troubleLogin}
                  </Text>
                  <Text style={[Fonts.textRegular,Fonts.textDimGray,Gutters.tinyTMargin,Gutters.regularRMargin]}>
                        {Constants.enterDetails}
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
                        style={[Gutters.largeTMargin]}
                    />
                    {errorUserEmail ? (
                        <Text
                            style={[Fonts.textError]}>
                            {errorUserEmail}
                        </Text>
                    ) : null}
                    <View style={[Layout.row, Layout.alignItemsCenter, Gutters.largeTMargin]}>
                      <View style={[Layout.fill, Layout.row, Layout.justifyContentEnd, Layout.alignItemsCenter]}>
                          <Text style={[Fonts.textRegular, Layout.alignItemsEnd, Gutters.tinyRMargin]}>
                              {Constants.sendLoginLink}
                          </Text>
                          <TouchableOpacity onPress={() => sendLink()}>
                              <RightArrow error={buttonError} />
                          </TouchableOpacity>
                      </View>
                  </View>
            </View>

        </View>
    </View>
  );
};

export default ForgotPassword;
