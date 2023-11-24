import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/hooks';
import { Constants } from '@/theme/Constants';
import { ApplicationScreenProps } from 'types/navigation';
import { BackButton, True } from '@/theme/svg';
import { globalStyles } from '@/theme/GlobalStyles';
import { Loader } from '@/components';

const ChangePassword = ({navigation}: ApplicationScreenProps) => {
    const {
        Layout,
        Fonts,
        Gutters,
        darkMode: isDark,
    } = useTheme();
  return (
    <View style={[globalStyles.container]}>
            {isLoading && <Loader state={isLoading} />}
            <View style={[globalStyles.screenMargin]}>
                <View style={[globalStyles.header]}>
                    <BackButton style={[Gutters.tinyTMargin]} onPress={() => navigation.goBack()} />
                    <View>
                        <Text style={[Fonts.textVeryLarge, Fonts.textWhite]}>{Constants.editProfile}</Text>
                    </View>
                    <True style={[Gutters.tinyTMargin]} onPress={() => onSubmit()} />
                </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})