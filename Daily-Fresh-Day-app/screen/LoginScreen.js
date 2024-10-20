import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/color";
import { styles } from "../styles/stylesLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../components/Fire";

const LoginScreen = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if(FIREBASE_AUTH.currentUser){
    navigation.navigate("Login");
  }

  const signIn = async () => {
    if (user !== "" && password !== "") {
      signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        // Signed in 
        navigation.navigate("TodoList", { _user: userCredential.user });
      })
      .catch((error) => {
        setErrorMessage("Sign in failed" + error.message)
      });      
    } else {
        setErrorMessage("Invalid username or password");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          source={require("../assets/images/bg-login-screen.png")}
          resizeMode="cover"
          style={styles.bgImage}
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

            {/* LOGO */}
            <Image
              source={require("../assets/images/logo-app.png")}
              resizeMode="contain"
              style={styles.logo}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Daily Fresh Day</Text>
            </View>

            {/* Form Container */}
            <View style={styles.content}>
              <Text style={styles.welcomeText}>Welcome{"\n"}Back !</Text>
              {/* Alert Authentication */}
              <Text style={styles.errorText}>{errorMessage}</Text>
              {/* Username */}
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={colors.textPrimary}
                  value={user}
                  onChangeText={setUser}
                />
                <TouchableOpacity disabled>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={colors.textPrimary}
                    style={styles.iconUser}
                  />
                </TouchableOpacity>
              </View>

              {/* Password */}
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={colors.textPrimary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.iconPassword}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={colors.textPrimary}
                  />
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={signIn}
              >
                <Text style={styles.textButtonLogin}>Login</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
