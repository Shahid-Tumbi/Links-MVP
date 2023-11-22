

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
