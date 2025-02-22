import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const forms = [
    { id: 1, title: 'Jati/Aay/ Niwas', icon: 'assignment', screen: 'JatiAayNiwas' },
    { id: 2, title: 'Admission Form', icon: 'assignment-ind', screen: 'AdmissionForm' },
    { id: 3, title: 'Exam Form', icon: 'assignment-turned-in', screen: 'ExamForm' },
    { id: 4, title: 'Degree Certificate', icon: 'school', screen: 'DegreeCertificate' },
    { id: 5, title: 'Provisional or Migration', icon: 'swap-horiz', screen: 'ProvisionalMigration' },
    { id: 6, title: 'New Admission', icon: 'person-add', screen: 'NewAdmission' },
    { id: 7, title: 'Govt. Exam Form', icon: 'description', screen: 'GovtExamForm' },
    { id: 8, title: 'Your All Documents', icon: 'folder', screen: 'AllDocuments' },
    { id: 9, title: 'Find Your Lost Documents', icon: 'find-in-page', screen: 'LostDocuments' },
  ];

  const courses = [
    { id: 1, title: 'B.A. Hons (Subjects)', icon: 'book', screen: 'BAHons' },
    { id: 2, title: 'B.sc. Hons', icon: 'science', screen: 'BscHons' },
    { id: 3, title: 'B.com', icon: 'business', screen: 'Bcom' },
    { id: 4, title: 'BCA', icon: 'computer', screen: 'BCA' },
    { id: 5, title: 'BBA', icon: 'work', screen: 'BBA' },
    { id: 6, title: 'BBA', icon: 'work', screen: 'BBA' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Forms List</Text>
      <View style={styles.gridContainer}>
        {forms.map((form) => (
          <TouchableOpacity key={form.id} style={styles.card} onPress={() => navigation.navigate(form.screen)}>
            <Icon name={form.icon} size={30} color="#4CAF50" style={styles.icon} />
            <Text style={styles.cardText}>{form.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Courses List</Text>
      <View style={styles.gridContainer}>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.card} onPress={() => navigation.navigate(course.screen)}>
            <Icon name={course.icon} size={30} color="#FF5722" style={styles.icon} />
            <Text style={styles.cardText}>{course.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 10,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '32%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#555',
  },
});

export default HomeScreen;
