import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'

export default Notifications = () => {
  const data = [
    {
      id: 3,
      image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      name: 'March SoulLaComa',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: 'https://via.placeholder.com/100x100/FFB6C1/000000',
    },
    {
      id: 2,
      image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      name: 'John DoeLink',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: 'https://via.placeholder.com/100x100/20B2AA/000000',
    },
    {
      id: 4,
      image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      name: 'Finn DoRemiFaso',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 5,
      image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      name: 'Maria More More',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 1,
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      name: 'Frank Odalthh',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: 'https://via.placeholder.com/100x100/7B68EE/000000',
    },
    {
      id: 6,
      image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      name: 'Clark June Boom!',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 7,
      image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      name: 'The googler',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
  ]

  const [comments, setComments] = useState(data)

  return (
    <FlatList
      style={styles.root}
      data={comments}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />
      }}
      keyExtractor={item => {
        return item.id
      }}
      renderItem={item => {
        const Notification = item.item
        let attachment = <View />

        let mainContentStyle
        if (Notification.attachment) {
          mainContentStyle = styles.mainContent
          attachment = <Image style={styles.attachment} source={{ uri: Notification.attachment }} />
        }
        return (
          <TouchableOpacity style={styles.container}>
            <Image source={{ uri: Notification.image }} style={styles.avatar} />
            <View style={styles.content}>
              <View style={mainContentStyle}>
                <View style={styles.text}>
                  <Text style={styles.name}>{Notification.name}</Text>
                  <Text>{Notification.text}</Text>
                </View>
                <Text style={styles.timeAgo}>2 hours ago</Text>
              </View>
              {attachment}
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: '#1E90FF',
  },
})

/*  Here is some example React Native code in TSX to create notification cards similar to Reddit's in-app notifications:

```tsx
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

interface Notification {
  icon: string;
  title: string;
  message: string;
}

const notifications: Notification[] = [
  {
    icon: 'bell', 
    title: 'Notification Title',
    message: 'Notification message text goes here.'
  },
  {
    icon: 'mail',
    title: 'New Message', 
    message: 'You have 1 new private message.'
  }
];

export default function Notifications() {

  return (
    <View>
      {notifications.map((notification, index) => (
        <React.Fragment key={index}>
          <NotificationCard 
            icon={notification.icon}
            title={notification.title}
            message={notification.message} 
          />
          {index < notifications.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </View>
  );

}

const NotificationCard = ({icon, title, message}) => {

  return (
    <View style={styles.card}>
      <Image source={{uri: `https://site.com/icons/${icon}.svg`}} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text> 
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  )

}

const Divider = () => <View style={styles.divider} />

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16
  },
  icon: {
    width: 40,
    height: 40    
  },
  textContainer: {
    marginLeft: 16,
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold'
  },
  message: {
    color: '#777'
  },
  divider: {
    height: 1,
    backgroundColor: '#eee'
  }
});
```

This generates the notification cards with SVG icon on the left and formatted text on the right, separated by horizontal dividers. Let me know if any part needs more explanation! */