


// import React, { useState } from 'react';
// import { 
//   View, 
//   TextInput,
//   Text,
//   TouchableOpacity
// } from 'react-native';

// import { LinkPreview } from '@flyerhq/react-native-link-preview';
// import { BottomSheet } from '@gorhom/bottom-sheet';

// import styles from './Styles';

// export default function App() {

//   const [link, setLink] = useState('https://www.example.com');

//   const [commentsVisible, setCommentsVisible] = useState(false);

//   const [comments, setComments] = useState([
//     'First comment',
//     'Second comment'
//   ]);

//   const onLinkPress = () => {
//     // Logic to handle link press
//   };

//   const onCommentAdd = () => {
//     // Logic to add comment
//   };

//   const renderComments = () => (
//     <View>
//       {comments.map(comment => (
//         <Text key={comment}>{comment}</Text>  
//       ))}
//     </View>
//   );

//   return (
//     <View style={styles.container}>

//       <LinkPreview
//         style={styles.linkPreview} 
//         url={link}
//         onPress={onLinkPress} 
//       />

//       <TextInput
//         style={styles.textInput}
//         placeholder="Add a comment"
//         onFocus={() => setCommentsVisible(true)}
//       />

//       <BottomSheet 
//         visible={commentsVisible}
//         onDismiss={() => setCommentsVisible(false)}
//       >
//         {renderComments()}
//       </BottomSheet>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16
//   },

//   linkPreview: {
//     marginBottom: 16
//   },

//   textInput: {
//     borderWidth: 1,
//     padding: 8
//   }

// })


import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  text: string;
}

interface RelatedPost {
  id: number;
  title: string;
  image: string;
}

interface BlogPost {
  id: number;
  title: string;
  image: string;
  content: string;
  comments: Comment[];
  relatedPosts: RelatedPost[];
}

const CommentScreen: React.FC = () => {
  const post: BlogPost = {
    id: 1,
    title: 'My Awesome Blog Post',
    image: 'https://www.bootdey.com/image/280x280/6495ED/000000',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    comments: [
      {
        id: 1,
        author: 'Jane Doe',
        authorAvatar: 'https://www.bootdey.com/img/Content/avatar/avatar2.png',
        text: 'Great post!',
      },
      {
        id: 2,
        author: 'John Smith',
        authorAvatar: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
        text: 'I agree, this was a very informative and well-written post.',
      },
    ],
    relatedPosts: [
      {
        id: 2,
        title: '5 Tips for Better Blog Writing',
        image: 'https://www.bootdey.com/image/280x280/ADFF2F/000000',
      },
      {
        id: 3,
        title: 'The Importance of SEO in Blogging',
        image: 'https://www.bootdey.com/image/280x280/FF69B4/000000',
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Image source={{ uri: post.image }} style={styles.image} />
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.sectionTitle}>Comments</Text>
      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Image source={{ uri: item.authorAvatar }} style={styles.commentAvatar} />
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentAuthor}>{item.author}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    marginVertical: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  commentContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  commentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  commentTextContainer: {
    marginLeft: 10,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 16,
  },

  relatedPostContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  relatedPostImage: {
    width: 50,
    height: 50,
  },
  relatedPostTitle: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CommentScreen;

