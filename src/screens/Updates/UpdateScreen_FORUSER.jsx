import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../assets/images';
import { useNavigation } from '@react-navigation/native';

const updates = [
  { title: 'Admit card ', time: 'Today · 38 mins ago', image: images.Notice, desc: 'A vibrant event with music, dance, and fun...' },
  { title: 'NSS Registration', time: 'Yesterday · 4 PM', image: images.NoticeA, desc: 'Live performances from top artists and bands...' },
  { title: 'Fee Due', time: 'Last Week · 10 AM', image: images.NoticeB, desc: 'Exciting matches between top teams, thrilling finals...' },
  { title: 'University Holiday', time: 'Last Sunday · 2 PM', image: images.NoticeC, desc: 'A showcase of creative paintings, sculptures, and more...' }, // Repeated
  // { title: 'Tech Conference', time: 'Monday · 10 AM', image: images.Music_event, desc: 'Latest innovations in AI, blockchain, and technology...' } // Repeated
];

const UpdateScreen_FORUSER = () => {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {updates.map((update, index) => (
            <TouchableOpacity
              key={index}
              style={styles.updateCard}
              onPress={() =>
                navigation.navigate('UpdatesPage', {
                  title: update.title,
                  postTime: update.time,
                  viewCount: '78',
                  image: update.image,
                })
              } // Navigate with update data
            >
              <Image source={update.image} style={styles.image} />
              <View style={styles.overlayTextContainer}>
                <Text style={styles.overlayText}>{update.title}</Text>
                <Text style={styles.desc}>{update.desc}</Text>
                <Text style={styles.overlayDateTime}>{update.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default UpdateScreen_FORUSER;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
  },
  updateCard: {
    width: 380,
    height: 250,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 5,
  },
  overlayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  overlayDateTime: {
    fontSize: 12,
    color: 'lightgray',
    marginTop: 5,
  },
  desc:{
    fontSize: 12,
    color: 'white',
  },
});
