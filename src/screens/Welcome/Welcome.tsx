import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Logo, ProceedButton } from "@/theme/svg";
import { useTheme } from "@/hooks";
import { useSelector } from "react-redux";
import { ApplicationScreenProps } from "types/navigation";

const Welcome = ({ navigation,onPress }: ApplicationScreenProps) => {
  const { Layout, Fonts, Gutters, darkMode: isDark } = useTheme();
  const authData = useSelector((state: any) => state.auth.authData);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Logo style={styles.logo} />
        <Text style={styles.welcomeText}>{`Hey, ${authData?.name}`}</Text>
        <Text style={styles.wtfText}>Welcome to the WTF Club</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.community}>Community Guidelines</Text>

        <View style={styles.rulesBox}>
          <Text style={styles.bullet}>{"\u2022"}</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Text style={styles.bullet}>{"\u2022"}</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Text style={styles.bullet}>{"\u2022"}</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Text style={styles.bullet}>{"\u2022"}</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
      </View>

      <View style={styles.proceedContainer}>
        <Text style={styles.proceedText}>PROCEED</Text>
        <ProceedButton
          style={styles.proceedButton}
          onPress={() => onPress("HomeFeed")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", 
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerContainer: {
    marginBottom: 20,
   
  },
  logo: {
    
  },
  welcomeText: {
    color: "white",
    fontSize: 50,
    marginTop: 10,
  },
  wtfText: {
    color: "white",
    fontSize: 30,
    marginTop: 5,
  },
  contentContainer: {
    marginBottom: 20,
  },
  community: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rulesBox: {},
  bullet: {
    fontSize: 20,
    marginRight: 5,
    color: "white",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  proceedContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  proceedText: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
  },
  proceedButton: {
    
  },
});

export default Welcome;
