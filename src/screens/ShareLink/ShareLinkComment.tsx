import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Button, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';


const YourComponent = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
  
    const openBottomSheet = () => {
      bottomSheetRef.current?.expand();
    };
  
    const closeBottomSheet = () => {
      bottomSheetRef.current?.collapse();
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Pressable onPress={openBottomSheet}>
          <TextInput placeholder="Click me to see comments" />
        </Pressable>
        <Pressable onPress={closeBottomSheet} style={{ padding: 16 }}>
            <Text>Close</Text>
        </Pressable>
  
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={['25%', '50%', '90%']}
          style={{ backgroundColor: 'black',  }}
        >
          {/* Your comments list goes here */}
          <View style={{ padding: 16 }}>
            <Text>Comment 1</Text>
            <Text>Comment 2</Text>
            {/* Add more comments as needed */}
          </View>
  
          {/* Close button */}
          
        </BottomSheet>
      </View>
    );
  }

  export default YourComponent;
  