import React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";

const DeviceDetailsScreen = ({ route }) => {
  const { deviceId, deviceName } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Device Name: {deviceName}</Text>
        <Text>Device ID: {deviceId}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? "transparent" : "#3f96b4" },
          styles.button,
        ]}
      >
        <Text style={{ color: "white" }}>Preset 1</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    backgroundColor: "white",
  },
  textContainer: {
    marginTop: 100,
  },
  button: {
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    //backgroundColor: pressed ? "#3f96b4" : "transparent",
  },
  text: {
    fontSize: 12,
    color: "white",
  },
});

export default DeviceDetailsScreen;
