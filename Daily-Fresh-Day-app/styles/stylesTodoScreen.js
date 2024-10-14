import { StyleSheet } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    // justifyContent: "center",
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: Colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: Colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
  logoutText: {
    fontFamily: "ReadexPro-Bold",
    fontSize: 18,
    color: Colors.red,
  },
  logoutContainer: {
    alignSelf: "flex-end",
    right: 20,
    marginBottom: 120,
    marginTop: 60,
  },
});

export { styles };
