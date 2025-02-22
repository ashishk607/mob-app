import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({ title, description, image }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('DocumentDetails', { title });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {image && <Image source={image} style={styles.cardImage} />}
      <View style={styles.cardContent}>
        {title && <Text style={styles.cardTitle}>{title}</Text>}
        {description && <Text style={styles.cardDescription}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 100,
    height: 100,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default Card;
