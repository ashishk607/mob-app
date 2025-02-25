import React from 'react';
import FormLayout from '../Layout/FormLayout';
import {useRoute} from '@react-navigation/native';
import JobDetailsLayout from './Exam_job_detials';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

const ApplyForm = () => {
  const route = useRoute();
  const {formfields} = route.params; // Extract formfields from route params
console.log(route.params)
const {title}=route.params 

  return (
    <ScrollView>
      <JobDetailsLayout Exam_name={title} />
      <View style={styles.ApplyForm}>
        <Text style={styles.applyText}>To Apply</Text>
        <FormLayout fields={formfields} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  applyText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'blue',
    marginVertical: 10,

    marginHorizontal: 15,
    paddingTop: 10,
  },

  ApplyForm: {
    backgroundColor: 'white',
  },
});
export default ApplyForm;
