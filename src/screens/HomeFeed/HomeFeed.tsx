// import { ActivityIndicator, FlatList, Text } from 'react-native';
// import PostListItem from '@/components/PostListItem';
// import { gql, useQuery } from '@apollo/client';
// import { useState } from 'react';

// const postList = gql`
//   query PostListQuery {
//     postList {
//       id
//       content
//       image
//       profile {
//         id
//         name
//         position
//         image
//       }
//     }
//   }
// `;

// const postPaginatedList = gql`
//   query PostPaginatedListQuery($first: Int, $after: Int) {
//     postPaginatedList(first: $first, after: $after) {
//       id
//       content
//       image
//       profile {
//         id
//         name
//         position
//         image
//       }
//     }
//   }
// `;

// export default function HomeFeedScreen() {
//   const [hasMore, setHasMore] = useState(true);
//   const { loading, error, data, fetchMore, refetch } = useQuery(
//     postPaginatedList,
//     {
//       variables: { first: 5 },
//     }
//   );

//   const loadMore = async () => {
//     if (!hasMore) {
//       return;
//     }

//     const res = await fetchMore({
//       variables: { after: data.postPaginatedList.length },
//     });
//     if (res.data.postPaginatedList.length === 0) {
//       setHasMore(false);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   if (error) {
//     console.log(error);
//     return <Text>Something went wrong!</Text>;
//   }

//   return (
//     <FlatList
//       data={data.postPaginatedList}
//       renderItem={({ item }) => <PostListItem post={item} />}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ gap: 10 }}
//       onEndReached={loadMore}
//       refreshing={loading}
//       onRefresh={refetch}
//     />
//   );
// }


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
// import SinglePostItem from '../../components/SinglePost/SinglePostItem';

// interface Post {
//   id: string;
//   content: string;
// }

// const posts: Post[] = [
//   {
//     id: '1', 
//     content: 'Post 1'
//   },
//   {
//     id: '2',
//     content: 'Post 2' 
//   },
//   {
//     id: '3',
//     content: 'Post 3'
//   }
// ];

// export default function HomeFeed() {
//   return (
//     <View style={styles.container}>
//       <Carousel
//         layout={'default'}
//         layoutCardOffset={9}
//         removeClippedSubviews={false}
//         data={posts}
//         renderItem={({ item }) => (
//           <SinglePostItem post={item} />  
//         )}
//       />

//       {posts.slice(1).map(post => (
//         <SinglePostItem key={post.id} post={post} />  
//       ))}

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   // Carousel style
//   carousel: {
//     marginBottom: 20,
//     backgroundColor: '#fff' 
//   }
// });



// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// interface Post {
//   profilePic: string;
//   username: string; 
//   content: string;
// }

// const posts: Post[] = [
//   {
//     profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
//     username: 'john Doe',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' 
//   },
//   {
//     profilePic: 'https://randomuser.me/api/portraits/women/2.jpg', 
//     username: 'jane Doe',
//     content: 'Lorem ipsum dolor sit amet'
//   }
// ]

// export default function HomeFeed() {
//   return (
//     <View>
//       {posts.map((post, index) => (
//         <PostItem 
//           key={index}
//           profilePic={post.profilePic}
//           username={post.username}
//           content={post.content} 
//         />
//       ))}
//     </View>
//   )
// }

// interface PostItemProps {
//   profilePic: string;
//   username: string;
//   content: string;
// }

// function PostItem({profilePic, username, content}: PostItemProps) {
//   return (
//     <View style={styles.postContainer}>
//       <Image style={styles.avatar} source={{uri: profilePic}} /> 
//       <View>
//         <Text style={styles.name}>
//           {username}
//         </Text>  
//         <Text style={styles.text}>
//           {content}
//         </Text>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   postContainer: {
//     flexDirection: 'row', 
//     marginBottom: 20
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25
//   },
//   name: {
//     fontWeight: 'bold' 
//   },
//   text: {}
// });

import React from 'react';
import { FlatList } from 'react-native';
import ProfileView from '../../components/SinglePost/SinglePostItem'; 

const HomeFeed: React.FC = () => {
  // Sample data for user profiles
  const profiles = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      avatarUrl: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
      backgroundImageUrl: 'https://via.placeholder.com/500',
      tweets: 1234,
      following: 123,
      followers: 456,
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },

    {
      id: 2,
      name: 'John Doe',
      username: 'johndoe',
      avatarUrl: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
      backgroundImageUrl: 'https://via.placeholder.com/500',
      tweets: 1234,
      following: 123,
      followers: 456,
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },

    {
      id: 3,
      name: 'John Doe',
      username: 'johndoe',
      avatarUrl: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
      backgroundImageUrl: 'https://via.placeholder.com/500',
      tweets: 1234,
      following: 123,
      followers: 456,
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    
  ];

  const renderProfile = ({ item }) => <ProfileView {...item} />;

  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderProfile}
    />
  );
};

export default HomeFeed;

// import React from 'react';
// import { FlatList, View } from 'react-native';
// import Carousel, { ParallaxImage, CarouselProps } from 'react-native-snap-carousel';
// import ProfileView from '../../components/SinglePost/SinglePostItem';

// interface Profile {
//   id: number;
//   name: string;
//   username: string;
//   avatarUrl: string;
//   backgroundImageUrl: string;
//   tweets: number;
//   following: number;
//   followers: number;
//   bio: string;
// }

// const HomeFeed: React.FC = () => {
//   const profiles: Profile[] = [
//     {
//       id: 1,
//       name: 'John Doe',
//       username: 'johndoe',
//       avatarUrl: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
//       backgroundImageUrl: 'https://via.placeholder.com/500',
//       tweets: 1234,
//       following: 123,
//       followers: 456,
//       bio:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     },
//     // Add more profiles as needed
//   ];

//   const renderProfile = ({ item }: { item: Profile }) => <ProfileView {...item} />;

//   const renderCarouselItem = ({ item, index }: CarouselProps<Profile>) => (
//     <ParallaxImage
//       source={{ uri: item.backgroundImageUrl }}
//       containerStyle={{ flex: 1, borderRadius: 8 }}
//       parallaxFactor={0.4}
//     />
//   );

//   const isFirstItem = (index: number) => index === 0;

//   const carouselData: Profile[] = [profiles[0], profiles[0]];

//   return (
//     <FlatList
//       data={profiles}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item, index }) => {
//         return isFirstItem(index) ? (
//           <Carousel
//             data={carouselData}
//             renderItem={(carouselItem) => renderCarouselItem(carouselItem)}
//             sliderWidth={300}
//             itemWidth={300}
//             hasParallaxImages
//           />
//         ) : (
//           <View>{renderProfile({ item })}</View>
//         );
//       }}
//     />
//   );
// };

// export default HomeFeed;









