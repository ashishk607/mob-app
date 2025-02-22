import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import ProgressBar from './UI_Component/pregressbar';

const ProfileScreen = () => {
  const [progress, setProgress] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: 'example@email.com',
    number: '',
    age: '',
    state: '',
    college: '',
    address: '',
    occupation: '',
    bio: '',
  });

  const handleChange = (key, value) => {
    try {
      setForm(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error('Error updating form field:', error);
    }
  };

  const countFilledFields = () => {
    try {
      return Object.values(form).filter(value => value.trim() !== '').length;
    } catch (error) {
      console.error('Error counting filled fields:', error);
      return 0;
    }
  };

  useEffect(() => {
    try {
      setProgress(countFilledFields());
    } catch (error) {
      console.error('Error setting progress on load:', error);
    }
  }, []);

  const handleSave = () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
        setProgress(countFilledFields());
        // Alert.alert('Profile Saved', `Your profile details have been saved successfully! Filled fields: ${countFilledFields()}/9`);
      }, 1000);
    } catch (error) {
      console.error('Error handling save:', error);
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          let source = { uri: response.assets[0].uri };
          setProfileImage(source);
        }
      });
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.profileInfo}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profileImage ? profileImage : require('../assets/default-avatar.png')}
            style={styles.profileImage}
          />
          <View style={styles.editIcon}>
            <Icon name="camera" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>Ashish Maurya</Text>
        <Text style={styles.username}>ashish.culture6@gmail.com</Text>
      </View>

      <ProgressBar totalItems={9} progress={progress} />

      <View style={styles.formContainer}>
        {Object.keys(form).map(key => (
          <View key={key} style={styles.fieldInput}>
            <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <TextInput
              style={[styles.input, key === 'email' && styles.disabledInput]}
              placeholder={`Enter your ${key}`}
              value={form[key]}
              onChangeText={text => handleChange(key, text)}
              keyboardType={key === 'number' || key === 'age' ? 'numeric' : 'default'}
              editable={key !== 'email'}
              multiline={key === 'bio'}
              numberOfLines={key === 'bio' ? 3 : 1}
            />
          </View>
        ))}
      </View>

      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : 
        <TouchableOpacity style={styles.save} onPress={handleSave}>
  <Text style={styles.saveText}>Save</Text>
</TouchableOpacity>      }
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    
    width: 110,
    fontSize: 16,
    height: 40,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 25,
    paddingTop: 8,
    paddingLeft:12,
    paddingRight:12,
    borderRightWidth:0,
    // borderBottomLeftRadius:25,
    // borderTopLeftRadius:25,
    backgroundColor:'#f0f0f0'
    
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    // borderRadius: 25,
    paddingHorizontal: 10,
    borderLeftWidth:0,
    borderBottomRightRadius:25,
    borderTopRightRadius:25,

  },
  disabledInput: {
    // backgroundColor: '#f0f0f0',
    color:'lightgrey'
  },

  save: {
    backgroundColor: '#76c7c0',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  
  saveText: {
    color: 'white',
    fontSize: 16,
  },
  
});
