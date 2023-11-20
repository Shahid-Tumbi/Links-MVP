/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { Alert, StyleSheet } from 'react-native';
import buttonStyles from './components/Buttons';
import { CommonParams } from '../../@types/theme';
import { clearToken } from '@/store/User';
import auth from '@react-native-firebase/auth';


export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        backgroundColor: Colors.inputBackground,
        color: Colors.textGray400,
        height: 45,
        borderRadius: 10,
        paddingStart: 20,
      },
    }),
  };
}
export const validateEmailId = (text:string) => {
    
  // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};
export const validatePassword = (text:string) => {
  let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};
export const validateUserName = (text:string) => {
  let reg = /^[A-Za-z][A-Za-z0-9_\-\.]{7,29}$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};
export function onTokenExpired(dispatch:any){
      return  dispatch(clearToken())
}

export const firebaseOtpSent = (countryCode: string,phoneNumber: string ): Promise<any> => {
  return new Promise((resolve, reject) => {
    let phoneWithCount = countryCode + `${phoneNumber}`;
    auth()
      .signInWithPhoneNumber(phoneWithCount)
      .then((res: any) => {
        console.log('Res', res);
        resolve(res);
      })
      .catch((error: any) => {
        console.log('errror', error);
        Alert.alert(error.message == '[auth/too-many-requests] We have blocked all requests from this device due to unusual activity. Try again later.' ? 'Too many request!Try after some time!' : error.message);
        reject(error);
      });
  });
};