// Import necessary components and libraries
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screen/WelcomeScreen";
import RegisterScreen from "../screen/RegisterScreen";
import LoginScreen from "../screen/LoginScreen";
import TodoListScreen from "../screen/TodoListScreen";

// Create Stack Navigator
const Stack = createStackNavigator();

// Define Navigator component
const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      {/* Welcome screen */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      {/* Register screen */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      {/* Login screen */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* TodoList screen */}
      <Stack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Export Navigator component
export default Navigator;