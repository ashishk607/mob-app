import React from 'react';
import {StyleSheet, Text, ScrollView, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const UpdateScreen_FORALL = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default UpdateScreen_FORALL;

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Takes full screen width & height
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'red',
  },
  scrollView: {
    flex: 1,  
  },
  scrollContent: {
    flexGrow: 1, 
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 22,  
    padding: 12,
  },
});
