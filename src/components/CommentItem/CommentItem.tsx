
import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';



interface Props {
  avatar: string;
  text: string;
}

const data: Props[] = [
  {
    avatar: require("../../../assets/Ellipse38.jpg"),
    // username: "Tanmay Bhat",
    text: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    // imgUrl: require("../../../assets/pexels-daniel-absi-952670.jpg"),
  },
  {
    avatar: require("../../../assets/Ellipse38.jpg"),
    // username: "Tanmay Bhat",
    text: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    // imgUrl: require("../../../assets/pexels-daniel-absi-952670.jpg"),
  },
  {
    avatar: require("../../../assets/Ellipse38.jpg"),
    // username: "Tanmay Bhat",
    text: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    // imgUrl: require("../../../assets/pexels-daniel-absi-952670.jpg"),
  },
];

export default function Comment(props) {
  const { item, index} = props;
  return (
    <View style={styles.container} key={index}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.comment}>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
}

const styles =  StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  comment: {
    marginLeft: 8,
    flex: 1
  }
});
