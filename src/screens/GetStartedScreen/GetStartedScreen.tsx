import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Border, globalStyles } from "@/theme/GlobalStyles";
import { Ellipse, ForwardArrow, Logo, RightArrow, Star, Sun } from "@/theme/svg";
import { Constants } from "@/theme/Constants";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "@/hooks";
import { Colors } from "@/theme/Variables";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { setCurator } from "@/store/User";
import { useDispatch } from "react-redux";

const GetStartedScreen = ({ navigation }: ApplicationScreenProps) => {
  const {
    Layout,
    Fonts,
    Gutters,
    darkMode: isDark,
  } = useTheme();
  const dispatch = useDispatch()
  return (
    <ScrollView style={[Layout.fill, { backgroundColor: Colors.primary }]}>
      <View style={globalStyles.screenMargin}>
        <View style={globalStyles.header}>
          <Logo />
          {/* <View style={styles.loginContainer}>
            <Text style={[styles.login, Fonts.textTiny, Fonts.textWhite]} onPress={() => navigation.navigate("Login")}>{Constants.login}</Text>
          </View> */}
        </View>
        <View style={[Gutters.largeTMargin]}>
          <Text style={[styles.getStarted, Fonts.textVeryLarge, Fonts.textWhite]}>{Constants.getStarted}</Text>
          <Text style={[globalStyles.titleSub, Fonts.textRegular]}>{Constants.startByChoosing}</Text>
          <TouchableWithoutFeedback style={styles.component13} onPress={() => {
            dispatch(setCurator(true))
            navigation.navigate("Login")
            }}>
            <View style={styles.choossingComponent}>
              <Sun style={styles.groupIcon} />
              <Text style={[styles.curatorAccess, Fonts.textRegular, Fonts.textWhite]}>{Constants.curatorAccess}</Text>
              <Text style={[styles.referralInvitesOnly, Fonts.textTiny]}>{Constants.refferalOnly}</Text>
            </View>
            <ForwardArrow />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.component13} onPress={() => {
            dispatch(setCurator(false))
            navigation.navigate("Login")
            }}>
            <View style={styles.choossingComponent}>
              <Star />
              <Text style={[styles.curatorAccess, Fonts.textRegular, Fonts.textWhite]}>{Constants.audienceAccess}</Text>
              <Text style={[styles.referralInvitesOnly, Fonts.textTiny]}>{Constants.SignupMember}</Text>
            </View>
            <ForwardArrow />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    backgroundColor: "#1b1c21",
    width: 81,
    height: 43,
  },
  login: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: "500",
    marginRight: "5%",
  },
  getStarted: {
    fontWeight: "700",
    alignSelf: "flex-start",
    marginTop: "5%",
  },
  component13: {
    flexDirection: "row",
    backgroundColor: Colors.textGray200,
    borderRadius: Border.br_3xs,
    marginTop: "10%",
    alignItems: "center",
    padding: "5%",
  },
  choossingComponent: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: '6%',
    marginTop: '2%'
  },
  curatorAccess: {
    marginTop: "5%"
  },
  referralInvitesOnly: {
    marginTop: "3%"
  },
  riarrowUpSLineIcon: {
    width: "10%",
    aspectRatio: 1,
  },
  groupIcon: {
    width: "6.72%",
    aspectRatio: 1,
  },
});

export default GetStartedScreen;
