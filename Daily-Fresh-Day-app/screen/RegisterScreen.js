import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  KeyboardAvoidingViewBase,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/color";
import { styles } from "../styles/stylesRegister";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../components/Fire";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const RegisterScreen = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationPassword, setValidationPassword] = useState("");
  const [validationUsername, setValidationUsername] = useState("");
  const [validationEmail, setValidationEmail] = useState("");

  const validateUsername = (value, setValue) => {
    const hasAlphabet  = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[_!@#$%^&*(),.?":{}|<>]/.test(value);
    const usernamePattern = (hasAlphabet && hasNumber && hasSpecialChar)?true:false;
    if (!usernamePattern){
      setValidationUsername("Username must contain numeric,special character and alphabets.")
    } else {
      setValidationUsername("");
    }

    setValue(value);
  };

  const validateEmail = (value, setValue) => {
    const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*(@mail\.com|@gmail\.com)).+$/;
    const emailPattern = (emailRegex.test(value))?true:false;
    if (!emailPattern){
      setValidationEmail("Email must contain numeric and alphabets + @mail.com or @gmail.com")
    } else {
      setValidationEmail("");
    }

    setValue(value);
  };

  const validateAndset = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationPassword("Password to do not match.");
    } else {
      setValidationPassword("");
    }

    setValue(value);
  };

  const signUp = async () => {
    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        navigation.navigate("Login", { user:userCredential.user});
      })
      .catch((error) => {
        setValidationUsername(error.message);
        setValidationEmail(error.message);
        setValidationPassword(error.message);
      });
    }
  }

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  {
    /* import font */
  }
  const [fontLoaded] = useFonts({
    "ReadexPro-Bold": require("../assets/fonts/ReadexPro-Bold.ttf"),
    "ReadexPro-Light": require("../assets/fonts/ReadexPro-Light.ttf"),
  });

  if (!fontLoaded) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          source={require("../assets/images/bg-register-screen.png")}
          style={styles.bgImage}
          resizeMode="cover"
        >
          <SafeAreaView>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={styles.backIcon}
            >
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={colors.icon}
              />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Register</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitle}>Create your new account</Text>
            </View>
            {/* Form Container */}
            <View style={styles.content}>
            
              {/* Alert Validation Username */}
              <Text style={styles.errorText}>{validationUsername}</Text>
              
              {/* Input Username */}
              <View style={styles.containerInput}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor={colors.textPrimary}
                  value={username}
                  onChangeText={(value) => validateUsername(value,setUsername)}
                  style={styles.input}
                />
                <TouchableOpacity disabled>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={colors.textPrimary}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            
              {/* Alert Validation Email */}
              <Text style={styles.errorText}>{validationEmail}</Text>
 
              {/* Input Email */}
              <View style={styles.containerInput}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={colors.textPrimary}
                  value={email}
                  onChangeText={(value) => validateEmail(value,setEmail)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
                <TouchableOpacity disabled>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={colors.textPrimary}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              {/* Input Password */}
              <View style={styles.containerInput}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={colors.textPrimary}
                  value={password}
                  onChangeText={(value) => validateAndset(value, confirmPassword, setPassword)}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility("password")}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={colors.textPrimary}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              {/* Alert Validation Password */}
              <Text style={styles.errorText}>{validationPassword}</Text>

              {/* Input Confirm Password */}
              <View style={styles.containerInput}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={colors.textPrimary}
                  value={confirmPassword}
                  onChangeText={(value) => validateAndset(value, password, setConfirmPassword)}
                  secureTextEntry={!showConfirmPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility("confirmPassword")}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color={colors.textPrimary}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              {/* Login Button */}
              <TouchableOpacity
                style={styles.buttonRegis}
                onPress={signUp}
              >
                <Text style={styles.textButtonRegis}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
