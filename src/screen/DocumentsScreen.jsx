import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AddButton from './UI_Component/AddButton';
import SearchComponent from './UI_Component/Search_bar';
import Card from './UI_Component/Card';
import { ScrollView } from 'react-native';

const DocumentsScreen = () => {
  const data = [
    {id: 1, title: 'Aadhar Card'},
    {id: 2, title: 'PAN Card'},
    {id: 3, title: 'Voter ID'},
    {id: 4, title: 'Driving License'},
    {id: 5, title: 'Passport'},
    {id: 6, title: 'Ration Card'},
    {id: 7, title: 'Birth Certificate'},
    {id: 8, title: 'Income Certificate'},
    {id: 9, title: 'Caste Certificate'},
    {id: 10, title: 'Birth Certificate'},
    {id: 11, title: 'Income Certificate'},
    {id: 12, title: 'Caste Certificate'},
  ];

  const [showAllGov, setShowAllGov] = useState(false);
  const [showAllPersonal, setShowAllPersonal] = useState(false);

  const renderHeader = title => (
    <View style={styles.lineContainer}>
      <Text style={styles.lineText}>
        <Text style={styles.line}>———————————— </Text> {title}{' '}
        <Text style={styles.line}>————————————</Text>
      </Text>
    </View>
  );

  const renderFooter = (title, toggleShow, type) => (
    <TouchableOpacity onPress={() => {
      console.log(`${type} list clicked: ${title}`);
      alert(`${type} list clicked: ${title}`);
      toggleShow();
    }}>
      <View style={styles.lineContainer}>
        <Text style={styles.lineText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchComponent />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.flatcontainer}>
          <FlatList
            style={styles.flat}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={showAllGov ? data : data.slice(0, 9)}
            numColumns={3}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Card title={item.title} />}
            contentContainerStyle={styles.cardContainer}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={renderHeader('Government')}
            ListFooterComponent={renderFooter(showAllGov ? 'Show Less' : 'More...', () => setShowAllGov(!showAllGov), 'Government')}
          />

          <FlatList
            style={styles.flat}
            data={showAllPersonal ? data : data.slice(0, 9)}
            numColumns={3}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Card title={item.title} />}
            contentContainerStyle={styles.cardContainer}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={renderHeader('Personal')}
            ListFooterComponent={renderFooter(showAllPersonal ? 'Show Less' : 'More...', () => setShowAllPersonal(!showAllPersonal), 'Personal')}
          />
        </View>
      </ScrollView>
      <View style={styles.addContainer}>
        <AddButton />
      </View>
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  lineContainer: {
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 10,
  },
  flatcontainer: {},
  flat: {
    paddingHorizontal: 10,
  },
  lineText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  line: {
    color: '#888',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  addContainer: {
    position: 'absolute',
    bottom: 10,
    right: 70,
  },
});
