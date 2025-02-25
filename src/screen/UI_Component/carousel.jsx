import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import images from '../../assets/images'; // Import your images.js

const data = [
  { title: 'College Fest', image: images.College_fest },
  { title: 'Music Event', image: images.Music_event },
  { title: 'Popular Spots', image: images.Spots },
];

const MyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={350}
      itemWidth={300}
      onSnapToItem={(index) => setActiveIndex(index)}
      containerCustomStyle={styles.carouselContainer}
      contentContainerCustomStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
  contentContainer: {
    alignItems: 'center',
  },
  slide: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 250,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MyCarousel;
