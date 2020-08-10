import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigationState, useRoute } from "@react-navigation/native";

const TabBar = ({ navigation }) => {
  const route = useRoute();
  const state = useNavigationState((state) => state)
  let index = useNavigationState((state) => state.index);
  console.log(index);
  console.log(state);
  console.log(route)
 
  const onPress1 = () => {
    navigation.navigate("TradesHistory");
  };

  const onPress2 = () => {
    navigation.navigate("TransferHistory");
  };

  const onPress3 = () => {
    navigation.navigate("DepositWithdrawHistory");
  };

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => onPress1()}
          style={[styles.buttonLeft, index === 7 ? styles.back : null]}
        >
          <Image
            style={styles.imageLeft}
            source={
              index === 7
                ? require("../../../assets/earthG.png")
                : require("../../../assets/earthW.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress2()}
          style={[styles.buttonCenter, index === 6 ? styles.back : null]}
        >
          <Image
            style={styles.imageCenter}
            source={
              index === 6
                ? require("../../../assets/humansG.png")
                : require("../../../assets/humansW.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPress3();
          }}
          style={[styles.buttonRight, index === 5 ? styles.back : null]}
        >
          <Image
            style={styles.imageRight}
            source={
              index === 5
                ? require("../../../assets/humanG.png")
                : require("../../../assets/humanW.png")
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "relative",
    marginTop: 30,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },

  buttonLeft: {
    backgroundColor: "#5e5e5e",
    width: 100,
    height: 35,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  buttonRight: {
    display: "flex",
    alignContent: "center",
    backgroundColor: "#5e5e5e",
    width: 100,
    height: 35,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonCenter: {
    display: "flex",
    alignContent: "center",
    backgroundColor: "#5e5e5e",
    width: 100,
    height: 35,
  },
  imageLeft: {
    position: "absolute",
    top: 10,
    left: 45,
  },
  imageCenter: {
    position: "absolute",
    top: 10,
    left: 45,
  },
  imageRight: {
    position: "absolute",
    top: 10,
    left: 45,
  },
  back: {
    backgroundColor: "#fff",
  },
});

export default TabBar;
