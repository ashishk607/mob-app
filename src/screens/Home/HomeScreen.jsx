import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const carouselRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [promotionalData, setPromotionalData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Simulate fetching promotional and course data
  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate fetching promotional data
      const promoData = [
        {
          id: '1',
          image: 'https://picsum.photos/800/600?random=1',
          title: 'New Courses Available',
          description: 'Check out our latest offerings!',
        },
        {
          id: '2',
          image: 'https://picsum.photos/800/600?random=2',
          title: 'Summer Special',
          description: 'Get 30% off on all courses',
        },
        {
          id: '3',
          image: 'https://picsum.photos/800/600?random=3',
          title: 'Learn Anywhere',
          description: 'Access courses on any device',
        },
      ];
      setPromotionalData(promoData);

      // Simulate fetching course data
      const data = [
        { 
          id: '1', 
          title: 'React Native Basics', 
          instructor: 'John Doe',
          rating: 4.8,
          students: 1452,
          image: 'https://picsum.photos/200/120?random=11'
        },
        { 
          id: '2', 
          title: 'JavaScript Fundamentals', 
          instructor: 'Jane Smith',
          rating: 4.6,
          students: 982,
          image: 'https://picsum.photos/200/120?random=12'
        },
        { 
          id: '3', 
          title: 'UI/UX Design', 
          instructor: 'Alex Johnson',
          rating: 4.9,
          students: 2134,
          image: 'https://picsum.photos/200/120?random=13'
        },
        { 
          id: '4', 
          title: 'Node.js for Beginners', 
          instructor: 'Emily Brown',
          rating: 4.7,
          students: 876,
          image: 'https://picsum.photos/200/120?random=14'
        },
        { 
          id: '5', 
          title: 'Python Programming', 
          instructor: 'Michael Lee',
          rating: 4.5,
          students: 1728,
          image: 'https://picsum.photos/200/120?random=15'
        },
      ];
      setCourseData(data);

      setLoading(false);
    }, 2000);
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Simulate refreshing data
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  // Render pagination dots for carousel
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {promotionalData.map((_, i) => (
          <View
            key={i}
            style={[
              styles.paginationDot,
              { opacity: i === activeSlide ? 1 : 0.4 }
            ]}
          />
        ))}
      </View>
    );
  };

  // Render promotional card
  const renderPromotionalCard = ({ item }) => {
    if (loading) {
      return (
        <View style={styles.promotionalCard}>
          <ShimmerPlaceholder style={styles.promotionalImage} autoRun={true} />
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.promotionalCard} activeOpacity={0.9}>
        <Image source={{ uri: item.image }} style={styles.promotionalImage} />
        <View style={styles.promotionalOverlay}>
          <Text style={styles.promotionalTitle}>{item.title}</Text>
          <Text style={styles.promotionalDescription}>{item.description}</Text>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // Render category item
  const renderCategoryItem = ({ item }) => {
    const categories = [
      { name: 'Development', icon: 'code' },
      { name: 'Design', icon: 'paint-brush' },
      { name: 'Business', icon: 'briefcase' },
      { name: 'Marketing', icon: 'bullhorn' }
    ];
    
    return (
      <TouchableOpacity style={styles.categoryItem}>
        <View style={styles.categoryIconContainer}>
          <Icon name={categories[item].icon} size={22} color="#fff" />
        </View>
        <Text style={styles.categoryName}>{categories[item].name}</Text>
      </TouchableOpacity>
    );
  };

  // Render course item
  const renderCourseItem = ({ item }) => {
    if (loading) {
      return (
        <View style={styles.shimmerCourseItem}>
          <ShimmerPlaceholder style={styles.shimmerImage} autoRun={true} />
          <View style={styles.shimmerContent}>
            <ShimmerPlaceholder style={styles.shimmerLine} autoRun={true} />
            <ShimmerPlaceholder style={[styles.shimmerLine, { width: '60%' }]} autoRun={true} />
          </View>
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.courseItem}>
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={styles.courseContent}>
          <Text style={styles.courseTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.courseInstructor}>{item.instructor}</Text>
          <View style={styles.courseStats}>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <View style={styles.studentsContainer}>
              <Icon name="users" size={12} color="#666" />
              <Text style={styles.studentsText}>{item.students} students</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6200ee" barStyle="light-content" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Hello, Student</Text>
          <Text style={styles.headerSubtitle}>What would you like to learn today?</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#6200ee" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6200ee']}
            tintColor="#6200ee"
          />
        }
      >
        {/* Promotional Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            data={loading ? Array(3).fill({}) : promotionalData}
            renderItem={renderPromotionalCard}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 40}
            autoplay={!loading}
            autoplayInterval={3000}
            loop
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          {!loading && renderPagination()}
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={[0, 1, 2, 3]}
            renderItem={renderCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Popular Courses */}
        <View style={styles.coursesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Courses</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={loading ? Array(4).fill({}) : courseData}
            renderItem={renderCourseItem}
            keyExtractor={(item, index) => (loading ? `shimmer-${index}` : item.id)}
            scrollEnabled={false}
            contentContainerStyle={styles.courseList}
          />
        </View>
        
        {/* My Courses */}
        <View style={styles.coursesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {!loading && (
            <View style={styles.progressCourseContainer}>
              <Image source={{ uri: courseData[0]?.image }} style={styles.progressCourseImage} />
              <View style={styles.progressCourseInfo}>
                <Text style={styles.progressCourseTitle}>{courseData[0]?.title}</Text>
                <Text style={styles.progressCourseSubtitle}>{courseData[0]?.instructor}</Text>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '65%' }]} />
                  </View>
                  <Text style={styles.progressText}>65% Complete</Text>
                </View>
                <TouchableOpacity style={styles.continueButton}>
                  <Text style={styles.continueButtonText}>Continue</Text>
                  <Icon name="arrow-right" size={12} color="#fff" style={styles.continueButtonIcon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {loading && (
            <View style={styles.shimmerProgressCourse}>
              <ShimmerPlaceholder style={styles.shimmerProgressImage} autoRun={true} />
              <View style={styles.shimmerProgressContent}>
                <ShimmerPlaceholder style={styles.shimmerLine} autoRun={true} />
                <ShimmerPlaceholder style={[styles.shimmerLine, { width: '40%' }]} autoRun={true} />
                <ShimmerPlaceholder style={[styles.shimmerProgressBar]} autoRun={true} />
                <ShimmerPlaceholder style={[styles.shimmerButton]} autoRun={true} />
              </View>
            </View>
          )}
        </View>
        
        {/* Bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    marginTop: 15,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: '#6200ee',
  },
  promotionalCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginHorizontal: 5,
    elevation: 5,
    height: 180,
  },
  promotionalImage: {
    width: '100%',
    height: '100%',
  },
  promotionalOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
  },
  promotionalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  promotionalDescription: {
    fontSize: 14,
    color: '#eee',
    marginTop: 5,
  },
  learnMoreButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  learnMoreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesSection: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: '600',
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  coursesSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  courseList: {
    paddingVertical: 10,
  },
  courseItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  courseImage: {
    width: 100,
    height: 90,
  },
  courseContent: {
    flex: 1,
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  courseStats: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 3,
  },
  studentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 3,
  },
  shimmerCourseItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 90,
  },
  shimmerImage: {
    width: 100,
    height: 90,
  },
  shimmerContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  shimmerLine: {
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
    width: '80%',
  },
  progressCourseContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  progressCourseImage: {
    width: 120,
    height: 140,
  },
  progressCourseInfo: {
    flex: 1,
    padding: 12,
  },
  progressCourseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressCourseSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  progressBarContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  continueButtonIcon: {
    marginLeft: 5,
  },
  shimmerProgressCourse: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    height: 140,
  },
  shimmerProgressImage: {
    width: 120,
    height: 140,
  },
  shimmerProgressContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  shimmerProgressBar: {
    height: 6,
    width: '90%',
    borderRadius: 3,
    marginVertical: 10,
  },
  shimmerButton: {
    height: 30,
    width: '50%',
    borderRadius: 20,
    marginTop: 10,
  },
});