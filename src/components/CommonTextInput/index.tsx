import React, { useState } from "react";
import { View,  Platform, StyleSheet } from "react-native";
import { Colors, FontFamily } from "@/theme/Variables";
import { Constants } from "@/theme/Constants";
import { CrossRed, TrueGreen } from "@/theme/svg";
import { TextInput } from "react-native-paper";

const CommonTextInput = ({
  secureEntry,
  data ,
  PlaceHolder,
  marginTop,
  marginRight,
  errorUserName,
  marginStart,
  editTrueFalse=true,
  success,
  updateMasterState,
  keyboardtype,
  style = [],
  error,
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
          textColor={Colors.white}
          editable={editTrueFalse}
          secureTextEntry={secureEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          onChangeText={(e) => {            
            updateMasterState(e);
          }}
          cursorColor={Colors.white}
          value={data}
          keyboardType={keyboardtype ? keyboardtype : Constants.keyboardType.default}
          style={[
            errorUserName ? styles.inputTextRed : isFocused ? styles.inputTextFocused : styles.inputText, ...style
          ]}
          right={
            <TextInput.Icon 
            icon={ () =>
              success ? <TrueGreen style={styles.successIcon} /> :
            error && <CrossRed style={styles.successIcon} />}
            />
          }
        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.sFPro,
    borderBottomWidth:1,
    borderBottomColor:'rgba(255, 255, 255, 0.6)',
    height: 40,
    backgroundColor:Colors.primary,
    paddingHorizontal:-20
  },
  inputTextRed: {
    flex: 1,
    borderBottomColor: Colors.error,
    borderWidth: 1,
    fontSize: 14,
    fontFamily: FontFamily.sFPro,
    borderBottomWidth:1,
    height: 40,
    backgroundColor:Colors.primary,
    paddingHorizontal:-20
  },
  inputTextFocused: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.sFPro,
    borderBottomWidth:1,
    borderBottomColor:'rgba(255, 255, 255, 0.6)',
    height: 40,
    backgroundColor:Colors.primary,
    paddingHorizontal:-20
  },
  successIcon: {
    alignItems: "center",
    alignSelf: "center",
    marginRight: "5%",
  },
});

export default CommonTextInput;
