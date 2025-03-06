import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons for icons

const courses = [
  { id: '1', title: 'Design Thinking', courses: '19', icon: 'lightbulb-outline' },
  { id: '2', title: 'Coding', courses: '19', icon: 'laptop-code' },
  { id: '3', title: 'Marketing', courses: '21', icon: 'bullhorn-outline' },
  { id: '4', title: 'Security Expert', courses: '19', icon: 'shield-lock-outline' },
];

const CourseCard = ({ title, courses, icon }) => (
  <View style={styles.card}>
    <Icon name={icon} size={50} color="#FF9800" style={styles.cardIcon} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{courses} Course</Text>
  </View>
);

const StudyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hey, What would you like to learn today?</Text>
      <TextInput placeholder="Search here" style={styles.searchBar} />

      <FlatList
        data={courses}
        renderItem={({ item }) => <CourseCard {...item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default StudyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  grid: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '45%',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#78909C',
  },
});
