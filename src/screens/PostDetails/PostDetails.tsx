// import { ActivityIndicator, ScrollView, Text } from 'react-native';
// import posts from '../../../assets/data/posts.json';
// import PostListItem from '@/components/PostListItem';
// import { useLocalSearchParams } from 'expo-router';
// import { gql, useQuery } from '@apollo/client';

// const query = gql`
//   query MyQuery($id: ID!) {
//     post(id: $id) {
//       content
//       id
//       image
//       profile {
//         id
//         name
//         image
//         position
//       }
//     }
//   }
// `;

// export default function PostDetailsScreen() {
//   const { id } = useLocalSearchParams();
//   const { loading, error, data } = useQuery(query, { variables: { id } });

//   if (loading) {
//     return <ActivityIndicator />;
//   }
//   if (error) {
//     console.log(error);
//     return <Text>Something went wrong...</Text>;
//   }

//   return (
//     <ScrollView>
//       <PostListItem post={data.post} />
//     </ScrollView>
//   );
// }

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
} from 'react-native';

import LinkPreview from '@flyerhq/react-native-link-preview';
import BottomSheet from '@gorhom/bottom-sheet';

const PostDetails = () => {
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const comments = [
    {
      profilePic: require('../assets/user1.png'),
      username: 'John Doe', 
      comment: 'Great article!',
    },
    {
      profilePic: require('../assets/user2.png'),
      username: 'Jane Doe',
      comment: 'Nice findings.', 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      <LinkPreview
        url="https://www.example.com/article.html"
        style={styles.linkPreview} 
      />

      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={comment}
        onChangeText={setComment}
        onFocus={() => setIsOpen(true)}
      />
      
      <BottomSheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <View style={styles.sheet}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.comment}>
              <Image source={comment.profilePic} style={styles.avatar} />

              <View>
                <Text style={styles.username}>{comment.username}</Text>
                <Text style={styles.commentText}>{comment.comment}</Text>  
              </View>

              {index < comments.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </BottomSheet>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  linkPreview: {
    marginBottom: 16,
  },

  input: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 8,
  },

  sheet: {
    backgroundColor: '#fff',
  },

  comment: {
    flexDirection: 'row',
    padding: 8,
  },

  avatar: {
    width: 32, 
    height: 32,
    borderRadius: 16,
  },

  username: {
    fontWeight: 'bold',
    marginBottom: 4,
  },

  commentText: {},

  divider: {
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default PostDetails;
