import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

function WelcomScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View styles={styles.loginButton}></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
  },
});

export default WelcomScreen;
