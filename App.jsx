import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Platform,
} from "react-native";
import BleManager from "react-native-ble-manager";

const BleScannerApp = () => {
  const [devices, setDevices] = useState([]);

  const handleDiscoverPeripheral = (peripheral) => {
    if (!devices.some((device) => device.id === peripheral.id)) {
      setDevices((prevDevices) => [...prevDevices, peripheral]);
    }
  };

  useEffect(() => {
    BleManager.start({ showAlert: false });

    if (Platform.OS === "ios") {
      BleManager.enableBluetooth()
        .then(() => {
          console.log(
            "The bluetooth is already enabled or the user is confirmed"
          );
        })
        .catch((error) => {
          console.log("The user refused to enable bluetooth");
        });
    }

    const subscription = BleManager.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral
    );

    return () => {
      subscription.remove();
    };
  }, [devices]);

  const startScanning = () => {
    BleManager.scan([], 5, true).then(() => {
      console.log("Scanning...");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Start Scanning!" onPress={startScanning} />
      </View>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.device}>
            <Text style={styles.deviceName}>
              {item.name || "Unnamed Device"}
            </Text>
            <Text>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#265d70",
  },
  button: {
    marginTop: 40,
  },
  device: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BleScannerApp;
