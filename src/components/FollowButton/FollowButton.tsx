import React from 'react'; import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FollowButtonProps { following: boolean; onPress: () => void; }

const FollowButton = ({following, onPress}: FollowButtonProps) => {

return ( <TouchableOpacity style={styles.container} onPress={onPress}> <Text style={styles.text}> {following ? 'Following' : 'Follow'}
</Text> </TouchableOpacity> ); }

const styles = StyleSheet.create({ container: { backgroundColor: '#0095f6', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 4, }, text: { color: 'white', fontWeight: '600' } });

export default FollowButton;