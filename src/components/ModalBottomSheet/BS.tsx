import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const BS = () => {

    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
    const bottomSheetReference = useRef<BottomSheet>(null);
    const handleClosePress = () => bottomSheetReference.current?.close();
    const handleOpenPress = () => bottomSheetReference.current?.expand();
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />, []);
  return (
    <View style={styles.container}>
        <Button title="Open" onPress={handleOpenPress} />
        <Button title="Close" onPress={handleClosePress} />
      <BottomSheet ref={bottomSheetReference} snapPoints={snapPoints} enablePanDownToClose={true} backdropComponent={renderBackdrop} backgroundStyle={{ backgroundColor : 'black'}}>
        <View style={styles.contentContainer}>
            <Text style={styles.containerHeadline}>This is awesome!</Text>
        </View>
      </BottomSheet>
    </View>
  )
}   

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    containerHeadline: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 20,
      color: '#fff'
    }
   
  });

export default BS