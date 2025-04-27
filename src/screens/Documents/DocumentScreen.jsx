import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const DocumentScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const documents = [
    {
      title: 'JEE Test Sheet 1',
      desc: 'New test sheet for JEE Mains - Test 1',
      price: '₹49',
    },
    {
      title: 'Physics Notes',
      desc: 'Important formulas and concepts',
      price: 'Free',
    },
    {
      title: 'Maths Practice Series',
      desc: 'Mock questions for Math section',
      price: '₹99',
    },
    {
      title: 'Chemistry Crash Course',
      desc: 'Quick revision notes',
      price: '₹79',
    },
    {
      title: 'Full Syllabus Test',
      desc: 'Complete mock test for JEE',
      price: '₹149',
    },
    {
      title: 'Organic Chemistry Notes',
      desc: 'Named reactions and mechanisms',
      price: 'Free',
    },
    {title: 'Weekly Test Series', desc: 'Test yourself weekly', price: '₹199'},
    {
      title: 'Previous Year Papers',
      desc: 'Solved PYQs for practice',
      price: '₹59',
    },
    {
      title: 'Maths Formula Sheet',
      desc: 'Quick revision of all formulas',
      price: 'Free',
    },
    {
      title: 'Physics Mind Maps',
      desc: 'Mind maps for easy memory',
      price: '₹39',
    },
    {
      title: 'Chemistry Practice Sheets',
      desc: 'Important practice questions',
      price: '₹89',
    },
    {
      title: 'JEE Advanced Mock Test',
      desc: 'Real exam level mock test',
      price: '₹129',
    },
    {
      title: 'Important Derivations Physics',
      desc: 'Derivations you must know',
      price: '₹45',
    },
    {
      title: 'NCERT Based Questions',
      desc: 'Practice from NCERT',
      price: 'Free',
    },
    {
      title: 'Daily Practice Problems (DPP)',
      desc: 'Small daily tests for prep',
      price: '₹25',
    },
    {
      title: 'Errorless Chemistry Booklet',
      desc: 'Errorless questions for practice',
      price: '₹99',
    },
    {
      title: 'Crash Course Videos',
      desc: 'Quick learning videos',
      price: '₹149',
    },
    {
      title: 'Physical Chemistry Problem Set',
      desc: 'Tough questions for IIT',
      price: '₹110',
    },
    {
      title: 'Logical Reasoning Practice',
      desc: 'For aptitude preparation',
      price: '₹35',
    },
    {
      title: 'Full JEE Combo Pack',
      desc: 'All notes + tests + PYQs',
      price: '₹499',
    },
  ];

  const filteredDocs = documents.filter(
    doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCardPress = (doc) => {
    // Handle card press, for example, navigate to a details page or perform an action
    navigation.navigate('DocumentOverview')    // Example: navigation.navigate('DocumentDetails', { docId: doc.id });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent</Text>

      {/* Category Filters with Icons */}
      <View style={styles.recentContainer}>
        <TouchableOpacity style={styles.recent}>
          <Icon name="book" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.recent}>
          <Icon name="library-books" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.recent}>
          <Icon name="exam" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.recent}>
          <Icon name="notes" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.recent}>
          <Icon name="video" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search documents..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          placeholderTextColor="#aaa"
        />
        <Icon name="search" size={24} color="#aaa" style={styles.searchIcon} />
      </View>

      {/* Document List */}
      <ScrollView style={styles.docContainer}>
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardPress(doc)}>
              <Card containerStyle={styles.card}>
                <View style={styles.doc}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.docTitle}>{doc.title}</Text>
                    <Text style={styles.docDesc}>{doc.desc}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{doc.price}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>No documents found.</Text>
          </View>
        )}
      </ScrollView>

      {/* View Purchased Documents Button */}
      <TouchableOpacity
        style={styles.viewPurchasedButton}
        onPress={() => navigation.navigate('PurchasedDocuments')} // Correct navigation here
      >
        <Text style={styles.viewPurchasedText}>View Purchased Documents</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  recentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  recent: {
    backgroundColor: '#6200ee',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  searchIcon: {
    marginLeft: 10,
  },
  docContainer: {
    flex: 1,
    marginTop: 10,
  },
  card: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    borderColor: 'transparent',
    marginBottom: 15,
  },
  doc: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  docDesc: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    textAlign: 'center',
    minWidth: 80,
  },
  noResultContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noResultText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  viewPurchasedButton: {
    backgroundColor: '#6200ee',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  viewPurchasedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
