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
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_BASE_URL } from '@env';
import * as ImagePicker from 'react-native-image-picker';
import { useAuth } from '../../context/AuthContext';

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
        logout();
        return;
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.log('Unexpected Response:', textResponse);
        throw new Error('Invalid response format. Expected JSON.');
      }
  
      const responseData = await response.json();
  
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
      Alert.alert('Error', 'Something went wrong while fetching user data.');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

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
      const formData = new FormData();
      formData.append('avatar', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || `avatar_${Date.now()}.jpg`,
      });
  
      const response = await fetch(`${API_BASE_URL}/avatar`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const data = await response.json();
  
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

  const renderInputField = (key, placeholder, icon, keyboardType = 'default', editable = true) => (
    <View style={styles.inputContainer} key={key}>
      <Icon name={icon} size={20} color="#777" style={styles.inputIcon} />
      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={form[key]}
        onChangeText={(text) => setForm({ ...form, [key]: text })}
        editable={isEditing && editable}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f8f8f8" barStyle="dark-content" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View> */}

        {/* Profile Image Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Image
              source={profileImage || require('../../assets/default-avatar.png')}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <Icon name="camera" size={20} color="#FFF" />
            </View>
            {uploading && (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator color="#fff" size="small" />
              </View>
            )}
          </TouchableOpacity>
          
          <Text style={styles.name}>{form.name || 'Your Name'}</Text>
          <Text style={styles.email}>{form.email || 'email@example.com'}</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          {renderInputField('name', 'Full Name', 'user')}
          {renderInputField('email', 'Email', 'envelope', 'email-address', false)}
          {renderInputField('number', 'Mobile Number', 'phone', 'phone-pad')}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Icon name="pencil" size={16} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="sign-out" size={18} color="#e74c3c" style={styles.buttonIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#3498db',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3498db',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    marginTop: 5,
    fontSize: 16,
    color: '#666',
  },
  formSection: {
    backgroundColor: '#fff',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
  disabledInput: {
    color: '#666',
  },
  buttonsContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    marginTop: 25,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  logoutText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
});