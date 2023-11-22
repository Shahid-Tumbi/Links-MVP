import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
};

export type AuthParamsList = {
  Login: undefined;
  Signup: undefined;
  OtpScreen: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Auth: NavigatorScreenParams<AuthParamsList>;
  Main: NavigatorScreenParams<MainParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList,Auth>;
