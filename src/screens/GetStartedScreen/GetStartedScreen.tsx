import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Border, globalStyles } from "@/theme/GlobalStyles";
import { Constants } from "@/theme/Constants";
import { ApplicationScreenProps } from "types/navigation";
import { useTheme } from "../../hooks";

const GetStartedScreen = ({ navigation }: ApplicationScreenProps) => {
  const {
    Layout,
    Fonts,
    Gutters,
    darkMode: isDark,
  } = useTheme();
  return (
    <ScrollView style={[Layout.fill, { backgroundColor: "#000" }]}>
      <View style={globalStyles.screenMargin}>
        <View style={globalStyles.header}>
          <View style={styles.loginContainer}>
            <Text style={[styles.login, Fonts.textTiny, Fonts.textWhite]}>{Constants.login}</Text>
          </View>
        </View>
        <View style={[Gutters.largeTMargin]}>
          <Text style={[styles.getStarted, Fonts.textLarge, Fonts.textWhite]}>{Constants.getStarted}</Text>
          <Text style={[globalStyles.titleSub, Fonts.textRegular]}>{Constants.startByChoosing}</Text>
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
    backgroundColor: "#1c1c22",
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