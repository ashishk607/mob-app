import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Card, Divider } from 'react-native-paper';

const GovDocApplyUpdate = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="APPLY NEW" titleStyle={styles.title} />
        <Card.Content>
          <Text style={styles.text}>
            Get your new card, submit any request for applying for a new
            government document.
          </Text>
        </Card.Content>
        <Divider style={styles.divider} />
        <Card.Content>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="UPDATE DOCUMENT" titleStyle={styles.title} />
        <Card.Content>
          <Text style={styles.text}>
            Get your new card, submit any request for applying for a new
            government document.
          </Text>
        </Card.Content>
        <Divider style={styles.divider} />
        <Card.Content>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GovDocApplyUpdate;
