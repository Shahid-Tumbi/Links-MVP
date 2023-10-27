import { StyleSheet } from "react-native";
import { Colors } from "./Variables";

  /* border radiuses */
  export const Border = {
    br_3xs: 10,
    br_81xl: 100,
  };
  /* Global CSS*/
  export const globalStyles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: Colors.primary,
    },
    screenMargin: {  
        marginStart: 20,
        marginEnd:20,
        marginTop:15,
        flex:1
    },
    header: {
      flex: 0.1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    titleSub: {
      alignSelf: "flex-start",
      marginTop: "3%",
    },
  });