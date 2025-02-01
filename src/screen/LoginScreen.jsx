import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate("Signup");
  }
  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor="#9A9A9A" />
      </View>
      <View style={styles.inputContainer}>
        <Fontisto name="locked" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor="#9A9A9A" secureTextEntry />
      </View>
      <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
      <View style={styles.signInButtonContainer}>
        <Text style={styles.signIn}>Sign In</Text>
        <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
          <AntDesign name="arrowright" size={24} color="#FFFFFF" />
        </LinearGradient>
      </View>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={{textDecorationLine: "underline"}}>Create</Text> 
        </Text>
      </TouchableOpacity>      
      <View style={styles.leftVectorContainer}>
        <ImageBackground
          source={require("../assets/leftVector1.png")}
          style={styles.leftVectorImage}
        />        
      </View>
    </View>
  )
}

export default LoginScreen

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
  helloContainer: {},
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
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
  forgotPasswordText: {
    textAlign: "right",
    marginRight: 40,
    color: "#BEBEBE",
    fontSize: 16,
    marginTop: 10
  },
  signInButtonContainer: {
    flexDirection: "row",
    marginTop: 120,
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
    marginTop: 80,
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
})