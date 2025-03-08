import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const NoticePage = ({ route, navigation }) => {
  const props = route.params || {};
  const [scale, setScale] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [image, setImage] = useState(props.image);

  const onPinchEvent = (event) => {
    setScale(event.nativeEvent.scale);
  };

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      setScale(Math.max(1, event.nativeEvent.scale));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    navigation.setParams({ title, image });
  };

  const handleCancel = () => {
    setTitle(props.title);
    setImage(props.image);
    setIsEditing(false);
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        setImage({ uri: response.assets[0].uri });
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          {isEditing ? (
            <TextInput
              style={styles.editableTitle}
              value={title}
              onChangeText={setTitle}
              autoFocus
            />
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
          <View style={styles.iconContainer}>
            {isEditing ? (
              <>
                <TouchableOpacity style={styles.iconButton} onPress={handleSave}>
                  <Icon name="checkmark" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleCancel}>
                  <Icon name="close" size={24} color="#F44336" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
                  <Icon name="pencil" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="trash" size={24} color="#F44336" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        {props.postTime && <Text style={styles.postTime}>{props.postTime}</Text>}
        <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={onPinchStateChange}>
          <TouchableOpacity disabled={!isEditing} onPress={pickImage}>
            <Image
              source={image}
              style={[
                styles.image,
                { transform: [{ scale }], maxHeight: screenHeight * 0.7, maxWidth: screenWidth * 0.9 },
                isEditing && styles.editableImage
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </PinchGestureHandler>
        {props.viewCount && <Text style={styles.viewCount}>Views: {props.viewCount}</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E3F2FD' },
  card: { height: '95%', width: '90%', backgroundColor: 'white', borderRadius: 15, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1976D2' },
  editableTitle: { fontSize: 28, fontWeight: 'bold', color: '#1976D2', borderBottomWidth: 2, borderColor: '#90CAF9' },
  iconContainer: { flexDirection: 'row' },
  iconButton: { marginLeft: 10, padding: 8, backgroundColor: '#F5F5F5', borderRadius: 50 },
  postTime: { fontSize: 14, fontStyle: 'italic', color: '#616161', marginVertical: 10 },
  image: { width: '100%', height: '80%', borderRadius: 10,  },
  editableImage: { borderColor: '#FF9800', borderWidth: 3 },
  viewCount: { fontSize: 18, color: '#424242', marginTop: 12, fontWeight: '500' },
});

export default NoticePage;
