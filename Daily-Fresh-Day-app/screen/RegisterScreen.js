import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
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

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const handleRegister = () => {
    // test
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
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
              {/* Input Username */}
              <View style={styles.containerInput}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor={colors.textPrimary}
                  value={username}
                  onChangeText={setUsername}
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

              {/* Input Email */}
              <View style={styles.containerInput}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={colors.textPrimary}
                  value={email}
                  onChangeText={setEmail}
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
                  onChangeText={setPassword}
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

              {/* Input Confirm Password */}
              <View style={styles.containerInput}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={colors.textPrimary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
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
                onPress={() => {
                  navigation.navigate("Login");
                }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  bgImage: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen,
    flex: 1,
  },
  backIcon: {
    paddingTop: 50,
    paddingLeft: 20,
  },
  title: {
    fontFamily: "ReadexPro-Bold",
    fontSize: 52,
    color: colors.textSecondary,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 0,
  },
  subTitle: {
    fontFamily: "ReadexPro-Light",
    fontSize: 20,
    color: colors.textSecondary,
  },
  subTitleContainer: {
    paddingVertical: 175,
    position: "absolute",
    paddingLeft: 88,
  },
  content: {
    margin: 40,
    paddingTop: 100,
  },
  containerInput: {
    position: "relative",
    width: "100%",
    paddingBottom: 15,
  },
  input: {
    fontFamily: "ReadexPro-Light",
    fontSize: 20,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    width: "100%",
    height: 50,
    paddingHorizontal: 25,
    color: colors.textPrimary,
  },
  icon: {
    position: "relative",
    top: -35,
    left: 295,
  },
  buttonRegis: {
    borderRadius: 50,
    width: "100%",
    backgroundColor: colors.primary,
    height: 50,
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonRegis: {
    color: colors.textSecondary,
    fontFamily: "ReadexPro-Light",
    fontSize: 20,
  },
});
