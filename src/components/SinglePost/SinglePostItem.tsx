// import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
// import { Post } from '@/types';
// import { FontAwesome } from '@expo/vector-icons';
// import { Link } from 'expo-router';

// type PostListItemProps = {
//   post: Post;
// };

// type FooterButtonProp = {
//   text: string;
//   icon: React.ComponentProps<typeof FontAwesome>['name'];
// };

// function FooterButton({ text, icon }: FooterButtonProp) {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       <FontAwesome name={icon} size={16} color="gray" />
//       <Text style={{ marginLeft: 5, color: 'gray', fontWeight: '500' }}>
//         {text}
//       </Text>
//     </View>
//   );
// }

// export default function PostListItem({ post }: PostListItemProps) {
//   return (
//     <Link href={`/posts/${post.id}`} asChild>
//       <Pressable style={styles.container}>
//         {/* Header */}
//         <Link href={`/users/${post.profile.id}`} asChild>
//           <Pressable style={styles.header}>
//             <Image
//               source={{ uri: post.profile.image }}
//               style={styles.userImage}
//             />
//             <View>
//               <Text style={styles.userName}>{post.profile.name}</Text>
//               <Text>{post.profile.position}</Text>
//             </View>
//           </Pressable>
//         </Link>

//         {/* Text content */}
//         <Text style={styles.content}>{post.content}</Text>

//         {/* Image content */}
//         {post.image && (
//           <Image source={{ uri: post.image }} style={styles.postImage} />
//         )}

//         {/* Footer */}
//         <View style={styles.footer}>
//           <FooterButton text="Like" icon="thumbs-o-up" />
//           <FooterButton text="Comment" icon="comment-o" />
//           <FooterButton text="Share" icon="share" />
//         </View>
//       </Pressable>
//     </Link>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     width: '100%',
//     maxWidth: 500,
//     alignSelf: 'center',
//   },

//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   userName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },

//   // Body
//   content: {
//     margin: 10,
//     marginTop: 0,
//   },
//   postImage: {
//     width: '100%',
//     aspectRatio: 1,
//   },

//   // footer
//   footer: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     justifyContent: 'space-around',
//     borderTopWidth: 0.5,
//     borderColor: 'lightgray',
//   },
// });




import React from 'react';
import {
  Image,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';

const SinglePostItem = () => {

  return (
    <SafeAreaView style={styles.container}>

      <ImageBackground 
        source={{uri: 'backgroundImageUrl'}} 
        style={styles.backgroundImage}
      >

        <Image 
          source={{uri: 'profilePicUrl'}}  
          style={styles.profilePic}
        />

        <Text style={styles.name}>John Doe</Text>

        <Text style={styles.bio}>
          Software Engineer living in Silicon Valley
        </Text>

      </ImageBackground>

      <TextInput
        style={styles.commentInput}
        placeholder="Write a comment..."
      />

      <View style={styles.actionIcons}>

        <TouchableOpacity>
          <Image source={require('./upvote.png')} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={require('./downvote.png')} />          
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={require('./share.png')} />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%', 
    height: 200  
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: 30, 
    left: 40
  },
  name: {
    position: 'absolute',
    top: 140,
    left: 40,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'  
  },
  bio: {
    position: 'absolute',
    top: 170,
    left: 40,
    color: 'white'
  },
  commentInput: {
    height: 50,
    margin: 20,
    borderWidth: 1,
    padding: 10
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default SinglePostItem;


