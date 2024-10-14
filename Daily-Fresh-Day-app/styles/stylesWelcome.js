import { StyleSheet, Dimensions } from "react-native";
import colors from "./color";

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

export { styles };
