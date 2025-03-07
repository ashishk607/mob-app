import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { IP } from '../../context/local_ip'

const DocumentScreen = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the upload');
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  const handlePost = async () => {
    if (!file) {
      Alert.alert('Error', 'Please upload a file first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file[0].uri,
        type: file[0].type,
        name: file[0].name,
      });
      formData.append('title', title);
      formData.append('desc', desc);

      await fetch('IP:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'File uploaded successfully');
    } catch (err) {
      console.error('Upload error:', err);
      Alert.alert('Error', 'Failed to upload file.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.uploadText}>
          {file ? `Uploaded: ${file[0].name}` : 'Upload File'}
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            placeholder="Enter description"
            value={desc}
            onChangeText={setDesc}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 5 },
  uploadButton: {
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  uploadText: { textAlign: 'center', fontSize: 16, color: '#6200ee', marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  postButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
