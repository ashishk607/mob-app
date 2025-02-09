import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="bars" size={24} color="#333" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
          style={styles.profileImage}
        />
      </View>

      {/* Greeting */}
      <Text style={styles.greeting}>Hi Ashish</Text>
      <Text style={styles.subGreeting}>Good Morning!</Text>

      {/* Promotion Card */}
      <View style={styles.promoCard}>
        <Text style={styles.promoText}>Join our Animal Lovers Community</Text>
        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Join Now</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {['Veterinary', 'Foods', 'Training', 'Grooming'].map((item, index) => (
          <View key={index} style={styles.categoryItem}>
            <Icon name="paw" size={24} color="#FF7F50" />
            <Text style={styles.categoryText}>{item}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Nearby Veterinary */}
      <Text style={styles.sectionTitle}>Nearby Veterinary</Text>
      <View style={styles.nearbyCard}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/45.jpg' }} style={styles.nearbyImage} />
        <View>
          <Text style={styles.nearbyName}>Wilson Stanton</Text>
          <Text style={styles.nearbyTitle}>Veterinary Dentist</Text>
          <Text style={styles.nearbyExp}>Experience: 10 years</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeSlot}>10:30 am</Text>
            <Text style={styles.timeSlot}>6:10 pm</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  greeting: { fontSize: 24, fontWeight: 'bold' },
  subGreeting: { fontSize: 16, color: 'gray', marginBottom: 20 },
  promoCard: { backgroundColor: '#FF7F50', padding: 20, borderRadius: 15, marginBottom: 20 },
  promoText: { fontSize: 16, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
  promoButton: { backgroundColor: '#fff', padding: 10, borderRadius: 10 },
  promoButtonText: { fontSize: 14, fontWeight: 'bold', color: '#FF7F50' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  categories: { flexDirection: 'row', marginBottom: 20 },
  categoryItem: { backgroundColor: '#FAF3E0', padding: 15, borderRadius: 10, alignItems: 'center', marginRight: 10 },
  categoryText: { fontSize: 14, fontWeight: '600', marginTop: 5 },
  nearbyCard: { flexDirection: 'row', backgroundColor: '#F3F4F6', padding: 15, borderRadius: 15, alignItems: 'center' },
  nearbyImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  nearbyName: { fontSize: 16, fontWeight: 'bold' },
  nearbyTitle: { fontSize: 14, color: 'gray' },
  nearbyExp: { fontSize: 12, color: '#555', marginBottom: 5 },
  timeContainer: { flexDirection: 'row', gap: 10 },
  timeSlot: { backgroundColor: '#FF7F50', color: '#fff', padding: 5, borderRadius: 5, fontSize: 12 }
});
