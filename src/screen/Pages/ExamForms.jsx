import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { exams } from '../IndexFiles/Exam_Form_field_Card'; // Correct import

const ExamForms = () => {
  const navigation = useNavigation();

  const handlePress = (title, formfields) => {
    navigation.navigate('Form_Apply', { title, formfields });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {exams.map((exam, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(exam.title, exam.fields)}>
          <Card>
            <Card.Title>{exam.title}</Card.Title>
            <Text>{exam.description}</Text>
            <Text style={styles.expire}>{exam.expire}</Text>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  expire: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5,
  },
});

export default ExamForms;
