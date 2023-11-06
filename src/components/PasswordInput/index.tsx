import { useTheme } from "@/hooks";
import { Colors, FontFamily } from "@/theme/Variables";
import React, { useState } from "react";
import { View, Platform, TouchableOpacity, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const PasswordInput = (props:any) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    secureEntry,
    data,
    PlaceHolder,
    marginTop,
    marginRight,
    errorUserName,
    marginStart,
    editTrueFalse,
    isVisible,
    passVisible,
    updateMasterState,
    attrName,
  } = props;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (e:any) => {            
    updateMasterState(e);
  }

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
      <View style={{ width: "100%" }}>
        <TextInput
          placeholder={PlaceHolder}
          placeholderTextColor={Colors.white}
          textColor={Colors.white}
          editable={editTrueFalse}
          secureTextEntry={!passVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          value={data}
          cursorColor={Colors.white}
          selectionColor={Colors.white}
          style={[
            errorUserName? styles.passwordTextRed : isFocused? styles.passwordTextFocused : styles.passwordInput,
          ]}
          right={
            <TextInput.Icon
              icon={passVisible? "eye-outline" : "eye-off-outline"}
              onPress={isVisible}
              color={'rgba(255, 255, 255, 0.6)'}
            />
          }
        />
      </View>
    </View>
  );
  
};
const styles = StyleSheet.create({
  passwordTextRed: {
  borderBottomWidth: 1,
  borderBottomColor: Colors.error,
  fontSize: 14,
  fontFamily: FontFamily.sFPro,
  height: 50,
  backgroundColor:Colors.primary,
  paddingHorizontal:-20  
},
passwordInput: {
  fontSize: 14,
  fontFamily: FontFamily.sFPro,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, 0.6)',
  height: 50,
  backgroundColor:Colors.primary,
  paddingHorizontal:-20
},
passwordTextFocused: {
  fontSize: 14,
  fontFamily: FontFamily.sFPro,
  height: 50,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, 0.6)',
  backgroundColor:Colors.primary,
  paddingHorizontal:-20
}});
export default PasswordInput;