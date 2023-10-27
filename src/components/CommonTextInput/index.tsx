import React, { useState } from "react";
import { View,  Platform, StyleSheet } from "react-native";
import { Colors, FontFamily } from "@/theme/Variables";
import { TextInput } from "react-native-gesture-handler";
import { Constants } from "@/theme/Constants";

const CommonTextInput = ({
  secureEntry,
  data ,
  PlaceHolder,
  marginTop,
  marginRight,
  errorUserName,
  marginStart,
  editTrueFalse,
  success,
  updateMasterState,
  keyboardtype
} : any ) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        {
          marginHorizontal: Platform.OS == "ios" ? 15 : 0,
          marginStart: marginStart ? marginStart : 0,
          marginRight: marginRight ? marginRight : 0,
          marginTop: marginTop ? marginTop : 20,
        },
      ]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={PlaceHolder}
          placeholderTextColor={Colors.textGray400}
          color={Colors.white}
          editable={editTrueFalse ? editTrueFalse : true}
          secureTextEntry={secureEntry ? secureEntry : false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(e) => {            
            updateMasterState(e);
          }}
          value={data}
          keyboardType={keyboardtype ? keyboardtype : Constants.keyboardType.default}
          style={[
            errorUserName ? styles.inputTextRed : isFocused ? styles.inputTextFocused : styles.inputText,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    backgroundColor: Colors.gray,
    borderRadius: 10,
    flexDirection: "row",
  },
  inputText: {
    flex: 1,
    borderColor: "transparent",
    padding: Platform.OS == "ios" ? 10 : 15,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: FontFamily.sFPro,
    paddingStart: 15,
  },
  inputTextRed: {
    flex: 1,
    borderColor: Colors.error,
    borderWidth: 1,
    padding: Platform.OS == "ios" ? 10 : 15,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: FontFamily.sFPro,
  },
  inputTextFocused: {
    flex: 1,
    borderColor: "transparent",
    padding: Platform.OS == "ios" ? 10 : 15,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: FontFamily.sFPro,
    paddingStart: 15,
  },
  successIcon: {
    alignItems: "center",
    alignSelf: "center",
    marginRight: "5%",
  },
});

export default CommonTextInput;
