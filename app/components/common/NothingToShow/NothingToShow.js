import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { windowHeight } from "../../../utilts/windowHeight";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export const NothingToShow = ({ onPress }) => {
  const center = windowHeight / 2 - 42;
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../../assets/images/transactions/back.png")}
        style={{ width: "100%", flex: 0.2,}}
      >
        <Header onPress={onPress}>TRANSFER</Header>
      </ImageBackground>
      <View style={styles.containerText}>
        <Text style={styles.text}>Nothing to show</Text>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /* flex: 1, */
    height: windowHeight,
    justifyContent: "space-between",
    flexDirection: "column",
    /* justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", */
    backgroundColor: "#e0e0e0",
  },
  text: {
    fontSize: 42,
    color: "#333",
  },
  containerText: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
  }
});
