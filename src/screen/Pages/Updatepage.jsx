import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const UpdatePage = ({ route }) => {
  const { update } = route.params; // Get update data

  return (
    <View style={styles.container}>
      <Image source={update.image} style={styles.image} />
      <Text style={styles.title}>{update.title}</Text>
      <Text style={styles.desc}>{update.desc}</Text>
      <Text style={styles.time}>{update.time}</Text>

<Button title="Click Me" onPress={() => alert('Button Pressed!')} />

    </View>
  );
};  

export default UpdatePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  desc: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  time: {
    fontSize: 14,
    marginTop: 5,
    color: 'gray',
  },
  
  button: {
    marginTop: 20,
    backgroundColor: '#FF7F50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
