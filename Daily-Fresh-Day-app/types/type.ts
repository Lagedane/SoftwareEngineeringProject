// Import necessary components and libraries
import { StackNavigationProp } from "@react-navigation/stack";

// Define a type for your stack navigator
export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
};

// Define a type for the navigation prop for each screen
export type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;
export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
