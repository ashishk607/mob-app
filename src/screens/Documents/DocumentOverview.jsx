import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const DocumentOverview = () => {
  // Example data for the document
  const document = {
    title: 'Physics Notes',
    uploadedOn: '2025-04-28',
    fields: ['Physics', 'JEE', 'Notes', 'Revision'],
    rating: 4.5,
    postedBy: 'Admin User',
    price: '₹199', // Example price
    imageUrl: 'https://via.placeholder.com/600x800/0000FF/808080?text=Document+Image', // Placeholder image
  };

  const handlePurchase = () => {
    // Handle the purchase action here
    alert('Proceeding to purchase...');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Document Title */}
      <Text style={styles.title}>{document.title}</Text>

      {/* Document Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: document.imageUrl }} style={styles.image} />
      </View>

      {/* Document Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Uploaded On: {document.uploadedOn}</Text>

        {/* Filed (Hashtags/Tags) */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Filed under:</Text>
          <View style={styles.fields}>
            {document.fields.map((field, index) => (
              <Text key={index} style={styles.fieldTag}>#{field}</Text>
            ))}
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rating: {document.rating} / 5</Text>
          <Icon name="star" size={18} color="#FFD700" />
        </View>

        {/* Posted By */}
        <Text style={styles.detailText}>Posted By: {document.postedBy}</Text>
      </View>

      {/* Purchase Button */}
      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
        <Text style={styles.purchaseButtonText}>Purchase for {document.price}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
    letterSpacing: 0.5,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  fields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  fieldTag: {
    backgroundColor: '#6200ee',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 8,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
    fontWeight: '600',
  },
  purchaseButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  purchaseButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default DocumentOverview;
