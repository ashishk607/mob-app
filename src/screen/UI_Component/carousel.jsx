import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import images from '../../assets/images';
const data = [
  {
    title: "Get Flat ₹120 off on Swiggy Instamart",
    image: images.Music_event,
    buttonText: "ORDER NOW",
  },
  {
    title: "Big Discounts on Grocery Items",
    image: images.College_fest,
    buttonText: "SHOP NOW",
  },
  {
    title: "Big Discounts on Grocery Items",
    image: images.College_fest,
    buttonText: "SHOP NOW",
  },
];

const MyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{item.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={390}
      itemWidth={380}
      onSnapToItem={(index) => setActiveIndex(index)}
      autoplay
      loop
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "#FFA500",
  },
  image: {
    width: "100%",
    height: 180,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyCarousel;

// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
// import images from '../../assets/images'; // Import your images.js

// const data = [
//   { title: 'College Fest', image: images.College_fest },
//   { title: 'Music Event', image: images.Music_event },
//   { title: 'Popular Spots', image: images.Spots },
// ];

// const MyCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const renderItem = ({ item }) => (
//     <View style={styles.slide}>
//       <Image source={item.image} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//     </View>
//   );

//   return (
//     <Carousel
//       data={data}
//       renderItem={renderItem}
//       sliderWidth={350}
//       itemWidth={300}
//       onSnapToItem={(index) => setActiveIndex(index)}
//       containerCustomStyle={styles.carouselContainer}
//       contentContainerCustomStyle={styles.contentContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   carouselContainer: {
//     marginTop: 50,
//   },
//   contentContainer: {
//     alignItems: 'center',
//   },
//   slide: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     height: 250,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default MyCarousel;
