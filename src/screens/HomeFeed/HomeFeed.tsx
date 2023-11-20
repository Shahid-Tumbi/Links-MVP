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


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SinglePostItem from './SinglePostItem';

interface Post {
  id: string;
  content: string;
}

const posts: Post[] = [
  {
    id: '1', 
    content: 'Post 1'
  },
  {
    id: '2',
    content: 'Post 2' 
  },
  {
    id: '3',
    content: 'Post 3'
  }
];

export default function HomeFeed() {
  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        layoutCardOffset={9}
        removeClippedSubviews={false}
        data={posts}
        renderItem={({ item }) => (
          <SinglePostItem post={item} />  
        )}
      />

      {posts.slice(1).map(post => (
        <SinglePostItem key={post.id} post={post} />  
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Carousel style
  carousel: {
    marginBottom: 20,
    backgroundColor: '#fff' 
  }
});




