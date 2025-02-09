import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Modal } from 'react-native';
import React, { useState, useRef } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RadioGroup from 'react-native-radio-buttons-group';
import { API_BASE_URL } from '@env';
import CustomAlert from './CustomAlert';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('email');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const radioButtons = [
    { id: 'email', label: 'Email', value: 'email' },
    { id: 'phone', label: 'Phone', value: 'phone' }
  ];

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !mobileNo || !password) {
      showAlert("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const formData = { fullName, email, mobileNo, password, verificationMethod };
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
      setLoading(false);
      
      if (response.data.success) {
        // showAlert("OTP sent successfully!");
        setOtpModalVisible(true);
      } else {
        showAlert("Registration failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      showAlert(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleOtpChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleOtpVerification = async () => { 
    if (!otp || otp.length !== 6) {
      showAlert("Please enter a valid 6-digit OTP.");
      return;
    }  
    try {
      const requestData = {
        email,
        otp: otp.join(''),
        mobileNo,
      };  
      console.log("Sending Data:", JSON.stringify(requestData, null, 2));  
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (response.data?.success) {
        showAlert(response.data.message || "OTP verified successfully!");
        // const { accessToken, refreshToken, user } = response.data.data || {};
        // console.log("User:", user, "AccessToken:", accessToken);  
        // setOtpModalVisible(false);
        // navigation.navigate('Login');        
        setTimeout(() => {
          setOtpModalVisible(false);
          navigation.navigate('Login');
        }, 2000);

      } else {
        showAlert(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showAlert(error.response?.data?.message || "OTP verification failed. Try again.");
    }
  };
  
  // const handleOtpVerification = async () => {
  //   if (!otp) {
  //     showAlert("Please enter the OTP.");
  //     return;
  //   }
  
  //   try {
  //     const requestData = {
  //       email,
  //       otp,
  //       mobileNo,
  //     };
  //     console.log("Sending Data:", JSON.stringify(requestData, null, 2));
  //     const response = await axios.post(`${API_BASE_URL}/verify-otp`, requestData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //     });
  
  //     if (response.data.success) {
  //       showAlert(response.data.message || "OTP verified successfully!");
  //       setOtpModalVisible(false);
  //       navigation.navigate('Login');
  //     } else {
  //       showAlert(response.data.message || "Invalid OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     showAlert(error.response?.data?.message || "OTP verification failed. Try again.");
  //   }
  // }; 

  return (
    <View style={styles.container}>
      <CustomAlert visible={alertVisible} message={alertMessage} onClose={() => setAlertVisible(false)} />
      <View style={styles.topImageContainer}>
        <Image source={require("../assets/topVector.png")} style={styles.topImage} />
      </View>

      <Text style={styles.createAccountText}>Create account</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      </View>
      
      <View style={styles.inputContainer}>
        <Feather name="mail" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="E-mail" value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputContainer}>
        <Entypo name="mobile" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Mobile" value={mobileNo} onChangeText={setMobileNo} />
      </View>

      <View style={styles.inputContainer}>
        <Fontisto name="locked" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      </View>

      <View style={styles.radioButtonsContainer}>
        <Text style={styles.radioTitle}>Select Verification Method</Text>
        <RadioGroup radioButtons={radioButtons} onPress={(id) => setVerificationMethod(id)} selectedId={verificationMethod} layout="row" />
      </View>

      <TouchableOpacity onPress={handleRegister} style={styles.signInButtonContainer}>
        <Text style={styles.signIn}>Create</Text>
        <LinearGradient colors={["#F97794", "#623AA2"]} style={styles.linearGradient}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <AntDesign name="arrowright" size={24} color="#FFFFFF" />}
        </LinearGradient>
      </TouchableOpacity>
      
      <Modal visible={otpModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter OTP</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpBox}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
              />
            ))}
          </View>
          <TouchableOpacity onPress={handleOtpVerification} style={styles.otpButton}>
            <Text style={styles.otpButtonText}>Verify OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOtpModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
    </View>
  );
};

export default SignupScreen;

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
    marginVertical: 15,
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
  radioButtonsContainer: { 
    marginHorizontal: 40,
    marginVertical: 10, 
  },  
  radioTitle: {
    textAlign: "left",
    color: "#262626",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  signInButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#262626",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: "#623AA2",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
    backgroundColor: "#FFF",
    color: "#262626",
  },
  otpButton: {
    backgroundColor: "#623AA2",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  otpButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: "red",
    fontSize: 16,
  },
});
