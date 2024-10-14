import {
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { styles } from "../styles/stylesWelcome";

const WelcomeScreen = ({ navigation }) => {
  {
    /* import font */
  }
  const [fontLoaded] = useFonts({
    "ReadexPro-Bold": require("../assets/fonts/ReadexPro-Bold.ttf"),
  });

  if (!fontLoaded) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/bg-welcome-screen.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.title}>
            The best{"\n"}app for{"\n"}your plans{"\n"}.
          </Text>
          <View style={styles.paddingImg}>
            <Image
              source={require("../assets/images/todo-list-welcome-screen.png")}
              style={styles.imageLogo}
              resizeMode="contain"
            />
          </View>

          {/* Create Button */}
          <View style={styles.paddingButton}>
            {/* Create Sign Up Button */}
            <TouchableOpacity
              style={styles.buttonSignUp}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.textSignUp}>Sign Up</Text>
            </TouchableOpacity>

            {/* Create Login Button */}
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>
            <Text>{"\n"}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomeScreen;
