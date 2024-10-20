import { StyleSheet, Dimensions } from "react-native";
import colors from "./color";

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
  errorText: {
    color: "#e82c2c",
    fontFamily: "ReadexPro-Light",
    marginStart: 10,
  },
});

export { styles };
