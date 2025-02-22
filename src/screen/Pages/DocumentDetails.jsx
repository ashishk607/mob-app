import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DocumentDetails = ({ title }) => {
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>More details about {title}...</Text>
      {/* <Button title="Go Back" onPress={onBack} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DocumentDetails;
