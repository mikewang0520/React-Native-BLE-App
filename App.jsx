import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeviceDetailsScreen from "./DeviceDetailsScreen.jsx"; // Import your new screen
import HomeScreen from "./Homepage.jsx"; // Assume your existing app content is moved here

const Stack = createNativeStackNavigator();

const BleScannerApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DeviceDetails" component={DeviceDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BleScannerApp;
