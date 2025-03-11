import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const updates = [
  {
    title: 'Admit card ',
    time: 'Today · 38 mins ago',
    image: images.Notice,
    desc: 'A vibrant event with music, dance, and fun...',
  },
  {
    title: 'NSS Registration',
    time: 'Yesterday · 4 PM',
    image: images.NoticeA,
    desc: 'Live performances from top artists and bands...',
  },
  {
    title: 'Fee Due',
    time: 'Last Week · 10 AM',
    image: images.NoticeB,
    desc: 'Exciting matches between top teams, thrilling finals...',
  },
  {
    title: 'University Holiday',
    time: 'Last Sunday · 2 PM',
    image: images.NoticeC,
    desc: 'A showcase of creative paintings, sculptures, and more...',
  },
];

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const buttons = [
  {label: 'Notice', route: 'Notice', icon: 'file'},
  {label: 'Updates', route: '', icon: 'refresh'},
  {label: 'Guid', route: '', icon: 'book'},
  {label: 'F&Q', route: 'Help', icon: 'comment-question'},
];

const UniversityHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>University -- Name</Text>
      </View>
      <ScrollView>
        <View style={styles.buttonContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.squareBox}>
              <View style={styles.activeNoticeContainer}>
                <Text style={styles.activeNoticeText}>Active Notice</Text>
                <View style={styles.underline} />
              </View>
              <View style={styles.noticeCountContainer}>
                <Text style={styles.noticeCount}>73</Text>
              </View>
            </View>

            <View style={styles.buttonGrid}>
              {buttons.map(({label, route, icon}) => (
                <View key={route} style={styles.buttonWithLabel}>
                  <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => navigation.navigate(route)}>
                    <Icon name={icon} size={40} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.labelText}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={() => navigation.navigate('Notice')}>
            <Text style={styles.actionText}>Post new</Text>
          </TouchableOpacity>
        </View>

        <View
  style={{
    flex: 1,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center', // Center child elements horizontally
    // backgroundColor: 'red',
  }}>
  <Text
    style={{
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      // backgroundColor: 'lightgray',
      borderWidth: 1.5,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor:'lightgray',
      width: '80%',
      paddingBottom:2,
      marginBottom: 5,
    }}>
    Notices
  </Text>
</View>


        <View style={styles.container}>
          {updates.map((update, index) => (
            <TouchableOpacity
              key={index}
              style={styles.updateCard}
              onPress={() =>
                navigation.navigate('NoticePageFromHome', {
                  title: update.title,
                  postTime: update.time,
                  viewCount: '78',
                  image: update.image,
                })
              }>
              <Image source={update.image} style={styles.image} />
              <View style={styles.overlayTextContainer}>
                <Text style={styles.overlayText}>{update.title}</Text>
                <Text style={styles.desc}>{update.desc}</Text>
                <Text style={styles.overlayDateTime}>{update.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* </View> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    // Border styles
    borderLeftWidth: 1,
    borderLeftColor: '#6200ea',
    borderRightWidth: 1,
    borderRightColor: '#6200ea',
    borderBottomWidth: 6,
    borderBottomColor: '#6200ea',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Shadow for Android
    elevation: 8,

    // Layout
    margin: 2,
    position: 'relative',
  },
  headingText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginVertical: 10,
  },

  buttonContainer: {
    marginTop: 30,
    padding: 15,
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  squareBox: {
    width: 140,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 100,
    elevation: 6,
  },
  activeNoticeContainer: {alignItems: 'center', paddingTop: 10},
  activeNoticeText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: 2,
  },
  underline: {height: 1, backgroundColor: 'lightgray', width: '80%'},
  noticeCountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
  },
  noticeCount: {fontSize: 65, fontWeight: 'bold', color: 'black'},

  buttonGrid: {
    width: 200,
    height: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingTop: 5,
  },
  smallButton: {
    width: 75,
    height: 75,
    borderColor: '#6200ee',
    backgroundColor: '#6200ee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: ,
  },
  actionText: {color: 'white', fontWeight: 'bold', fontSize: 16},
  galleryButton: {
    marginTop: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  buttonWithLabel: {
    alignItems: 'center',
    marginBottom: 15,
  },

  labelText: {
    marginTop: 2,
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
  },

  container: {alignItems: 'center', paddingTop: 10},
  updateCard: {
    width: 380,
    height: 250,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {width: '100%', height: '100%', resizeMode: 'cover'},
  overlayTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(98, 0, 238, 1)', // 98,0,238 is the RGB for #6200ee
    padding: 8,
    borderRadius: 5,
  },

  overlayText: {fontSize: 18, fontWeight: 'bold', color: 'white'},
  overlayDateTime: {fontSize: 12, color: 'lightgray', marginTop: 5},
  desc: {fontSize: 12, color: 'white'},
});

export default UniversityHomeScreen;
