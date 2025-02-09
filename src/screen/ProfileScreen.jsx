import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "react-native-image-picker";

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);

  // Function to pick image from gallery
  const pickImage = async () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else {
          let source = { uri: response.assets[0].uri };
          setProfileImage(source);
          uploadImage(response.assets[0]); // Call API after selecting
        }
      }
    );
  };

  // Function to upload image to API
  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", {
      uri: image.uri,
      type: image.type,
      name: image.fileName || "profile.jpg",
    });

    try {
      const response = await fetch("https://your-api.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();
      Alert.alert("Success", "Image uploaded successfully!");
      console.log(result);
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Error", "Failed to upload image");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="bars" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.profileText}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? profileImage
                : require("../assets/default-avatar.png")
            }
            style={styles.profileImage}
          />
          <View style={styles.editIcon}>
            <Icon name="camera" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>Ashish Maurya</Text>
        <Text style={styles.username}>ashish.culture6@gmail.com</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#696969",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: "#666",
  },
});
