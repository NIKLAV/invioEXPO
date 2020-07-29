import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { windowHeight } from "../../../utilts/windowHeight";

export const Preloader = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 15 }}>
      <Image source={require("../../../assets/spinerHistory.gif")} />
      </View>
    </View>
  );
};

export const Spiner = () => {
  const center = windowHeight / 2 - 25;
  return (
    <Modal>
      <View style={styles.container}>
        <View >
          <Image source={require("../../../assets/spiner.gif")} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
