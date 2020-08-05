import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const TabBar = ({ navigation, touched, setTouched }) => {
 /*  const [touched, setTouched] = useState(0);  */


  const onPress1 = () => {
    setTouched(1);
    navigation.navigate("DepositWithdrawHistory");
  };

  const onPress2 = () => {
    setTouched(2);
    navigation.navigate("TransferHistory");
  };

  console.log("touched", touched);
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={
            /*( ) => { 
            setTouched(1);
            navigation.navigate("DepositWithdrawHistory");
          } */ () =>
              onPress1()
          }
          style={[styles.buttonLeft, touched === 1 ? styles.back : null]}
        >
          <Image
            style={styles.imageLeft}
            source={require("../../../assets/earthG.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            /* () => {
            setTouched(2);
            navigation.navigate("TransferHistory");
          } */ () =>
              onPress2()
          }
          style={[styles.buttonCenter, touched === 2 ? styles.back : null]}
        >
          <Image
            style={styles.imageCenter}
            source={ touched === 2 ? require("../../../assets/humansG.png") : require("../../../assets/humansW.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTouched(3);
            navigation.navigate("TradesHistory");
          }}
          style={[styles.buttonRight, touched === 3 ? styles.back : null]}
        >
          <Image
            style={styles.imageRight}
            source={require("../../../assets/HumanW.png")}
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
