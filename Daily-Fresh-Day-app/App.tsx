// Import necessary components and libraries
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation/Navigator";

// Main app component
export default function App() {
  return (
    <NavigationContainer>
      {/* Status bar styling */}
      <StatusBar style="auto" />

      {/* Navigation setup */}
      <Navigator />
    </NavigationContainer>
  );
}