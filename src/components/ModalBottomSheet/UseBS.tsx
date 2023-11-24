import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const BottomSheetInput = ({isOpen, onOpen}) => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  const comments = [
    {
      id: 1,
      author: 'Tanmay Bhat',
      authorAvatar: require('../../../assets/Ellipse38.jpg'),
      text: 'Great post!',
    },
    {
      id: 2,
      author: 'Tanmay Bhat',
      authorAvatar: require('../../../assets/Ellipse38.jpg'),
      text: 'I agree, this was very informative.',
    },
    {
      id: 3,
      author: 'Tanmay Bhat',
      authorAvatar: require('../../../assets/Ellipse38.jpg'),
      text: 'Well Done!',
    },
  ]

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  // const renderItem = useCallback(
  //   ({ item }) => (
  //     <View style={styles.itemContainer}>
  //       <Text>{item}</Text>
  //     </View>
  //   ),
  //   []
  // );
  return (
    <View style={styles.BScontainer}>
      {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} /> */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        style={styles.BS}
        enablePanDownToClose={true}
        handleIndicatorStyle={{backgroundColor: 'white', borderRadius: 10}}
        backgroundStyle={{ backgroundColor: 'black'}}

      >
        <View style={styles.header}>
        <Image source={require('../../../assets/Ellipse38.jpg')} style={styles.commentAvatar} />
              <View style={styles.commentTextContainer}>
              <Text style={styles.headerAuthor}>Tanmay Bhat started the conversation.</Text>
              <Text style={styles.headerText}>Urgent Issue! Requires Attention.</Text>
              </View>
        </View>
        <View style={styles.horizontalLine} />
        <BottomSheetFlatList style={styles.list}
          data={comments}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <Image source={item.authorAvatar} style={styles.commentAvatar} />
              <View style={styles.commentTextContainer}>
              <Text style={styles.commentAuthor}>{item.author}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
            </View>
          )}
          contentContainerStyle={styles.contentContainer}
        />

        <View style={styles.commentZone}>
          <Image source={require('../../../assets/Ellipse38.jpg')} style={styles.yourAvatar} />
          <BottomSheetTextInput style={styles.input} placeholder="Add your comment" placeholderTextColor="white"/>
        </View>

      
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  BScontainer: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "black",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  commentContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20, 
    // backgroundColor: "black",
  },
  commentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  commentTextContainer: {
    marginLeft: 10,
    flexWrap: 'wrap',
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  commentText: {
    fontSize: 15,
    color: 'white'
  },
  commentZone: {
    flexDirection: 'row',
  },
  yourAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 30,

  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    width: widthPercentageToDP('70%'),
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20, 
  },
  headerAuthor: {
    fontSize: 12,
    color: 'white'
  },
  headerText: {
    fontSize: 15,
    color: 'white'
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'white',
    marginTop: 5, // Adjust the margin as needed
    marginBottom: 10, // Adjust the margin as needed
  },
  BS: {
    // backgroundColor: 'black',
  },
  list: {
    backgroundColor: 'black',
  }

});

export default BottomSheetInput;