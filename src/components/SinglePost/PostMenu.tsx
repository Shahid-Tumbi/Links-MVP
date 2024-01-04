import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Divider, Menu, PaperProvider } from "react-native-paper";
import { Menu as MenuIcon } from '@/theme/svg';

const PostMenu = () => {
    
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
    <View style={styles.MenuContainer}>
       <MenuIcon />
                  <Menu
                        style={{backgroundColor:'rgba(255, 255, 255, 1)'}}
                        visible={visible}
                        onDismiss={closeMenu}
                        statusBarHeight={-150 }
                        anchor={<TouchableOpacity><MenuIcon onPress={openMenu}/></TouchableOpacity>}>
                        <Menu.Item trailingIcon={'content-copy'} onPress={() => {closeMenu()}} title="Follow" />
                        <Divider />
                        <Menu.Item trailingIcon={'eye-off-outline'} onPress={() => {closeMenu()}} title="Hide" />
                        <Divider />
                        <Menu.Item trailingIcon={'alert'} onPress={() => {closeMenu()}} title="Report" />
                        <Divider />
                        <Menu.Item titleStyle={{color:'red'}} theme={{ colors: { primary: 'green' } }}  trailingIcon={'delete'} onPress={() => {closeMenu()}} title="Delete" />
                  </Menu> 
    </View>
    </PaperProvider>
   
  )
}

const styles = StyleSheet.create({
    MenuContainer: {
        marginTop: 150
    }
})

export default PostMenu;





