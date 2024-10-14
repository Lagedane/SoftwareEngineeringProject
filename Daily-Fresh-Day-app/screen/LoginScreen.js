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

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
                onPress={() => {
                  navigation.navigate("TodoList");
                }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  bgImage: {
    flex: 1, // Ensure the background stretches to fill the scroll view
    width: "100%",
    height: "100%",
  },
  logo: {
    width: "100%",
    height: 125,
    marginTop: 20,
  },
  title: {
    fontFamily: "ReadexPro-Bold",
    fontSize: 35,
    color: colors.textSecondary,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  backIcon: {
    paddingTop: 50,
    paddingLeft: 20,
  },
  welcomeText: {
    fontFamily: "ReadexPro-Bold",
    fontSize: 52,
    color: colors.textPrimary,
  },
  content: {
    margin: 40,
    paddingTop: 30,
  },
  containerInput: {
    position: "relative",
    width: "100%",
    marginTop: 25,
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
  iconUser: {
    position: "absolute",
    top: -35,
    right: 15,
  },
  iconPassword: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  buttonLogin: {
    borderRadius: 50,
    width: "100%",
    backgroundColor: colors.primary,
    height: 50,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonLogin: {
    color: colors.textSecondary,
    fontFamily: "ReadexPro-Light",
    fontSize: 20,
  },
});
