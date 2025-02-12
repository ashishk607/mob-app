import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons

const HomeScreen = () => {
  const forms = [
    { id: 1, title: 'Jati/Aay/ Niwas', icon: 'assignment' },
    { id: 2, title: 'Admission Form', icon: 'assignment-ind' },
    { id: 3, title: 'Exam Form', icon: 'assignment-turned-in' },
    { id: 4, title: 'Degree Certificate', icon: 'school' },
    { id: 5, title: 'Provisional or Migration', icon: 'swap-horiz' },
    { id: 6, title: 'New Admission', icon: 'person-add' },
    { id: 7, title: 'Govt. Exam Form', icon: 'description' },
    { id: 8, title: 'Your All Documents', icon: 'folder' },
    { id: 9, title: 'Find Your Lost Documents', icon: 'find-in-page' },
  ];

  const courses = [
    { id: 1, title: 'B.A. Hons (Subjects)', icon: 'book' },
    { id: 2, title: 'B.sc. Hons', icon: 'science' },
    { id: 3, title: 'B.com', icon: 'business' },
    { id: 4, title: 'BCA', icon: 'computer' },
    { id: 5, title: 'BBA', icon: 'work' },
    { id: 6, title: 'BBA', icon: 'work' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Forms List */}
      <Text style={styles.sectionTitle}>Forms List</Text>
      <View style={styles.gridContainer}>
        {forms.map((form) => (
          <View key={form.id} style={styles.card}>
            <Icon name={form.icon} size={30} color="#4CAF50" style={styles.icon} />
            <Text style={styles.cardText}>{form.title}</Text>
          </View>
        ))}
      </View>
      {/* Courses List */}
      <Text style={styles.sectionTitle}>Courses List</Text>
      <View style={styles.gridContainer}>
        {courses.map((course) => (
          <View key={course.id} style={styles.card}>
            <Icon name={course.icon} size={30} color="#FF5722" style={styles.icon} />
            <Text style={styles.cardText}>{course.title}</Text>
          </View>
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
    width: '32%', // Slightly less than half to fit two cards in a row with spacing
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