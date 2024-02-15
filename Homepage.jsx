import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Platform,
  Image,
} from "react-native";
import BleManager from "react-native-ble-manager";

const HomeScreen = ({ navigation }) => {
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
          console.log("BleManager Error:" + error);
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

  const connectToDevice = (device) => {
    BleManager.connect(device.id)
      .then(() => {
        // Navigate on successful connection
        navigation.navigate("DeviceDetails", {
          deviceId: device.id,
          deviceName: device.name || "Unnamed Device",
        });
      })
      .catch((error) => {
        // Log connection failure
        console.log("Connection failed");
        Alert.alert("Connection Failed", "Failed to connect to the device.");
      });
  };

  // UI
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 170, height: 170, top: 0, position: "relative" }}
        source={require("./app/assets/ergoicon.jpg")}
      />
      <View style={styles.button}>
        <Button title="Start Scanning" onPress={startScanning} />
      </View>
      <FlatList
        style={styles.list}
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.device}>
            <Text style={styles.deviceName}>
              {item.name || "Unnamed Device"}
            </Text>
            <Text>ID: {item.id}</Text>
            <Button
              title={item.isConnected ? "Connected" : "Connect"}
              onPress={() => connectToDevice(item)}
            />
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
    backgroundColor: "#3f96b4",
  },
  button: {
    marginTop: -30,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    backgroundColor: "white",
  },
  list: {
    marginTop: 10,
    borderRadius: 5,
  },
  device: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
