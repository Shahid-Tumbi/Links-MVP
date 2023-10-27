import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
};

export type AuthParamsList = {
  StartScreen: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Auth: NavigatorScreenParams<AuthParamsList>;
  Main: NavigatorScreenParams<MainParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList,Auth>;
