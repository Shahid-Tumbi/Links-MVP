// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
// import React, { useState } from 'react'
// import { Button, Divider, Menu, PaperProvider, useTheme } from "react-native-paper";
// import { Menu as MenuIcon } from '@/theme/svg';


// const PostMenu = () => {
    
//     const { Fonts, Layout, Gutters, darkMode } = useTheme();
//     const [visible, setVisible] = React.useState(false);
//     const [isHoveringOverDelete, setIsHoveringOverDelete] = useState(false);

//     const openMenu = () => setVisible(true);
  
//     const closeMenu = () => setVisible(false);

//   return (
//     <PaperProvider>
//     <View style={styles.MenuContainer}>
//        <MenuIcon />
//        <Menu
//                         // style={{backgroundColor:'rgba(255, 255, 255, 1)'}}
//                         theme={{ colors: { primary: darkMode ? 'black' : 'rgb(220, 184, 255)' } }}
//                         contentStyle={{
//                           borderRadius: 25,
//                           backgroundColor: darkMode ? 'black' : 'black',
//                           padding: 8,
//                           elevation: 4, // Apply elevation for shadow on Android
//                         }}
//                         visible={visible}
//                         onDismiss={closeMenu}
//                         statusBarHeight={20} //was -150
//                         anchor={<TouchableOpacity><MenuIcon onPress={openMenu}/></TouchableOpacity>}>
                        
                        
                    
//                         <Menu.Item titleStyle={{ color: darkMode ? 'rgb(231, 225, 229)' : 'rgb(231, 225, 229)' , backgroundColor: isHoveringOverDelete ? 'red' : 'transparent'}} trailingIcon={'delete'} onPress={() => {
//                         //   deletePost(data._id);
//                         Alert.alert(
//                             'Confirm Action',
//                             'Are you sure you want to delete this post?',
//                             [
//                               {
//                                 text: 'No',
//                                 style: 'cancel',
//                                 onPress: closeMenu,
//                               },
//                               { text: 'Yes', onPress: () => deletePost(data._id) },
//                             ],
//                             { cancelable: false }
//                           );
//                         }
//                        } title="Delete" 
//                        style={{ borderRadius: 25, margin: 8 }}
//                        onMouseEnter={() => setIsHoveringOverDelete(true)}
//                        onMouseLeave={() => setIsHoveringOverDelete(false)}
//                        />
//                   </Menu>
//     </View>
//     </PaperProvider>
   
//   )
// }

// const styles = StyleSheet.create({
//     MenuContainer: {
//         backgroundColor: 'black',
//         marginTop: 150
//     }
// })

// export default PostMenu;





