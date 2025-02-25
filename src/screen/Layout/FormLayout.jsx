import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

import SubbmitedApplication from '../IndexFiles/ApplicationsCardDetails';

const FormLayout = ({fields}) => {
  const fieldList = [
    {id: 1, label: 'First Name', key: 'firstName'},
    {id: 2, label: 'Last Name', key: 'lastName'},
    {id: 3, label: 'Email', key: 'email'},
    {id: 4, label: 'Phone Number', key: 'phone'},
    {id: 5, label: 'Address', key: 'address'},
    {id: 6, label: 'City', key: 'city'},
    {id: 7, label: 'State', key: 'state'},
    {id: 8, label: 'Zip Code', key: 'zip'},
    {id: 9, label: 'Country', key: 'country'},
    {id: 10, label: 'Date of Birth', key: 'dob'},
    {id: 11, label: 'Gender', key: 'gender'},
    {id: 12, label: 'Occupation', key: 'occupation'},
    {id: 13, label: 'Company', key: 'company'},
    {id: 14, label: 'Marital Status', key: 'maritalStatus'},
    {id: 15, label: 'Nationality', key: 'nationality'},
    {id: 16, label: 'Language', key: 'language'},
    {id: 17, label: 'Emergency Contact', key: 'emergencyContact'},
    {id: 18, label: 'Blood Group', key: 'bloodGroup'},
    {id: 19, label: 'Allergies', key: 'allergies'},
    {id: 20, label: 'Medical History', key: 'medicalHistory'},
    {id: 21, label: 'Guardian Name', key: 'guardianName'},
    {id: 22, label: 'Guardian Contact', key: 'guardianContact'},
    {id: 23, label: 'Relationship', key: 'relationship'},
    {id: 24, label: 'Bank Name', key: 'bankName'},
    {id: 25, label: 'Account Number', key: 'accountNumber'},
    {id: 26, label: 'IFSC Code', key: 'ifscCode'},
    {id: 27, label: 'Pan Card', key: 'panCard', type: 'file'},
    {id: 28, label: 'Aadhar Number', key: 'aadharNumber', type: 'file'},
    {id: 29, label: 'Driving License', key: 'drivingLicense', type: 'file'},
    {id: 30, label: 'Passport Number', key: 'passportNumber', type: 'file'},
    {id: 31, label: 'Qualification', key: 'qualification'},
    {id: 32, label: 'University', key: 'university'},
    {id: 33, label: 'Passing Year', key: 'passingYear'},
    {id: 34, label: 'Percentage', key: 'percentage'},
    {id: 35, label: 'Skills', key: 'skills'},
    {id: 36, label: 'Experience', key: 'experience'},
    {id: 37, label: 'Projects', key: 'projects'},
    {id: 38, label: 'Hobbies', key: 'hobbies'},
    {id: 39, label: 'References', key: 'references'},
    {id: 40, label: 'LinkedIn', key: 'linkedin'},
    {id: 41, label: 'GitHub', key: 'github'},
    {id: 42, label: 'Website', key: 'website'},
    {id: 43, label: 'Twitter', key: 'twitter'},
    {id: 44, label: 'Facebook', key: 'facebook'},
    {id: 45, label: 'Instagram', key: 'instagram'},
    {id: 46, label: 'YouTube', key: 'youtube'},
    {id: 47, label: 'Blog', key: 'blog'},
    {id: 48, label: 'Resume', key: 'resume', type: 'file'},
    {id: 49, label: 'Cover Letter', key: 'coverLetter', type: 'file'},
    {id: 50, label: 'Portfolio', key: 'portfolio', type: 'file'},
  ];

  const orderedFields = Object.keys(fields)
    .filter(key => fields[key])
    .map(key => fieldList.find(field => field.key === key));

  const generateRequestNumber = () =>
    Math.floor(100000000 + Math.random() * 900000000).toString();

  console.log(SubbmitedApplication)
  const handleSubmit = () => {
    const requestNumber = generateRequestNumber();
    const dateTime = new Date().toLocaleString(); // Gets current date and time

    // Add details to SubbmitedApplication
    SubbmitedApplication[requestNumber] = {
      requestNumber,
      dateTime,
      
    };

    console.log(SubbmitedApplication)

    Alert.alert(
      'Submission Successful!',
      `Thank you for submitting your application. Your request number is ${requestNumber}.

Please check your email and notifications for further updates.`,
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        {orderedFields.map(field => (
          <View key={field.id} style={styles.inputContainer}>
            <Text style={styles.label}>{field.label}</Text>
            {field.type === 'file' ? (
              <Button title={`Upload ${field.label}`} onPress={() => {}} />
            ) : (
              <TextInput
                style={styles.input}
                placeholder={`Enter ${field.label}`}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <Button
        title="Submit Application"
        onPress={handleSubmit}
        color="#007BFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default FormLayout;
