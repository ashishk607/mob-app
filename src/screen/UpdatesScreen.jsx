import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import UpdateScreen_FORUSER from '../screens/Updates/UpdateScreen_FORUSER';
import UpdateScreen_FORALL from '../screens/Updates/UpdateScreen_FORALL';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const UpdatesScreen = () => {
  const [selected, setSelected] = useState('For You');
  const navigation = useNavigation(); // Get navigation object


  const toggleSelection = () => {
    setSelected((prev) => (prev === 'For You' ? 'All' : 'For You'));
  };

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleSelection}>
        <Text style={[styles.toggleText, selected === 'For You' ? styles.selectedText : styles.unselectedText]}>
          For You
        </Text>
        <Text style={styles.separator}> / </Text>
        <Text style={[styles.toggleText, selected === 'All' ? styles.selectedText : styles.unselectedText]}>
          All
        </Text>
      </TouchableOpacity>

      {/* Scrollable Container */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      {selected === 'For You' ? <UpdateScreen_FORUSER navigation={navigation} /> : <UpdateScreen_FORALL navigation={navigation} />}
      </ScrollView>
    </View>
  );
};

export default UpdatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
  },
  toggleButton: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'orange',
  },
  unselectedText: {
    color: 'gray',
  },
  separator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});
