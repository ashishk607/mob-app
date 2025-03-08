import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {ScrollView, View} from 'react-native';
import {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import {Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardNotice from '../../components/common/CardNotice';
import {useNavigation} from '@react-navigation/native';

const Notice = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);

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
      formData.append(
        'schedule',
        scheduledDate ? scheduledDate.toISOString() : null,
      );

      await fetch('IP:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'File uploaded successfully');
      setScheduledDate(null);
    } catch (err) {
      console.error('Upload error:', err);
      Alert.alert('Error', 'Failed to upload file.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || scheduledDate;
    setShowDatePicker(false);
    setScheduledDate(currentDate);
  };

  const cardData = [
    {title: 'Admit Card', postTime: '22:15 - 14 - 04 - 2025', viewCount: '123'},
    {
      title: 'College Holiday',
      postTime: '02:35 - 10 - 07 - 2025',
      viewCount: '45',
    },
    {
      title: 'Exam Schedule',
      postTime: '10:00 - 05 - 03 - 2025',
      viewCount: '67',
    },
    {
      title: 'Result Announcement',
      postTime: '18:45 - 01 - 06 - 2025',
      viewCount: '89',
    },
    {title: 'Seminar', postTime: '12:00 - 22 - 08 - 2025', viewCount: '34'},
    {title: 'Workshop', postTime: '14:30 - 03 - 09 - 2025', viewCount: '78'},
    {
      title: 'Internship Notice',
      postTime: '09:00 - 15 - 07 - 2025',
      viewCount: '56',
    },
    {
      title: 'Fee Deadline',
      postTime: '23:59 - 30 - 04 - 2025',
      viewCount: '101',
    },
    {title: 'Sports Day', postTime: '11:00 - 20 - 11 - 2025', viewCount: '92'},
    {
      title: 'Library Update',
      postTime: '08:00 - 05 - 12 - 2025',
      viewCount: '47',
    },
    {
      title: 'Cultural Fest',
      postTime: '16:00 - 09 - 10 - 2025',
      viewCount: '83',
    },
    {
      title: 'Placement Drive',
      postTime: '13:00 - 12 - 01 - 2025',
      viewCount: '110',
    },
    {
      title: 'Hostel Notice',
      postTime: '07:30 - 27 - 05 - 2025',
      viewCount: '58',
    },
    {
      title: 'Project Submission',
      postTime: '17:45 - 04 - 06 - 2025',
      viewCount: '64',
    },
    {title: 'Alumni Meet', postTime: '19:00 - 18 - 12 - 2025', viewCount: '73'},
  ];

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            paddingLeft: 5,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Post Notice
        </Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.uploadText}>
            {file ? `Uploaded: ${file[0].name}` : 'Upload Notice'}
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

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowMenu(!showMenu)}>
              <Icon name="arrow-drop-down" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          {showMenu && (
            <TouchableOpacity
              style={styles.scheduleOption}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.scheduleText}>Schedule Post</Text>
            </TouchableOpacity>
          )}

          {scheduledDate && (
            <View style={styles.scheduledInfo}>
              <Text style={styles.scheduledText}>
                Scheduled for: {scheduledDate.toLocaleString()}
              </Text>
              <TouchableOpacity onPress={() => setScheduledDate(null)}>
                <Text style={styles.cancelText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={scheduledDate || new Date()}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View
          style={{
            marginTop: 15,
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              paddingLeft: 5,
              marginVertical: 20,
              textAlign: 'center',
            }}>
            Old Notices
          </Text>
          {cardData.map((card, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('NoticePage', {
                  title: card.title,
                  postTime: card.postTime,
                  viewCount: card.viewCount,
                })
              }>
              <CardNotice
                title={card.title}
                postTime={card.postTime}
                viewCount={card.viewCount}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f4f4f4', padding: 20},
  card: {backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 5},
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
  uploadText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6200ee',
    marginBottom: 20,
  },
  inputContainer: {marginBottom: 15},
  label: {fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#333'},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  postButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  dropdownButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  postButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  scheduleOption: {
    padding: 10,
    backgroundColor: '#ddd',
    marginTop: 5,
    borderRadius: 5,
  },
  scheduleText: {fontSize: 14, color: '#333'},
  scheduledInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  scheduledText: {fontSize: 12, color: '#555'},
  cancelText: {color: '#ff0000', fontSize: 16},
});

export default Notice;
