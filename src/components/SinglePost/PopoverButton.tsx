import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Popover from 'react-native-popover-view'

const PopoverButton = () => {
    const [showPopover, setShowPopover] = useState(false);
  return (
    <>
    <TouchableOpacity onPress={() => setShowPopover(true)}>
      <Text>Delete</Text>
    </TouchableOpacity>
    <Popover from={() => setShowPopover(true)} isVisible={showPopover} onRequestClose={() => setShowPopover(false)}>
      <Text>Are you sure you want to delete?</Text>
    </Popover>
  </>
  );
}

export default PopoverButton;

const styles = StyleSheet.create({})