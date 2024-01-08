
// import React from 'react';
// import { Image, Text, View, StyleSheet } from 'react-native';



// interface Props {
//   avatar: string;
//   text: string;
// }

// const data: Props[] = [
//   {
//     avatar: require("../../../assets/Ellipse38.jpg"),
//     // username: "Tanmay Bhat",
//     text: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
//     // imgUrl: require("../../../assets/pexels-daniel-absi-952670.jpg"),
//   },
//   {
//     avatar: require("../../../assets/Ellipse38.jpg"),
//     // username: "Tanmay Bhat",
//     text: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
//     // imgUrl: require("../../../assets/pexels-daniel-absi-952670.jpg"),
//   },
//   {
//     avatar: require("../../../assets/Ellipse38.jpg"),
//     // username: "Tanmay Bhat",
//     text: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     // imgUrl: require("../../../assets/pexels-daniel-absi-952670.jpg"),
//   },
// ];

// export default function Comment(props) {
//   const { item, index} = props;
//   return (
//     <View style={styles.container} key={index}>
//       <Image source={item.avatar} style={styles.avatar} />
//       <View style={styles.comment}>
//         <Text>{item.text}</Text>
//       </View>
//     </View>
//   );
// }

// const styles =  StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     marginVertical: 8
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20
//   },
//   comment: {
//     marginLeft: 8,
//     flex: 1
//   }
// });

import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button } from 'react-native';

const CommentInput = () => {
  const [comments, setComments] = useState([
    {
      user: 'user1',
      text: 'This is a great video! Thanks for sharing.', 
      timestamp: '1 day ago'
    },
    {
      user: 'user2', 
      text: 'I learned a lot from this video. Keep up the good work!',
      timestamp: '2 days ago'
    },
    {
      user: 'user3',
      text: 'Great content! Looking forward to more videos like this.',  
      timestamp: '3 days ago'
    }
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // submit logic
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '80%'}}>

        <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10}}>
          Comments
        </Text>

        {comments.map(item => (
          <View key={item.user} style={{flexDirection: 'row', marginVertical: 10}}>
            <Image 
              source={{uri: '/placeholder-user.jpg'}}
              style={{width: 40, height: 40, borderRadius: 20}}
            />
            <View style={{marginLeft: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontWeight: '600'}}>{item.user}</Text>
                <Text style={{color: 'gray', marginLeft: 10}}>{item.timestamp}</Text>
              </View>
              <Text>{item.text}</Text>
            </View>
          </View>
        ))}


        <TextInput 
          style={{borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10}}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Add Your Comment"
        />
      </View>
    </View>
  );
};

export default CommentInput;

