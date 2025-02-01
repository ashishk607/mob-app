//import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    if (!fullName || !email || !mobileNo || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('mobileNo', mobileNo);
      formData.append('password', password);
    
      console.log("FormData:", formData);
    
      const response = await fetch('http://15.207.19.96:3000/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          // ❌ REMOVE 'Content-Type': 'multipart/form-data' (It gets set automatically in React Native)
        },
        body: formData
      });
    
      const data = await response.json();
      setLoading(false);
      console.log("API Response:", data);
    
      if (response.ok) {
        if (data.token) {
          await AsyncStorage.setItem('userToken', data.token);
          Alert.alert("Success", "Registration successful!");
          navigation.navigate("Home");
        } else {
          Alert.alert("Success", "Registered successfully, but no token received.");
        }
      } else {
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Fetch Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  return (
    <View style={styles.container}>
          <View style={styles.topImageContainer}>
            <Image
              source={require("../assets/topVector.png")}
              style={styles.topImage}
            />
          </View>
          <View>
            <Text style={styles.createAccountText}>Create account</Text>
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
            <TextInput style={styles.textInput} placeholder="Full Name" placeholderTextColor="#9A9A9A" value={fullName} onChangeText={setFullName} />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={24} color="#9A9A9A" style={styles.inputIcon} />
            <TextInput style={styles.textInput} placeholder="E-mail" placeholderTextColor="#9A9A9A" value={email} onChangeText={setEmail} keyboardType="email-address" />
          </View>
          <View style={styles.inputContainer}>
            <Entypo name="mobile" size={24} color="#9A9A9A" style={styles.inputIcon} />
            <TextInput style={styles.textInput} placeholder="Mobile" placeholderTextColor="#9A9A9A" value={mobileNo} onChangeText={setMobileNo} keyboardType="phone-pad" />
          </View>
          <View style={styles.inputContainer}>
            <Fontisto name="locked" size={24} color="#9A9A9A" style={styles.inputIcon} />
            <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor="#9A9A9A" value={password} onChangeText={setPassword} secureTextEntry />
          </View>
          
          <TouchableOpacity onPress={handleRegister} style={styles.signInButtonContainer}>
            <Text style={styles.signIn}>Create</Text>
            <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
              {loading ? <ActivityIndicator color="#FFFFFF" /> : <AntDesign name="arrowright" size={24} color="#FFFFFF" />}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <TouchableOpacity>
              <Text style={styles.footerText}>Or create account using social media</Text>
              <View style={styles.socialMediaContainer}>
                <AntDesign name="google" size={30} color="blue" style={styles.socialIcon} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.leftVectorContainer}>
            <ImageBackground
              source={require("../assets/leftVector1.png")}
              style={styles.leftVectorImage}
            />        
          </View>
        </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative",
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 130,
  },
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  createAccountText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color:"#262626",
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: "center",
    height: 50,
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  textInput: {
    flex: 1,    
    color: "#9A9A9A",    
  },
  signInButtonContainer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "flex-end",
    width: "90%",
  },
  signIn: {
    color: "#262626",
    fontSize: 25,
    fontWeight: "bold",
  },
  linearGradient: {
    borderRadius: 18,
    width: 56,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginHorizontal: 10,
  },
  footerText: {
    textAlign: "center",
    color: "#262626",
    fontSize: 16,
  },
  leftVectorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  leftVectorImage: {
    width: 200,
    height: 250,
  },
  footerContainer: {
    marginTop: 80,
  },
  socialMediaContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcon: {
    backgroundColor: "#FFFFFF",
    elevation: 10,
    margin: 10,
    padding: 10,
    borderRadius: 50,

  },
})