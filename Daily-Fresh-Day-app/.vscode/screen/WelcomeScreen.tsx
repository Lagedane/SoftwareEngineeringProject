import {
  StyleSheet,
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
import { WelcomeScreenNavigationProp } from "../types/type";
import colors from "../styles/color";

// Define props for WelcomeScreen
type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
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

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "ReadexPro-Bold",
    fontSize: 52,
    color: "#fff",
  },
  container: {
    margin: 30,
    paddingTop: 30,
  },
  imageLogo: {
    alignItems: "center",
    width: "100%",
    height: 140,
  },
  paddingImg: {
    paddingTop: 90,
  },
  paddingButton: {
    paddingTop: 60,
  },
  buttonSignUp: {
    width: "100%",
    padding: 15,
    borderRadius: 50,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  textSignUp: {
    color: "#fff",
    fontFamily: "ReadexPro-Bold",
    fontSize: 18,
  },
  buttonLogin: {
    width: "100%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textLogin: {
    color: colors.primary,
    fontFamily: "ReadexPro-Bold",
    fontSize: 18,
  },
  iconUser: {
    position: "absolute",
    top: -35,
    right: 15,
  },
});
