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




// import React from 'react';
// import {
//   Image,
//   SafeAreaView,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   TouchableOpacity
// } from 'react-native';

// const SinglePostItem = () => {

//   return (
//     <SafeAreaView style={styles.container}>

//       <ImageBackground 
//         source={{uri: 'backgroundImageUrl'}} 
//         style={styles.backgroundImage}
//       >

//         <Image 
//           source={{uri: 'profilePicUrl'}}  
//           style={styles.profilePic}
//         />

//         <Text style={styles.name}>John Doe</Text>

//         <Text style={styles.bio}>
//           Software Engineer living in Silicon Valley
//         </Text>

//       </ImageBackground>

//       <TextInput
//         style={styles.commentInput}
//         placeholder="Write a comment..."
//       />

//       <View style={styles.actionIcons}>

//         <TouchableOpacity>
//           <Image source={require('./upvote.png')} />
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Image source={require('./downvote.png')} />          
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Image source={require('./share.png')} />
//         </TouchableOpacity>

//       </View>

//     </SafeAreaView>
//   );
// }





// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     width: '100%', 
//     height: 200  
//   },
//   profilePic: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     position: 'absolute',
//     top: 30, 
//     left: 40
//   },
//   name: {
//     position: 'absolute',
//     top: 140,
//     left: 40,
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold'  
//   },
//   bio: {
//     position: 'absolute',
//     top: 170,
//     left: 40,
//     color: 'white'
//   },
//   commentInput: {
//     height: 50,
//     margin: 20,
//     borderWidth: 1,
//     padding: 10
//   },
//   actionIcons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around'
//   }
// });

// export default SinglePostItem;

import React from 'react';
import { View, Image, Text, Button, StyleSheet, ImageSourcePropType } from 'react-native';

interface ProfileViewProps {}

const ProfileView: React.FC<ProfileViewProps> = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{ uri: 'https://via.placeholder.com/500' }} // Replace with your actual image URL
      />
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }} />
        <View style={styles.info}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.username}>@johndoe</Text>
          <Button title="Edit Profile" onPress={() => {}} />
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Tweets</Text>
          <Text style={styles.statValue}>1,234</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Following</Text>
          <Text style={styles.statValue}>123</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Followers</Text>
          <Text style={styles.statValue}>456</Text>
        </View>
      </View>
      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    color: '#999',
    fontSize: 18,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#999',
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
  },
  bio: {
    padding: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileView;



