import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_BASE_URL } from '@env';
import * as ImagePicker from 'react-native-image-picker';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { authState, logout } = useAuth();
  const { token } = authState;

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
  });

  useEffect(() => {
    if (!token) {
      Alert.alert('Session Expired', 'Please login again.', [{ text: 'OK', onPress: logout }]);
      return;
    }
    console.log(token);
    fetchUserDetails();
  }, [token]);
  const fetchUserDetails = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/current-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 401 || response.status === 403) {
        Alert.alert('Session Expired', 'Your session has expired. Please log in again.');
        logoutUser();
        return;
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.log('Unexpected Response:', textResponse);
        throw new Error('Invalid response format. Expected JSON.');
      }
  
      const responseData = await response.json();
      console.log('User Details:', responseData);
  
      if (response.ok && responseData.success) {
        const { fullName, email, mobileNo, avatar } = responseData.data;
        setForm({ name: fullName || '', email: email || '', number: mobileNo || '' });
        setProfileImage(avatar ? { uri: avatar } : null);
      } else {
        Alert.alert('Error', responseData.message || 'Failed to fetch user details.');
      }
    } 
    catch (error) {
      console.log('Error fetching user details:', error);
      Alert.alert('Something went wrong while fetching user data.');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };
  
  
  // const fetchUserDetails = async () => {
  //   setRefreshing(true);
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/current-user`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     const responseData = await response.json();
  //     console.log('User Details:', responseData);
  //     if (response.ok && responseData.success) {
  //       const { fullName, email, mobileNo, avatar } = responseData.data;
  //       setForm({ name: fullName || '', email: email || '', number: mobileNo || '' });
  //       setProfileImage(avatar ? { uri: avatar } : null);
  //     } else {
  //       Alert.alert('Error', responseData.message || 'Failed to fetch user details.');
  //     }
  //   } 
  //   catch (error) {
  //     console.log('Error fetching user details:', error);
  //     Alert.alert('Error', 'Something went wrong while fetching user data.');
  //   } finally {
  //     setRefreshing(false);
  //     setLoading(false);
  //   }
  // };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/update-account`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully');
        fetchUserDetails();
        setIsEditing(false);
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while updating profile');
    }
  };

  const pickImage = async () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 1 }, async (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets?.length) {
        setProfileImage({ uri: response.assets[0].uri });
        await uploadProfileImage(response.assets[0]);
      }
    });
  };

  const uploadProfileImage = async (image) => {
    if (!image || !image.uri) {
      Alert.alert('Error', 'Invalid image selected.');
      return;
    }
  
    setUploading(true);
    try {
      console.log('Uploading image:', image);
      
      const formData = new FormData();
      formData.append('avatar', {
        uri: image.uri,
        type: image.type || 'image/jpeg', // Ensure a valid MIME type
        name: image.fileName || `avatar_${Date.now()}.jpg`,
      });
  
      const response = await fetch(`${API_BASE_URL}/avatar`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Ensure correct content type
        },
      });
  
      const data = await response.json();
      console.log('Upload Response:', data);
  
      if (response.ok) {
        Alert.alert('Success', 'Profile image updated successfully');
        fetchUserDetails();
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile image');
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      Alert.alert('Error', 'Something went wrong while updating the profile image');
    } finally {
      setUploading(false);
    }
  };
  

  const onRefresh = useCallback(() => fetchUserDetails(), []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loaderText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.profileInfo}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profileImage || require('../assets/default-avatar.png')}
            style={styles.profileImage}
          />
          <View style={styles.editIcon}>
            <Icon name="camera" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.name}>{form.name}</Text>
          <Text style={styles.username}>{form.email}</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        {['name', 'number'].map((key) => (
          <View key={key} style={styles.fieldInput}>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={form[key]}
              onChangeText={(text) => setForm({ ...form, [key]: text })}
              editable={isEditing}
              placeholder={key === 'name' ? 'Full Name' : 'Mobile Number'}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => (isEditing ? handleSave() : setIsEditing(true))}>
        {uploading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#696969',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 20,
  },
  fieldInput: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: 'grey',
  },
  editButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
