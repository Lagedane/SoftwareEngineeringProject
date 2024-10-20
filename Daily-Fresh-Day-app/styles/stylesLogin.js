import { StyleSheet } from "react-native";
import colors from "./color";

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
  errorText: {
    color: "#e82c2c",
  },
});

export { styles };
