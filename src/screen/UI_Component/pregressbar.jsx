import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ totalItems, progress }) => {
  console.log(`🚀 Progress: ${progress}/${totalItems}`);

  // If progress is 100%, hide the entire progress bar
  if (progress === totalItems) return null;

  return (
    <View style={styles.container}>
      {/* Progress bar filling up */}
      <View style={[styles.progressBar, { width: `${(progress / totalItems) * 100}%` }]} />

      {/* Fixed text in the center, always on top */}
      <Text style={styles.progressText}>
        {progress === 0 ? `Incomplete: 0/${totalItems}` : `${progress}/${totalItems}`}
      </Text>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    height: 30,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 25,
    position: 'absolute', // Place it behind the text
    left: 0,
    top: 0,
  },
  progressText: {
    color: '#fff', // White text for contrast
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute', // Keep it centered
    zIndex: 2, // Ensures it's above the progress bar
  },
});
