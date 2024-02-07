import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DeviceDetailsScreen = ({ route }) => {
  const { deviceId, deviceName } = route.params;

  return (
    <View style={styles.container}>
      <Text>Device Name: {deviceName}</Text>
      <Text>Device ID: {deviceId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DeviceDetailsScreen;
