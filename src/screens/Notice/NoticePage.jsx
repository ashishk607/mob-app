import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {useAuth} from '../../context/AuthContext'; // Assuming you have auth context
import {API_BASE_URL} from '@env';



const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const NoticePage = ({route, navigation}) => {
  const props = route.params || {};
  const [scale, setScale] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [image, setImage] = useState(props.image);
  const [Role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const {authState, logout} = useAuth();
  const {token} = authState || {};

  useEffect(() => {
    fetchUserRole();
  }, [token]);

  const fetchUserRole = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/current-user`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (response.status === 401 || response.status === 403) {
        Alert.alert('Session Expired', 'Your session has expired. Please log in again.');
        logout();
        return;
      }

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setRole(responseData.data.role);
      } else {
        Alert.alert('Error', responseData.message || 'Failed to fetch user role.');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      Alert.alert('Error', 'Something went wrong while fetching user role.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const onPinchEvent = event => {
    setScale(event.nativeEvent.scale);
  };

  const onPinchStateChange = event => {
    if (event.nativeEvent.state === State.END) {
      setScale(Math.max(1, event.nativeEvent.scale));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    navigation.setParams({title, image});
  };

  const handleCancel = () => {
    setTitle(props.title);
    setImage(props.image);
    setIsEditing(false);
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (!response.didCancel && !response.error && response.assets) {
        setImage({uri: response.assets[0].uri});
      }
    });
  };

  const handleDelete = () => {
    console.log('Delete button pressed');

    InteractionManager.runAfterInteractions(() => {
      Alert.alert('Delete Notice', `Are you sure you want to delete "${title}"?`, [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Yes, Delete',
          onPress: () => {
            Toast.show(`Notice "${title}" has been deleted`, Toast.LONG);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]);
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
          {Role === 'collegeAdmin'  && (
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
                  <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
                    <Icon name="trash" size={24} color="#F44336" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
        {props.postTime && <Text style={styles.postTime}>{props.postTime}</Text>}
        <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={onPinchStateChange}>
          <TouchableOpacity disabled={!isEditing} onPress={pickImage}>
            <Image
              source={image}
              style={[
                styles.image,
                {transform: [{scale}], maxHeight: screenHeight * 0.7, maxWidth: screenWidth * 0.9},
                isEditing && styles.editableImage,
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
  scrollContainer: {flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E3F2FD'},
  card: {height: '95%', width: '90%', backgroundColor: 'white', borderRadius: 15, padding: 20, shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 6, elevation: 8},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 10},
  title: {fontSize: 28, fontWeight: 'bold', color: '#1976D2'},
  editableTitle: {fontSize: 28, fontWeight: 'bold', color: '#1976D2', borderBottomWidth: 2, borderColor: '#90CAF9'},
  iconContainer: {flexDirection: 'row'},
  iconButton: {marginLeft: 10, padding: 8, backgroundColor: '#F5F5F5', borderRadius: 50},
  postTime: {fontSize: 14, fontStyle: 'italic', color: '#616161', marginVertical: 10},
  image: {width: '100%', height: '80%', borderRadius: 10},
  editableImage: {borderColor: '#FF9800', borderWidth: 3},
  viewCount: {fontSize: 18, color: '#424242', marginTop: 12, fontWeight: '500'},
});

export default NoticePage;
